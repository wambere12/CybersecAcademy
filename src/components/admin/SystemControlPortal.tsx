import React, { useState } from 'react';
import { useCurriculum } from '../../context/CurriculumContext';
import { StudentUser, AdminProfile, SystemIntervention } from '../../types/cybersecurity';
import {
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserPlus,
  UserMinus,
  Edit3,
  Trash2,
  KeyRound,
  Lock,
  Search,
  Filter,
  RefreshCw,
  Award,
  Tag,
  CheckCircle2,
  AlertTriangle,
  History,
  Download,
  Sliders,
  User,
  Check,
  Sparkles,
  Zap,
  Activity,
  Layers
} from 'lucide-react';
import { downloadStudentDirectoryPdf, downloadTextAsPdf } from '../../utils/pdfGenerator';

export const SystemControlPortal: React.FC = () => {
  const {
    adminProfile,
    updateAdminProfile,
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    quickInterventionOnStudent,
    interventions,
    clearInterventions,
    logIntervention,
    courses,
    paths
  } = useCurriculum();

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<'students' | 'admin-profile' | 'interventions'>('students');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTrack, setFilterTrack] = useState<string>('all');

  // Student CRUD Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentUser | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<StudentUser | null>(null);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentAge, setNewStudentAge] = useState<number>(24);
  const [newStudentPath, setNewStudentPath] = useState('path-beginner');
  const [newStudentStatus, setNewStudentStatus] = useState<'active' | 'suspended' | 'graduated' | 'probation'>('active');
  const [newStudentScholarship, setNewStudentScholarship] = useState<StudentUser['scholarshipStatus']>('100% Transition Fellowship');
  const [newStudentProgress, setNewStudentProgress] = useState<number>(20);
  const [newStudentNotes, setNewStudentNotes] = useState('');

  // Admin Profile Form State
  const [adminUsername, setAdminUsername] = useState(adminProfile.username);
  const [adminFullName, setAdminFullName] = useState(adminProfile.fullName);
  const [adminEmail, setAdminEmail] = useState(adminProfile.email);
  const [adminRole, setAdminRole] = useState(adminProfile.role);
  const [adminAccessLevel, setAdminAccessLevel] = useState(adminProfile.accessLevel);
  const [admin2FA, setAdmin2FA] = useState(adminProfile.twoFactorEnabled);
  const [adminSaveNotice, setAdminSaveNotice] = useState(false);

  // Handle Save Admin Profile
  const handleSaveAdminProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile({
      username: adminUsername.trim(),
      fullName: adminFullName.trim(),
      email: adminEmail.trim(),
      role: adminRole,
      accessLevel: adminAccessLevel,
      twoFactorEnabled: admin2FA
    });
    setAdminSaveNotice(true);
    setTimeout(() => setAdminSaveNotice(false), 2500);
  };

  // Handle Create Student
  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    addStudent({
      fullName: newStudentName.trim(),
      email: newStudentEmail.trim(),
      age: newStudentAge,
      enrolledPath: newStudentPath,
      status: newStudentStatus,
      progressPercentage: newStudentProgress,
      completedLessonsCount: Math.round(newStudentProgress / 10),
      scholarshipStatus: newStudentScholarship,
      notes: newStudentNotes.trim() || 'Direct administrator enrollment.'
    });

    setIsAddModalOpen(false);
    // Reset form
    setNewStudentName('');
    setNewStudentEmail('');
    setNewStudentAge(24);
    setNewStudentNotes('');
  };

  // Handle Update Student Submit
  const handleUpdateStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    updateStudent(editingStudent.id, {
      fullName: editingStudent.fullName,
      email: editingStudent.email,
      age: editingStudent.age,
      enrolledPath: editingStudent.enrolledPath,
      status: editingStudent.status,
      progressPercentage: editingStudent.progressPercentage,
      scholarshipStatus: editingStudent.scholarshipStatus,
      notes: editingStudent.notes
    });

    setEditingStudent(null);
  };

  // Handle Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingStudent) return;
    deleteStudent(deletingStudent.id);
    setDeletingStudent(null);
  };

  // Trigger simulated incoming user intervention
  const handleSimulateUserIntervention = () => {
    const randomAges = [19, 27, 43, 31, 22];
    const randomAge = randomAges[Math.floor(Math.random() * randomAges.length)];
    const randomNames = ['Liam O’Connor', 'Amina Al-Mansoor', 'Carlos Mendoza', 'Yuki Tanaka', 'Hannah Schmidt'];
    const selectedName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const email = `${selectedName.toLowerCase().replace(/[^a-z]/g, '')}@student-defense.io`;

    const newStu = addStudent({
      fullName: selectedName,
      email,
      age: randomAge,
      enrolledPath: randomAge < 25 ? 'path-beginner' : randomAge > 40 ? 'track-c' : 'track-b',
      status: 'active',
      progressPercentage: 5,
      completedLessonsCount: 1,
      scholarshipStatus: randomAge < 25 ? '100% Youth Grant' : randomAge > 40 ? '100% Transition Fellowship' : '100% Transition Fellowship',
      notes: `Incoming applicant intervention screened via automated scholarship algorithm.`
    });

    logIntervention(
      'CREATE_STUDENT',
      newStu.fullName,
      `Simulated incoming applicant intervention: Granted automatic 100% scholarship voucher based on age ${randomAge}.`
    );
  };

  // Download interventions log text as formatted PDF
  const handleDownloadInterventionsPdf = () => {
    const textLog = interventions
      .map(
        i =>
          `[${i.timestamp}] [${i.actionType}] Target: ${i.targetEntity} (Admin: @${i.adminUsername})\nDetails: ${i.details}\nStatus: ${i.status.toUpperCase()}\n------------------------------------------------------------`
      )
      .join('\n\n');

    downloadTextAsPdf('System Interventions & Administrative Audit Trail', textLog || 'No logged events.', {
      subtitle: `Exported by Root Administrator @${adminProfile.username}`,
      filename: `Audit-Interventions-${new Date().toISOString().split('T')[0]}.pdf`,
      author: adminProfile.fullName
    });
  };

  // Filtered Students
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesTrack = filterTrack === 'all' || student.enrolledPath === filterTrack;

    return matchesSearch && matchesStatus && matchesTrack;
  });

  const activeStudentsCount = students.filter(s => s.status === 'active').length;
  const graduatedStudentsCount = students.filter(s => s.status === 'graduated').length;

  return (
    <div className="space-y-8">
      {/* Top Banner / System Control Root Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 md:p-8 border border-indigo-500/30 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              Administrative Root & System Interventions Hub
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              System Control Console
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Full authority to modify root administrator parameters (username, credentials, role), manage student lifecycles (insert, update, delete), and execute live administrative interventions.
            </p>
          </div>

          {/* Quick Action Simulation Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleSimulateUserIntervention}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              Simulate New User Intervention
            </button>
          </div>
        </div>

        {/* Live System Stat Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Active Admin User</span>
            <span className="font-mono font-bold text-sm text-indigo-300 flex items-center gap-1.5 mt-0.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              @{adminProfile.username}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Active Students</span>
            <span className="font-mono font-bold text-sm text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <UserCheck className="w-3.5 h-3.5" />
              {activeStudentsCount} / {students.length}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Graduated Alumni</span>
            <span className="font-mono font-bold text-sm text-cyan-400 flex items-center gap-1.5 mt-0.5">
              <Award className="w-3.5 h-3.5" />
              {graduatedStudentsCount} Students
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Interventions Logged</span>
            <span className="font-mono font-bold text-sm text-amber-400 flex items-center gap-1.5 mt-0.5">
              <Activity className="w-3.5 h-3.5" />
              {interventions.length} Events
            </span>
          </div>
        </div>
      </div>

      {/* Main Control Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'students'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Student Directory & CRUD ({students.length})
        </button>

        <button
          onClick={() => setActiveTab('admin-profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'admin-profile'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Admin Identity & Credentials
        </button>

        <button
          onClick={() => setActiveTab('interventions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'interventions'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          Interventions & Audit Log ({interventions.length})
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: STUDENT MANAGEMENT (INSERT, UPDATE, DELETE, QUICK INTERVENTIONS)   */}
      {/* ========================================================================= */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Action & Filter Bar */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students by name, email, or student ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="graduated">Graduated</option>
                <option value="probation">Probation</option>
              </select>

              {/* Track Filter */}
              <select
                value={filterTrack}
                onChange={e => setFilterTrack(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">All Paths / Tracks</option>
                <option value="path-beginner">Beginner Learning Path</option>
                <option value="track-a">Track A: Ethical Hacking</option>
                <option value="track-b">Track B: SOC Analyst</option>
                <option value="track-c">Track C: IoT & Cloud</option>
              </select>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => downloadStudentDirectoryPdf(students, adminProfile.username)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-indigo-500" />
                Roster (PDF)
              </button>

              {/* Insert New Student Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Insert New Student
              </button>
            </div>
          </div>

          {/* Student Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Track & Progress</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Scholarship / Voucher</th>
                    <th className="py-3.5 px-4 text-right">Intervention Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        No students match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => (
                      <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{student.fullName}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                              Age {student.age}
                            </span>
                          </div>
                          <div className="text-slate-500 font-mono text-[11px]">{student.email}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">ID: {student.id} • Active: {student.lastActive}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                            {student.enrolledPath.replace('-', ' ')}
                          </div>
                          <div className="flex items-center gap-2 mt-1.5 max-w-[140px]">
                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${student.progressPercentage}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-400">
                              {student.progressPercentage}%
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                              student.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : student.status === 'graduated'
                                ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                                : student.status === 'probation'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-900 dark:text-slate-200 font-medium">
                            {student.scholarshipStatus}
                          </div>
                          {student.awardedVoucher && (
                            <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold select-all">
                              🎟️ {student.awardedVoucher}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {/* Fast Issue Diploma */}
                            <button
                              title="Administrative Diploma Issue"
                              onClick={() => quickInterventionOnStudent(student.id, 'issue_cert')}
                              className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 transition-colors cursor-pointer"
                            >
                              <Award className="w-4 h-4" />
                            </button>

                            {/* Grant 100% Voucher */}
                            <button
                              title="Award Scholarship Voucher"
                              onClick={() => quickInterventionOnStudent(student.id, 'grant_voucher')}
                              className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors cursor-pointer"
                            >
                              <Tag className="w-4 h-4" />
                            </button>

                            {/* Toggle Suspend/Active */}
                            <button
                              title={student.status === 'active' ? 'Suspend Student' : 'Reactivate Student'}
                              onClick={() => quickInterventionOnStudent(student.id, 'toggle_status')}
                              className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors cursor-pointer"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>

                            {/* Edit Student */}
                            <button
                              title="Edit Student Profile"
                              onClick={() => setEditingStudent(student)}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Delete Student */}
                            <button
                              title="Delete Student from System"
                              onClick={() => setDeletingStudent(student)}
                              className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ROOT ADMIN IDENTITY & CREDENTIALS MANAGEMENT                       */}
      {/* ========================================================================= */}
      {activeTab === 'admin-profile' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-6 shadow-sm max-w-3xl">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-500" />
                Root Administrator Credentials & Username
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Modify administrative username, email, full name, privilege levels, and root security authorization.
              </p>
            </div>

            {adminSaveNotice && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-800 dark:text-emerald-300 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-500" />
                Admin Credentials Updated!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveAdminProfile} className="space-y-4 text-xs">
            {/* Username */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-500" />
                Admin Username (System Root Identity)
              </label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={e => setAdminUsername(e.target.value)}
                placeholder="e.g. root_admin or sec_chief"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-indigo-600 dark:text-indigo-400 focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-400">
                This username stamps all audit logs, certificate sign-offs, and administrative interventions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Administrator Full Name
                </label>
                <input
                  type="text"
                  required
                  value={adminFullName}
                  onChange={e => setAdminFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Primary Email */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Primary Root Email Address
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Role */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Administrative Role
                </label>
                <select
                  value={adminRole}
                  onChange={e => setAdminRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="super-admin">Super Admin (Full Platform Control)</option>
                  <option value="academic-director">Academic Director (Curriculum & Grading)</option>
                  <option value="security-officer">Chief Information Security Officer (CISO)</option>
                </select>
              </div>

              {/* Access Level */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  System Access Level
                </label>
                <select
                  value={adminAccessLevel}
                  onChange={e => setAdminAccessLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="full-root">Full Root Authority (Read, Write, Delete, Override)</option>
                  <option value="read-write">Read-Write Operations</option>
                  <option value="audit-only">Audit & Compliance Only</option>
                </select>
              </div>
            </div>

            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Hardware Key & 2FA Enforcement</p>
                  <p className="text-[11px] text-slate-400">Require multi-factor authorization on sensitive deletions and overrides.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={admin2FA}
                onChange={e => setAdmin2FA(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Save Administrator Credentials
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LIVE SYSTEM INTERVENTIONS & USER ACTION AUDIT TRAIL                 */}
      {/* ========================================================================= */}
      {activeTab === 'interventions' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <History className="w-5 h-5 text-amber-500" />
                User Intervention & System Audit Log
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Permanent cryptographic ledger recording every student creation, modification, deletion, and credential grant.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadInterventionsPdf}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-indigo-500" />
                Download Log (PDF)
              </button>
              <button
                onClick={handleSimulateUserIntervention}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Simulate Intervention
              </button>
              <button
                onClick={clearInterventions}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-400 text-xs font-semibold cursor-pointer"
              >
                Clear Log
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {interventions.length === 0 ? (
              <p className="py-6 text-center text-slate-500">No interventions recorded yet.</p>
            ) : (
              interventions.map(log => (
                <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                          log.actionType === 'DELETE_STUDENT'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            : log.actionType === 'CREATE_STUDENT'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : log.actionType === 'GRANT_SCHOLARSHIP'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                            : log.actionType === 'ISSUE_CREDENTIAL'
                            ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                        }`}
                      >
                        {log.actionType}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {log.targetEntity}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                      {log.details}
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="font-mono text-[11px] text-slate-400">{log.timestamp}</div>
                    <div className="text-[10px] font-mono text-indigo-500">by @{log.adminUsername}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: INSERT NEW STUDENT                                               */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" />
                Insert New Student Record
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={e => setNewStudentName(e.target.value)}
                    placeholder="e.g. Jordan Blake"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newStudentEmail}
                    onChange={e => setNewStudentEmail(e.target.value)}
                    placeholder="jordan@cybersec.org"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Age</label>
                  <input
                    type="number"
                    min="14"
                    max="80"
                    required
                    value={newStudentAge}
                    onChange={e => setNewStudentAge(parseInt(e.target.value) || 24)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Initial Status</label>
                  <select
                    value={newStudentStatus}
                    onChange={e => setNewStudentStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="graduated">Graduated</option>
                    <option value="probation">Probation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Enrolled Track</label>
                  <select
                    value={newStudentPath}
                    onChange={e => setNewStudentPath(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="path-beginner">Beginner Learning Path</option>
                    <option value="path-intermediate">Intermediate Learning Path</option>
                    <option value="path-advanced">Advanced Learning Path</option>
                    <option value="track-a">Track A: Ethical Hacking</option>
                    <option value="track-b">Track B: SOC Analyst</option>
                    <option value="track-c">Track C: IoT & Cloud Security</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Scholarship Status</label>
                  <select
                    value={newStudentScholarship}
                    onChange={e => setNewStudentScholarship(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="100% Transition Fellowship">100% Transition Fellowship</option>
                    <option value="100% Youth Grant">100% Youth Grant</option>
                    <option value="100% IoT Security Grant">100% IoT Security Grant</option>
                    <option value="Self-Funded">Self-Funded</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Initial Progress</label>
                  <span className="font-mono text-indigo-600 font-bold">{newStudentProgress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newStudentProgress}
                  onChange={e => setNewStudentProgress(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Administrative Notes</label>
                <textarea
                  rows={2}
                  value={newStudentNotes}
                  onChange={e => setNewStudentNotes(e.target.value)}
                  placeholder="Reason for intervention or academic background..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
                >
                  Insert Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: UPDATE EXISTING STUDENT                                          */}
      {/* ========================================================================= */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-indigo-600" />
                  Update Student Record
                </h3>
                <span className="text-[11px] font-mono text-slate-400">ID: {editingStudent.id}</span>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateStudentSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.fullName}
                    onChange={e => setEditingStudent({ ...editingStudent, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editingStudent.email}
                    onChange={e => setEditingStudent({ ...editingStudent, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Age</label>
                  <input
                    type="number"
                    min="14"
                    max="80"
                    required
                    value={editingStudent.age}
                    onChange={e => setEditingStudent({ ...editingStudent, age: parseInt(e.target.value) || 20 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Status</label>
                  <select
                    value={editingStudent.status}
                    onChange={e => setEditingStudent({ ...editingStudent, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="graduated">Graduated</option>
                    <option value="probation">Probation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Enrolled Track</label>
                  <select
                    value={editingStudent.enrolledPath}
                    onChange={e => setEditingStudent({ ...editingStudent, enrolledPath: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="path-beginner">Beginner Learning Path</option>
                    <option value="path-intermediate">Intermediate Learning Path</option>
                    <option value="path-advanced">Advanced Learning Path</option>
                    <option value="track-a">Track A: Ethical Hacking</option>
                    <option value="track-b">Track B: SOC Analyst</option>
                    <option value="track-c">Track C: IoT & Cloud Security</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Scholarship Tier</label>
                  <select
                    value={editingStudent.scholarshipStatus}
                    onChange={e => setEditingStudent({ ...editingStudent, scholarshipStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="100% Transition Fellowship">100% Transition Fellowship</option>
                    <option value="100% Youth Grant">100% Youth Grant</option>
                    <option value="100% IoT Security Grant">100% IoT Security Grant</option>
                    <option value="Self-Funded">Self-Funded</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Current Progress Percentage</label>
                  <span className="font-mono text-indigo-600 font-bold">{editingStudent.progressPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editingStudent.progressPercentage}
                  onChange={e => setEditingStudent({ ...editingStudent, progressPercentage: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Academic / Intervention Notes</label>
                <textarea
                  rows={2}
                  value={editingStudent.notes || ''}
                  onChange={e => setEditingStudent({ ...editingStudent, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: DELETE STUDENT CONFIRMATION                                      */}
      {/* ========================================================================= */}
      {deletingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-red-200 dark:border-red-900/50 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/50">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Confirm Student Removal
                </h3>
                <p className="text-xs text-slate-500">Irreversible Directory Deletion</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete student <strong className="text-slate-900 dark:text-white">{deletingStudent.fullName}</strong> ({deletingStudent.email})?
              This action will revoke active course enrollments and generate a logged administrative intervention.
            </p>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setDeletingStudent(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
