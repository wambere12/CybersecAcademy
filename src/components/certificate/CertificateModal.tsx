import React, { useRef } from 'react';
import { X, Award, Shield, CheckCircle2, AlertTriangle, Printer, Share2, ExternalLink, Download } from 'lucide-react';
import { Certificate } from '../../types/cybersecurity';
import { downloadCertificatePdf } from '../../utils/pdfGenerator';

interface Props {
  certificate: Certificate;
  isOpen: boolean;
  onClose: () => void;
  onOpenVerification?: (credId: string) => void;
}

export const CertificateModal: React.FC<Props> = ({
  certificate,
  isOpen,
  onClose,
  onOpenVerification
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isRevoked = certificate.status === 'Revoked';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200">Verified Cybersecurity Credential</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => downloadCertificatePdf(certificate)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF (.pdf)
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            {onOpenVerification && (
              <button
                onClick={() => onOpenVerification(certificate.credentialId)}
                className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Public Verification
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-slate-950 flex items-center justify-center">
          <div
            ref={printRef}
            className={`w-full max-w-3xl bg-slate-900 border-2 rounded-2xl p-8 sm:p-12 relative overflow-hidden text-center shadow-2xl transition-all ${
              isRevoked
                ? 'border-rose-800/80 bg-rose-950/20'
                : 'border-cyan-500/50 shadow-cyan-950/30'
            }`}
          >
            {/* Guilloche border watermark effect */}
            <div className="absolute inset-2 border border-slate-700/60 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 border border-slate-800/40 rounded-lg pointer-events-none" />

            {/* Revoked watermark banner if revoked */}
            {isRevoked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-7xl font-extrabold text-rose-500/15 uppercase tracking-widest transform -rotate-12 select-none">
                  REVOKED
                </span>
              </div>
            )}

            {/* Header Crest */}
            <div className="relative z-10 flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
                <Shield className="w-8 h-8" />
              </div>
              <div className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-bold">
                {certificate.issuingOrg}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-serif tracking-tight">
                Certificate of Technical Mastery
              </h1>
              <p className="text-xs text-slate-400">
                This official credential certifies that
              </p>
            </div>

            {/* Student Name */}
            <div className="relative z-10 my-6 py-2 border-b border-t border-slate-800">
              <div className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif tracking-wide text-cyan-200">
                {certificate.studentName}
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{certificate.studentEmail}</div>
            </div>

            {/* Achievement details */}
            <div className="relative z-10 space-y-2 max-w-xl mx-auto">
              <p className="text-xs text-slate-400 leading-relaxed">
                has successfully fulfilled all curriculum requirements, practical technical laboratory simulations, and
                rigorous examination standards for
              </p>
              <div className="text-lg sm:text-xl font-bold text-slate-100 text-cyan-300">
                {certificate.courseOrPathTitle}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono pt-1">
                <span>Level: <strong className="text-slate-200">{certificate.level}</strong></span>
                <span>·</span>
                <span>Grade: <strong className="text-emerald-400">{certificate.grade}</strong></span>
                <span>·</span>
                <span>Score: <strong className="text-slate-200 tabular-nums">{certificate.scorePercentage}%</strong></span>
              </div>
            </div>

            {/* Bottom Section: QR Code, Signatures, Credential ID */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              {/* QR Code Graphic Representation */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center shadow">
                  {/* High quality clean SVG QR Code pattern */}
                  <svg viewBox="0 0 29 29" className="w-full h-full text-slate-950 fill-current">
                    <rect x="0" y="0" width="7" height="7" fill="black" />
                    <rect x="1" y="1" width="5" height="5" fill="white" />
                    <rect x="2" y="2" width="3" height="3" fill="black" />

                    <rect x="22" y="0" width="7" height="7" fill="black" />
                    <rect x="23" y="1" width="5" height="5" fill="white" />
                    <rect x="24" y="2" width="3" height="3" fill="black" />

                    <rect x="0" y="22" width="7" height="7" fill="black" />
                    <rect x="1" y="23" width="5" height="5" fill="white" />
                    <rect x="2" y="24" width="3" height="3" fill="black" />

                    <rect x="9" y="3" width="2" height="2" fill="black" />
                    <rect x="13" y="3" width="3" height="1" fill="black" />
                    <rect x="18" y="3" width="2" height="2" fill="black" />
                    <rect x="11" y="9" width="3" height="3" fill="black" />
                    <rect x="16" y="11" width="4" height="2" fill="black" />
                    <rect x="10" y="16" width="2" height="4" fill="black" />
                    <rect x="14" y="15" width="3" height="2" fill="black" />
                    <rect x="20" y="18" width="5" height="2" fill="black" />
                    <rect x="12" y="22" width="3" height="4" fill="black" />
                    <rect x="18" y="22" width="4" height="2" fill="black" />
                  </svg>
                </div>
                <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
                  <div className="text-slate-300 font-bold">Credential ID:</div>
                  <div className="text-cyan-300 font-semibold">{certificate.credentialId}</div>
                  <div>Issued: {certificate.issuedDate}</div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-center sm:items-end">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                    certificate.status === 'Issued'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : certificate.status === 'Revoked'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}
                >
                  {certificate.status === 'Issued' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  )}
                  Status: {certificate.status.toUpperCase()}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">
                  Authorized Signer: {certificate.authorizedSigner}
                </div>
              </div>
            </div>

            {isRevoked && certificate.revocationReason && (
              <div className="mt-4 p-2.5 rounded bg-rose-950/80 border border-rose-800 text-rose-300 text-xs">
                Revocation Audit Reason: {certificate.revocationReason}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
