import React, { useState } from 'react';
import { useCurriculum } from '../../context/CurriculumContext';
import {
  Settings,
  DollarSign,
  Shield,
  User,
  Sliders,
  Database,
  Check,
  RefreshCw,
  Download,
  Award,
  ToggleLeft,
  ToggleRight,
  Volume2,
  Eye,
  Building,
  GraduationCap,
  ShieldAlert,
  ArrowRight,
  FileText
} from 'lucide-react';
import { downloadTranscriptPdf, downloadTextAsPdf } from '../../utils/pdfGenerator';

interface SettingsViewProps {
  onNavigateToSystemControl?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigateToSystemControl }) => {
  const {
    settings,
    updateSettings,
    userName,
    setUserName,
    userEmail,
    userRole,
    setUserRole,
    resetProgress,
    certificates,
    completedLessonIds,
    quizAttempts,
    adminProfile,
    updateAdminProfile
  } = useCurriculum();

  const [adminUsernameInput, setAdminUsernameInput] = useState(adminProfile.username);
  const [adminEmailInput, setAdminEmailInput] = useState(adminProfile.email);

  const [savedNotification, setSavedNotification] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState(false);
  const [pdfDownloadedNotification, setPdfDownloadedNotification] = useState(false);

  // Custom Text to PDF Form State
  const [customPdfTitle, setCustomPdfTitle] = useState('Cybersecurity & Digital Hygiene Field Notes');
  const [customPdfSubtitle, setCustomPdfSubtitle] = useState('Personal Study Summary & Threat Analysis');
  const [customPdfContent, setCustomPdfContent] = useState(
    `1. CIA Triad Architecture:\n• Confidentiality: Enforced via AES-256-GCM encryption at rest and TLS 1.3 in transit.\n• Integrity: Verified using cryptographic SHA-256 hashes and digital signatures.\n• Availability: Safeguarded against volumetric and application-layer DDoS attacks via Anycast DNS and resilient CDN caching.\n\n2. IoT & Smart Hardware Security:\n• Firmware Reverse Engineering: Extracting SquashFS image files and auditing hardcoded credentials in UART/JTAG interfaces.\n• Network Isolation: Segmenting smart devices into isolated VLANs with strict firewall ACL rules preventing lateral movement.\n\n3. Authentication & Key Management:\n• Implement FIDO2 WebAuthn or TOTP authenticators across all primary accounts.\n• Zero Trust Principle: Never trust, always verify every incoming request regardless of network boundary.`
  );

  const handleToggle = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] });
    triggerSaved();
  };

  const triggerSaved = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const handleExportPdfTranscript = () => {
    downloadTranscriptPdf({
      studentName: userName,
      studentEmail: userEmail,
      certificates,
      completedLessonsCount: completedLessonIds.length,
      quizScores: quizAttempts,
      organizationName: settings.organizationName
    });
  };

  const handleExportCustomTextPdf = () => {
    if (!customPdfTitle.trim() || !customPdfContent.trim()) return;
    downloadTextAsPdf(customPdfTitle.trim(), customPdfContent.trim(), {
      subtitle: customPdfSubtitle.trim(),
      author: userName,
      organization: settings.organizationName,
      filename: `${customPdfTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`
    });
    setPdfDownloadedNotification(true);
    setTimeout(() => setPdfDownloadedNotification(false), 2500);
  };

  const handleExportTranscript = () => {
    const transcript = {
      studentName: userName,
      studentEmail: userEmail,
      exportedAt: new Date().toISOString(),
      completedLessonsCount: completedLessonIds.length,
      certificatesCount: certificates.length,
      certificates: certificates.map(c => ({
        credentialId: c.credentialId,
        title: c.courseOrPathTitle,
        level: c.level,
        grade: c.grade,
        issuedDate: c.issuedDate,
        status: c.status
      })),
      quizScores: quizAttempts
    };

    const blob = new Blob([JSON.stringify(transcript, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberSec-Transcript-${userName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Academy & Platform Settings
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure certificate monetization, learning thresholds, age-transition scholarship controls, and account preferences.
          </p>
        </div>

        {savedNotification && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-500" />
            Settings Saved
          </div>
        )}
      </div>

      {/* 1. Monetization & Certificate Selling Controls */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            Certificate Marketplace & Selling Controls
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded">
            Monetization Engine
          </span>
        </div>

        <div className="space-y-4 text-xs">
          {/* Allow Selling Certificates All */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Enable Certificate Selling Globally
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Permits students to purchase official verified credentials, embossed diplomas, and employer-shareable transcripts.
              </p>
            </div>
            <button
              onClick={() => handleToggle('allowCertificateSales')}
              className="text-2xl text-indigo-600 dark:text-indigo-400 cursor-pointer"
            >
              {settings.allowCertificateSales ? (
                <ToggleRight className="w-8 h-8 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-400" />
              )}
            </button>
          </div>

          {/* Currency Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Billing Currency
              </label>
              <select
                value={settings.currency}
                onChange={e => {
                  updateSettings({ currency: e.target.value as any });
                  triggerSaved();
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="EUR">EUR (€) - Eurozone</option>
                <option value="GBP">GBP (£) - British Pound Sterling</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Base Certificate Retail Price ({settings.currency})
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={settings.baseCertificatePrice}
                onChange={e => {
                  updateSettings({ baseCertificatePrice: parseInt(e.target.value) || 49 });
                  triggerSaved();
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Scholarship Vouchers Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Enable Scholarship & Age-Transition Grant Vouchers
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Accepts 100% full-tuition voucher codes awarded to youth, adult reskillers, and IoT security fellows.
              </p>
            </div>
            <button
              onClick={() => handleToggle('enableScholarshipVouchers')}
              className="text-2xl text-indigo-600 dark:text-indigo-400 cursor-pointer"
            >
              {settings.enableScholarshipVouchers ? (
                <ToggleRight className="w-8 h-8 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-400" />
              )}
            </button>
          </div>

          {/* Issuing Organization */}
          <div className="space-y-1 pt-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-500" />
              Issuing Organization Name on Diplomas
            </label>
            <input
              type="text"
              value={settings.organizationName}
              onChange={e => {
                updateSettings({ organizationName: e.target.value });
                triggerSaved();
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* 2. User Profile & Role Switcher */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <User className="w-4 h-4 text-indigo-500" />
            User Identity & Academic Persona
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            Active: {userRole.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Student / Instructor Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Role Switcher
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['student', 'instructor', 'admin'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setUserRole(role);
                    triggerSaved();
                  }}
                  className={`py-2 px-2 rounded-lg font-semibold capitalize text-center transition-all cursor-pointer ${
                    userRole === role
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Administrator Root Credentials & System Control Shortcut */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Root Admin Username & Access Parameters
            </span>
            {onNavigateToSystemControl && (
              <button
                type="button"
                onClick={onNavigateToSystemControl}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
              >
                Open Full Student CRUD & Interventions Console <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Admin Username (Active Identity)
              </label>
              <input
                type="text"
                value={adminUsernameInput}
                onChange={e => setAdminUsernameInput(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono text-indigo-600 dark:text-indigo-400 font-bold text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Admin Root Email
              </label>
              <input
                type="email"
                value={adminEmailInput}
                onChange={e => setAdminEmailInput(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => {
                updateAdminProfile({
                  username: adminUsernameInput.trim(),
                  email: adminEmailInput.trim()
                });
                triggerSaved();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
            >
              Update Admin Identity
            </button>
          </div>
        </div>
      </div>

      {/* 3. Learning & Accessibility Standards */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Sliders className="w-4 h-4 text-purple-500" />
            Learning & Examination Criteria
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Passing grade slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>Standard Passing Score Required for Certificates</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {settings.defaultPassPercentage}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="90"
              step="5"
              value={settings.defaultPassPercentage}
              onChange={e => {
                updateSettings({ defaultPassPercentage: parseInt(e.target.value) });
                triggerSaved();
              }}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500">
              Industry standard is 70%. Learners achieving 90% or higher receive the "Passed with Distinction" honor on their diploma.
            </p>
          </div>

          {/* Sound effects toggle */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                Terminal & Lab Sound Effects
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Play acoustic feedback for successful bash commands, packet analysis, and quiz submissions.
              </p>
            </div>
            <button
              onClick={() => handleToggle('enableSoundEffects')}
              className="text-2xl text-indigo-600 dark:text-indigo-400 cursor-pointer"
            >
              {settings.enableSoundEffects ? (
                <ToggleRight className="w-8 h-8 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Data Management & Export */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Database className="w-4 h-4 text-amber-500" />
            Data Management & Academic Transcript
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Export Verified Academic Transcript & Diplomas
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Generate an official embossed PDF diploma transcript or structured encrypted JSON containing all completed courses and credential IDs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportPdfTranscript}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              Download Transcript (PDF)
            </button>
            <button
              onClick={handleExportTranscript}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              JSON
            </button>
          </div>
        </div>

        {/* Universal Text to PDF Exporter Card */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span className="font-bold text-slate-900 dark:text-white">
                Universal Text to PDF Exporter (Gukora Download Text ikaza ari PDF)
              </span>
            </div>
            {pdfDownloadedNotification && (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> PDF Downloaded Successfully!
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Write or paste any notes, curriculum summaries, or security guidelines below to immediately download as an official formatted PDF document.
          </p>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Document Title
                </label>
                <input
                  type="text"
                  value={customPdfTitle}
                  onChange={e => setCustomPdfTitle(e.target.value)}
                  placeholder="e.g. Cybersecurity & IoT Security Notes"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Document Subtitle
                </label>
                <input
                  type="text"
                  value={customPdfSubtitle}
                  onChange={e => setCustomPdfSubtitle(e.target.value)}
                  placeholder="e.g. Field Study Summary & Analysis"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Text Content to be Formatted into PDF
              </label>
              <textarea
                rows={5}
                value={customPdfContent}
                onChange={e => setCustomPdfContent(e.target.value)}
                placeholder="Type or paste any text to convert and download as PDF..."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleExportCustomTextPdf}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Text as PDF (.pdf)
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-semibold text-red-600 dark:text-red-400">
              Reset Student Progress & State
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Clears local cache, completed lesson flags, and quiz attempts. (Credentials in the database remain intact).
            </p>
          </div>

          {resetConfirmation ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  resetProgress();
                  setResetConfirmation(false);
                  triggerSaved();
                }}
                className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
              >
                Confirm Reset
              </button>
              <button
                onClick={() => setResetConfirmation(false)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setResetConfirmation(true)}
              className="px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset My Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
