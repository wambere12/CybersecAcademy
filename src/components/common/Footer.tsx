import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-500" />
          <span className="font-semibold text-slate-300">CyberSec Academy</span>
          <span>·</span>
          <span>Open Academic Cybersecurity Education Framework</span>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <span>Beginner · Intermediate · Advanced · Professional Tracks</span>
          <span>·</span>
          <span>NIST SP 800-181 NICE Aligned</span>
        </div>

        <div className="text-[11px] text-slate-500">
          &copy; {new Date().getFullYear()} CyberSec Academy. Authorized Educational Curriculum.
        </div>
      </div>
    </footer>
  );
};
