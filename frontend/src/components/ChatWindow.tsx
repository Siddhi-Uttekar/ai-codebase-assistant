import { useState } from "react"
import Message from "./Messege"
import ChatInput from "./ChatInput"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
  sources?: string[]
}

export default function ChatWindow() {

  const [messages, setMessages] = useState<ChatMessage[]>([])

  async function sendQuestion(question: string) {

    const userMessage = {
      role: "user" as const,
      content: question
    }

    setMessages((prev) => [...prev, userMessage])

    const res = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    })

    const data = await res.json()

    const aiMessage = {
      role: "assistant" as const,
      content: data.answer,
      sources: data.sources
    }

    setMessages((prev) => [...prev, aiMessage])
  }

  return (

    <div className="flex flex-col h-[600px] w-full max-w-3xl bg-gray-50 p-6 rounded-xl shadow">

      <div className="flex-1 overflow-y-auto mb-4">

        {messages.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}

      </div>

      <ChatInput onSend={sendQuestion} />

    </div>
  )
}