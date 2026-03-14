import { useState } from "react"
import Message from "./Messege"
import ChatInput from "./ChatInput"
import EmptyState from "./EmptyState"
const API_URL = import.meta.env.VITE_API_URL

type ChatMessage = {
  role: "user" | "assistant"
  content: string
  sources?: string[]
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function sendQuestion(question: string) {
    if (!question.trim()) return

    const userMessage: ChatMessage = {
      role: "user",
      content: question
    }

    setMessages((prev) => [...prev, userMessage])
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      })

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data = await res.json()

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: data.answer,
        sources: data.sources
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error(err)
      const message = "Something went wrong fetching the answer."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex h-full w-full justify-center">
      <div className="flex h-[520px] w-full max-w-3xl flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl shadow-slate-950/60 sm:h-[580px] sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="text-left">
            <h2 className="text-sm font-semibold tracking-tight text-slate-50 sm:text-base">
              Chat about your codebase
            </h2>
            <p className="text-xs text-slate-400 sm:text-sm">
              Ask questions, explore files, and understand how things fit together.
            </p>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span>Thinking…</span>
            </div>
          )}
        </div>

        <div className="relative mb-3 flex-1 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3">
          {messages.length === 0 && !loading ? (
            <EmptyState />
          ) : (
            <>
              {messages.map((msg, i) => (
                <Message key={i} {...msg} />
              ))}
            </>
          )}
        </div>

        <div className="space-y-2">
          {error && <p className="text-xs text-rose-300">{error}</p>}
          <ChatInput onSend={sendQuestion} disabled={loading} />
        </div>
      </div>
    </section>
  )
}
