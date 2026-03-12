import os
import git

REPO_FOLDER = "backend/repo_data"

def clone_repo(repo_url):

    if os.path.exists(REPO_FOLDER):
        return REPO_FOLDER

    git.Repo.clone_from(repo_url, REPO_FOLDER)

    return REPO_FOLDER