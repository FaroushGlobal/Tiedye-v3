import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface LogoProps {
  className?: string;
}

/**
 * Candidate filenames to check in the /public folder
 * Priority order for the user's actual DAC logo
 */
const CANDIDATE_PATHS = [
  '/dac-logo.png',
  '/DAC logo2 (2).png',
  '/dac-logo.svg',
  '/dac-logo.jpg',
  '/dac-logo.jpeg',
  '/dac-logo.webp',
  '/logos/dac-logo.png',
];

/**
 * Divided Attention Clothing (DAC) Logo Component
 * Positioned to the left of the REFLECTION tab in the header.
 * - Shows a sleek placeholder if the user has not yet added their actual logo file.
 * - Automatically renders the actual image once added to the /public folder (e.g. /public/dac-logo.png).
 */
export const DacLogo: React.FC<LogoProps> = ({ className = 'h-7 sm:h-8 w-auto' }) => {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const [candidateIdx, setCandidateIdx] = useState<number>(0);
  const [allFailed, setAllFailed] = useState<boolean>(false);

  useEffect(() => {
    // Reset state to test candidates
    setCandidateIdx(0);
    setAllFailed(false);
    setActiveSrc(null);
  }, []);

  const currentCandidate = CANDIDATE_PATHS[candidateIdx];

  const handleImageError = () => {
    if (candidateIdx + 1 < CANDIDATE_PATHS.length) {
      setCandidateIdx((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const handleImageLoad = () => {
    setActiveSrc(currentCandidate);
  };

  return (
    <div
      className="flex items-center select-none py-0.5"
      title="Divided Attention Clothing (DAC) Logo placeholder — add dac-logo.png in the public folder"
      aria-label="DAC Logo Placeholder"
    >
      {/* Hidden preloader to probe candidate images */}
      {!activeSrc && !allFailed && (
        <img
          key={currentCandidate}
          src={currentCandidate}
          alt=""
          className="hidden"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {activeSrc ? (
        // Actual DAC logo image provided by the user in /public
        <img
          src={activeSrc}
          alt="Divided Attention Clothing (DAC)"
          className={`${className} object-contain transition-transform duration-200 hover:scale-105`}
          style={{ maxHeight: '34px' }}
        />
      ) : (
        // Clean, professional placeholder UI
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/90 text-slate-700 transition-colors group cursor-default">
          <div className="w-5 h-5 rounded bg-black flex items-center justify-center text-[10px] font-black text-white tracking-tight shrink-0">
            DAC
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-800 tracking-tight">
              DAC Logo
            </span>
            <span className="hidden md:inline-block text-[10px] text-slate-400 font-medium border border-slate-200 rounded px-1 py-0.2 bg-white">
              Placeholder
            </span>
          </div>
          <ImageIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0 ml-0.5" />
        </div>
      )}
    </div>
  );
};
