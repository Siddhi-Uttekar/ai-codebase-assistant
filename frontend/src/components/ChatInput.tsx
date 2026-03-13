import { useState } from "react"

type Props = {
  onSend: (question: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [question, setQuestion] = useState("")

  function handleSend() {
    if (!question.trim() || disabled) return
    onSend(question)
    setQuestion("")
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <div className="flex-1">
        <textarea
          rows={1}
          className="max-h-32 min-h-[44px] w-full resize-none rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40"
          placeholder="Ask about the codebase…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <p className="mt-1 text-[10px] text-slate-500">
          Press Enter to send, Shift+Enter for a new line.
        </p>
      </div>

      <button
        type="button"
        onClick={handleSend}
        disabled={disabled}
        className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 hover:shadow-emerald-400/40 disabled:cursor-not-allowed disabled:bg-emerald-800 disabled:text-emerald-200 sm:mt-0"
      >
        Send
      </button>
    </div>
  )
}