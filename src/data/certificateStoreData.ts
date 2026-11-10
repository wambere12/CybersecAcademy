import { CertificateProduct } from '../types/cybersecurity';

export const CERTIFICATE_PRODUCTS: CertificateProduct[] = [
  {
    id: 'prod-fnd',
    title: 'Cybersecurity Fundamentals Official Certificate',
    courseId: 'c1',
    level: 'Beginner',
    price: 49,
    originalPrice: 99,
    category: 'foundational',
    description: 'Accredited certificate verifying mastery of core cybersecurity principles, the CIA Triad, threat taxonomy, and foundational digital hygiene.',
    features: [
      'Individually serialized Credential ID & cryptographically signed QR Code',
      'Permanent listing in public verification database for employers and institutions',
      'High-resolution print-ready archival PDF diploma',
      'Official LinkedIn digital certification badge integration with 1-click addition'
    ],
    badgeName: 'Verified Fundamentals Credential',
    isPopular: true
  },
  {
    id: 'prod-net',
    title: 'Network Security Associate Certificate',
    courseId: 'c3',
    level: 'Beginner',
    price: 69,
    originalPrice: 129,
    category: 'foundational',
    description: 'Verifies mastery of TCP/IP protocols, packet analysis, Wireshark traffic inspection, subnetting, and firewall configurations.',
    features: [
      'Verifiable network defense competency credential',
      'Hands-on Wireshark lab completion endorsement',
      'Instant digital issuance upon exam clearance',
      'Employer-shareable public verification link'
    ],
    badgeName: 'Network Security Associate'
  },
  {
    id: 'prod-linux',
    title: 'Linux Systems Security Specialist Certificate',
    courseId: 'c6',
    level: 'Intermediate',
    price: 79,
    originalPrice: 149,
    category: 'professional',
    description: 'Validates production Linux hardening skills, user permission auditing, Bash automation, and SSH daemon security.',
    features: [
      'Interactive Linux lab completion verification stamp',
      'Permanent archival registry record with score transcript',
      'Shareable digital badge for developer and engineer profiles',
      'Enterprise vendor compliance validation'
    ],
    badgeName: 'Linux Security Specialist'
  },
  {
    id: 'prod-eth-hack',
    title: 'Certified Ethical Hacker (Track A Professional)',
    courseId: 'track-a',
    level: 'Specialized',
    price: 149,
    originalPrice: 299,
    category: 'specialized-track',
    description: 'Prestigious career track certification verifying offensive security competencies, vulnerability assessments, penetration testing, and ethical reporting.',
    features: [
      'Comprehensive red team proficiency endorsement',
      'Serialized QR verification code recognized globally',
      'Included practical capstone report approval record',
      'Direct inclusion into Academy alumni recruitment network'
    ],
    badgeName: 'Certified Ethical Hacker',
    isPopular: true
  },
  {
    id: 'prod-soc-analyst',
    title: 'Certified Security Operations Analyst (Track B)',
    courseId: 'track-b',
    level: 'Specialized',
    price: 149,
    originalPrice: 299,
    category: 'specialized-track',
    description: 'Validates defensive SOC operations: SIEM event correlation, threat hunting, incident containment, and post-mortem reporting.',
    features: [
      'Blue team incident response credential',
      'SIEM triage simulation endorsement',
      'Permanent cryptographic credential ID',
      'Digital badge + LinkedIn credential sync'
    ],
    badgeName: 'Certified SOC Analyst'
  },
  {
    id: 'prod-iot-security',
    title: 'Certified IoT & Embedded Systems Security Specialist',
    courseId: 'c7',
    level: 'Specialized',
    price: 129,
    originalPrice: 249,
    category: 'specialized-track',
    description: 'Specialized credential validating smart device firmware auditing, MQTT message security, IoT network segmentation, and hardware protection.',
    features: [
      'Specialized IoT hardware & firmware security endorsement',
      'Eligible for 100% scholarship fee waiver with voucher',
      'Industrial and smart city security compliance badge',
      'Serialized digital credential with QR instant verification'
    ],
    badgeName: 'Certified IoT Security Specialist',
    isPopular: true
  },
  {
    id: 'prod-all-access-bundle',
    title: 'Full Academy All-Access Career Credential Bundle',
    courseId: 'path-beginner',
    level: 'Specialized',
    price: 249,
    originalPrice: 799,
    category: 'enterprise-bundle',
    description: 'Complete lifetime access to all 21 course certificates, all 6 professional tracks, instructor portfolio reviews, and unlimited official verifications.',
    features: [
      'All 21 course certificates included with zero extra fees',
      'All 6 specialized track certifications unlocked upon completion',
      'Priority grading in instructor submission queues',
      'Personal letter of academic recommendation for employer reference'
    ],
    badgeName: 'Executive Cybersecurity Fellow'
  }
];
