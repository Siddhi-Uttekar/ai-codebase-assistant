import { useState } from "react"

export default function RepoLoader() {

  const [repo, setRepo] = useState("")

  async function loadRepo() {

    await fetch("http://127.0.0.1:8000/load-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        repo_url: repo
      })
    })

    alert("Repository indexed!")
  }

  return (

    <div className="bg-white p-4 rounded-xl shadow mb-6 w-full max-w-3xl">

      <div className="font-semibold mb-2">
        Load GitHub Repository
      </div>

      <div className="flex gap-2">

        <input
          className="flex-1 border p-2 rounded"
          placeholder="https://github.com/user/repo"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
        />

        <button
          onClick={loadRepo}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Load
        </button>

      </div>

    </div>

  )
}