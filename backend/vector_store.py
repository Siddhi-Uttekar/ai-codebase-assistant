from langchain_community.vectorstores import FAISS

def create_vector_store(chunks,embeddings):

    vector_store = FAISS.from_texts(
        chunks,
        embeddings
    )

    vector_store.save_local("faiss_index")

    return vector_store


def load_vector_store(embeddings):

    vector_store = FAISS.load_local(
        "faiss_index",
        embeddings,
        allow_dangerous_deserialization=True
    )

    return vector_store