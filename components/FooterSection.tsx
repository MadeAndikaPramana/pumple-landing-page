import Image from "next/image";

const footerLinks = [
  {
    label: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    label: "Community",
    links: [
      { label: "Discord", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Risk Disclaimer", href: "#" },
    ],
  },
];

const SocialIcon = ({ d }: { d: string }) => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);

export default function FooterSection() {
  return (
    <footer className="relative border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      {/* Top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4 group w-fit">
              <Image src="/logo.png" width={32} height={32} alt="Pumple" className="object-contain" />
              <span className="text-xl font-bold text-[#F5F5F5] group-hover:text-[#4ADE80] transition-colors">
                Pumple
              </span>
            </a>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-6 max-w-[220px]">
              Pump Smarter, Not Harder.{" "}
              <span className="text-[#4ADE80]">AI Crypto Analyst</span> untuk trader Indonesia.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                {
                  label: "Twitter",
                  d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "Discord",
                  d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.96 13.96 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z",
                },
                {
                  label: "Telegram",
                  d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#4ADE80] transition-all duration-200 hover:bg-[#4ADE80]/8"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <SocialIcon d={s.d} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.label}>
              <p className="text-xs font-bold text-[#F5F5F5] uppercase tracking-widest mb-4">
                {col.label}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#6B7280] hover:text-[#F5F5F5] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs text-[#4B5563] text-center sm:text-left">
            © 2025 Pumple. Made with{" "}
            <Image src="/mascot.png" width={20} height={20} alt="Pumple" className="object-contain inline-block align-middle" style={{ filter: "brightness(1.5) contrast(1.1)" }} />{" "}
            in Indonesia.
          </p>
          <p className="text-xs text-[#4B5563] text-center">
            ⚠️ Bukan financial advice. Selalu lakukan riset sendiri (DYOR).
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span className="text-xs text-[#6B7280]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
