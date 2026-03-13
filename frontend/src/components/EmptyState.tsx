const examplePrompts = [
  "How is authentication wired up in this repo?",
  "Where is the main API client implemented?",
  "Explain the flow when a user signs up.",
  "Find performance bottlenecks in the checkout flow."
]

export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-slate-400">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
          Ready when you are
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Load a GitHub repository above, then ask anything about its codebase.
        </p>
      </div>

      <div className="w-full max-w-md rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-3 text-left">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Try asking one of these:
        </p>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {examplePrompts.map((prompt) => (
            <li key={prompt} className="rounded-lg bg-slate-800/80 px-3 py-2">
              {prompt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

