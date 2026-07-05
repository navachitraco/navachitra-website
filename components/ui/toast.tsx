"use client"

import { Toaster as HotToaster, toast } from "react-hot-toast"
import { InfoIcon } from "lucide-react"

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
    toast.success(<ToastContent title={title} description={description} />),
  error: (title: string, description?: string) =>
    toast.error(<ToastContent title={title} description={description} />),
  info: (title: string, description?: string) =>
    toast(<ToastContent title={title} description={description} />, {
      icon: (
        <InfoIcon
          className="size-5 shrink-0"
          style={{ color: "var(--color-brand)" }}
        />
      ),
    }),
}

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      gutter={10}
      containerStyle={{ top: 24 }}
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--popover)",
          color: "var(--popover-foreground)",
          border: "none",
          borderRadius: "calc(var(--radius) * 2)",
          // boxShadow:
          //   "0 1px 2px color-mix(in oklch, var(--color-ink) 8%, transparent), 0 18px 44px -18px color-mix(in oklch, var(--color-ink) 38%, transparent)",
          padding: "0.875rem 1.125rem",
          maxWidth: "24rem",
          gap: "0.75rem",
        },
        success: {
          iconTheme: {
            primary: "var(--color-success)",
            secondary: "var(--popover)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--color-danger)",
            secondary: "var(--popover)",
          },
        },
      }}
    />
  )
}
