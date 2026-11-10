import React, { useState } from 'react';
import { Globe, ShieldAlert, ShieldCheck, Database, Code, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const WebSecuritySandboxLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sqli' | 'xss'>('sqli');

  // SQLi State
  const [usernameInput, setUsernameInput] = useState("admin' --");
  const [passwordInput, setPasswordInput] = useState('');
  const [usePreparedStatements, setUsePreparedStatements] = useState(false);
  const [sqliResult, setSqliResult] = useState<{ status: 'bypassed' | 'rejected'; user?: string; role?: string } | null>(null);

  // XSS State
  const [commentInput, setCommentInput] = useState("<script>alert('Session Stolen: ' + document.cookie)</script>");
  const [enableHtmlEscaping, setEnableHtmlEscaping] = useState(false);
  const [comments, setComments] = useState<Array<{ id: number; author: string; text: string; isMalicious?: boolean }>>([
    { id: 1, author: 'Sarah J.', text: 'Great documentation on OWASP Top 10 guidelines!' },
    { id: 2, author: 'Security Team', text: 'Reminder: Scheduled database migration this Friday at 22:00 UTC.' }
  ]);
  const [xssTriggered, setXssTriggered] = useState(false);

  const testLogin = () => {
    // Check if SQLi payload bypasses authentication
    if (!usePreparedStatements) {
      if (
        usernameInput.includes("' --") ||
        usernameInput.includes("' OR '1'='1") ||
        usernameInput.includes("' or '1'='1") ||
        usernameInput.includes("' OR 1=1")
      ) {
        setSqliResult({
          status: 'bypassed',
          user: 'Administrator',
          role: 'Superuser (Full DB Access)'
        });
        return;
      }
    }
    // Standard credential check
    if (usernameInput === 'admin' && passwordInput === 'ComplexP@ss2026') {
      setSqliResult({ status: 'bypassed', user: 'Administrator', role: 'Superuser' });
    } else {
      setSqliResult({ status: 'rejected' });
    }
  };

  const handlePostComment = () => {
    if (!commentInput.trim()) return;
    const isScript = commentInput.toLowerCase().includes('<script>') || commentInput.toLowerCase().includes('onerror=');

    if (isScript && !enableHtmlEscaping) {
      setXssTriggered(true);
    }

    setComments(prev => [
      ...prev,
      {
        id: Date.now(),
        author: 'Guest_Analyst',
        text: commentInput,
        isMalicious: isScript
      }
    ]);
    setCommentInput('');
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono shadow-2xl flex flex-col h-[580px]">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">Web Application Security Sandbox</span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('sqli')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'sqli' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. SQL Injection (SQLi)
          </button>
          <button
            onClick={() => setActiveTab('xss')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'xss' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Cross-Site Scripting (XSS)
          </button>
        </div>
      </div>

      {/* Main Sandbox Area */}
      <div className="flex-1 p-5 overflow-y-auto text-xs space-y-4">
        {activeTab === 'sqli' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> Authentication Bypass Experiment:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Test how untrusted input concatenations alter SQL syntax logic. Toggle Parameterized Prepared Statements
                to see how modern query compilation neutralizes the injection.
              </p>
            </div>

            {/* Defense Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2">
                {usePreparedStatements ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                )}
                <div>
                  <div className="font-bold text-slate-200 text-xs">
                    Database Driver Defense: {usePreparedStatements ? 'Parameterized Prepared Statements' : 'Vulnerable String Concatenation'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {usePreparedStatements
                      ? 'Input parameters bound as literal data values; SQL grammar cannot be manipulated.'
                      : 'Input concatenated directly into the SQL string template prior to execution.'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setUsePreparedStatements(prev => !prev);
                  setSqliResult(null);
                }}
                className={`px-3 py-1.5 rounded font-bold text-xs transition-colors ${
                  usePreparedStatements
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {usePreparedStatements ? 'Switch to Insecure Query' : 'Activate Parameterized Queries'}
              </button>
            </div>

            {/* Form Simulation & Query View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Login Form */}
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Login Form (/api/login)
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Username Field:</label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={e => setUsernameInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <div className="flex gap-1 pt-1">
                    <button
                      onClick={() => setUsernameInput("admin' --")}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 px-1.5 py-0.5 rounded"
                    >
                      Payload 1: admin' --
                    </button>
                    <button
                      onClick={() => setUsernameInput("' OR '1'='1' --")}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 px-1.5 py-0.5 rounded"
                    >
                      Payload 2: ' OR '1'='1' --
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Password Field:</label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="(Ignored when commented out with --)"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  onClick={testLogin}
                  className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded transition-colors text-xs"
                >
                  Submit Login Request
                </button>
              </div>

              {/* Dynamic Query Live Inspector */}
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Backend SQL Statement Constructed by Server
                  </div>

                  {!usePreparedStatements ? (
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs leading-relaxed">
                      <span className="text-cyan-400">SELECT</span> * <span className="text-cyan-400">FROM</span> users{' '}
                      <span className="text-cyan-400">WHERE</span> username = '
                      <span className="text-rose-400 font-bold">{usernameInput}</span>' <span className="text-cyan-400">AND</span> password = '
                      <span className="text-slate-500">{passwordInput}</span>';
                    </div>
                  ) : (
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs leading-relaxed">
                      <div className="text-emerald-400 mb-1">
                        SELECT * FROM users WHERE username = $1 AND password = $2;
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Bound Parameter $1: <span className="text-emerald-300">"{usernameInput}"</span> (Escaped Literal)
                      </div>
                    </div>
                  )}
                </div>

                {/* Login Result Feedback */}
                {sqliResult && (
                  <div
                    className={`p-3 rounded border ${
                      sqliResult.status === 'bypassed'
                        ? 'bg-rose-950/60 border-rose-800 text-rose-200'
                        : 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                    }`}
                  >
                    {sqliResult.status === 'bypassed' ? (
                      <div>
                        <div className="font-bold flex items-center gap-1.5 text-xs text-rose-300">
                          <AlertTriangle className="w-4 h-4 text-rose-400" /> AUTHENTICATION BYPASSED (SQLi Exploit Succeeded!)
                        </div>
                        <div className="text-[11px] mt-1 text-slate-300">
                          Authenticated as: <span className="text-amber-300 font-bold">{sqliResult.user}</span> (
                          {sqliResult.role}) without knowing password!
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ACCESS SAFELY DENIED (401 Unauthorized)
                        </div>
                        <div className="text-[11px] mt-1 text-slate-300">
                          Database evaluated payload strictly as literal username characters. Zero execution occurred.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'xss' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" /> Stored Cross-Site Scripting (XSS) Sandbox:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Observe how unsanitized user comments containing HTML/JavaScript tags can execute inside victim browsers.
                Enable Contextual HTML Escaping to neutralize script injection.
              </p>
            </div>

            {/* Defense Switch */}
            <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2">
                {enableHtmlEscaping ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                )}
                <div>
                  <div className="font-bold text-slate-200 text-xs">
                    Output Defense: {enableHtmlEscaping ? 'HTML Entity Contextual Encoding' : 'Unsanitized Raw InnerHTML'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {enableHtmlEscaping
                      ? 'Characters <, >, &, ", \' encoded as &lt;, &gt;, preventing browser script parsing.'
                      : 'Payload injected raw into DOM, executing script tags.'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setEnableHtmlEscaping(prev => !prev);
                  setXssTriggered(false);
                }}
                className={`px-3 py-1.5 rounded font-bold text-xs transition-colors ${
                  enableHtmlEscaping
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {enableHtmlEscaping ? 'Disable Sanitization (Vulnerable)' : 'Enable HTML Escaping (Secure)'}
              </button>
            </div>

            {/* Simulated Community Forum Comment Board */}
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Simulated Public Comment Board
              </div>

              {/* Comments Stream */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {comments.map(c => (
                  <div key={c.id} className="p-2.5 bg-slate-950 rounded border border-slate-800">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span className="font-bold text-slate-300">{c.author}</span>
                      <span>Just now</span>
                    </div>

                    {enableHtmlEscaping ? (
                      // Secure Escaped Representation
                      <div className="text-slate-300 font-mono text-[11px]">
                        {c.text}
                      </div>
                    ) : (
                      // Unsafe representation
                      <div className="text-slate-300 font-mono text-[11px]">
                        {c.isMalicious ? (
                          <div className="p-2 bg-rose-950/60 border border-rose-800/80 rounded text-rose-300 text-[11px]">
                            <span className="font-bold">[XSS SCRIPT EXECUTED IN BROWSER CONTEXT]:</span>
                            <div className="text-rose-400 font-bold mt-1">
                              alert("Session Stolen: session_token=e8a91b2c4d")
                            </div>
                          </div>
                        ) : (
                          c.text
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  placeholder="Leave a comment (e.g. <script>alert(1)</script>)..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded p-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handlePostComment}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded transition-colors text-xs shrink-0"
                >
                  Post Comment
                </button>
              </div>

              {xssTriggered && !enableHtmlEscaping && (
                <div className="p-2 bg-rose-950/80 border border-rose-700 rounded text-rose-300 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" /> Stored XSS Activated: Unescaped JavaScript executed in victim browser!
                  </span>
                  <button
                    onClick={() => {
                      setEnableHtmlEscaping(true);
                      setXssTriggered(false);
                    }}
                    className="text-[11px] underline text-cyan-300"
                  >
                    Fix with HTML Escaping
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
