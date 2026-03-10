from fastapi import FastAPI, HTTPException
from .rag_pipeline import build_index, ask_codebase

app = FastAPI()

@app.get("/build_index")
def build():
    try:
        build_index()
        return {"message": "Index built successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ask")
def ask(question: str):
    try:
        answer = ask_codebase(question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"message":"Index created successfully"}


@app.get("/ask")
def ask(question:str):

    answer = ask_codebase(question)

    return {"answer":answer}