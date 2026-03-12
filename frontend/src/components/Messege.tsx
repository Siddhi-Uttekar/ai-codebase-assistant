import ReactMarkdown from "react-markdown"

type Props = {
  role: "user" | "assistant"
  content: string
  sources?: string[]
}

export default function Message({ role, content, sources }: Props) {
  return (
    <div className={`mb-6 flex ${role === "user" ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-xl p-4 rounded-xl shadow
        ${role === "user"
          ? "bg-blue-500 text-white"
          : "bg-white text-gray-800"}
      `}
      >
        <ReactMarkdown>{content}</ReactMarkdown>

        {sources && (
          <div className="mt-3 text-xs text-gray-500 border-t pt-2">
            <div className="font-semibold">Sources</div>
            {sources.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </div>
        )}

      </div>

    </div>
  )
}