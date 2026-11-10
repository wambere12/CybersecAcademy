import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  FileText,
  Copy,
  Check,
  Play,
  Download,
  Terminal,
  Activity,
  KeyRound,
  Globe,
  Key,
  Mail,
  HelpCircle,
  Sparkles,
  Edit3
} from 'lucide-react';
import { Lesson, Course } from '../../types/cybersecurity';
import { useCurriculum } from '../../context/CurriculumContext';
import { SecurityDiagram } from '../diagrams/SecurityDiagram';
import { LessonDiscussion } from '../discussion/LessonDiscussion';
import { LabType } from '../labs/LabModal';
import { downloadTextAsPdf } from '../../utils/pdfGenerator';

interface Props {
  course: Course;
  lesson: Lesson;
  onBackToCourse: () => void;
  onSelectLesson: (lessonId: string) => void;
  onLaunchLab: (labType: LabType) => void;
}

export const LessonViewer: React.FC<Props> = ({
  course,
  lesson,
  onBackToCourse,
  onSelectLesson,
  onLaunchLab
}) => {
  const {
    completedLessonIds,
    toggleLessonCompletion,
    bookmarkedLessonIds,
    toggleBookmark,
    lessonNotes,
    saveLessonNote
  } = useCurriculum();

  const isCompleted = completedLessonIds.includes(lesson.id);
  const isBookmarked = bookmarkedLessonIds.includes(lesson.id);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [noteText, setNoteText] = useState(lessonNotes[lesson.id] || '');
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  // Knowledge check state
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [checkSubmitted, setCheckSubmitted] = useState(false);

  // Determine prev and next lessons in course
  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSaveNote = () => {
    saveLessonNote(lesson.id, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleKnowledgeCheckOption = (optIdx: number) => {
    if (checkSubmitted) return;
    if (lesson.knowledgeCheck?.type === 'multi') {
      setSelectedAnswers(prev =>
        prev.includes(optIdx) ? prev.filter(i => i !== optIdx) : [...prev, optIdx]
      );
    } else {
      setSelectedAnswers([optIdx]);
    }
  };

  const handleDownloadLessonPdf = () => {
    const lessonBody = `${lesson.summary}\n\n1. LESSON OVERVIEW & LEARNING OBJECTIVES:\n${lesson.content}\n\n2. HANDS-ON PRACTICAL LAB EXERCISE:\n${lesson.practicalExercise || 'Review interactive terminal sandboxes in the course platform.'}\n\n3. STUDENT STUDY NOTES:\n${noteText || 'No student notes recorded for this lesson.'}`;

    downloadTextAsPdf(`Course ${course.number}: ${lesson.title}`, lessonBody, {
      subtitle: `${course.title} • Module Lesson ${lesson.number}`,
      filename: `Lesson-${course.number}-${lesson.number}-${lesson.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <button
          onClick={onBackToCourse}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors font-mono cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {course.title} Syllabus
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Download Lesson Text as PDF */}
          <button
            onClick={handleDownloadLessonPdf}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            title="Download lesson text as PDF document"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(lesson.id)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-950/60 border-amber-700 text-amber-300'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
            }`}
            title="Bookmark this lesson"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Complete Lesson Button */}
          <button
            onClick={() => toggleLessonCompletion(lesson.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>

      {/* Lesson Title & Metadata */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
          Course {course.number} · Lesson {lesson.number} · {lesson.durationMinutes} min read
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed font-sans">{lesson.summary}</p>
      </div>

      {/* Interactive Video Lecture Simulation Box */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden space-y-3">
        <div className="aspect-video w-full bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
          {!isVideoPlaying ? (
            <div className="text-center space-y-3 p-6 z-10">
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center mx-auto transition-transform group-hover:scale-105 shadow-xl shadow-cyan-500/20"
              >
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </button>
              <div className="space-y-0.5">
                <div className="font-bold text-slate-100 text-sm">
                  Lecture: {lesson.title} (Curriculum Audio/Video Masterclass)
                </div>
                <div className="text-xs text-slate-500 font-mono">1080p HD · Closed Captions · Interactive Slides</div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full p-6 flex flex-col justify-between bg-slate-950 text-slate-300">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-cyan-400 font-bold">Now Playing: Video Lecture Demonstration</span>
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                >
                  Close Player
                </button>
              </div>
              <div className="text-center font-mono text-xs text-slate-400 py-8">
                [Audio Streaming Simulated: Senior Security Instructor explaining {lesson.title}]
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-1/3 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Educational Theory Content */}
      <div className="prose prose-invert max-w-none space-y-4 text-slate-300 font-sans text-sm leading-relaxed">
        {lesson.content.split('\n\n').map((paragraph, pIdx) => (
          <p key={pIdx} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Interactive Diagrams (if applicable) */}
      {lesson.diagramType && <SecurityDiagram type={lesson.diagramType} />}

      {/* Real-World Breach Scenario Case Study */}
      {lesson.realWorldExample && (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Real-World Cyber Incident Breakdown & Case Study
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
            {lesson.realWorldExample}
          </p>
        </div>
      )}

      {/* Command & Code Snippets with Copy */}
      {lesson.codeSnippets && lesson.codeSnippets.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-200 font-mono">
            CLI Commands & Technical Implementation Examples:
          </h3>
          {lesson.codeSnippets.map((snippet, sIdx) => (
            <div key={sIdx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
                <span>{snippet.description || `${snippet.language} snippet`}</span>
                <button
                  onClick={() => copyCode(snippet.code, sIdx)}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  {copiedIndex === sIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedIndex === sIdx ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="p-4 text-cyan-300 overflow-x-auto leading-relaxed">{snippet.code}</pre>
              {snippet.output && (
                <div className="border-t border-slate-900 bg-slate-950/80 p-3 text-slate-400 text-[11px]">
                  <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Standard Console Output:</div>
                  <pre className="text-slate-300 whitespace-pre-wrap">{snippet.output}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Practical Hands-on Exercise Card with 1-Click Lab Launcher */}
      {lesson.practicalExercise && (
        <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/40 rounded-2xl space-y-4 shadow-xl shadow-cyan-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                Practical Technical Lab Simulation
              </div>
              <h3 className="text-base font-bold text-slate-100">{lesson.practicalExercise.title}</h3>
            </div>

            {lesson.practicalExercise.labType && (
              <button
                onClick={() => onLaunchLab(lesson.practicalExercise!.labType!)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0 shadow-lg"
              >
                <Terminal className="w-4 h-4" /> Launch Interactive Lab
              </button>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            <strong>Objective:</strong> {lesson.practicalExercise.objective}
          </p>

          <div className="space-y-1.5 pt-1">
            <div className="text-xs font-semibold text-slate-200">Step-by-Step Instructions:</div>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-400 font-sans pl-1">
              {lesson.practicalExercise.instructions.map((inst, iIdx) => (
                <li key={iIdx}>{inst}</li>
              ))}
            </ol>
          </div>

          {lesson.practicalExercise.verificationHint && (
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono">
              <span className="text-cyan-400 font-bold">Verification Hint:</span>{' '}
              {lesson.practicalExercise.verificationHint}
            </div>
          )}
        </div>
      )}

      {/* Interactive Knowledge Check Card */}
      {lesson.knowledgeCheck && (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> Quick Knowledge Check
          </div>

          <h4 className="text-sm font-semibold text-slate-100 font-sans">
            {lesson.knowledgeCheck.question}
          </h4>

          {/* Options */}
          <div className="space-y-2">
            {lesson.knowledgeCheck.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers.includes(oIdx);
              const isCorrect = lesson.knowledgeCheck!.correctAnswers.includes(oIdx);

              let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-950';
              if (checkSubmitted) {
                if (isCorrect) borderClass = 'border-emerald-600 bg-emerald-950/40 text-emerald-200';
                else if (isSelected) borderClass = 'border-rose-600 bg-rose-950/40 text-rose-200';
              } else if (isSelected) {
                borderClass = 'border-cyan-500 bg-cyan-950/40 text-cyan-200 font-semibold';
              }

              return (
                <div
                  key={oIdx}
                  onClick={() => handleKnowledgeCheckOption(oIdx)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-3 ${borderClass}`}
                >
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] shrink-0 font-mono">
                    {isSelected ? '✓' : String.fromCharCode(65 + oIdx)}
                  </div>
                  <span className="font-sans">{opt}</span>
                </div>
              );
            })}
          </div>

          {!checkSubmitted ? (
            <button
              onClick={() => {
                if (selectedAnswers.length > 0) setCheckSubmitted(true);
              }}
              disabled={selectedAnswers.length === 0}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              Verify Answer
            </button>
          ) : (
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Explanation & Rationale:
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">{lesson.knowledgeCheck.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Personal Notes Editor */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" /> Personal Notes & Annotations
          </span>
          <button
            onClick={() => setShowNoteEditor(prev => !prev)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            {showNoteEditor ? 'Minimize' : 'Edit Note'}
          </button>
        </div>

        {showNoteEditor ? (
          <div className="space-y-2">
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Write private notes, command reminders, or personal insights here..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Auto-saved to local browser storage.</span>
              <button
                onClick={handleSaveNote}
                className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-xs transition-colors"
              >
                {noteSaved ? 'Saved!' : 'Save Note'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic font-sans">
            {noteText || 'No personal notes recorded yet for this lesson. Click "Edit Note" to add thoughts.'}
          </div>
        )}
      </div>

      {/* Lesson Navigation Bottom Strip (Previous / Next) */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        {prevLesson ? (
          <button
            onClick={() => onSelectLesson(prevLesson.id)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-mono">PREVIOUS LESSON</div>
              <div className="font-bold truncate max-w-xs">{prevLesson.title}</div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <div className="text-right">
              <div className="text-[10px] text-slate-500 font-mono">NEXT LESSON</div>
              <div className="font-bold truncate max-w-xs">{nextLesson.title}</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToCourse}
            className="px-4 py-2 bg-cyan-600 text-slate-950 font-bold rounded-xl text-xs transition-colors"
          >
            Course Completed · View Examination
          </button>
        )}
      </div>

      {/* Community Q&A / Discussion Forum */}
      <LessonDiscussion lessonId={lesson.id} courseId={course.id} />
    </div>
  );
};
