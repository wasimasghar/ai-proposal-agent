import pymupdf


def read_pdf_text(data: bytes) -> str:
    """Return all text from a PDF file's bytes."""
    with pymupdf.open(stream=data, filetype="pdf") as doc:
        return "\n".join(page.get_text() for page in doc).strip()