import React from 'react';

interface HaTraderLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
}

export const HaTraderLogo: React.FC<HaTraderLogoProps> = ({
  className = '',
  theme = 'auto',
  size = 'md',
  showSubtext = true,
}) => {
  // Size metrics
  const iconSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  const titleSizes = {
    sm: 'text-base font-extrabold tracking-tight leading-none',
    md: 'text-xl font-black tracking-tight leading-none',
    lg: 'text-3xl font-black tracking-tight leading-none',
  };

  const subtextSizes = {
    sm: 'text-[9px] tracking-[0.2em] font-bold mt-0.5',
    md: 'text-[11px] tracking-[0.22em] font-bold mt-1',
    lg: 'text-sm tracking-[0.25em] font-bold mt-1.5',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Blue Squircle Icon with White H and Green Uptrend Arrow */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center bg-[#0066FF] shadow-sm shadow-blue-500/20 shrink-0 overflow-hidden`}
        style={{
          boxShadow: '0 2px 8px rgba(0, 102, 255, 0.25)',
        }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Bold White Letter 'H' with rounded caps */}
          <path
            d="M13 10V38M35 10V38M13 24H35"
            stroke="white"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vivid Green Rising Trend Line Across H */}
          <path
            d="M13 32L21 24L29 27L39 15"
            stroke="#10B981"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Trendline Arrowhead */}
          <path
            d="M34 15H39V20"
            stroke="#10B981"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center">
        <span
          className={`${titleSizes[size]} ${
            theme === 'dark'
              ? 'text-white'
              : theme === 'light'
              ? 'text-slate-900'
              : 'text-slate-900 dark:text-white'
          } uppercase font-sans`}
          style={{ letterSpacing: '-0.02em' }}
        >
          HA TRADER
        </span>
        {showSubtext && (
          <span
            className={`${subtextSizes[size]} uppercase text-[#0066FF] dark:text-[#38BDF8] font-sans`}
          >
            TRADING ACADEMY
          </span>
        )}
      </div>
    </div>
  );
};
