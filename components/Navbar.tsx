"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "#fitur", label: "Fitur" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-pumple-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Logo Pumple"
            width={34}
            height={34}
            className="rounded-lg"
            priority
          />
          <span className="text-lg font-extrabold tracking-tight">Pumple</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-pumple-muted transition-colors hover:text-pumple-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#waitlist"
          className="inline-flex min-h-[40px] cursor-pointer items-center rounded-full bg-pumple-green px-5 text-sm font-bold text-pumple-bg transition hover:bg-pumple-lime hover:shadow-glow-sm"
        >
          Gabung Waitlist
        </a>
      </nav>
    </header>
  );
}
