import ChatWindow from "./components/ChatWindow"
import RepoLoader from "./components/RepoLoader"

export default function App() {

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

      <h1 className="text-3xl font-bold mb-6">
        AI Codebase Assistant
      </h1>

      <RepoLoader />

      <ChatWindow />

    </div>

  )
}