export function AnoriLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 160" className={className}>
      {/* AN */}
      <text x="5" y="96" fontFamily="'Didot', 'Bodoni MT', 'Cinzel', 'Times New Roman', serif" fontSize="88" fontWeight="bold" fill="#1A1A1A" letterSpacing="2">
        AN
      </text>

      {/* Precise Low-Poly Crystal Pomegranate (O) */}
      <g transform="translate(182, 10)">
        {/* Crown Leaves */}
        <polygon points="50,22 38,2 52,14 62,0 60,18" fill="#C8102E" />
        <polygon points="60,18 78,4 68,22" fill="#9B001C" />

        {/* Facet Structure - Top & Center Star Pattern */}
        {/* Center Top Facet */}
        <polygon points="55,20 72,36 55,56 38,36" fill="#E60039" />
        {/* Top Right */}
        <polygon points="72,36 94,32 82,58 55,56" fill="#C8102E" />
        {/* Far Right */}
        <polygon points="94,32 102,54 88,78 82,58" fill="#9B001C" />
        {/* Bottom Right */}
        <polygon points="88,78 78,100 55,84 82,58" fill="#780016" />
        {/* Bottom Center Right */}
        <polygon points="78,100 55,104 55,84" fill="#580010" />
        {/* Bottom Center Left */}
        <polygon points="55,104 32,100 55,84" fill="#800018" />
        {/* Bottom Left */}
        <polygon points="32,100 22,78 28,58 55,84" fill="#A80024" />
        {/* Far Left */}
        <polygon points="22,78 14,54 38,36 28,58" fill="#D40030" />
        {/* Top Left */}
        <polygon points="14,54 38,36 55,20 16,32" fill="#FF1E56" />

        {/* Center Lower Highlight Facets */}
        <polygon points="55,56 82,58 55,84" fill="#B00020" />
        <polygon points="55,56 55,84 28,58" fill="#E60039" />

        {/* Outer Fine Edges */}
        <polygon points="16,32 38,36 55,20" fill="#FF3366" />
        <polygon points="55,20 72,36 94,32" fill="#D40030" />

        {/* Broken Scattered Crystal Seeds (Bottom Right) */}
        <polygon points="96,102 104,98 108,108 99,112" fill="#C8102E" />
        <polygon points="106,92 114,94 112,102 104,100" fill="#E60039" />
        <polygon points="112,106 117,104 118,110 113,112" fill="#9B001C" />
      </g>

      {/* RI */}
      <text x="312" y="96" fontFamily="'Didot', 'Bodoni MT', 'Cinzel', 'Times New Roman', serif" fontSize="88" fontWeight="bold" fill="#1A1A1A" letterSpacing="2">
        RI
      </text>

      {/* Subtitle Tagline */}
      <text x="8" y="140" fontFamily="'Montserrat', 'Helvetica Neue', sans-serif" fontSize="15.5" fontWeight="600" fill="#222222" letterSpacing="7 font-sans">
        JEWELLERY AND ACCESSORIES STORE
      </text>
    </svg>
  );
}
