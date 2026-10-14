import React, { useState, useEffect } from 'react';
import { Award, RefreshCw, CheckCircle2, HelpCircle } from 'lucide-react';
import { triggerConfetti, playSuccessFanfare, playXylophoneNote } from '../utils/soundEffects';

export default function QuizMode({ soundEnabled, onUseInCalculator, onClose }) {
  const [level, setLevel] = useState('easy'); // 'easy' (addition up to 10), 'medium' (up to 20), 'times' (tables 2-5)
  const [question, setQuestion] = useState({ num1: 2, num2: 3, op: '+', answer: 5 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    setUserAnswer('');
    setFeedback(null);

    let n1, n2, op, ans;
    if (level === 'easy') {
      op = '+';
      n1 = Math.floor(Math.random() * 6) + 1; // 1 - 6
      n2 = Math.floor(Math.random() * 5) + 1; // 1 - 5
      ans = n1 + n2;
    } else if (level === 'medium') {
      const ops = ['+', '-'];
      op = ops[Math.floor(Math.random() * ops.length)];
      if (op === '+') {
        n1 = Math.floor(Math.random() * 10) + 2;
        n2 = Math.floor(Math.random() * 10) + 1;
        ans = n1 + n2;
      } else {
        n1 = Math.floor(Math.random() * 12) + 6;
        n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
        ans = n1 - n2;
      }
    } else {
      op = '×';
      n1 = Math.floor(Math.random() * 5) + 2;
      n2 = Math.floor(Math.random() * 5) + 1;
      ans = n1 * n2;
    }

    setQuestion({ num1: n1, num2: n2, op, answer: ans });
  };

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const handleCheck = () => {
    const parsed = parseInt(userAnswer, 10);
    if (isNaN(parsed)) return;

    if (parsed === question.answer) {
      setFeedback('correct');
      setScore((s) => s + 1);
      playSuccessFanfare(soundEnabled);
      triggerConfetti();
    } else {
      setFeedback('wrong');
      playXylophoneNote('1', soundEnabled);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-4 border-bubble-yellow shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-amber-200 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-100 rounded-xl text-amber-600">
            <Award className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-amber-800 text-lg leading-tight">Kuis Matematika Pintar 🌟</h3>
            <span className="text-xs text-amber-600 font-semibold">Kumpulkan bintang prestasimu!</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          <span className="text-amber-500 font-bold text-sm">⭐️ Skor:</span>
          <span className="text-amber-700 font-black text-lg">{score}</span>
        </div>
      </div>

      {/* Level Selector */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
        <button
          onClick={() => setLevel('easy')}
          className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            level === 'easy'
              ? 'bg-emerald-400 text-white shadow-[0_3px_0_#059669]'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          Mudah (1-10) 🌱
        </button>
        <button
          onClick={() => setLevel('medium')}
          className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            level === 'medium'
              ? 'bg-sky-400 text-white shadow-[0_3px_0_#0284c7]'
              : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
          }`}
        >
          Sedang (1-20) 🚀
        </button>
        <button
          onClick={() => setLevel('times')}
          className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            level === 'times'
              ? 'bg-purple-400 text-white shadow-[0_3px_0_#7c3aed]'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          Perkalian 🍭
        </button>
      </div>

      {/* Big Question Card */}
      <div className="bg-gradient-to-r from-amber-50 to-pink-50 rounded-2xl lg:rounded-3xl p-4 sm:p-6 border-2 border-amber-200 flex flex-col items-center justify-center gap-2 sm:gap-3">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-purple-800 tracking-wider">
          {question.num1} {question.op} {question.num2} = ?
        </div>

        {/* Visual object helper for easy addition */}
        {level === 'easy' && question.op === '+' && (
          <div className="flex items-center gap-2 text-sm sm:text-base lg:text-lg text-slate-500 font-medium">
            <span>{'🍎'.repeat(question.num1)}</span>
            <span className="font-bold text-amber-600">+</span>
            <span>{'🍎'.repeat(question.num2)}</span>
          </div>
        )}
      </div>

      {/* Answer Input & Submit */}
      <div className="flex items-center gap-2 sm:gap-3 justify-center">
        <input
          type="number"
          placeholder="Jawaban..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          className="w-28 sm:w-36 lg:w-44 text-center text-xl sm:text-2xl lg:text-3xl font-black rounded-2xl border-3 border-amber-300 py-2 sm:py-3 focus:ring-4 focus:ring-amber-200 focus:outline-none"
        />

        <button
          onClick={handleCheck}
          className="bg-emerald-500 hover:bg-emerald-600 active:translate-y-1 shadow-[0_4px_0_#047857] text-white px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-2xl font-black text-lg sm:text-xl transition-all cursor-pointer"
        >
          Cek! 🎯
        </button>

        <button
          onClick={generateQuestion}
          title="Soal baru"
          className="p-3 sm:p-3.5 bg-amber-100 hover:bg-amber-200 active:translate-y-1 rounded-2xl text-amber-700 transition-all cursor-pointer"
        >
          <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback === 'correct' && (
        <div className="bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-3 text-center text-emerald-800 font-black animate-bounce-soft">
          🎉 Horeee! Jawabanmu Tepat Sekali! Kamu Hebat! 🌟
        </div>
      )}
      {feedback === 'wrong' && (
        <div className="bg-rose-100 border-2 border-rose-300 rounded-2xl p-2.5 text-center text-rose-700 font-bold text-sm">
          Ups, coba hitung lagi pelan-pelan ya! Kamu pasti bisa! 💪
        </div>
      )}

      {/* Action to switch back or solve in calculator */}
      <div className="flex justify-between items-center text-xs font-bold pt-1">
        <button
          onClick={() => onUseInCalculator(`${question.num1}${question.op === '×' ? '*' : question.op}${question.num2}`)}
          className="text-purple-600 hover:text-purple-800 underline"
        >
          Hitung di Layar Kalkulator 📱
        </button>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          Tutup Kuis ✖
        </button>
      </div>
    </div>
  );
}
