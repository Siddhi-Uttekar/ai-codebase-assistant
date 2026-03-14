# from langchain_huggingface import HuggingFaceEmbeddings

# def load_embeddings():

#     embeddings = HuggingFaceEmbeddings(
#         model_name="BAAI/bge-small-en-v1.5"
            
#     )

#     return embeddings
import os
from huggingface_hub import login
from langchain_huggingface import HuggingFaceEmbeddings


def load_embeddings():

    # Get token from Render environment variable
    token = os.getenv("HF_TOKEN")

    if token:
        login(token)

    embeddings = HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en-v1.5"
    )

    return embeddings
