import React from 'react';
import {
  Shield,
  ShieldAlert,
  BookOpen,
  LayoutDashboard,
  Terminal,
  Award,
  ShoppingBag,
  GraduationCap,
  ShieldCheck,
  Settings,
  Users,
  User,
  Check,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useCurriculum } from '../../context/CurriculumContext';
import { UserRole } from '../../types/cybersecurity';

export type NavTab = 'catalog' | 'dashboard' | 'labs' | 'store' | 'scholarships' | 'verify' | 'settings' | 'instructor' | 'system-control';

interface Props {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) => {
  const { userRole, setUserRole, userName, userEmail, certificates, enrolledCourseIds } = useCurriculum();
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);

  const navItems = [
    {
      id: 'catalog' as NavTab,
      label: 'Curriculum & Courses',
      icon: BookOpen,
      count: 21,
      tag: 'All Levels'
    },
    {
      id: 'dashboard' as NavTab,
      label: 'Student Dashboard',
      icon: LayoutDashboard,
      count: enrolledCourseIds.length,
      tag: 'Progress'
    },
    {
      id: 'labs' as NavTab,
      label: 'Hands-on Sandboxes',
      icon: Terminal,
      count: 7,
      tag: 'Live Labs'
    },
    {
      id: 'store' as NavTab,
      label: 'Certificate Marketplace',
      icon: ShoppingBag,
      tag: 'Official Sales'
    },
    {
      id: 'scholarships' as NavTab,
      label: 'Cyber & IoT Scholarships',
      icon: GraduationCap,
      tag: 'Age Grants'
    },
    {
      id: 'system-control' as NavTab,
      label: 'System & Student Control',
      icon: ShieldAlert,
      tag: 'Root CRUD'
    },
    {
      id: 'verify' as NavTab,
      label: 'Verify Credential',
      icon: ShieldCheck,
      tag: 'Public Registry'
    },
    {
      id: 'settings' as NavTab,
      label: 'Settings & Controls',
      icon: Settings,
      tag: 'Platform'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in"
        />
      )}

      {/* Main Left-Side Navigation Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveTab('catalog');
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-100 tracking-tight leading-tight">
                CyberSec Academy
              </div>
              <div className="text-[11px] font-mono text-cyan-400 font-semibold">
                Education & Credential OS
              </div>
            </div>
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-200 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links Scrollable List */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1 text-xs">
          <div className="px-3 pb-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            Academic Operations
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-600 text-slate-950 font-bold shadow-md shadow-cyan-950'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>

                {item.tag && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-900 font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}

          {/* Instructor & Admin Portal Link */}
          {(userRole === 'instructor' || userRole === 'admin') && (
            <div className="pt-3">
              <div className="px-3 pb-2 text-[10px] font-mono text-amber-500 uppercase tracking-wider font-semibold">
                Governance Console
              </div>
              <button
                onClick={() => {
                  setActiveTab('instructor');
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'instructor'
                    ? 'bg-amber-600 text-slate-950 font-bold shadow'
                    : 'text-amber-400 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className={`w-4 h-4 shrink-0 ${activeTab === 'instructor' ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span className="whitespace-nowrap">Instructor Portal</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-amber-950/80 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">
                  {userRole}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Profile and Role Switcher Card */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 relative">
          <div
            onClick={() => setShowRoleMenu(prev => !prev)}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-xs font-bold">
                {userName.charAt(0)}
              </div>
              <div className="text-left truncate max-w-[140px]">
                <div className="text-xs font-bold text-slate-100 truncate">{userName}</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">{userRole} view</div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${showRoleMenu ? 'rotate-90' : ''}`} />
          </div>

          {/* Quick role toggle popup */}
          {showRoleMenu && (
            <div className="absolute bottom-16 left-3 right-3 bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl space-y-1 text-xs z-50">
              <div className="text-[10px] text-slate-500 font-mono px-2 py-1 uppercase">Switch Perspective:</div>
              {(['student', 'instructor', 'admin'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setUserRole(role);
                    setShowRoleMenu(false);
                    if (role === 'instructor' || role === 'admin') setActiveTab('instructor');
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between capitalize transition-colors ${
                    userRole === role ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{role} Perspective</span>
                  {userRole === role && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
