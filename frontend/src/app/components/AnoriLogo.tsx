export function AnoriLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" className={className}>
      {/* AN */}
      <text x="5" y="88" fontFamily="'Times New Roman', Georgia, serif" fontSize="78" fontWeight="bold" fill="#111111" letterSpacing="4">
        AN
      </text>

      {/* Geometric Pomegranate Icon (as O) */}
      <g transform="translate(155, 18)">
        {/* Outer Hexagon shape */}
        <polygon points="45,30 65,30 80,45 80,70 65,95 45,95 30,70 30,45" fill="#E60039" />
        
        {/* Diamond 3D Facets */}
        <polygon points="55,25 45,30 55,62.5" fill="#FF2E63" />
        <polygon points="55,25 65,30 55,62.5" fill="#D80032" />
        <polygon points="65,30 80,45 55,62.5" fill="#C70039" />
        <polygon points="80,45 80,70 55,62.5" fill="#900C3F" />
        <polygon points="80,70 65,95 55,62.5" fill="#750E21" />
        <polygon points="65,95 45,95 55,62.5" fill="#A00028" />
        <polygon points="45,95 30,70 55,62.5" fill="#D80032" />
        <polygon points="30,70 30,45 55,62.5" fill="#FF1E56" />
        <polygon points="30,45 45,30 55,62.5" fill="#FF4D79" />
        
        {/* Pomegranate Crown at top */}
        <polygon points="48,26 40,10 55,18 70,10 62,26" fill="#C70039" />
        
        {/* Small scattered crystal seeds */}
        <polygon points="78,96 85,94 88,102 81,104" fill="#C70039" />
        <polygon points="88,90 94,92 92,97 86,96" fill="#E60039" />
      </g>

      {/* RI */}
      <text x="260" y="88" fontFamily="'Times New Roman', Georgia, serif" fontSize="78" fontWeight="bold" fill="#111111" letterSpacing="4">
        RI
      </text>

      {/* Subtitle Tagline */}
      <text x="10" y="128" fontFamily="'Montserrat', 'Helvetica Neue', sans-serif" fontSize="15" fontWeight="600" fill="#222222" letterSpacing="6.2">
        JEWELLERY AND ACCESSORIES STORE
      </text>
    </svg>
  );
}
