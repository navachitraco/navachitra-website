import { NextResponse } from "next/server"

import { getSupabase, isSupabaseConfigured } from "@/lib/supabaseClient"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request) {
  try {
    if (!isSupabaseConfigured()) {
      console.error("Supabase env vars are not configured")
      return NextResponse.json(
        { message: "Something went wrong. Try again." },
        { status: 500 }
      )
    }

    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    const { error } = await getSupabase().from("subscribers").insert({ email })

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You are already on the list." },
          { status: 200 }
        )
      }

      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { message: "Something went wrong. Try again." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Thanks! We will email you at launch." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Notify API error:", error)
    return NextResponse.json(
      { message: "Something went wrong. Try again." },
      { status: 500 }
    )
  }
}
