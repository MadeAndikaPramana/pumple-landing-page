import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isValidEmail, normalizeEmail } from "@/lib/validate";

export async function POST(request: Request) {
  let body: { email?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Request tidak valid." },
      { status: 400 }
    );
  }

  // Honeypot: manusia tidak melihat field ini — kalau terisi, balas seolah
  // sukses supaya bot tidak tahu submitnya dibuang
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const email = normalizeEmail(typeof body.email === "string" ? body.email : "");
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Format email-nya belum valid. Cek lagi ya." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("waitlist: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diset");
    return NextResponse.json(
      { ok: false, error: "Ada gangguan di server. Coba lagi sebentar lagi." },
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
          error: "Email ini sudah ada di waitlist — tinggal tunggu undangannya.",
        },
        { status: 409 }
      );
    }
    console.error("waitlist insert error:", error);
    return NextResponse.json(
      { ok: false, error: "Gagal menyimpan email. Coba lagi sebentar lagi." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
