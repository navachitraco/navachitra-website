"use client"

import { useState } from "react"
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "motion/react"

// PASTE YOUR WEB3FORMS ACCESS KEY BELOW.
// Replace "YOUR_WEB3FORMS_KEY" with the access key from https://web3forms.com
// (free — signups will arrive in your email inbox, no backend needed).
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_KEY"

type FormStatus = "idle" | "sending" | "success"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
}

const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.1, delay: 0.6, ease: "easeOut" },
  },
}

export default function Home() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setStatus("sending")
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New Navachitra launch signup",
          from_name: "Navachitra Coming Soon page",
          email: trimmedEmail,
        }),
      })
      const result = await response.json()

      if (result.success) {
        setStatus("success")
      } else {
        setStatus("idle")
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setStatus("idle")
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-svh flex-col overflow-hidden">
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[60svh]"
        />

        <motion.header
          variants={fade}
          initial="hidden"
          animate="show"
          className="relative flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8"
        >
          <p className="group font-display text-lg font-semibold tracking-tight">
            Navachitra
            <span className="inline-block text-accent-deep transition-transform duration-500 ease-out group-hover:rotate-[135deg] motion-reduce:transition-none">
              *
            </span>
          </p>
          <a
            href="https://instagram.com/navachitraco"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            @navachitraco
          </a>
        </motion.header>

        <main className="relative flex flex-1 items-center justify-center px-6 pb-[6svh]">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="w-full max-w-3xl text-center"
          >
            <motion.p
              variants={rise}
              className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-ink-soft uppercase"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              Launching soon
            </motion.p>

            <motion.h1
              variants={rise}
              className="mt-7 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.04] font-bold tracking-[-0.025em] text-balance"
            >
              A new image for every business we touch.
            </motion.h1>

            <motion.p
              variants={rise}
              className="mx-auto mt-6 max-w-md text-base leading-relaxed text-pretty text-ink-soft sm:text-lg"
            >
              Navachitra is a social media and web design studio from Surat.
              Our new home is almost ready. Be the first to see it.
            </motion.p>

            <motion.div variants={rise} className="mx-auto mt-10 max-w-md">
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    role="status"
                    className="flex items-center justify-center gap-3 py-3"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-paper">
                      ✓
                    </span>
                    <p className="font-medium">
                      You&apos;re on the list. We&apos;ll email you at launch.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex items-center gap-2 rounded-full bg-field p-1.5 pl-5 transition-shadow focus-within:ring-2 focus-within:ring-accent-deep/70"
                  >
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      aria-invalid={Boolean(error)}
                      disabled={status === "sending"}
                      className="w-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-faint disabled:opacity-60"
                    />
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="rounded-full bg-ink px-6 py-3 text-sm font-semibold whitespace-nowrap text-paper disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Notify me"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  role="alert"
                  className="mt-3 text-sm font-medium text-danger"
                >
                  {error}
                </motion.p>
              )}

              {status !== "success" && (
                <p className="mt-4 text-xs text-ink-faint">
                  One email at launch. No spam, ever.
                </p>
              )}
            </motion.div>
          </motion.div>
        </main>

        <motion.footer
          variants={fade}
          initial="hidden"
          animate="show"
          className="relative flex items-center justify-between px-6 py-6 text-xs text-ink-faint sm:px-10"
        >
          <p>Surat, India</p>
          <p>© 2026 Navachitra</p>
        </motion.footer>
      </div>
    </MotionConfig>
  )
}
