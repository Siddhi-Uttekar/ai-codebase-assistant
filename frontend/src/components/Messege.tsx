import ReactMarkdown from "react-markdown"

type Props = {
  role: "user" | "assistant"
  content: string
  sources?: string[]
}

export default function Message({ role, content, sources }: Props) {
  const isUser = role === "user"

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl rounded-2xl px-4 py-3 text-sm shadow-md shadow-slate-950/40 transition
        ${isUser
          ? "bg-emerald-500 text-emerald-950"
          : "bg-slate-800/80 text-slate-50 border border-slate-700"}`}
      >
        <div className="prose prose-invert prose-pre:bg-slate-900 prose-pre:text-xs prose-code:text-emerald-200 prose-p:mb-2 last:prose-p:mb-0">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {sources && sources.length > 0 && (
          <div className="mt-3 border-t border-slate-700 pt-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Sources
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sources.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-200 ring-1 ring-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}