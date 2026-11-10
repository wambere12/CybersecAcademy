import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Key, RefreshCw, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';

const COMMON_DICTIONARY = [
  'password', '123456', '12345678', 'qwerty', '123456789', '12345', '1234', '111111',
  '1234567', 'dragon', 'welcome', 'admin', 'football', 'monkey', 'iloveyou', 'P@ssword1',
  'supersecret', 'access', 'letmein', 'master', 'shadow', 'trustno1'
];

const PASSPHRASE_WORDS = [
  'velvet', 'orbit', 'copper', 'lemon', 'galaxy', 'falcon', 'timber', 'whistle',
  'marble', 'canyon', 'shadow', 'breeze', 'harbor', 'summit', 'glacier', 'beacon',
  'meadow', 'fossil', 'quartz', 'meteor', 'cedar', 'delta', 'vortex', 'sparrow'
];

export const PasswordAuditLab: React.FC = () => {
  const [password, setPassword] = useState('correct-horse-battery-staple');

  // Compute character pool
  let poolSize = 0;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSpecial) poolSize += 33;

  const length = password.length;
  // Entropy in bits = length * log2(poolSize)
  const entropyBits = length > 0 && poolSize > 0 ? Math.round(length * (Math.log(poolSize) / Math.LN2)) : 0;

  // Check dictionary
  const isCommon = COMMON_DICTIONARY.includes(password.toLowerCase().trim());

  // Estimate crack time assuming 100 billion hashes/sec on modern GPU cluster
  let crackTimeDisplay = 'Instant';
  if (isCommon) {
    crackTimeDisplay = 'Instant (< 0.001 seconds via Dictionary / rockyou.txt)';
  } else if (entropyBits < 30) {
    crackTimeDisplay = 'Under 1 second';
  } else if (entropyBits < 50) {
    crackTimeDisplay = 'A few hours to days';
  } else if (entropyBits < 70) {
    crackTimeDisplay = 'Several months to years';
  } else if (entropyBits < 90) {
    crackTimeDisplay = 'Thousands of centuries';
  } else {
    crackTimeDisplay = 'Trillions of years (Mathematically unbreakable with current physics)';
  }

  // Rating
  let strengthLabel = 'Very Weak';
  let strengthColor = 'text-rose-400';
  let barWidth = '15%';
  let barColor = 'bg-rose-500';

  if (!isCommon && entropyBits >= 80) {
    strengthLabel = 'Excellent / Cryptographically Resilient';
    strengthColor = 'text-emerald-400';
    barWidth = '100%';
    barColor = 'bg-emerald-500';
  } else if (!isCommon && entropyBits >= 60) {
    strengthLabel = 'Strong';
    strengthColor = 'text-cyan-400';
    barWidth = '75%';
    barColor = 'bg-cyan-500';
  } else if (!isCommon && entropyBits >= 40) {
    strengthLabel = 'Moderate';
    strengthColor = 'text-amber-400';
    barWidth = '45%';
    barColor = 'bg-amber-500';
  }

  const generatePassphrase = () => {
    const shuffled = [...PASSPHRASE_WORDS].sort(() => 0.5 - Math.random());
    const phrase = shuffled.slice(0, 4).join('-');
    setPassword(phrase);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono shadow-2xl flex flex-col h-[540px]">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">Password Entropy & Brute-Force Auditor</span>
        </div>

        <button
          onClick={generatePassphrase}
          className="flex items-center gap-1.5 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-xs transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Generate Passphrase
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-y-auto text-xs space-y-4">
        {/* Input Field */}
        <div className="space-y-2">
          <label className="text-slate-400 font-semibold text-[11px]">Test Any Password or Passphrase:</label>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500"
          />

          {/* Strength Bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${barColor} transition-all duration-300`} style={{ width: barWidth }} />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">
              Entropy Strength: <span className={`font-bold ${strengthColor}`}>{strengthLabel}</span>
            </span>
            <span className="text-slate-300 font-bold tabular-nums">{entropyBits} bits of entropy</span>
          </div>
        </div>

        {/* Crack Time Prediction Card */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-bold text-xs">
            <Cpu className="w-4 h-4 text-cyan-400" /> Estimated GPU Cluster Crack Time (100 Billion Hashes/Sec):
          </div>
          <div className="text-sm font-bold text-slate-100 font-mono pl-6">{crackTimeDisplay}</div>
          {isCommon && (
            <div className="text-rose-400 flex items-center gap-1.5 text-xs pl-6">
              <AlertTriangle className="w-3.5 h-3.5" /> Warning: Found in common leaked password dictionaries!
            </div>
          )}
        </div>

        {/* Character Pool Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div
            className={`p-2.5 rounded border flex items-center gap-2 ${
              hasLower ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {hasLower ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 inline-block" />}
            Lowercase (a-z)
          </div>
          <div
            className={`p-2.5 rounded border flex items-center gap-2 ${
              hasUpper ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {hasUpper ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 inline-block" />}
            Uppercase (A-Z)
          </div>
          <div
            className={`p-2.5 rounded border flex items-center gap-2 ${
              hasNumber ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {hasNumber ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 inline-block" />}
            Numbers (0-9)
          </div>
          <div
            className={`p-2.5 rounded border flex items-center gap-2 ${
              hasSpecial ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {hasSpecial ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 inline-block" />}
            Symbols / Space
          </div>
        </div>

        {/* NIST SP 800-63B Guidelines Callout */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
          <span className="font-bold text-cyan-400 text-xs">NIST SP 800-63B Authentication Guidelines:</span>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            1. Length is the single most decisive factor in mathematical entropy. Four random dictionary words
            (passphrase) consistently outperform short complex passwords like <code className="text-cyan-300">P@ssw0rd1</code>.
            <br />
            2. Never force arbitrary periodic password expiration (e.g. every 90 days), as users merely append numbers
            predictably.
            <br />
            3. Always check against known breached credential corpuses at time of account creation.
          </p>
        </div>
      </div>
    </div>
  );
};
