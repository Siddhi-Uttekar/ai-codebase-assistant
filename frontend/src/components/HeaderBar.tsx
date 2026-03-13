export default function HeaderBar() {
  return (
    <header className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-[15px] shadow-lg shadow-slate-950/60 backdrop-blur sm:px-6 sm:text-base">
      <div className="text-left">
        <div className="text-base font-semibold tracking-tight sm:text-lg">
          AI Codebase Assistant
        </div>
        <p className="text-sm text-slate-300 sm:text-[15px]">
          Ask questions about any GitHub repo you index.
        </p>
      </div>
    </header>
  )
}
