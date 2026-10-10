# Proposal Agent (front end)

React + Vite UI for the Proposal Agent. It talks to the FastAPI backend in `../` (proposal-agent-api).

## Run

1. Start the backend (from `proposal-agent-api/`):

   ```bash
   uvicorn app.main:app --port 4000
   ```

2. Start the front end (from `agent_front_end/`):

   ```bash
   npm install
   npm run dev
   ```

The backend address comes from `VITE_API_BASE_URL` (default `http://127.0.0.1:4000`).
To change it, copy `.env.example` to `.env` and edit it, then restart `npm run dev`.

Optional: put a background image at `src/assets/hero-gradient.png` and the welcome screen will use it.
