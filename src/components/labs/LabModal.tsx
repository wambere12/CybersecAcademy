import React, { useState } from 'react';
import { X, Terminal, Activity, KeyRound, Globe, Key, Mail, Cpu, Maximize2 } from 'lucide-react';
import { LinuxTerminalLab } from './LinuxTerminalLab';
import { NetworkPacketAnalyzerLab } from './NetworkPacketAnalyzerLab';
import { CryptographyLab } from './CryptographyLab';
import { WebSecuritySandboxLab } from './WebSecuritySandboxLab';
import { PasswordAuditLab } from './PasswordAuditLab';
import { PhishingDetectorLab } from './PhishingDetectorLab';
import { IoTSecurityLab } from './IoTSecurityLab';

export type LabType = 'terminal' | 'wireshark' | 'crypto' | 'web-security' | 'password' | 'phishing' | 'iot-security';

interface Props {
  initialLab?: LabType;
  isOpen: boolean;
  onClose: () => void;
}

export const LabModal: React.FC<Props> = ({ initialLab = 'terminal', isOpen, onClose }) => {
  const [selectedLab, setSelectedLab] = useState<LabType>(initialLab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              CyberSec Academy Interactive Sandboxes
            </span>

            {/* Sub-selector pills for switching between all 6 labs */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedLab('terminal')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  selectedLab === 'terminal' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3 h-3" /> Linux Terminal
              </button>
              <button
                onClick={() => setSelectedLab('wireshark')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  selectedLab === 'wireshark' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3 h-3" /> Wireshark
              </button>
              <button
                onClick={() => setSelectedLab('crypto')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  selectedLab === 'crypto' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <KeyRound className="w-3 h-3" /> Crypto & Hash
              </button>
              <button
                onClick={() => setSelectedLab('web-security')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  selectedLab === 'web-security' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3 h-3" /> Web Security (SQLi/XSS)
              </button>
              <button
                onClick={() => setSelectedLab('password')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  selectedLab === 'password' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Key className="w-3 h-3" /> Password Audit
              </button>
              <button
                onClick={() => setSelectedLab('phishing')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  selectedLab === 'phishing' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-3 h-3" /> Phishing Detector
              </button>
              <button
                onClick={() => setSelectedLab('iot-security')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  selectedLab === 'iot-security' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3 h-3" /> IoT Security
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Canvas */}
        <div className="flex-1 overflow-hidden p-4 bg-slate-950 flex flex-col justify-center">
          {selectedLab === 'terminal' && <LinuxTerminalLab />}
          {selectedLab === 'wireshark' && <NetworkPacketAnalyzerLab />}
          {selectedLab === 'crypto' && <CryptographyLab />}
          {selectedLab === 'web-security' && <WebSecuritySandboxLab />}
          {selectedLab === 'password' && <PasswordAuditLab />}
          {selectedLab === 'phishing' && <PhishingDetectorLab />}
          {selectedLab === 'iot-security' && <IoTSecurityLab />}
        </div>
      </div>
    </div>
  );
};
