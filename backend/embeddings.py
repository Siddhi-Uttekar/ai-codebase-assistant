

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

class VoyageEmbeddings(Embeddings):

    def embed_documents(self, texts):
        vectors = []
        for text in texts:
            res = requests.post(
                "https://api.voyageai.com/v1/embeddings",
                headers={
                    "Authorization": f"Bearer {os.getenv('VOYAGE_API_KEY')}",
                    "Content-Type": "application/json"
                },
                json={
                    "input": text,
                    "model": "voyage-code-2"
                }
            )
            vectors.append(res.json()["data"][0]["embedding"])

        return vectors

    def embed_query(self, text):
        res = requests.post(
            "https://api.voyageai.com/v1/embeddings",
            headers={
                "Authorization": f"Bearer {os.getenv('VOYAGE_API_KEY')}",
                "Content-Type": "application/json"
            },
            json={
                "input": text,
                "model": "voyage-code-2"
            }
        )

        return res.json()["data"][0]["embedding"]
