from loader import load_code_files
from chunker import chunk_documents
from embeddings import load_embeddings
from vector_store import create_vector_store,load_vector_store
from llm import ask_llm

REPO_PATH = "backend/repo_data"


# def build_index():

#     documents = load_code_files(REPO_PATH)

#     chunks = chunk_documents(documents)

#     embeddings = load_embeddings()

#     vector_store = create_vector_store(chunks,embeddings)

#     return vector_store
import os

def build_index():

    if os.path.exists("vector_db"):
        print("Vector DB already exists. Skipping indexing.")
        return

    documents = load_code_files(REPO_PATH)

    chunks = chunk_documents(documents)

    texts = [chunk for chunk in chunks]

    embeddings = load_embeddings(texts)

    create_vector_store(chunks, embeddings)

def ask_codebase(question):

    
    if not os.path.exists("vector_db"):
        print("Vector DB not found. Building index...")
        build_index()
    vector_store = load_vector_store()

    retriever = vector_store.as_retriever(
        search_kwargs={"k":10}
    )

    docs = retriever.invoke(question)

    context = "\n\n".join([
        f"""
### File: {doc.metadata.get('file_path','unknown')}

{doc.page_content}
"""
        for doc in docs
    ])

    prompt = f"""
You are an expert Senior Software Engineer.

Explain the repository using ONLY the provided context.

GUIDELINES:

- If the answer is not in the context say:
"I don't see that specific implementation in the current files."

- Do NOT output full code unless the user explicitly asks for it.
- Summarize the functionality instead.
- Mention file names when referring to code.

Formatting Rules (Markdown):
- Use ## headings
- Use **bold** for important concepts
- Use bullet points for lists
- Use code blocks only for small examples

---

### Code Context
{context}

### Question
{question}

### Answer
"""

    answer = ask_llm(prompt)

    return answer
