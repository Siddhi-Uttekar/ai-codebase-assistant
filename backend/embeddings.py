# from langchain_huggingface import HuggingFaceEmbeddings

# def load_embeddings():

#     embeddings = HuggingFaceEmbeddings(
#         model_name="BAAI/bge-small-en-v1.5"
            
#     )

#     return embeddings
import os
from huggingface_hub import login
from langchain_huggingface import HuggingFaceEmbeddings


# Login to HuggingFace using Render environment variable
token = os.getenv("HF_TOKEN")
if token:
    login(token)


# Load embeddings model ONCE when the server starts
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def load_embeddings():
    return embeddings
