import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Assessment, QuizQuestion } from '../../types/cybersecurity';
import { useCurriculum } from '../../context/CurriculumContext';

interface Props {
  assessment: Assessment;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AssessmentModal: React.FC<Props> = ({ assessment, isOpen, onClose, onSuccess }) => {
  const { recordQuizAttempt } = useCurriculum();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [matchingSelections, setMatchingSelections] = useState<Record<string, Record<string, string>>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    maxScore: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isSubmitted]);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = assessment.questions[currentIndex];
  const totalQuestions = assessment.questions.length;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (qId: string, optIndex: number, isMulti: boolean) => {
    if (isSubmitted) return;
    if (isMulti) {
      const current = (userAnswers[qId] as number[]) || [];
      const updated = current.includes(optIndex)
        ? current.filter(i => i !== optIndex)
        : [...current, optIndex];
      setUserAnswers(prev => ({ ...prev, [qId]: updated }));
    } else {
      setUserAnswers(prev => ({ ...prev, [qId]: optIndex }));
    }
  };

  const handleShortAnswer = (qId: string, val: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleMatchingSelect = (qId: string, leftItem: string, rightItem: string) => {
    if (isSubmitted) return;
    setMatchingSelections(prev => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || {}),
        [leftItem]: rightItem
      }
    }));
  };

  const handleSubmit = () => {
    let earnedPoints = 0;
    let totalPoints = 0;

    assessment.questions.forEach(q => {
      totalPoints += q.points;
      const ans = userAnswers[q.id];

      if (q.type === 'single' || q.type === 'scenario') {
        if (ans === q.correctAnswer) earnedPoints += q.points;
      } else if (q.type === 'true-false') {
        if (ans === q.correctAnswer) earnedPoints += q.points;
      } else if (q.type === 'multiple') {
        const correct = (q.correctAnswer as number[]).sort();
        const user = ((ans as number[]) || []).sort();
        if (JSON.stringify(correct) === JSON.stringify(user)) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'short-answer') {
        if (
          typeof ans === 'string' &&
          ans.trim().toLowerCase() === (q.correctAnswer as string).trim().toLowerCase()
        ) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'matching') {
        const userMap = matchingSelections[q.id] || {};
        const correctMap = q.correctAnswer as Record<string, string>;
        let allMatch = true;
        for (const [k, v] of Object.entries(correctMap)) {
          if (userMap[k] !== v) allMatch = false;
        }
        if (allMatch && Object.keys(userMap).length === Object.keys(correctMap).length) {
          earnedPoints += q.points;
        }
      }
    });

    const percentage = Math.round((earnedPoints / (totalPoints || 1)) * 100);
    const passed = percentage >= assessment.passPercentage;

    const result = {
      score: earnedPoints,
      maxScore: totalPoints,
      percentage,
      passed
    };

    setScoreResult(result);
    setIsSubmitted(true);

    recordQuizAttempt({
      attemptId: `att-${Date.now()}`,
      assessmentId: assessment.id,
      courseId: assessment.courseId,
      score: earnedPoints,
      maxScore: totalPoints,
      percentage,
      passed,
      timestamp: new Date().toISOString(),
      userAnswers
    });

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (onSuccess) onSuccess();
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setMatchingSelections({});
    setIsSubmitted(false);
    setScoreResult(null);
    setCurrentIndex(0);
    setTimeLeft(assessment.timeLimitMinutes * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <div>
            <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">
              {assessment.type === 'final-exam' ? 'Official Course Examination' : 'Module Assessment Check'}
            </div>
            <h2 className="text-base font-bold text-slate-100">{assessment.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            {!isSubmitted && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tabular-nums border ${
                  timeLeft < 300
                    ? 'bg-rose-950/80 border-rose-700 text-rose-300 animate-pulse'
                    : 'bg-slate-950 border-slate-700 text-cyan-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {formatTime(timeLeft)}
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        {!isSubmitted ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Question Progress Tracker Bar */}
            <div className="px-6 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                Question <span className="text-cyan-400 tabular-nums">{currentIndex + 1}</span> of{' '}
                <span className="tabular-nums">{totalQuestions}</span>
              </span>
              <span className="tabular-nums">Pass Mark: {assessment.passPercentage}%</span>
            </div>

            {/* Question Navigation Drawer Pills */}
            <div className="px-6 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto">
              {assessment.questions.map((q, idx) => {
                const isAnswered =
                  userAnswers[q.id] !== undefined ||
                  (matchingSelections[q.id] && Object.keys(matchingSelections[q.id]).length > 0);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 rounded text-xs font-mono font-semibold transition-colors shrink-0 ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950'
                        : isAnswered
                        ? 'bg-slate-800 text-cyan-300 border border-cyan-800/60'
                        : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Active Question Canvas */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 text-slate-200">
              {/* Scenario Context Box (if applicable) */}
              {currentQ.scenarioContext && (
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Operational Security Scenario Context:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentQ.scenarioContext}</p>
                </div>
              )}

              {/* Question Text */}
              <div className="space-y-1">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold font-mono">
                  {currentQ.type.toUpperCase().replace('-', ' ')} QUESTION · {currentQ.points} POINTS
                </div>
                <h3 className="text-base font-semibold text-slate-100 leading-relaxed font-sans">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options Rendering Based on Question Type */}
              <div className="space-y-2.5 pt-2">
                {/* Single Choice / Multiple Choice / True-False / Scenario */}
                {currentQ.options && (
                  <div className="space-y-2">
                    {currentQ.options.map((opt, optIdx) => {
                      const isMulti = currentQ.type === 'multiple';
                      const selected = isMulti
                        ? ((userAnswers[currentQ.id] as number[]) || []).includes(optIdx)
                        : userAnswers[currentQ.id] === optIdx;

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQ.id, optIdx, isMulti)}
                          className={`p-3.5 rounded-xl border text-sm cursor-pointer transition-all flex items-center gap-3 ${
                            selected
                              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-100 font-medium'
                              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center text-xs font-mono shrink-0 transition-colors ${
                              isMulti ? 'rounded' : 'rounded-full'
                            } ${selected ? 'bg-cyan-500 text-slate-950 font-bold' : 'border border-slate-700 text-slate-400'}`}
                          >
                            {selected ? '✓' : String.fromCharCode(65 + optIdx)}
                          </div>
                          <span className="flex-1 font-sans">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Short Answer */}
                {currentQ.type === 'short-answer' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userAnswers[currentQ.id] || ''}
                      onChange={e => handleShortAnswer(currentQ.id, e.target.value)}
                      placeholder="Type your exact short answer (e.g. CVE)..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <div className="text-[11px] text-slate-500">
                      Standard industry acronyms or exact technical terms are accepted.
                    </div>
                  </div>
                )}

                {/* Matching Pairs */}
                {currentQ.type === 'matching' && currentQ.matchingPairs && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">Match each left concept with its corresponding definition:</p>
                    <div className="space-y-2">
                      {currentQ.matchingPairs.map((pair, idx) => {
                        const currentMatch = matchingSelections[currentQ.id]?.[pair.left] || '';
                        return (
                          <div
                            key={idx}
                            className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                          >
                            <span className="font-bold text-slate-200 sm:w-1/3">{pair.left}</span>
                            <div className="flex-1">
                              <select
                                value={currentMatch}
                                onChange={e => handleMatchingSelect(currentQ.id, pair.left, e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-sans"
                              >
                                <option value="">-- Select Matching Definition --</option>
                                {currentQ.matchingPairs?.map((p, pIdx) => (
                                  <option key={pIdx} value={p.right}>
                                    {p.right}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Step Actions */}
            <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between shrink-0">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex items-center gap-3">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                    className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-950"
                  >
                    Submit Assessment <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Assessment Results Screen */
          <div className="flex-1 p-8 overflow-y-auto space-y-6">
            <div className="text-center space-y-3 max-w-md mx-auto">
              <div
                className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
                  scoreResult?.passed ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700' : 'bg-rose-950/80 text-rose-400 border border-rose-700'
                }`}
              >
                {scoreResult?.passed ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-100">
                  {scoreResult?.passed ? 'Examination Passed!' : 'Assessment Not Passed'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {scoreResult?.passed
                    ? 'Congratulations! You met the passing requirements for this course assessment.'
                    : `You scored below the required ${assessment.passPercentage}% pass mark. Review the explanations below and retake when ready.`}
                </p>
              </div>

              {/* Score Badges */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-center">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Your Score</div>
                  <div className="text-sm font-bold text-slate-200 tabular-nums">
                    {scoreResult?.score} / {scoreResult?.maxScore}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Percentage</div>
                  <div
                    className={`text-sm font-bold tabular-nums ${
                      scoreResult?.passed ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {scoreResult?.percentage}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Required</div>
                  <div className="text-sm font-bold text-slate-400 tabular-nums">{assessment.passPercentage}%</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRetake}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Examination
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                >
                  Done & Return to Curriculum
                </button>
              </div>
            </div>

            {/* Comprehensive Answer Review with Explanations */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Comprehensive Question Explanations
              </h4>

              <div className="space-y-4">
                {assessment.questions.map((q, idx) => {
                  return (
                    <div key={q.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-200">
                          {idx + 1}. {q.question}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0">
                          {q.points} pts
                        </span>
                      </div>

                      {/* Rationales / Explanations */}
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-slate-300 space-y-1">
                        <div className="font-semibold text-cyan-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Technical Rationale:
                        </div>
                        <p className="text-slate-400 leading-relaxed font-sans">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
