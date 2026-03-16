

# import requests
# import os

# VOYAGE_API_KEY = os.getenv("VOYAGE_API_KEY")

# def load_embeddings(texts):

#     response = requests.post(
#         "https://api.voyageai.com/v1/embeddings",
#         headers={
#             "Authorization": f"Bearer {VOYAGE_API_KEY}",
#             "Content-Type": "application/json"
#         },
#         json={
#             "model": "voyage-2",
#             "input": texts
#         }
#     )

#     data = response.json()

#     if "data" not in data:
#         raise Exception(f"Voyage API Error: {data}")

#     return [item["embedding"] for item in data["data"]]
import os
import requests
from langchain_core.embeddings import Embeddings


class load_embeddings(Embeddings):

    def __init__(self):
        self.api_key = os.getenv("VOYAGE_API_KEY")
        self.url = "https://api.voyageai.com/v1/embeddings"

        if not self.api_key:
            raise ValueError("VOYAGE_API_KEY environment variable not set")

    def embed_documents(self, texts):

        response = requests.post(
            self.url,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "voyage-code-2",
                "input": texts
            }
        )

        data = response.json()

        if "data" not in data:
            raise Exception(f"Voyage API Error: {data}")

        return [item["embedding"] for item in data["data"]]

    def embed_query(self, text):

        response = requests.post(
            self.url,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "voyage-code-2",
                "input": [text]
            }
        )

        data = response.json()

        if "data" not in data:
            raise Exception(f"Voyage API Error: {data}")

        return data["data"][0]["embedding"]
