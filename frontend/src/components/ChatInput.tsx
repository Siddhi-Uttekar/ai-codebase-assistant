import { useState } from "react"

type Props = {
  onSend: (question: string) => void
}

export default function ChatInput({ onSend }: Props) {

  const [question, setQuestion] = useState("")

  function handleSend() {
    if (!question) return
    onSend(question)
    setQuestion("")
  }

  return (
    <div className="flex gap-2">

      <input
        className="flex-1 border rounded-lg p-3"
        placeholder="Ask about the codebase..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-green-500 text-white px-4 rounded-lg"
      >
        Send
      </button>

    </div>
  )
}