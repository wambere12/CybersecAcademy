import React, { useState } from 'react';
import {
  Search,
  Filter,
  Shield,
  Cpu,
  Lock,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  LockKeyhole,
  ArrowRight
} from 'lucide-react';
import { Course, Level, LearningPath } from '../../types/cybersecurity';
import { useCurriculum } from '../../context/CurriculumContext';

interface Props {
  onSelectCourse: (course: Course) => void;
  onSelectPath?: (pathId: string) => void;
}

export const CourseCatalog: React.FC<Props> = ({ onSelectCourse, onSelectPath }) => {
  const { courses, paths, enrolledCourseIds, enrollCourse, getCourseProgress, isCourseUnlocked } = useCurriculum();

  const [activePathFilter, setActivePathFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredCourses = courses.filter(course => {
    // Path filter
    if (activePathFilter !== 'all' && course.pathId !== activePathFilter) return false;

    // Level filter
    if (levelFilter !== 'all' && course.level !== levelFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchDesc = course.description.toLowerCase().includes(q);
      const matchObj = course.learningObjectives.some(o => o.toLowerCase().includes(q));
      const matchNumber = course.number.toString().includes(q);
      if (!matchTitle && !matchDesc && !matchObj && !matchNumber) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3 py-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full">
          <Shield className="w-3.5 h-3.5" /> 21 Complete Courses · 3 Mastery Levels · 6 Specialized Tracks
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Comprehensive Cybersecurity Curriculum
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
          Step-by-step technical training from foundational computing and network principles to enterprise red teaming,
          threat intelligence, digital forensics, and cloud architecture.
        </p>
      </div>

      {/* Learning Path Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paths.map(path => {
          let icon = <Shield className="w-5 h-5 text-cyan-400" />;
          if (path.level === 'Intermediate') icon = <Cpu className="w-5 h-5 text-blue-400" />;
          if (path.level === 'Advanced') icon = <Lock className="w-5 h-5 text-emerald-400" />;
          if (path.level === 'Specialized') icon = <Award className="w-5 h-5 text-amber-400" />;

          const isSelected = activePathFilter === path.id;

          return (
            <div
              key={path.id}
              onClick={() => setActivePathFilter(isSelected ? 'all' : path.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">{icon}</div>
                  <span className="text-[11px] font-mono text-slate-500">{path.estimatedWeeks} Weeks</span>
                </div>
                <h3 className="font-bold text-slate-100 text-sm">{path.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 font-sans">{path.description}</p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold border-t border-slate-800/80 mt-4">
                <span>{path.courseIds.length} Courses</span>
                <span>{isSelected ? 'Viewing Path' : 'Filter by Path →'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search Bar Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search across lessons, CVEs, Wireshark, SQLi, Linux, Cryptography..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Level Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs shrink-0 w-full sm:w-auto overflow-x-auto">
          {['all', 'Beginner', 'Intermediate', 'Advanced', 'Specialized'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors capitalize ${
                levelFilter === lvl
                  ? 'bg-cyan-600 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map(course => {
          const isEnrolled = enrolledCourseIds.includes(course.id);
          const isUnlocked = isCourseUnlocked(course.id);
          const progress = getCourseProgress(course.id);
          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

          let levelBadgeColor = 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50';
          if (course.level === 'Intermediate') levelBadgeColor = 'text-blue-400 bg-blue-950/40 border-blue-800/50';
          if (course.level === 'Advanced') levelBadgeColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50';
          if (course.level === 'Specialized') levelBadgeColor = 'text-amber-400 bg-amber-950/40 border-amber-800/50';

          return (
            <div
              key={course.id}
              className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl group ${
                isUnlocked
                  ? 'border-slate-800 hover:border-slate-700'
                  : 'border-slate-800/60 opacity-80'
              }`}
            >
              <div className="space-y-3">
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${levelBadgeColor}`}>
                    {course.level.toUpperCase()}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.estimatedHours} hrs
                  </span>
                </div>

                {/* Course Number & Title */}
                <div>
                  <div className="text-[11px] font-mono text-slate-500">
                    {course.trackCode ? course.trackCode : `Course ${course.number}`}
                  </div>
                  <h3
                    onClick={() => onSelectCourse(course)}
                    className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors cursor-pointer mt-0.5 leading-snug"
                  >
                    {course.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                  {course.description}
                </p>

                {/* Prerequisites check */}
                {!isUnlocked && (
                  <div className="text-[10px] text-amber-400 font-mono flex items-center gap-1 bg-amber-950/30 p-1.5 rounded border border-amber-900/40">
                    <LockKeyhole className="w-3 h-3 shrink-0" /> Prerequisite courses required
                  </div>
                )}
              </div>

              {/* Bottom Actions & Progress */}
              <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-3">
                {/* Progress bar if enrolled */}
                {isEnrolled && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Progress</span>
                      <span className="text-cyan-400 font-bold tabular-nums">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {totalLessons > 0 ? `${totalLessons} lessons` : 'Exam Track'}
                  </span>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 group-hover:bg-cyan-600 group-hover:text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>{isEnrolled ? 'Continue Study' : 'Explore Syllabus'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
