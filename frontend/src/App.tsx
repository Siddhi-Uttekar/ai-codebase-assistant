import ChatWindow from "./components/ChatWindow"
import RepoLoader from "./components/RepoLoader"
import HeaderBar from "./components/HeaderBar"
import StatusBar, { type StatusState } from "./components/StatusBar"
import { useState } from "react"

export default function App() {
  const [status, setStatus] = useState<StatusState>({
    message: "",
    tone: "idle"
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 text-[15px] sm:px-6 sm:py-6 sm:text-base lg:px-8">
        <div className="sticky top-0 z-30 space-y-2 pb-3">
          <HeaderBar />
          <StatusBar status={status} />
        </div>

        <main className="mt-2 flex flex-1 flex-col gap-4 sm:mt-4 sm:gap-6">
          <RepoLoader onStatusChange={setStatus} />

          <div className="flex-1">
            <ChatWindow />
          </div>
        </main>
      </div>
    </div>
  )
}