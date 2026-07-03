import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "#fitur", label: "Fitur" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#faq", label: "FAQ" },
  { href: "#waitlist", label: "Waitlist" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Logo Pumple"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-extrabold tracking-tight">Pumple</span>
            </Link>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-pumple-dim">
              Pump smarter, not harder.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-pumple-muted transition-colors hover:text-pumple-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/5 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-pumple-dim">
            Pumple adalah alat bantu analisis, bukan penasihat keuangan. Trading crypto
            berisiko tinggi dan bisa menyebabkan kehilangan seluruh modal — selalu lakukan
            riset sendiri sebelum mengambil keputusan.
          </p>
          <p className="mt-4 font-mono text-xs text-pumple-dim">
            © 2026 Pumple. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
