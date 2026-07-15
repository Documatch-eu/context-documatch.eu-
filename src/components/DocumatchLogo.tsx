import { motion } from 'motion/react';

interface DocumatchLogoProps {
  className?: string;
  isDarkBg?: boolean;
}

export default function DocumatchLogo({ className = "h-10 w-10", isDarkBg = false }: DocumatchLogoProps) {
  return (
    <div className={`relative ${className} shrink-0`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Metallic Outer Frame Gradient - replicates the light highlights and shadows of brushed steel */}
          <linearGradient id="metal-frame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#e2e8f0" />
            <stop offset="45%" stopColor="#94a3b8" />
            <stop offset="55%" stopColor="#cbd5e1" />
            <stop offset="80%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Inner Plate Satin Silver Gradient - with multiple stops to simulate satin reflection */}
          <linearGradient id="metal-plate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="70%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Premium Metallic Blue Gradient for the "D" Face */}
          <linearGradient id="blue-d-face-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" /> {/* Light blue reflection at top */}
            <stop offset="30%" stopColor="#2563eb" /> {/* Vibrant blue body */}
            <stop offset="75%" stopColor="#1d4ed8" /> {/* Rich royal blue */}
            <stop offset="100%" stopColor="#0f172a" /> {/* Deep dark blue-gray shade at bottom */}
          </linearGradient>

          {/* Soft drop shadow for the 3D "D" on the metallic plate */}
          <filter id="d-drop-shadow" x="-15%" y="-15%" width="135%" height="135%">
            <feDropShadow dx="1.5" dy="2.5" stdDeviation="1.5" floodColor="#091e42" floodOpacity="0.45" />
          </filter>

          {/* Dark groove shadow to separate the inner plate from the outer frame */}
          <filter id="groove-inset-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0.5" dy="0.8" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 1. OUTER METALLIC FRAME (Rounded Square with bevels) */}
        <rect 
          x="3" 
          y="3" 
          width="94" 
          height="94" 
          rx="18" 
          fill="url(#metal-frame-grad)" 
          stroke="#94a3b8" 
          strokeWidth="0.5"
        />

        {/* Outer Frame Inner Highlight Edge */}
        <rect 
          x="4.5" 
          y="4.5" 
          width="91" 
          height="91" 
          rx="16.5" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="1" 
          opacity="0.8"
        />

        {/* Dark separating groove between frame and inner plate */}
        <rect 
          x="10" 
          y="10" 
          width="80" 
          height="80" 
          rx="11" 
          fill="none" 
          stroke="#475569" 
          strokeWidth="1.2" 
          filter="url(#groove-inset-shadow)"
          opacity="0.75"
        />

        {/* 2. INNER SATIN SILVER PLATE (Holds the "D") */}
        <rect 
          x="11" 
          y="11" 
          width="78" 
          height="78" 
          rx="10" 
          fill="url(#metal-plate-grad)" 
        />

        {/* Highlight inner rim for realistic 3D depth */}
        <rect 
          x="12" 
          y="12" 
          width="76" 
          height="76" 
          rx="9" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="1" 
          opacity="0.9"
        />

        {/* Fine texture lines of brushed metal (subtle horizontal lines) */}
        <g opacity="0.04" stroke="#000000" strokeWidth="0.5">
          <line x1="12" y1="20" x2="88" y2="20" />
          <line x1="12" y1="30" x2="88" y2="30" />
          <line x1="12" y1="40" x2="88" y2="40" />
          <line x1="12" y1="50" x2="88" y2="50" />
          <line x1="12" y1="60" x2="88" y2="60" />
          <line x1="12" y1="70" x2="88" y2="70" />
          <line x1="12" y1="80" x2="88" y2="80" />
        </g>

        {/* 3. THE BLUE "D" (3D Extruded Metallic Vector) */}
        {/* Shadow layer for the "D" */}
        <path 
          d="M 31 23 H 55 C 72 23 78 33 78 50 C 78 67 72 77 55 77 H 31 V 23 Z M 42 33 H 51 C 60 33 65 39 65 50 C 65 61 60 67 51 67 H 42 V 33 Z" 
          fill="#000000"
          fillRule="evenodd"
          filter="url(#d-drop-shadow)"
          opacity="0.5"
        />

        {/* 3D Extrusion Side Wall - gives the D a thick realistic 3D edge */}
        {/* Multi-layered path offset to simulate 3D relief depth */}
        <path 
          d="M 31 23 H 55 C 72 23 78 33 78 50 C 78 67 72 77 55 77 H 31 V 23 Z M 42 33 H 51 C 60 33 65 39 65 50 C 65 61 60 67 51 67 H 42 V 33 Z" 
          transform="translate(1, 1.5)"
          fill="#0f2b5c" 
          fillRule="evenodd"
        />
        <path 
          d="M 31 23 H 55 C 72 23 78 33 78 50 C 78 67 72 77 55 77 H 31 V 23 Z M 42 33 H 51 C 60 33 65 39 65 50 C 65 61 60 67 51 67 H 42 V 33 Z" 
          transform="translate(0.5, 0.8)"
          fill="#174187" 
          fillRule="evenodd"
        />

        {/* Glossy Front Face of the "D" */}
        <path 
          d="M 31 23 H 55 C 72 23 78 33 78 50 C 78 67 72 77 55 77 H 31 V 23 Z M 42 33 H 51 C 60 33 65 39 65 50 C 65 61 60 67 51 67 H 42 V 33 Z" 
          fill="url(#blue-d-face-grad)" 
          stroke="#1e40af"
          strokeWidth="0.4"
          fillRule="evenodd"
        />

        {/* Edge Highlight (Bevel catch) on the front face of the "D" */}
        <path 
          d="M 31.5 24 H 54.5 C 71 24 76.5 33.5 76.5 50 C 76.5 66.5 71 76 H 31.5 V 24 Z" 
          fill="none" 
          stroke="#93c5fd" 
          strokeWidth="0.8" 
          opacity="0.35"
        />

        {/* 4. INNER D-COUNTER CLEAN COVER UP (Covers any 3D/shadow bleed-through to make the center perfectly silver metallic) */}
        <path 
          d="M 42 33 H 51 C 60 33 65 39 65 50 C 65 61 60 67 51 67 H 42 V 33 Z" 
          fill="url(#metal-plate-grad)" 
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
        {/* Subtle inner shadow for the hole to match the bevel look */}
        <path 
          d="M 42 33 H 51 C 60 33 65 39 65 50 C 65 61 60 67 51 67 H 42 V 33 Z" 
          fill="none" 
          stroke="#1e293b"
          strokeWidth="0.8"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

