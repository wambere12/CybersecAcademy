import React, { useState } from 'react';
import { CurriculumProvider, useCurriculum } from './context/CurriculumContext';
import { Sidebar, NavTab } from './components/common/Sidebar';
import { CourseCatalog } from './components/courses/CourseCatalog';
import { CourseDetail } from './components/courses/CourseDetail';
import { LessonViewer } from './components/courses/LessonViewer';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { InstructorPortal } from './components/instructor/InstructorPortal';
import { PublicVerificationView } from './components/certificate/PublicVerificationView';
import { CertificateModal } from './components/certificate/CertificateModal';
import { AssessmentModal } from './components/assessment/AssessmentModal';
import { ProjectSubmissionModal } from './components/assessment/ProjectSubmissionModal';
import { CertificateStore } from './components/store/CertificateStore';
import { ScholarshipsView } from './components/scholarships/ScholarshipsView';
import { SettingsView } from './components/settings/SettingsView';
import { SystemControlPortal } from './components/admin/SystemControlPortal';
import { LabModal, LabType } from './components/labs/LabModal';
import { LinuxTerminalLab } from './components/labs/LinuxTerminalLab';
import { NetworkPacketAnalyzerLab } from './components/labs/NetworkPacketAnalyzerLab';
import { CryptographyLab } from './components/labs/CryptographyLab';
import { WebSecuritySandboxLab } from './components/labs/WebSecuritySandboxLab';
import { PasswordAuditLab } from './components/labs/PasswordAuditLab';
import { PhishingDetectorLab } from './components/labs/PhishingDetectorLab';
import { IoTSecurityLab } from './components/labs/IoTSecurityLab';
import { Course, Lesson, Assessment, PracticalProject, Certificate } from './types/cybersecurity';
import {
  Menu,
  Terminal,
  Activity,
  KeyRound,
  Globe,
  Key,
  Mail,
  Cpu,
  Shield,
  ShoppingBag,
  GraduationCap
} from 'lucide-react';

function AppContent() {
  const { courses, assessments, projects, certificates, settings } = useCurriculum();

  // Navigation states
  const [activeTab, setActiveTab] = useState<NavTab>('catalog');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Modal states
  const [activeLab, setActiveLab] = useState<LabType | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [activeProject, setActiveProject] = useState<PracticalProject | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [verificationCredentialId, setVerificationCredentialId] = useState<string | null>(null);

  // Labs Hub sub-tab
  const [activeLabHubTab, setActiveLabHubTab] = useState<LabType>('terminal');

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
  };

  const handleSelectLesson = (course: Course, lesson: Lesson) => {
    setSelectedCourse(course);
    setSelectedLesson(lesson);
  };

  const handleTakeExam = (assessmentId: string) => {
    const found = assessments.find(a => a.id === assessmentId);
    if (found) setActiveAssessment(found);
  };

  const handleSubmitProject = (projectId: string) => {
    const found = projects.find(p => p.id === projectId);
    if (found) setActiveProject(found);
  };

  const handleViewCertificate = (certId: string) => {
    const found = certificates.find(c => c.id === certId);
    if (found) setActiveCertificate(found);
  };

  const handleOpenVerification = (credId: string) => {
    setVerificationCredentialId(credId);
    setActiveTab('verify');
    if (activeCertificate) setActiveCertificate(null);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-cyan-500 selection:text-slate-950 ${settings.highContrastMode ? 'contrast-125' : ''}`}>
      {/* 1. Permanent Left-Side Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          if (tab !== 'catalog') {
            setSelectedCourse(null);
            setSelectedLesson(null);
          }
        }}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* 2. Main Content Wrapper offset by Left Sidebar (72 = 18rem / 288px) */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Mobile Bar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="font-extrabold text-sm text-slate-100">CyberSec Academy</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('store')}
              className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* A. Verification View */}
          {activeTab === 'verify' && (
            <PublicVerificationView
              initialCredentialId={verificationCredentialId || undefined}
              onBack={() => {
                setActiveTab('catalog');
                setVerificationCredentialId(null);
              }}
            />
          )}

          {/* B. Student Dashboard */}
          {activeTab === 'dashboard' && (
            <StudentDashboard
              onSelectCourse={handleSelectCourse}
              onSelectLesson={(course, lesson) => {
                setSelectedCourse(course);
                setSelectedLesson(lesson);
                setActiveTab('catalog');
              }}
              onViewCertificate={handleViewCertificate}
              onOpenVerification={handleOpenVerification}
            />
          )}

          {/* C. Certificate Marketplace (Monetization & Selling All) */}
          {activeTab === 'store' && (
            <CertificateStore
              onOpenCertificateModal={cert => setActiveCertificate(cert)}
              onNavigateToScholarships={() => setActiveTab('scholarships')}
            />
          )}

          {/* D. Cybersecurity & IoT Scholarships (Age Transitions) */}
          {activeTab === 'scholarships' && (
            <ScholarshipsView
              onNavigateToStore={() => setActiveTab('store')}
              onNavigateToLabs={() => {
                setActiveTab('labs');
                setActiveLabHubTab('iot-security');
              }}
            />
          )}

          {/* E. Settings & Platform Controls */}
          {activeTab === 'settings' && <SettingsView />}

          {/* F. System & Student Control Center */}
          {activeTab === 'system-control' && <SystemControlPortal />}

          {/* G. Instructor & Admin Portal */}
          {activeTab === 'instructor' && <InstructorPortal />}

          {/* G. Hands-on Sandboxes Direct Hub */}
          {activeTab === 'labs' && (
            <div className="space-y-6">
              <div className="text-center space-y-2 max-w-2xl mx-auto py-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full">
                  <Terminal className="w-3.5 h-3.5" /> Isolated Practical Sandboxes
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  Cybersecurity & IoT Hands-on Laboratories
                </h1>
                <p className="text-xs text-slate-400 font-sans">
                  Execute offensive attacks, packet analysis, cryptographic decryption, and smart device firmware security in isolated browser environments.
                </p>
              </div>

              {/* Sandbox Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs">
                <button
                  onClick={() => setActiveLabHubTab('terminal')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeLabHubTab === 'terminal' ? 'bg-cyan-600 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-4 h-4" /> 1. Linux Terminal
                </button>
                <button
                  onClick={() => setActiveLabHubTab('wireshark')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeLabHubTab === 'wireshark' ? 'bg-cyan-600 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Activity className="w-4 h-4" /> 2. Wireshark Inspector
                </button>
                <button
                  onClick={() => setActiveLabHubTab('crypto')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeLabHubTab === 'crypto' ? 'bg-cyan-600 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <KeyRound className="w-4 h-4" /> 3. Crypto & Hash
                </button>
                <button
                  onClick={() => setActiveLabHubTab('web-security')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeLabHubTab === 'web-security' ? 'bg-cyan-600 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Globe className="w-4 h-4" /> 4. Web Security (SQLi/XSS)
                </button>
                <button
                  onClick={() => setActiveLabHubTab('password')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeLabHubTab === 'password' ? 'bg-cyan-600 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Key className="w-4 h-4" /> 5. Password Entropy
                </button>
                <button
                  onClick={() => setActiveLabHubTab('phishing')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeLabHubTab === 'phishing' ? 'bg-cyan-600 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Mail className="w-4 h-4" /> 6. Phishing Detective
                </button>
                <button
                  onClick={() => setActiveLabHubTab('iot-security')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeLabHubTab === 'iot-security' ? 'bg-cyan-600 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-4 h-4" /> 7. IoT Security
                </button>
              </div>

              {/* Active Sandbox Render */}
              <div className="pt-2">
                {activeLabHubTab === 'terminal' && <LinuxTerminalLab />}
                {activeLabHubTab === 'wireshark' && <NetworkPacketAnalyzerLab />}
                {activeLabHubTab === 'crypto' && <CryptographyLab />}
                {activeLabHubTab === 'web-security' && <WebSecuritySandboxLab />}
                {activeLabHubTab === 'password' && <PasswordAuditLab />}
                {activeLabHubTab === 'phishing' && <PhishingDetectorLab />}
                {activeLabHubTab === 'iot-security' && <IoTSecurityLab />}
              </div>
            </div>
          )}

          {/* H. Curriculum Catalog / Syllabus / Lesson Viewer */}
          {activeTab === 'catalog' && (
            <>
              {selectedLesson && selectedCourse ? (
                <LessonViewer
                  course={selectedCourse}
                  lesson={selectedLesson}
                  onBackToCourse={() => setSelectedLesson(null)}
                  onSelectLesson={lId => {
                    const target = selectedCourse.modules.flatMap(m => m.lessons).find(l => l.id === lId);
                    if (target) setSelectedLesson(target);
                  }}
                  onLaunchLab={labType => setActiveLab(labType)}
                />
              ) : selectedCourse ? (
                <CourseDetail
                  course={selectedCourse}
                  onBack={() => setSelectedCourse(null)}
                  onSelectLesson={l => setSelectedLesson(l)}
                  onTakeExam={handleTakeExam}
                  onSubmitProject={handleSubmitProject}
                  onViewCertificate={handleViewCertificate}
                />
              ) : (
                <CourseCatalog onSelectCourse={handleSelectCourse} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Lab Modal Popup (when launched directly from a lesson) */}
      <LabModal
        initialLab={activeLab || 'terminal'}
        isOpen={Boolean(activeLab)}
        onClose={() => setActiveLab(null)}
      />

      {/* Examination Modal */}
      {activeAssessment && (
        <AssessmentModal
          assessment={activeAssessment}
          isOpen={Boolean(activeAssessment)}
          onClose={() => setActiveAssessment(null)}
        />
      )}

      {/* Practical Project Submission Modal */}
      {activeProject && (
        <ProjectSubmissionModal
          project={activeProject}
          isOpen={Boolean(activeProject)}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Official Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          isOpen={Boolean(activeCertificate)}
          onClose={() => setActiveCertificate(null)}
          onOpenVerification={handleOpenVerification}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CurriculumProvider>
      <AppContent />
    </CurriculumProvider>
  );
}
