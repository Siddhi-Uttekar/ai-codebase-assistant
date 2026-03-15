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
            "model": "voyage-2",
            "input": [text]
        }
    )

    data = response.json()

    if "data" not in data:
        raise Exception(f"Voyage API Error: {data}")

    return data["data"][0]["embedding"]
