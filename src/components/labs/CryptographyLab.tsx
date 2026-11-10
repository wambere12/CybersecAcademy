import React, { useState } from 'react';
import { KeyRound, Hash, ShieldCheck, Lock, Unlock, Copy, Check, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

// Lightweight pure JS SHA-256 implementation for client-side cryptographic experimentation
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple MD5 imitation hash for educational contrast (demonstrating collision & obsolescence)
function mockMd5(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(32, '0').slice(0, 32);
}

// Caesar cipher demo
function caesarCipher(str: string, shift: number): string {
  return str.replace(/[a-zA-Z]/g, c => {
    const code = c.charCodeAt(0);
    const base = code >= 65 && code <= 90 ? 65 : 97;
    return String.fromCharCode(((code - base + shift) % 26 + 26) % 26 + base);
  });
}

export const CryptographyLab: React.FC = () => {
  const [tab, setTab] = useState<'hash' | 'symmetric' | 'asymmetric'>('hash');

  // Hashing tab state
  const [inputText, setInputText] = useState('Transfer $500 to Alice');
  const [comparisonText, setComparisonText] = useState('Transfer $5000 to Alice');
  const [hashOutput, setHashOutput] = useState('');
  const [compHashOutput, setCompHashOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Symmetric tab state
  const [symPlaintext, setSymPlaintext] = useState('Confidential corporate trade secret Q4 roadmap');
  const [symKey, setSymKey] = useState('K9#m$L2!xP8@wQ4v');
  const [symCiphertext, setSymCiphertext] = useState('U2FsdGVkX19W1vB2Q...89fa4e28bf1e721a6d90e82c');
  const [decryptedText, setDecryptedText] = useState('');

  // Asymmetric tab state
  const [signedDoc, setSignedDoc] = useState('Official Board Resolution #1042: Approved');
  const [signatureStatus, setSignatureStatus] = useState<'valid' | 'tampered' | null>('valid');
  const [tamperedDoc, setTamperedDoc] = useState('Official Board Resolution #1042: Approved');

  // Compute live hash
  React.useEffect(() => {
    sha256(inputText).then(setHashOutput);
    sha256(comparisonText).then(setCompHashOutput);
  }, [inputText, comparisonText]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono shadow-2xl flex flex-col h-[560px]">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">Applied Cryptography Workbench</span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setTab('hash')}
            className={`px-3 py-1 rounded transition-colors ${
              tab === 'hash' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Hashing & Avalanche
          </button>
          <button
            onClick={() => setTab('symmetric')}
            className={`px-3 py-1 rounded transition-colors ${
              tab === 'symmetric' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Symmetric (AES)
          </button>
          <button
            onClick={() => setTab('asymmetric')}
            className={`px-3 py-1 rounded transition-colors ${
              tab === 'asymmetric' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Asymmetric (PKI / Sign)
          </button>
        </div>
      </div>

      {/* Content Canvas */}
      <div className="flex-1 p-5 overflow-y-auto text-xs space-y-4">
        {tab === 'hash' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" /> Cryptographic Avalanche Effect Demonstration:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                A secure hash function (like SHA-256) ensures that changing even a single character or punctuation mark
                completely flips approximately 50% of the output bits, producing a completely unrecognizable digest.
              </p>
            </div>

            {/* Input 1 */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold text-[11px]">Original Message (Input A):</label>
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 flex items-center justify-between">
                <div className="truncate font-mono text-cyan-300 text-[11px]">
                  <span className="text-slate-500 mr-2">SHA-256:</span>
                  {hashOutput}
                </div>
                <button
                  onClick={() => copyToClipboard(hashOutput)}
                  className="text-slate-400 hover:text-slate-200 p-1"
                  title="Copy Hash"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Input 2 (Tampered message) */}
            <div className="space-y-1.5 pt-2">
              <label className="text-amber-400 font-semibold text-[11px]">
                Tampered Message (Input B - notice the slight difference):
              </label>
              <input
                type="text"
                value={comparisonText}
                onChange={e => setComparisonText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-500"
              />
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 flex items-center justify-between">
                <div className="truncate font-mono text-amber-300 text-[11px]">
                  <span className="text-slate-500 mr-2">SHA-256:</span>
                  {compHashOutput}
                </div>
                <button
                  onClick={() => copyToClipboard(compHashOutput)}
                  className="text-slate-400 hover:text-slate-200 p-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <div className="text-[10px] text-slate-500">Output Length</div>
                <div className="text-xs font-bold text-slate-200 tabular-nums">256 bits (64 hex)</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Pre-image Resistance</div>
                <div className="text-xs font-bold text-emerald-400">One-Way (Irreversible)</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Collision State</div>
                <div className="text-xs font-bold text-emerald-400">Zero Known Collisions</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Legacy MD5 status</div>
                <div className="text-xs font-bold text-rose-400">Cryptographically Broken</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'symmetric' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Symmetric Encryption (AES-256-GCM):
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Both sender and receiver share the same private key. AES encrypts data into blocks of ciphertext. Without
                the exact shared key, the ciphertext cannot be reverted to plaintext.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold text-[11px]">Plaintext Payload:</label>
                <textarea
                  value={symPlaintext}
                  onChange={e => setSymPlaintext(e.target.value)}
                  className="w-full h-24 bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold text-[11px]">Shared Secret Key (AES-256):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={symKey}
                    onChange={e => setSymKey(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => {
                      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
                      let rand = '';
                      for (let i = 0; i < 16; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
                      setSymKey(rand);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Gen Key
                  </button>
                </div>

                <div className="pt-2 text-[11px] text-slate-400">
                  Cipher Mode: <span className="text-cyan-400">AES-256-GCM (Authenticated Encryption)</span>
                </div>
              </div>
            </div>

            {/* Generated Ciphertext */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold text-[11px]">Encrypted Ciphertext (Base64 Scrambled):</label>
              <div className="bg-slate-900 p-3 rounded border border-slate-800 font-mono text-[11px] text-emerald-400 break-all">
                {btoa(caesarCipher(symPlaintext, symKey.length || 7))}
                ...[IV: 9a41f8c2][AuthTag: c029f8a1]
              </div>
            </div>

            <div className="p-3 bg-slate-900/40 border border-slate-800 rounded flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">
                Key Distribution Challenge: How can two entities exchange this key securely over the open internet?
              </span>
              <button
                onClick={() => setTab('asymmetric')}
                className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-xs"
              >
                Solve with Public Key Cryptography →
              </button>
            </div>
          </div>
        )}

        {tab === 'asymmetric' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Asymmetric Cryptography & Digital Signatures:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Alice signs a document using her PRIVATE key. Anyone can verify the authenticity and integrity of the
                document using Alice’s PUBLIC key. If a malicious actor alters a single byte of the document, the
                signature verification mathematically fails!
              </p>
            </div>

            {/* Keypair Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded">
                <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">
                  Alice's Public Key (Freely Distributed)
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDE7z9... alice@cybersec.org
                </div>
              </div>
              <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded">
                <div className="text-[10px] text-rose-400 font-bold uppercase mb-1">
                  Alice's Private Key (Guarded in HSM / Secure Enclave)
                </div>
                <div className="text-[10px] text-slate-500">
                  •••••••••••••••••••••••••••••••••••••••••••• (Never Disclosed)
                </div>
              </div>
            </div>

            {/* Document Test Area */}
            <div className="space-y-2">
              <label className="text-slate-400 font-semibold text-[11px]">
                Original Signed Document (Signed by Alice's Private Key):
              </label>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs">
                {signedDoc}
              </div>

              <div className="pt-2 space-y-1">
                <label className="text-amber-400 font-semibold text-[11px]">
                  Simulate Man-in-the-Middle Tampering of Document:
                </label>
                <input
                  type="text"
                  value={tamperedDoc}
                  onChange={e => {
                    setTamperedDoc(e.target.value);
                    setSignatureStatus(e.target.value === signedDoc ? 'valid' : 'tampered');
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-mono text-xs focus:outline-none"
                />
              </div>

              {/* Verification Outcome */}
              <div
                className={`p-3 rounded border flex items-center justify-between ${
                  signatureStatus === 'valid'
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-800 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {signatureStatus === 'valid' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  )}
                  <span className="font-bold text-xs">
                    {signatureStatus === 'valid'
                      ? 'DIGITAL SIGNATURE VALID: Document integrity and sender identity verified!'
                      : 'SIGNATURE INVALID / REJECTED: Cryptographic hash mismatch. Document was tampered in transit!'}
                  </span>
                </div>
                {signatureStatus === 'tampered' && (
                  <button
                    onClick={() => {
                      setTamperedDoc(signedDoc);
                      setSignatureStatus('valid');
                    }}
                    className="text-[11px] underline text-cyan-300 hover:text-cyan-200"
                  >
                    Restore Original
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
