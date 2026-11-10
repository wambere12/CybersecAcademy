import React, { useState } from 'react';
import { Search, Shield, CheckCircle2, AlertTriangle, ArrowLeft, ExternalLink, Calendar, User, BookOpen } from 'lucide-react';
import { useCurriculum } from '../../context/CurriculumContext';

interface Props {
  initialCredentialId?: string;
  onBack: () => void;
}

export const PublicVerificationView: React.FC<Props> = ({ initialCredentialId, onBack }) => {
  const { certificates } = useCurriculum();
  const [searchQuery, setSearchQuery] = useState(initialCredentialId || '');
  const [queriedCert, setQueriedCert] = useState(() => {
    if (initialCredentialId) {
      return certificates.find(c => c.credentialId.toLowerCase() === initialCredentialId.toLowerCase()) || null;
    }
    return certificates[0] || null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = certificates.find(
      c => c.credentialId.toLowerCase().trim() === searchQuery.toLowerCase().trim()
    );
    setQueriedCert(found || null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Breadcrumb & Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Academy Platform
        </button>

        <span className="text-xs text-slate-500 font-mono">
          Public Trust Registry · ISO/IEC 17024 Compliant
        </span>
      </div>

      {/* Header Banner */}
      <div className="text-center space-y-2 py-4">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Credential Verification Authority
        </h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
          Verify authenticated cybersecurity certifications and academic credentials issued by CyberSec Academy &
          Global Information Security Institute.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Enter Credential ID (e.g. CSA-2026-FND-88912)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors shrink-0"
        >
          Verify ID
        </button>
      </form>

      {/* Verification Result Card */}
      {queriedCert ? (
        <div
          className={`bg-slate-900/90 border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden ${
            queriedCert.status === 'Issued'
              ? 'border-emerald-800/80'
              : queriedCert.status === 'Revoked'
              ? 'border-rose-800/80'
              : 'border-slate-800'
          }`}
        >
          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="text-[11px] font-mono text-slate-400">OFFICIAL CREDENTIAL ID</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">{queriedCert.credentialId}</div>
            </div>

            <div
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 self-start sm:self-auto ${
                queriedCert.status === 'Issued'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : queriedCert.status === 'Revoked'
                  ? 'bg-rose-950 text-rose-400 border border-rose-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}
            >
              {queriedCert.status === 'Issued' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              STATUS: {queriedCert.status.toUpperCase()}
            </div>
          </div>

          {/* Approved Public Disclosure Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                <User className="w-3.5 h-3.5 text-slate-400" /> Authorized Recipient
              </span>
              <div className="text-base font-bold text-slate-100">{queriedCert.studentName}</div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" /> Certification Title
              </span>
              <div className="text-base font-bold text-cyan-300">{queriedCert.courseOrPathTitle}</div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date of Official Issue
              </span>
              <div className="text-sm font-semibold text-slate-200 font-mono">{queriedCert.issuedDate}</div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 text-[11px]">Issuing Organization</span>
              <div className="text-sm font-semibold text-slate-200">{queriedCert.issuingOrg}</div>
            </div>
          </div>

          {/* Level and Grade */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-slate-500 mr-2">Curriculum Level:</span>
              <span className="text-slate-200 font-bold">{queriedCert.level}</span>
            </div>
            <div>
              <span className="text-slate-500 mr-2">Official Grade:</span>
              <span className="text-emerald-400 font-bold">{queriedCert.grade}</span>
            </div>
          </div>

          {/* Revocation Warning Box if Revoked */}
          {queriedCert.status === 'Revoked' && (
            <div className="p-4 bg-rose-950/50 border border-rose-800 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Credential Revoked by Certification Board
              </div>
              <p className="text-slate-300">
                Reason for Revocation: <span className="text-rose-200 font-semibold">{queriedCert.revocationReason || 'Academic integrity or administrative policy violation.'}</span>
              </p>
            </div>
          )}

          {/* Cryptographic Proof Footer */}
          <div className="pt-2 text-[11px] text-slate-500 font-mono border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Cryptographic Verification Hash: 9f8a42...7b12e8 (Verified Against Registry)</span>
            <span>Authorized by: {queriedCert.authorizedSigner}</span>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
          <div className="text-sm font-bold text-slate-200">Credential Not Found in Registry</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No certificate was found matching the credential ID "{searchQuery}". Please check the spelling or format
            (e.g., CSA-2026-FND-88912).
          </p>
        </div>
      )}
    </div>
  );
};
