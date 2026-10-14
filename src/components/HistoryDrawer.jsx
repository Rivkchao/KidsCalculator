import React from 'react';
import { History, Trash2, ArrowUpRight, X } from 'lucide-react';

export default function HistoryDrawer({ history = [], onSelect, onClear, onClose }) {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-4 border-bubble-purple/40 shadow-xl flex flex-col gap-3 animate-in fade-in duration-150">
      <div className="flex items-center justify-between border-b-2 border-dashed border-purple-200 pb-2">
        <div className="flex items-center gap-2 text-purple-700">
          <History className="w-5 h-5 text-purple-600" />
          <h3 className="font-extrabold text-base">Buku Catatan Hitungan 📖</h3>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={onClear}
              title="Hapus riwayat"
              className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-full transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Bersihkan
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="py-6 text-center text-slate-400 font-medium text-xs">
          Belum ada catatan hitungan. Yuk mulai hitung sesuatu! 🎈
        </div>
      ) : (
        <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelect(item.result)}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:border-purple-300 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-500">{item.expression}</span>
                <span className="text-lg font-black text-purple-800">= {item.result}</span>
              </div>
              <button
                title="Gunakan hasil ini"
                className="p-1.5 bg-white rounded-xl shadow-xs text-purple-500 hover:text-purple-700"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
