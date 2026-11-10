import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, ShieldCheck } from 'lucide-react';
import { useCurriculum } from '../../context/CurriculumContext';

interface Props {
  lessonId: string;
  courseId: string;
}

export const LessonDiscussion: React.FC<Props> = ({ lessonId, courseId }) => {
  const { discussions, addDiscussionThread, addDiscussionReply, voteDiscussion, userRole, userName } = useCurriculum();
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});
  const [activeReplyThreadId, setActiveReplyThreadId] = useState<string | null>(null);

  // Filter threads for this lesson or course
  const threads = discussions.filter(d => d.lessonId === lessonId || d.courseId === courseId);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMessage.trim()) return;
    addDiscussionThread(lessonId, courseId, newTitle, newMessage);
    setNewTitle('');
    setNewMessage('');
  };

  const handlePostReply = (threadId: string) => {
    const text = replyInput[threadId];
    if (!text || !text.trim()) return;
    addDiscussionReply(threadId, text);
    setReplyInput(prev => ({ ...prev, [threadId]: '' }));
    setActiveReplyThreadId(null);
  };

  return (
    <div className="space-y-6 pt-6 border-t border-slate-800 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          Lesson Q&A & Community Discussion ({threads.length})
        </h3>
        <span className="text-slate-500 text-[11px]">
          Posting as: <strong className="text-slate-300">{userName}</strong> ({userRole})
        </span>
      </div>

      {/* New Question Form */}
      <form onSubmit={handleCreateThread} className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
        <div className="text-xs font-semibold text-slate-300">Ask a Question or Share a Technical Insight:</div>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Brief question summary (e.g. How does ARP spoofing bypass switch CAM tables?)..."
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
        />
        <textarea
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Elaborate on your question, lab hurdle, or command output..."
          rows={3}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" /> Post Question
          </button>
        </div>
      </form>

      {/* Discussion Threads List */}
      <div className="space-y-4">
        {threads.map(thread => (
          <div key={thread.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-slate-100">{thread.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-400">{thread.userName}</span>
                  <span>·</span>
                  <span>{thread.timestamp}</span>
                </div>
              </div>

              {/* Upvote button */}
              <button
                onClick={() => voteDiscussion(thread.id)}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-mono transition-colors"
              >
                <ThumbsUp className="w-3 h-3 text-cyan-400" />
                <span className="tabular-nums">{thread.votes}</span>
              </button>
            </div>

            <p className="text-slate-300 font-sans leading-relaxed text-xs">{thread.message}</p>

            {/* Replies Stream */}
            {thread.replies.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800/80 pl-3">
                {thread.replies.map(rep => (
                  <div key={rep.id} className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-bold text-slate-200">{rep.userName}</span>
                      {rep.userRole === 'instructor' && (
                        <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-800/60 font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Instructor
                        </span>
                      )}
                      <span className="text-slate-500">· {rep.timestamp}</span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs">{rep.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            {activeReplyThreadId === thread.id ? (
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={replyInput[thread.id] || ''}
                  onChange={e => setReplyInput(prev => ({ ...prev, [thread.id]: e.target.value }))}
                  placeholder="Write a constructive reply..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  autoFocus
                />
                <button
                  onClick={() => handlePostReply(thread.id)}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Reply
                </button>
                <button
                  onClick={() => setActiveReplyThreadId(null)}
                  className="px-2 py-1.5 text-slate-400 hover:text-slate-200 text-xs"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveReplyThreadId(thread.id)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                + Add Reply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
