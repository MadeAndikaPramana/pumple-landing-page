import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isValidEmail, normalizeEmail } from "@/lib/validate";

export async function POST(request: Request) {
  let body: { email?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Honeypot: humans never see this field — if it's filled, respond as if it
  // succeeded so bots don't learn their submission was dropped
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const email = normalizeEmail(typeof body.email === "string" ? body.email : "");
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "That email doesn't look valid. Mind checking it?" },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("waitlist: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY is not set");
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again in a moment." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    // 23505 = unique_violation di Postgres
    if (error.code === "23505") {
      return NextResponse.json(
        {
          ok: false,
          error: "This email is already on the waitlist — just wait for your invite.",
        },
        { status: 409 }
      );
    }
    console.error("waitlist insert error:", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't save your email. Please try again in a moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
