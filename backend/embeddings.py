import requests
import os

VOYAGE_API_KEY = os.getenv("VOYAGE_API_KEY")

def load_embeddings(text):
    response = requests.post(
        "https://api.voyageai.com/v1/embeddings",
        headers={
            "Authorization": f"Bearer {VOYAGE_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "voyage-code-2",
            "input": text
        }
    )

    return response.json()["data"][0]["embedding"]
