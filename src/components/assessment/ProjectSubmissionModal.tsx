import React, { useState } from 'react';
import { X, Send, Award, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { PracticalProject } from '../../types/cybersecurity';
import { useCurriculum } from '../../context/CurriculumContext';

interface Props {
  project: PracticalProject;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectSubmissionModal: React.FC<Props> = ({ project, isOpen, onClose }) => {
  const { submitProject, submissions, userName } = useCurriculum();
  const [reportText, setReportText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Check if already submitted
  const existingSub = submissions.find(s => s.projectId === project.id && s.studentName === userName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;

    submitProject({
      projectId: project.id,
      courseId: project.courseId,
      studentName: userName,
      submissionText: reportText,
      maxScore: 100
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl h-[88vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <div>
            <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">
              Practical Capstone Project Submission
            </div>
            <h2 className="text-base font-bold text-slate-100">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-200 text-xs">
          {/* Scenario Overview */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Operational Scenario:
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">{project.scenario}</p>
          </div>

          {/* Required Tasks */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-100">Project Deliverable Tasks:</h3>
            <div className="space-y-2">
              {project.tasks.map((task, idx) => (
                <div key={task.id} className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg space-y-1">
                  <div className="font-semibold text-slate-200">
                    Task {idx + 1}: {task.instructions}
                  </div>
                  {task.hints && task.hints.length > 0 && (
                    <div className="text-[11px] text-slate-500 font-mono">
                      Guidance: {task.hints.join(' ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Grading Rubric Matrix */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" /> Assessment Rubric Matrix (Passing Score: {project.passingPoints} pts)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.rubric.map(item => (
                <div key={item.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{item.criterion}</span>
                    <span className="text-cyan-400 font-mono font-bold">{item.points} pts</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Form / Status */}
          {existingSub || submitted ? (
            <div className="p-5 bg-emerald-950/30 border border-emerald-800/80 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" /> Project Successfully Submitted for Review!
              </div>
              <p className="text-slate-300 font-sans text-xs">
                Your practical project report has been received by the instructor evaluation queue. Instructors grade
                practical submissions using the rubric matrix above.
              </p>
              {existingSub?.status === 'graded' && (
                <div className="p-3 bg-slate-950 rounded border border-emerald-700/60 mt-3 space-y-1">
                  <div className="font-bold text-emerald-300">
                    Graded Score: {existingSub.score} / {existingSub.maxScore} (Approved)
                  </div>
                  <div className="text-slate-400">
                    Instructor Feedback: <span className="text-slate-200">{existingSub.feedback}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="font-bold text-sm text-slate-100">Submit Your Practical Report & Lab Output:</h3>
              <textarea
                value={reportText}
                onChange={e => setReportText(e.target.value)}
                placeholder="Paste your executive summary, hardening steps taken, CLI outputs, and verification proofs here..."
                rows={6}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">
                  Requires written answers covering all rubric criteria.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" /> Submit Report to Instructor Queue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
