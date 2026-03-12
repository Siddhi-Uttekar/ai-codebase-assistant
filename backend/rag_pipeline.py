from loader import load_code_files
from chunker import chunk_documents
from embeddings import load_embeddings
from vector_store import create_vector_store,load_vector_store
from llm import ask_llm

REPO_PATH = "backend/repo_data"


def build_index():

    documents = load_code_files(REPO_PATH)

    chunks = chunk_documents(documents)

    embeddings = load_embeddings()

    vector_store = create_vector_store(chunks,embeddings)

    return vector_store


def ask_codebase(question):

    embeddings = load_embeddings()

    vector_store = load_vector_store(embeddings)

    retriever = vector_store.as_retriever(
        search_kwargs={"k":5}
    )

    docs = retriever.invoke(question)

    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""

You are an expert Senior Software Engineer. Your task is to explain the codebase and solve issues based ONLY on the provided context.

GUIDELINES:
1. If the answer isn't in the context, say "I don't see that specific implementation in the current files."
2. When referencing code, mention the filename.
3. If providing a fix, show the specific lines to change.
4. If the code uses specific libraries (like Vite, Tailwind, or Groq), ensure your explanation respects those technologies.

Code Context:
{context}

Question:
{question}

"""

    answer = ask_llm(prompt)

    return answer