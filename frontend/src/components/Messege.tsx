import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

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
        className={`max-w-xl rounded-2xl px-4 py-3 text-[15px] shadow-md shadow-slate-950/40 transition
        ${isUser
          ? "bg-emerald-500 text-emerald-950"
          : "bg-slate-800/90 text-slate-50 border border-slate-700/80"}`}
      >
        <div className="prose prose-invert prose-headings:text-[17px] prose-headings:font-semibold prose-h2:mt-3 prose-h2:mb-2 prose-h3:mt-3 prose-h3:mb-1 prose-strong:text-emerald-300 prose-a:text-emerald-300 prose-a:underline prose-code:text-[13px] prose-pre:bg-slate-900/90 prose-pre:text-xs prose-pre:border prose-pre:border-slate-700/80 prose-pre:rounded-xl prose-li:my-0.5">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h2: ({ node, ...props }) => (
                <h2 {...props}>
                  {/* subtle emoji accent for assistant headings */}
                  {!isUser && "💡 "}
                  {props.children}
                </h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props}>
                  {!isUser && "👉 "}
                  {props.children}
                </h3>
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {sources && sources.length > 0 && (
          <div className="mt-3 border-t border-slate-700 pt-2">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Sources
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sources.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-slate-900/90 px-2.5 py-1 text-[11px] text-slate-100 ring-1 ring-slate-700/80"
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