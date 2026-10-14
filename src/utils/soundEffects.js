import confetti from 'canvas-confetti';

// Web Audio API AudioContext singleton
let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Musical notes configuration with pitch-compensated gain (equal-loudness curve)
// Higher octave (C5 to D6) so notes 0, 1, 2, 3, 4 sound loud, crisp, and bright on all speakers
const XYLOPHONE_CONFIG = {
  '1': { freq: 523.25, gain: 0.52 }, // C5 (Boosted volume for 1)
  '2': { freq: 587.33, gain: 0.50 }, // D5 (Boosted volume for 2)
  '3': { freq: 659.25, gain: 0.49 }, // E5 (Boosted volume for 3)
  '4': { freq: 698.46, gain: 0.48 }, // F5 (Boosted volume for 4)
  '5': { freq: 783.99, gain: 0.45 }, // G5
  '6': { freq: 880.00, gain: 0.43 }, // A5
  '7': { freq: 987.77, gain: 0.41 }, // B5
  '8': { freq: 1046.50, gain: 0.39 }, // C6
  '9': { freq: 1174.66, gain: 0.38 }, // D6
  '0': { freq: 440.00, gain: 0.60 }, // A4 (Heavily boosted volume for 0)
  '.': { freq: 1318.51, gain: 0.36 }, // E6 (Sparkle chime)
};

/**
 * Play a cute xylophone / chime note with dual oscillator for mallet crispness
 */
export const playXylophoneNote = (key, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const config = XYLOPHONE_CONFIG[key] || { freq: 523.25, gain: 0.45 };
  const now = ctx.currentTime;

  // 1. Primary body oscillator (triangle wave for wooden/metal xylophone bar resonance)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();

  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(config.freq, now);

  gain1.gain.setValueAtTime(config.gain, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + 0.38);

  // 2. Crisp mallet strike harmonic chime (sine wave at 2x frequency for sparkling attack)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(config.freq * 2, now);

  gain2.gain.setValueAtTime(config.gain * 0.45, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc2.start(now);
  osc2.stop(now + 0.12);
};

/**
 * Play loud, punchy, cheerful cartoon sound for operators (+, -, *, /, (, ))
 */
export const playOperatorSound = (op = '+', soundEnabled = true) => {
  // Support both playOperatorSound(soundEnabled) and playOperatorSound(op, soundEnabled)
  if (typeof op === 'boolean') {
    soundEnabled = op;
    op = '+';
  }
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Primary body oscillator (triangle/sine for loud warm punch)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();

  // Attack harmonic overtone oscillator (crisp high click for extra clarity)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();

  if (op === '+' || op === 'Tambah') {
    // Joyful upward bounce (+)
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(380, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.16);
    gain1.gain.setValueAtTime(0.58, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(900, now);
    osc2.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
    gain2.gain.setValueAtTime(0.28, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  } else if (op === '-' || op === 'Kurang') {
    // Playful downward spring (-)
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(750, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 0.18);
    gain1.gain.setValueAtTime(0.58, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1200, now);
    osc2.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    gain2.gain.setValueAtTime(0.26, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  } else if (op === '*' || op === '×' || op === 'Kali') {
    // Crisp energetic bell-pop (×)
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(620, now);
    osc1.frequency.exponentialRampToValueAtTime(980, now + 0.15);
    gain1.gain.setValueAtTime(0.56, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1300, now);
    osc2.frequency.setValueAtTime(1600, now + 0.06);
    gain2.gain.setValueAtTime(0.30, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
  } else if (op === '/' || op === '÷' || op === 'Bagi') {
    // Bouncy cartoon bubble plop (÷)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(420, now);
    osc1.frequency.exponentialRampToValueAtTime(840, now + 0.16);
    gain1.gain.setValueAtTime(0.60, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(840, now);
    osc2.frequency.exponentialRampToValueAtTime(1260, now + 0.10);
    gain2.gain.setValueAtTime(0.25, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  } else {
    // Parentheses ( or ) - Cute percussive block tap
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(op === '(' ? 520 : 680, now);
    osc1.frequency.exponentialRampToValueAtTime(op === '(' ? 780 : 500, now + 0.12);
    gain1.gain.setValueAtTime(0.58, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1100, now);
    gain2.gain.setValueAtTime(0.30, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
  }

  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.26);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + 0.16);
};

/**
 * Play clear / bloop sound (descending playful slide)
 */
export const playClearSound = (soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
};

/**
 * Play celebration victory fanfare for equals (=)
 */
export const playSuccessFanfare = (soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 523.25, delay: 0.00 }, // C5
    { freq: 659.25, delay: 0.08 }, // E5
    { freq: 783.99, delay: 0.16 }, // G5
    { freq: 1046.50, delay: 0.24, duration: 0.4 }, // C6
  ];

  const now = ctx.currentTime;

  notes.forEach(({ freq, delay, duration = 0.2 }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + delay);

    gain.gain.setValueAtTime(0.28, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + duration);
  });
};

/**
 * Trigger cheerful colorful confetti burst
 */
export const triggerConfetti = () => {
  if (typeof window === 'undefined') return;
  try {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF6B97', '#FFD93D', '#6BCB77', '#4D96FF', '#9D4EDD', '#FF9F45'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });
  } catch {
    // Graceful fallback
  }
};

/**
 * Read number / word with Web Speech API
 */
export const speakText = (text, voiceEnabled = false) => {
  if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Bahasa Indonesia
    utterance.rate = 1.0;
    utterance.pitch = 1.3; // Cheerful high pitch for kids!
    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech errors
  }
};
