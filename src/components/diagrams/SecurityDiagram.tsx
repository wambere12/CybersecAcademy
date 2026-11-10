import React, { useState } from 'react';
import { Shield, Lock, CheckCircle2, RefreshCw, Cpu, AlertTriangle, Layers, UserCheck } from 'lucide-react';

interface Props {
  type: 'cia-triad' | 'osi-stack' | 'pki-flow' | 'defense-in-depth' | 'malware-lifecycle' | 'zero-trust' | 'incident-lifecycle';
}

export const SecurityDiagram: React.FC<Props> = ({ type }) => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  if (type === 'cia-triad') {
    return (
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl my-4 text-xs font-mono">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
          <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Shield className="w-4 h-4" /> Interactive Architecture: The CIA Triad
          </span>
          <span className="text-slate-500 text-[10px]">Click any pillar to inspect security controls</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Confidentiality */}
          <div
            onClick={() => setActiveElement('c')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              activeElement === 'c'
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-cyan-300 text-sm mb-1">
              <Lock className="w-4 h-4" /> 1. Confidentiality
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Restricting information access strictly to authorized entities. Protects against eavesdropping and data leaks.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold">Key Controls:</span> AES-256 Encryption, RBAC, Multi-Factor Authentication.
            </div>
          </div>

          {/* Integrity */}
          <div
            onClick={() => setActiveElement('i')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              activeElement === 'i'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm mb-1">
              <CheckCircle2 className="w-4 h-4" /> 2. Integrity
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Ensuring information remains completely accurate, untampered, and authentic throughout its lifecycle.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="text-emerald-400 font-bold">Key Controls:</span> SHA-256 Hashes, Digital Signatures, Immutable Backups.
            </div>
          </div>

          {/* Availability */}
          <div
            onClick={() => setActiveElement('a')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              activeElement === 'a'
                ? 'bg-blue-950/80 border-blue-400 text-blue-100 shadow-lg shadow-blue-950/50'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-blue-300 text-sm mb-1">
              <RefreshCw className="w-4 h-4" /> 3. Availability
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Guaranteeing authorized users have timely and reliable access to systems, data, and critical networks.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="text-blue-400 font-bold">Key Controls:</span> Redundant Servers, DDoS Protection, UPS Battery Backups.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'osi-stack') {
    const layers = [
      { num: 7, name: 'Application', proto: 'HTTP, DNS, SSH, TLS', pdu: 'Data', color: 'border-cyan-500/60 bg-cyan-950/20' },
      { num: 6, name: 'Presentation', proto: 'SSL/TLS, ASCII, JPEG', pdu: 'Data', color: 'border-cyan-600/50 bg-cyan-950/20' },
      { num: 5, name: 'Session', proto: 'RPC, NetBIOS, Sockets', pdu: 'Data', color: 'border-cyan-700/40 bg-cyan-950/15' },
      { num: 4, name: 'Transport', proto: 'TCP (3-Way Handshake), UDP', pdu: 'Segments', color: 'border-blue-600/60 bg-blue-950/20' },
      { num: 3, name: 'Network', proto: 'IPv4, IPv6, ICMP, Routing', pdu: 'Packets', color: 'border-emerald-600/60 bg-emerald-950/20' },
      { num: 2, name: 'Data Link', proto: 'Ethernet, MAC Addresses, ARP', pdu: 'Frames', color: 'border-amber-600/60 bg-amber-950/20' },
      { num: 1, name: 'Physical', proto: 'Cables, Radio Waves (802.11), Bits', pdu: 'Bits', color: 'border-slate-700 bg-slate-950/40' }
    ];

    return (
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl my-4 text-xs font-mono">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
          <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> OSI 7-Layer Protocol Stack & PDU Encapsulation
          </span>
          <span className="text-slate-500 text-[10px]">Top-Down Encapsulation Model</span>
        </div>

        <div className="space-y-1.5">
          {layers.map(layer => (
            <div
              key={layer.num}
              className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors hover:border-cyan-400 ${layer.color}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 tabular-nums text-xs">
                  {layer.num}
                </span>
                <span className="font-bold text-slate-200 text-xs">{layer.name} Layer</span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block font-mono">{layer.proto}</div>
              <div className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-cyan-300 font-mono border border-slate-800">
                PDU: {layer.pdu}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'zero-trust') {
    return (
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl my-4 text-xs font-mono">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
          <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" /> Architecture: Zero Trust Principles (NIST SP 800-207)
          </span>
          <span className="text-slate-500 text-[10px]">Never Trust · Always Verify</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-400 text-xs">1. Verify Explicitly</div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Always authenticate and authorize based on all available data points: user identity, location, device health, service or workload.
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-400 text-xs">2. Use Least Privilege</div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA) permissions, risk-based adaptive policies, and data protection.
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <div className="font-bold text-rose-400 text-xs">3. Assume Breach</div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Minimize blast radius by segmenting access by network, user, devices, and application awareness. Encrypt all sessions end-to-end.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback diagram: Defense-in-depth
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl my-4 text-xs font-mono">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
        <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Shield className="w-4 h-4" /> Defense-in-Depth Layered Architecture
        </span>
      </div>

      <div className="space-y-2">
        <div className="p-2 bg-slate-950 border border-slate-800 rounded text-slate-300 flex items-center justify-between">
          <span>Layer 1: Perimeter & Edge</span>
          <span className="text-cyan-400 text-[11px]">DDoS Mitigation, Edge Firewalls, DNS filtering</span>
        </div>
        <div className="p-2 bg-slate-950 border border-slate-800 rounded text-slate-300 flex items-center justify-between">
          <span>Layer 2: Network Segmentation</span>
          <span className="text-cyan-400 text-[11px]">VLANs, DMZ, Microsegmentation, IDS/IPS</span>
        </div>
        <div className="p-2 bg-slate-950 border border-slate-800 rounded text-slate-300 flex items-center justify-between">
          <span>Layer 3: Endpoint Defense</span>
          <span className="text-cyan-400 text-[11px]">EDR, Host Firewall, BitLocker/FileVault, Patching</span>
        </div>
        <div className="p-2 bg-slate-950 border border-slate-800 rounded text-slate-300 flex items-center justify-between">
          <span>Layer 4: Identity & Access</span>
          <span className="text-cyan-400 text-[11px]">MFA, PAM, Least Privilege, SSO</span>
        </div>
        <div className="p-2 bg-slate-950 border border-cyan-800/80 rounded text-cyan-200 flex items-center justify-between font-bold">
          <span>Core: Sensitive Data & Assets</span>
          <span className="text-emerald-400 text-[11px]">AES-256 Encryption, Immutable Backups</span>
        </div>
      </div>
    </div>
  );
};
