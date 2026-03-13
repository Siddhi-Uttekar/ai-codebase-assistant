import os
from pathlib import Path
from groq import Groq

def _load_groq_api_key() -> str:
    """
    Load GROQ_API_KEY from environment or, if missing, from backend/.env.
    This avoids relying on python-dotenv's path/encoding behavior.
    """
    # 1) Respect already-set environment variable
    env_value = os.getenv("GROQ_API_KEY")
    if env_value:
        return env_value

    # 2) Fallback: parse backend/.env manually
    dotenv_path = Path(__file__).resolve().parent / ".env"
    if dotenv_path.exists():
        try:
            with open(dotenv_path, "r", errors="ignore") as f:
                for raw_line in f:
                    # Handle possible UTF-8 BOM and whitespace
                    line = raw_line.lstrip("\ufeff").strip()
                    if not line or line.startswith("#"):
                        continue
                    if "GROQ_API_KEY=" in line:
                        return line.split("GROQ_API_KEY=", 1)[1].strip()
        except Exception:
            # Ignore file read issues; we'll error below if no key is found
            pass

    raise RuntimeError(
        "GROQ_API_KEY is not set. "
        "Set it as an environment variable or in backend/.env as GROQ_API_KEY=your_key_here."
    )


client = Groq(
    api_key=_load_groq_api_key()
)

def ask_llm(prompt):

    response = client.chat.completions.create(

        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ],

        model="llama-3.3-70b-versatile"
    )

    return response.choices[0].message.content