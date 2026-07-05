"use client"

import { Toaster as HotToaster, toast } from "react-hot-toast"

const EMOJIS = {
  success: "✅",
  error: "❌",
  info: "⚠️",
} as const

function ToastEmoji({ variant }: { variant: keyof typeof EMOJIS }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 text-lg leading-none select-none"
    >
      {EMOJIS[variant]}
    </span>
  )
}

function ToastContent({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[0.9rem] leading-snug font-semibold tracking-[-0.006em]">
        {title}
      </span>
      {description ? (
        <span className="text-[0.8rem] leading-relaxed text-ink-soft">
          {description}
        </span>
      ) : null}
    </div>
  )
}

export const notify = {
  success: (title: string, description?: string) =>
    toast.success(<ToastContent title={title} description={description} />, {
      icon: <ToastEmoji variant="success" />,
    }),
  error: (title: string, description?: string) =>
    toast.error(<ToastContent title={title} description={description} />, {
      icon: <ToastEmoji variant="error" />,
    }),
  info: (title: string, description?: string) =>
    toast(<ToastContent title={title} description={description} />, {
      icon: <ToastEmoji variant="info" />,
    }),
}

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      gutter={10}
      containerStyle={{ top: 32 }}
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--toast-bg)",
          color: "var(--popover-foreground)",
          border: "none",
          borderRadius: "calc(var(--radius) * 2)",
          boxShadow: "none",
          padding: "0.875rem 1.125rem",
          maxWidth: "24rem",
        },
      }}
    />
  )
}
