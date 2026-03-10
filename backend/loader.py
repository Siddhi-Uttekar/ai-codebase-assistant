import os

def load_code_files(repo_path):

    documents = []

    for root, dirs, files in os.walk(repo_path):

        for file in files:

            if file.endswith((".py",".js",".ts",".java",".cpp")):

                path = os.path.join(root,file)

                with open(path,"r",encoding="utf-8") as f:

                    content = f.read()

                documents.append({
                    "file_path": path,
                    "content": content
                })

    return documents