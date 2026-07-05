import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google"

import "./globals.css"

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
  // ON LAUNCH DAY: change both index and follow to true.
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  themeColor: "#fbf9f6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
