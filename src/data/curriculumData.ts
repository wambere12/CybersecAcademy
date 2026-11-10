import { Course, LearningPath, Assessment, PracticalProject, Certificate, DiscussionThread } from '../types/cybersecurity';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-beginner',
    title: 'Cybersecurity Beginner',
    level: 'Beginner',
    description: 'Foundational entry into cybersecurity, computer architecture, network fundamentals, everyday cyber threats, and defensive hygiene.',
    objective: 'Introduce students to cybersecurity, computer systems, networks, common cyber threats, and fundamental digital security practices.',
    prerequisites: ['Basic digital literacy', 'No prior coding experience required'],
    courseIds: ['c1', 'c2', 'c3', 'c4', 'c5'],
    estimatedWeeks: 6,
    targetRole: 'Junior Security Associate / IT Support Specialist',
    iconName: 'Shield',
    completionRequirements: [
      'Complete all 5 required foundational courses and all lessons',
      'Pass all module quizzes with at least 70%',
      'Complete hands-on beginner practical exercises',
      'Pass the Beginner Final Comprehensive Examination with at least 70%'
    ]
  },
  {
    id: 'path-intermediate',
    title: 'Cybersecurity Intermediate',
    level: 'Intermediate',
    description: 'Core technical proficiencies: Linux systems engineering, network security defense, applied cryptography, web application security, ethical hacking, and incident monitoring.',
    objective: 'Develop rigorous technical skills in network security, Linux administration, web security, applied cryptography, and security operations monitoring.',
    prerequisites: ['Completion of Cybersecurity Beginner Path or equivalent foundational knowledge'],
    courseIds: ['c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'],
    estimatedWeeks: 12,
    targetRole: 'Junior SOC Analyst / Security Administrator / Penetration Tester Associate',
    iconName: 'Cpu',
    completionRequirements: [
      'Complete all 7 intermediate technical courses',
      'Pass all module assessments and technical lab challenges',
      'Submit approved practical project reports (Firewall, Wireshark, Web App Audit)',
      'Pass the Intermediate Final Comprehensive Examination with at least 75%'
    ]
  },
  {
    id: 'path-advanced',
    title: 'Cybersecurity Advanced',
    level: 'Advanced',
    description: 'Enterprise defense, advanced penetration testing, cloud architecture, digital forensics investigation, threat hunting, malware triage, and DevSecOps engineering.',
    objective: 'Prepare students for senior defensive engineering, red teaming, cloud security architecture, digital forensics, and executive security governance.',
    prerequisites: ['Completion of Cybersecurity Intermediate Path or 2+ years security experience'],
    courseIds: ['c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20', 'c21'],
    estimatedWeeks: 18,
    targetRole: 'Senior Security Engineer / Penetration Tester / Cloud Security Architect / SOC Lead',
    iconName: 'Lock',
    completionRequirements: [
      'Complete all 9 advanced enterprise modules',
      'Pass advanced technical assessments and simulated attack investigations',
      'Complete a capstone cybersecurity portfolio project',
      'Pass the Advanced Final Comprehensive Examination with at least 80%',
      'Demonstrate ethical and legal compliance understanding'
    ]
  },
  {
    id: 'path-specialized',
    title: 'Specialized Professional Tracks',
    level: 'Specialized',
    description: 'Career-tailored specialization paths designed to fast-track industry roles in Offensive Security, Threat Analysis, Forensics, Cloud, or DevSecOps.',
    objective: 'Equip graduates with specific job-ready competencies and role certifications for competitive industry cybersecurity positions.',
    prerequisites: ['Completion of Beginner & Intermediate foundations'],
    courseIds: ['track-a', 'track-b', 'track-c', 'track-d', 'track-e', 'track-f'],
    estimatedWeeks: 8,
    targetRole: 'Role-Specific Certified Specialist',
    iconName: 'Award',
    completionRequirements: [
      'Complete the selected professional track curriculum',
      'Submit track-specific practical project portfolio',
      'Pass professional specialty examination'
    ]
  }
];

export const COURSES: Course[] = [
  // ==========================================
  // BEGINNER COURSES (Courses 1 - 5)
  // ==========================================
  {
    id: 'c1',
    number: 1,
    pathId: 'path-beginner',
    title: 'Introduction to Cybersecurity',
    level: 'Beginner',
    description: 'Core concepts of information security, the CIA Triad, the distinction between InfoSec and CyberSec, threat landscape, and ethical principles.',
    estimatedHours: 12,
    prerequisites: [],
    learningObjectives: [
      'Define cybersecurity and explain its fundamental importance in modern society',
      'Differentiate between information security and cybersecurity',
      'Analyze and apply the CIA Triad (Confidentiality, Integrity, Availability) to real-world scenarios',
      'Identify the main sub-disciplines and career trajectories in cybersecurity',
      'Explain the fundamental ethical and legal boundaries of ethical hacking'
    ],
    modules: [
      {
        id: 'c1-m1',
        courseId: 'c1',
        order: 1,
        title: 'Foundations and the Security Landscape',
        description: 'What cybersecurity entails and why it underpins modern digital civilization.',
        lessons: [
          {
            id: 'c1-l1',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 1,
            title: 'What is Cybersecurity?',
            durationMinutes: 25,
            summary: 'Explore cybersecurity as the practice of protecting systems, networks, programs, devices, and data from digital attacks.',
            content: `Cybersecurity is the discipline and collection of technologies, processes, and controls designed to protect computer systems, networks, devices, programs, and data from unauthorized access, exploitation, damage, or theft.

In modern society, nearly every critical infrastructure—power grids, hospitals, financial systems, transportation networks, and water utilities—relies on interconnected computer systems. A failure in cybersecurity is no longer merely an IT inconvenience; it carries direct physical, financial, and national security implications.

The core objective of cybersecurity is establishing resilience: ensuring that systems can withstand attacks, recover quickly from inevitable incidents, and safeguard the privacy and safety of people whose lives depend on digital systems.`,
            realWorldExample: 'In 2021, the Colonial Pipeline ransomware attack halted 45% of the fuel supply to the US East Coast for six days, leading to panic buying and emergency declarations, demonstrating that cyber attacks directly impact the physical world.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Verifying network reachability and host connectivity using standard diagnostic utilities',
                code: '# Verify network connectivity to a host\nping -c 4 cloudflare.com\n\n# Trace network hops to identify intermediary routing\ntraceroute cloudflare.com',
                output: 'PING cloudflare.com (104.16.132.229): 56 data bytes\n64 bytes from 104.16.132.229: icmp_seq=0 ttl=58 time=12.4 ms\n--- cloudflare.com ping statistics ---\n4 packets transmitted, 4 packets received, 0.0% packet loss'
              }
            ],
            practicalExercise: {
              id: 'ex-c1-l1',
              title: 'Auditing Your Digital Footprint',
              objective: 'Map your personal digital touchpoints and identify potential attack surfaces.',
              instructions: [
                'List all accounts you log into weekly (email, banking, shopping, cloud).',
                'Identify whether each account uses a distinct password and Multi-Factor Authentication (MFA).',
                'Note which single account, if compromised, would cause the highest cascading damage (usually your primary email).'
              ],
              verificationHint: 'Primary email accounts are central identity hubs because password resets for all other services funnel through them.'
            },
            knowledgeCheck: {
              id: 'kc-c1-l1',
              question: 'Which of the following best describes the primary objective of cybersecurity?',
              type: 'single',
              options: [
                'Eliminating all computer software bugs permanently',
                'Protecting digital systems, networks, programs, and data from unauthorized access, damage, or disruption',
                'Monitoring employee productivity across corporate workstations',
                'Developing proprietary operating systems immune to internet connectivity'
              ],
              correctAnswers: [1],
              explanation: 'Cybersecurity centers on safeguarding systems, networks, and sensitive data from unauthorized exploitation, maintaining systemic resilience and trustworthiness.'
            }
          },
          {
            id: 'c1-l2',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 2,
            title: 'Importance of Cybersecurity',
            durationMinutes: 20,
            summary: 'Why cybersecurity is a critical pillar of national infrastructure, enterprise stability, and individual privacy.',
            content: `Digital transformation has moved critical assets from physical filing cabinets and vaults into distributed cloud servers, databases, and microchips.

1. Economic Impact: Cybercrime damages exceed trillions of dollars annually, draining capital through extortion, intellectual property theft, and system repair.
2. Privacy & Trust: Personal identifiable information (PII) including social security numbers, medical histories, and banking records must be rigorously guarded.
3. National Security: Cyber warfare and state-sponsored espionage target military systems, energy grids, and government elections.`,
            realWorldExample: 'A regional hospital hit by ransomware lost access to patient radiation therapy systems and had to divert emergency ambulances, proving how security protects human lives directly.',
            codeSnippets: [],
            practicalExercise: {
              id: 'ex-c1-l2',
              title: 'Critical Infrastructure Vulnerability Mapping',
              objective: 'Classify how digital dependency affects physical utilities in your local municipality.',
              instructions: [
                'Select a local public utility (water treatment, traffic signal control, hospital network).',
                'Document two ways an internet outage or unauthorized remote access could disrupt its service.',
                'Propose one offline fallback procedure that operators should maintain.'
              ],
              verificationHint: 'Air-gapping and manual analog overrides are classic defensive engineering controls.'
            }
          },
          {
            id: 'c1-l3',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 3,
            title: 'Information Security versus Cybersecurity',
            durationMinutes: 20,
            summary: 'Understanding the nuanced distinction between protecting information in all forms vs digital cyberspace.',
            content: `While frequently used interchangeably, Information Security (InfoSec) and Cybersecurity have distinct scopes:

- Information Security (InfoSec): The broad discipline of safeguarding information in ANY format—paper records, verbal conversations, whiteboards, magnetic tapes, and digital databases—from unauthorized access, alteration, or destruction.
- Cybersecurity: A specialized subset of InfoSec focused exclusively on protecting data, systems, networks, and devices operating within cyberspace (the internet, local networks, and computing hardware).

All cybersecurity is part of information security, but not all information security is cybersecurity (e.g., locking a physical filing cabinet or shredding paper records is InfoSec, not cybersecurity).`,
            realWorldExample: 'Shredding physical customer credit card slips in an office corresponds to InfoSec; configuring an SSL/TLS certificate on an e-commerce checkout page corresponds to Cybersecurity.',
            codeSnippets: []
          },
          {
            id: 'c1-l4',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 4,
            title: 'The CIA Triad: Confidentiality, Integrity, Availability',
            durationMinutes: 35,
            summary: 'Master the universal cornerstone model of security: Confidentiality, Integrity, and Availability.',
            content: `The CIA Triad is the bedrock framework used by security engineers to design and evaluate defensive controls:

1. Confidentiality: Ensuring that information is accessible only to those authorized to have access. Controls include encryption (AES, RSA), access control lists (ACLs), role-based access control (RBAC), and multi-factor authentication.
2. Integrity: Safeguarding the accuracy and completeness of information and software. Controls include cryptographic hash functions (SHA-256), digital signatures, checksums, and version control.
3. Availability: Ensuring that authorized users have timely and reliable access to information and associated assets when needed. Controls include redundant servers, uninterruptible power supplies (UPS), load balancers, and DDoS mitigation services.`,
            realWorldExample: 'Medical Records: Only your doctor can read your chart (Confidentiality); nobody can secretly alter your prescribed drug dosage from 5mg to 500mg (Integrity); the ER staff can pull up your chart immediately when you arrive in an ambulance (Availability).',
            diagramType: 'cia-triad',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Verifying data integrity using SHA-256 cryptographic hashing',
                code: '# Create a sample document\necho "Transfer $500 to Alice" > transaction.txt\n\n# Calculate original SHA-256 hash\nsha256sum transaction.txt\n\n# An attacker secretly tampers with the value\necho "Transfer $50000 to Eve" > transaction.txt\n\n# The hash immediately changes completely, proving violation of Integrity!\nsha256sum transaction.txt',
                output: 'Original: a718f0f3531bc2a98317769992fbbdd28db2e5e7dfdcf88fbd1c5eec780e9858  transaction.txt\nTampered: c6913c7ee80004fcf138dd2e684497e55ce910ff664c1c9b32c6674eb99fba30  transaction.txt'
              }
            ],
            practicalExercise: {
              id: 'ex-c1-l4',
              title: 'Interactive Cryptography & Integrity Lab',
              objective: 'Test how minor changes in plaintext completely mutate cryptographic checksums (Avalanche Effect).',
              instructions: [
                'Launch the Cryptography Workbench lab.',
                'Type a message and generate its SHA-256 digest.',
                'Change just one character or add a period and compare how drastically the hash output changes.'
              ],
              labType: 'crypto',
              verificationHint: 'Notice how the cryptographic hash looks entirely randomized even if only one bit flips.'
            },
            knowledgeCheck: {
              id: 'kc-c1-l4',
              question: 'A distributed denial of service (DDoS) attack that overwhelms a banking portal violates which pillar of the CIA Triad?',
              type: 'single',
              options: [
                'Confidentiality',
                'Integrity',
                'Availability',
                'Non-repudiation'
              ],
              correctAnswers: [2],
              explanation: 'A DDoS attack floods a service with traffic so legitimate users cannot access it, directly compromising Availability.'
            }
          },
          {
            id: 'c1-l5',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 5,
            title: 'Types of Cybersecurity Disciplines',
            durationMinutes: 25,
            summary: 'Explore network security, application security, cloud security, endpoint security, and identity governance.',
            content: `Modern cybersecurity is divided into several specialized operational domains:
- Network Security: Guarding network boundaries, traffic, routers, switches, and firewalls.
- Application Security (AppSec): Designing software and APIs free from vulnerabilities like SQL injection or cross-site scripting.
- Cloud Security: Securing shared-responsibility environments in AWS, Azure, and Google Cloud.
- Endpoint Security: Securing user workstations, laptops, mobile devices, and servers against malware.
- Identity & Access Management (IAM): Controlling who has access to which resources, enforcing principle of least privilege.`,
            realWorldExample: 'A financial institution employs network engineers to configure edge firewalls, AppSec engineers to review web code, and IAM analysts to enforce least-privilege employee permissions.',
            codeSnippets: []
          },
          {
            id: 'c1-l6',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 6,
            title: 'Cybersecurity Career Pathways',
            durationMinutes: 20,
            summary: 'Blue Team (defenders), Red Team (ethical hackers), Purple Team (collaborators), Forensics, and Governance roles.',
            content: `The cybersecurity industry offers diverse specialized career tracks:
- Blue Team (Defenders): SOC Analysts, Incident Responders, Security Engineers who monitor logs, detect anomalies, and harden systems.
- Red Team (Attackers): Ethical Hackers, Penetration Testers, and Red Team Operators who simulate adversary tactics with permission.
- Purple Team: Facilitators who bring Red and Blue teams together to test real detection capabilities.
- Digital Forensics & Incident Response (DFIR): Investigators who reconstruct compromised machines, preserve evidence, and analyze memory dumps.
- GRC (Governance, Risk, and Compliance): Analysts who audit policies against ISO 27001, NIST, GDPR, and HIPAA.`,
            realWorldExample: 'A junior SOC analyst reviews SIEM alerts, detects an unusual PowerShell script, and coordinates with the incident response team to quarantine the endpoint before data exfiltration occurs.',
            codeSnippets: []
          },
          {
            id: 'c1-l7',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 7,
            title: 'Key Security Principles and Terminology',
            durationMinutes: 30,
            summary: 'Defense-in-depth, Principle of Least Privilege, Zero Trust, Vulnerabilities, Threats, and Risks.',
            content: `Essential vocabulary and principles every practitioner must know:
- Vulnerability: A flaw, weakness, or bug in software, hardware, or process that can be exploited (e.g., an unpatched software buffer overflow).
- Threat: Any circumstance or actor capable of exploiting a vulnerability to cause harm (e.g., ransomware syndicate, malicious insider).
- Risk: The probability that a threat will exploit a vulnerability multiplied by the resulting impact (Risk = Threat × Vulnerability × Impact).
- Defense-in-Depth: Layering multiple independent security controls (firewall + endpoint antivirus + MFA + network segmentation) so that if one fails, others prevent compromise.
- Principle of Least Privilege (PoLP): Users and processes must be granted ONLY the minimum necessary permissions required to perform their authorized function.`,
            realWorldExample: 'Leaving an unpatched database on the public internet is a vulnerability; cybercriminals scanning for open ports are a threat; having your customer credit cards stolen is the realized risk.',
            diagramType: 'defense-in-depth',
            codeSnippets: []
          },
          {
            id: 'c1-l8',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 8,
            title: 'Introduction to Ethical Hacking and Rules of Engagement',
            durationMinutes: 30,
            summary: 'The crucial line between authorized security testing and illegal cybercrime.',
            content: `Ethical Hacking is the authorized practice of probing systems, networks, and applications for vulnerabilities using the same techniques and tools as malicious actors, but with explicit, legally binding written authorization.

Key Pillars of Ethical Hacking:
1. Written Authorization: Never perform testing without a signed Rules of Engagement (RoE) contract specifying targets, exclusions, and testing windows.
2. Respect Scope: Strictly adhere to the IP addresses, domains, and application boundaries defined in the authorization document.
3. Transparency and Reporting: Document every finding, provide reproducible proofs of concept, and deliver practical remediation advice.
4. Data Privacy: If sensitive production data is discovered, halt exploitation immediately and notify the system owner.

Testing systems without authorization is a violation of computer crime laws (such as the CFAA in the United States or the Computer Misuse Act in the UK) and carries severe criminal penalties regardless of intent.`,
            realWorldExample: 'A penetration tester discovering an unprotected S3 bucket with customer passports immediately screenshots the bucket directory list without downloading the documents, logs the finding, and notifies the client chief security officer within 15 minutes.',
            codeSnippets: []
          },
          {
            id: 'c1-l9',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 9,
            title: 'Cybersecurity Threats in Everyday Life',
            durationMinutes: 20,
            summary: 'How social engineering, phishing, rogue QR codes, and smishing target regular citizens daily.',
            content: `Attackers frequently target humans as the weakest link in the security chain:
- Phishing: Deceptive emails impersonating trusted brands (banks, postal services, IT support) with urgent calls to click malicious links or download infected attachments.
- Smishing & Vishing: SMS text message and voice call scams impersonating tax authorities or parcel delivery updates.
- Quishing: Malicious QR codes pasted over parking meters or restaurant menus redirecting users to credential-harvesting phishing sites.
- Credential Stuffing: Automated bots trying username/password pairs stolen from past data breaches on other unrelated websites.`,
            realWorldExample: 'Receiving a text saying "Your parcel delivery has failed. Click this link to confirm your postal address and pay $1.50 customs fee," which leads to a fake postal portal stealing credit card numbers.',
            codeSnippets: []
          },
          {
            id: 'c1-l10',
            moduleId: 'c1-m1',
            courseId: 'c1',
            number: 10,
            title: 'Course 1 Review and Assessment Preparation',
            durationMinutes: 20,
            summary: 'Synthesize core concepts and prepare for the Course 1 Final Assessment.',
            content: `Congratulations on completing the introductory modules! You have learned:
- The broad scope of cybersecurity and its systemic societal importance.
- The distinction between Information Security and Cybersecurity.
- The CIA Triad: Confidentiality (secrecy), Integrity (trustworthiness), Availability (accessibility).
- Security principles: Defense-in-Depth, Principle of Least Privilege, and Risk formulas.
- Ethical hacking boundaries: written consent, strict scoping, and legal compliance.

Now proceed to take the Course 1 Assessment to test your comprehension and earn credits toward your Cybersecurity Fundamentals Certificate!`,
            realWorldExample: 'Review all terms and practice identifying scenarios involving confidentiality vs integrity vs availability breaches.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c1',
    practicalProjectId: 'proj-c1',
    certificateType: 'Cybersecurity Fundamentals Certificate',
    status: 'published'
  },

  // Course 2
  {
    id: 'c2',
    number: 2,
    pathId: 'path-beginner',
    title: 'Computer and Operating System Fundamentals',
    level: 'Beginner',
    description: 'Hardware architecture, CPU, RAM, storage, operating system internals, Windows vs Linux administration, process management, and patch hygiene.',
    estimatedHours: 14,
    prerequisites: ['c1'],
    learningObjectives: [
      'Explain computer hardware components and the role of the operating system',
      'Navigate Windows and Linux operating systems via GUI and command-line interfaces',
      'Manage files, folders, and access control permissions',
      'Inspect running processes, background services, and monitor resource consumption',
      'Formulate patch management strategies to defend against unpatched CVE vulnerabilities'
    ],
    modules: [
      {
        id: 'c2-m1',
        courseId: 'c2',
        order: 1,
        title: 'Hardware & OS Architecture',
        description: 'How hardware and operating system kernels interact.',
        lessons: [
          {
            id: 'c2-l1',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 1,
            title: 'Computer Hardware and Software Fundamentals',
            durationMinutes: 25,
            summary: 'Understanding CPU, RAM, persistent storage, buses, firmware/BIOS/UEFI, and system architecture.',
            content: `Every cyber attack ultimately targets or executes upon computer hardware through software layers:
- CPU (Central Processing Unit): The brain executing instructions in binary machine code. Features user mode (ring 3) and kernel mode (ring 0).
- RAM (Random Access Memory): Volatile memory holding active programs and unencrypted data. Critical for digital forensics memory captures.
- Persistent Storage: SSDs and HDDs storing non-volatile files, system binaries, and logs.
- Motherboard & Buses: PCIe, USB, and memory controllers facilitating communication between components.
- UEFI/BIOS: Firmware initializing hardware before loading the OS bootloader. Vulnerable to bootkits if Secure Boot is disabled.`,
            realWorldExample: 'Forensic investigators frequently extract cryptographic BitLocker keys directly from volatile RAM before powering down a seized suspect laptop.',
            codeSnippets: []
          },
          {
            id: 'c2-l2',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 2,
            title: 'Operating System Fundamentals & Kernel Architecture',
            durationMinutes: 30,
            summary: 'The role of the OS kernel, user space vs kernel space, system calls, and device drivers.',
            content: `An Operating System (OS) manages hardware resources and provides common services for application programs.
- Kernel: The core program with complete control over everything in the system, operating in privileged Kernel Mode (Ring 0).
- User Space: Standard applications (browsers, word processors) execute in restricted User Mode (Ring 3), isolated from direct hardware access.
- System Calls (Syscalls): The controlled API bridges user applications use to request kernel services (e.g., opening a file, sending a network packet).
- Drivers: Specialized kernel modules interfacing with specific hardware devices. A vulnerable driver can allow kernel-level privilege escalation.`,
            realWorldExample: 'Rootkits attempt to install themselves into Ring 0 kernel space to hide their processes, files, and network connections from standard antivirus running in Ring 3.',
            codeSnippets: []
          },
          {
            id: 'c2-l3',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 3,
            title: 'Windows Operating System Basics & Security Controls',
            durationMinutes: 30,
            summary: 'Windows architecture, Registry, NTFS permissions, User Account Control (UAC), and PowerShell.',
            content: `Windows dominates desktop and enterprise Active Directory environments:
- Registry: Hierarchical database storing system and software configurations (HKLM, HKCU). Attackers frequently abuse registry keys (Run, RunOnce) for persistence.
- NTFS Access Control: Discretionary Access Control Lists (DACLs) define which users/groups can Read, Write, or Execute files.
- User Account Control (UAC): Prompts users for administrative consent when executing privileged tasks, mitigating silent malware installation.
- Windows Defender: Built-in endpoint protection providing real-time scanning, cloud-delivered protection, and behavioral monitoring.`,
            realWorldExample: 'Malware often creates an entry in `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` so that its payload launches automatically every time the user logs in.',
            codeSnippets: [
              {
                language: 'powershell',
                description: 'Inspecting running processes and startup registry keys in PowerShell',
                code: '# List processes sorted by CPU usage\nGet-Process | Sort-Object CPU -Descending | Select-Object -First 10\n\n# Query startup persistence keys\nGet-ItemProperty "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"',
                output: 'Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id ProcessName\n-------  ------    -----      -----     ------     -- -----------\n   1240      89   142850     198420     184.22   4920 chrome'
              }
            ]
          },
          {
            id: 'c2-l4',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 4,
            title: 'Linux Operating System Introduction & Directory Hierarchy',
            durationMinutes: 30,
            summary: 'Linux filesystem hierarchy standard (/etc, /var, /bin, /home), CLI philosophy, and root authority.',
            content: `Linux powers the vast majority of web servers, cloud containers, security appliances, and smartphones (Android):
- Directory Structure: Starts at root '/'.
  - '/bin' and '/usr/bin': Essential executable commands.
  - '/etc': System-wide configuration files (e.g., '/etc/passwd', '/etc/ssh/sshd_config').
  - '/var/log': System and application logs, vital for security monitoring.
  - '/home': Standard user personal directories.
  - '/root': Home directory for the superuser.
- Superuser (root): User ID 0 possessing unrestricted administrative authority. Security best practice requires using \`sudo\` for privileged commands rather than logging in directly as root.`,
            realWorldExample: 'Security analysts inspecting a web server compromise will immediately examine `/var/log/apache2/access.log` to check which IP addresses submitted malicious POST requests.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Navigating Linux directories and inspecting files',
                code: '# Print current working directory\npwd\n\n# List files with detailed permissions and timestamps\nls -la /etc/passwd\n\n# Display file contents safely\nhead -n 5 /etc/passwd',
                output: '-rw-r--r-- 1 root root 2842 Nov  8 14:20 /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin'
              }
            ],
            practicalExercise: {
              id: 'ex-c2-l4',
              title: 'Interactive Linux Terminal Navigation',
              objective: 'Use command-line utilities to inspect system users and examine file properties.',
              instructions: [
                'Open the interactive Linux Terminal Lab.',
                'Run `pwd` and `ls -la` to check your environment.',
                'Inspect the users list using `cat /etc/passwd`.'
              ],
              labType: 'terminal',
              verificationHint: 'Look for user UID numbers: UID 0 is root, standard users start at UID 1000.'
            }
          },
          {
            id: 'c2-l5',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 5,
            title: 'Files, Folders, and Permissions (chmod, chown, ACLs)',
            durationMinutes: 35,
            summary: 'Mastering read, write, execute permissions in octal and symbolic modes, and SUID/SGID bits.',
            content: `Permission models enforce confidentiality and integrity of files:
- Linux Permissions: 3 sets of permissions for User (u), Group (g), and Others (o).
  - Read (r = 4): View file contents or list directory files.
  - Write (w = 2): Modify file contents or create/delete files in directory.
  - Execute (x = 1): Run file as binary/script or traverse directory.
- Octal Representation:
  - 755 = rwxr-xr-x (Owner can read/write/execute; group and others can read/execute).
  - 600 = rw------- (Owner can read/write; nobody else has any access—standard for SSH private keys).
  - 644 = rw-r--r-- (Owner can read/write; all others read only—standard for public web files).
- SUID (Set User ID, 4000): When set on an executable, runs with the permissions of the file owner (often root) instead of the invoking user. Misconfigured SUID binaries are a primary vector for privilege escalation!`,
            realWorldExample: 'Leaving an SSH private key `~/.ssh/id_rsa` with permissions 777 causes OpenSSH clients to reject the key outright with the error "Permissions 0777 for id_rsa are too open."',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Changing file permissions and ownership in Linux',
                code: '# Restrict private key to owner read-write only\nchmod 600 ~/.ssh/id_rsa\n\n# Change file owner and group\nchown analyst:secops /opt/evidence.raw\n\n# Find dangerous SUID binaries\nfind / -perm -4000 2>/dev/null',
                output: '/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/chsh'
              }
            ],
            practicalExercise: {
              id: 'ex-c2-l5',
              title: 'Hardening Sensitive File Permissions',
              objective: 'Audit and fix dangerous open permissions on confidential files.',
              instructions: [
                'In the Linux Terminal Lab, inspect the permissions of `id_rsa` using `ls -l`.',
                'Fix the insecure permissions by executing `chmod 600 id_rsa`.',
                'Verify with `ls -l` that only the owner has read/write permissions.'
              ],
              labType: 'terminal',
              verificationHint: 'The output should display `-rw-------`.'
            }
          },
          {
            id: 'c2-l6',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 6,
            title: 'Users, Groups, and Administrator Accounts',
            durationMinutes: 25,
            summary: 'Managing credentials, the /etc/shadow file, password hashing, and group memberships.',
            content: `User management is the frontline of access control:
- Standard Users vs Administrative Accounts: Operating on day-to-day tasks with standard user rights prevents compromised web browsers or email attachments from immediately taking over the whole system.
- Password Storage:
  - '/etc/passwd': World-readable file containing username, UID, GID, home directory, and default shell.
  - '/etc/shadow': Restricted file (readable only by root) containing cryptographic password hashes (e.g., salted SHA-512 or yescrypt hashes).
- Group Policies: Group permissions allow assigning access rights collectively to departments (e.g., \`sudoers\`, \`developers\`, \`finance\`).`,
            realWorldExample: 'If an employee in accounting is tricked into running malware while logged into a standard Windows account, the malware is blocked from modifying C:\\Windows\\System32.',
            codeSnippets: []
          },
          {
            id: 'c2-l7',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 7,
            title: 'Processes, Services, and Daemons',
            durationMinutes: 30,
            summary: 'Monitoring running tasks, detecting rogue processes, and managing systemd services.',
            content: `Every running program is a process assigned a unique Process ID (PID):
- Services / Daemons: Background processes running continuously without a graphical interface (e.g., web server 'nginx', SSH server 'sshd').
- Process Inspection Tools:
  - Linux: 'ps aux', 'top', 'htop', 'systemctl status'.
  - Windows: Task Manager, Resource Monitor, Sysinternals Process Explorer.
- Indicators of Compromise in Processes:
  - Processes spawning from unusual directories (e.g., '/tmp' or 'C:\\Users\\AppData\\Local\\Temp').
  - Processes consuming 100% CPU unexpectedly (e.g., cryptocurrency miners).
  - Processes masquerading with names similar to system services (e.g., \`svch0st.exe\` with a zero instead of an 'o').`,
            realWorldExample: 'Security analysts discovered a cryptojacking infection when Linux database servers spiked to 99% CPU utilization running an unauthorized binary named `kdevtmpfsi` spawned from `/tmp`.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Investigating suspicious processes and service status',
                code: '# Check process tree and command line arguments\nps aux | grep -i "python\\|bash\\|nc"\n\n# Check status of the firewall service\nsystemctl status ufw\n\n# Terminate a rogue process safely\nkill -15 4892',
                output: 'analyst  4892  0.0  0.1  12480  3210 pts/0  S+  14:32  0:00 nc -lvp 4444'
              }
            ]
          },
          {
            id: 'c2-l8',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 8,
            title: 'System Updates, Vulnerabilities, and Patch Management',
            durationMinutes: 25,
            summary: 'Why unpatched software is the top cyber attack vector and how to build automated patch cycles.',
            content: `Software inevitably contains bugs. When a bug has security ramifications, it is classified as a vulnerability and assigned a Common Vulnerabilities and Exposures (CVE) identifier:
- Zero-Day Vulnerability: A security flaw known to attackers or researchers before the vendor has developed or distributed a security patch.
- Patch Management Lifecycle:
  1. Discovery & Inventory: Identify all software versions running across the enterprise.
  2. Vulnerability Scanning: Detect outdated libraries and missing security updates.
  3. Testing in Staging: Validate that updates do not break business operations.
  4. Deployment & Verification: Roll out patches systematically and rescan endpoints.`,
            realWorldExample: 'The devastating 2017 Equifax data breach (exposing 147 million records) occurred because Apache Struts vulnerability CVE-2017-5638 was left unpatched for over two months after a security fix was published.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Updating packages and applying security patches on Debian/Ubuntu systems',
                code: '# Refresh repository package lists\nsudo apt update\n\n# Upgrade all installed packages to latest security releases\nsudo apt upgrade -y\n\n# Remove unused dependencies and kernels\nsudo apt autoremove -y',
                output: 'Reading package lists... Done\nBuilding dependency tree... Done\n23 packages can be upgraded. Run apt list --upgradable.\nUpgrading libssl3, openssl, linux-image-generic...'
              }
            ]
          },
          {
            id: 'c2-l9',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 9,
            title: 'Basic System Troubleshooting & Event Logs',
            durationMinutes: 25,
            summary: 'Using Windows Event Viewer and Linux /var/log to diagnose anomalous system behavior.',
            content: `Operating systems log critical events, errors, and authentication attempts:
- Windows Event Viewer:
  - Security Log: Records Event ID 4624 (Successful Logon), Event ID 4625 (Failed Logon - brute force indicator), Event ID 4720 (User Created).
  - System Log: Driver crashes, service failures, hardware alerts.
- Linux Logs:
  - '/var/log/auth.log' (Debian/Ubuntu) or '/var/log/secure' (RHEL/CentOS): Tracks SSH logins, sudo executions, and failed password attempts.
  - '/var/log/syslog': General system daemon and operational messages.
- Command-line Log Search:
  - Using \`grep\` to filter for attack patterns like rapid repeated failed root logins.`,
            realWorldExample: 'Detecting 500 failed SSH login attempts from an unknown external IP address within 60 seconds in `/var/log/auth.log` is a textbook signature of an automated SSH brute force attack.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Searching authentication logs for failed password attempts',
                code: '# Count failed login attempts in auth log\ngrep "Failed password" /var/log/auth.log | head -n 5\n\n# Extract attacking IP addresses\ngrep "Failed password" /var/log/auth.log | awk \'{print $(NF-3)}\' | sort | uniq -c | sort -nr',
                output: 'Nov 10 04:12:01 server sshd[1204]: Failed password for invalid user admin from 198.51.100.44 port 48212 ssh2\nNov 10 04:12:03 server sshd[1208]: Failed password for root from 198.51.100.44 port 48216 ssh2\n   245 198.51.100.44'
              }
            ]
          },
          {
            id: 'c2-l10',
            moduleId: 'c2-m1',
            courseId: 'c2',
            number: 10,
            title: 'Practical Operating System Hardening Assessment',
            durationMinutes: 25,
            summary: 'Comprehensive review of OS security configurations, baseline checklists, and final course assessment.',
            content: `Hardening is the process of reducing an operating system's attack surface by:
- Disabling unnecessary services, ports, and protocols (e.g., Telnet, SMBv1).
- Enforcing strong authentication and password complexity policies.
- Configuring host-based firewalls (Windows Defender Firewall, Linux UFW/iptables).
- Setting strict file permissions on configuration directories.
- Enabling automatic critical security updates.
- Following CIS (Center for Internet Security) Benchmarks for structured hardening standards.`,
            realWorldExample: 'Following the CIS Benchmark for Ubuntu Linux disabled root SSH logins, configured automatic security updates, and reduced unauthorized lateral movement opportunities by 85%.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c2',
    practicalProjectId: 'proj-c2',
    certificateType: 'Computer & OS Security Associate',
    status: 'published'
  },

  // Course 3
  {
    id: 'c3',
    number: 3,
    pathId: 'path-beginner',
    title: 'Networking Fundamentals',
    level: 'Beginner',
    description: 'LAN, WAN, IP addressing (IPv4/IPv6), subnetting, MAC addresses, DNS, DHCP, TCP vs UDP, HTTP/HTTPS, ports, and firewall fundamentals.',
    estimatedHours: 16,
    prerequisites: ['c1'],
    learningObjectives: [
      'Contrast LAN, WAN, and MAN network topologies and recognize common hardware devices',
      'Explain IPv4, IPv6, MAC addressing, and subnet masks',
      'Deconstruct the operational mechanics of DNS, DHCP, TCP handshakes, and UDP datagrams',
      'Identify well-known ports and security implications of unencrypted legacy protocols',
      'Configure packet-filtering firewall rules and diagnose network connectivity anomalies'
    ],
    modules: [
      {
        id: 'c3-m1',
        courseId: 'c3',
        order: 1,
        title: 'Network Architecture & Addressing',
        description: 'How devices communicate across interconnected networks.',
        lessons: [
          {
            id: 'c3-l1',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 1,
            title: 'Introduction to Computer Networks',
            durationMinutes: 25,
            summary: 'The OSI 7-Layer Model versus TCP/IP 4-Layer Model and how data packets travel across the globe.',
            content: `A computer network is two or more computing devices connected together to share data and resources:
- OSI 7-Layer Model:
  - Layer 7: Application (HTTP, DNS, SSH)
  - Layer 6: Presentation (SSL/TLS, ASCII, JPEG)
  - Layer 5: Session (RPC, NetBIOS)
  - Layer 4: Transport (TCP, UDP) - segments
  - Layer 3: Network (IP, ICMP) - packets
  - Layer 2: Data Link (Ethernet, MAC addresses, ARP) - frames
  - Layer 1: Physical (cables, radio waves, electrical bits)
- TCP/IP 4-Layer Model:
  - Application -> Transport -> Internet -> Network Access.
- Encapsulation: As data moves down the stack, each layer wraps the payload with its own protocol header.`,
            realWorldExample: 'When you type a web URL, your browser generates an HTTP GET request (Layer 7), wraps it in a TCP segment (Layer 4), wraps that in an IP packet (Layer 3), and encodes it into an Ethernet frame (Layer 2).',
            diagramType: 'osi-stack',
            codeSnippets: []
          },
          {
            id: 'c3-l2',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 2,
            title: 'LAN, WAN, MAN and Network Topologies',
            durationMinutes: 20,
            summary: 'Local Area Networks, Wide Area Networks, Metropolitan Area Networks, and topological models.',
            content: `Networks are classified by geographic reach and topology:
- LAN (Local Area Network): Confined to a single room, home, or office building. Characterized by high data transfer speeds and low latency.
- WAN (Wide Area Network): Spans cities, countries, or the globe. The Internet is the world's largest WAN.
- MAN (Metropolitan Area Network): Spans a single city or campus.
- Topologies: Star (central switch - most common), Mesh (redundant interconnections - common in data centers), and Bus.`,
            realWorldExample: 'A home Wi-Fi network connecting your laptop, smart TV, and phone is a LAN; the fiber optic trunk lines connecting your ISP to overseas data centers form the WAN.',
            codeSnippets: []
          },
          {
            id: 'c3-l3',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 3,
            title: 'Network Devices: Hubs, Switches, Routers, and Access Points',
            durationMinutes: 25,
            summary: 'Understand device functions, collision domains, broadcast domains, and MAC forwarding tables.',
            content: `Different devices operate at different layers of the OSI stack:
- Hub (Layer 1): Obsolete legacy device that repeats electrical signals to every port. Extremely insecure because any connected device can sniff all traffic.
- Switch (Layer 2): Intelligent device that inspects destination MAC addresses and forwards frames ONLY to the designated recipient port using a CAM table.
- Router (Layer 3): Connects disparate networks together (e.g., your home LAN to the public Internet), forwarding IP packets using routing tables.
- Wireless Access Point (WAP): Bridges radio wireless frequencies (802.11) with wired Ethernet.`,
            realWorldExample: 'On an old hub, an attacker running Wireshark could capture everyone’s cleartext passwords effortlessly. On a modern switch, an attacker must resort to ARP poisoning or MAC flooding to intercept traffic.',
            codeSnippets: []
          },
          {
            id: 'c3-l4',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 4,
            title: 'IP Addresses: Structure and Hierarchical Routing',
            durationMinutes: 30,
            summary: 'Public vs Private IP addresses (RFC 1918), NAT, and CIDR notation.',
            content: `An IP (Internet Protocol) address provides a unique logical identifier for a host on a network:
- Public IP: Globally routable across the public Internet, assigned by ISPs.
- Private IP (RFC 1918): Non-routable on the public internet, used within private home and enterprise LANs:
  - 10.0.0.0 to 10.255.255.255 (Class A, 10.0.0.0/8)
  - 172.16.0.0 to 172.31.255.255 (Class B, 172.16.0.0/12)
  - 192.168.0.0 to 192.168.255.255 (Class C, 192.168.0.0/16)
- NAT (Network Address Translation): Enables hundreds of internal devices with private IPs to share a single public IP address when accessing internet services, providing an implicit layer of ingress protection.`,
            realWorldExample: 'Your laptop has an internal IP like `192.168.1.15`, but when visiting whatismyip.com, websites see your router’s public IP assigned by your ISP.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Inspecting local IP address and network interfaces',
                code: '# Display network interfaces, IP addresses, and CIDR masks\nip addr show\n\n# View the default gateway / routing table\nip route show',
                output: '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP\n    inet 192.168.1.105/24 brd 192.168.1.255 scope global eth0\ndefault via 192.168.1.1 dev eth0 proto dhcp metric 100'
              }
            ]
          },
          {
            id: 'c3-l5',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 5,
            title: 'IPv4 versus IPv6',
            durationMinutes: 20,
            summary: 'Address exhaustion, 32-bit dotted-decimal vs 128-bit hexadecimal, and built-in IPsec features.',
            content: `The global transition from IPv4 to IPv6 addresses the exhaustion of IPv4 space:
- IPv4: 32-bit address space, yielding approximately 4.3 billion possible addresses ($2^{32}$). Represented in 4 dotted decimal octets (e.g., '192.0.2.1').
- IPv6: 128-bit address space, yielding $3.4 \\times 10^{38}$ possible addresses ($2^{128}$). Represented in 8 groups of 4 hexadecimal characters (e.g., '2001:0db8:85a3:0000:0000:8a2e:0370:7334').
- Security Features: IPv6 was designed with IPsec (cryptographic encryption and authentication headers) built into the baseline specification, eliminates broadcast storms, and removes the necessity of NAT.`,
            realWorldExample: 'Mobile phone cellular carriers routinely assign native IPv6 addresses to millions of smartphone devices without running out of unique addresses.',
            codeSnippets: []
          },
          {
            id: 'c3-l6',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 6,
            title: 'MAC Addresses and the Address Resolution Protocol (ARP)',
            durationMinutes: 25,
            summary: 'Layer 2 physical addressing, OUI vendor prefixes, ARP broadcast queries, and ARP spoofing attacks.',
            content: `While IP addresses are logical Layer 3 addresses that change when moving networks, MAC (Media Access Control) addresses are hardware identifiers burned into network interface cards (NICs):
- Structure: 48-bit (6 octets) hexadecimal address (e.g., '00:1A:2B:3C:4D:5E').
  - First 24 bits: Organizationally Unique Identifier (OUI) assigned to manufacturer (e.g., Apple, Intel).
  - Last 24 bits: Device unique serial number.
- ARP (Address Resolution Protocol): Resolves known IP addresses to local Layer 2 MAC addresses.
  - "Who has 192.168.1.1? Tell 192.168.1.15" (Broadcast to 'FF:FF:FF:FF:FF:FF').
  - "192.168.1.1 is at 00:1A:2B:3C:4D:5E" (Unicast reply).
- Security Risk (ARP Spoofing): ARP has no built-in authentication. An attacker can send unsolicited ARP replies claiming to own the default gateway IP, executing a Man-in-the-Middle (MitM) attack!`,
            realWorldExample: 'An attacker using Ettercap or Arpspoof sends poisoned ARP responses to trick a victim computer into routing all its internet traffic through the attacker’s laptop.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Inspecting local ARP cache table',
                code: '# Display local ARP cache\nip neigh show\n\n# Or legacy arp command\narp -a',
                output: '192.168.1.1 dev eth0 lladdr 00:11:32:9c:4a:21 REACHABLE\n192.168.1.50 dev eth0 lladdr a4:83:e7:2b:81:40 STALE'
              }
            ]
          },
          {
            id: 'c3-l7',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 7,
            title: 'DNS and DHCP: The Backbone Services',
            durationMinutes: 30,
            summary: 'Domain Name System resolution hierarchy, DNS cache poisoning, and DHCP lease negotiation (DORA).',
            content: `Two services make modern networking usable for humans:
- DNS (Domain Name System): The phonebook of the Internet. Resolves human-readable domain names ('example.com') into computer-routable IP addresses ('93.184.216.34').
  - Hierarchy: Root DNS servers ('.') -> TLD servers ('.com', '.org') -> Authoritative nameservers.
  - Security Vulnerabilities: DNS spoofing/cache poisoning redirects users to phishing replicas; DNS tunneling exfiltrates sensitive corporate data through firewalls using encoded subdomains.
- DHCP (Dynamic Host Configuration Protocol): Automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to joining devices via the DORA process:
  - Discover -> Offer -> Request -> Acknowledge.
  - Rogue DHCP attacks can provide poisoned DNS servers to all connecting network clients.`,
            realWorldExample: 'Attackers create rogue Wi-Fi access points running custom DHCP servers that hand out attacker-controlled DNS servers, silently redirecting banking requests to credential-harvesting phishing clones.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Querying DNS records using dig and nslookup',
                code: '# Perform detailed DNS lookup for A records\ndig google.com +short\n\n# Query mail exchange (MX) records\ndig google.com MX +short\n\n# Test with a specific secure DNS resolver (Cloudflare 1.1.1.1)\ndig @1.1.1.1 github.com',
                output: '142.250.187.206\n10 smtp.google.com.'
              }
            ]
          },
          {
            id: 'c3-l8',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 8,
            title: 'TCP versus UDP: Transport Layer Mechanics',
            durationMinutes: 30,
            summary: 'TCP Three-Way Handshake (SYN, SYN-ACK, ACK), reliable delivery vs connectionless UDP speed.',
            content: `The Transport Layer (Layer 4) manages end-to-end communication between applications:
- TCP (Transmission Control Protocol):
  - Connection-Oriented: Establishes a session before transmitting data.
  - Three-Way Handshake:
    1. Client sends 'SYN' (Synchronize sequence number).
    2. Server replies 'SYN-ACK' (Synchronize-Acknowledge).
    3. Client responds 'ACK' (Acknowledge).
  - Reliable: Retransmits lost packets, guarantees sequence order, performs flow control.
  - Used by: Web browsing (HTTP/HTTPS), file transfer (SFTP), email (SMTP/IMAP), remote access (SSH).
- UDP (User Datagram Protocol):
  - Connectionless: Sends packets ("fire and forget") without handshakes or acknowledgments.
  - Fast, low overhead, no retransmission delays.
  - Used by: Streaming video, VoIP calls, online gaming, DNS queries, DHCP, NTP.
  - Exploit Vector: UDP lacks handshake validation, making it the primary vehicle for IP spoofing and amplification DDoS attacks (NTP/DNS amplification).`,
            realWorldExample: 'A SYN Flood DDoS attack sends millions of spoofed TCP SYN packets without ever completing the handshake, exhausting the target server’s memory buffer (backlog queue).',
            codeSnippets: []
          },
          {
            id: 'c3-l9',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 9,
            title: 'HTTP and HTTPS: Web Protocols & TLS Encryption',
            durationMinutes: 30,
            summary: 'Cleartext HTTP vulnerabilities, SSL/TLS handshake, certificates, and HTTPS encryption in transit.',
            content: `Web traffic travels over HTTP and HTTPS:
- HTTP (Port 80): Hypertext Transfer Protocol. Transmits data in clear, unencrypted plaintext. Anyone positioned on the local Wi-Fi or network routing path can inspect sensitive passwords, session cookies, and form data using network sniffers.
- HTTPS (Port 443): HTTP Secure. Wraps standard HTTP within a cryptographic TLS (Transport Layer Security) tunnel.
  - Confidentiality: Encrypts payload data so eavesdroppers only see scrambled ciphertext.
  - Integrity: Cryptographic MAC checks prevent in-flight tampering or injection.
  - Authentication: Validates that the website domain actually matches the public certificate signed by a trusted Certificate Authority (CA).`,
            realWorldExample: 'Connecting to an unencrypted HTTP login form at a coffee shop allows someone sitting two tables away to steal your session cookies using Wireshark.',
            codeSnippets: []
          },
          {
            id: 'c3-l10',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 10,
            title: 'Ports and Protocols: The Well-Known Port Directory',
            durationMinutes: 25,
            summary: 'Port numbers (0-65535), Well-known ports (0-1023), and recognizing critical network services.',
            content: `Ports allow a single host with one IP address to run dozens of distinct network services simultaneously:
- Port Range: 0 to 65,535 (16-bit integer).
  - Well-Known Ports: 0 - 1023 (Reserved for system privileged services).
  - Registered Ports: 1024 - 49151.
  - Dynamic / Ephemeral Ports: 49152 - 65535.
- Essential Ports for Security Analysts:
  - 20/21: FTP (Insecure cleartext file transfer)
  - 22: SSH (Secure Shell) / SFTP
  - 23: Telnet (Insecure cleartext remote shell - high security finding!)
  - 25: SMTP (Email routing)
  - 53: DNS (Domain resolution - TCP/UDP)
  - 80: HTTP (Unencrypted web)
  - 110: POP3 (Insecure email retrieval)
  - 143: IMAP (Email retrieval)
  - 443: HTTPS (Encrypted web)
  - 445: SMB (Server Message Block - Windows file sharing, targeted by EternalBlue/WannaCry)
  - 3389: RDP (Remote Desktop Protocol)`,
            realWorldExample: 'Finding port 23 (Telnet) open on an enterprise router is a severe security audit finding because all administrative passwords entered over Telnet travel across the network in plaintext.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Checking open listening ports and active sockets',
                code: '# List listening TCP and UDP sockets with process names\nss -tulnp\n\n# Or legacy netstat command\nnetstat -tuln',
                output: 'Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process\ntcp    LISTEN  0       128            0.0.0.0:22          0.0.0.0:*      users:(("sshd",pid=842,fd=3))\ntcp    LISTEN  0       511            0.0.0.0:443         0.0.0.0:*      users:(("nginx",pid=1120,fd=6))\ntcp    LISTEN  0       511            0.0.0.0:80          0.0.0.0:*      users:(("nginx",pid=1120,fd=7))'
              }
            ]
          },
          {
            id: 'c3-l11',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 11,
            title: 'Introduction to Firewalls: Filtering Packets',
            durationMinutes: 30,
            summary: 'Stateless vs Stateful packet inspection, Next-Gen Firewalls, and default-deny rule architectures.',
            content: `A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules:
- Packet-Filtering (Stateless): Evaluates each packet in isolation based on Source IP, Destination IP, Source Port, Destination Port, and Protocol.
- Stateful Inspection: Tracks active connections (e.g., maintaining state tables). Understands if an inbound packet is a legitimate reply to an outbound request initiated by an internal client.
- Next-Generation Firewalls (NGFW): Inspects application layer payload (Layer 7), performs deep packet inspection (DPI), detects malware signatures, and decrypts TLS sessions.
- Golden Firewall Architecture Rule: "Default Deny" (implicit deny all incoming traffic, explicitly permitting only necessary business ports).`,
            realWorldExample: 'A company web server firewall rule allows incoming traffic only on Port 80 and 443 from anywhere, restricts SSH port 22 to the corporate VPN IP subnet, and drops all other traffic.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Configuring UFW (Uncomplicated Firewall) on Linux',
                code: '# Set default policies: deny incoming, allow outgoing\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\n\n# Allow SSH and secure web services\nsudo ufw allow 22/tcp\nsudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\n\n# Enable firewall and check status\nsudo ufw enable\nsudo ufw status verbose',
                output: 'Status: active\nLogging: on (low)\nDefault: deny (incoming), allow (outgoing), disabled (routed)\n\nTo                         Action      From\n--                         ------      ----\n22/tcp                     ALLOW IN    Anywhere\n80/tcp                     ALLOW IN    Anywhere\n443/tcp                    ALLOW IN    Anywhere'
              }
            ]
          },
          {
            id: 'c3-l12',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 12,
            title: 'Basic Network Troubleshooting Utilities',
            durationMinutes: 25,
            summary: 'Hands-on mastery of ping, traceroute/tracert, netstat, ss, curl, and whois.',
            content: `When a host experiences connectivity issues or exhibits anomalous traffic, security analysts reach for diagnostic CLI utilities:
- 'ping': Uses ICMP Echo Requests to verify host reachability and round-trip time.
- 'traceroute' (Linux) / 'tracert' (Windows): Identifies each router hop along the path to destination by incrementing IP TTL (Time To Live).
- 'curl -I': Fetches HTTP response headers from a server to check web server versions and security headers (HSTS, Content-Security-Policy).
- \`whois\`: Queries domain registrar database for ownership and ASN allocation records.`,
            realWorldExample: 'When analyzing a phishing domain, running `whois` often reveals the domain was registered just 48 hours earlier through an anonymous bulletproof registrar.',
            codeSnippets: []
          },
          {
            id: 'c3-l13',
            moduleId: 'c3-m1',
            courseId: 'c3',
            number: 13,
            title: 'Practical Network Traffic Analysis Lab',
            durationMinutes: 35,
            summary: 'Interactive packet analysis lab examining HTTP, DNS, and TCP communication streams.',
            content: `In this practical laboratory, you will step into the shoes of a network analyst:
- Inspect live packet captures in our interactive Network Packet Analyzer.
- Filter traffic streams using BPF/display filters ('tcp', 'dns', 'http').
- Inspect Ethernet headers, IP addresses, TCP flag states (SYN, ACK, FIN), and hex data payloads.
- Identify an unencrypted password sent over cleartext HTTP and isolate an automated port scan signature!`,
            realWorldExample: 'SOC analysts use Wireshark daily to inspect pcap files exported from intrusion detection systems to confirm whether an alert is a true positive exploit or benign traffic.',
            practicalExercise: {
              id: 'ex-c3-l13',
              title: 'Interactive Network Packet Inspection',
              objective: 'Analyze captured packets to identify cleartext credential leakage and abnormal TCP traffic.',
              instructions: [
                'Launch the Network Packet Analyzer lab.',
                'Use the filter bar to isolate `HTTP` packets.',
                'Inspect the payload of the POST request to locate the leaked login username and password in cleartext.'
              ],
              labType: 'wireshark',
              verificationHint: 'Notice how unencrypted HTTP transmits authorization headers and POST payloads without scrambling.'
            },
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c3',
    practicalProjectId: 'proj-c3',
    certificateType: 'Network Security Associate',
    status: 'published'
  },

  // Course 4
  {
    id: 'c4',
    number: 4,
    pathId: 'path-beginner',
    title: 'Cyber Threats and Attacks',
    level: 'Beginner',
    description: 'Malware taxonomy, viruses, worms, ransomware, Trojans, spyware, phishing, social engineering, password attacks, DoS/DDoS, and defense mechanisms.',
    estimatedHours: 15,
    prerequisites: ['c1'],
    learningObjectives: [
      'Classify malware species: viruses, worms, trojans, ransomware, rootkits, and spyware',
      'Explain social engineering psychological triggers: urgency, authority, scarcity, and fear',
      'Differentiate between credential stuffing, dictionary attacks, and rainbow table lookups',
      'Analyze DoS and DDoS attack vectors including SYN floods and amplification attacks',
      'Formulate holistic defensive controls to recognize and neutralize cyber attacks'
    ],
    modules: [
      {
        id: 'c4-m1',
        courseId: 'c4',
        order: 1,
        title: 'Malware & Social Engineering',
        description: 'Deep dive into attack vectors and adversary techniques.',
        lessons: [
          {
            id: 'c4-l1',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 1,
            title: 'Understanding the Cyber Threat Landscape',
            durationMinutes: 25,
            summary: 'Threat actors: script kiddies, hacktivists, organized cybercrime syndicates, and Advanced Persistent Threats (APTs).',
            content: `Not all attackers have the same motives, capabilities, or resources:
- Script Kiddies: Inexperienced individuals using pre-made scripts and automated tools without understanding their underlying mechanisms.
- Hacktivists: Individuals or groups attacking organizations to advance political, environmental, or ideological causes.
- Organized Cybercrime Syndicates: Financially motivated professional criminal enterprises operating Ransomware-as-a-Service (RaaS) models with dedicated HR, developers, and negotiators.
- Advanced Persistent Threats (APTs): Nation-state sponsored cyber military units possessing virtually unlimited budgets, custom zero-day exploits, and long-term espionage missions.
- Malicious Insiders: Disgruntled employees, contractors, or whistleblowers with pre-existing authorized access to internal corporate systems.`,
            realWorldExample: 'APT28 (Fancy Bear) and APT29 (Cozy Bear) are well-documented nation-state cyber espionage groups targeting government ministries and defense contractors.',
            diagramType: 'malware-lifecycle',
            codeSnippets: []
          },
          {
            id: 'c4-l2',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 2,
            title: 'Malware Overview and Infection Vectors',
            durationMinutes: 25,
            summary: 'Malware classification and how malicious code enters victim environments.',
            content: `Malware (Malicious Software) is an umbrella term for any software intentionally designed to cause damage, compromise confidentiality, or perform unauthorized actions:
- Delivery Mechanisms:
  - Phishing emails with weaponized attachments (.exe, .iso, .vbs, macro-enabled .xlsm).
  - Drive-by downloads exploiting unpatched browser vulnerabilities when visiting compromised sites.
  - Malvertising (malicious online ads delivering exploits).
  - Infected removable media (USB thumb drives dropped in parking lots).
  - Software supply chain compromises (tampered npm packages or third-party vendor updates).`,
            realWorldExample: 'The 2020 SolarWinds supply chain attack injected malicious backdoor code (SUNBURST) directly into official software updates downloaded by thousands of enterprise customers.',
            codeSnippets: []
          },
          {
            id: 'c4-l3',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 3,
            title: 'Viruses versus Worms: Self-Replication Mechanics',
            durationMinutes: 20,
            summary: 'Why viruses require a human host action while worms self-propagate across networks.',
            content: `The critical technical difference lies in propagation:
- Computer Virus: Malicious code attached to a legitimate host file or executable program. It CANNOT spread without human intervention (e.g., a human double-clicking the infected file or opening the email attachment).
- Computer Worm: A standalone, self-replicating program that exploits network vulnerabilities to spread automatically across networks WITHOUT any human intervention.
  - Worms scan subnets for vulnerable open ports, execute a remote code execution exploit, copy their payload over, and immediately begin scanning for the next target.`,
            realWorldExample: 'The 2017 WannaCry attack functioned as a worm: it exploited the SMB vulnerability MS17-010 (EternalBlue) to infect over 200,000 computers across 150 countries within hours with zero user clicks.',
            codeSnippets: []
          },
          {
            id: 'c4-l4',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 4,
            title: 'Trojan Horses and Remote Access Trojans (RATs)',
            durationMinutes: 25,
            summary: 'Deceptive software packaging, backdoors, keyboard logging, and webcam spying.',
            content: `Named after the mythological Trojan Horse of ancient Troy:
- Trojan: Software that masquerades as a benign, useful program (e.g., a free game, cracked software, PDF viewer, or system optimizer) but secretly executes malicious payloads in the background.
- Remote Access Trojan (RAT): A specialized Trojan that provides the remote attacker with full graphical or command-line administrative control over the infected host:
  - Screen capture and webcam monitoring.
  - Keystroke logging (capturing passwords as typed).
  - File upload/download (exfiltrating trade secrets).
  - Using the machine as a proxy or botnet zombie for further attacks.`,
            realWorldExample: 'Users downloading pirated Adobe Photoshop torrents often find the crack installer drops a background RAT that silently connects back to an adversary command-and-control (C2) server.',
            codeSnippets: []
          },
          {
            id: 'c4-l5',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 5,
            title: 'Ransomware: Extortion and Double Extortion',
            durationMinutes: 30,
            summary: 'Cryptographic locking of user files, shadow copy deletion, ransom negotiation, and offline immutable backups.',
            content: `Ransomware is malicious software that encrypts a victim’s files using military-grade encryption algorithms (AES-256 + RSA-4096), demanding a cryptocurrency ransom payment for the decryption key:
- Attack Lifecycle:
  1. Initial Access (phishing, exposed RDP, or stolen credentials).
  2. Privilege Escalation & Lateral Movement across Active Directory.
  3. Deletion of Volume Shadow Copies and local system restore points.
  4. Mass encryption of documents, databases, and VM images.
  5. Dropping ransom note (.txt or desktop background change).
- Double Extortion: Attackers exfiltrate confidential customer data BEFORE encrypting it. If the victim restores from backups and refuses to pay the ransom, the attackers threaten to publish the sensitive records publicly.`,
            realWorldExample: 'Cities, universities, and enterprise companies worldwide have paid millions in Bitcoin to ransomware cartels like LockBit, BlackCat, and Conti after entire operational data centers were encrypted.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Typical command executed by ransomware to destroy Windows system recovery',
                code: '# Adversaries execute this to prevent easy local rollbacks\nvssadmin.exe delete shadows /all /quiet\nwmic.exe shadowcopy delete\nbcdedit.exe /set {default} recoveryenabled No',
                output: 'Shadow copies successfully deleted.'
              }
            ]
          },
          {
            id: 'c4-l6',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 6,
            title: 'Spyware, Adware, and Keyloggers',
            durationMinutes: 20,
            summary: 'Silent surveillance, browser hijacking, cookie scraping, and commercial spyware.',
            content: `Surveillance malware operates covertly to extract commercial or personal value:
- Spyware: Secretly monitors user behavior, searches browser cookies, tracks location, and transmits data to third parties.
- Keyloggers: Records every physical keystroke pressed on the keyboard, harvesting credentials, bank PINs, and confidential communications.
- Adware: Aggressively displays unwanted advertisements, redirects default search engines, and injects sponsored affiliate links into web pages.
- Commercial Spyware (Pegasus): Zero-click exploits targeting iOS/Android devices used by nation-states to spy on journalists and activists.`,
            realWorldExample: 'Hardware keyloggers plugged between a desktop keyboard cable and the computer tower at a university library recorded hundreds of student email and bank passwords.',
            codeSnippets: []
          },
          {
            id: 'c4-l7',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 7,
            title: 'Phishing Attacks: Anatomy and Detection',
            durationMinutes: 30,
            summary: 'Deceptive sender spoofing, homograph attacks, typosquatting, credential harvesting, and email headers.',
            content: `Over 90% of all successful cyber breaches originate with a phishing email:
- Spear Phishing: Highly customized phishing emails targeting a specific individual using gathered OSINT (job title, recent projects, colleagues).
- Whaling: Targeting C-suite executives (CEO, CFO) to authorize fraudulent wire transfers or disclose executive tax forms.
- Technical Indicators of Phishing:
  - Mismatched sender domain ('support@paypal-security-update24.com' instead of 'paypal.com').
  - Lookalike / Punycode domains (using Cyrillic characters that look identical to Latin letters).
  - False urgency ("Your account will be suspended within 2 hours!").
  - Generic salutations ("Dear Customer").
  - Hovering over links reveals an entirely different destination URL.`,
            realWorldExample: 'An attacker sent a targeted email to a corporate accountant impersonating the CEO on business travel, requesting an urgent $45,000 vendor payment wire transfer (Business Email Compromise - BEC).',
            practicalExercise: {
              id: 'ex-c4-l7',
              title: 'Interactive Phishing Detective Lab',
              objective: 'Inspect a realistic suspicious email and tag all red flags.',
              instructions: [
                'Launch the Phishing Detector Lab.',
                'Inspect the sender header, reply-to address, urgency tone, and hyperlink hover destination.',
                'Mark at least 3 suspicious indicators to successfully neutralize the attack.'
              ],
              labType: 'phishing',
              verificationHint: 'Check the actual URL behind the "Click Here to Verify" button.'
            },
            codeSnippets: []
          },
          {
            id: 'c4-l8',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 8,
            title: 'Social Engineering: Psychological Manipulation',
            durationMinutes: 25,
            summary: 'Pretexting, baiting, tailgating, shoulder surfing, and the psychology of persuasion.',
            content: `Social engineering is the art of manipulating people into performing actions or divulging confidential information:
- The 6 Principles of Influence (Dr. Robert Cialdini):
  1. Authority: Pretending to be an executive, police officer, or IT director.
  2. Urgency / Scarcity: "Action required in 15 minutes to avoid penalty."
  3. Social Proof: "Everyone else in your team has already submitted their passwords."
  4. Likability: Flattering or charming the victim.
  5. Reciprocity: Doing a small favor first to elicit a larger compliance later.
  6. Fear: Threatening legal action or termination.
- Physical Social Engineering:
  - Tailgating: Walking closely behind an employee holding a secure badge door open ("piggybacking").
  - Baiting: Leaving malware-infected USB sticks labeled "Q4 Executive Salaries" in the cafeteria.`,
            realWorldExample: 'An attacker wearing a fake HVAC maintenance uniform and carrying a clipboard walked past a building reception desk simply by smiling and carrying a large heavy box, gaining access to the unlocked server room.',
            codeSnippets: []
          },
          {
            id: 'c4-l9',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 9,
            title: 'Password Attacks: Brute Force, Dictionaries, and Rainbow Tables',
            durationMinutes: 30,
            summary: 'How attackers crack passwords, hash cracking tools (Hashcat, John the Ripper), salting, and entropy.',
            content: `Passwords remain the most common single point of failure in authentication:
- Brute-Force Attack: Trying every possible combination of letters, numbers, and symbols until the correct one is found. Computationally expensive for long passwords.
- Dictionary Attack: Testing hundreds of thousands of common dictionary words, names, and known leaked passwords ('rockyou.txt').
- Credential Stuffing: Using automated bots to test millions of breached username/password combos across unrelated banking, e-commerce, and cloud platforms.
- Rainbow Tables: Precomputed tables of cryptographic hashes for millions of plaintext words. Defeated by cryptographic Salting (adding random unique bytes to each password before hashing).`,
            realWorldExample: 'The classic `rockyou.txt` wordlist containing 14.3 million leaked passwords from a 2009 gaming breach is still used today to crack over 40% of weak user passwords in minutes.',
            practicalExercise: {
              id: 'ex-c4-l9',
              title: 'Interactive Password Entropy Lab',
              objective: 'Test how length, character diversity, and randomness affect crack time.',
              instructions: [
                'Launch the Password Audit Lab.',
                'Test simple passwords vs complex phrases.',
                'Observe how adding length increases entropy exponentially compared to merely substituting special characters (e.g., `P@ssword1` vs `correct-horse-battery-staple`).'
              ],
              labType: 'password',
              verificationHint: 'Length dominates entropy calculations: an 18-character passphrase takes billions of years to brute-force.'
            },
            codeSnippets: []
          },
          {
            id: 'c4-l10',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 10,
            title: 'Denial-of-Service (DoS) and DDoS Attacks',
            durationMinutes: 25,
            summary: 'Volumetric floods, SYN floods, application-layer attacks (Slowloris), and botnets (Mirai).',
            content: `Denial-of-Service attacks aim to make a service unavailable to legitimate users by overwhelming system capacity:
- DoS (Denial of Service): Attack originating from a single source machine. Easily blocked by dropping that single IP address at the firewall.
- DDoS (Distributed Denial of Service): Attack orchestrated from thousands or millions of geographically distributed compromised computers and IoT devices (a botnet).
- Types of DDoS:
  - Volumetric Attacks: Saturating bandwidth pipes (NTP/DNS UDP amplification, ICMP floods).
  - Protocol Attacks: Consuming server connection tables (TCP SYN Flood).
  - Application-Layer Attacks (Layer 7): Sending complex database queries or slow HTTP requests (Slowloris) that consume 100% of web server worker threads with minimal attacker bandwidth.`,
            realWorldExample: 'The Mirai botnet compromised hundreds of thousands of insecure internet-connected security cameras using default passwords (`admin/admin`), unleashing a 1 Tbps DDoS attack that took down major internet DNS provider Dyn.',
            codeSnippets: []
          },
          {
            id: 'c4-l11',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 11,
            title: 'Data Breaches: Causes and Consequences',
            durationMinutes: 25,
            summary: 'Misconfigured S3 cloud buckets, SQL injection data dumps, insider theft, and breach notification laws.',
            content: `A data breach is the unauthorized access, extraction, or disclosure of sensitive or confidential records:
- Root Causes:
  - Misconfigured cloud storage permissions (e.g., public AWS S3 buckets).
  - Application flaws allowing arbitrary database dumping (SQL injection).
  - Stolen administrative credentials without MFA.
  - Phishing attacks compromising email inboxes.
- Regulatory Penalties:
  - GDPR (EU): Fines up to 4% of global annual turnover or €20M for failing to safeguard personal data.
  - HIPAA (US): Severe fines for health record breaches.
  - Mandatory breach disclosure notifications to affected customers within 72 hours.`,
            realWorldExample: 'Capital One suffered a breach of 100 million customer accounts when an attacker exploited a misconfigured open-source Web Application Firewall (SSRF vulnerability) on an AWS EC2 instance.',
            codeSnippets: []
          },
          {
            id: 'c4-l12',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 12,
            title: 'Recognizing Suspicious Activities and Indicators',
            durationMinutes: 20,
            summary: 'Indicators of Compromise (IoCs), anomalous network spikes, unauthorized account creations, and baseline deviation.',
            content: `Early detection of intrusions saves organizations millions of dollars:
- Indicators of Compromise (IoCs): Forensic evidence indicating a system has been breached:
  - Unexplained outbound traffic to IP addresses in unusual geographic regions during non-business hours.
  - New user accounts added to the local Administrators or Domain Admins group.
  - Antivirus or endpoint detection agents being unexpectedly stopped or disabled.
  - Massive spikes in database read queries or file access volume.
  - Known malicious file hashes matching threat intelligence feeds.`,
            realWorldExample: 'A nighttime alarm triggered when an internal workstation attempted to transfer 50 GB of zip archives to an external IP in an overseas country, revealing an active exfiltration attempt.',
            codeSnippets: []
          },
          {
            id: 'c4-l13',
            moduleId: 'c4-m1',
            courseId: 'c4',
            number: 13,
            title: 'Prevention, Protection, and Defensive Hygiene',
            durationMinutes: 25,
            summary: 'Synthesizing defensive controls: defense-in-depth, EDR, network segmentation, and security awareness training.',
            content: `No single security tool provides 100% protection. Defense requires interlocking layers:
1. Endpoint: Modern EDR (Endpoint Detection and Response) using behavioral heuristics rather than static signatures alone.
2. Identity: Enforce Multi-Factor Authentication (MFA) across all external and internal portals.
3. Network: Segment networks so that compromising an IoT lightbulb does not allow lateral movement into the financial database.
4. Backups: Maintain the 3-2-1 backup rule (3 copies of data, on 2 different media, with 1 copy stored offline and immutable).
5. Human: Ongoing, engaging security awareness training and simulated phishing drills.`,
            realWorldExample: 'A firm successfully survived a full ransomware attack because their backups were stored on an offline, air-gapped tape system that ransomware could not reach over the network.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c4',
    practicalProjectId: 'proj-c4',
    certificateType: 'Cyber Threats & Defensive Hygiene Associate',
    status: 'published'
  },

  // Course 5
  {
    id: 'c5',
    number: 5,
    pathId: 'path-beginner',
    title: 'Personal Cybersecurity and Digital Safety',
    level: 'Beginner',
    description: 'Practical self-defense: password managers, MFA authenticator apps, secure browsing, email hygiene, public Wi-Fi risks, VPNs, and personal backups.',
    estimatedHours: 12,
    prerequisites: ['c1'],
    learningObjectives: [
      'Implement password managers and generate high-entropy unique credentials',
      'Deploy hardware security keys and app-based Multi-Factor Authentication (MFA)',
      'Secure web browsers, mobile devices, and home Wi-Fi routers against surveillance',
      'Mitigate public Wi-Fi risks through encrypted tunneling and VPNs',
      'Execute the 3-2-1 backup strategy for personal digital continuity'
    ],
    modules: [
      {
        id: 'c5-m1',
        courseId: 'c5',
        order: 1,
        title: 'Personal Defense & Digital Hygiene',
        description: 'Empowering individuals with actionable security practices.',
        lessons: [
          {
            id: 'c5-l1',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 1,
            title: 'Creating Strong Passwords and Passphrases',
            durationMinutes: 25,
            summary: 'Why length trumps complexity, how password meters work, and the passphrase technique.',
            content: `Human memory is ill-suited for remembering dozens of 20-character randomized strings. The solution is understanding password entropy:
- Entropy: A mathematical measure of randomness measured in bits. A password with 80+ bits of entropy is practically impossible for modern supercomputers to brute force.
- The Passphrase Method: Combining 4 to 5 random, memorable words (e.g., 'velvet-orbit-copper-lemon-galaxy').
  - Longer than standard 8-character passwords.
  - Easier to remember and type on mobile touchscreens.
  - Exponentially higher resistance to brute-force algorithms.
- Critical Rule: NEVER reuse the same password across multiple services! If one site is breached, attackers will test that credential on your bank, email, and social media.`,
            realWorldExample: '`P@ssw0rd1!` has only 8 characters and is cracked by Hashcat in under 2 seconds because it follows predictable human replacement patterns. A 20-character random passphrase takes centuries.',
            codeSnippets: []
          },
          {
            id: 'c5-l2',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 2,
            title: 'Password Managers: Architecture and Usage',
            durationMinutes: 25,
            summary: 'Bitwarden, 1Password, KeePass: Zero-knowledge encryption architectures and master passphrase security.',
            content: `A Password Manager is a secure encrypted digital vault that stores and autofills your unique credentials:
- Zero-Knowledge Architecture: The service provider encrypts your vault locally on your device using AES-256 before syncing. Only your Master Passphrase can decrypt the data; even the company hosting the vault cannot view your passwords.
- Key Capabilities:
  - Built-in random password and passphrase generator.
  - Autofill protection against phishing: Password managers match domain names strictly. If you land on a fake 'paypa1.com' phishing site, your manager will NOT autofill because the domain does not match 'paypal.com'.
  - Secure storage of credit cards, software licenses, and secure notes.`,
            realWorldExample: 'A user tricked by an exact visual replica of Google Login avoided credential theft because their password manager recognized the domain was not `accounts.google.com` and refused to autofill.',
            codeSnippets: []
          },
          {
            id: 'c5-l3',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 3,
            title: 'Multi-Factor Authentication (MFA): SMS vs Apps vs FIDO Keys',
            durationMinutes: 30,
            summary: 'The 3 factors of authentication (Knowledge, Possession, Inherence), SMS vulnerabilities, and hardware keys.',
            content: `Authentication factors fall into three universal categories:
1. Something You Know: Password, PIN, passphrase.
2. Something You Have: Smartphone authenticator app (TOTP), hardware security key (YubiKey), smart card.
3. Something You Are: Biometrics (fingerprint, facial recognition, iris scan).

MFA Hierarchy of Security:
- SMS Verification (Weakest MFA): Vulnerable to SIM Swapping attacks where attackers bribe or trick mobile carrier representatives into redirecting your phone number to their SIM card, intercepting SMS codes.
- Authenticator Apps (TOTP - Time-based One-Time Password): Apps like Google Authenticator, Authy, or Bitwarden generate 6-digit codes every 30 seconds using HMAC algorithms. Immune to SIM swapping.
- FIDO2 / WebAuthn Hardware Keys (Strongest MFA): Physical USB/NFC keys (YubiKey). Cryptographically bound to the specific browser URL, completely immune to phishing!`,
            realWorldExample: 'Twitter was hacked in 2020 after an executive’s phone number was SIM-swapped, bypassing SMS verification. Organizations mandating physical FIDO2 security keys experienced zero account takeovers from phishing.',
            codeSnippets: []
          },
          {
            id: 'c5-l4',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 4,
            title: 'Safe Web Browsing and Extension Hygiene',
            durationMinutes: 20,
            summary: 'Content blockers (uBlock Origin), HTTPS enforcement, cookie management, and dangerous browser extensions.',
            content: `The web browser is your window to the internet and your primary attack surface:
- Content & Ad Blockers: Extensions like uBlock Origin do more than block annoying ads; they block malicious drive-by download domains, tracking scripts, and coin-miners.
- Browser Extension Risks: Extensions have wide permissions to read and modify all data on every website you visit. Only install extensions with audited reputations and avoid abandoned extensions bought by shady marketing entities.
- Privacy Settings: Disable third-party cookies, enable DNS over HTTPS (DoH), and regularly clear browser cache and storage.`,
            realWorldExample: 'A popular PDF conversion browser extension with 2 million users was sold to an anonymous developer who pushed an update that turned the extension into a password stealer.',
            codeSnippets: []
          },
          {
            id: 'c5-l5',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 5,
            title: 'Email Security and Privacy Best Practices',
            durationMinutes: 20,
            summary: 'Email aliases, tracking pixel blockers, SPF/DKIM/DMARC concepts, and spam hygiene.',
            content: `Email addresses serve as personal digital passports:
- Email Aliasing: Services like SimpleLogin or Apple Hide My Email generate unique forwarding addresses for each website you register on. If an e-commerce site leaks your email or begins sending spam, you can simply deactivate that single alias without affecting your personal inbox.
- Tracking Pixels: Invisible 1x1 image pixels embedded in emails notify senders the moment you open the email, revealing your IP address and location. Most modern email clients offer an option to "Block external image loading by default."
- Secondary Accounts: Maintain at least two email accounts: one for critical services (banking, government, primary identity) and one for social media, newsletters, and forum registrations.`,
            realWorldExample: 'Using a dedicated email alias for an obscure online forum alerted a user that the forum suffered an undisclosed breach when marketing spam suddenly arrived at that specific alias.',
            codeSnippets: []
          },
          {
            id: 'c5-l6',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 6,
            title: 'Social Media Privacy and Digital Footprint Reduction',
            durationMinutes: 20,
            summary: 'Over-sharing risks, Open Source Intelligence (OSINT), and privacy lockdowns.',
            content: `Attackers compile dossiers on victims by scraping public social media profiles:
- OSINT Hazards:
  - Posting photos containing boarding passes (barcodes contain full passport and ticket data).
  - Answering "fun" viral quizzes revealing mother’s maiden name, first pet, or high school mascot (the exact security questions used for bank account resets).
  - Geotagged vacation photos informing burglars that your home is currently unoccupied.
- Social Media Auditing:
  - Set all profiles to Private/Friends only.
  - Review and revoke third-party app permissions connected via OAuth.
  - Audit tag settings so others cannot tag you in public photos without your approval.`,
            realWorldExample: 'A social engineer called an airline call center and impersonated an executive using travel itinerary details the executive enthusiastically tweeted from the airport lounge 30 minutes earlier.',
            codeSnippets: []
          },
          {
            id: 'c5-l7',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 7,
            title: 'Mobile Device Security: iOS and Android Protections',
            durationMinutes: 20,
            summary: 'Full disk encryption, app store permissions, sideloading risks, and biometric authentication.',
            content: `Smartphones hold more personal data than any desktop computer:
- Operating System Updates: Apple and Google release monthly security patches fixing critical zero-day vulnerabilities in WebKit and OS kernels. Install updates promptly.
- App Permissions: Periodically audit which apps have access to your Location, Camera, Microphone, and Contacts. Deny background location to apps that do not require it.
- Sideloading Caution: Downloading APK files from unofficial third-party websites bypasses Google Play Protect verification and is the single most common cause of mobile banking Trojan infections on Android.
- Remote Wipe: Ensure "Find My iPhone" or "Find My Device" is enabled so you can remotely erase all sensitive data if your phone is lost or stolen.`,
            realWorldExample: 'A flashlight app downloaded from a sketchy APK forum requested access to SMS messages and contacts, secretly intercepting two-factor banking codes in the background.',
            codeSnippets: []
          },
          {
            id: 'c5-l8',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 8,
            title: 'Public Wi-Fi Risks and Virtual Private Networks (VPNs)',
            durationMinutes: 25,
            summary: 'Evil Twin hotspots, packet sniffing, TLS security, and when VPNs are actually necessary.',
            content: `Connecting to public Wi-Fi in coffee shops, airports, and hotels involves real security considerations:
- Evil Twin Hotspot: An attacker sets up a Wi-Fi router named "Starbucks_Guest" right next to the real coffee shop. When victims connect, all their network traffic routes through the attacker's laptop.
- How HTTPS Protects You: Modern HTTPS encrypts the content of web pages even on open public Wi-Fi. However, unencrypted DNS queries and Server Name Indication (SNI) still reveal which domains you are visiting.
- Virtual Private Networks (VPNs): A VPN encrypts all network traffic between your device and a secure VPN server, preventing anyone on the local public Wi-Fi or local ISP from sniffing, intercepting, or altering your packets.
- Commercial VPN Reality: VPNs protect you on untrusted networks, but they do NOT make you anonymous from law enforcement, nor do they protect you from malware downloads or phishing scams.`,
            realWorldExample: 'An attacker set up a pineapple Wi-Fi device at an airport conference room and intercepted unencrypted corporate email connections from participants who had not enabled VPNs.',
            codeSnippets: []
          },
          {
            id: 'c5-l9',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 9,
            title: 'Data Backups: The 3-2-1 Strategy',
            durationMinutes: 25,
            summary: 'Surviving hardware crashes, theft, and ransomware with structured automated backups.',
            content: `A comprehensive backup strategy is the only 100% guarantee against permanent data loss:
- The 3-2-1 Backup Rule:
  - 3 Copies of your critical data (1 primary copy + 2 backup copies).
  - 2 Different Media types (e.g., 1 on an external NVMe hard drive + 1 on a cloud storage bucket).
  - 1 Copy Stored Offsite and disconnected (air-gapped or immutable cloud vault).
- The "Restore Test": A backup that has never been tested for restoration is not a backup! Schedule a quarterly exercise where you select a random folder and restore it to verify that your backup archives are uncorrupted and password-accessible.`,
            realWorldExample: 'When a photographer’s laptop and local external drive were destroyed in a house fire, having an offsite encrypted Backblaze cloud backup allowed complete recovery of 10 years of client work.',
            codeSnippets: []
          },
          {
            id: 'c5-l10',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 10,
            title: 'Privacy Settings and Device Hardening Checklists',
            durationMinutes: 20,
            summary: 'Step-by-step hardening of Windows, macOS, iOS, Android, and home Wi-Fi routers.',
            content: `Actionable hardening checklist for your personal devices:
1. Router Security: Change default admin credentials ('admin/admin'), disable WPS (Wi-Fi Protected Setup), disable remote management, update router firmware, and configure WPA3 or WPA2-AES encryption.
2. Device Encryption: Enable BitLocker on Windows Pro, FileVault on macOS, and ensure 6-digit or alphanumeric passcodes on mobile devices.
3. Lock Screen Privacy: Configure notifications to hide sensitive preview content on lock screens so unauthorized onlookers cannot read incoming 2FA codes.
4. Auto-Lock: Set screen timeout to 2-3 minutes of inactivity.`,
            realWorldExample: 'An attacker stole a laptop left on an office desk, but because FileVault full-disk encryption was active, removing the SSD yielded only scrambled unreadable ciphertext.',
            codeSnippets: []
          },
          {
            id: 'c5-l11',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 11,
            title: 'Recognizing Online Scams and Fraud Tactics',
            durationMinutes: 20,
            summary: 'Fake tech support popups, cryptocurrency investment scams, romance fraud, and marketplace scams.',
            content: `Financial cyber fraud schemes follow predictable playbooks:
- Tech Support Scams: Full-screen browser popups flashing red with siren audio claiming "Microsoft Security Alert: Your computer is infected! Call 1-800-XXX-XXXX." When victims call, scammers demand remote desktop access (AnyDesk) and charge hundreds of dollars for fake cleanup software.
- Crypto "Pig Butchering" Scams: Romance scams where fraudsters build trust over weeks via messaging apps before encouraging the victim to invest in a fabricated cryptocurrency trading platform that fakes massive gains but refuses withdrawals without impossible fees.
- Overpayment / Fake Check Scams on Online Marketplaces: Sending a fake payment check for more than the item value and asking the seller to refund the difference via wire or gift cards.`,
            realWorldExample: 'An elderly citizen lost their life savings after allowing remote desktop access to a caller claiming to be from "Windows Fraud Department" who manipulated browser HTML elements to fake an accidental refund.',
            codeSnippets: []
          },
          {
            id: 'c5-l12',
            moduleId: 'c5-m1',
            courseId: 'c5',
            number: 12,
            title: 'Personal Cybersecurity Master Checklist and Graduation',
            durationMinutes: 25,
            summary: 'Consolidating all habits into an actionable living security standard.',
            content: `Review your completed Personal Defense posture:
- [ ] Unique 16+ character passphrases on all accounts stored in a password manager.
- [ ] Multi-Factor Authentication enabled on all email, banking, and cloud portals using TOTP apps or security keys.
- [ ] Operating system, browser, and smartphone automatic updates enabled.
- [ ] 3-2-1 backup strategy deployed with tested restore capability.
- [ ] Home router secured with WPA2/WPA3, custom admin password, and WPS disabled.
- [ ] Critical thinking reflex whenever encountering urgent emails, texts, or unusual phone calls requesting actions.

You are now prepared to take the Beginner Final Examination and submit your Beginner Practical Project!`,
            realWorldExample: 'Completing this personal defense checklist reduces your individual probability of being compromised by commodity cyber attacks by over 99%.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c5',
    practicalProjectId: 'proj-c5',
    certificateType: 'Personal Cybersecurity & Digital Safety Specialist',
    status: 'published'
  },

  // ==========================================
  // INTERMEDIATE COURSES (Courses 6 - 12)
  // ==========================================
  {
    id: 'c6',
    number: 6,
    pathId: 'path-intermediate',
    title: 'Linux for Cybersecurity',
    level: 'Intermediate',
    description: 'Linux systems engineering for security professionals: command line fluency, Bash scripting, systemd, package management, user security, SSH hardening, and forensic log triage.',
    estimatedHours: 20,
    prerequisites: ['c2'],
    learningObjectives: [
      'Master the Linux terminal, pipes, redirection, and text processing utilities (grep, awk, sed)',
      'Manage users, groups, sudo privileges, and audit file permissions (SUID, SGID, sticky bit)',
      'Analyze system logs with journalctl and syslog to investigate security incidents',
      'Harden OpenSSH daemon configurations against brute-force and unauthorized access',
      'Write defensive Bash automation scripts for security monitoring and audit tasks'
    ],
    modules: [
      {
        id: 'c6-m1',
        courseId: 'c6',
        order: 1,
        title: 'Advanced Linux Administration & Shell Mastery',
        description: 'Command line power tools, permissions, and system administration.',
        lessons: [
          {
            id: 'c6-l1',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 1,
            title: 'Introduction to Linux & Unix Philosophy',
            durationMinutes: 25,
            summary: 'Everything is a file, small modular tools, and standard input/output streams.',
            content: `The Unix philosophy underpins Linux:
1. Write programs that do one thing and do it well.
2. Write programs to work together.
3. Write programs to handle text streams, because that is a universal interface.
- Standard Streams:
  - Standard In (stdin, file descriptor 0)
  - Standard Out (stdout, file descriptor 1)
  - Standard Error (stderr, file descriptor 2)
- Redirection: \`>\` overwrites, \`>>\` appends, \`2>&1\` redirects error to output, and \`|\` (pipe) connects stdout of one tool to stdin of another.`,
            realWorldExample: 'A security engineer chains `cat access.log | awk "{print $1}" | sort | uniq -c | sort -nr | head -n 10` to instantly extract the top 10 requesting IP addresses from a 2GB web server log.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Piping and redirecting command output',
                code: '# Filter for failed logins and save report to disk\ngrep "Failed password" /var/log/auth.log | tee failed_report.txt | wc -l',
                output: '184'
              }
            ],
            practicalExercise: {
              id: 'ex-c6-l1',
              title: 'Interactive Log Pipeline Analysis',
              objective: 'Use pipes and text processing tools to extract suspicious IP addresses from log files.',
              instructions: [
                'Launch the Linux Terminal Lab.',
                'Run `cat /var/log/auth.log | grep "Failed"` to see authentication failures.',
                'Count total failures using `grep "Failed" /var/log/auth.log | wc -l`.'
              ],
              labType: 'terminal',
              verificationHint: 'Notice how the pipe operator connects discrete Unix utilities seamlessly.'
            }
          },
          {
            id: 'c6-l2',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 2,
            title: 'Linux Distributions for Security (Debian, RHEL, Kali, Parrot)',
            durationMinutes: 20,
            summary: 'Package managers (apt vs dnf), enterprise server distros vs offensive penetration testing distributions.',
            content: `Understanding distribution families:
- Debian/Ubuntu Family: Uses 'apt' package manager and '.deb' packages. Standard for cloud servers and Kali Linux.
- Red Hat / Fedora / Rocky Linux: Uses 'dnf' / 'rpm' package manager and SELinux mandatory access controls. Ubiquitous in banking and enterprise data centers.
- Security-Focused Distros:
  - Kali Linux & Parrot Security: Pre-packaged with hundreds of security tools (Nmap, Burp Suite, Metasploit, Wireshark) for authorized penetration testing.
  - Alpine Linux: Ultra-minimalistic (~5MB) distribution ideal for secure Docker containers with minimal attack surface.`,
            realWorldExample: 'Securing an enterprise Docker container often involves switching the base image from a heavy 500MB Ubuntu image to an Alpine image, eliminating 80% of unneeded packages and potential CVEs.',
            codeSnippets: []
          },
          {
            id: 'c6-l3',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 3,
            title: 'Linux Terminal Fundamentals & Navigation',
            durationMinutes: 30,
            summary: 'Core commands: ls, cd, cp, mv, rm, find, locate, which, type, and environment variables.',
            content: `Fluid navigation without a mouse is mandatory for remote server administration:
- 'find': Searches directories recursively by name, size, modification date, or permissions.
- 'grep': Searches files for regular expression patterns.
- Environment Variables: \`$PATH\` defines directories searched for executable binaries. An insecure relative path in \`$PATH\` (e.g. \`.\`) can allow privilege escalation via binary hijacking!`,
            realWorldExample: 'Security analysts use `find / -type f -size +100M -exec ls -lh {} \\;` to quickly locate large database dumps or hidden archives left by attackers on compromised systems.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Finding files modified within the last 24 hours',
                code: '# Search for any files modified in the last 1 day\nfind /var/www/html -type f -mtime -1\n\n# Search for world-writable directories\nfind / -type d -perm -0002 2>/dev/null',
                output: '/var/www/html/uploads/shell.php\n/tmp\n/var/tmp'
              }
            ]
          },
          {
            id: 'c6-l4',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 4,
            title: 'File and Directory Management, Archiving, and Compressing',
            durationMinutes: 25,
            summary: 'Working with tar, gzip, bzip2, zip, checksums, and secure file deletion (shred).',
            content: `Creating evidence bundles and secure forensic archives:
- 'tar': Tape archive utility combining multiple files into one uncompressed archive.
- 'gzip' / 'xz': Compressing archives to minimize disk space.
- Secure Wiping (\`shred\`): Overwrites file data with random patterns before unlinking, defeating standard data recovery tools on magnetic and unprovisioned flash media.`,
            realWorldExample: 'Forensic examiners archive memory dumps and disk images with `tar -czvf case_042_evidence.tar.gz evidence.raw` and compute a SHA-256 checksum immediately to preserve chain of custody.',
            codeSnippets: []
          },
          {
            id: 'c6-l5',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 5,
            title: 'User, Group, and Sudo Security Management',
            durationMinutes: 30,
            summary: 'The sudoers file, visudo, password aging policies, locking accounts, and root restrictions.',
            content: `Controlling administrative delegation:
- '/etc/sudoers': Defines which users can execute which commands as superuser. Always edit using 'sudo visudo' to check syntax before saving; a syntax error in 'sudoers' can lock all administrators out of root!
- Insecure Sudo Configurations: Granting users permission to run binaries like 'find', 'vim', 'less', or 'bash' via sudo without password allows instant root shell breakouts (GTFOBins).
- Locking Dormant Accounts: \`passwd -l username\` locks an account, preventing password logins.`,
            realWorldExample: 'A developer given `sudo /usr/bin/vim` to edit config files can simply type `:!bash` inside Vim to escape into an unrestricted root shell.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Locking an account and checking sudo configuration',
                code: '# Lock an inactive account\nsudo passwd -l devuser\n\n# Check allowed sudo commands for current user\nsudo -l',
                output: 'Matching Defaults entries for analyst on sec-lab:\n    env_reset, mail_badpass\n\nUser analyst may run the following commands on sec-lab:\n    (ALL : ALL) ALL'
              }
            ]
          },
          {
            id: 'c6-l6',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 6,
            title: 'Special File Permissions: SUID, SGID, and Sticky Bits',
            durationMinutes: 30,
            summary: 'Understanding octal 4000, 2000, 1000, SUID vulnerabilities, and /tmp directory security.',
            content: `Beyond standard rwx permissions, Linux provides special bits:
- SUID (4000, '-rwsr-xr-x'): Binary executes with the permissions of the file owner (e.g., '/usr/bin/passwd' runs as root so regular users can update '/etc/shadow').
- SGID (2000, '-rwxr-sr-x'): Binary executes with group rights, or in directories, newly created files inherit the parent directory’s group.
- Sticky Bit (1000, \`drwxrwxrwt\`): Applied to shared directories like \`/tmp\`. Allows any user to create files, but only the file's owner (or root) can delete or rename them, preventing malicious users from deleting other users' temporary files.`,
            realWorldExample: 'Attackers discovering a custom Python or C binary owned by root with the SUID bit set will reverse-engineer it to exploit buffer overflows or insecure library calls to escalate privileges.',
            codeSnippets: []
          },
          {
            id: 'c6-l7',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 7,
            title: 'Linux Networking Commands & Socket Inspection',
            durationMinutes: 30,
            summary: 'ss, ip, netstat, lsof -i, iptables, ufw, tcpdump, and diagnosing active connections.',
            content: `Investigating active network sockets:
- 'ss -tulnp': Displays all listening TCP and UDP sockets along with the process name and PID.
- 'lsof -i :port': Lists open files and processes associated with a specific network port.
- \`tcpdump\`: Powerful command-line packet sniffer for capturing network traffic directly on remote headless Linux servers without GUI tools.`,
            realWorldExample: 'Running `lsof -i :4444` reveals that a reverse shell opened by an attacker is bound to a bash process owned by the `www-data` user.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Inspecting open sockets and capturing live packets with tcpdump',
                code: '# Capture 5 packets on eth0 interface and display in ASCII\nsudo tcpdump -i eth0 -c 5 -A port 80\n\n# Identify which process is listening on port 22\nsudo lsof -i :22',
                output: 'COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nsshd    842 root    3u  IPv4  20481      0t0  TCP *:ssh (LISTEN)'
              }
            ]
          },
          {
            id: 'c6-l8',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 8,
            title: 'System Logs and Forensic Log Triage (journalctl, syslog, auth.log)',
            durationMinutes: 30,
            summary: 'Systemd journal, centralized logging, log rotation, and spotting tampering attempts.',
            content: `Linux system logging mechanics:
- 'journalctl': Command for querying the systemd binary journal:
  - 'journalctl -u ssh.service -f': Live-follow SSH events.
  - 'journalctl --since "1 hour ago"': Isolate recent events.
- Log Tampering: Attackers often attempt to clear logs upon gaining root access ('echo "" > /var/log/auth.log' or 'history -c').
- Defensive Measure: Forward logs in real time to an off-host write-once SIEM or remote rsyslog server so logs cannot be deleted even if the local server is completely compromised.`,
            realWorldExample: 'A SOC engineer detected an attacker attempting to cover their tracks when `/var/log/auth.log` file size suddenly dropped to 0 bytes, triggering an automated integrity alert.',
            codeSnippets: []
          },
          {
            id: 'c6-l9',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 9,
            title: 'SSH Fundamentals and Daemon Hardening',
            durationMinutes: 35,
            summary: 'Secure Shell architecture, asymmetric key authentication, sshd_config hardening, and Fail2ban.',
            content: `OpenSSH is the universal standard for secure remote administration:
- Password vs Key Authentication: Passwords are vulnerable to brute force and credential stuffing. SSH Ed25519 or RSA-4096 key pairs provide cryptographically un-crackable authentication.
- Critical '/etc/ssh/sshd_config' Hardening Directives:
  - 'PermitRootLogin no': Never allow direct root login; force users to log in with an audited personal account and sudo.
  - 'PasswordAuthentication no': Disables all password prompts, permitting SSH keys only.
  - 'Port 2222': Changing the default port 22 eliminates 99% of automated Internet bot scans (security through obscurity as a secondary layer).
  - 'MaxAuthTries 3': Drops connections after 3 incorrect attempts.
- Fail2ban: Daemon that parses authentication logs and automatically writes iptables firewall rules to temporarily or permanently ban IP addresses exhibiting repeated failed login attempts.`,
            realWorldExample: 'Hardening `sshd_config` with `PermitRootLogin no` and `PasswordAuthentication no` immediately rendered thousands of automated Chinese and Russian brute force bots ineffective against a public cloud server.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Generating modern Ed25519 SSH keys and testing connection',
                code: '# Generate modern high-security Ed25519 keypair\nssh-keygen -t ed25519 -C "analyst@cybersec.org"\n\n# Copy public key to remote host securely\nssh-copy-id -i ~/.ssh/id_ed25519.pub user@192.168.1.100',
                output: 'Generating public/private ed25519 key pair.\nYour identification has been saved in /home/analyst/.ssh/id_ed25519\nYour public key has been saved in /home/analyst/.ssh/id_ed25519.pub'
              }
            ]
          },
          {
            id: 'c6-l10',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 10,
            title: 'Bash Scripting for Security Automation',
            durationMinutes: 35,
            summary: 'Writing defensive scripts to check open ports, detect modified files, and automate audit checks.',
            content: `Security engineers automate repetitive inspection tasks using Bash:
- Variables, conditionals ('if/else'), and loops ('for/while').
- Exit codes: Commands return '0' on success and non-zero on failure.
- Automating integrity audits: Scripting automated MD5/SHA-256 checks across critical system directories (\`/bin\`, \`/sbin\`) and emailing alerts if checksums deviate.`,
            realWorldExample: 'A nightly cron job executes a custom 20-line Bash script that scans for newly introduced SUID files, parses failed logins, and posts a summary directly into the security team Slack channel.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Automated security baseline check script in Bash',
                code: '#!/bin/bash\n# Security Baseline Quick Check\necho "[*] Auditing listening ports..."\nss -tuln | grep LISTEN\n\necho "[*] Checking for empty password accounts..."\nawk -F: \'($2 == "") {print $1}\' /etc/shadow 2>/dev/null || echo "Run as root to inspect shadow"\n\necho "[*] Checking SUID binaries..."\nfind / -perm -4000 -type f 2>/dev/null | wc -l\necho "[+] Audit complete."',
                output: '[*] Auditing listening ports...\ntcp   LISTEN  0  128  0.0.0.0:22  0.0.0.0:*\n[*] Checking for empty password accounts...\n[*] Checking SUID binaries...\n32\n[+] Audit complete.'
              }
            ]
          },
          {
            id: 'c6-l11',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 11,
            title: 'Linux Security Practices and CIS Benchmarks',
            durationMinutes: 25,
            summary: 'Applying structured industry hardening baselines: Lynis auditing, AppArmor, and SELinux.',
            content: `Industry-standard configuration frameworks:
- CIS (Center for Internet Security) Benchmarks: Rigorous, consensus-based technical guidelines for hardening Linux distributions.
- Lynis: Open-source automated security auditing tool for Unix-based systems that scans for misconfigurations, weak permissions, and missing patches, outputting a hardening index score.
- Mandatory Access Control (MAC):
  - AppArmor (Ubuntu/Debian): Restricts programs based on path profiles (e.g. preventing the Apache web server process from reading '/etc/shadow' even if the web server is compromised).
  - SELinux (RHEL/CentOS): Labels every file, port, and process with security contexts.`,
            realWorldExample: 'Even though a zero-day exploit gave an attacker remote command execution inside an Apache web server, SELinux blocked the process from accessing user home directories or spawning an outbound reverse shell.',
            codeSnippets: []
          },
          {
            id: 'c6-l12',
            moduleId: 'c6-m1',
            courseId: 'c6',
            number: 12,
            title: 'Practical Linux Security Laboratory Capstone',
            durationMinutes: 40,
            summary: 'Hands-on practical assessment hardening a simulated Linux workstation and auditing misconfigurations.',
            content: `In this comprehensive laboratory exercise, you will apply the Linux skills acquired across this course:
1. Audit and restrict file permissions on sensitive private keys.
2. Search and eliminate rogue processes.
3. Inspect and filter '/var/log/auth.log' to identify attacker IPs.
4. Verify listening network sockets with 'ss'.
5. Prepare a structured Linux hardening report.`,
            realWorldExample: 'Linux system hardening is one of the most sought-after competencies for Cloud Security and DevOps engineering roles.',
            practicalExercise: {
              id: 'ex-c6-l12',
              title: 'Comprehensive Linux System Hardening Challenge',
              objective: 'Audit and remediate multiple security vulnerabilities in a simulated Linux environment.',
              instructions: [
                'Launch the Linux Terminal Lab.',
                'Identify and inspect permissions on sensitive keys using `ls -la id_rsa`.',
                'Harden permissions with `chmod 600 id_rsa`.',
                'Inspect active processes and search for suspicious background netcat listeners.'
              ],
              labType: 'terminal',
              verificationHint: 'Check listening sockets using `ss -tuln` or `ps aux`.'
            },
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c6',
    practicalProjectId: 'proj-c6',
    certificateType: 'Linux Security Engineer Associate',
    status: 'published'
  },

  // Course 7: Network Security
  {
    id: 'c7',
    number: 7,
    pathId: 'path-intermediate',
    title: 'Network Security',
    level: 'Intermediate',
    description: 'Firewall architecture, network segmentation, VLANs, VPN technology, IDS/IPS (Snort/Suricata), wireless security (WPA3), and Wireshark traffic analysis.',
    estimatedHours: 18,
    prerequisites: ['c3', 'c6'],
    learningObjectives: [
      'Design enterprise firewall architectures and Demilitarized Zones (DMZ)',
      'Implement VLAN network segmentation to prevent lateral attack movement',
      'Configure VPN tunnels (IPsec and WireGuard/OpenVPN) for secure remote communication',
      'Analyze deep packet captures with Wireshark to identify malware C2 communication and exploits',
      'Deploy and tune Intrusion Detection and Prevention Systems (IDS/IPS)'
    ],
    modules: [
      {
        id: 'c7-m1',
        courseId: 'c7',
        order: 1,
        title: 'Network Defense & Traffic Analysis',
        description: 'Securing network perimeters, segments, and wireless links.',
        lessons: [
          {
            id: 'c7-l1',
            moduleId: 'c7-m1',
            courseId: 'c7',
            number: 1,
            title: 'Network Security Architecture and the Perimeter',
            durationMinutes: 25,
            summary: 'Screened subnet architectures, edge routers, Demilitarized Zones (DMZ), and internal defense layers.',
            content: `Traditional network security models rely on defense-in-depth perimeter architecture:
- DMZ (Demilitarized Zone): A physical or logical subnet that separates an external untrusted network (the Internet) from an organization's internal confidential network.
  - Public-facing servers (web servers, mail relays, public DNS) sit inside the DMZ.
  - If a public web server in the DMZ is compromised, firewall rules prevent the attacker from pivoting directly into the internal corporate database subnet.
- Bastion Host / Jump Box: A hardened server used as the sole administrative gateway to access sensitive internal networks via SSH or RDP with mandatory MFA.`,
            realWorldExample: 'A retailer hosts its e-commerce website inside a DMZ; the database containing credit cards sits in an isolated internal network accessible only through specific API calls.',
            codeSnippets: []
          },
          {
            id: 'c7-l2',
            moduleId: 'c7-m1',
            courseId: 'c7',
            number: 2,
            title: 'Firewall Architecture and Configuration Principles',
            durationMinutes: 30,
            summary: 'Stateful inspection, rule ordering logic, default-deny architectures, and egress filtering.',
            content: `Firewalls enforce access control between network zones:
- Rule Ordering: Firewalls process rules sequentially from top to bottom. The first matching rule applies, and subsequent rules are ignored. Placing a broad allow rule above a specific deny rule creates a critical security hole!
- Egress Filtering: Monitoring and restricting outbound traffic leaving the corporate network.
  - Most organizations heavily restrict ingress (inbound) traffic but neglect egress. Egress filtering blocks compromised internal workstations from establishing reverse shells or exfiltrating data to adversary C2 servers over unusual ports.`,
            realWorldExample: 'Enforcing egress filtering that allows only Port 80 and 443 outbound prevented ransomware on an internal machine from contacting its command-and-control server to obtain the encryption key.',
            codeSnippets: []
          },
          {
            id: 'c7-l3',
            moduleId: 'c7-m1',
            courseId: 'c7',
            number: 3,
            title: 'Network Segmentation and VLANs',
            durationMinutes: 30,
            summary: 'Virtual LANs (802.1Q), router-on-a-stick, microsegmentation, and preventing lateral movement.',
            content: `Flat networks are a critical hazard: if an attacker compromises one device, they can reach everything on the subnet.
- VLAN (Virtual Local Area Network): Partitions a single physical Layer 2 switch into multiple distinct broadcast domains (e.g., VLAN 10 for Finance, VLAN 20 for Guest Wi-Fi, VLAN 30 for IoT smart devices).
- Inter-VLAN Routing: Traffic between different VLANs must pass through a Layer 3 router or firewall where security inspection and access control policies are strictly enforced.
- Microsegmentation: Implementing granular firewall policies at the workload or virtual machine level inside modern data centers and clouds.`,
            realWorldExample: 'Segmenting IoT thermostats and smart TVs onto an isolated guest VLAN prevented a compromise of a smart aquarium thermometer from pivoting into high-roller casino databases.',
            codeSnippets: []
          },
          {
            id: 'c7-l4',
            moduleId: 'c7-m1',
            courseId: 'c7',
            number: 4,
            title: 'VPN Technology: IPsec, OpenVPN, and WireGuard',
            durationMinutes: 30,
            summary: 'Site-to-site vs remote access VPNs, tunnel mode vs transport mode, and cryptographic protocols.',
            content: `A Virtual Private Network (VPN) creates an encrypted tunnel across an untrusted network:
- Site-to-Site VPN: Permanently connects branch offices to corporate headquarters data centers across the internet.
- Remote Access VPN: Allows remote employees to securely connect their laptops to the corporate network from home or hotels.
- Protocols:
  - IPsec (Internet Protocol Security): Robust, complex, operates at Layer 3 using IKEv2 key exchange. Tunnel Mode encrypts both original IP header and payload.
  - OpenVPN: SSL/TLS-based, operates at Layer 4/5 over TCP or UDP, highly configurable.
  - WireGuard: Modern, streamlined (~4,000 lines of code vs 100,000+ for OpenVPN/IPsec), using state-of-the-art cryptography (ChaCha20, Curve25519) with exceptional speed and security.`,
            realWorldExample: 'Remote employees connecting to enterprise resources using WireGuard benefit from instantaneous connection roaming and military-grade encryption without the performance lag of legacy SSL VPNs.',
            codeSnippets: []
          },
          {
            id: 'c7-l5',
            moduleId: 'c7-m1',
            courseId: 'c7',
            number: 5,
            title: 'Secure Wireless Networks (WPA2, WPA3, 802.1X Enterprise)',
            durationMinutes: 30,
            summary: 'WEP and WPA obsolescence, WPA2 4-Way Handshake vulnerabilities (KRACK), WPA3 SAE, and RADIUS authentication.',
            content: `Wireless networks broadcast signals through physical walls, necessitating robust encryption:
- Legacy WEP/WPA: Broken algorithms (RC4, weak IVs) crackable in seconds. Never use.
- WPA2-Personal: Uses AES-CCMP encryption with a Pre-Shared Key (PSK). Vulnerable to offline dictionary cracking if an attacker captures the 4-way handshake when a device connects.
- WPA3: Introduces SAE (Simultaneous Authentication of Equals / Dragonfly handshake), providing forward secrecy and rendering offline dictionary attacks completely impossible even with simple passwords.
- WPA2/WPA3-Enterprise (802.1X): No shared password. Each user authenticates with individual credentials or client certificates against a central RADIUS/Active Directory server.`,
            realWorldExample: 'Enterprise offices use 802.1X Enterprise authentication so that when an employee departs the company, their individual Wi-Fi access is revoked instantly without needing to change the Wi-Fi password for 500 other employees.',
            codeSnippets: []
          },
          {
            id: 'c7-l6',
            moduleId: 'c7-m1',
            courseId: 'c7',
            number: 6,
            title: 'Intrusion Detection and Prevention Systems (IDS and IPS)',
            durationMinutes: 35,
            summary: 'Snort, Suricata, Zeek: Signature-based detection vs anomaly/heuristic detection, inline vs passive tapping.',
            content: `Monitoring traffic for active exploit attempts:
- IDS (Intrusion Detection System): Passive monitor (out-of-band via switch SPAN/mirror port). Analyzes copies of packets and raises an alert if an attack is detected, without delaying network traffic.
- IPS (Intrusion Prevention System): Inline device (in-band). Packets pass physically through the IPS. If an attack signature matches, the IPS immediately drops the malicious packets in real time, preventing exploitation.
- Detection Approaches:
  - Signature-Based: Matches known attack patterns (e.g., regex matching a specific CVE exploit payload). High precision, zero zero-day coverage.
  - Anomaly-Based: Learns a baseline of normal network behavior (bandwidth, protocols, timing) and flags deviations. Can detect zero-days, but prone to false positives.`,
            realWorldExample: 'An inline Suricata IPS matched an inbound payload against an EternalBlue SMB exploit rule and instantly dropped the TCP connection before the target Windows server could process the packet.',
            codeSnippets: [
              {
                language: 'text',
                description: 'Sample Snort IDS rule detecting cleartext root password transmission over telnet',
                code: 'alert tcp any any -> any 23 (msg:"TELNET root login attempt"; content:"login: root"; nocase; sid:1000001; rev:1;)'
              }
            ]
          },
          {
            id: 'c7-l7',
            moduleId: 'c7-m1',
            courseId: 'c7',
            number: 7,
            title: 'Introduction to Wireshark & Practical Traffic Analysis',
            durationMinutes: 40,
            summary: 'Packet capture mechanics, display filters, stream following, protocol hierarchy statistics, and forensic carving.',
            content: `Wireshark is the world's foremost network protocol analyzer:
- Interface Layout: Packet List (top), Packet Details tree (middle), Packet Bytes hex dump (bottom).
- Display Filters vs Capture Filters:
  - Capture Filters (BPF): Applied before saving packets to disk (e.g. 'host 192.168.1.50 and port 80').
  - Display Filters: Applied to already captured packets in memory (e.g. 'http.request.method == "POST"' or 'tcp.flags.syn == 1 and tcp.flags.ack == 0').
- Follow TCP Stream: Reconstructs the entire bidirectional conversation between client and server into clean, readable text.`,
            realWorldExample: 'A security investigator used Wireshark’s "Follow TCP Stream" feature to read cleartext credentials sent during an unencrypted FTP session.',
            practicalExercise: {
              id: 'ex-c7-l7',
              title: 'Interactive Wireshark Packet Analysis',
              objective: 'Analyze captured packets to identify anomalous traffic flows and data exfiltration.',
              instructions: [
                'Launch the Network Packet Analyzer lab.',
                'Filter for `DNS` queries to identify anomalous large TXT record requests (DNS tunneling indicator).',
                'Inspect the TCP handshake sequence and observe SYN/ACK flag states.'
              ],
              labType: 'wireshark',
              verificationHint: 'Notice how display filters isolate high-volume traffic down to specific investigation targets.'
            },
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c7',
    practicalProjectId: 'proj-c7',
    certificateType: 'Network Security Specialist Certificate',
    status: 'published'
  },

  // Course 8: Cryptography and Data Protection
  {
    id: 'c8',
    number: 8,
    pathId: 'path-intermediate',
    title: 'Cryptography and Data Protection',
    level: 'Intermediate',
    description: 'Symmetric & asymmetric encryption, hashing algorithms, digital signatures, PKI, TLS handshakes, encryption at rest/transit, and key management.',
    estimatedHours: 18,
    prerequisites: ['c1'],
    learningObjectives: [
      'Differentiate between symmetric (AES, ChaCha20) and asymmetric (RSA, ECC) encryption',
      'Explain collision resistance and properties of cryptographic hash functions (SHA-256, SHA-3)',
      'Analyze the mechanics of Digital Signatures and Public Key Infrastructure (PKI)',
      'Deconstruct the TLS 1.3 cryptographic handshake process',
      'Formulate secure key management and encryption strategies for data at rest and data in transit'
    ],
    modules: [
      {
        id: 'c8-m1',
        courseId: 'c8',
        order: 1,
        title: 'Core Cryptographic Principles',
        description: 'Symmetric, asymmetric, hashing, and digital certificates.',
        lessons: [
          {
            id: 'c8-l1',
            moduleId: 'c8-m1',
            courseId: 'c8',
            number: 1,
            title: 'Introduction to Cryptography: Ciphers, Plaintext, and Ciphertext',
            durationMinutes: 25,
            summary: 'Historical ciphers (Caesar, Vigenère), Kerckhoffs’s Principle, and modern mathematical cryptography.',
            content: `Cryptography is the science of transforming readable information into an unreadable format to protect confidentiality and integrity:
- Plaintext: The original, readable message.
- Ciphertext: The encrypted, unreadable output produced by applying an encryption algorithm with a secret key.
- Kerckhoffs’s Principle: A cryptographic system should be secure even if everything about the system, except the key, is public knowledge. Never rely on "security through obscurity" (inventing your own secret algorithm); rely on rigorously peer-reviewed, open mathematical algorithms like AES!`,
            realWorldExample: 'The Caesar Cipher (shifting letters by 3) is broken instantly by frequency analysis. Modern AES-256 would require trillions of years of supercomputer calculation to break by brute force.',
            codeSnippets: []
          },
          {
            id: 'c8-l2',
            moduleId: 'c8-m1',
            courseId: 'c8',
            number: 2,
            title: 'Symmetric Encryption: AES and Block Cipher Modes',
            durationMinutes: 30,
            summary: 'Shared secret keys, AES-128/256, Block ciphers vs Stream ciphers, and ECB vs CBC vs GCM modes.',
            content: `Symmetric encryption uses the SAME single secret key for both encryption and decryption:
- Speed: Extremely fast and computationally efficient, ideal for encrypting gigabytes of files, disks, or streaming video.
- AES (Advanced Encryption Standard): The global gold standard with key lengths of 128, 192, and 256 bits.
- Block Cipher Modes:
  - ECB (Electronic Codebook - INSECURE): Encrypts identical blocks of plaintext into identical blocks of ciphertext, preserving structural patterns (the infamous "ECB Penguin").
  - CBC (Cipher Block Chaining): Chains blocks using an Initialization Vector (IV).
  - GCM (Galois/Counter Mode - RECOMMENDED): High performance authenticated encryption that provides both confidentiality and built-in cryptographic integrity verification!`,
            realWorldExample: 'BitLocker and FileVault use AES-XTS mode to encrypt entire hard drives, ensuring that if a laptop is physically stolen, data cannot be extracted without the recovery key.',
            diagramType: 'pki-flow',
            codeSnippets: []
          },
          {
            id: 'c8-l3',
            moduleId: 'c8-m1',
            courseId: 'c8',
            number: 3,
            title: 'Asymmetric Encryption: Public and Private Key Cryptography',
            durationMinutes: 35,
            summary: 'RSA, Elliptic Curve Cryptography (ECC), Diffie-Hellman key exchange, and solving the key distribution problem.',
            content: `Symmetric encryption suffers from the "Key Distribution Problem": how do two parties who have never met safely share a secret key across the public internet without an eavesdropper stealing it?
- Asymmetric Encryption solves this using mathematically linked KEY PAIRS:
  - Public Key: Freely published to the world. Anyone can use your public key to encrypt a message intended for you.
  - Private Key: Guarded strictly by the owner and never shared. ONLY your private key can decrypt messages encrypted with your public key!
- Algorithms:
  - RSA: Based on the mathematical difficulty of factoring huge prime numbers (2048-4096 bits).
  - ECC (Elliptic Curve Cryptography): Based on the discrete logarithm problem over elliptic curves. Provides equivalent or superior security to RSA with significantly smaller keys (256-bit ECC $\\approx$ 3072-bit RSA), saving bandwidth and CPU cycles.`,
            realWorldExample: 'When connecting to your bank website, your browser uses asymmetric cryptography to securely negotiate a temporary symmetric session key, after which fast AES symmetric encryption takes over for data transfer.',
            codeSnippets: []
          },
          {
            id: 'c8-l4',
            moduleId: 'c8-m1',
            courseId: 'c8',
            number: 4,
            title: 'Cryptographic Hash Functions: SHA-256 and Collision Resistance',
            durationMinutes: 30,
            summary: 'One-way functions, fixed-length digests, avalanche effect, MD5/SHA-1 obsolescence, and password hashing (bcrypt/Argon2).',
            content: `A cryptographic hash function is a mathematical algorithm that maps arbitrary-length input data into a fixed-size string of bytes (digest):
- Essential Properties:
  1. Deterministic: The same input always produces the exact same hash output.
  2. One-Way (Pre-image Resistance): Computationally infeasible to reverse a hash back to its original plaintext input.
  3. Avalanche Effect: Changing a single bit in the input causes a drastic, unpredictable change across the entire hash output.
  4. Collision Resistance: Infeasible to find two different inputs that produce the same hash.
- Deprecated Hashes: MD5 and SHA-1 have known practical collision attacks and must NEVER be used for security. Use SHA-256, SHA-3, or BLAKE3.
- Password Hashing: Fast hashes (SHA-256) are poor choices for passwords because GPUs can calculate billions per second. Always use intentionally slow, memory-hard key derivation functions: Argon2id, bcrypt, or PBKDF2 with unique salts!`,
            realWorldExample: 'Linux password hashes in `/etc/shadow` use salted yescrypt or SHA-512 algorithms to slow down offline password cracking attempts.',
            practicalExercise: {
              id: 'ex-c8-l4',
              title: 'Interactive Cryptographic Hashing Lab',
              objective: 'Experiment with SHA-256, verify data integrity, and observe the Avalanche Effect.',
              instructions: [
                'Launch the Cryptography Lab.',
                'Type a message and generate its SHA-256 digest.',
                'Change a single letter and note how drastically the output changes.',
                'Compare SHA-256 vs MD5 speed and properties.'
              ],
              labType: 'crypto',
              verificationHint: 'Notice how hashing is strictly one-way: you cannot "decrypt" a hash.'
            },
            codeSnippets: []
          },
          {
            id: 'c8-l5',
            moduleId: 'c8-m1',
            courseId: 'c8',
            number: 5,
            title: 'Digital Signatures, Certificates, and PKI',
            durationMinutes: 35,
            summary: 'Authenticity, non-repudiation, X.509 certificates, Certificate Authorities (CAs), CRLs, and OCSP.',
            content: `Digital Signatures provide authentication, integrity, and non-repudiation:
- How Digital Signatures Work:
  1. The sender hashes the document to create a digest.
  2. The sender encrypts the digest with their PRIVATE key. This encrypted hash IS the digital signature.
  3. The recipient decrypts the signature using the sender’s PUBLIC key to recover the digest.
  4. The recipient independently calculates the hash of the document and compares the two. If they match, the recipient is mathematically certain that:
     - The document was not altered in transit (Integrity).
     - The document was genuinely created by the holder of the private key (Authentication).
- Public Key Infrastructure (PKI): The framework of Certificate Authorities (CAs like Let's Encrypt, DigiCert) that issue digital X.509 certificates verifying that a specific public key belongs to a specific entity or domain.`,
            realWorldExample: 'When software updates are downloaded from Apple or Microsoft, your OS checks the digital signature against trusted root CA certificates before executing the installer.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c8',
    practicalProjectId: 'proj-c8',
    certificateType: 'Applied Cryptography Specialist',
    status: 'published'
  },

  // Course 9: Web Application Security
  {
    id: 'c9',
    number: 9,
    pathId: 'path-intermediate',
    title: 'Web Application Security',
    level: 'Intermediate',
    description: 'OWASP Top 10, SQL Injection, Cross-Site Scripting (XSS), CSRF, Broken Access Control, Security Misconfiguration, and secure coding practices.',
    estimatedHours: 20,
    prerequisites: ['c3'],
    learningObjectives: [
      'Deconstruct the HTTP request/response cycle and web application architecture',
      'Analyze the OWASP Top 10 web application security risks',
      'Identify and remediate SQL Injection vulnerabilities using parameterized queries',
      'Demonstrate Reflected, Stored, and DOM-based Cross-Site Scripting (XSS) prevention',
      'Implement robust authentication, session management, and role-based authorization controls'
    ],
    modules: [
      {
        id: 'c9-m1',
        courseId: 'c9',
        order: 1,
        title: 'Web Vulnerabilities & OWASP Top 10',
        description: 'Deep dive into attacking and defending web applications.',
        lessons: [
          {
            id: 'c9-l1',
            moduleId: 'c9-m1',
            courseId: 'c9',
            number: 1,
            title: 'How Web Applications Work & The HTTP Lifecycle',
            durationMinutes: 25,
            summary: 'Client-server model, REST APIs, Cookies, Sessions, Headers, and CORS.',
            content: `Web applications operate across stateless HTTP interactions:
- Request/Response: Clients submit HTTP verbs (GET, POST, PUT, DELETE) with headers, path parameters, and JSON/form bodies. Servers process input, query databases, and return status codes (200 OK, 301 Redirect, 401 Unauthorized, 403 Forbidden, 500 Server Error).
- Session Management: Because HTTP is stateless, servers issue Session IDs stored in client cookies.
- Critical Cookie Flags:
  - 'HttpOnly': Prevents JavaScript from reading the cookie, neutralizing session cookie theft via XSS!
  - 'Secure': Ensures the cookie is transmitted only over encrypted HTTPS connections.
  - \`SameSite=Strict\`: Prevents the cookie from being sent in cross-site requests, mitigating CSRF.`,
            realWorldExample: 'Failing to set the `HttpOnly` flag on session cookies allows an attacker who injects an XSS payload to execute `document.cookie` and steal full administrative login sessions.',
            codeSnippets: []
          },
          {
            id: 'c9-l2',
            moduleId: 'c9-m1',
            courseId: 'c9',
            number: 2,
            title: 'SQL Injection (SQLi): Mechanics, Exploitation, and Prevention',
            durationMinutes: 35,
            summary: 'Insecure string concatenation, authentication bypass (\' OR 1=1 --), UNION-based extraction, and parameterized prepared statements.',
            content: `SQL Injection occurs when untrusted user input is directly concatenated into a dynamic SQL query, tricking the database interpreter into executing attacker-supplied SQL commands:
- Vulnerable Dynamic Query:
  SELECT * FROM users WHERE username = '" + userInput + "' AND password = '" + pass + "'
- Attack Input:
  - Username: admin' --
  - Resulting Query: SELECT * FROM users WHERE username = 'admin' --' AND password = '...'
  - The '--' characters comment out the rest of the query, logging in as admin without checking the password!
- Remediation (The Only Reliable Fix): Parameterized Queries / Prepared Statements.
  - Parameterized queries separate SQL code structure from user data. The database compiles the SQL statement template first; user input is then bound strictly as literal data, never executed as SQL code regardless of what special characters it contains!`,
            realWorldExample: 'The Sony Pictures and TalkTalk mega-breaches both originated from simple un-parameterized SQL injection flaws in public web forms.',
            practicalExercise: {
              id: 'ex-c9-l2',
              title: 'Interactive SQL Injection Sandbox',
              objective: 'Test SQL injection bypass payloads and inspect how parameterized queries neutralize the attack.',
              instructions: [
                'Launch the Web Security Sandbox lab.',
                'Test authentication bypass payload admin\' OR \'1\'=\'1\' --.',
                'Toggle "Parameterized Queries" to observe how the query engine neutralizes the payload.'
              ],
              labType: 'web-security',
              verificationHint: 'Notice how prepared statements treat the quote marks as literal characters rather than query syntax delimiters.'
            },
            codeSnippets: [
              {
                language: 'javascript',
                description: 'Vulnerable query vs Secure Parameterized Query in Node.js',
                code: '// ❌ VULNERABLE: Direct string concatenation\nconst query = "SELECT * FROM accounts WHERE id = " + req.body.id;\n\n// ✅ SECURE: Parameterized prepared statement\nconst query = "SELECT * FROM accounts WHERE id = $1";\nawait pool.query(query, [req.body.id]);'
              }
            ]
          },
          {
            id: 'c9-l3',
            moduleId: 'c9-m1',
            courseId: 'c9',
            number: 3,
            title: 'Cross-Site Scripting (XSS): Reflected, Stored, and DOM-based',
            durationMinutes: 35,
            summary: 'Injecting malicious JavaScript, session hijacking, defacement, HTML entity encoding, and Content Security Policy (CSP).',
            content: `Cross-Site Scripting (XSS) occurs when a web application includes untrusted user data in an outgoing web page without proper validation or contextual output encoding, causing the victim’s browser to execute malicious JavaScript:
- Three Flavors of XSS:
  1. Stored XSS: Malicious payload is permanently saved in the application database (e.g., in a blog comment or profile biography). Every user who views the page executes the malicious script.
  2. Reflected XSS: Payload is embedded in a link (e.g., search parameter '?q=<script>...'). When the victim clicks the link, the server reflects the input directly into the response page.
  3. DOM-based XSS: Vulnerability exists entirely on the client side in JavaScript code (e.g., using 'element.innerHTML = location.hash').
- Remediation:
  - Contextual Output Encoding (HTML entity encoding, JS escaping).
  - Use modern frameworks (React, Angular) that automatically escape content rendered via data bindings.
  - Content Security Policy (CSP): HTTP header restricting which scripts, styles, and image sources the browser is permitted to execute.`,
            realWorldExample: 'The Samy MySpace worm used Stored XSS to infect over 1 million users within 20 hours by forcing everyone who viewed Samy\'s profile to add him as a hero and copy the payload into their own profile.',
            codeSnippets: [
              {
                language: 'html',
                description: 'Content Security Policy (CSP) header example',
                code: 'Content-Security-Policy: default-src \'self\'; script-src \'self\' https://trustedscripts.com; object-src \'none\';'
              }
            ]
          },
          {
            id: 'c9-l4',
            moduleId: 'c9-m1',
            courseId: 'c9',
            number: 4,
            title: 'Broken Access Control (OWASP #1 Hazard)',
            durationMinutes: 30,
            summary: 'IDOR (Insecure Direct Object References), privilege escalation, and enforcing server-side authorization checks.',
            content: `Broken Access Control ranks as the #1 most common and critical vulnerability in the OWASP Top 10:
- Insecure Direct Object References (IDOR): Occurs when an application uses user-supplied input to access objects directly without verifying if the user has authorization:
  - URL: 'https://bank.com/api/receipts?id=1042'
  - If a user changes 'id=1042' to 'id=1043' and can view another customer’s receipt, an IDOR vulnerability exists!
- Missing Function Level Access Control: Forgetting to verify whether a user is an administrator before executing sensitive API endpoints (e.g., 'POST /api/admin/deleteUser').
- Golden Rule: Never rely on hiding UI buttons on the client side! Every single API endpoint on the server must explicitly verify the identity and permissions of the requesting user session before executing any action.`,
            realWorldExample: 'A real estate title insurance company exposed 885 million confidential mortgage records because document URLs used sequential numbers without checking user authentication.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c9',
    practicalProjectId: 'proj-c9',
    certificateType: 'Web Application Security Specialist',
    status: 'published'
  },

  // Course 10: Ethical Hacking Fundamentals
  {
    id: 'c10',
    number: 10,
    pathId: 'path-intermediate',
    title: 'Ethical Hacking Fundamentals',
    level: 'Intermediate',
    description: 'Methodologies, legal boundaries, scoping, OSINT reconnaissance, Nmap scanning, vulnerability mapping, safe exploitation, and professional pentest reporting.',
    estimatedHours: 20,
    prerequisites: ['c6', 'c7', 'c9'],
    learningObjectives: [
      'Define legal boundaries, rules of engagement, and scoping documentation for penetration testing',
      'Execute Open Source Intelligence (OSINT) and active reconnaissance against target networks',
      'Conduct network port and service scanning using Nmap with advanced NSE scripts',
      'Assess and prioritize vulnerabilities using CVE and CVSS risk metrics',
      'Author professional penetration testing reports with actionable remediation advice'
    ],
    modules: [
      {
        id: 'c10-m1',
        courseId: 'c10',
        order: 1,
        title: 'Penetration Testing Methodology',
        description: 'Structured methodologies from planning to final reporting.',
        lessons: [
          {
            id: 'c10-l1',
            moduleId: 'c10-m1',
            courseId: 'c10',
            number: 1,
            title: 'Ethical Hacking Methodology & Rules of Engagement',
            durationMinutes: 30,
            summary: 'PTES (Penetration Testing Execution Standard), contracts, authorization, and scope boundaries.',
            content: `Professional ethical hacking follows structured phases:
1. Pre-engagement Interactions: Scoping, signing Non-Disclosure Agreements (NDAs), defining Rules of Engagement (RoE), and emergency contact procedures.
2. Intelligence Gathering (OSINT): Passive reconnaissance collecting public data without directly touching the target.
3. Threat Modeling: Identifying high-value assets and potential attack paths.
4. Vulnerability Analysis: Scanning and discovering weaknesses in software, services, or configurations.
5. Exploitation: Validating vulnerabilities through controlled proof-of-concept tests without causing denial-of-service.
6. Post-Exploitation: Determining value of compromised assets and potential lateral movement.
7. Reporting: Delivering executive summaries and technical remediation guidance.`,
            realWorldExample: 'A penetration testing team adhered strictly to the agreed IP ranges in their RoE, preventing accidental interference with a third-party payment gateway.',
            codeSnippets: []
          },
          {
            id: 'c10-l2',
            moduleId: 'c10-m1',
            courseId: 'c10',
            number: 2,
            title: 'Information Gathering & OSINT (Open Source Intelligence)',
            durationMinutes: 35,
            summary: 'Shodan, Censys, Whois, theHarvester, Google Dorking, and passive DNS analysis.',
            content: `Reconnaissance is 70% of a successful assessment:
- Passive Reconnaissance: Collecting information without interacting with the target's infrastructure directly:
  - Search Engine Dorking (e.g. 'site:target.com filetype:pdf confidential').
  - Shodan & Censys: Search engines that index internet-connected devices, open ports, and service banners.
  - Certificate Transparency Logs (crt.sh): Discovering obscure internal subdomains registered under company certificates.
  - Job Postings: Reviewing company openings for specific technologies (e.g. "Seeking engineer with AWS, Kubernetes 1.22, and PostgreSQL 12 experience") reveals their exact internal tech stack!`,
            realWorldExample: 'Security researchers discovered an unsecured development staging portal simply by checking historical SSL certificate transparency logs on crt.sh.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Querying subdomains using sublist3r or curl against crt.sh',
                code: '# Query Certificate Transparency logs for target subdomains\ncurl -s "https://crt.sh/?q=%25.example.com&output=json" | grep -o \'"name_value":[^,]*\' | sort -u'
              }
            ]
          },
          {
            id: 'c10-l3',
            moduleId: 'c10-m1',
            courseId: 'c10',
            number: 3,
            title: 'Network Scanning and Asset Discovery with Nmap',
            durationMinutes: 40,
            summary: 'TCP SYN scan (-sS), Version detection (-sV), OS fingerprinting (-O), and Nmap Scripting Engine (NSE).',
            content: `Nmap (Network Mapper) is the quintessential tool for network discovery:
- Common Scan Types:
  - '-sS' (TCP SYN Stealth Scan): Sends SYN packet, awaits SYN-ACK, immediately sends RST to tear down connection before handshake completes. Fast and unobtrusive.
  - '-sT' (TCP Connect Scan): Completes full 3-way handshake. Used when running without root privileges.
  - '-sU' (UDP Scan): Scans UDP services (DNS, SNMP).
  - '-sV' (Version Detection): Probes open ports to determine exact software application and version banner.
  - '-O' (OS Detection): Analyzes TCP/IP stack implementation nuances to guess operating system.
  - \`-sC\` (Default NSE Scripts): Executes safe Lua scripts to detect common vulnerabilities and extract metadata.`,
            realWorldExample: 'An Nmap scan using `nmap -sV -sC -p 1-65535 192.168.1.50` discovered an unauthenticated Redis database listening on port 6379, allowing instant root access.',
            codeSnippets: [
              {
                language: 'bash',
                description: 'Comprehensive Nmap service and vulnerability scan',
                code: '# Comprehensive scan: SYN scan, version detection, safe scripts, aggressive timing\nsudo nmap -sS -sV -sC -T4 -p- -oN target_scan.txt 192.168.1.100',
                output: 'PORT     STATE SERVICE       VERSION\n22/tcp   open  ssh           OpenSSH 8.2p1 Ubuntu 4ubuntu0.5\n80/tcp   open  http          Apache httpd 2.4.41 ((Ubuntu))\n445/tcp  open  netbios-ssn   Samba smbd 4.6.2'
              }
            ]
          }
        ]
      }
    ],
    finalExamId: 'exam-c10',
    practicalProjectId: 'proj-c10',
    certificateType: 'Ethical Hacking Fundamentals Certificate',
    status: 'published'
  },

  // Courses 11 & 12
  {
    id: 'c11',
    number: 11,
    pathId: 'path-intermediate',
    title: 'Vulnerability Assessment and Management',
    level: 'Intermediate',
    description: 'Vulnerability lifecycle, CVEs, CVSS 3.1/4.0 scoring, vulnerability scanners (Nessus, OpenVAS), risk prioritization, patch remediation, and verification.',
    estimatedHours: 16,
    prerequisites: ['c6', 'c7'],
    learningObjectives: [
      'Implement the continuous vulnerability management lifecycle',
      'Calculate CVSS scores across Base, Temporal, and Environmental metrics',
      'Operate automated vulnerability assessment scanners and filter false positives',
      'Formulate risk-based remediation priorities tailored to organizational assets',
      'Verify patch deployments through structured regression scanning'
    ],
    modules: [
      {
        id: 'c11-m1',
        courseId: 'c11',
        order: 1,
        title: 'Vulnerability Management Lifecycle',
        description: 'Discovery, scoring, triage, remediation, and reporting.',
        lessons: [
          {
            id: 'c11-l1',
            moduleId: 'c11-m1',
            courseId: 'c11',
            number: 1,
            title: 'Vulnerabilities, Threats, and CVSS Scoring Fundamentals',
            durationMinutes: 30,
            summary: 'Understanding CVE identifiers, NVD database, and calculating CVSS Base metrics.',
            content: `Vulnerability management moves organizations from reactive panic to structured defense:
- Common Vulnerabilities and Exposures (CVE): Standardized identifiers (e.g., CVE-2021-44228 for Log4Shell) managed by MITRE.
- CVSS (Common Vulnerability Scoring System): Provides a numerical score from 0.0 to 10.0 representing severity:
  - 0.0: None
  - 0.1 - 3.9: Low
  - 4.0 - 6.9: Medium
  - 7.0 - 8.9: High
  - 9.0 - 10.0: Critical
- Base Metric Factors: Attack Vector (Network, Adjacent, Local, Physical), Attack Complexity, Privileges Required, User Interaction, and CIA Impact.`,
            realWorldExample: 'Log4Shell received a maximum CVSS 10.0 score because it is remotely exploitable over the internet with zero authentication and zero user interaction.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c11',
    certificateType: 'Vulnerability Management Analyst',
    status: 'published'
  },
  {
    id: 'c12',
    number: 12,
    pathId: 'path-intermediate',
    title: 'Security Monitoring and Incident Response',
    level: 'Intermediate',
    description: 'SIEM engineering, event log aggregation, alert triage, incident response lifecycle (NIST SP 800-61 / SANS), containment, evidence preservation, and post-incident review.',
    estimatedHours: 18,
    prerequisites: ['c6', 'c7'],
    learningObjectives: [
      'Explain the 6 phases of Incident Response (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned)',
      'Aggregate and correlate heterogeneous security events using SIEM platforms',
      'Analyze Windows Security Event Logs and Linux audit logs to triage active attacks',
      'Execute network isolation and process termination containment strategies',
      'Draft actionable incident response post-mortem reports'
    ],
    modules: [
      {
        id: 'c12-m1',
        courseId: 'c12',
        order: 1,
        title: 'SOC Operations & Incident Handling',
        description: 'Triaging security alerts and responding to intrusions.',
        lessons: [
          {
            id: 'c12-l1',
            moduleId: 'c12-m1',
            courseId: 'c12',
            number: 1,
            title: 'Security Information and Event Management (SIEM) Architecture',
            durationMinutes: 30,
            summary: 'Log forwarding, parsing, normalization, correlation rules, and alert generation.',
            content: `A SIEM (e.g., Splunk, Microsoft Sentinel, Elastic Security) is the central nervous system of a Security Operations Center (SOC):
- Ingestion: Collectors and agents forward logs from firewalls, domain controllers, cloud environments, and workstations.
- Normalization: Converts varied log formats into a common schema (e.g. Elastic Common Schema).
- Correlation Rules: Evaluates relationships across different log sources (e.g., "If 10 failed logins occur on a workstation followed immediately by 1 successful login, and within 30 seconds that workstation connects to an external IP on port 4444, fire a High-Severity alert!").`,
            realWorldExample: 'A correlation rule alerted SOC analysts when an employee’s VPN account logged in from New York and 10 minutes later logged in from Singapore (impossible travel anomaly).',
            codeSnippets: []
          },
          {
            id: 'c12-l2',
            moduleId: 'c12-m1',
            courseId: 'c12',
            number: 2,
            title: 'The Incident Response Lifecycle (NIST SP 800-61)',
            durationMinutes: 35,
            summary: 'Preparation, Detection & Analysis, Containment, Eradication, Recovery, and Post-Incident Activity.',
            content: `The NIST Incident Response framework standardizes organizational response:
1. Preparation: Establishing incident response plans, communication channels, forensics jump bags, and training teams.
2. Detection & Analysis: Validating whether an alert is a genuine security incident or false positive, determining scope and impact.
3. Containment: Short-term isolation (disconnecting network cable, changing compromised passwords) to prevent spread without destroying volatile evidence.
4. Eradication: Removing all malware binaries, backdoors, rogue accounts, and persistence mechanisms.
5. Recovery: Restoring systems from trusted clean backups, monitoring closely for reinfection.
6. Lessons Learned: Conducting a post-mortem meeting to document timeline, root cause, and improve defensive controls.`,
            realWorldExample: 'A company successfully contained ransomware to a single branch office by immediately executing network segment isolation before the malware could cross site-to-site VPN tunnels.',
            diagramType: 'incident-lifecycle',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c12',
    practicalProjectId: 'proj-c12',
    certificateType: 'Security Analyst Certificate',
    status: 'published'
  },

  // ==========================================
  // ADVANCED COURSES (Courses 13 - 21)
  // ==========================================
  {
    id: 'c13',
    number: 13,
    pathId: 'path-advanced',
    title: 'Advanced Ethical Hacking and Penetration Testing',
    level: 'Advanced',
    description: 'Advanced red team operations: Active Directory exploitation, Kerberoasting, BloodHound attack pathing, privilege escalation, AV/EDR evasion concepts, and executive reporting.',
    estimatedHours: 24,
    prerequisites: ['c10'],
    learningObjectives: [
      'Execute enterprise Active Directory attack chains (Kerberoasting, AS-REP roasting)',
      'Analyze attack graphs using BloodHound to identify shortest paths to Domain Admin',
      'Demonstrate privilege escalation in hardened Windows and Linux environments',
      'Explain adversary emulation techniques mapped to the MITRE ATT&CK framework',
      'Produce comprehensive, board-ready penetration testing deliverables'
    ],
    modules: [
      {
        id: 'c13-m1',
        courseId: 'c13',
        order: 1,
        title: 'Active Directory Attacks & Red Teaming',
        description: 'Enterprise penetration testing and domain takeover mechanics.',
        lessons: [
          {
            id: 'c13-l1',
            moduleId: 'c13-m1',
            courseId: 'c13',
            number: 1,
            title: 'Active Directory Architecture and Kerberos Authentication',
            durationMinutes: 35,
            summary: 'Domain Controllers, LDAP, Kerberos tickets (TGT, TGS), service principal names (SPNs), and trust relationships.',
            content: `Over 90% of Fortune 500 corporations utilize Microsoft Active Directory for enterprise identity and access management:
- Kerberos Protocol:
  1. Client sends pre-authentication to Key Distribution Center (KDC).
  2. KDC returns Ticket Granting Ticket (TGT).
  3. Client requests a Ticket Granting Service (TGS) ticket for a specific resource (e.g. MSSQL server).
  4. KDC issues TGS ticket encrypted with the service account’s password hash.
- Kerberoasting Attack: Any authenticated domain user can request a TGS ticket for any service account with a registered SPN. The attacker exports the ticket from memory and cracks the service account's password offline using Hashcat without triggering account lockouts!`,
            realWorldExample: 'Penetration testers dumped a Kerberos ticket for a legacy SQL server service account that had Domain Admin privileges, cracked its weak 8-character password offline in 10 minutes, and gained full control of the entire enterprise domain.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c13',
    certificateType: 'Advanced Penetration Tester Certificate',
    status: 'published'
  },
  {
    id: 'c14',
    number: 14,
    pathId: 'path-advanced',
    title: 'Advanced Web and API Security',
    level: 'Advanced',
    description: 'OAuth 2.0 & OIDC flaws, Server-Side Request Forgery (SSRF), Insecure Deserialization, GraphQL vulnerabilities, API rate limiting, and security testing automation.',
    estimatedHours: 22,
    prerequisites: ['c9'],
    learningObjectives: [
      'Audit OAuth 2.0 and OpenID Connect flows for redirect URI manipulation and token leakage',
      'Exploit and remediate Server-Side Request Forgery (SSRF) against cloud metadata endpoints',
      'Identify insecure deserialization vulnerabilities across multiple programming runtimes',
      'Design rate-limiting, abuse prevention, and JWT security architectures'
    ],
    modules: [
      {
        id: 'c14-m1',
        courseId: 'c14',
        order: 1,
        title: 'API Security & Advanced Vulnerabilities',
        description: 'Securing modern microservices, cloud APIs, and authentication flows.',
        lessons: [
          {
            id: 'c14-l1',
            moduleId: 'c14-m1',
            courseId: 'c14',
            number: 1,
            title: 'Server-Side Request Forgery (SSRF) in Cloud Environments',
            durationMinutes: 35,
            summary: 'How SSRF enables attackers to query AWS/GCP/Azure instance metadata (169.254.169.254) and steal IAM role credentials.',
            content: `SSRF occurs when a web server fetches a remote resource (e.g., generating a link preview, importing a profile picture from a URL, or downloading a PDF) without validating the user-supplied destination IP:
- Cloud Exploitation: Cloud virtual machines access instance metadata via the local link-local IP 'http://169.254.169.254/latest/meta-data/'.
  - If an attacker submits this internal IP into a vulnerable webhook form, the cloud server requests the metadata locally and returns temporary IAM role access keys directly to the attacker!
- Remediation: Enforce strict URL allowlists, disable HTTP redirects, block internal RFC 1918 and link-local IP ranges, and require IMDSv2 (which mandates token headers).`,
            realWorldExample: 'The Capital One breach was caused by an SSRF flaw that allowed the attacker to reach the AWS EC2 metadata service and extract credentials granting access to 700 S3 buckets.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c14',
    certificateType: 'Application Security Engineer Certificate',
    status: 'published'
  },
  {
    id: 'c15',
    number: 15,
    pathId: 'path-advanced',
    title: 'Cloud Security',
    level: 'Advanced',
    description: 'AWS, Azure, and GCP security: Shared Responsibility Model, Cloud IAM least privilege, S3 bucket hardening, VPC peering, cloud logging (CloudTrail), and container security.',
    estimatedHours: 22,
    prerequisites: ['c7', 'c8'],
    learningObjectives: [
      'Apply the Shared Responsibility Model across IaaS, PaaS, and SaaS environments',
      'Design least-privilege IAM policies, service accounts, and cross-account roles',
      'Audit cloud storage, serverless functions, and VPC security groups against misconfigurations',
      'Implement central cloud detection and logging with AWS CloudTrail, GuardDuty, and Security Hub'
    ],
    modules: [
      {
        id: 'c15-m1',
        courseId: 'c15',
        order: 1,
        title: 'Cloud Architecture & IAM Hardening',
        description: 'Securing multi-cloud infrastructure and identities.',
        lessons: [
          {
            id: 'c15-l1',
            moduleId: 'c15-m1',
            courseId: 'c15',
            number: 1,
            title: 'The Cloud Shared Responsibility Model & Cloud Misconfigurations',
            durationMinutes: 30,
            summary: 'Security OF the cloud vs Security IN the cloud, and why misconfigurations cause 95% of cloud breaches.',
            content: `In the cloud, responsibility is divided:
- Cloud Provider (AWS/Azure/Google): Responsible for physical data center security, hardware maintenance, hypervisor patching, and cabling (Security OF the Cloud).
- Customer: Responsible for customer data, IAM access controls, firewall security groups, operating system updates on EC2/VMs, and encryption configurations (Security IN the Cloud).
- The Misconfiguration Epidemic: The vast majority of cloud breaches are not caused by cloud provider flaws, but by customers leaving default public permissions on storage buckets or assigning wildcards (\`"Action": "*"\`) in IAM policies.`,
            realWorldExample: 'Dozens of defense contractors and analytics companies have accidentally leaked terabytes of sensitive voter and employee data by setting AWS S3 buckets to "Public All Users".',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c15',
    certificateType: 'Cloud Security Architect Certificate',
    status: 'published'
  },
  {
    id: 'c16',
    number: 16,
    pathId: 'path-advanced',
    title: 'Digital Forensics and Incident Investigation',
    level: 'Advanced',
    description: 'Chain of custody, forensic disk imaging (dd, FTK Imager), volatile RAM capture (Volatility 3), file system artifacts (MFT, Prefetch, Shellbags), and timeline reconstruction.',
    estimatedHours: 24,
    prerequisites: ['c2', 'c6', 'c12'],
    learningObjectives: [
      'Preserve digital evidence adhering strictly to legal chain of custody requirements',
      'Acquire bit-stream forensic disk images and verify cryptographic hashes',
      'Analyze volatile memory dumps with Volatility to extract injected code and passwords',
      'Reconstruct attacker activity timelines using Windows and Linux forensic artifacts',
      'Prepare courtroom-admissible digital forensic expert reports'
    ],
    modules: [
      {
        id: 'c16-m1',
        courseId: 'c16',
        order: 1,
        title: 'Evidence Acquisition & Analysis',
        description: 'Forensic integrity and artifact investigation.',
        lessons: [
          {
            id: 'c16-l1',
            moduleId: 'c16-m1',
            courseId: 'c16',
            number: 1,
            title: 'Digital Evidence Integrity and Volatile Memory Capture',
            durationMinutes: 35,
            summary: 'Order of Volatility (RFC 3227), RAM dump tools, FTK Imager, and write blockers.',
            content: `Digital evidence is ephemeral and easily destroyed:
- Order of Volatility: Capture the most transient evidence first:
  1. CPU registers and cache.
  2. Routing tables, ARP cache, process table, kernel statistics, RAM.
  3. Temporary file systems.
  4. Disk and non-volatile storage.
  5. Remote logging and monitoring data.
  6. Physical topology and cables.
- Hardware Write-Blockers: Physical adapters connecting suspect hard drives to forensic workstations that permit read operations while physically blocking any write signals, ensuring zero modification of evidence.`,
            realWorldExample: 'Extracting a memory dump from an infected server revealed the unencrypted ransomware master key in RAM before the machine could be restarted, allowing free recovery of all files.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c16',
    certificateType: 'Digital Forensics Investigator Certificate',
    status: 'published'
  },
  {
    id: 'c17',
    number: 17,
    pathId: 'path-advanced',
    title: 'Malware Analysis and Threat Intelligence',
    level: 'Advanced',
    description: 'Static analysis (strings, PE headers, Ghidra), dynamic analysis in isolated sandboxes, Indicators of Compromise (IoCs), MITRE ATT&CK mapping, and threat hunting.',
    estimatedHours: 22,
    prerequisites: ['c4', 'c6'],
    learningObjectives: [
      'Set up safe, air-gapped malware analysis sandbox laboratories',
      'Execute static analysis on portable executable (PE) files without execution',
      'Monitor dynamic malware behavioral execution, network beacons, and persistence',
      'Map adversary techniques to the MITRE ATT&CK framework and author YARA rules'
    ],
    modules: [
      {
        id: 'c17-m1',
        courseId: 'c17',
        order: 1,
        title: 'Malware Triage & Threat Intelligence',
        description: 'Dissecting malicious binaries and building threat detections.',
        lessons: [
          {
            id: 'c17-l1',
            moduleId: 'c17-m1',
            courseId: 'c17',
            number: 1,
            title: 'Static Analysis and Portable Executable (PE) Headers',
            durationMinutes: 35,
            summary: 'File hashing, strings extraction, PE format, import address tables (IAT), and packers.',
            content: `Static analysis inspects malware without running it:
- Extracting Strings: 'strings malicious.exe' often reveals hardcoded C2 IP addresses, dropped file names, error messages, or registry keys.
- Import Address Table (IAT): Reveals which Windows API functions the binary calls (e.g. 'VirtualAllocEx', 'WriteProcessMemory', 'CreateRemoteThread' are classic signatures of process injection!).
- Packing & Obfuscation: Malware authors use tools like UPX to compress and scramble binary code to defeat static antivirus signatures.`,
            realWorldExample: 'Inspecting the import table of a suspicious Word macro file revealed calls to `URLDownloadToFileA` and `WinExec`, confirming it was a dropper designed to download second-stage malware.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c17',
    certificateType: 'Malware Analyst & Threat Intel Certificate',
    status: 'published'
  },
  {
    id: 'c18',
    number: 18,
    pathId: 'path-advanced',
    title: 'Security Architecture and Enterprise Defence',
    level: 'Advanced',
    description: 'Zero Trust architecture, micro-segmentation, Privileged Access Management (PAM), Data Loss Prevention (DLP), business continuity, and disaster recovery engineering.',
    estimatedHours: 20,
    prerequisites: ['c7', 'c8', 'c15'],
    learningObjectives: [
      'Architect enterprise Zero Trust networks ("Never Trust, Always Verify")',
      'Deploy Privileged Access Management (PAM) and Role-Based Access Control (RBAC)',
      'Design Disaster Recovery (DR) and Business Continuity Plans (BCP) with RTO and RPO metrics',
      'Formulate comprehensive enterprise defense blueprints'
    ],
    modules: [
      {
        id: 'c18-m1',
        courseId: 'c18',
        order: 1,
        title: 'Enterprise Defense & Zero Trust',
        description: 'Modern architectures replacing legacy castle-and-moat models.',
        lessons: [
          {
            id: 'c18-l1',
            moduleId: 'c18-m1',
            courseId: 'c18',
            number: 1,
            title: 'The Zero Trust Architecture Model',
            durationMinutes: 30,
            summary: 'Core principles: verify explicitly, use least privilege access, assume breach.',
            content: `The traditional "castle-and-moat" security model assumed that anyone inside the corporate network firewall was trusted. This model fails completely when an attacker breaches an internal laptop or a remote employee connects:
- Zero Trust Principles (NIST SP 800-207):
  1. Never Trust, Always Verify: Every user, device, and application must authenticate and authorize dynamically on every single transaction.
  2. Implement Least Privilege: Restrict access strictly using Just-In-Time (JIT) and Just-Enough-Access (JEA) policies.
  3. Assume Breach: Design every subnet and service as if adversaries are already present on the network.`,
            realWorldExample: 'Google’s BeyondCorp architecture eliminated internal VPNs entirely, requiring all employees to authenticate every request with device certificates and MFA regardless of physical location.',
            diagramType: 'zero-trust',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c18',
    certificateType: 'Enterprise Security Architect Certificate',
    status: 'published'
  },
  {
    id: 'c19',
    number: 19,
    pathId: 'path-advanced',
    title: 'DevSecOps and Secure Software Development',
    level: 'Advanced',
    description: 'Integrating security into CI/CD pipelines: SAST, DAST, Software Composition Analysis (SCA), container security (Docker/Kubernetes), and Infrastructure as Code (IaC) audits.',
    estimatedHours: 20,
    prerequisites: ['c9', 'c6'],
    learningObjectives: [
      'Embed automated security controls into CI/CD pipelines ("Shifting Left")',
      'Execute Static Application Security Testing (SAST) and Dependency scanning (SCA)',
      'Harden container images, Dockerfiles, and Kubernetes cluster manifests',
      'Scan Infrastructure as Code (Terraform, CloudFormation) for security misconfigurations'
    ],
    modules: [
      {
        id: 'c19-m1',
        courseId: 'c19',
        order: 1,
        title: 'Shifting Left in Software Delivery',
        description: 'Automating security testing in modern DevOps pipelines.',
        lessons: [
          {
            id: 'c19-l1',
            moduleId: 'c19-m1',
            courseId: 'c19',
            number: 1,
            title: 'Introduction to DevSecOps & Automated Pipeline Security',
            durationMinutes: 30,
            summary: 'Shift-Left philosophy, SAST vs DAST vs SCA, and automated pipeline break triggers.',
            content: `DevSecOps bridges software development, security, and operations:
- Shift Left: Moving security evaluations from the end of the development cycle into early coding and pull request phases where bugs are 10x cheaper to fix.
- Automated Testing Layers:
  - SAST (Static Application Security Testing): Scans source code repositories for security flaws (e.g., hardcoded API keys or SQL concatenation).
  - SCA (Software Composition Analysis): Scans third-party open-source dependencies (npm, pip, maven) for known CVEs.
  - DAST (Dynamic Application Security Testing): Tests running web applications externally for exploitable behaviors.
  - Secret Detection: Scanning Git commits to prevent developers from pushing AWS keys to GitHub.`,
            realWorldExample: 'A pre-commit Git hook blocked a developer from accidentally committing an unencrypted production database password to a public repository.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c19',
    certificateType: 'DevSecOps Engineer Certificate',
    status: 'published'
  },
  {
    id: 'c20',
    number: 20,
    pathId: 'path-advanced',
    title: 'Blockchain and Cryptocurrency Security',
    level: 'Advanced',
    description: 'Distributed ledger technology, cryptographic hashing, wallet security, smart contract vulnerabilities (reentrancy, integer overflows), and Web3 auditing.',
    estimatedHours: 18,
    prerequisites: ['c8'],
    learningObjectives: [
      'Explain consensus mechanisms (PoW, PoS) and blockchain immutability',
      'Analyze smart contract vulnerabilities including reentrancy and access control flaws',
      'Audit Web3 decentralized applications (DApps) and private key custody architectures',
      'Evaluate blockchain transaction security and flash loan attack vectors'
    ],
    modules: [
      {
        id: 'c20-m1',
        courseId: 'c20',
        order: 1,
        title: 'Smart Contract & Web3 Security',
        description: 'Securing decentralized ledgers and automated contracts.',
        lessons: [
          {
            id: 'c20-l1',
            moduleId: 'c20-m1',
            courseId: 'c20',
            number: 1,
            title: 'Blockchain Architecture and Smart Contract Vulnerabilities',
            durationMinutes: 35,
            summary: 'Immutability implications, EVM mechanics, and the famous Reentrancy attack.',
            content: `Smart contracts are immutable programs executing on a distributed blockchain:
- The Immutability Double-Edged Sword: Once deployed to Ethereum or another blockchain, code CANNOT be patched or altered. If a security vulnerability exists, attackers can exploit it forever unless emergency upgrade proxies were pre-engineered.
- Reentrancy Vulnerability:
  - Occurs when a contract sends funds to an external contract BEFORE updating its own internal user balance.
  - The recipient contract has a fallback function that calls the withdraw function repeatedly before the balance is zeroed out, draining the entire contract treasury!`,
            realWorldExample: 'The 2016 DAO hack exploited a reentrancy vulnerability to drain 3.6 million Ether, forcing the Ethereum community to execute a controversial hard fork creating Ethereum and Ethereum Classic.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c20',
    certificateType: 'Blockchain Security Specialist',
    status: 'published'
  },
  {
    id: 'c21',
    number: 21,
    pathId: 'path-advanced',
    title: 'Security Leadership, Governance and Compliance',
    level: 'Advanced',
    description: 'Information security governance, ISO/IEC 27001, NIST Cybersecurity Framework (CSF), risk assessments, GDPR/HIPAA compliance, vendor risk management, and ethics.',
    estimatedHours: 20,
    prerequisites: ['c1'],
    learningObjectives: [
      'Design enterprise Information Security Management Systems (ISMS) based on ISO/IEC 27001',
      'Align organizational controls with the NIST Cybersecurity Framework 2.0 (Govern, Identify, Protect, Detect, Respond, Recover)',
      'Conduct quantitative and qualitative corporate risk assessments',
      'Evaluate third-party vendor risks and build disaster recovery business continuity plans',
      'Lead security awareness initiatives and uphold professional codes of ethics'
    ],
    modules: [
      {
        id: 'c21-m1',
        courseId: 'c21',
        order: 1,
        title: 'Governance, Risk, and Compliance (GRC)',
        description: 'Executive security leadership and compliance standards.',
        lessons: [
          {
            id: 'c21-l1',
            moduleId: 'c21-m1',
            courseId: 'c21',
            number: 1,
            title: 'Security Governance and the NIST Cybersecurity Framework',
            durationMinutes: 35,
            summary: 'The 6 NIST CSF functions: Govern, Identify, Protect, Detect, Respond, Recover.',
            content: `Executive leadership must align technical cybersecurity controls with business risk objectives:
- NIST Cybersecurity Framework (CSF 2.0):
  - Govern: Establishing leadership strategy, risk management, and regulatory compliance.
  - Identify: Cataloging physical and software assets, supply chains, and vulnerabilities.
  - Protect: Implementing safeguards (MFA, encryption, network firewalls).
  - Detect: Maintaining monitoring systems (SIEM, IDS/IPS) to discover incidents quickly.
  - Respond: Executing incident response, containment, and communication plans.
  - Recover: Restoring capabilities damaged during a security event.
- ISO/IEC 27001: The premier international standard specifying requirements for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS).`,
            realWorldExample: 'Achieving SOC 2 Type II and ISO 27001 compliance enabled a cloud SaaS startup to close multi-million dollar contracts with Fortune 100 enterprise clients who legally mandate vendor certifications.',
            codeSnippets: []
          }
        ]
      }
    ],
    finalExamId: 'exam-c21',
    certificateType: 'Security Leadership & GRC Executive Certificate',
    status: 'published'
  },

  // ==========================================
  // SPECIALIZED PROFESSIONAL TRACKS
  // ==========================================
  {
    id: 'track-a',
    number: 101,
    trackCode: 'TRACK-A',
    pathId: 'path-specialized',
    title: 'Professional Track A: Ethical Hacker / Penetration Tester',
    level: 'Specialized',
    description: 'Offensive security career track: Advanced reconnaissance, web application attacks, Active Directory exploitation, wireless auditing, and professional client reporting.',
    estimatedHours: 40,
    prerequisites: ['c10'],
    learningObjectives: [
      'Master professional red teaming and penetration testing workflows',
      'Chain complex multi-stage exploits across networks, Active Directory, and web APIs',
      'Author client-ready penetration testing reports detailing technical and executive risks'
    ],
    modules: [],
    finalExamId: 'exam-track-a',
    certificateType: 'Certified Professional Ethical Hacker',
    status: 'published'
  },
  {
    id: 'track-b',
    number: 102,
    trackCode: 'TRACK-B',
    pathId: 'path-specialized',
    title: 'Professional Track B: Security Operations Analyst (SOC)',
    level: 'Specialized',
    description: 'Defensive blue team career track: SIEM event correlation, threat hunting, YARA detection engineering, malware triage, and incident response handling.',
    estimatedHours: 40,
    prerequisites: ['c12'],
    learningObjectives: [
      'Triage real-time alerts across enterprise SIEM platforms with minimal false positive rates',
      'Execute proactive threat hunting missions using MITRE ATT&CK techniques',
      'Contain active intrusion incidents and write executive post-mortem reports'
    ],
    modules: [],
    finalExamId: 'exam-track-b',
    certificateType: 'Certified Security Operations Analyst',
    status: 'published'
  },
  {
    id: 'track-c',
    number: 103,
    trackCode: 'TRACK-c',
    pathId: 'path-specialized',
    title: 'Professional Track C: Network Security Engineer',
    level: 'Specialized',
    description: 'Enterprise network infrastructure defense: Next-Generation Firewalls, BGP routing security, VPN engineering, IDS/IPS tuning, and Zero Trust microsegmentation.',
    estimatedHours: 35,
    prerequisites: ['c7'],
    learningObjectives: [
      'Design resilient, high-availability enterprise network perimeters',
      'Deploy and optimize Next-Generation Firewalls with deep packet inspection',
      'Implement Zero Trust network microsegmentation and encrypted tunnels'
    ],
    modules: [],
    finalExamId: 'exam-track-c',
    certificateType: 'Certified Network Security Engineer',
    status: 'published'
  },
  {
    id: 'track-d',
    number: 104,
    trackCode: 'TRACK-D',
    pathId: 'path-specialized',
    title: 'Professional Track D: Cloud Security Engineer',
    level: 'Specialized',
    description: 'Multi-cloud architecture defense: AWS/Azure/GCP IAM hardening, Kubernetes security, serverless protections, and Cloud Security Posture Management (CSPM).',
    estimatedHours: 35,
    prerequisites: ['c15'],
    learningObjectives: [
      'Harden multi-cloud environments adhering strictly to least privilege principles',
      'Secure containerized Kubernetes clusters and cloud-native microservices',
      'Automate cloud compliance and vulnerability remediation with CSPM tooling'
    ],
    modules: [],
    finalExamId: 'exam-track-d',
    certificateType: 'Certified Cloud Security Engineer',
    status: 'published'
  },
  {
    id: 'track-e',
    number: 105,
    trackCode: 'TRACK-E',
    pathId: 'path-specialized',
    title: 'Professional Track E: Digital Forensics Investigator',
    level: 'Specialized',
    description: 'Forensic incident investigation: Memory dumping, file system MFT parsing, mobile device forensics, timeline analysis, and legal evidence custody.',
    estimatedHours: 40,
    prerequisites: ['c16'],
    learningObjectives: [
      'Execute legally sound evidence acquisition and preservation across modern storage media',
      'Reverse-engineer in-memory attacker artifacts and reconstruct intrusion timelines',
      'Produce courtroom-ready digital forensic expert reports'
    ],
    modules: [],
    finalExamId: 'exam-track-e',
    certificateType: 'Certified Digital Forensics Investigator',
    status: 'published'
  },
  {
    id: 'track-f',
    number: 106,
    trackCode: 'TRACK-F',
    pathId: 'path-specialized',
    title: 'Professional Track F: Application Security Engineer (AppSec)',
    level: 'Specialized',
    description: 'Software security engineering: Secure coding, code reviews, DevSecOps pipeline automation, threat modeling, API protection, and cryptographic implementations.',
    estimatedHours: 38,
    prerequisites: ['c9', 'c14'],
    learningObjectives: [
      'Integrate automated security testing into CI/CD pipelines',
      'Lead threat modeling sessions using STRIDE methodologies during software design',
      'Audit complex web and mobile APIs for authorization and cryptographic weaknesses'
    ],
    modules: [],
    finalExamId: 'exam-track-f',
    certificateType: 'Certified Application Security Engineer',
    status: 'published'
  }
];

export const ASSESSMENTS: Assessment[] = [
  {
    id: 'exam-c1',
    courseId: 'c1',
    title: 'Introduction to Cybersecurity Comprehensive Examination',
    type: 'final-exam',
    timeLimitMinutes: 20,
    passPercentage: 70,
    questions: [
      {
        id: 'q1',
        type: 'single',
        question: 'Which pillar of the CIA Triad is directly violated when an unauthorized user modifies bank account balance records in a database?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
        correctAnswer: 1,
        explanation: 'Integrity ensures that information is accurate, complete, and protected against unauthorized modification or tampering.',
        points: 10
      },
      {
        id: 'q2',
        type: 'single',
        question: 'What is the primary difference between Information Security (InfoSec) and Cybersecurity?',
        options: [
          'InfoSec applies only to government systems, while cybersecurity applies to private enterprise.',
          'Cybersecurity protects information in all formats including paper, while InfoSec is purely digital.',
          'InfoSec protects information in any medium (paper, physical, digital), whereas Cybersecurity focuses exclusively on cyberspace and digital assets.',
          'There is no difference; the terms are 100% synonymous in modern law.'
        ],
        correctAnswer: 2,
        explanation: 'InfoSec encompasses physical documents, verbal disclosures, and electronic data. Cybersecurity is a specialized subset focusing on digital networks and computing systems.',
        points: 10
      },
      {
        id: 'q3',
        type: 'multiple',
        question: 'Which of the following are mandatory prerequisites before conducting an ethical penetration test? (Select all that apply)',
        options: [
          'Written legal authorization signed by the system owner',
          'A defined Scope of Work and Rules of Engagement (RoE)',
          'Notifying local law enforcement 24 hours prior',
          'Emergency contact protocols in case of accidental system disruption'
        ],
        correctAnswer: [0, 1, 3],
        explanation: 'Ethical testing requires explicit written consent, clear scoping/RoE, and emergency communication procedures. Informing local police is not a standard requirement for private infrastructure testing.',
        points: 15
      },
      {
        id: 'q4',
        type: 'true-false',
        question: 'True or False: If an ethical hacker finds a critical vulnerability on a public website without prior authorization, it is completely legal to test exploitation as long as they intend to report it safely.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'False. Testing or probing systems without explicit prior authorization violates computer crime statutes (like the CFAA in the US) regardless of benign intentions.',
        points: 10
      },
      {
        id: 'q5',
        type: 'scenario',
        scenarioContext: 'A major hospital network suffers a malware attack that encrypts patient records and demands 50 Bitcoin to restore operations. Critical radiation therapy machinery cannot verify patient dosage and emergency ambulances must be diverted to neighboring counties.',
        question: 'Which cyber threat vector has occurred, and which CIA Triad pillars were severely compromised?',
        options: [
          'Spyware; Confidentiality was primarily breached',
          'Ransomware; Both Availability and Integrity were severely compromised',
          'Adware; Non-repudiation was compromised',
          'Phishing without malware; Confidentiality only'
        ],
        correctAnswer: 1,
        explanation: 'Ransomware encrypts systems, destroying Availability (systems cannot be accessed) and compromising Integrity of medical services.',
        points: 15
      },
      {
        id: 'q6',
        type: 'matching',
        question: 'Match each security principle to its correct definition:',
        matchingPairs: [
          { left: 'Defense-in-Depth', right: 'Layering multiple independent defensive controls' },
          { left: 'Principle of Least Privilege', right: 'Granting only the minimum permissions necessary' },
          { left: 'Zero Trust', right: 'Never trust, always verify explicitly on every request' },
          { left: 'Risk Formula', right: 'Threat multiplied by Vulnerability multiplied by Impact' }
        ],
        correctAnswer: {
          'Defense-in-Depth': 'Layering multiple independent defensive controls',
          'Principle of Least Privilege': 'Granting only the minimum permissions necessary',
          'Zero Trust': 'Never trust, always verify explicitly on every request',
          'Risk Formula': 'Threat multiplied by Vulnerability multiplied by Impact'
        },
        explanation: 'These core principles guide architectural defense decisions across all security domains.',
        points: 20
      },
      {
        id: 'q7',
        type: 'short-answer',
        question: 'What is the Common Vulnerabilities and Exposures identifier prefix used universally to track public security flaws (e.g. ___-2023-1234)?',
        correctAnswer: 'CVE',
        explanation: 'CVE (Common Vulnerabilities and Exposures) is the standardized dictionary of publicly known cybersecurity vulnerabilities.',
        points: 10
      },
      {
        id: 'q8',
        type: 'single',
        question: 'A user receives an urgent text message claiming to be from their postal carrier asking to confirm their address by clicking a link. What specific form of social engineering is this?',
        options: ['Vishing', 'Smishing', 'Whaling', 'Shoulder Surfing'],
        correctAnswer: 1,
        explanation: 'Smishing (SMS phishing) conducts phishing attacks over SMS text messaging.',
        points: 10
      }
    ]
  },
  {
    id: 'exam-c2',
    courseId: 'c2',
    title: 'Computer & OS Fundamentals Final Examination',
    type: 'final-exam',
    timeLimitMinutes: 25,
    passPercentage: 70,
    questions: [
      {
        id: 'c2-q1',
        type: 'single',
        question: 'In the Linux operating system, which file contains system-wide user account names and home directories and is readable by all users?',
        options: ['/etc/shadow', '/etc/passwd', '/etc/sudoers', '/var/log/auth.log'],
        correctAnswer: 1,
        explanation: '/etc/passwd is world-readable and contains usernames, UIDs, and shells. Cryptographic password hashes are kept in the restricted /etc/shadow file.',
        points: 10
      },
      {
        id: 'c2-q2',
        type: 'single',
        question: 'Which numeric chmod permission grants read and write permissions to the file owner, while denying all access to group and other users?',
        options: ['755', '644', '600', '777'],
        correctAnswer: 2,
        explanation: '600 represents rw------- (Owner: 4+2=6; Group: 0; Others: 0), the industry standard for private keys and confidential files.',
        points: 10
      },
      {
        id: 'c2-q3',
        type: 'multiple',
        question: 'Which of the following indicate that a process on a workstation may be malicious? (Select all that apply)',
        options: [
          'It is running out of a user temp directory like C:\\Users\\AppData\\Local\\Temp',
          'It is consuming 98% of CPU for hours without user interaction',
          'It is digitally signed by Microsoft Corporation',
          'It is masquerading with a subtle misspelling of a system service like svch0st.exe'
        ],
        correctAnswer: [0, 1, 3],
        explanation: 'Unusual paths, extreme CPU consumption (crypto-miners), and typosquatting names are classic Indicators of Compromise (IoCs). Legitimate digital signatures are expected of legitimate binaries.',
        points: 15
      },
      {
        id: 'c2-q4',
        type: 'true-false',
        question: 'True or False: Operating on your daily laptop using a standard user account rather than a local administrator account significantly limits the potential blast radius of malware.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'True. Standard user permissions prevent malware from silently installing drivers, altering system binaries, or establishing kernel persistence.',
        points: 10
      }
    ]
  },
  {
    id: 'exam-c3',
    courseId: 'c3',
    title: 'Networking Fundamentals Comprehensive Examination',
    type: 'final-exam',
    timeLimitMinutes: 25,
    passPercentage: 70,
    questions: [
      {
        id: 'c3-q1',
        type: 'single',
        question: 'What is the correct sequence of packets in the TCP Three-Way Handshake used to establish a reliable connection?',
        options: ['ACK, SYN, SYN-ACK', 'SYN, SYN-ACK, ACK', 'SYN, ACK, FIN', 'RST, SYN, ACK'],
        correctAnswer: 1,
        explanation: 'TCP establishes connection via SYN (Client) -> SYN-ACK (Server) -> ACK (Client).',
        points: 10
      },
      {
        id: 'c3-q2',
        type: 'single',
        question: 'Which of the following is a private IPv4 address range reserved under RFC 1918?',
        options: ['8.8.8.0 to 8.8.8.255', '192.168.0.0 to 192.168.255.255', '1.1.1.0 to 1.1.1.255', '128.0.0.0 to 128.255.255.255'],
        correctAnswer: 1,
        explanation: '192.168.0.0/16 is one of the three designated RFC 1918 private address ranges alongside 10.0.0.0/8 and 172.16.0.0/12.',
        points: 10
      },
      {
        id: 'c3-q3',
        type: 'single',
        question: 'Which protocol operates on Port 22 and provides encrypted remote command-line access to servers?',
        options: ['Telnet', 'FTP', 'SSH (Secure Shell)', 'RDP'],
        correctAnswer: 2,
        explanation: 'SSH operates on TCP port 22, replacing insecure cleartext Telnet (port 23).',
        points: 10
      },
      {
        id: 'c3-q4',
        type: 'matching',
        question: 'Match each protocol with its default standard port number:',
        matchingPairs: [
          { left: 'HTTP', right: 'Port 80' },
          { left: 'HTTPS', right: 'Port 443' },
          { left: 'DNS', right: 'Port 53' },
          { left: 'RDP', right: 'Port 3389' }
        ],
        correctAnswer: {
          'HTTP': 'Port 80',
          'HTTPS': 'Port 443',
          'DNS': 'Port 53',
          'RDP': 'Port 3389'
        },
        explanation: 'Memorizing well-known ports is essential for network and firewall administration.',
        points: 20
      }
    ]
  }
];

export const PRACTICAL_PROJECTS: PracticalProject[] = [
  {
    id: 'proj-c1',
    courseId: 'c1',
    title: 'Beginner Capstone: Personal Cybersecurity Audit & Baseline Defense',
    level: 'Beginner',
    description: 'Conduct a personal attack-surface assessment and configure essential defenses: password manager deployment, MFA configuration, and digital hygiene checklist.',
    scenario: 'You are tasked with securing your personal digital ecosystem and producing an audited defense report for submission to the CyberSec Academy certification board.',
    tasks: [
      {
        id: 't1',
        instructions: 'Document your personal threat model: list your 5 most critical digital accounts and identify the potential impact if each were compromised.',
        hints: ['Consider email, financial institutions, cloud storage, password manager, and mobile carrier accounts.']
      },
      {
        id: 't2',
        instructions: 'Audit your password health: verify that all primary accounts utilize unique, high-entropy passphrases stored in an encrypted vault.',
        hints: ['Never reuse credentials across banking and social services.']
      },
      {
        id: 't3',
        instructions: 'Enable app-based or hardware Multi-Factor Authentication on your primary identity and email accounts, rejecting SMS wherever possible.',
        hints: ['Use an authenticator app (TOTP) or FIDO2 security key.']
      },
      {
        id: 't4',
        instructions: 'Formulate an actionable 3-2-1 backup verification plan with a designated offsite or immutable backup destination.',
        hints: ['Ensure you have tested restoring a sample file from your backup archive.']
      }
    ],
    rubric: [
      { id: 'r1', criterion: 'Threat Model Thoroughness', points: 25, description: 'Clearly identifies assets, threats, and realistic impact assessments.' },
      { id: 'r2', criterion: 'Credential & MFA Architecture', points: 30, description: 'Demonstrates zero password reuse and strong non-SMS authentication factors.' },
      { id: 'r3', criterion: 'Backup Resilience', points: 25, description: 'Adheres to 3-2-1 rule with tested restoration procedures.' },
      { id: 'r4', criterion: 'Report Professionalism & Clarity', points: 20, description: 'Well-structured, concise, and adhering to ethical standards.' }
    ],
    passingPoints: 75,
    submissionRequirements: [
      'Written audit report covering Threat Model, Account Inventory, and Remediation Actions taken',
      'Screenshots of anonymized password manager entropy rating or MFA verification confirmation',
      'Signed personal code of ethics statement'
    ]
  },
  {
    id: 'proj-c6',
    courseId: 'c6',
    title: 'Intermediate Lab: Hardening a Production Linux Server',
    level: 'Intermediate',
    description: 'Secure a simulated Debian/Ubuntu server: harden SSH, configure UFW firewall rules, audit SUID binaries, and automate security checks with Bash.',
    scenario: 'You are appointed Junior Security Engineer at a fintech company. A newly provisioned Linux web host must be hardened against unauthorized internet attacks prior to production launch.',
    tasks: [
      {
        id: 't-c6-1',
        instructions: 'Harden `/etc/ssh/sshd_config` by disabling root login (`PermitRootLogin no`) and enforcing public-key authentication.',
        hints: ['Review directives: `PermitRootLogin no`, `PasswordAuthentication no`.']
      },
      {
        id: 't-c6-2',
        instructions: 'Configure UFW to enforce a Default Deny inbound policy, permitting only SSH and HTTPS ports.',
        hints: ['Use `sudo ufw default deny incoming` and `sudo ufw allow 22/tcp`.']
      },
      {
        id: 't-c6-3',
        instructions: 'Search and inspect all SUID files using `find / -perm -4000` to verify no unapproved binaries possess root execution privileges.',
        hints: ['Look for unexpected binaries in `/tmp` or user directories.']
      },
      {
        id: 't-c6-4',
        instructions: 'Write a Bash automation script that scans auth logs for failed login bursts and alerts administrators.',
        hints: ['Combine `grep "Failed"` with `awk` and `uniq -c`.']
      }
    ],
    rubric: [
      { id: 'rc6-1', criterion: 'SSH Daemon Configuration', points: 30, description: 'SSHD properly hardened with root and password logins disabled.' },
      { id: 'rc6-2', criterion: 'Firewall Policy Design', points: 25, description: 'Default deny properly configured with minimum necessary open ports.' },
      { id: 'rc6-3', criterion: 'SUID Audit Thoroughness', points: 20, description: 'Correctly identifies privileged binaries and documents findings.' },
      { id: 'rc6-4', criterion: 'Bash Automation Script Quality', points: 25, description: 'Script is well-commented, functional, and handles errors gracefully.' }
    ],
    passingPoints: 80,
    submissionRequirements: [
      'Copy of hardened `sshd_config` directives',
      'Output of `ufw status verbose` demonstrating active firewall rules',
      'Complete Bash audit script source code and execution log'
    ]
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-001',
    credentialId: 'CSA-2026-FND-88912',
    studentName: 'Alex Mercer',
    studentEmail: 'alex.mercer@cybersec.org',
    courseOrPathId: 'path-beginner',
    courseOrPathTitle: 'Cybersecurity Fundamentals Certificate',
    certificateType: 'Foundational Certification',
    level: 'Beginner',
    issuedDate: '2026-03-15',
    issuingOrg: 'CyberSec Academy & Global Information Security Institute',
    qrCodeData: 'https://ais-dev-fvngh2t22jdh5rk3vm274g-578684192239.europe-west2.run.app/verify/CSA-2026-FND-88912',
    verificationUrl: '/verify/CSA-2026-FND-88912',
    status: 'Issued',
    grade: 'Passed with Distinction',
    scorePercentage: 94.5,
    authorizedSigner: 'Dr. Elena Vance, Chief Academic Officer'
  },
  {
    id: 'cert-002',
    credentialId: 'CSA-2026-NET-40291',
    studentName: 'Alex Mercer',
    studentEmail: 'alex.mercer@cybersec.org',
    courseOrPathId: 'c3',
    courseOrPathTitle: 'Network Security Associate Certificate',
    certificateType: 'Technical Course Certification',
    level: 'Beginner',
    issuedDate: '2026-04-02',
    issuingOrg: 'CyberSec Academy & Global Information Security Institute',
    qrCodeData: 'https://ais-dev-fvngh2t22jdh5rk3vm274g-578684192239.europe-west2.run.app/verify/CSA-2026-NET-40291',
    verificationUrl: '/verify/CSA-2026-NET-40291',
    status: 'Issued',
    grade: 'Passed',
    scorePercentage: 88.0,
    authorizedSigner: 'Marcus Chen, Director of Technical Curriculum'
  }
];

export const INITIAL_DISCUSSIONS: DiscussionThread[] = [
  {
    id: 'disc-1',
    lessonId: 'c1-l4',
    courseId: 'c1',
    userName: 'David K.',
    userRole: 'student',
    timestamp: '2 hours ago',
    title: 'Can you provide a simple mnemonic for remembering the CIA Triad in exams?',
    message: 'I understand the difference between confidentiality, integrity, and availability, but sometimes when analyzing edge cases like DDoS or data tampering I hesitate. Any good real-world analogies?',
    votes: 5,
    replies: [
      {
        id: 'rep-1',
        userName: 'Prof. Sarah Jenkins',
        userRole: 'instructor',
        message: 'Think of an ATM bank machine: Confidentiality = No one can see your account balance or PIN over your shoulder. Integrity = When you withdraw $20, the bank balance decreases by exactly $20, never $20,000. Availability = When you put your card in at 2 AM, the machine turns on and dispenses cash without crashing.',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'disc-2',
    lessonId: 'c2-l5',
    courseId: 'c2',
    userName: 'Maya Lin',
    userRole: 'student',
    timestamp: 'Yesterday',
    title: 'Why does chmod 600 make SSH keys secure?',
    message: 'If 777 means full access, why does OpenSSH strictly mandate 600 for id_rsa files?',
    votes: 8,
    replies: [
      {
        id: 'rep-2',
        userName: 'Alex Mercer',
        userRole: 'student',
        message: 'Because `600` means only the file owner can read or write it (`rw-------`). If you leave it at `777`, any other standard user or rogue process on that Linux machine could read your private key file and impersonate you anywhere!',
        timestamp: '18 hours ago'
      }
    ]
  }
];
