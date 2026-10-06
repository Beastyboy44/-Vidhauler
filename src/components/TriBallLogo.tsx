import React from 'react';

interface TriBallLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  activeCount?: number;
}

export const TriBallLogo: React.FC<TriBallLogoProps> = ({
  size = 'md',
  animated = false,
  activeCount,
}) => {
  const sizeMap = {
    sm: { container: 'w-7 h-7', ball: 'w-2.5 h-2.5', spread: 7 },
    md: { container: 'w-9 h-9', ball: 'w-3 h-3', spread: 9 },
    lg: { container: 'w-14 h-14', ball: 'w-4.5 h-4.5', spread: 14 },
    xl: { container: 'w-20 h-20', ball: 'w-6 h-6', spread: 20 },
  };

  const config = sizeMap[size];

  return (
    <div className={`relative flex items-center justify-center ${config.container}`}>
      {/* 3 Balls: Red (Top), Yellow/Gold (Bottom Left), Blue (Bottom Right) */}
      <div className={`relative w-full h-full flex items-center justify-center ${animated ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
        {/* Top Ball - Red */}
        <div
          className={`absolute top-0.5 rounded-full bg-gradient-to-br from-red-400 to-rose-600 shadow-sm shadow-red-500/50 ${config.ball}`}
          style={{ filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.7))' }}
        />
        {/* Bottom Left Ball - Yellow */}
        <div
          className={`absolute bottom-0.5 left-0.5 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-sm shadow-amber-500/50 ${config.ball}`}
          style={{ filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.7))' }}
        />
        {/* Bottom Right Ball - Blue */}
        <div
          className={`absolute bottom-0.5 right-0.5 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-sm shadow-blue-500/50 ${config.ball}`}
          style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.7))' }}
        />
      </div>

      {/* Optional Badge Count */}
      {typeof activeCount === 'number' && activeCount > 0 && (
        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 min-w-4 text-[9px] font-black rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-slate-950 shadow-md">
          {activeCount}
        </span>
      )}
    </div>
  );
};
