import { ScholarshipProgram } from '../types/cybersecurity';

export const SCHOLARSHIP_PROGRAMS: ScholarshipProgram[] = [
  {
    id: 'sch-youth-cyber',
    title: 'Next-Gen Youth Cyber Innovator Grant',
    focusDomain: 'Cybersecurity',
    ageBracket: 'youth-16-24',
    ageBracketLabel: 'Ages 16 – 24 (Students & Early Career)',
    grantAmount: '100% Full Tuition Grant',
    fundingValueUsd: 499,
    seatsRemaining: 42,
    description: 'Empowering high school seniors, vocational students, and university undergraduates to enter high-paying offensive and defensive cybersecurity roles without financial debt.',
    eligibility: [
      'Age between 16 and 24 years old at time of application',
      'Demonstrated interest in computer systems, programming, or digital safety',
      'Commitment to complete at least 2 learning path courses within 120 days',
      'No prior commercial cybersecurity employment required'
    ],
    benefits: [
      'Complete tuition waiver for Beginner & Intermediate Learning Paths',
      'Free verifiable digital credential issuance & permanent public registry listing',
      'Access to virtual hackathon and CTF mentoring sessions',
      'Direct resume forwarding to partner cybersecurity hiring managers'
    ],
    sponsor: 'Global Cyber Inclusion Alliance',
    badgeTag: 'Youth Cyber Fellowship'
  },
  {
    id: 'sch-career-transition',
    title: 'Mid-Career Transition & Workforce Reskilling Fellowship',
    focusDomain: 'Cybersecurity',
    ageBracket: 'transition-25-40',
    ageBracketLabel: 'Ages 25 – 40 (Career Changers & Returning Workers)',
    grantAmount: '100% Full Tuition Grant',
    fundingValueUsd: 699,
    seatsRemaining: 35,
    description: 'Designed specifically for non-technical workers (hospitality, retail, administration, manufacturing) seeking a transition into high-demand junior SOC analyst and security engineering roles.',
    eligibility: [
      'Age between 25 and 40 years old seeking career transition',
      'Displaced worker, underemployed individual, or career pivoter',
      'Willingness to dedicate 6-8 study hours weekly',
      'Brief 200-word statement of career intent'
    ],
    benefits: [
      'Full coverage of all course fees, lab sandboxes, and examinations',
      'Dedicated one-on-one portfolio review by a senior security engineer',
      'Free certification exam vouchers for Course 1-12 and Track B (SOC Analyst)',
      'Career transition toolkit with technical interview preparation guide'
    ],
    sponsor: 'Digital Workforce Transition Foundation',
    badgeTag: 'Adult Reskilling Grant'
  },
  {
    id: 'sch-senior-defense',
    title: 'Experienced Professionals & 40+ Cyber Defense Initiative',
    focusDomain: 'Digital Safety & Inclusion',
    ageBracket: 'senior-40-plus',
    ageBracketLabel: 'Ages 40+ (Experienced Professionals & Veterans)',
    grantAmount: '100% Full Tuition Grant',
    fundingValueUsd: 599,
    seatsRemaining: 28,
    description: 'Recognizing that seasoned analytical skills, military discipline, and diverse life experience produce world-class security auditors, threat investigators, and compliance leaders.',
    eligibility: [
      'Age 40 and above or military veteran of any age',
      'Desire to upskill into digital forensics, GRC compliance, or security architecture',
      'Commitment to mentor younger learners in the academy community forum'
    ],
    benefits: [
      'Full waiver of all certification issuance fees and transcript verification costs',
      'Flexible self-paced schedule tailored for working adults and caretakers',
      'Lifetime access to security architecture and ISO 27001 course modules',
      'Executive leadership and cybersecurity board governance briefing package'
    ],
    sponsor: 'Senior Digital Defense & Veteran Tech Council',
    badgeTag: 'Veteran & Senior Grant'
  },
  {
    id: 'sch-iot-embedded',
    title: 'IoT & Smart Device Hardware Security Fellowship',
    focusDomain: 'IoT Security',
    ageBracket: 'all-ages',
    ageBracketLabel: 'All Ages (Focus on IoT, Smart Cities & Embedded Firmware)',
    grantAmount: '100% Full Tuition Grant + Lab Kit',
    fundingValueUsd: 850,
    seatsRemaining: 19,
    description: 'Bridging the critical global shortage of Internet of Things (IoT) security specialists. Covers firmware reverse engineering, MQTT broker defense, Wi-Fi/Bluetooth penetration testing, and medical device hardware hardening.',
    eligibility: [
      'Open to all age brackets with passion for smart devices and embedded systems',
      'Completion of Course 3 (Networking Fundamentals) or equivalent basic knowledge',
      'Desire to build or defend real-world IoT smart infrastructure, automotive, or industrial SCADA'
    ],
    benefits: [
      'Interactive IoT Security Sandbox access with firmware analysis playground',
      'Full tuition grant covering Course 7, Course 15 (Cloud/IoT), and Track C',
      'Free Certified IoT Security Specialist digital credential',
      'IoT vulnerability disclosure guidelines and hardware safety templates'
    ],
    sponsor: 'Open IoT Security Alliance & Industrial Internet Consortium',
    badgeTag: 'IoT Innovation Fellow'
  }
];
