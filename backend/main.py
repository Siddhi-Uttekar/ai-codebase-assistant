# from fastapi import FastAPI, HTTPException
# from .rag_pipeline import build_index, ask_codebase

# app = FastAPI()

# @app.get("/build_index")
# def build():
#     try:
#         build_index()
#         return {"message": "Index built successfully"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/ask")
# def ask(question: str):
#     try:
#         answer = ask_codebase(question)
#         return {"answer": answer}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

#     return {"message":"Index created successfully"}


# @app.get("/ask")
# def ask(question:str):

#     answer = ask_codebase(question)

#     return {"answer":answer}
from fastapi import FastAPI
from pydantic import BaseModel
from rag.pipeline import build_index, ask_codebase
from services.github_loader import clone_repo

app = FastAPI()


class RepoRequest(BaseModel):
    repo_url: str


class Question(BaseModel):
    question: str


@app.post("/load-repo")
def load_repo(data: RepoRequest):

    path = clone_repo(data.repo_url)

    build_index()

    return {"status": "Repository indexed"}


@app.post("/ask")
def ask(data: Question):

    answer = ask_codebase(data.question)

    return {"answer": answer}