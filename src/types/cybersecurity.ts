export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Specialized';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface CodeSnippet {
  language: string;
  code: string;
  description?: string;
  output?: string;
}

export interface KnowledgeCheck {
  id: string;
  question: string;
  type: 'single' | 'multi' | 'true-false';
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export interface PracticalExercise {
  id: string;
  title: string;
  objective: string;
  instructions: string[];
  labType?: 'terminal' | 'wireshark' | 'crypto' | 'web-security' | 'password' | 'phishing' | 'iot-security';
  verificationHint: string;
  starterData?: any;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  number: number;
  title: string;
  durationMinutes: number;
  summary: string;
  content: string;
  realWorldExample: string;
  diagramType?: 'cia-triad' | 'osi-stack' | 'pki-flow' | 'defense-in-depth' | 'malware-lifecycle' | 'zero-trust' | 'incident-lifecycle';
  codeSnippets: CodeSnippet[];
  practicalExercise?: PracticalExercise;
  knowledgeCheck?: KnowledgeCheck;
  videoDuration?: string;
  videoTitle?: string;
  downloadableResources?: { title: string; type: string; size: string; description: string }[];
}

export interface CourseModule {
  id: string;
  courseId: string;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
  moduleQuizId?: string;
}

export type QuestionType = 'single' | 'multiple' | 'true-false' | 'matching' | 'short-answer' | 'scenario';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  scenarioContext?: string;
  options?: string[];
  matchingPairs?: { left: string; right: string }[];
  correctAnswer: any;
  explanation: string;
  points: number;
}

export interface Assessment {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  type: 'module-quiz' | 'final-exam';
  timeLimitMinutes: number;
  passPercentage: number;
  questions: QuizQuestion[];
}

export interface ProjectRubricItem {
  id: string;
  criterion: string;
  points: number;
  description: string;
}

export interface PracticalProject {
  id: string;
  courseId: string;
  title: string;
  level: Level;
  description: string;
  scenario: string;
  tasks: {
    id: string;
    instructions: string;
    hints: string[];
  }[];
  rubric: ProjectRubricItem[];
  passingPoints: number;
  submissionRequirements: string[];
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  courseId: string;
  studentName: string;
  submittedAt: string;
  status: 'pending' | 'graded' | 'revision-requested';
  submissionText: string;
  attachments?: string[];
  score?: number;
  maxScore: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
}

export interface Course {
  id: string;
  number: number;
  trackCode?: string;
  pathId: string;
  title: string;
  level: Level;
  description: string;
  estimatedHours: number;
  prerequisites: string[];
  learningObjectives: string[];
  modules: CourseModule[];
  finalExamId: string;
  practicalProjectId?: string;
  certificateType: string;
  status: 'published' | 'draft' | 'archived';
  priceUsd?: number;
}

export interface LearningPath {
  id: string;
  title: string;
  level: Level;
  description: string;
  objective: string;
  prerequisites: string[];
  courseIds: string[];
  estimatedWeeks: number;
  targetRole: string;
  iconName: string;
  completionRequirements: string[];
}

export interface Certificate {
  id: string;
  credentialId: string;
  studentName: string;
  studentEmail: string;
  courseOrPathId: string;
  courseOrPathTitle: string;
  certificateType: string;
  level: Level;
  issuedDate: string;
  expiresDate?: string;
  issuingOrg: string;
  qrCodeData: string;
  verificationUrl: string;
  status: 'Issued' | 'Pending' | 'Revoked' | 'Expired';
  revocationReason?: string;
  grade: string;
  scorePercentage: number;
  authorizedSigner: string;
  isPurchasedOfficial?: boolean;
}

export interface QuizAttempt {
  attemptId: string;
  assessmentId: string;
  courseId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  timestamp: string;
  userAnswers: Record<string, any>;
}

export interface DiscussionReply {
  id: string;
  userName: string;
  userRole: UserRole;
  message: string;
  timestamp: string;
}

export interface DiscussionThread {
  id: string;
  lessonId: string;
  courseId: string;
  userName: string;
  userRole: UserRole;
  timestamp: string;
  title: string;
  message: string;
  votes: number;
  replies: DiscussionReply[];
}

// Certificate Marketplace & Sales
export interface CertificateProduct {
  id: string;
  title: string;
  courseId: string;
  level: Level;
  price: number;
  originalPrice: number;
  category: 'foundational' | 'professional' | 'specialized-track' | 'enterprise-bundle';
  description: string;
  features: string[];
  badgeName: string;
  isPopular?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  price: number;
  purchasedAt: string;
  credentialIdGenerated: string;
}

// Scholarship & Age Transition Grants
export type AgeBracket = 'youth-16-24' | 'transition-25-40' | 'senior-40-plus' | 'all-ages';

export interface ScholarshipProgram {
  id: string;
  title: string;
  focusDomain: 'Cybersecurity' | 'IoT Security' | 'Digital Safety & Inclusion';
  ageBracket: AgeBracket;
  ageBracketLabel: string;
  grantAmount: string;
  fundingValueUsd: number;
  seatsRemaining: number;
  description: string;
  eligibility: string[];
  benefits: string[];
  sponsor: string;
  badgeTag: string;
}

export interface ScholarshipApplication {
  id: string;
  programId: string;
  applicantName: string;
  applicantEmail: string;
  age: number;
  educationStatus: string;
  interestInIotOrCyber: string;
  statementOfNeed: string;
  submittedAt: string;
  status: 'awarded' | 'under-review' | 'waitlisted';
  awardedVoucherCode?: string;
  discountPercentage: number;
}

// Settings Configuration
export interface PlatformSettings {
  allowCertificateSales: boolean;
  baseCertificatePrice: number;
  currency: 'USD' | 'EUR' | 'GBP';
  enableScholarshipVouchers: boolean;
  autoApproveHighScorers: boolean;
  enableSoundEffects: boolean;
  highContrastMode: boolean;
  defaultPassPercentage: number;
  organizationName: string;
}

// Admin System Control & Profile
export interface AdminProfile {
  username: string;
  fullName: string;
  email: string;
  role: 'super-admin' | 'academic-director' | 'security-officer';
  accessLevel: 'full-root' | 'read-write' | 'audit-only';
  lastUpdated: string;
  twoFactorEnabled: boolean;
}

// Student User Management
export interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  age: number;
  enrolledPath: string;
  status: 'active' | 'suspended' | 'graduated' | 'probation';
  progressPercentage: number;
  completedLessonsCount: number;
  scholarshipStatus: 'none' | '100% Youth Grant' | '100% Transition Fellowship' | '100% IoT Security Grant' | 'Self-Funded';
  awardedVoucher?: string;
  notes?: string;
  createdAt: string;
  lastActive: string;
}

// System Interventions & Audit Trail
export interface SystemIntervention {
  id: string;
  timestamp: string;
  adminUsername: string;
  actionType: 'CREATE_STUDENT' | 'UPDATE_STUDENT' | 'DELETE_STUDENT' | 'UPDATE_ADMIN' | 'ISSUE_CREDENTIAL' | 'GRANT_SCHOLARSHIP' | 'CONFIG_CHANGE';
  targetEntity: string;
  details: string;
  status: 'success' | 'warning' | 'pending';
}

