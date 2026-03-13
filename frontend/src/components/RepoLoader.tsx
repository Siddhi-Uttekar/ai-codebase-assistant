import { useState } from "react"
import type { StatusState } from "./StatusBar"

type Props = {
  onStatusChange?: (status: StatusState) => void
}

export default function RepoLoader({ onStatusChange }: Props) {
  const [repo, setRepo] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function validateRepo(url: string) {
    if (!url.trim()) return "Please paste a GitHub repository URL."
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "Repository URL should start with http:// or https://."
    }
    if (!url.includes("github.com")) {
      return "This assistant currently expects a GitHub repository URL."
    }
    return null
  }

  async function loadRepo() {
    const validationError = validateRepo(repo)
    if (validationError) {
      setError(validationError)
      onStatusChange?.({
        message: validationError,
        tone: "error"
      })
      return
    }

    setError(null)
    setLoading(true)
    onStatusChange?.({
      message: "Indexing repository…",
      tone: "info"
    })

    try {
      const res = await fetch("http://127.0.0.1:8000/load-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          repo_url: repo
        })
      })

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`)
      }

      onStatusChange?.({
        message: "Status: Waiting for assistant respons",
        tone: "info"
      })
    } catch (err) {
      console.error(err)
      const message = "Could not index repository. Check the URL and backend."
      setError(message)
      onStatusChange?.({
        message,
        tone: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl shadow-slate-950/60 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-left">
            <h2 className="text-sm font-semibold tracking-tight text-slate-50 sm:text-base">
              Load GitHub repository
            </h2>
            <p className="text-xs text-slate-400 sm:text-sm">
              Paste a public repo URL to index its codebase for questions.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
            placeholder="https://github.com/user/repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                e.preventDefault()
                loadRepo()
              }
            }}
          />

          <button
            type="button"
            onClick={loadRepo}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 hover:shadow-emerald-400/40 disabled:cursor-not-allowed disabled:bg-emerald-800 disabled:text-emerald-200"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-900 border-t-transparent" />
                Indexing…
              </span>
            ) : (
              "Load repo"
            )}
          </button>
        </div>

        <div className="min-h-[1.5rem] text-xs">
          {error ? (
            <p className="text-rose-300">{error}</p>
          ) : (
            <p className="text-slate-400">
              Tip: Start with a smaller repo to get a feel for the assistant.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}