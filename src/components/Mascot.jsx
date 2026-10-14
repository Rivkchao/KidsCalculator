import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Mascot({ mood = 'idle', message = 'Halo teman pintar! Yuk berhitung bareng! 🌟' }) {
  const [character, setCharacter] = useState('kitty'); // 'kitty' | 'bunny' | 'bear'

  const toggleCharacter = () => {
    if (character === 'kitty') setCharacter('bunny');
    else if (character === 'bunny') setCharacter('bear');
    else setCharacter('kitty');
  };

  return (
    <div className="flex flex-col items-center justify-center mb-3 sm:mb-4 lg:mb-5 z-10 relative">
      {/* Speech Bubble */}
      <div className="relative bg-white/95 backdrop-blur-sm border-2 sm:border-3 border-pink-300 rounded-2xl sm:rounded-3xl px-3.5 py-1.5 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 shadow-md text-xs sm:text-sm md:text-base lg:text-lg font-bold text-purple-700 text-center max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md animate-bounce-soft transition-all">
        <span className="flex items-center justify-center gap-1.5 sm:gap-2">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-bubble-yellow fill-bubble-yellow animate-spin" style={{ animationDuration: '4s' }} />
          {message}
        </span>
        {/* Bubble tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-pink-300" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
      </div>

      {/* Mascot Avatar (Clickable to switch animal!) */}
      <button
        onClick={toggleCharacter}
        title="Klik untuk ganti teman hewan lucu!"
        className="mt-2 sm:mt-3 lg:mt-4 mb-1 group relative cursor-pointer focus:outline-none transition-transform hover:scale-110 active:scale-95"
      >
        {/* Cute Ears & Head container - Smoothly scales up on tablet & desktop */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 relative flex items-center justify-center transition-transform scale-100 sm:scale-110 lg:scale-125 origin-center">
          {/* Character 1: Cute Kitty 🐱 */}
          {character === 'kitty' && (
            <div className={`relative w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-300 rounded-full shadow-lg transition-transform ${mood === 'cheering' ? 'animate-wiggle scale-110' : ''}`}>
              {/* Ears */}
              <div className="absolute -top-3 left-1 w-6 h-6 bg-amber-200 border-3 border-amber-300 rotate-[-20deg] rounded-tl-lg">
                <div className="w-3 h-3 bg-pink-300 rounded-tl-sm m-0.5" />
              </div>
              <div className="absolute -top-3 right-1 w-6 h-6 bg-amber-200 border-3 border-amber-300 rotate-[20deg] rounded-tr-lg">
                <div className="w-3 h-3 bg-pink-300 rounded-tr-sm m-0.5" />
              </div>
              {/* Eyes */}
              <div className="absolute top-6 left-4 flex gap-6">
                {mood === 'cheering' ? (
                  <>
                    <span className="text-sm font-bold text-amber-900">^</span>
                    <span className="text-sm font-bold text-amber-900">^</span>
                  </>
                ) : mood === 'thinking' ? (
                  <>
                    <div className="w-2.5 h-3 bg-amber-950 rounded-full -translate-y-1" />
                    <div className="w-2.5 h-3 bg-amber-950 rounded-full -translate-y-1" />
                  </>
                ) : mood === 'surprised' ? (
                  <>
                    <div className="w-3 h-3 bg-amber-950 rounded-full ring-2 ring-amber-300" />
                    <div className="w-3 h-3 bg-amber-950 rounded-full ring-2 ring-amber-300" />
                  </>
                ) : (
                  <>
                    <div className="w-2.5 h-2.5 bg-amber-950 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-amber-950 rounded-full" />
                  </>
                )}
              </div>
              {/* Rosy Cheeks */}
              <div className="absolute top-8 left-2 w-3 h-2 bg-pink-300/80 rounded-full blur-[0.5px]" />
              <div className="absolute top-8 right-2 w-3 h-2 bg-pink-300/80 rounded-full blur-[0.5px]" />
              {/* Cute Nose & Mouth */}
              <div className="absolute top-9 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-2 h-1.5 bg-pink-500 rounded-full" />
                <div className="text-[10px] font-bold text-amber-900 -mt-1">{mood === 'cheering' ? 'w' : '3'}</div>
              </div>
              {/* Whiskers */}
              <div className="absolute top-8 -left-1 w-2.5 h-[1.5px] bg-amber-400 rotate-[-10deg]" />
              <div className="absolute top-10 -left-1 w-2.5 h-[1.5px] bg-amber-400 rotate-[10deg]" />
              <div className="absolute top-8 -right-1 w-2.5 h-[1.5px] bg-amber-400 rotate-[10deg]" />
              <div className="absolute top-10 -right-1 w-2.5 h-[1.5px] bg-amber-400 rotate-[-10deg]" />
            </div>
          )}

          {/* Character 2: Cute Bunny 🐰 */}
          {character === 'bunny' && (
            <div className={`relative w-20 h-20 bg-gradient-to-br from-pink-50 to-pink-100 border-4 border-pink-300 rounded-full shadow-lg transition-transform ${mood === 'cheering' ? 'animate-wiggle scale-110' : ''}`}>
              {/* Long Bunny Ears */}
              <div className="absolute -top-7 left-2 w-5 h-10 bg-pink-100 border-2 border-pink-300 rounded-t-full rotate-[-12deg]">
                <div className="w-2.5 h-7 bg-pink-300/60 rounded-t-full mx-auto mt-1" />
              </div>
              <div className="absolute -top-7 right-2 w-5 h-10 bg-pink-100 border-2 border-pink-300 rounded-t-full rotate-[12deg]">
                <div className="w-2.5 h-7 bg-pink-300/60 rounded-t-full mx-auto mt-1" />
              </div>
              {/* Eyes */}
              <div className="absolute top-7 left-4 flex gap-6">
                {mood === 'cheering' ? (
                  <>
                    <span className="text-sm font-bold text-pink-900">★</span>
                    <span className="text-sm font-bold text-pink-900">★</span>
                  </>
                ) : (
                  <>
                    <div className="w-2.5 h-2.5 bg-pink-950 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-pink-950 rounded-full" />
                  </>
                )}
              </div>
              {/* Cheeks & Nose */}
              <div className="absolute top-8 left-2 w-3 h-2 bg-pink-400/70 rounded-full" />
              <div className="absolute top-8 right-2 w-3 h-2 bg-pink-400/70 rounded-full" />
              <div className="absolute top-9 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-pink-500 rounded-full" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] text-pink-900 font-bold">ω</div>
            </div>
          )}

          {/* Character 3: Cute Bear 🐻 */}
          {character === 'bear' && (
            <div className={`relative w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-300 border-4 border-amber-400 rounded-full shadow-lg transition-transform ${mood === 'cheering' ? 'animate-wiggle scale-110' : ''}`}>
              {/* Round Bear Ears */}
              <div className="absolute -top-2 left-0 w-6 h-6 bg-amber-300 border-2 border-amber-400 rounded-full">
                <div className="w-3 h-3 bg-amber-500 rounded-full m-1" />
              </div>
              <div className="absolute -top-2 right-0 w-6 h-6 bg-amber-300 border-2 border-amber-400 rounded-full">
                <div className="w-3 h-3 bg-amber-500 rounded-full m-1" />
              </div>
              {/* Snout */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-8 h-6 bg-amber-100 rounded-full border border-amber-300 flex flex-col items-center justify-center">
                <div className="w-2.5 h-2 bg-amber-950 rounded-full" />
                <div className="text-[9px] text-amber-950 font-bold -mt-0.5">ᴗ</div>
              </div>
              {/* Eyes */}
              <div className="absolute top-6 left-4 flex gap-7">
                <div className="w-2.5 h-2.5 bg-amber-950 rounded-full" />
                <div className="w-2.5 h-2.5 bg-amber-950 rounded-full" />
              </div>
            </div>
          )}

          {/* Little heart badge indicating switchable character */}
          <div className="absolute -bottom-0.5 -right-0.5 bg-white border border-pink-300 rounded-full p-1 shadow-sm group-hover:scale-110 transition-transform">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          </div>
        </div>
      </button>

      {/* Interactive Switch Character Pill Badge (Well above the calculator container!) */}
      <button
        onClick={toggleCharacter}
        title="Klik untuk ganti teman hewan lucu!"
        className="mt-1 px-3 py-1 sm:px-4 sm:py-1.5 lg:px-5 lg:py-2 bg-white/95 hover:bg-white border-2 border-purple-200 hover:border-pink-300 rounded-full shadow-xs text-[11px] sm:text-xs lg:text-sm font-bold text-purple-600 hover:text-pink-600 flex items-center gap-1.5 sm:gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>Ganti Teman:</span>
        <span className="text-pink-600 font-black">
          {character === 'kitty' ? 'Kiki 🐱' : character === 'bunny' ? 'Bubu 🐰' : 'Bobi 🐻'}
        </span>
        <span className="text-[10px] sm:text-xs text-purple-400">🔄</span>
      </button>
    </div>
  );
}
