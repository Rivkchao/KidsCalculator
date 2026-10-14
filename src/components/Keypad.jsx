import React from 'react';
import { Plus, Minus, X, Divide, Equal, RotateCcw } from 'lucide-react';

export default function Keypad({ onKeyPress }) {
  // Color configuration for 3D candy buttons
  const buttons = [
    // Row 1
    { key: 'C', label: 'C', sub: 'Reset', type: 'clear', bg: 'bg-rose-400', shadow: 'shadow-[0_5px_0_#be123c]', text: 'text-white' },
    { key: '(', label: '(', type: 'paren', bg: 'bg-indigo-300', shadow: 'shadow-[0_5px_0_#4f46e5]', text: 'text-white' },
    { key: ')', label: ')', type: 'paren', bg: 'bg-indigo-300', shadow: 'shadow-[0_5px_0_#4f46e5]', text: 'text-white' },
    { key: '/', label: '÷', sub: 'Bagi', type: 'op', bg: 'bg-amber-400', shadow: 'shadow-[0_5px_0_#b45309]', text: 'text-white' },

    // Row 2
    { key: '7', label: '7', type: 'num', bg: 'bg-sky-400', shadow: 'shadow-[0_5px_0_#0284c7]', text: 'text-white' },
    { key: '8', label: '8', type: 'num', bg: 'bg-emerald-400', shadow: 'shadow-[0_5px_0_#047857]', text: 'text-white' },
    { key: '9', label: '9', type: 'num', bg: 'bg-purple-400', shadow: 'shadow-[0_5px_0_#6b21a8]', text: 'text-white' },
    { key: '*', label: '×', sub: 'Kali', type: 'op', bg: 'bg-amber-400', shadow: 'shadow-[0_5px_0_#b45309]', text: 'text-white' },

    // Row 3
    { key: '4', label: '4', type: 'num', bg: 'bg-pink-400', shadow: 'shadow-[0_5px_0_#be185d]', text: 'text-white' },
    { key: '5', label: '5', type: 'num', bg: 'bg-teal-400', shadow: 'shadow-[0_5px_0_#0f766e]', text: 'text-white' },
    { key: '6', label: '6', type: 'num', bg: 'bg-violet-400', shadow: 'shadow-[0_5px_0_#5b21b6]', text: 'text-white' },
    { key: '-', label: '-', sub: 'Kurang', type: 'op', bg: 'bg-orange-400', shadow: 'shadow-[0_5px_0_#c2410c]', text: 'text-white' },

    // Row 4
    { key: '1', label: '1', type: 'num', bg: 'bg-lime-500', shadow: 'shadow-[0_5px_0_#4d7c0f]', text: 'text-white' },
    { key: '2', label: '2', type: 'num', bg: 'bg-cyan-400', shadow: 'shadow-[0_5px_0_#0e7490]', text: 'text-white' },
    { key: '3', label: '3', type: 'num', bg: 'bg-fuchsia-400', shadow: 'shadow-[0_5px_0_#86198f]', text: 'text-white' },
    { key: '+', label: '+', sub: 'Tambah', type: 'op', bg: 'bg-orange-400', shadow: 'shadow-[0_5px_0_#c2410c]', text: 'text-white' },

    // Row 5
    { key: '0', label: '0', type: 'num', bg: 'bg-yellow-400', shadow: 'shadow-[0_5px_0_#a16207]', text: 'text-white', span: 'col-span-2' },
    { key: '.', label: '.', type: 'dot', bg: 'bg-slate-300', shadow: 'shadow-[0_5px_0_#64748b]', text: 'text-slate-800' },
    { key: '=', label: '=', sub: 'Hasil!', type: 'equals', bg: 'bg-gradient-to-r from-pink-500 to-rose-500', shadow: 'shadow-[0_5px_0_#9f1239]', text: 'text-white' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-2.5 md:gap-3.5 lg:gap-4 p-0.5 sm:p-1">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => onKeyPress(btn.key)}
          className={`
            ${btn.span || 'col-span-1'}
            ${btn.bg}
            ${btn.shadow}
            ${btn.text}
            rounded-2xl sm:rounded-3xl lg:rounded-[2rem] p-1.5 sm:p-2.5 md:p-3 lg:p-4
            min-h-[48px] xs:min-h-[52px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[82px]
            font-fredoka font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
            flex flex-col items-center justify-center
            transition-all duration-75
            hover:brightness-105
            active:translate-y-[4px] active:shadow-[0_1px_0_currentColor]
            focus:outline-none
            relative overflow-hidden group cursor-pointer
          `}
        >
          {/* Subtle glossy 3D shine effect */}
          <div className="absolute top-1 left-2 right-2 h-2.5 lg:h-3.5 bg-white/30 rounded-full pointer-events-none" />

          {/* Main Button Label */}
          <span className="relative z-10 leading-none">{btn.label}</span>

          {/* Cute micro sub-label for kids (e.g. 'Tambah', 'Kali') */}
          {btn.sub && (
            <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-xs lg:text-sm tracking-tight opacity-90 font-medium leading-tight mt-0.5 md:mt-1 relative z-10">
              {btn.sub}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
