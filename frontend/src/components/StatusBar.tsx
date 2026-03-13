export type StatusTone = "idle" | "info" | "success" | "error"

export type StatusState = {
  message: string
  tone: StatusTone
}

type Props = {
  status: StatusState
}

export default function StatusBar({ status }: Props) {
  const toneClasses: Record<StatusTone, string> = {
    idle: "hidden",
    info: "border-sky-700/70 bg-sky-900/80 text-sky-100",
    success: "border-emerald-700/70 bg-emerald-900/80 text-emerald-100",
    error: "border-rose-700/70 bg-rose-900/80 text-rose-100"
  }

  if (!status.message) {
    return null
  }

  return (
    <div
      className={`w-full rounded-xl border px-4 py-2 text-sm font-medium ${toneClasses[status.tone]}`}
    >
      {status.message}
    </div>
  )
}
