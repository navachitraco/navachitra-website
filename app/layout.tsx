import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google"

import { ThemeHotkey } from "@/components/theme-hotkey"
import "./globals.css"

// Runs before paint to set the theme class from the saved choice (or the
// device preference when there is none), avoiding a flash of the wrong theme.
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.classList.toggle("light",!d);}catch(e){}})();`

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
})

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
})

export const metadata: Metadata = {
  title: "Navachitra — A New Image for Every Business",
  description:
    "Navachitra is a social media and web design agency in Surat. A new image for every business we touch. Website launching soon.",
  appleWebApp: {
    title: "Navachitra",
  },
  // ON LAUNCH DAY: change both index and follow to true.
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#2b2723" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">
        <ThemeHotkey />
        {children}
      </body>
    </html>
  )
}
