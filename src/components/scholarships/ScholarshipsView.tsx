import React, { useState } from 'react';
import { useCurriculum } from '../../context/CurriculumContext';
import {
  GraduationCap,
  Sparkles,
  Shield,
  Cpu,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Clock,
  Send,
  Copy,
  Check,
  Compass,
  AlertCircle
} from 'lucide-react';

interface ScholarshipsViewProps {
  onNavigateToStore: () => void;
  onNavigateToLabs: () => void;
}

export const ScholarshipsView: React.FC<ScholarshipsViewProps> = ({
  onNavigateToStore,
  onNavigateToLabs
}) => {
  const { scholarships, applyScholarship, userVouchers } = useCurriculum();

  // Age transition dynamic slider
  const [interactiveAge, setInteractiveAge] = useState<number>(26);
  const [selectedFocus, setSelectedFocus] = useState<'All' | 'Cybersecurity' | 'IoT Security'>('All');

  // Application form state
  const [applicantName, setApplicantName] = useState('Alex Mercer');
  const [applicantEmail, setApplicantEmail] = useState('alex.mercer@cybersec.org');
  const [applicantAge, setApplicantAge] = useState<number>(26);
  const [applicantTrack, setApplicantTrack] = useState<'Cybersecurity' | 'IoT Security' | 'Digital Forensics'>('IoT Security');
  const [applicantBackground, setApplicantBackground] = useState('');
  const [submittedVoucher, setSubmittedVoucher] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Derive age bracket category
  const getAgeCategory = (age: number) => {
    if (age <= 24) return { bracket: 'youth-16-24', label: 'Youth & Early Career (16-24)', highlight: 'Fast-track offensive and defensive security basics' };
    if (age <= 40) return { bracket: 'transition-25-40', label: 'Career Transition & Reskilling (25-40)', highlight: 'Direct pipeline into SOC Analysis, DevSecOps & Incident Response' };
    return { bracket: 'senior-40-plus', label: 'Experienced & Veteran Defense (40+)', highlight: 'Forensics, Compliance Auditing, Security Architecture & IoT' };
  };

  const currentCategory = getAgeCategory(interactiveAge);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const app = applyScholarship({
      programId: applicantTrack === 'IoT Security' ? 'sch-iot-embedded' : applicantAge < 25 ? 'sch-youth-cyber' : applicantAge > 40 ? 'sch-senior-defense' : 'sch-career-transition',
      applicantName,
      applicantEmail,
      age: applicantAge,
      educationStatus: 'Self-directed learner / Career transitioner',
      interestInIotOrCyber: applicantTrack,
      statementOfNeed: applicantBackground || 'Motivated career transitioner passionate about digital defense and hardware integrity.'
    });

    setSubmittedVoucher(app.awardedVoucherCode || 'GRANT-CYBER-100');
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 p-8 md:p-10 border border-emerald-500/20 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            Empowering Every Stage of Life • 100% Tuition Waivers
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Cybersecurity & IoT Lifelong Scholarship Program
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Whether you are 16 entering computing, 30 pivoting from non-tech, 45+ bringing mature life experience, or an embedded enthusiast securing connected smart devices — our endowed scholarship fund provides <strong className="text-emerald-400">100% full-tuition grants</strong> and verified credentials.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#apply-section"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              Apply for Instant Grant
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onNavigateToLabs}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              Try IoT Security Sandbox
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Age-Transition Navigator */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Age Transition Pathway Explorer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Adjust your age to preview tailored cybersecurity and IoT scholarships, roadmap recommendations, and funding grants.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-300">Selected Age:</span>
            <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
              {interactiveAge} Years Old
            </span>
          </div>
        </div>

        {/* Age Slider Control */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>16 (Youth / High School)</span>
            <span>25 (Career Pivot)</span>
            <span>40 (Mid-Career)</span>
            <span>65+ (Senior / Veteran)</span>
          </div>
          <input
            type="range"
            min="16"
            max="65"
            value={interactiveAge}
            onChange={e => setInteractiveAge(parseInt(e.target.value))}
            className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-900 dark:text-white">
              Category: {currentCategory.label}
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
              💡 {currentCategory.highlight}
            </span>
          </div>
        </div>

        {/* Dynamic Transition Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" /> Recommended Starting Point
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {interactiveAge <= 24
                ? 'Course 1 (Intro), Course 3 (Networking), and Course 10 (Ethical Hacking Fundamentals).'
                : interactiveAge <= 40
                ? 'Course 6 (Linux Security), Course 7 (Network Security), and Track B (SOC Analyst).'
                : 'Course 8 (Cryptography), Course 11 (Vulnerability Management), and Track C (Cloud/IoT Defense).'}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-4 h-4" /> IoT & Hardware Synergy
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Smart device firmware reverse engineering, MQTT telemetry protection, and medical/automotive hardware security.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400">
              <Award className="w-4 h-4" /> Grant Entitlement
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              100% full fee waiver including exams, lab sandboxes, and permanent cryptographically verifiable credentials.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Endowed Scholarship Grant Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            Endowed Scholarship Programs
          </h2>
          <div className="flex gap-1.5 text-xs">
            {(['All', 'Cybersecurity', 'IoT Security'] as const).map(focus => (
              <button
                key={focus}
                onClick={() => setSelectedFocus(focus)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedFocus === focus
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {focus}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships
            .filter(s => selectedFocus === 'All' || s.focusDomain.includes(selectedFocus))
            .map(sch => {
              const isIot = sch.focusDomain.includes('IoT');
              return (
                <div
                  key={sch.id}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                    isIot
                      ? 'border-emerald-300 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 via-white to-indigo-50/30 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {sch.ageBracketLabel}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {sch.grantAmount}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {sch.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {sch.description}
                      </p>
                    </div>

                    {/* Eligibility List */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Eligibility Criteria:
                      </p>
                      {sch.eligibility.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Grant Award Package:
                      </p>
                      {sch.benefits.slice(0, 3).map((benefit, bidx) => (
                        <div key={bidx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      Sponsor: {sch.sponsor}
                    </span>
                    <a
                      href="#apply-section"
                      onClick={() => {
                        setApplicantTrack(isIot ? 'IoT Security' : 'Cybersecurity');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Interactive Scholarship Application Form */}
      <div id="apply-section" className="rounded-3xl border border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Fast-Track Screening
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Apply for Cybersecurity & IoT Tuition Waiver
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Our automated grant algorithm screens applications within seconds. Approved candidates immediately receive an official voucher code granting 100% tuition discount across our course catalog and certification store.
          </p>
        </div>

        {submittedVoucher ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
                  Congratulations! 100% Scholarship Awarded!
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Your application has been vetted and approved by the Global Cyber Inclusion Alliance.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Your Granted Voucher Code
                </span>
                <p className="text-lg font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                  {submittedVoucher}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(submittedVoucher)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-800 dark:text-slate-200"
                >
                  {copiedCode === submittedVoucher ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Code
                    </>
                  )}
                </button>
                <button
                  onClick={onNavigateToStore}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Redeem in Store <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-emerald-800 dark:text-emerald-300">
              💡 This voucher has been saved to your account and will automatically apply in the Certification Store.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={e => setApplicantEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Current Age (Years)
                </label>
                <input
                  type="number"
                  min="14"
                  max="90"
                  required
                  value={applicantAge}
                  onChange={e => setApplicantAge(parseInt(e.target.value) || 20)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Primary Specialization Track
                </label>
                <select
                  value={applicantTrack}
                  onChange={e => setApplicantTrack(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="IoT Security">IoT & Connected Smart Hardware Security</option>
                  <option value="Cybersecurity">Offensive & Defensive Cybersecurity</option>
                  <option value="Digital Forensics">Digital Forensics & Incident Response</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Brief Statement of Career Intent & Need
              </label>
              <textarea
                rows={3}
                value={applicantBackground}
                onChange={e => setApplicantBackground(e.target.value)}
                placeholder="Share your learning motivations, previous background, and how this scholarship will impact your cybersecurity career..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-indigo-500" />
                Guaranteed response in under 2 seconds.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Scholarship Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
