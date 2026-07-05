"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "motion/react"

import { Icon } from "@iconify/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

const socialLinks = [
  {
    href: "https://instagram.com/navachitraco",
    label: "Instagram",
    icon: "tabler:brand-instagram-filled",
  },
  {
    href: "https://facebook.com/navachitraco",
    label: "Facebook",
    icon: "tabler:brand-facebook-filled",
  },
  {
    href: "https://wa.me/?text=Hi%20Navachitra",
    label: "WhatsApp",
    icon: "tabler:brand-whatsapp-filled",
  },
] as const

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
          <Link
            href="/"
            aria-label="Navachitra home"
            className="inline-flex text-ink"
          >
            <svg
              viewBox="0 0 1459 768"
              role="img"
              aria-hidden="true"
              className="h-7 w-auto"
            >
              <path
                d="M0 767V70.172L331.813 3L330.75 310.5H339.156C341.25 276.906 345.984 242.078 353.328 206.031C360.672 169.984 372.578 137.265 389.031 107.859C405.469 78.453 427.344 54.125 454.656 34.875C481.954 15.625 516.25 6 557.563 6C589.751 6 618.454 11.438 643.657 22.281C668.845 33.125 690.204 48 707.704 66.89C725.204 85.78 738.673 108.171 748.126 134.062C757.579 159.953 763.001 187.937 764.407 218.031V767H442.063L438.907 253.547C438.907 231.859 436.454 214 431.548 200C426.642 186 418.251 179 406.36 179C395.157 179 385.532 187.578 377.485 204.734C369.422 221.89 362.594 243.578 357.001 269.828C351.408 296.078 346.86 324.953 343.36 356.453C339.86 387.953 337.235 418.578 335.485 448.328C333.735 478.078 332.501 504.687 331.797 528.125C331.094 551.578 330.75 568.203 330.75 578L331.813 767H0ZM781.657 129.219C824.282 84.406 878.97 51.656 945.704 31C1012.44 10.344 1086.06 0 1166.56 0L1445.86 1L1379.7 311C1368.5 285.109 1356.78 260.969 1344.53 238.562C1332.28 216.155 1319.5 194.812 1306.2 174.499C1295 157.702 1282.75 141.077 1269.45 124.624C1256.14 108.186 1242.31 93.483 1227.97 80.53C1213.63 67.577 1198.75 57.249 1183.34 49.546C1167.94 41.859 1152.55 38 1137.16 38C1114.05 38 1094.8 48.141 1079.41 68.406C1064 88.672 1051.58 113.312 1042.13 142.312C1032.67 171.312 1026.02 201.718 1022.17 233.515C1018.33 265.312 1016.41 292.39 1016.41 314.749C1017.1 349.687 1022.17 386.733 1031.63 425.858C1041.08 464.999 1054.74 501.171 1072.58 534.358C1090.42 567.561 1112.3 594.811 1138.2 616.124C1164.11 637.437 1194.2 647.405 1228.5 645.999C1247.41 645.311 1264.91 641.64 1281 634.983C1297.09 628.326 1311.97 619.936 1325.63 609.78C1339.28 599.624 1351.7 588.077 1362.91 575.124C1374.09 562.186 1384.25 548.702 1393.36 534.702C1403.86 518.608 1413.49 501.624 1422.24 483.78C1430.99 465.936 1438.86 446.858 1445.86 426.546L1458.45 428.655C1445.86 476.249 1429.41 520.702 1409.11 561.999C1388.8 603.312 1363.59 639.202 1333.5 669.687C1303.41 700.172 1268.05 724.171 1227.45 741.703C1186.86 759.235 1139.95 768 1086.75 768C1025.88 768 971.345 756.281 923.142 732.812C874.939 709.343 833.033 677.656 797.408 637.718V218.531V215.375C796 183.859 790.75 155.141 781.657 129.219Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <nav aria-label="Social media" className="flex items-center gap-4">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ink transition-opacity hover:opacity-80"
              >
                <Icon icon={icon} className="size-5" />
              </a>
            ))}
          </nav>
        </motion.header>

        <main className="relative flex flex-1 items-center justify-center px-6 pb-[6svh]">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="w-full max-w-3xl text-center"
          >
            <motion.div variants={rise} className="flex justify-center">
              <Badge
                variant="ghost"
                className="h-auto gap-2.5 rounded-full border-0 bg-black/5 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.22em] text-ink uppercase shadow-none backdrop-blur-md transition-colors hover:bg-black/8 sm:px-5 sm:py-2.5 sm:text-xs dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15"
              >
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-ink opacity-50 motion-safe:animate-ping dark:bg-white" />
                  <span className="relative size-2 rounded-full bg-ink dark:bg-white/90" />
                </span>
                Launching soon
              </Badge>
            </motion.div>

            <motion.h1
              variants={rise}
              className="mt-7 font-display text-[clamp(3rem,8.5vw,6rem)] leading-[1.04] font-bold tracking-[-0.025em] text-balance text-ink"
            >
              A new image for every business we touch.
            </motion.h1>

            <motion.p
              variants={rise}
              className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-pretty text-ink-soft sm:text-xl"
            >
              Navachitra is a social media and web design studio from Surat. Our
              new home is almost ready. Be the first to see it.
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
                    <span className="flex size-7 items-center justify-center rounded-full bg-brand text-sm font-bold text-paper">
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
                    className="flex items-center gap-2 rounded-full bg-field p-1.5 pl-5 transition-shadow focus-within:ring-2 focus-within:ring-brand-deep/70"
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
                      className="h-auto flex-1 rounded-none border-0 bg-transparent px-0 py-1 text-lg shadow-none outline-0! placeholder:text-ink-faint focus-visible:border-0 focus-visible:ring-0 disabled:opacity-60"
                    />
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      size="lg"
                      className="h-auto rounded-full px-6 py-3 text-base font-semibold whitespace-nowrap"
                    >
                      {status === "sending" ? "Sending…" : "Notify me"}
                    </Button>
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
                <p className="mt-4 text-base text-ink-faint">
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
          className="relative flex items-center justify-between px-6 py-6 text-sm text-ink sm:px-10 sm:text-base"
        >
          <p className="inline-flex cursor-default items-center gap-2 transition-opacity duration-200 hover:opacity-70">
            <Icon
              icon="tabler:map-pin-filled"
              className="size-[1.125rem] shrink-0 sm:size-5"
            />
            Surat, India
          </p>
          <p>© 2026 Navachitra</p>
        </motion.footer>
      </div>
    </MotionConfig>
  )
}
