interface FrogKingProps {
  className?: string;
  waving?: boolean;
}

export default function FrogKing({ className = "", waving = false }: FrogKingProps) {
  return (
    <svg
      viewBox="0 0 220 260"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pumple frog king mascot"
      role="img"
    >
      <defs>
        <radialGradient id="bodyGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="60%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </radialGradient>
        <radialGradient id="headGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="55%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </radialGradient>
        <radialGradient id="eyeGrad" cx="30%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </radialGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="crownGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="capeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <linearGradient id="capeLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>

      {/* ── CAPE ── */}
      <path
        d="M 62 175 Q 18 215 10 258 L 210 258 Q 202 215 158 175 Z"
        fill="url(#capeGrad)"
      />
      {/* Cape fold / sheen */}
      <path
        d="M 62 175 Q 35 205 28 250 L 60 250 Q 72 215 88 180 Z"
        fill="url(#capeLightGrad)"
        opacity="0.6"
      />
      {/* Cape collar line */}
      <path
        d="M 68 172 Q 110 182 152 172"
        stroke="#A78BFA"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />

      {/* ── BODY ── */}
      <ellipse cx="110" cy="175" rx="52" ry="38" fill="url(#bodyGrad)" />
      {/* Belly */}
      <ellipse cx="110" cy="180" rx="32" ry="25" fill="#BBF7D0" opacity="0.45" />

      {/* ── ARMS ── */}
      {/* Left arm */}
      <ellipse
        cx="46"
        cy="182"
        rx="22"
        ry="10"
        fill="url(#bodyGrad)"
        transform="rotate(-25 46 182)"
      />
      <ellipse
        cx="30"
        cy="194"
        rx="14"
        ry="8"
        fill="#4ADE80"
        transform="rotate(-40 30 194)"
      />
      {/* Right arm — waving pose */}
      <ellipse
        cx={waving ? "172" : "174"}
        cy={waving ? "170" : "182"}
        rx="22"
        ry="10"
        fill="url(#bodyGrad)"
        transform={waving ? "rotate(-55 172 170)" : "rotate(25 174 182)"}
      />
      <ellipse
        cx={waving ? "188" : "190"}
        cy={waving ? "155" : "194"}
        rx="14"
        ry="8"
        fill="#4ADE80"
        transform={waving ? "rotate(-70 188 155)" : "rotate(40 190 194)"}
      />

      {/* ── NECK ── */}
      <rect x="89" y="148" width="42" height="28" rx="8" fill="#4ADE80" />

      {/* ── HEAD ── */}
      <ellipse cx="110" cy="108" rx="72" ry="70" fill="url(#headGrad)" />

      {/* ── CROWN ── */}
      {/* Crown base */}
      <rect x="50" y="50" width="120" height="24" rx="5" fill="url(#crownGrad)" filter="url(#crownGlow)" />
      {/* Crown points */}
      <polygon points="50,50 62,14 74,50" fill="url(#crownGrad)" />
      <polygon points="97,50 110,8 123,50" fill="#FCD34D" />
      <polygon points="146,50 158,14 170,50" fill="url(#crownGrad)" />
      {/* Crown shimmer line */}
      <path d="M 52 60 L 168 60" stroke="#FDE68A" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      {/* Gems */}
      <circle cx="110" cy="20" r="7" fill="#EF4444" />
      <circle cx="110" cy="20" r="4" fill="#FCA5A5" opacity="0.6" />
      <circle cx="68" cy="27" r="5" fill="#3B82F6" />
      <circle cx="68" cy="27" r="3" fill="#93C5FD" opacity="0.6" />
      <circle cx="152" cy="27" r="5" fill="#A855F7" />
      <circle cx="152" cy="27" r="3" fill="#D8B4FE" opacity="0.6" />

      {/* ── EYES ── */}
      {/* Left eye socket */}
      <circle cx="76" cy="92" r="26" fill="url(#eyeGrad)" />
      <circle cx="76" cy="92" r="26" fill="none" stroke="#22C55E" strokeWidth="2.5" />
      {/* Right eye socket */}
      <circle cx="144" cy="92" r="26" fill="url(#eyeGrad)" />
      <circle cx="144" cy="92" r="26" fill="none" stroke="#22C55E" strokeWidth="2.5" />
      {/* Pupils */}
      <circle cx="82" cy="95" r="14" fill="#111827" />
      <circle cx="150" cy="95" r="14" fill="#111827" />
      {/* Inner pupil (green tint) */}
      <circle cx="82" cy="95" r="8" fill="#0D1117" />
      <circle cx="150" cy="95" r="8" fill="#0D1117" />
      {/* Eye highlights */}
      <circle cx="88" cy="88" r="6" fill="white" opacity="0.9" />
      <circle cx="156" cy="88" r="6" fill="white" opacity="0.9" />
      <circle cx="77" cy="101" r="3" fill="white" opacity="0.4" />
      <circle cx="145" cy="101" r="3" fill="white" opacity="0.4" />

      {/* ── EYEBROWS (regal/authoritative) ── */}
      <path d="M 58 72 Q 76 64 94 68" stroke="#15803D" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 126 68 Q 144 64 162 72" stroke="#15803D" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* ── NOSTRILS ── */}
      <ellipse cx="101" cy="120" rx="5.5" ry="4" fill="#15803D" opacity="0.7" />
      <ellipse cx="119" cy="120" rx="5.5" ry="4" fill="#15803D" opacity="0.7" />

      {/* ── MOUTH ── */}
      <path
        d="M 76 133 Q 110 156 144 133"
        stroke="#15803D"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Teeth */}
      <path d="M 90 135 L 90 144 Q 95 147 100 144 L 100 137" fill="white" opacity="0.85" />
      <path d="M 120 137 L 120 144 Q 125 147 130 144 L 130 135" fill="white" opacity="0.85" />

      {/* ── CHEEKS ── */}
      <ellipse cx="46" cy="112" rx="16" ry="11" fill="#BBF7D0" opacity="0.35" />
      <ellipse cx="174" cy="112" rx="16" ry="11" fill="#BBF7D0" opacity="0.35" />

      {/* ── FEET ── */}
      <ellipse cx="78" cy="222" rx="24" ry="11" fill="#22C55E" />
      <ellipse cx="142" cy="222" rx="24" ry="11" fill="#22C55E" />
      {/* Toe bumps */}
      <circle cx="60" cy="220" r="7" fill="#16A34A" />
      <circle cx="78" cy="215" r="7" fill="#16A34A" />
      <circle cx="96" cy="220" r="7" fill="#16A34A" />
      <circle cx="124" cy="220" r="7" fill="#16A34A" />
      <circle cx="142" cy="215" r="7" fill="#16A34A" />
      <circle cx="160" cy="220" r="7" fill="#16A34A" />
    </svg>
  );
}
