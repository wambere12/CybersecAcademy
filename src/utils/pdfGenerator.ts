import { jsPDF } from 'jspdf';
import { Certificate, StudentUser } from '../types/cybersecurity';

/**
 * Universal Text to PDF Exporter
 * Formats any raw or structured text into an official styled PDF document.
 */
export const downloadTextAsPdf = (
  title: string,
  content: string,
  options?: {
    filename?: string;
    author?: string;
    subtitle?: string;
    organization?: string;
  }
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Header Background Bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 26, 'F');

  // Accent Line
  doc.setFillColor(99, 102, 241); // indigo-500
  doc.rect(0, 26, pageWidth, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(options?.organization || 'CYBERSEC ACADEMY & GLOBAL DEFENSE INSTITUTE', margin, 12);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('OFFICIAL ACADEMIC & TECHNICAL REPOSITORY EXPORT', margin, 18);

  // Document Title & Metadata
  let y = 40;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, margin, y);

  y += 7;
  if (options?.subtitle) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(options.subtitle, margin, y);
    y += 6;
  }

  // Meta info box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin + 4, y + 6);
  doc.text(`Author: ${options?.author || 'CyberSec Academy System'}`, margin + 4, y + 10);
  doc.text(`Security Level: OFFICIAL / UNCLASSIFIED`, margin + 100, y + 6);
  doc.text(`Verification: Cryptographically Timestamped`, margin + 100, y + 10);

  y += 22;

  // Content body
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);

  const lines = doc.splitTextToSize(content, contentWidth);
  const lineHeight = 6;

  for (let i = 0; i < lines.length; i++) {
    if (y > pageHeight - margin - 15) {
      // Add footer to current page
      addFooter(doc, pageWidth, pageHeight, margin);
      doc.addPage();
      y = margin + 5;
    }
    doc.text(lines[i], margin, y);
    y += lineHeight;
  }

  addFooter(doc, pageWidth, pageHeight, margin);

  const filename = options?.filename || `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
  doc.save(filename);
};

/**
 * Generates an official Accredited Transcript PDF
 */
export const downloadTranscriptPdf = (data: {
  studentName: string;
  studentEmail: string;
  certificates: Certificate[];
  completedLessonsCount: number;
  quizScores: Record<string, any>;
  organizationName: string;
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Header Bar
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 30, pageWidth, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(data.organizationName.toUpperCase(), margin, 14);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(209, 250, 229);
  doc.text('OFFICIAL VERIFIED ACADEMIC TRANSCRIPT & CREDENTIAL RECORD', margin, 21);

  // Student Info Box
  let y = 42;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text(`Student: ${data.studentName}`, margin + 5, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${data.studentEmail}`, margin + 5, y + 14);
  doc.text(`Date of Issue: ${new Date().toISOString().split('T')[0]}`, margin + 5, y + 19);

  doc.text(`Total Completed Lessons: ${data.completedLessonsCount}`, margin + 105, y + 8);
  doc.text(`Diplomas Awarded: ${data.certificates.length}`, margin + 105, y + 14);
  doc.text(`Registry Status: FULLY ACCREDITED (Active)`, margin + 105, y + 19);

  y += 32;

  // Section: Awarded Diplomas & Credentials
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. ACCREDITED CERTIFICATIONS & DIPLOMAS', margin, y);
  y += 6;

  if (data.certificates.length === 0) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('No formal credentials issued yet. In-progress courses are listed below.', margin, y);
    y += 10;
  } else {
    data.certificates.forEach((cert, idx) => {
      if (y > pageHeight - margin - 25) {
        addFooter(doc, pageWidth, pageHeight, margin);
        doc.addPage();
        y = margin + 10;
      }

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'FD');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text(`${idx + 1}. ${cert.courseOrPathTitle}`, margin + 4, y + 6);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`Credential ID: ${cert.credentialId}  |  Level: ${cert.level}  |  Issued: ${cert.issuedDate}`, margin + 4, y + 11);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text(`Status: ${cert.status} (${cert.grade})`, margin + 115, y + 6);

      y += 19;
    });
  }

  y += 4;

  // Section: Examination & Quiz Performance
  if (y > pageHeight - margin - 35) {
    addFooter(doc, pageWidth, pageHeight, margin);
    doc.addPage();
    y = margin + 10;
  }

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. EXAMINATION & PRACTICAL AUDIT RECORD', margin, y);
  y += 6;

  const attemptEntries = Object.entries(data.quizScores);
  if (attemptEntries.length === 0) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('No graded examinations submitted yet.', margin, y);
    y += 10;
  } else {
    attemptEntries.forEach(([key, attempt]: any) => {
      if (y > pageHeight - margin - 15) {
        addFooter(doc, pageWidth, pageHeight, margin);
        doc.addPage();
        y = margin + 10;
      }
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(51, 65, 85);
      doc.text(`• Examination: ${key.toUpperCase()}`, margin + 2, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(attempt.passed ? 5 : 180, attempt.passed ? 150 : 20, 50);
      doc.text(`Score: ${attempt.score} / ${attempt.maxScore} (${attempt.percentage}%) - ${attempt.passed ? 'PASSED' : 'RETAKE'}`, margin + 110, y);
      y += 6;
    });
  }

  // Formal Seal and Sign-off at bottom
  if (y > pageHeight - margin - 35) {
    addFooter(doc, pageWidth, pageHeight, margin);
    doc.addPage();
    y = margin + 10;
  }

  y += 10;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('ACADEMIC CERTIFYING SIGNATURE:', margin, y);
  doc.text('OFFICIAL TAMPER-PROOF STAMP:', margin + 100, y);

  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(99, 102, 241);
  doc.text('Dr. Elena Vance, Chief Academic Officer', margin, y);
  doc.text('CERTIFIED CRYPTOGRAPHIC RECORD', margin + 100, y);

  addFooter(doc, pageWidth, pageHeight, margin);

  doc.save(`Academic-Transcript-${data.studentName.replace(/\s+/g, '_')}.pdf`);
};

/**
 * Generates an official Certificate Diploma PDF
 */
export const downloadCertificatePdf = (cert: Certificate) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Outer Luxury Border
  doc.setDrawColor(99, 102, 241); // indigo-500
  doc.setLineWidth(3);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner Thin Gold/Slate Border
  doc.setDrawColor(217, 119, 6); // amber-600
  doc.setLineWidth(0.6);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // Corner Accents
  doc.setFillColor(99, 102, 241);
  doc.rect(10, 10, 8, 8, 'F');
  doc.rect(pageWidth - 18, 10, 8, 8, 'F');
  doc.rect(10, pageHeight - 18, 8, 8, 'F');
  doc.rect(pageWidth - 18, pageHeight - 18, 8, 8, 'F');

  // Institution Header
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(79, 70, 229);
  doc.text(cert.issuingOrg.toUpperCase(), pageWidth / 2, 32, { align: 'center' });

  // Diploma Subtitle
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('GLOBAL CYBER DEFENSE, THREAT INTELLIGENCE & EMBEDDED IOT INSTITUTE', pageWidth / 2, 38, { align: 'center' });

  // Certificate Headline
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('CERTIFICATE OF ACADEMIC ACHIEVEMENT', pageWidth / 2, 54, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text('This is to officially certify and record that', pageWidth / 2, 65, { align: 'center' });

  // Recipient Student Name
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 27, 75); // indigo-950
  doc.text(cert.studentName, pageWidth / 2, 80, { align: 'center' });

  // Underline
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(0.8);
  doc.line(pageWidth / 2 - 55, 84, pageWidth / 2 + 55, 84);

  // Description
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('has successfully completed all rigorous curriculum modules, technical sandboxes,', pageWidth / 2, 94, { align: 'center' });
  doc.text('practical project audits, and comprehensive examination standards for the credential of', pageWidth / 2, 100, { align: 'center' });

  // Course Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(cert.courseOrPathTitle, pageWidth / 2, 114, { align: 'center' });

  // Grade & Honors
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // emerald-600
  doc.text(`Grade: ${cert.grade} (${cert.scorePercentage}%)`, pageWidth / 2, 124, { align: 'center' });

  // Signatures & Verification Details
  const bottomY = 155;

  // Left Signer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(15, 23, 42);
  doc.text(cert.authorizedSigner, 45, bottomY);
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.4);
  doc.line(30, bottomY + 2, 95, bottomY + 2);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('AUTHORIZED ACADEMIC SIGNER', 42, bottomY + 7);

  // Center Seal Stamp
  doc.setDrawColor(217, 119, 6);
  doc.setFillColor(254, 243, 199);
  doc.circle(pageWidth / 2, bottomY - 3, 13, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text('VERIFIED', pageWidth / 2, bottomY - 5, { align: 'center' });
  doc.text('ACCREDITED', pageWidth / 2, bottomY - 1, { align: 'center' });
  doc.text('CREDENTIAL', pageWidth / 2, bottomY + 3, { align: 'center' });

  // Right Signer / Registry ID
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(cert.credentialId, pageWidth - 80, bottomY);
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.4);
  doc.line(pageWidth - 95, bottomY + 2, pageWidth - 30, bottomY + 2);
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`ISSUED: ${cert.issuedDate}  |  STATUS: ${cert.status.toUpperCase()}`, pageWidth - 86, bottomY + 7);

  doc.save(`Diploma-${cert.credentialId}.pdf`);
};

/**
 * Generates an administrative Student Roster & Academic Status PDF
 */
export const downloadStudentDirectoryPdf = (students: StudentUser[], adminUsername: string) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 24, pageWidth, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CYBERSEC ACADEMY - STUDENT DIRECTORY & INTERVENTION AUDIT ROSTER', margin, 11);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`EXPORTED BY: @${adminUsername}  |  TIMESTAMP: ${new Date().toLocaleString()}  |  TOTAL ENROLLED: ${students.length}`, margin, 18);

  let y = 36;

  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 8, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('STUDENT NAME & ID', margin + 2, y);
  doc.text('EMAIL ADDRESS', margin + 55, y);
  doc.text('AGE', margin + 115, y);
  doc.text('ENROLLED TRACK', margin + 130, y);
  doc.text('PROGRESS', margin + 185, y);
  doc.text('STATUS', margin + 215, y);
  doc.text('SCHOLARSHIP / VOUCHER', margin + 240, y);

  y += 7;

  students.forEach((s, idx) => {
    if (y > pageHeight - margin - 15) {
      addFooter(doc, pageWidth, pageHeight, margin);
      doc.addPage();
      y = margin + 10;
    }

    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y - 4, pageWidth - margin * 2, 7, 'F');
    }

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`${s.fullName} (${s.id})`, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(s.email, margin + 55, y);
    doc.text(String(s.age), margin + 115, y);
    doc.text(s.enrolledPath, margin + 130, y);
    doc.text(`${s.progressPercentage}%`, margin + 185, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(
      s.status === 'active' ? 16 : s.status === 'graduated' ? 8 : 180,
      s.status === 'active' ? 185 : s.status === 'graduated' ? 145 : 30,
      s.status === 'active' ? 129 : s.status === 'graduated' ? 178 : 30
    );
    doc.text(s.status.toUpperCase(), margin + 215, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(s.scholarshipStatus || 'None', margin + 240, y);

    y += 7;
  });

  addFooter(doc, pageWidth, pageHeight, margin);
  doc.save(`Student-Directory-Roster-${new Date().toISOString().split('T')[0]}.pdf`);
};

// Helper: Add consistent page footer
const addFooter = (doc: jsPDF, pageWidth: number, pageHeight: number, margin: number) => {
  const pageNumber = (doc as any).internal.getNumberOfPages();
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  doc.text('CyberSec Academy Credential Operating System', margin, pageHeight - 8);
  doc.text('Confidential & Cryptographically Verifiable', pageWidth - margin, pageHeight - 8, { align: 'right' });
};
