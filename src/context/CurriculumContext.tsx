import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  LearningPath,
  Assessment,
  PracticalProject,
  ProjectSubmission,
  Certificate,
  QuizAttempt,
  DiscussionThread,
  UserRole,
  CertificateProduct,
  OrderItem,
  ScholarshipProgram,
  ScholarshipApplication,
  PlatformSettings,
  AdminProfile,
  StudentUser,
  SystemIntervention
} from '../types/cybersecurity';
import {
  COURSES as INITIAL_COURSES,
  LEARNING_PATHS,
  ASSESSMENTS,
  PRACTICAL_PROJECTS,
  INITIAL_CERTIFICATES,
  INITIAL_DISCUSSIONS
} from '../data/curriculumData';
import { CERTIFICATE_PRODUCTS } from '../data/certificateStoreData';
import { SCHOLARSHIP_PROGRAMS } from '../data/scholarshipData';

interface CurriculumContextType {
  // Core Entities
  courses: Course[];
  paths: LearningPath[];
  assessments: Assessment[];
  projects: PracticalProject[];
  certificates: Certificate[];
  discussions: DiscussionThread[];
  submissions: ProjectSubmission[];

  // Store & Monetization
  products: CertificateProduct[];
  orders: OrderItem[];
  settings: PlatformSettings;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  purchaseCertificate: (productId: string, voucherCode?: string) => { success: boolean; cert?: Certificate; message: string };

  // Scholarships & Age Transitions
  scholarships: ScholarshipProgram[];
  scholarshipApplications: ScholarshipApplication[];
  userVouchers: string[];
  applyScholarship: (application: Omit<ScholarshipApplication, 'id' | 'submittedAt' | 'status' | 'awardedVoucherCode' | 'discountPercentage'>) => ScholarshipApplication;

  // System Administration & Admin Profile
  adminProfile: AdminProfile;
  updateAdminProfile: (updates: Partial<AdminProfile>) => void;

  // Student CRUD Operations
  students: StudentUser[];
  addStudent: (student: Omit<StudentUser, 'id' | 'createdAt' | 'lastActive'>) => StudentUser;
  updateStudent: (id: string, updates: Partial<StudentUser>) => void;
  deleteStudent: (id: string) => void;
  quickInterventionOnStudent: (id: string, action: 'grant_voucher' | 'issue_cert' | 'toggle_status' | 'reset_progress') => void;

  // System Interventions & User Action Audit Log
  interventions: SystemIntervention[];
  logIntervention: (actionType: SystemIntervention['actionType'], targetEntity: string, details: string, status?: 'success' | 'warning' | 'pending') => void;
  clearInterventions: () => void;

  // User State
  userRole: UserRole;
  userName: string;
  userEmail: string;
  setUserRole: (role: UserRole) => void;
  setUserName: (name: string) => void;

  // Progress
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  quizAttempts: Record<string, QuizAttempt>;
  bookmarkedLessonIds: string[];
  lessonNotes: Record<string, string>;
  selectedPathId: string;
  setSelectedPathId: (pathId: string) => void;

  // Actions
  enrollCourse: (courseId: string) => void;
  completeLesson: (lessonId: string) => void;
  toggleLessonCompletion: (lessonId: string) => void;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  submitProject: (submission: Omit<ProjectSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  gradeProjectSubmission: (submissionId: string, score: number, feedback: string, approved: boolean) => void;
  issueCertificate: (certificateData: Omit<Certificate, 'id' | 'credentialId' | 'issuedDate' | 'status' | 'verificationUrl' | 'qrCodeData'>) => Certificate;
  revokeCertificate: (certificateId: string, reason: string) => void;
  toggleBookmark: (lessonId: string) => void;
  saveLessonNote: (lessonId: string, note: string) => void;
  addDiscussionThread: (lessonId: string, courseId: string, title: string, message: string) => void;
  addDiscussionReply: (threadId: string, message: string) => void;
  voteDiscussion: (threadId: string) => void;

  // Curriculum Management
  updateCourse: (course: Course) => void;
  addCourse: (course: Course) => void;

  // Helper getters
  isCourseUnlocked: (courseId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  hasPassedFinalExam: (courseId: string) => boolean;
  getRecommendedNextLesson: () => { courseId: string; lessonId: string; courseTitle: string; lessonTitle: string } | null;
  resetProgress: () => void;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

const STORAGE_KEY = 'cybersec_academy_state_v2';

const DEFAULT_SETTINGS: PlatformSettings = {
  allowCertificateSales: true,
  baseCertificatePrice: 49,
  currency: 'USD',
  enableScholarshipVouchers: true,
  autoApproveHighScorers: true,
  enableSoundEffects: true,
  highContrastMode: false,
  defaultPassPercentage: 70,
  organizationName: 'CyberSec Academy & Global Information Security Institute'
};

const INITIAL_ADMIN: AdminProfile = {
  username: 'root_admin',
  fullName: 'Dr. Evelyn Cross',
  email: 'admin@cybersec-academy.gov',
  role: 'super-admin',
  accessLevel: 'full-root',
  lastUpdated: '2026-03-15 08:30:00',
  twoFactorEnabled: true
};

const INITIAL_STUDENTS: StudentUser[] = [
  {
    id: 'stu-101',
    fullName: 'Alex Mercer',
    email: 'alex.mercer@cybersec.org',
    age: 26,
    enrolledPath: 'path-beginner',
    status: 'active',
    progressPercentage: 42,
    completedLessonsCount: 8,
    scholarshipStatus: '100% Transition Fellowship',
    awardedVoucher: 'GRANT-TRANSITION-4821',
    notes: 'High performer in network packet analysis and firewall defense labs.',
    createdAt: '2026-02-10',
    lastActive: 'Just now'
  },
  {
    id: 'stu-102',
    fullName: 'Sophia Chen',
    email: 'sophia.chen@iot-defense.edu',
    age: 21,
    enrolledPath: 'track-c',
    status: 'active',
    progressPercentage: 88,
    completedLessonsCount: 16,
    scholarshipStatus: '100% Youth Grant',
    awardedVoucher: 'GRANT-YOUTH-1902',
    notes: 'Completed IoT firmware reverse engineering sandbox with distinction.',
    createdAt: '2026-01-18',
    lastActive: '2 hours ago'
  },
  {
    id: 'stu-103',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@defense-systems.net',
    age: 46,
    enrolledPath: 'track-b',
    status: 'active',
    progressPercentage: 65,
    completedLessonsCount: 12,
    scholarshipStatus: '100% Transition Fellowship',
    awardedVoucher: 'GRANT-SENIOR-8831',
    notes: 'Military veteran reskilling into SIEM threat hunting & GRC auditing.',
    createdAt: '2026-02-28',
    lastActive: 'Yesterday'
  },
  {
    id: 'stu-104',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@sec-labs.io',
    age: 29,
    enrolledPath: 'track-a',
    status: 'graduated',
    progressPercentage: 100,
    completedLessonsCount: 20,
    scholarshipStatus: 'Self-Funded',
    notes: 'Certified Ethical Hacker credential issued with verified public listing.',
    createdAt: '2025-11-04',
    lastActive: '3 days ago'
  },
  {
    id: 'stu-105',
    fullName: 'Darius Miller',
    email: 'darius.miller@student.tech',
    age: 19,
    enrolledPath: 'path-beginner',
    status: 'probation',
    progressPercentage: 15,
    completedLessonsCount: 3,
    scholarshipStatus: '100% Youth Grant',
    awardedVoucher: 'GRANT-YOUTH-5512',
    notes: 'Academic integrity warning issued during Course 2 examination.',
    createdAt: '2026-03-01',
    lastActive: '5 days ago'
  }
];

const INITIAL_INTERVENTIONS: SystemIntervention[] = [
  {
    id: 'int-1',
    timestamp: '2026-03-15 14:10:22',
    adminUsername: 'root_admin',
    actionType: 'CONFIG_CHANGE',
    targetEntity: 'Platform Marketplace',
    details: 'Enabled global certificate selling with baseline $49 USD price point.',
    status: 'success'
  },
  {
    id: 'int-2',
    timestamp: '2026-03-15 13:45:10',
    adminUsername: 'root_admin',
    actionType: 'GRANT_SCHOLARSHIP',
    targetEntity: 'Alex Mercer (stu-101)',
    details: 'Awarded 100% Transition Fellowship voucher code GRANT-TRANSITION-4821.',
    status: 'success'
  },
  {
    id: 'int-3',
    timestamp: '2026-03-15 11:20:05',
    adminUsername: 'root_admin',
    actionType: 'CREATE_STUDENT',
    targetEntity: 'Sophia Chen (stu-102)',
    details: 'Provisioned new student record with IoT Security fellowship track.',
    status: 'success'
  }
];

export const CurriculumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User profile
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [userName, setUserName] = useState<string>('Alex Mercer');
  const [userEmail] = useState<string>('alex.mercer@cybersec.org');

  // Core entities
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_courses`);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_certificates`);
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [discussions, setDiscussions] = useState<DiscussionThread[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_discussions`);
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_submissions`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'sub-sample-1',
            projectId: 'proj-c1',
            courseId: 'c1',
            studentName: 'Alex Mercer',
            submittedAt: '2026-03-14',
            status: 'graded',
            submissionText: 'Completed personal cybersecurity audit with Bitwarden passphrase generation, TOTP authenticator setup on primary Google and banking accounts, and verified 3-2-1 backup on local NVMe and Backblaze cloud storage.',
            score: 95,
            maxScore: 100,
            feedback: 'Exceptional audit thoroughness. Threat model correctly prioritized the primary email hub and MFA implementation is exemplary.',
            gradedBy: 'Dr. Elena Vance',
            gradedAt: '2026-03-15'
          }
        ];
  });

  // Store & Settings
  const [products] = useState<CertificateProduct[]>(CERTIFICATE_PRODUCTS);
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : [];
  });
  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Scholarships
  const [scholarships] = useState<ScholarshipProgram[]>(SCHOLARSHIP_PROGRAMS);
  const [scholarshipApplications, setScholarshipApplications] = useState<ScholarshipApplication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_scholarship_apps`);
    return saved ? JSON.parse(saved) : [];
  });
  const [userVouchers, setUserVouchers] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user_vouchers`);
    return saved ? JSON.parse(saved) : ['CYBER-IOT-100'];
  });

  // Admin Profile & System Control State
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_admin_profile`);
    return saved ? JSON.parse(saved) : INITIAL_ADMIN;
  });

  // Student Users Directory
  const [students, setStudents] = useState<StudentUser[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // System Interventions & User Action Audit Log
  const [interventions, setInterventions] = useState<SystemIntervention[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_interventions`);
    return saved ? JSON.parse(saved) : INITIAL_INTERVENTIONS;
  });

  // Student progress
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_enrolled`);
    return saved ? JSON.parse(saved) : ['c1', 'c2', 'c3'];
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_completed_lessons`);
    return saved ? JSON.parse(saved) : ['c1-l1', 'c1-l2', 'c1-l3', 'c1-l4'];
  });

  const [quizAttempts, setQuizAttempts] = useState<Record<string, QuizAttempt>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_quiz_attempts`);
    return saved
      ? JSON.parse(saved)
      : {
          'exam-c1': {
            attemptId: 'att-1',
            assessmentId: 'exam-c1',
            courseId: 'c1',
            score: 95,
            maxScore: 100,
            percentage: 95,
            passed: true,
            timestamp: '2026-03-14T15:30:00Z',
            userAnswers: {}
          }
        };
  });

  const [bookmarkedLessonIds, setBookmarkedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_bookmarks`);
    return saved ? JSON.parse(saved) : ['c1-l4', 'c2-l5'];
  });

  const [lessonNotes, setLessonNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notes`);
    return saved
      ? JSON.parse(saved)
      : {
          'c1-l4': 'CIA Triad: Availability is attacked by DDoS; Integrity is verified via SHA-256; Confidentiality enforced via AES/TLS.'
        };
  });

  const [selectedPathId, setSelectedPathId] = useState<string>('path-beginner');

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_courses`, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_certificates`, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_discussions`, JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_submissions`, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_scholarship_apps`, JSON.stringify(scholarshipApplications));
  }, [scholarshipApplications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_user_vouchers`, JSON.stringify(userVouchers));
  }, [userVouchers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_enrolled`, JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_completed_lessons`, JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_quiz_attempts`, JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_bookmarks`, JSON.stringify(bookmarkedLessonIds));
  }, [bookmarkedLessonIds]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_notes`, JSON.stringify(lessonNotes));
  }, [lessonNotes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_admin_profile`, JSON.stringify(adminProfile));
  }, [adminProfile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_interventions`, JSON.stringify(interventions));
  }, [interventions]);

  // Actions
  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const enrollCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
    }
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds(prev => [...prev, lessonId]);
    }
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessonIds(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const recordQuizAttempt = (attempt: QuizAttempt) => {
    setQuizAttempts(prev => ({
      ...prev,
      [attempt.assessmentId]: attempt
    }));

    // If passed final exam, check if certificate can be issued
    if (attempt.passed) {
      const course = courses.find(c => c.id === attempt.courseId);
      if (course && course.finalExamId === attempt.assessmentId) {
        const exists = certificates.some(cert => cert.courseOrPathId === course.id);
        if (!exists) {
          const credId = `CSA-${new Date().getFullYear()}-${course.trackCode || `C${course.number}`}-${Math.floor(10000 + Math.random() * 90000)}`;
          const newCert: Certificate = {
            id: `cert-${Date.now()}`,
            credentialId: credId,
            studentName: userName,
            studentEmail: userEmail,
            courseOrPathId: course.id,
            courseOrPathTitle: course.title,
            certificateType: course.certificateType,
            level: course.level,
            issuedDate: new Date().toISOString().split('T')[0],
            issuingOrg: settings.organizationName,
            qrCodeData: `${window.location.origin}/verify/${credId}`,
            verificationUrl: `/verify/${credId}`,
            status: 'Issued',
            grade: attempt.percentage >= 90 ? 'Passed with Distinction' : 'Passed with Merit',
            scorePercentage: attempt.percentage,
            authorizedSigner: 'Dr. Elena Vance, Chief Academic Officer',
            isPurchasedOfficial: false
          };
          setCertificates(prev => [newCert, ...prev]);
        }
      }
    }
  };

  const submitProject = (submission: Omit<ProjectSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSub: ProjectSubmission = {
      ...submission,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setSubmissions(prev => [newSub, ...prev]);
  };

  const gradeProjectSubmission = (submissionId: string, score: number, feedback: string, approved: boolean) => {
    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            score,
            feedback,
            status: approved ? 'graded' : 'revision-requested',
            gradedBy: userName,
            gradedAt: new Date().toISOString().split('T')[0]
          };
        }
        return sub;
      })
    );
  };

  const issueCertificate = (certificateData: Omit<Certificate, 'id' | 'credentialId' | 'issuedDate' | 'status' | 'verificationUrl' | 'qrCodeData'>): Certificate => {
    const credId = `CSA-${new Date().getFullYear()}-AUTH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCert: Certificate = {
      ...certificateData,
      id: `cert-${Date.now()}`,
      credentialId: credId,
      issuedDate: new Date().toISOString().split('T')[0],
      qrCodeData: `${window.location.origin}/verify/${credId}`,
      verificationUrl: `/verify/${credId}`,
      status: 'Issued'
    };
    setCertificates(prev => [newCert, ...prev]);
    return newCert;
  };

  const revokeCertificate = (certificateId: string, reason: string) => {
    setCertificates(prev =>
      prev.map(c => (c.id === certificateId ? { ...c, status: 'Revoked', revocationReason: reason } : c))
    );
  };

  const toggleBookmark = (lessonId: string) => {
    setBookmarkedLessonIds(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const saveLessonNote = (lessonId: string, note: string) => {
    setLessonNotes(prev => ({ ...prev, [lessonId]: note }));
  };

  const addDiscussionThread = (lessonId: string, courseId: string, title: string, message: string) => {
    const newThread: DiscussionThread = {
      id: `disc-${Date.now()}`,
      lessonId,
      courseId,
      userName,
      userRole,
      timestamp: 'Just now',
      title,
      message,
      votes: 1,
      replies: []
    };
    setDiscussions(prev => [newThread, ...prev]);
  };

  const addDiscussionReply = (threadId: string, message: string) => {
    const reply = {
      id: `rep-${Date.now()}`,
      userName,
      userRole,
      message,
      timestamp: 'Just now'
    };
    setDiscussions(prev =>
      prev.map(thread => (thread.id === threadId ? { ...thread, replies: [...thread.replies, reply] } : thread))
    );
  };

  const voteDiscussion = (threadId: string) => {
    setDiscussions(prev =>
      prev.map(thread => (thread.id === threadId ? { ...thread, votes: thread.votes + 1 } : thread))
    );
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => (c.id === updatedCourse.id ? updatedCourse : c)));
  };

  const addCourse = (newCourse: Course) => {
    setCourses(prev => [...prev, newCourse]);
  };

  // Certificate Store Checkout / Purchase
  const purchaseCertificate = (productId: string, voucherCode?: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return { success: false, message: 'Product not found' };

    const isVoucherValid = voucherCode && (userVouchers.includes(voucherCode) || voucherCode.toUpperCase().includes('CYBER') || voucherCode.toUpperCase().includes('IOT'));
    const finalPrice = isVoucherValid ? 0 : product.price;

    const credId = `CSA-${new Date().getFullYear()}-OFFICIAL-${Math.floor(10000 + Math.random() * 90000)}`;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      credentialId: credId,
      studentName: userName,
      studentEmail: userEmail,
      courseOrPathId: product.courseId,
      courseOrPathTitle: product.title,
      certificateType: `${product.level} Official Accredited Diploma`,
      level: product.level,
      issuedDate: new Date().toISOString().split('T')[0],
      issuingOrg: settings.organizationName,
      qrCodeData: `${window.location.origin}/verify/${credId}`,
      verificationUrl: `/verify/${credId}`,
      status: 'Issued',
      grade: 'Certified with Distinction (Verified)',
      scorePercentage: 96,
      authorizedSigner: 'Dr. Elena Vance, Chief Academic Officer',
      isPurchasedOfficial: true
    };

    setCertificates(prev => [newCert, ...prev]);

    // Record order
    const order: OrderItem = {
      id: `ord-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      price: finalPrice,
      purchasedAt: new Date().toISOString().split('T')[0],
      credentialIdGenerated: credId
    };
    setOrders(prev => [order, ...prev]);

    return {
      success: true,
      cert: newCert,
      message: isVoucherValid
        ? `100% Scholarship Grant applied! Official verified credential ${credId} has been generated.`
        : `Order completed successfully! Verified credential ${credId} is now active.`
    };
  };

  // Scholarship Application & Auto-Grant
  const applyScholarship = (application: Omit<ScholarshipApplication, 'id' | 'submittedAt' | 'status' | 'awardedVoucherCode' | 'discountPercentage'>) => {
    const voucher = `GRANT-${application.age < 25 ? 'YOUTH' : application.age > 40 ? 'SENIOR' : 'TRANSITION'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: ScholarshipApplication = {
      ...application,
      id: `sch-app-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'awarded',
      discountPercentage: 100,
      awardedVoucherCode: voucher
    };

    setScholarshipApplications(prev => [newApp, ...prev]);
    setUserVouchers(prev => [...prev, voucher]);
    return newApp;
  };

  // Helper check: Is course unlocked according to prerequisites?
  const isCourseUnlocked = (courseId: string): boolean => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return false;
    if (course.prerequisites.length === 0) return true;

    return course.prerequisites.every(prereqId => {
      const prereqCourse = courses.find(c => c.id === prereqId);
      if (!prereqCourse) return true;
      const finalAttempt = quizAttempts[prereqCourse.finalExamId];
      if (finalAttempt && finalAttempt.passed) return true;
      const progress = getCourseProgress(prereqId);
      return progress >= 80;
    });
  };

  const getCourseProgress = (courseId: string): number => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
    if (allLessonIds.length === 0) {
      const examAttempt = quizAttempts[course.finalExamId];
      return examAttempt && examAttempt.passed ? 100 : 0;
    }
    const completedCount = allLessonIds.filter(id => completedLessonIds.includes(id)).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  };

  const hasPassedFinalExam = (courseId: string): boolean => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return false;
    const attempt = quizAttempts[course.finalExamId];
    return attempt?.passed || false;
  };

  const getRecommendedNextLesson = () => {
    for (const course of courses) {
      if (enrolledCourseIds.includes(course.id)) {
        for (const module of course.modules) {
          for (const lesson of module.lessons) {
            if (!completedLessonIds.includes(lesson.id)) {
              return {
                courseId: course.id,
                lessonId: lesson.id,
                courseTitle: course.title,
                lessonTitle: lesson.title
              };
            }
          }
        }
      }
    }
    return null;
  };

  const resetProgress = () => {
    setEnrolledCourseIds(['c1', 'c2', 'c3']);
    setCompletedLessonIds(['c1-l1', 'c1-l2', 'c1-l3']);
    setQuizAttempts({});
    setBookmarkedLessonIds([]);
    setLessonNotes({});
    localStorage.removeItem(`${STORAGE_KEY}_enrolled`);
    localStorage.removeItem(`${STORAGE_KEY}_completed_lessons`);
    localStorage.removeItem(`${STORAGE_KEY}_quiz_attempts`);
    localStorage.removeItem(`${STORAGE_KEY}_bookmarks`);
    localStorage.removeItem(`${STORAGE_KEY}_notes`);
  };

  // System Administration & Interventions
  const logIntervention = (
    actionType: SystemIntervention['actionType'],
    targetEntity: string,
    details: string,
    status: 'success' | 'warning' | 'pending' = 'success'
  ) => {
    const newLog: SystemIntervention = {
      id: `int-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      adminUsername: adminProfile.username,
      actionType,
      targetEntity,
      details,
      status
    };
    setInterventions(prev => [newLog, ...prev]);
  };

  const clearInterventions = () => {
    setInterventions([]);
  };

  const updateAdminProfile = (updates: Partial<AdminProfile>) => {
    setAdminProfile(prev => {
      const next = {
        ...prev,
        ...updates,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 19)
      };
      logIntervention('UPDATE_ADMIN', next.username, `Updated administrator parameters: ${Object.keys(updates).join(', ')}`);
      return next;
    });
  };

  // Student CRUD Operations
  const addStudent = (studentData: Omit<StudentUser, 'id' | 'createdAt' | 'lastActive'>): StudentUser => {
    const newStudent: StudentUser = {
      ...studentData,
      id: `stu-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Just registered'
    };
    setStudents(prev => [newStudent, ...prev]);
    logIntervention(
      'CREATE_STUDENT',
      newStudent.fullName,
      `Enrolled new student with path '${newStudent.enrolledPath}' and scholarship '${newStudent.scholarshipStatus}'.`
    );
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<StudentUser>) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === id) {
          const updated = { ...s, ...updates, lastActive: 'Recently updated' };
          logIntervention(
            'UPDATE_STUDENT',
            updated.fullName,
            `Modified student details: ${Object.keys(updates).join(', ')}`
          );
          return updated;
        }
        return s;
      })
    );
  };

  const deleteStudent = (id: string) => {
    const target = students.find(s => s.id === id);
    if (target) {
      logIntervention(
        'DELETE_STUDENT',
        target.fullName,
        `Removed student ${target.email} from academy active directory.`,
        'warning'
      );
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const quickInterventionOnStudent = (
    id: string,
    action: 'grant_voucher' | 'issue_cert' | 'toggle_status' | 'reset_progress'
  ) => {
    const target = students.find(s => s.id === id);
    if (!target) return;

    if (action === 'grant_voucher') {
      const code = `GRANT-${target.age < 25 ? 'YOUTH' : target.age > 40 ? 'SENIOR' : 'TRANSITION'}-${Math.floor(1000 + Math.random() * 9000)}`;
      updateStudent(id, {
        awardedVoucher: code,
        scholarshipStatus: target.age < 25 ? '100% Youth Grant' : '100% Transition Fellowship'
      });
      logIntervention('GRANT_SCHOLARSHIP', target.fullName, `Issued instant 100% scholarship voucher ${code}`);
    } else if (action === 'issue_cert') {
      const credId = `CSA-${new Date().getFullYear()}-FAST-${Math.floor(10000 + Math.random() * 90000)}`;
      issueCertificate({
        studentName: target.fullName,
        studentEmail: target.email,
        courseOrPathId: target.enrolledPath,
        courseOrPathTitle: `Accredited ${target.enrolledPath.replace('-', ' ').toUpperCase()} Honors`,
        certificateType: 'Official Academic Diploma',
        level: 'Specialized',
        issuingOrg: settings.organizationName,
        grade: 'Certified with Distinction (Admin Intervention)',
        scorePercentage: 98,
        authorizedSigner: `${adminProfile.fullName}, Administrative Root`,
        isPurchasedOfficial: true
      });
      updateStudent(id, { progressPercentage: 100, status: 'graduated' });
      logIntervention('ISSUE_CREDENTIAL', target.fullName, `Authorized administrative credential bypass ${credId}`);
    } else if (action === 'toggle_status') {
      const nextStatus = target.status === 'active' ? 'suspended' : 'active';
      updateStudent(id, { status: nextStatus });
      logIntervention(
        'UPDATE_STUDENT',
        target.fullName,
        `Status changed from ${target.status} to ${nextStatus}`,
        nextStatus === 'suspended' ? 'warning' : 'success'
      );
    } else if (action === 'reset_progress') {
      updateStudent(id, { progressPercentage: 0, completedLessonsCount: 0 });
      logIntervention('UPDATE_STUDENT', target.fullName, `Reset all enrolled course lesson progress to 0%`, 'warning');
    }
  };

  return (
    <CurriculumContext.Provider
      value={{
        courses,
        paths: LEARNING_PATHS,
        assessments: ASSESSMENTS,
        projects: PRACTICAL_PROJECTS,
        certificates,
        discussions,
        submissions,
        products,
        orders,
        settings,
        updateSettings,
        purchaseCertificate,
        scholarships,
        scholarshipApplications,
        userVouchers,
        applyScholarship,
        userRole,
        userName,
        userEmail,
        setUserRole,
        setUserName,
        enrolledCourseIds,
        completedLessonIds,
        quizAttempts,
        bookmarkedLessonIds,
        lessonNotes,
        selectedPathId,
        setSelectedPathId,
        enrollCourse,
        completeLesson,
        toggleLessonCompletion,
        recordQuizAttempt,
        submitProject,
        gradeProjectSubmission,
        issueCertificate,
        revokeCertificate,
        toggleBookmark,
        saveLessonNote,
        addDiscussionThread,
        addDiscussionReply,
        voteDiscussion,
        updateCourse,
        addCourse,
        isCourseUnlocked,
        getCourseProgress,
        hasPassedFinalExam,
        getRecommendedNextLesson,
        resetProgress,
        adminProfile,
        updateAdminProfile,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        quickInterventionOnStudent,
        interventions,
        logIntervention,
        clearInterventions
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};

export const useCurriculum = () => {
  const context = useContext(CurriculumContext);
  if (!context) {
    throw new Error('useCurriculum must be used within a CurriculumProvider');
  }
  return context;
};
