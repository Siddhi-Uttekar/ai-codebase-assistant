# from langchain_community.vectorstores import FAISS


# def create_vector_store(chunks, embeddings):

#     text_embeddings = list(zip(chunks, embeddings))

#     vector_store = FAISS.from_embeddings(
#         text_embeddings,
#         embedding=None
#     )

#     vector_store.save_local("vector_db")

#     return vector_store


# def load_vector_store():

#     vector_store = FAISS.load_local(
#         "vector_db",
#         embeddings=None,
#         allow_dangerous_deserialization=True
#     )

#     return vector_store

from langchain_community.vectorstores import FAISS


def create_vector_store(chunks, embeddings):

    vector_store = FAISS.from_documents(
        chunks,
        embeddings
    )

    vector_store.save_local("vector_db")

    return vector_store


def load_vector_store():

    from embeddings import load_embeddings

    embeddings = load_embeddings()

    vector_store = FAISS.load_local(
        "vector_db",
        embeddings=embeddings,
        allow_dangerous_deserialization=True
    )

    return vector_store
