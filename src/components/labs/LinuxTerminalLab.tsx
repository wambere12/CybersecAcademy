import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';

interface Props {
  initialObjective?: string;
  onComplete?: () => void;
}

export const LinuxTerminalLab: React.FC<Props> = ({ initialObjective, onComplete }) => {
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output' | 'error' | 'system'; text: string }>>([
    { type: 'system', text: 'CyberSec Academy Linux Lab v2.4 (x86_64-pc-linux-gnu)' },
    { type: 'system', text: 'Type "help" for a list of available cybersecurity commands.' },
    { type: 'system', text: 'Objective: Audit directory permissions and harden id_rsa private key to 600.' },
    { type: 'output', text: 'Logged in as analyst on sec-workstation (192.168.1.105)' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [keyPermissions, setKeyPermissions] = useState('0777');
  const [firewallActive, setFirewallActive] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const base = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newEntries: Array<{ type: 'command' | 'output' | 'error' | 'system'; text: string }> = [
      { type: 'command', text: `analyst@sec-workstation:~$ ${trimmed}` }
    ];

    switch (base) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `Supported Commands:
  ls [-la]             List directory contents and permissions
  pwd                  Print working directory
  whoami               Print effective user
  cat <file>           Display file content (e.g. cat /etc/passwd, cat id_rsa)
  chmod <mode> <file>  Change file mode bits (e.g. chmod 600 id_rsa)
  ps aux               Report snapshot of current processes
  ss -tuln             Investigate listening network sockets
  ufw [status|enable]  Uncomplicated Firewall management
  grep <term> <file>   Search pattern in files
  sha256sum <file>     Compute SHA-256 cryptographic checksum
  ping -c <n> <host>   Send ICMP Echo requests
  clear                Clear the terminal screen
  help                 Display this manual`
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'pwd':
        newEntries.push({ type: 'output', text: '/home/analyst' });
        break;

      case 'whoami':
        newEntries.push({ type: 'output', text: 'analyst (uid=1000, gid=1000, groups=1000(analyst),27(sudo))' });
        break;

      case 'ls': {
        const isDetailed = args.includes('-la') || args.includes('-l') || args.includes('-al');
        if (isDetailed) {
          const permStr = keyPermissions === '0600' ? '-rw-------' : '-rwxrwxrwx';
          newEntries.push({
            type: 'output',
            text: `total 36
drwxr-xr-x 4 analyst analyst 4096 Nov 10 14:00 .
drwxr-xr-x 3 root    root    4096 Nov 10 09:12 ..
-rw-r--r-- 1 analyst analyst  220 Nov 10 09:12 .bash_logout
-rw-r--r-- 1 analyst analyst 3771 Nov 10 09:12 .bashrc
${permStr} 1 analyst analyst 2602 Nov 10 14:15 id_rsa
-rw-r--r-- 1 analyst analyst  568 Nov 10 14:15 id_rsa.pub
-rw-r--r-- 1 analyst analyst 1024 Nov 10 14:22 evidence.log
drwx------ 2 analyst analyst 4096 Nov 10 14:20 .ssh`
          });
        } else {
          newEntries.push({ type: 'output', text: 'evidence.log  id_rsa  id_rsa.pub' });
        }
        break;
      }

      case 'chmod': {
        if (args.length < 2) {
          newEntries.push({ type: 'error', text: 'chmod: missing operand. Usage: chmod <mode> <file>' });
        } else {
          const mode = args[0];
          const target = args[1];
          if (target === 'id_rsa') {
            if (mode === '600' || mode === '0600') {
              setKeyPermissions('0600');
              setTaskCompleted(true);
              if (onComplete) onComplete();
              newEntries.push({
                type: 'system',
                text: '✓ SUCCESS: id_rsa permissions changed to 600 (-rw-------). The private key is now properly secured from unauthorized read access!'
              });
            } else {
              setKeyPermissions(mode);
              newEntries.push({ type: 'output', text: `Permissions for id_rsa updated to ${mode}` });
            }
          } else {
            newEntries.push({ type: 'output', text: `chmod: changed mode of '${target}' to ${mode}` });
          }
        }
        break;
      }

      case 'cat': {
        const file = args[0];
        if (!file) {
          newEntries.push({ type: 'error', text: 'cat: missing filename' });
        } else if (file === '/etc/passwd') {
          newEntries.push({
            type: 'output',
            text: `root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsshd:x:110:65534::/run/sshd:/usr/sbin/nologin\nanalyst:x:1000:1000:Security Analyst,,,:/home/analyst:/bin/bash`
          });
        } else if (file === '/etc/shadow') {
          newEntries.push({ type: 'error', text: 'cat: /etc/shadow: Permission denied (Requires root superuser privileges)' });
        } else if (file === 'id_rsa') {
          newEntries.push({
            type: 'output',
            text: `-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAYEA3q1f88eZ9X8P3mKl7x91k9L8M22pZ9xM328901jklf41...[TRUNCATED]\n-----END OPENSSH PRIVATE KEY-----`
          });
        } else if (file === 'evidence.log' || file.includes('auth.log')) {
          newEntries.push({
            type: 'output',
            text: `Nov 10 03:12:01 server sshd[4012]: Failed password for invalid user admin from 198.51.100.44 port 51244 ssh2\nNov 10 03:12:04 server sshd[4015]: Failed password for invalid user root from 198.51.100.44 port 51248 ssh2\nNov 10 03:12:08 server sshd[4019]: Failed password for invalid user test from 198.51.100.44 port 51252 ssh2\nNov 10 04:00:15 server sudo: analyst : TTY=pts/0 ; PWD=/home/analyst ; USER=root ; COMMAND=/usr/bin/ufw status`
          });
        } else {
          newEntries.push({ type: 'error', text: `cat: ${file}: No such file or directory` });
        }
        break;
      }

      case 'ps':
        newEntries.push({
          type: 'output',
          text: `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.2 168420 12048 ?        Ss   09:12   0:02 /sbin/init
root       842  0.0  0.1  15812  7210 ?        Ss   09:12   0:00 /usr/sbin/sshd -D
analyst   1240  0.0  0.1   9840  4120 pts/0    Ss   14:00   0:00 /bin/bash
nobody    4891 94.2  1.8 450120 74210 ?        R    14:18  12:44 /tmp/.xmr_miner --algo rx/0
analyst   5102  0.0  0.0   8920  3210 pts/0    R+   14:30   0:00 ps aux`
        });
        break;

      case 'ss':
      case 'netstat':
        newEntries.push({
          type: 'output',
          text: `Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       128            0.0.0.0:22          0.0.0.0:*      users:(("sshd",pid=842))
tcp    LISTEN  0       511            0.0.0.0:80          0.0.0.0:*      users:(("nginx",pid=1120))
tcp    LISTEN  0       511            0.0.0.0:443         0.0.0.0:*      users:(("nginx",pid=1120))
tcp    ESTAB   0       0       192.168.1.105:44582   198.51.100.44:4444 users:((".xmr_miner",pid=4891))`
        });
        break;

      case 'ufw': {
        const sub = args[0];
        if (sub === 'enable') {
          setFirewallActive(true);
          newEntries.push({ type: 'output', text: 'Firewall is active and enabled on system startup' });
        } else if (sub === 'status') {
          newEntries.push({
            type: 'output',
            text: `Status: ${firewallActive ? 'active' : 'inactive'}\n${firewallActive ? 'Logging: on (low)\nDefault: deny (incoming), allow (outgoing)\n\nTo                         Action      From\n--                         ------      ----\n22/tcp                     ALLOW IN    Anywhere\n443/tcp                    ALLOW IN    Anywhere' : ''}`
          });
        } else if (sub === 'allow') {
          newEntries.push({ type: 'output', text: `Rule added: ALLOW IN ${args[1] || 'specified port'}` });
        } else {
          newEntries.push({ type: 'output', text: 'Usage: ufw [enable|disable|status|allow <port>]' });
        }
        break;
      }

      case 'sha256sum': {
        const file = args[0] || 'id_rsa';
        newEntries.push({
          type: 'output',
          text: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  ${file}`
        });
        break;
      }

      case 'ping': {
        const target = args[args.length - 1] || '8.8.8.8';
        newEntries.push({
          type: 'output',
          text: `PING ${target} (${target}): 56 data bytes\n64 bytes from ${target}: icmp_seq=0 ttl=116 time=14.2 ms\n64 bytes from ${target}: icmp_seq=1 ttl=116 time=13.8 ms\n--- ${target} ping statistics ---\n2 packets transmitted, 2 packets received, 0.0% packet loss`
        });
        break;
      }

      default:
        newEntries.push({
          type: 'error',
          text: `bash: ${base}: command not found. Type "help" to see available commands.`
        });
    }

    setHistory(prev => [...prev, ...newEntries]);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setCurrentInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab auto-complete hints
      if (currentInput.startsWith('cat i')) setCurrentInput('cat id_rsa');
      if (currentInput.startsWith('chmod 600 i')) setCurrentInput('chmod 600 id_rsa');
      if (currentInput.startsWith('ss')) setCurrentInput('ss -tuln');
      if (currentInput.startsWith('ps')) setCurrentInput('ps aux');
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs text-slate-400 font-medium ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            analyst@sec-workstation: ~ (Linux 6.8.0-generic)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {taskCompleted ? (
            <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              <CheckCircle2 className="w-3.5 h-3.5" /> Task Solved
            </span>
          ) : (
            <span className="text-xs text-amber-400 flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              <Shield className="w-3.5 h-3.5" /> Task: Fix id_rsa (chmod 600)
            </span>
          )}

          <button
            onClick={() => {
              setHistory([
                { type: 'system', text: 'Terminal reset to default state.' },
                { type: 'system', text: 'Objective: Audit directory permissions and harden id_rsa private key to 600.' }
              ]);
              setKeyPermissions('0777');
              setTaskCompleted(false);
            }}
            title="Reset Terminal"
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div
        className="flex-1 p-4 overflow-y-auto text-xs space-y-1.5 leading-relaxed selection:bg-cyan-500 selection:text-slate-950"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, idx) => {
          if (entry.type === 'command') {
            return (
              <div key={idx} className="text-slate-200 font-semibold pt-1">
                {entry.text}
              </div>
            );
          }
          if (entry.type === 'error') {
            return (
              <div key={idx} className="text-rose-400">
                {entry.text}
              </div>
            );
          }
          if (entry.type === 'system') {
            return (
              <div key={idx} className="text-cyan-400 italic">
                {entry.text}
              </div>
            );
          }
          return (
            <pre key={idx} className="text-slate-300 font-mono whitespace-pre-wrap">
              {entry.text}
            </pre>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Quick Helper Chips */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/70 border-t border-slate-800/80 text-[11px] text-slate-400 overflow-x-auto shrink-0">
        <span className="text-slate-500 shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3 h-3" /> Quick commands:
        </span>
        <button
          onClick={() => handleCommand('ls -la')}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[10px] transition-colors"
        >
          ls -la
        </button>
        <button
          onClick={() => handleCommand('chmod 600 id_rsa')}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded text-[10px] transition-colors"
        >
          chmod 600 id_rsa
        </button>
        <button
          onClick={() => handleCommand('ps aux')}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] transition-colors"
        >
          ps aux
        </button>
        <button
          onClick={() => handleCommand('ss -tuln')}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] transition-colors"
        >
          ss -tuln
        </button>
        <button
          onClick={() => handleCommand('cat /etc/passwd')}
          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] transition-colors"
        >
          cat /etc/passwd
        </button>
      </div>

      {/* Command Input Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-t border-slate-800 shrink-0">
        <span className="text-emerald-400 font-bold shrink-0 text-xs">analyst@sec-workstation:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (e.g. ls -la, chmod 600 id_rsa, ps aux)..."
          className="flex-1 bg-transparent border-0 text-slate-100 text-xs focus:outline-none focus:ring-0 font-mono caret-cyan-400"
          autoFocus
        />
        <button
          onClick={() => handleCommand(currentInput)}
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded transition-colors"
        >
          Execute
        </button>
      </div>
    </div>
  );
};
