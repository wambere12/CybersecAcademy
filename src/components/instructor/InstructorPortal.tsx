import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BarChart3,
  Edit,
  Plus,
  Trash2,
  Search,
  Check
} from 'lucide-react';
import { useCurriculum } from '../../context/CurriculumContext';
import { Course, ProjectSubmission, Certificate } from '../../types/cybersecurity';

export const InstructorPortal: React.FC = () => {
  const {
    courses,
    submissions,
    certificates,
    gradeProjectSubmission,
    issueCertificate,
    revokeCertificate,
    updateCourse,
    userRole
  } = useCurriculum();

  const [activeTab, setActiveTab] = useState<'submissions' | 'curriculum' | 'certificates' | 'analytics'>('submissions');

  // Grading form state
  const [selectedSub, setSelectedSub] = useState<ProjectSubmission | null>(null);
  const [gradeScore, setGradeScore] = useState(90);
  const [gradeFeedback, setGradeFeedback] = useState('Excellent technical execution and thorough risk analysis.');

  // Revocation state
  const [revokingCertId, setRevokingCertId] = useState<string | null>(null);
  const [revocationReason, setRevocationReason] = useState('Academic dishonesty during examination.');

  // Course edit modal state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    gradeProjectSubmission(selectedSub.id, gradeScore, gradeFeedback, true);
    setSelectedSub(null);
  };

  const handleRevokeConfirm = (certId: string) => {
    if (!revocationReason.trim()) return;
    revokeCertificate(certId, revocationReason);
    setRevokingCertId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
        <div>
          <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            Academic Governance & Operations Console
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">
            {userRole === 'admin' ? 'Administrator Curriculum Management' : 'Instructor Evaluation Portal'}
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Role: <strong className="text-amber-300 uppercase">{userRole}</strong> · Review Practical Labs · Manage Certifications
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'submissions' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Submissions Queue ({submissions.filter(s => s.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'curriculum' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Curriculum Editor
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'certificates' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Certificate Authority
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'analytics' ? 'bg-amber-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Platform Analytics
          </button>
        </div>
      </div>

      {/* Tab 1: Practical Submissions Queue */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" /> Practical Project Grading Queue
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Total Submissions: {submissions.length}
            </span>
          </div>

          <div className="space-y-3">
            {submissions.map(sub => {
              const course = courses.find(c => c.id === sub.courseId);
              return (
                <div
                  key={sub.id}
                  className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-200">{sub.studentName}</span>
                      <span className="text-slate-500">· Submitted {sub.submittedAt}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          sub.status === 'graded'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {sub.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-cyan-300">
                      {course?.title || sub.courseId}
                    </div>

                    <p className="text-xs text-slate-400 font-mono line-clamp-2 bg-slate-950 p-2.5 rounded border border-slate-800 mt-1">
                      "{sub.submissionText}"
                    </p>

                    {sub.feedback && (
                      <div className="text-xs text-emerald-400 font-mono mt-1">
                        Instructor Feedback: {sub.feedback} (Score: {sub.score}/100)
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedSub(sub)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                    >
                      {sub.status === 'graded' ? 'Re-grade Submission' : 'Grade Submission'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grade Submission Modal Popup */}
          {selectedSub && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-slate-100 text-sm">
                    Grade Practical Deliverable: {selectedSub.studentName}
                  </h3>
                  <button onClick={() => setSelectedSub(null)} className="text-slate-400 hover:text-slate-200">
                    ✕
                  </button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 max-h-40 overflow-y-auto">
                  {selectedSub.submissionText}
                </div>

                <form onSubmit={handleGradeSubmit} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Awarded Points (out of 100):</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={gradeScore}
                      onChange={e => setGradeScore(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Qualitative Instructor Feedback:</label>
                    <textarea
                      value={gradeFeedback}
                      onChange={e => setGradeFeedback(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSub(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl"
                    >
                      Approve & Record Grade
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Curriculum Management & Course Editor */}
      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> Course Content Management ({courses.length})
            </h2>
          </div>

          <div className="space-y-3">
            {courses.map(course => (
              <div
                key={course.id}
                className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-mono text-slate-500">
                    Course {course.number} · {course.level} · {course.status.toUpperCase()}
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm mt-0.5">{course.title}</h3>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {course.modules.length} Modules · {course.modules.flatMap(m => m.lessons).length} Lessons ·{' '}
                    {course.estimatedHours} Hours
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit Metadata & Hours
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Course Modal */}
          {editingCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-slate-100 text-sm">Edit Course: {editingCourse.title}</h3>
                  <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-slate-200">
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    updateCourse(editingCourse);
                    setEditingCourse(null);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Course Title:</label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={e => setEditingCourse({ ...editingCourse, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Estimated Study Hours:</label>
                    <input
                      type="number"
                      value={editingCourse.estimatedHours}
                      onChange={e =>
                        setEditingCourse({ ...editingCourse, estimatedHours: Number(e.target.value) })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Course Status:</label>
                    <select
                      value={editingCourse.status}
                      onChange={e =>
                        setEditingCourse({
                          ...editingCourse,
                          status: e.target.value as 'published' | 'draft' | 'archived'
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingCourse(null)}
                      className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-cyan-600 text-slate-950 font-bold rounded-xl"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Certificate Authority (Revocation & Auditing) */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Certificate Authority Registry ({certificates.length})
            </h2>
          </div>

          <div className="space-y-3">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-400 font-bold text-xs">{cert.credentialId}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        cert.status === 'Issued'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {cert.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100">{cert.studentName}</div>
                  <div className="text-xs text-slate-400">{cert.courseOrPathTitle}</div>
                  {cert.revocationReason && (
                    <div className="text-[11px] text-rose-300 font-mono mt-1">
                      Revocation Audit Log: {cert.revocationReason}
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {cert.status === 'Issued' ? (
                    <button
                      onClick={() => setRevokingCertId(cert.id)}
                      className="px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold rounded-xl text-xs transition-colors"
                    >
                      Revoke Credential
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">Revoked & Archived</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Revoke Confirmation Modal */}
          {revokingCertId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5" /> Confirm Credential Revocation
                </div>

                <p className="text-xs text-slate-300">
                  Revoking this certificate will immediately update the public verification portal to reflect REVOKED
                  status with documented audit justification.
                </p>

                <div className="space-y-1 text-xs">
                  <label className="text-slate-400 font-semibold">Documented Revocation Reason:</label>
                  <textarea
                    value={revocationReason}
                    onChange={e => setRevocationReason(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setRevokingCertId(null)}
                    className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleRevokeConfirm(revokingCertId)}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs"
                  >
                    Confirm Revocation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Platform Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Active Enrolled Learners</span>
              <div className="text-2xl font-bold text-slate-100 tabular-nums">1,482</div>
              <div className="text-[11px] text-emerald-400 font-mono">+18% this month</div>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Average Exam Pass Rate</span>
              <div className="text-2xl font-bold text-cyan-400 tabular-nums">84.2%</div>
              <div className="text-[11px] text-slate-400 font-mono">Above 70% threshold</div>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Verifiable Credentials Issued</span>
              <div className="text-2xl font-bold text-emerald-400 tabular-nums">648</div>
              <div className="text-[11px] text-slate-400 font-mono">Zero unverified disputes</div>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Active Hands-on Labs Completed</span>
              <div className="text-2xl font-bold text-amber-400 tabular-nums">4,210</div>
              <div className="text-[11px] text-slate-400 font-mono">Terminal & Wireshark sandboxes</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
