import React from 'react';
import {
  User,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bookmark,
  FileText,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useCurriculum } from '../../context/CurriculumContext';
import { Course, Lesson } from '../../types/cybersecurity';

interface Props {
  onSelectCourse: (course: Course) => void;
  onSelectLesson: (course: Course, lesson: Lesson) => void;
  onViewCertificate: (certId: string) => void;
  onOpenVerification: (credId: string) => void;
}

export const StudentDashboard: React.FC<Props> = ({
  onSelectCourse,
  onSelectLesson,
  onViewCertificate,
  onOpenVerification
}) => {
  const {
    userName,
    userEmail,
    courses,
    paths,
    enrolledCourseIds,
    completedLessonIds,
    quizAttempts,
    certificates,
    submissions,
    bookmarkedLessonIds,
    getCourseProgress,
    getRecommendedNextLesson,
    resetProgress
  } = useCurriculum();

  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  const recommended = getRecommendedNextLesson();

  const totalLessonsCompleted = completedLessonIds.length;
  const totalCertificates = certificates.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Profile Header Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Enrolled Cybersecurity Scholar
            </div>
            <h1 className="text-2xl font-extrabold text-slate-100">{userName}</h1>
            <p className="text-xs text-slate-400 font-mono">{userEmail} · Target: SOC Analyst & Penetration Tester</p>
          </div>
        </div>

        {/* Academic Stats Strip */}
        <div className="grid grid-cols-3 gap-4 text-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8">
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase">Enrolled</div>
            <div className="text-xl font-bold text-slate-200 tabular-nums">{enrolledCourses.length}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase">Completed</div>
            <div className="text-xl font-bold text-cyan-400 tabular-nums">{totalLessonsCompleted}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase">Certificates</div>
            <div className="text-xl font-bold text-emerald-400 tabular-nums">{totalCertificates}</div>
          </div>
        </div>
      </div>

      {/* Recommended Next Lesson Callout */}
      {recommended && (
        <div className="p-5 bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-cyan-950/20">
          <div className="space-y-1">
            <div className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Next Pedagogical Milestone:
            </div>
            <h3 className="font-bold text-slate-100 text-sm">{recommended.lessonTitle}</h3>
            <div className="text-xs text-slate-400">Course: {recommended.courseTitle}</div>
          </div>

          <button
            onClick={() => {
              const targetCourse = courses.find(c => c.id === recommended.courseId);
              if (targetCourse) {
                const targetLesson = targetCourse.modules
                  .flatMap(m => m.lessons)
                  .find(l => l.id === recommended.lessonId);
                if (targetLesson) onSelectLesson(targetCourse, targetLesson);
              }
            }}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0 shadow"
          >
            <Play className="w-4 h-4 fill-current" /> Continue Learning
          </button>
        </div>
      )}

      {/* Enrolled Courses Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" /> Active Enrolled Courses ({enrolledCourses.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map(course => {
            const progress = getCourseProgress(course.id);
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

            return (
              <div
                key={course.id}
                className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>Course {course.number}</span>
                    <span className="text-cyan-400 font-bold">{course.level}</span>
                  </div>
                  <h3
                    onClick={() => onSelectCourse(course)}
                    className="font-bold text-slate-100 text-sm hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {course.title}
                  </h3>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Progress</span>
                    <span className="text-cyan-300 font-bold tabular-nums">{progress}%</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCourse(course)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  Enter Course Workspace <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Earned Credentials Vault */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" /> Verified Credentials Vault ({certificates.length})
        </h2>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="p-5 bg-slate-900 border border-emerald-900/40 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold">{cert.credentialId}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {cert.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm">{cert.courseOrPathTitle}</h3>
                  <div className="text-xs text-slate-400">
                    Issued: <strong className="text-slate-300">{cert.issuedDate}</strong> · Grade:{' '}
                    <strong className="text-emerald-400">{cert.grade}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => onViewCertificate(cert.id)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                  >
                    View & Print Certificate
                  </button>
                  <button
                    onClick={() => onOpenVerification(cert.credentialId)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
                    title="Public Verification Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center text-xs text-slate-400">
            No certificates earned yet. Complete required courses and pass the final examination with $\ge 70\%$ to
            unlock your credentials.
          </div>
        )}
      </div>

      {/* Bookmarked Lessons Strip */}
      {bookmarkedLessonIds.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" /> Bookmarked Lessons & References ({bookmarkedLessonIds.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {bookmarkedLessonIds.map(lesId => {
              const matchedLesson = courses
                .flatMap(c => c.modules.flatMap(m => m.lessons))
                .find(l => l.id === lesId);
              if (!matchedLesson) return null;
              const parentCourse = courses.find(c => c.id === matchedLesson.courseId);

              return (
                <div
                  key={lesId}
                  onClick={() => {
                    if (parentCourse) onSelectLesson(parentCourse, matchedLesson);
                  }}
                  className="p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-200">{matchedLesson.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{parentCourse?.title}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset Progress Helper */}
      <div className="pt-8 border-t border-slate-900 flex justify-end">
        <button
          onClick={resetProgress}
          className="text-xs text-slate-500 hover:text-slate-400 flex items-center gap-1.5 transition-colors font-mono"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Local Learning Progress
        </button>
      </div>
    </div>
  );
};
