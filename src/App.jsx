import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, HelpCircle, Calculator, Mic, MicOff } from 'lucide-react';
import Mascot from './components/Mascot';
import Display from './components/Display';
import Keypad from './components/Keypad';
import QuizMode from './components/QuizMode';
import HistoryDrawer from './components/HistoryDrawer';
import {
  playXylophoneNote,
  playOperatorSound,
  playClearSound,
  playSuccessFanfare,
  triggerConfetti,
  speakText,
} from './utils/soundEffects';

// Encouraging mascot phrases
const CHEER_MESSAGES = [
  'Wah hebat sekali! Jawabannya pas! 🎉',
  'Pintar banget! Yuk coba hitung lagi! 🌟',
  'Keren! Bintang lima buat kamu! ⭐️',
  'Luar biasa! Matematika jadi gampang! 🚀',
  'Horeee! Kamu juara berhitung hari ini! 🏆',
];

const THINKING_MESSAGES = [
  'Berapa ya hasilnya? Yuk kita hitung! 🤔',
  'Sedang mikir nih... Teruskan angkanya! 💡',
  'Kira-kira berapa ya? Penasaran deh! 🎈',
];

// Safe arithmetic expression parser
function safeEvaluate(expr) {
  // Only allow digits, +, -, *, /, ., (, ) and spaces
  const cleanExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
  if (!/^[\d+\-*/.() ]+$/.test(cleanExpr)) {
    throw new Error('Ekspresi tidak valid');
  }

  // Prevent divide by zero
  if (/\/0(?![.\d])/.test(cleanExpr)) {
    throw new Error('Tidak bisa bagi nol');
  }

  // Use Function constructor in isolated scope
  const result = new Function(`'use strict'; return (${cleanExpr})`)();

  if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
    throw new Error('Hasil tidak valid');
  }

  // Round decimals to avoid floating point precision quirks like 0.1 + 0.2 = 0.30000000000000004
  return Math.round((result + Number.EPSILON) * 100000) / 100000;
}

export default function App() {
  const [expression, setExpression] = useState('');
  const [currentValue, setCurrentValue] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [mascotMood, setMascotMood] = useState('idle');
  const [mascotMessage, setMascotMessage] = useState('Halo teman pintar! Yuk berhitung bareng! 🌟');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('calc'); // 'calc' | 'quiz' | 'history'

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'calc') return;
      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        handleKeyPress(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleKeyPress(key);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleKeyPress('=');
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        handleClear();
      } else if (key === '.') {
        handleKeyPress('.');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyPress = (key) => {
    // 1. CLEAR
    if (key === 'C') {
      handleClear();
      return;
    }

    // 2. EQUALS (=)
    if (key === '=') {
      handleCalculate();
      return;
    }

    // 3. OPERATORS (+, -, *, /)
    if (['+', '-', '*', '/'].includes(key)) {
      playOperatorSound(key, soundEnabled);
      setMascotMood('thinking');
      const randomThinking = THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)];
      setMascotMessage(randomThinking);

      const opSymbol = key === '*' ? '×' : key === '/' ? '÷' : key;
      const speechLabel = key === '+' ? 'tambah' : key === '-' ? 'kurang' : key === '*' ? 'kali' : 'bagi';
      speakText(speechLabel, voiceEnabled);

      if (isResult) {
        setExpression(`${currentValue} ${opSymbol} `);
        setCurrentValue('0');
        setIsResult(false);
      } else {
        setExpression((prev) => `${prev}${currentValue} ${opSymbol} `);
        setCurrentValue('0');
      }
      return;
    }

    // 4. PARENTHESIS ( or )
    if (key === '(' || key === ')') {
      playOperatorSound(key, soundEnabled);
      if (key === '(') {
        setExpression((prev) => `${prev}( `);
      } else {
        setExpression((prev) => `${prev}${currentValue} ) `);
        setCurrentValue('0');
      }
      return;
    }

    // 5. DECIMAL POINT (.)
    if (key === '.') {
      playXylophoneNote('.', soundEnabled);
      if (isResult) {
        setCurrentValue('0.');
        setExpression('');
        setIsResult(false);
      } else if (!currentValue.includes('.')) {
        setCurrentValue((prev) => prev + '.');
      }
      return;
    }

    // 6. NUMBERS (0-9)
    playXylophoneNote(key, soundEnabled);
    speakText(key, voiceEnabled);
    setMascotMood('thinking');

    if (isResult) {
      setCurrentValue(key);
      setExpression('');
      setIsResult(false);
    } else {
      if (currentValue === '0') {
        setCurrentValue(key);
      } else {
        // Max 10 digits for clean kid display
        if (currentValue.length < 10) {
          setCurrentValue((prev) => prev + key);
        }
      }
    }
  };

  const handleCalculate = () => {
    try {
      const fullExpression = `${expression}${currentValue}`;
      if (!fullExpression.trim()) return;

      const evalResult = safeEvaluate(fullExpression);
      const resultString = String(evalResult);

      setExpression(`${fullExpression} =`);
      setCurrentValue(resultString);
      setIsResult(true);

      // Save to history
      setHistory((prev) => [
        { expression: fullExpression, result: resultString, timestamp: Date.now() },
        ...prev.slice(0, 19),
      ]);

      // Celebrate!
      playSuccessFanfare(soundEnabled);
      triggerConfetti();
      speakText(`Sama dengan ${resultString}`, voiceEnabled);

      setMascotMood('cheering');
      const randomCheer = CHEER_MESSAGES[Math.floor(Math.random() * CHEER_MESSAGES.length)];
      setMascotMessage(randomCheer);
    } catch (err) {
      setMascotMood('surprised');
      playClearSound(soundEnabled);
      if (err.message.includes('bagi nol')) {
        setMascotMessage('Waduh, tidak bisa dibagi 0! 🙈 Coba angka lain ya!');
        setCurrentValue('Ups! 🙈');
      } else {
        setMascotMessage('Hmm, ada rumus yang keliru! Yuk periksa lagi! ✨');
        setCurrentValue('Error');
      }
      setIsResult(true);
    }
  };

  const handleClear = () => {
    playClearSound(soundEnabled);
    setExpression('');
    setCurrentValue('0');
    setIsResult(false);
    setMascotMood('idle');
    setMascotMessage('Ting tong! Layar sudah bersih kembali! ✨');
  };

  const handleBackspace = () => {
    if (isResult) {
      handleClear();
      return;
    }
    if (currentValue.length > 1) {
      setCurrentValue((prev) => prev.slice(0, -1));
    } else {
      setCurrentValue('0');
    }
  };

  const handleUseFromQuiz = (expr) => {
    setActiveTab('calc');
    setExpression('');
    setCurrentValue(expr);
    setIsResult(false);
    setMascotMessage('Ayo tekan tanda sama dengan (=) untuk lihat hasilnya! 🚀');
  };

  return (
    <div className="relative min-h-screen py-6 sm:py-8 lg:py-12 px-3 sm:px-6 flex flex-col items-center justify-center">
      {/* Cute Floating Background Decorations - Spread out nicely on desktop */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-14 lg:top-16 lg:left-24 text-4xl sm:text-5xl lg:text-6xl animate-float opacity-80 pointer-events-none">☁️</div>
      <div className="absolute top-16 right-6 sm:top-14 sm:right-16 lg:top-20 lg:right-28 text-4xl sm:text-5xl lg:text-6xl animate-float opacity-80 pointer-events-none" style={{ animationDelay: '1.5s' }}>🌈</div>
      <div className="absolute bottom-10 left-8 sm:bottom-16 sm:left-20 lg:bottom-24 lg:left-32 text-3xl sm:text-4xl lg:text-5xl animate-bounce-soft opacity-70 pointer-events-none">⭐</div>
      <div className="absolute bottom-16 right-8 sm:bottom-20 sm:right-24 lg:bottom-28 lg:right-36 text-4xl sm:text-5xl lg:text-6xl animate-float opacity-70 pointer-events-none" style={{ animationDelay: '2.5s' }}>🎈</div>

      {/* Main Container: Scales beautifully from Mobile (<400px), Tablet (600-800px), to Desktop (1024px+) */}
      <div className="w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] relative z-10 flex flex-col items-center">
        {/* Animated Cute Mascot with Dynamic Speech Bubble */}
        <Mascot mood={mascotMood} message={mascotMessage} />

        {/* The Calculator Body */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] p-3 sm:p-5 md:p-6 lg:p-7 border-4 sm:border-5 lg:border-6 border-bubble-pink shadow-[0_16px_48px_rgba(255,107,151,0.24)] relative flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5">
          {/* Top Bar: Title & Utility Toggles (Sound, Voice, Tabs) */}
          <div className="flex items-center justify-between px-0.5 sm:px-1">
            {/* App Title */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl lg:text-2xl">🍭</span>
              <h1 className="font-extrabold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-700 tracking-wide">
                Kiddo<span className="text-bubble-pink">Calc</span>
              </h1>
            </div>

            {/* Controls & Mini Modes */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              {/* Sound Xylophone Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Matikan Nada Musik' : 'Nyalakan Nada Musik'}
                className={`p-1.5 sm:p-2 lg:p-2.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
                  soundEnabled
                    ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5" />}
              </button>

              {/* Voice Speech Toggle */}
              <button
                onClick={() => {
                  const nextVoice = !voiceEnabled;
                  setVoiceEnabled(nextVoice);
                  if (nextVoice) speakText('Suara diaktifkan', true);
                }}
                title={voiceEnabled ? 'Matikan Suara Sebut Angka' : 'Nyalakan Suara Sebut Angka'}
                className={`p-1.5 sm:p-2 lg:p-2.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
                  voiceEnabled
                    ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                {voiceEnabled ? <Mic className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5" /> : <MicOff className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5" />}
              </button>

              {/* Quiz Mode Button */}
              <button
                onClick={() => setActiveTab(activeTab === 'quiz' ? 'calc' : 'quiz')}
                title="Kuis Matematika Pintar"
                className={`p-1.5 sm:p-2 lg:p-2.5 rounded-xl sm:rounded-2xl transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-bubble-yellow text-amber-900 shadow-[0_2px_0_#d97706]'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
              >
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5" />
                <span className="text-xs sm:text-sm font-bold hidden xs:inline">Kuis</span>
              </button>

              {/* History Button */}
              <button
                onClick={() => setActiveTab(activeTab === 'history' ? 'calc' : 'history')}
                title="Buku Catatan Hitungan"
                className={`p-1.5 sm:p-2 lg:p-2.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-bubble-purple text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5" />
              </button>
            </div>
          </div>

          {/* Conditional Screen View: Calculator or Quiz or History */}
          {activeTab === 'quiz' ? (
            <QuizMode
              soundEnabled={soundEnabled}
              onUseInCalculator={handleUseFromQuiz}
              onClose={() => setActiveTab('calc')}
            />
          ) : activeTab === 'history' ? (
            <HistoryDrawer
              history={history}
              onSelect={(val) => {
                setCurrentValue(val);
                setActiveTab('calc');
              }}
              onClear={() => setHistory([])}
              onClose={() => setActiveTab('calc')}
            />
          ) : (
            <>
              {/* Calculator Display */}
              <Display
                expression={expression}
                currentValue={currentValue}
                isResult={isResult}
                onBackspace={handleBackspace}
                onClear={handleClear}
              />

              {/* 3D Candy Keypad */}
              <Keypad onKeyPress={handleKeyPress} />
            </>
          )}

          {/* Footer Friendly Encouragement */}
          <div className="text-center pt-1 text-[11px] sm:text-xs md:text-sm font-bold text-slate-400">
            Didesain penuh warna & keceriaan untuk anak hebat! 🌈✨
          </div>
        </div>
      </div>
    </div>
  );
}
