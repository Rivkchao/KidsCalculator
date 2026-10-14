import React, { useState } from 'react';
import { Delete, Sparkles } from 'lucide-react';

const OBJECT_THEMES = [
  { id: 'apple', icon: '🍎', label: 'Apel' },
  { id: 'star', icon: '⭐️', label: 'Bintang' },
  { id: 'candy', icon: '🍭', label: 'Permen' },
  { id: 'balloon', icon: '🎈', label: 'Balon' },
  { id: 'cat', icon: '🐱', label: 'Kucing' },
];

export default function Display({
  expression = '',
  currentValue = '0',
  isResult = false,
  onBackspace,
  onClear,
}) {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);

  const cycleTheme = () => {
    setActiveThemeIndex((prev) => (prev + 1) % OBJECT_THEMES.length);
  };

  const currentTheme = OBJECT_THEMES[activeThemeIndex];

  // Calculate number of visual objects to display (between 1 and 20)
  const numericVal = parseInt(currentValue, 10);
  const showVisualCounter = !isNaN(numericVal) && numericVal > 0 && numericVal <= 20;

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-pink-50 border-3 sm:border-4 lg:border-5 border-bubble-blue/30 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] p-3 sm:p-4 md:p-5 lg:p-6 shadow-[inset_0_4px_16px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all">
      {/* Background cute polka dots / sparkles decoration */}
      <div className="absolute top-2 right-3 lg:top-3 lg:right-4 flex gap-1 opacity-60 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-bubble-yellow fill-bubble-yellow animate-pulse" />
      </div>

      {/* Expression history row */}
      <div className="flex items-center justify-between min-h-[24px] sm:min-h-[28px] lg:min-h-[32px] text-slate-400 font-bold text-xs sm:text-sm md:text-base lg:text-lg tracking-wide px-1 sm:px-2">
        <span className="truncate max-w-[200px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[400px]">
          {expression || 'Siap berhitung... ✨'}
        </span>

        {/* Backspace Button */}
        {currentValue !== '0' && (
          <button
            onClick={onBackspace}
            title="Hapus satu angka"
            className="p-1 sm:p-1.5 rounded-full text-pink-400 hover:text-pink-600 hover:bg-pink-100 transition-colors"
          >
            <Delete className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        )}
      </div>

      {/* Main Number Display */}
      <div className="flex items-baseline justify-end px-1 sm:px-2 py-0.5 sm:py-1 lg:py-2 overflow-x-auto custom-scrollbar">
        <span
          className={`font-black tracking-tight text-right transition-all duration-200 select-all break-all ${
            isResult
              ? 'text-bubble-pink text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl scale-105 drop-shadow-[0_2px_6px_rgba(255,107,151,0.25)]'
              : 'text-slate-700 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
          }`}
        >
          {currentValue}
        </span>
      </div>

      {/* Visual Counting Bar (Interactive Visual Math for Kids) */}
      <div className="mt-1.5 sm:mt-2.5 lg:mt-3 pt-1.5 sm:pt-2.5 border-t-2 border-dashed border-pink-200 flex flex-col gap-1 sm:gap-2">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-bold text-purple-500">
          <span className="flex items-center gap-1">
            Bantu Hitung Visual:
          </span>
          <button
            onClick={cycleTheme}
            title="Klik untuk ganti icon hitung!"
            className="px-2 py-0.5 sm:px-3 sm:py-1 lg:px-4 lg:py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-transform active:scale-90"
          >
            Ganti: {currentTheme.icon} {currentTheme.label}
          </button>
        </div>

        {/* Bouncing Visual Objects */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 min-h-[30px] sm:min-h-[38px] lg:min-h-[46px] max-h-24 lg:max-h-32 overflow-y-auto custom-scrollbar p-1 sm:p-2 bg-white/70 rounded-xl sm:rounded-2xl border border-pink-100">
          {showVisualCounter ? (
            Array.from({ length: numericVal }).map((_, idx) => (
              <span
                key={idx}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl animate-bounce-soft transition-transform hover:scale-125 inline-block"
                style={{ animationDelay: `${(idx % 5) * 0.1}s` }}
              >
                {currentTheme.icon}
              </span>
            ))
          ) : numericVal > 20 ? (
            <span className="text-xs sm:text-sm lg:text-base font-bold text-amber-600 flex items-center gap-1">
              🎉 Wow, angkanya banyak sekali ({numericVal})! 🚀
            </span>
          ) : (
            <span className="text-xs sm:text-sm lg:text-base font-semibold text-slate-300 italic">
              Tekan angka untuk melihat benda hitung...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
