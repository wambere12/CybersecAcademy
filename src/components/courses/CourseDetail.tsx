import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronRight,
  FileText,
  Play,
  ShieldCheck,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { Course, CourseModule, Lesson } from '../../types/cybersecurity';
import { useCurriculum } from '../../context/CurriculumContext';

interface Props {
  course: Course;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onTakeExam: (assessmentId: string) => void;
  onSubmitProject: (projectId: string) => void;
  onViewCertificate: (certId: string) => void;
}

export const CourseDetail: React.FC<Props> = ({
  course,
  onBack,
  onSelectLesson,
  onTakeExam,
  onSubmitProject,
  onViewCertificate
}) => {
  const {
    enrolledCourseIds,
    enrollCourse,
    completedLessonIds,
    getCourseProgress,
    isCourseUnlocked,
    hasPassedFinalExam,
    quizAttempts,
    submissions,
    certificates,
    assessments,
    projects
  } = useCurriculum();

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const isUnlocked = isCourseUnlocked(course.id);
  const progress = getCourseProgress(course.id);
  const passedExam = hasPassedFinalExam(course.id);

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    course.modules.forEach(m => (init[m.id] = true));
    return init;
  });

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const exam = assessments.find(a => a.id === course.finalExamId);
  const project = projects.find(p => p.id === course.practicalProjectId);
  const examAttempt = quizAttempts[course.finalExamId];
  const submission = submissions.find(s => s.courseId === course.id);
  const cert = certificates.find(c => c.courseOrPathId === course.id);

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = course.modules
    .flatMap(m => m.lessons)
    .filter(l => completedLessonIds.includes(l.id)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Curriculum Directory
        </button>

        <span className="text-xs text-slate-500 font-mono">
          Level: <strong className="text-slate-300">{course.level}</strong> · Status: {course.status.toUpperCase()}
        </span>
      </div>

      {/* Hero Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span>Course {course.number}</span>
            {course.trackCode && <span>· {course.trackCode}</span>}
            <span>· {course.estimatedHours} Hours of Rigorous Instruction</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            {course.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
            {course.description}
          </p>
        </div>

        {/* Prerequisites status alert */}
        {!isUnlocked && (
          <div className="p-3 bg-amber-950/40 border border-amber-800/80 rounded-xl text-xs text-amber-300 flex items-center gap-2">
            <Lock className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              This advanced course is locked. You must complete prerequisite foundation courses (
              {course.prerequisites.join(', ')}) before official completion credit unlocks.
            </span>
          </div>
        )}

        {/* Progress & Enrollment Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="space-y-1.5 flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Course Mastery Progress:</span>
              <span className="text-cyan-400 font-bold tabular-nums">
                {progress}% ({completedCount}/{totalLessons} lessons)
              </span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {!isEnrolled ? (
              <button
                onClick={() => enrollCourse(course.id)}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg"
              >
                Enroll in Course Free
              </button>
            ) : cert ? (
              <button
                onClick={() => onViewCertificate(cert.id)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-lg"
              >
                <Award className="w-4 h-4" /> View Issued Certificate
              </button>
            ) : (
              <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled & Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Learning Objectives Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" /> Core Competencies & Learning Objectives
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {course.learningObjectives.map((obj, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-2.5 text-slate-300 font-sans"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modules & Detailed Lessons Syllabus */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" /> Structured Curriculum Syllabus
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {course.modules.length} Modules · {totalLessons} Lessons
          </span>
        </div>

        <div className="space-y-3">
          {course.modules.map(mod => {
            const isExpanded = expandedModules[mod.id] !== false;
            return (
              <div key={mod.id} className="border border-slate-800 rounded-2xl bg-slate-900/60 overflow-hidden">
                {/* Module Header Strip */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-4 flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition-colors text-left"
                >
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Module {mod.order}
                    </div>
                    <div className="font-bold text-slate-100 text-sm">{mod.title}</div>
                    <div className="text-xs text-slate-400 font-sans">{mod.description}</div>
                  </div>

                  <div className="p-1 text-slate-400">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>

                {/* Lessons in Module */}
                {isExpanded && (
                  <div className="divide-y divide-slate-800/80 p-2 space-y-1">
                    {mod.lessons.map(les => {
                      const isLesCompleted = completedLessonIds.includes(les.id);
                      return (
                        <div
                          key={les.id}
                          onClick={() => onSelectLesson(les)}
                          className="p-3 rounded-xl hover:bg-slate-900/90 transition-all flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-mono ${
                                isLesCompleted
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-slate-950 text-slate-500 border border-slate-800'
                              }`}
                            >
                              {isLesCompleted ? '✓' : les.number}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-200 text-xs group-hover:text-cyan-300 transition-colors">
                                {les.title}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                {les.durationMinutes} mins · {les.practicalExercise ? 'Hands-on Lab Included' : 'Conceptual'}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-cyan-400 font-semibold group-hover:underline hidden sm:inline">
                              Study Lesson →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Project Card & Final Exam Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Practical Project Submission Box */}
        {project && (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Capstone Practical Project
              </div>
              <h3 className="font-bold text-slate-100 text-sm">{project.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{project.description}</p>
            </div>

            {submission ? (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Submitted for Review
                </div>
                <div className="text-slate-400 text-[11px]">
                  Status: <span className="text-slate-200 uppercase">{submission.status}</span> · Score:{' '}
                  {submission.score !== undefined ? `${submission.score}/100` : 'Pending Instructor Grade'}
                </div>
              </div>
            ) : (
              <button
                onClick={() => onSubmitProject(project.id)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors"
              >
                Submit Project Deliverables
              </button>
            )}
          </div>
        )}

        {/* Final Course Examination Box */}
        {exam && (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Final Comprehensive Examination
              </div>
              <h3 className="font-bold text-slate-100 text-sm">{exam.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {exam.questions.length} questions · {exam.timeLimitMinutes} minute time limit · Minimum passing score of{' '}
                {exam.passPercentage}% required to earn authorized certification.
              </p>
            </div>

            {examAttempt ? (
              <div className="space-y-2">
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    examAttempt.passed
                      ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-800 text-rose-200'
                  }`}
                >
                  <span className="font-bold">
                    {examAttempt.passed ? 'PASSED (Certificate Unlocked)' : 'NOT PASSED'}
                  </span>
                  <span className="tabular-nums font-mono font-bold">
                    {examAttempt.score} / {examAttempt.maxScore} ({examAttempt.percentage}%)
                  </span>
                </div>
                <button
                  onClick={() => onTakeExam(exam.id)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  Retake Examination
                </button>
              </div>
            ) : (
              <button
                onClick={() => onTakeExam(exam.id)}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg"
              >
                Start Final Examination
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
