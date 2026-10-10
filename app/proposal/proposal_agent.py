from google.genai import types

from app.gemini_client import get_client
from app.proposal.agent_prompt import AGENT_PROMPT
from app.proposal.agent_tools import ALL_TOOLS, TOOLS_BY_NAME
from app.proposal.proposal_models import Proposal
from app.settings import get_settings


def _run_tool(name: str, args: dict) -> dict:
    """Run one tool by name and always return a dict (errors included)."""
    tool = TOOLS_BY_NAME.get(name)
    if tool is None:
        return {"error": f"Unknown tool: {name}"}
    try:
        return tool(**args)
    except Exception as error:
        return {"error": str(error)}


def write_proposal(job_description: str) -> Proposal:
    """Let the agent use its tools to write and save an Upwork proposal."""
    settings = get_settings()
    client = get_client()

    # 1. Agent setup: prompt + tools. We run the tools ourselves (no automatic calling).
    config = types.GenerateContentConfig(
        system_instruction=AGENT_PROMPT,
        tools=ALL_TOOLS,
        automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
        temperature=0.7,
    )

    # 2. The conversation starts with the job description.
    contents = [
        types.Content(role="user", parts=[types.Part.from_text(text=f"Write an Upwork proposal for this job:\n\n{job_description}")])
    ]
    steps: list[str] = []
    draft_file = ""

    # 3. The agent loop.
    for _ in range(settings.max_agent_steps):
        response = client.models.generate_content(model=settings.model_name, contents=contents, config=config)
        calls = response.function_calls

        # No tool requested -> the agent is done; this is the final proposal.
        if not calls:
            text = (response.text or "").strip()
            return Proposal(text=text, word_count=len(text.split()), steps=steps, draft_file=draft_file)

        # Keep the model's tool request in the history (LLM is stateless).
        contents.append(response.candidates[0].content)

        # Run every requested tool and collect the results.
        results = []
        for call in calls:
            args = dict(call.args or {})
            print(f"[agent] {call.name}({list(args.keys())})")  # see the agent thinking in the terminal
            steps.append(call.name)

            result = _run_tool(call.name, args)
            if call.name == "save_draft":
                draft_file = result.get("saved_to", "")
            results.append(types.Part.from_function_response(name=call.name, response=result))

        # Send the results back so the agent can decide the next step.
        contents.append(types.Content(role="user", parts=results))

    raise RuntimeError("The agent did not finish within the step limit.")