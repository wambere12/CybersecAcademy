import React from 'react';
import { Shield, BookOpen, LayoutDashboard, Terminal, Award, User, Settings, Check } from 'lucide-react';
import { useCurriculum } from '../../context/CurriculumContext';
import { UserRole } from '../../types/cybersecurity';

interface Props {
  activeTab: 'catalog' | 'dashboard' | 'labs' | 'instructor' | 'verify';
  setActiveTab: (tab: 'catalog' | 'dashboard' | 'labs' | 'instructor' | 'verify') => void;
  onOpenLab?: () => void;
}

export const Header: React.FC<Props> = ({ activeTab, setActiveTab, onOpenLab }) => {
  const { userRole, setUserRole, userName, enrolledCourseIds, certificates } = useCurriculum();
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('catalog')}
          className="flex items-center gap-2.5 text-left shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-100 whitespace-nowrap block">
              CyberSec Academy
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`whitespace-nowrap transition-colors hover:text-slate-100 ${
              activeTab === 'catalog' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Curriculum & Courses
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap transition-colors hover:text-slate-100 ${
              activeTab === 'dashboard' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Student Dashboard
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`whitespace-nowrap transition-colors hover:text-slate-100 ${
              activeTab === 'labs' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Hands-on Labs
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`whitespace-nowrap transition-colors hover:text-slate-100 ${
              activeTab === 'verify' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Verify Credential
          </button>
          {(userRole === 'instructor' || userRole === 'admin') && (
            <button
              onClick={() => setActiveTab('instructor')}
              className={`whitespace-nowrap transition-colors hover:text-slate-100 ${
                activeTab === 'instructor' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Instructor Portal
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Role Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Sandbox Lab Launcher */}
          {onOpenLab && (
            <button
              onClick={onOpenLab}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono font-medium transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Terminal Sandbox
            </button>
          )}

          {/* User Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(prev => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-medium">{userName.split(' ')[0]}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                {userRole}
              </span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 text-xs text-slate-300 font-sans">
                <div className="px-3 py-2 border-b border-slate-800 text-[11px] text-slate-500">
                  Switch Active Role (Demo Mode):
                </div>
                {(['student', 'instructor', 'admin'] as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      setShowRoleMenu(false);
                      if (role === 'instructor' || role === 'admin') {
                        setActiveTab('instructor');
                      } else {
                        setActiveTab('dashboard');
                      }
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      userRole === role ? 'text-cyan-400 font-bold bg-slate-800/50' : 'text-slate-300'
                    }`}
                  >
                    <span className="capitalize">{role} View</span>
                    {userRole === role && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
