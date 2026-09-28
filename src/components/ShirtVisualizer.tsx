import React from 'react';
import { ShirtPattern, ShirtCustomization } from '../types';
import { RefreshCw } from 'lucide-react';

interface ShirtVisualizerProps {
  shirt: ShirtCustomization;
  onChange?: (shirt: ShirtCustomization) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PATTERNS: { id: ShirtPattern; name: string; desc: string }[] = [
  { id: 'spiral', name: 'Spiral', desc: 'Rotational vortex' },
  { id: 'accordion', name: 'Accordion', desc: 'Pleated linear stripes' },
  { id: 'bullseye', name: 'Bullseye', desc: 'Concentric circles' },
  { id: 'freeform', name: 'Freeform', desc: 'Organic marble crumple' },
];

const COLOR_PALETTES = [
  { name: 'Cosmic Splash', c1: '#0ea5e9', c2: '#ec4899', c3: '#eab308' },
  { name: 'Prism Neon', c1: '#8b5cf6', c2: '#06b6d4', c3: '#10b981' },
  { name: 'Sunset Glow', c1: '#f97316', c2: '#ef4444', c3: '#eab308' },
  { name: 'Ocean Depth', c1: '#0284c7', c2: '#14b8a6', c3: '#6366f1' },
  { name: 'Forest Spark', c1: '#059669', c2: '#84cc16', c3: '#0284c7' },
];

export const ShirtVisualizer: React.FC<ShirtVisualizerProps> = ({
  shirt,
  onChange,
  readOnly = false,
  size = 'md',
}) => {
  const { pattern, primaryColor, secondaryColor, accentColor } = shirt;

  const handleRandomize = () => {
    if (!onChange) return;
    const randomPalette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    const randomPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)].id;
    onChange({
      pattern: randomPattern,
      primaryColor: randomPalette.c1,
      secondaryColor: randomPalette.c2,
      accentColor: randomPalette.c3,
    });
  };

  const getSvgPattern = () => {
    switch (pattern) {
      case 'spiral':
        return (
          <g>
            <circle cx="150" cy="150" r="140" fill={primaryColor} />
            <path
              d="M150,150 C190,110 210,180 250,160 C290,140 280,240 220,270 C160,300 90,260 70,200 C50,140 100,70 170,50 C240,30 300,100 290,190"
              stroke={secondaryColor}
              strokeWidth="45"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M150,150 C110,190 70,160 50,110 C30,60 110,30 180,30 C250,30 270,110 240,170"
              stroke={accentColor}
              strokeWidth="32"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="150" cy="150" r="30" fill={accentColor} opacity="0.9" />
          </g>
        );

      case 'accordion':
        return (
          <g>
            <rect width="300" height="300" fill={primaryColor} />
            {[35, 85, 135, 185, 235, 285].map((y, idx) => (
              <rect
                key={y}
                x="0"
                y={y - 18}
                width="300"
                height="30"
                fill={idx % 2 === 0 ? secondaryColor : accentColor}
                opacity="0.88"
                transform={`rotate(${idx % 2 === 0 ? -3 : 3} 150 ${y})`}
              />
            ))}
          </g>
        );

      case 'bullseye':
        return (
          <g>
            <rect width="300" height="300" fill={primaryColor} />
            <circle cx="150" cy="150" r="120" fill={secondaryColor} opacity="0.88" />
            <circle cx="150" cy="150" r="85" fill={accentColor} opacity="0.9" />
            <circle cx="150" cy="150" r="50" fill={primaryColor} opacity="0.92" />
            <circle cx="150" cy="150" r="22" fill={secondaryColor} />
          </g>
        );

      case 'freeform':
      default:
        return (
          <g>
            <rect width="300" height="300" fill={primaryColor} />
            <circle cx="80" cy="90" r="80" fill={secondaryColor} opacity="0.75" />
            <circle cx="210" cy="90" r="75" fill={accentColor} opacity="0.75" />
            <circle cx="150" cy="190" r="95" fill={secondaryColor} opacity="0.7" />
            <circle cx="70" cy="220" r="65" fill={accentColor} opacity="0.8" />
            <circle cx="230" cy="220" r="70" fill={primaryColor} opacity="0.8" />
            <path
              d="M40,60 Q120,130 90,240 T230,220"
              stroke="#ffffff"
              strokeWidth="10"
              fill="none"
              opacity="0.35"
            />
          </g>
        );
    }
  };

  const containerDimensions =
    size === 'sm' ? 'w-24 h-24' : size === 'lg' ? 'w-64 h-64 sm:w-72 sm:h-72' : 'w-44 h-44 sm:w-48 sm:h-48';

  return (
    <div className="flex flex-col items-center">
      {/* T-Shirt SVG with Tie-Dye Clip */}
      <div className={`relative ${containerDimensions} drop-shadow-md select-none transition-transform hover:scale-[1.02]`}>
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <clipPath id={`shirt-clip-${shirt.pattern}-${size}`}>
              <path d="M95,28 C115,48 185,48 205,28 L285,75 L252,130 L220,112 L220,272 C220,278 214,284 206,284 L94,284 C86,284 80,278 80,272 L80,112 L48,130 L15,75 Z" />
            </clipPath>
            <filter id="fabric-blur">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>

          {/* Background drop shadow base */}
          <path
            d="M95,28 C115,48 185,48 205,28 L285,75 L252,130 L220,112 L220,272 C220,278 214,284 206,284 L94,284 C86,284 80,278 80,272 L80,112 L48,130 L15,75 Z"
            fill="#e2e8f0"
          />

          {/* Dyed Pattern clipped to Shirt */}
          <g clipPath={`url(#shirt-clip-${shirt.pattern}-${size})`} filter="url(#fabric-blur)">
            {getSvgPattern()}
          </g>

          {/* Shirt details, collar, seams */}
          <path
            d="M95,28 C115,48 185,48 205,28 L285,75 L252,130 L220,112 L220,272 C220,278 214,284 206,284 L94,284 C86,284 80,278 80,272 L80,112 L48,130 L15,75 Z"
            fill="none"
            stroke="#475569"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Collar ring */}
          <path
            d="M95,28 C115,48 185,48 205,28 C195,58 105,58 95,28 Z"
            fill="none"
            stroke="#334155"
            strokeWidth="3"
          />
          {/* Sleeve seams */}
          <line x1="220" y1="112" x2="250" y2="78" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="80" y1="112" x2="50" y2="78" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
        </svg>

        {/* Floating badge for active pattern */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow backdrop-blur whitespace-nowrap capitalize">
          {shirt.pattern}
        </div>
      </div>

      {/* Pattern Controls (if not read-only) */}
      {!readOnly && onChange && (
        <div className="w-full mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Pattern Selection:</span>
            <button
              type="button"
              onClick={handleRandomize}
              className="text-xs text-black hover:text-slate-700 font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3 text-black" /> Randomize Colors
            </button>
          </div>

          {/* 4 Pattern Buttons: Spiral, Accordion, Bullseye, Freeform */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
            {PATTERNS.map((p) => {
              const isSelected = shirt.pattern === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onChange({ ...shirt, pattern: p.id })}
                  className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-black hover:bg-slate-200/50'
                  }`}
                  title={p.desc}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* Color pickers */}
          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <span className="text-slate-500">Dye Colors Used:</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 cursor-pointer" title="Primary Dye Color">
                <input
                  type="color"
                  value={shirt.primaryColor}
                  onChange={(e) => onChange({ ...shirt, primaryColor: e.target.value })}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer p-0"
                />
              </label>
              <label className="flex items-center gap-1 cursor-pointer" title="Secondary Dye Color">
                <input
                  type="color"
                  value={shirt.secondaryColor}
                  onChange={(e) => onChange({ ...shirt, secondaryColor: e.target.value })}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer p-0"
                />
              </label>
              <label className="flex items-center gap-1 cursor-pointer" title="Accent Dye Color">
                <input
                  type="color"
                  value={shirt.accentColor}
                  onChange={(e) => onChange({ ...shirt, accentColor: e.target.value })}
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer p-0"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
