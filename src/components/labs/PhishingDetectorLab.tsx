import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle2, ShieldCheck, ExternalLink, Flag } from 'lucide-react';

export const PhishingDetectorLab: React.FC = () => {
  const [flaggedSender, setFlaggedSender] = useState(false);
  const [flaggedUrgency, setFlaggedUrgency] = useState(false);
  const [flaggedLink, setFlaggedLink] = useState(false);
  const [flaggedAttachment, setFlaggedAttachment] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);

  const flaggedCount = [flaggedSender, flaggedUrgency, flaggedLink, flaggedAttachment].filter(Boolean).length;
  const isAllFlagged = flaggedCount >= 3;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono shadow-2xl flex flex-col h-[560px]">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">Phishing Email Analysis Detective</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            Indicators Flagged: <span className="text-cyan-400 font-bold tabular-nums">{flaggedCount} / 4</span>
          </span>
          {isAllFlagged && (
            <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Threat Identified!
            </span>
          )}
        </div>
      </div>

      {/* Simulated Email Client Container */}
      <div className="flex-1 p-5 overflow-y-auto text-xs space-y-4 bg-slate-950">
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Click on suspicious email headers, text, links, or attachments to flag social engineering and technical
            deceptions. Identify at least 3 indicators to neutralize the attack.
          </p>
        </div>

        {/* Email Header Card */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-100">
                CRITICAL NOTICE: Unauthorized Login Attempt from Moscow, RU - Immediate Action Required
              </div>

              {/* Sender info (Clickable flag) */}
              <div
                onClick={() => setFlaggedSender(prev => !prev)}
                className={`p-1.5 rounded cursor-pointer transition-colors border ${
                  flaggedSender
                    ? 'bg-rose-950/70 border-rose-700 text-rose-300'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-600 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-400">From: </span>
                    <span className="font-bold text-slate-200">PayPal Global Security Desk </span>
                    <span className="text-rose-400">&lt;support@account-secure-paypal.com&gt;</span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Flag className="w-3 h-3" /> {flaggedSender ? 'Flagged: Spoofed Domain' : 'Click to Audit Sender'}
                  </span>
                </div>
                {flaggedSender && (
                  <div className="text-[10px] text-rose-300 mt-1 pt-1 border-t border-rose-900">
                    ✓ Indicator Detected: The sender domain is <code className="text-rose-200">account-secure-paypal.com</code>,
                    NOT the legitimate official domain <code className="text-emerald-300">paypal.com</code>.
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-500">
                To: <span className="text-slate-300">alex.mercer@cybersec.org</span> · Today, 03:14 AM (Unusual Time)
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-3 text-slate-300 leading-relaxed text-xs">
            {/* Greeting */}
            <p className="text-slate-400">Dear Valued Customer,</p>

            {/* Urgency text (Clickable flag) */}
            <div
              onClick={() => setFlaggedUrgency(prev => !prev)}
              className={`p-2 rounded cursor-pointer transition-colors border ${
                flaggedUrgency
                  ? 'bg-rose-950/70 border-rose-700 text-rose-300'
                  : 'hover:bg-slate-950/60 border-transparent hover:border-slate-700'
              }`}
            >
              <p>
                Our automated fraud prevention system has detected an unrecognized login attempt from IP Address{' '}
                <strong className="text-slate-200">198.51.100.44 (Moscow, Russia)</strong>.
                Your account privileges have been temporarily frozen to protect your linked bank accounts.
              </p>
              <p className="mt-1 font-bold text-rose-400">
                You MUST verify your credentials within 2 hours, or your account will be permanently terminated and your
                funds surrendered to state authorities under federal compliance laws.
              </p>
              {flaggedUrgency && (
                <div className="text-[10px] text-rose-300 mt-1.5 pt-1 border-t border-rose-900">
                  ✓ Indicator Detected: Extreme manufactured urgency and legal threats are classic psychological levers
                  used to bypass logical critical thinking.
                </div>
              )}
            </div>

            {/* Action Button & Hover URL inspection (Clickable flag) */}
            <div className="py-2 text-center">
              <div
                onClick={() => setFlaggedLink(prev => !prev)}
                onMouseEnter={() => setHoveringLink(true)}
                onMouseLeave={() => setHoveringLink(false)}
                className={`inline-block p-2 rounded cursor-pointer border transition-all ${
                  flaggedLink
                    ? 'bg-rose-950/80 border-rose-700 text-rose-200'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                }`}
              >
                <div className="flex items-center gap-2 px-4 py-1.5 text-xs">
                  <span>Verify Identity & Unlock Account Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Status bar URL hover preview */}
              <div className="mt-2 text-[11px] text-slate-400 font-mono">
                {hoveringLink || flaggedLink ? (
                  <span className="text-rose-400 bg-slate-950 px-2 py-1 rounded border border-rose-900/60">
                    Hover Target URL: <strong className="text-rose-300">http://198.51.100.22/steal-creds/login.php</strong> (Insecure HTTP & Foreign IP)
                  </span>
                ) : (
                  <span className="text-slate-600">Hover over button to inspect true destination link</span>
                )}
              </div>
            </div>

            {/* Suspicious Attachment (Clickable flag) */}
            <div
              onClick={() => setFlaggedAttachment(prev => !prev)}
              className={`p-2 rounded cursor-pointer border transition-colors flex items-center justify-between ${
                flaggedAttachment
                  ? 'bg-rose-950/70 border-rose-700 text-rose-300'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold text-xs">Attachment:</span>
                <span className="text-slate-200 font-mono">Account_Identity_Form.pdf.exe (4.2 MB)</span>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Flag className="w-3 h-3" /> {flaggedAttachment ? 'Flagged: Double Extension' : 'Click to Inspect File'}
              </span>
            </div>
            {flaggedAttachment && (
              <div className="text-[10px] text-rose-300 px-2">
                ✓ Indicator Detected: Double file extension (.pdf.exe) concealing a Windows executable binary payload!
              </div>
            )}
          </div>
        </div>

        {isAllFlagged && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-lg text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs">
                EXCELLENT DETECTION: All red flags successfully isolated. Attack safely neutralized!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
