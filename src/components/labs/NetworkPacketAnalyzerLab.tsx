import React, { useState } from 'react';
import { Activity, Filter, Search, CheckCircle2, AlertTriangle, Eye, ChevronRight, ChevronDown } from 'lucide-react';

interface Packet {
  no: number;
  time: string;
  source: string;
  dest: string;
  protocol: 'TCP' | 'HTTP' | 'DNS' | 'ARP' | 'ICMP';
  length: number;
  info: string;
  ethernet: {
    srcMac: string;
    dstMac: string;
    type: string;
  };
  ip: {
    srcIp: string;
    dstIp: string;
    ttl: number;
    protocol: string;
  };
  transport: {
    srcPort?: number;
    dstPort?: number;
    flags?: string;
    seq?: number;
    ack?: number;
  };
  payloadText: string;
  hexDump: string;
  isSuspicious?: boolean;
}

const SAMPLE_PACKETS: Packet[] = [
  {
    no: 1,
    time: '0.000000',
    source: '192.168.1.105',
    dest: '192.168.1.1',
    protocol: 'ARP',
    length: 42,
    info: 'Who has 192.168.1.1? Tell 192.168.1.105',
    ethernet: { srcMac: '00:0c:29:8b:41:22', dstMac: 'ff:ff:ff:ff:ff:ff', type: 'ARP (0x0806)' },
    ip: { srcIp: '192.168.1.105', dstIp: '192.168.1.1', ttl: 64, protocol: 'ARP' },
    transport: {},
    payloadText: 'ARP Request: Who has 192.168.1.1? Tell 192.168.1.105',
    hexDump: '0000  ff ff ff ff ff ff 00 0c 29 8b 41 22 08 06 00 01  ........).A"....\n0010  08 00 06 04 00 01 00 0c 29 8b 41 22 c0 a8 01 69  ........).A"...i'
  },
  {
    no: 2,
    time: '0.000412',
    source: '192.168.1.1',
    dest: '192.168.1.105',
    protocol: 'ARP',
    length: 42,
    info: '192.168.1.1 is at 00:11:32:9c:4a:21',
    ethernet: { srcMac: '00:11:32:9c:4a:21', dstMac: '00:0c:29:8b:41:22', type: 'ARP (0x0806)' },
    ip: { srcIp: '192.168.1.1', dstIp: '192.168.1.105', ttl: 64, protocol: 'ARP' },
    transport: {},
    payloadText: 'ARP Reply: 192.168.1.1 is at 00:11:32:9c:4a:21',
    hexDump: '0000  00 0c 29 8b 41 22 00 11 32 9c 4a 21 08 06 00 01  ..).A"..2.J!....\n0010  08 00 06 04 00 02 00 11 32 9c 4a 21 c0 a8 01 01  ........2.J!....'
  },
  {
    no: 3,
    time: '0.012845',
    source: '192.168.1.105',
    dest: '1.1.1.1',
    protocol: 'DNS',
    length: 74,
    info: 'Standard query 0x1a42 A internal-portal.corp',
    ethernet: { srcMac: '00:0c:29:8b:41:22', dstMac: '00:11:32:9c:4a:21', type: 'IPv4 (0x0800)' },
    ip: { srcIp: '192.168.1.105', dstIp: '1.1.1.1', ttl: 64, protocol: 'UDP (17)' },
    transport: { srcPort: 54122, dstPort: 53 },
    payloadText: 'DNS Query: internal-portal.corp (A Record)',
    hexDump: '0000  00 11 32 9c 4a 21 00 0c 29 8b 41 22 08 00 45 00  ..2.J!..).A"..E.\n0010  00 4a 12 34 00 00 40 11 88 12 c0 a8 01 69 01 01  .J.4..@......i..\n0020  01 01 d3 6a 00 35 00 36 00 00 1a 42 01 00 00 01  ...j.5.6...B....'
  },
  {
    no: 4,
    time: '0.024102',
    source: '192.168.1.105',
    dest: '192.168.1.50',
    protocol: 'TCP',
    length: 66,
    info: '54820 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460',
    ethernet: { srcMac: '00:0c:29:8b:41:22', dstMac: '00:11:32:9c:4a:21', type: 'IPv4 (0x0800)' },
    ip: { srcIp: '192.168.1.105', dstIp: '192.168.1.50', ttl: 64, protocol: 'TCP (6)' },
    transport: { srcPort: 54820, dstPort: 80, flags: '[SYN]', seq: 0, ack: 0 },
    payloadText: 'TCP Handshake Step 1: SYN',
    hexDump: '0000  00 11 32 9c 4a 21 00 0c 29 8b 41 22 08 00 45 00  ..2.J!..).A"..E.\n0010  00 3c 31 42 40 00 40 06 a5 f1 c0 a8 01 69 c0 a8  .<1B@.@......i..\n0020  01 32 d6 24 00 50 2f 14 02 81 00 00 00 00 a0 02  .2.$.P/.........'
  },
  {
    no: 5,
    time: '0.024890',
    source: '192.168.1.50',
    dest: '192.168.1.105',
    protocol: 'TCP',
    length: 66,
    info: '80 → 54820 [SYN, ACK] Seq=0 Ack=1 Win=29200 Len=0',
    ethernet: { srcMac: '00:11:32:9c:4a:21', dstMac: '00:0c:29:8b:41:22', type: 'IPv4 (0x0800)' },
    ip: { srcIp: '192.168.1.50', dstIp: '192.168.1.105', ttl: 64, protocol: 'TCP (6)' },
    transport: { srcPort: 80, dstPort: 54820, flags: '[SYN, ACK]', seq: 0, ack: 1 },
    payloadText: 'TCP Handshake Step 2: SYN-ACK',
    hexDump: '0000  00 0c 29 8b 41 22 00 11 32 9c 4a 21 08 00 45 00  ..).A"..2.J!..E.\n0010  00 3c 00 00 40 00 40 06 d7 33 c0 a8 01 32 c0 a8  .<..@.@..3...2..\n0020  01 69 00 50 d6 24 99 82 14 a1 2f 14 02 82 a0 12  .i.P.$..../.....'
  },
  {
    no: 6,
    time: '0.025110',
    source: '192.168.1.105',
    dest: '192.168.1.50',
    protocol: 'TCP',
    length: 54,
    info: '54820 → 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
    ethernet: { srcMac: '00:0c:29:8b:41:22', dstMac: '00:11:32:9c:4a:21', type: 'IPv4 (0x0800)' },
    ip: { srcIp: '192.168.1.105', dstIp: '192.168.1.50', ttl: 64, protocol: 'TCP (6)' },
    transport: { srcPort: 54820, dstPort: 80, flags: '[ACK]', seq: 1, ack: 1 },
    payloadText: 'TCP Handshake Step 3: ACK (Connection Established)',
    hexDump: '0000  00 11 32 9c 4a 21 00 0c 29 8b 41 22 08 00 45 00  ..2.J!..).A"..E.\n0010  00 28 31 43 40 00 40 06 a6 04 c0 a8 01 69 c0 a8  .(1C@.@......i..\n0020  01 32 d6 24 00 50 2f 14 02 82 99 82 14 a2 50 10  .2.$.P/.......P.'
  },
  {
    no: 7,
    time: '0.038221',
    source: '192.168.1.105',
    dest: '192.168.1.50',
    protocol: 'HTTP',
    length: 312,
    info: 'POST /login.php HTTP/1.1 (application/x-www-form-urlencoded)',
    ethernet: { srcMac: '00:0c:29:8b:41:22', dstMac: '00:11:32:9c:4a:21', type: 'IPv4 (0x0800)' },
    ip: { srcIp: '192.168.1.105', dstIp: '192.168.1.50', ttl: 64, protocol: 'TCP (6)' },
    transport: { srcPort: 54820, dstPort: 80, flags: '[PSH, ACK]' },
    payloadText: `POST /login.php HTTP/1.1
Host: internal-portal.corp
User-Agent: Mozilla/5.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 48

username=admin&password=SuperSecretPassword2026!`,
    hexDump: `0000  50 4f 53 54 20 2f 6c 6f 67 69 6e 2e 70 68 70 20  POST /login.php 
0010  48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20  HTTP/1.1..Host: 
0020  69 6e 74 65 72 6e 61 6c 2d 70 6f 72 74 61 6c 2e  internal-portal.
0030  63 6f 72 70 0d 0a 0d 0a 75 73 65 72 6e 61 6d 65  corp....username
0040  3d 61 64 6d 69 6e 26 70 61 73 73 77 6f 72 64 3d  =admin&password=
0050  53 75 70 65 72 53 65 63 72 65 74 50 61 73 73 32  SuperSecretPass2
0060  30 32 36 21 0d 0a                                026!..`,
    isSuspicious: true
  },
  {
    no: 8,
    time: '0.052109',
    source: '198.51.100.44',
    dest: '192.168.1.50',
    protocol: 'TCP',
    length: 60,
    info: '48210 → 21 [SYN] Seq=0 Win=1024 Len=0 (SYN Port Scan)',
    ethernet: { srcMac: '00:11:32:9c:4a:21', dstMac: '00:0c:29:8b:41:22', type: 'IPv4 (0x0800)' },
    ip: { srcIp: '198.51.100.44', dstIp: '192.168.1.50', ttl: 48, protocol: 'TCP (6)' },
    transport: { srcPort: 48210, dstPort: 21, flags: '[SYN]' },
    payloadText: 'Adversary automated SYN port scan probing Port 21 (FTP)',
    hexDump: '0000  00 0c 29 8b 41 22 00 11 32 9c 4a 21 08 00 45 00  ..).A"..2.J!..E.\n0010  00 2c 91 22 00 00 30 06 ab 14 c6 33 64 2c c0 a8  .,."..0....3d,..',
    isSuspicious: true
  }
];

export const NetworkPacketAnalyzerLab: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedPacket, setSelectedPacket] = useState<Packet>(SAMPLE_PACKETS[6]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    frame: true,
    eth: true,
    ip: true,
    tcp: true,
    payload: true
  });
  const [flaggedThreat, setFlaggedThreat] = useState(false);

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredPackets = SAMPLE_PACKETS.filter(pkt => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return true;
    if (q === 'http') return pkt.protocol === 'HTTP';
    if (q === 'dns') return pkt.protocol === 'DNS';
    if (q === 'tcp') return pkt.protocol === 'TCP';
    if (q === 'arp') return pkt.protocol === 'ARP';
    if (q.includes('80')) return pkt.transport.dstPort === 80 || pkt.transport.srcPort === 80;
    if (q.includes('post')) return pkt.info.toLowerCase().includes('post');
    return (
      pkt.source.includes(q) ||
      pkt.dest.includes(q) ||
      pkt.protocol.toLowerCase().includes(q) ||
      pkt.info.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-[620px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono shadow-2xl">
      {/* Wireshark Menu / Filter Strip */}
      <div className="bg-slate-900 border-b border-slate-800 p-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">PacketTrace Engine v3.1</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">· Capturing on eth0</span>
        </div>

        {/* Display Filter Input */}
        <div className="flex items-center gap-1.5 flex-1 max-w-md bg-slate-950 border border-slate-700 rounded px-2.5 py-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            placeholder="Apply display filter (e.g. http, tcp, dns, port 80)..."
            className="flex-1 bg-transparent text-xs text-slate-200 focus:outline-none placeholder:text-slate-600 font-mono"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="text-[10px] text-slate-400 hover:text-slate-200 px-1 bg-slate-800 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Filter Presets */}
        <div className="flex items-center gap-1 shrink-0 text-xs">
          <button
            onClick={() => setFilterQuery('http')}
            className={`px-2 py-0.5 rounded text-[11px] ${filterQuery === 'http' ? 'bg-cyan-600 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            http
          </button>
          <button
            onClick={() => setFilterQuery('dns')}
            className={`px-2 py-0.5 rounded text-[11px] ${filterQuery === 'dns' ? 'bg-cyan-600 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            dns
          </button>
          <button
            onClick={() => setFilterQuery('tcp')}
            className={`px-2 py-0.5 rounded text-[11px] ${filterQuery === 'tcp' ? 'bg-cyan-600 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            tcp
          </button>
        </div>
      </div>

      {/* Top Half: Packet List Table */}
      <div className="h-[220px] overflow-y-auto border-b border-slate-800 bg-slate-950 select-none text-xs">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900 sticky top-0 text-slate-400 font-semibold text-[11px] border-b border-slate-800 z-10">
            <tr>
              <th className="py-1.5 px-3 w-12">No.</th>
              <th className="py-1.5 px-3 w-20">Time</th>
              <th className="py-1.5 px-3 w-32">Source</th>
              <th className="py-1.5 px-3 w-32">Destination</th>
              <th className="py-1.5 px-3 w-16">Protocol</th>
              <th className="py-1.5 px-3 w-16">Length</th>
              <th className="py-1.5 px-3">Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 text-slate-300">
            {filteredPackets.map(pkt => {
              const isSelected = selectedPacket.no === pkt.no;
              let protoBg = 'bg-slate-800/20';
              let protoText = 'text-slate-300';
              if (pkt.protocol === 'HTTP') {
                protoBg = 'bg-emerald-950/40 text-emerald-300';
                protoText = 'text-emerald-400 font-bold';
              } else if (pkt.protocol === 'DNS') {
                protoBg = 'bg-cyan-950/40 text-cyan-300';
                protoText = 'text-cyan-400 font-bold';
              } else if (pkt.protocol === 'TCP') {
                protoBg = 'bg-blue-950/30 text-blue-300';
                protoText = 'text-blue-400';
              } else if (pkt.protocol === 'ARP') {
                protoBg = 'bg-amber-950/30 text-amber-300';
                protoText = 'text-amber-400';
              }

              return (
                <tr
                  key={pkt.no}
                  onClick={() => setSelectedPacket(pkt)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-cyan-950/80 border-l-2 border-cyan-400 text-cyan-200' : 'hover:bg-slate-900/60'
                  }`}
                >
                  <td className="py-1 px-3 tabular-nums">{pkt.no}</td>
                  <td className="py-1 px-3 text-slate-500 tabular-nums">{pkt.time}</td>
                  <td className="py-1 px-3 text-slate-300">{pkt.source}</td>
                  <td className="py-1 px-3 text-slate-300">{pkt.dest}</td>
                  <td className="py-1 px-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${protoBg} ${protoText}`}>
                      {pkt.protocol}
                    </span>
                  </td>
                  <td className="py-1 px-3 text-slate-500 tabular-nums">{pkt.length}</td>
                  <td className="py-1 px-3 truncate max-w-xs text-slate-200">
                    {pkt.isSuspicious && (
                      <span className="text-rose-400 mr-1.5 font-bold">[SUSPICIOUS]</span>
                    )}
                    {pkt.info}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Half: Split View (Packet Details Tree + Hex Dump) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-900/40 overflow-hidden">
        {/* Left: Collapsible Protocol Header Tree */}
        <div className="p-3 overflow-y-auto text-xs space-y-2 select-text">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Packet #{selectedPacket.no} Dissection
            </span>
            {selectedPacket.isSuspicious && (
              <button
                onClick={() => setFlaggedThreat(true)}
                className={`text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-colors ${
                  flaggedThreat
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                    : 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700'
                }`}
              >
                {flaggedThreat ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {flaggedThreat ? 'Threat Flagged & Documented' : 'Flag Cleartext Leak / Scan'}
              </button>
            )}
          </div>

          {/* Layer 2: Ethernet */}
          <div className="border border-slate-800/80 rounded bg-slate-950/60 p-2">
            <button
              onClick={() => toggleSection('eth')}
              className="flex items-center gap-1.5 font-semibold text-slate-300 w-full text-left"
            >
              {openSections.eth ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              Ethernet II, Src: {selectedPacket.ethernet.srcMac}, Dst: {selectedPacket.ethernet.dstMac}
            </button>
            {openSections.eth && (
              <div className="pl-5 pt-1.5 space-y-0.5 text-[11px] text-slate-400 font-mono">
                <div>Destination MAC: {selectedPacket.ethernet.dstMac}</div>
                <div>Source MAC: {selectedPacket.ethernet.srcMac}</div>
                <div>Type: {selectedPacket.ethernet.type}</div>
              </div>
            )}
          </div>

          {/* Layer 3: IPv4 */}
          <div className="border border-slate-800/80 rounded bg-slate-950/60 p-2">
            <button
              onClick={() => toggleSection('ip')}
              className="flex items-center gap-1.5 font-semibold text-slate-300 w-full text-left"
            >
              {openSections.ip ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              Internet Protocol Version 4, Src: {selectedPacket.ip.srcIp}, Dst: {selectedPacket.ip.dstIp}
            </button>
            {openSections.ip && (
              <div className="pl-5 pt-1.5 space-y-0.5 text-[11px] text-slate-400 font-mono">
                <div>Source IP Address: {selectedPacket.ip.srcIp}</div>
                <div>Destination IP Address: {selectedPacket.ip.dstIp}</div>
                <div>Time to Live (TTL): {selectedPacket.ip.ttl}</div>
                <div>Protocol: {selectedPacket.ip.protocol}</div>
              </div>
            )}
          </div>

          {/* Layer 4: TCP / UDP */}
          {selectedPacket.transport.srcPort && (
            <div className="border border-slate-800/80 rounded bg-slate-950/60 p-2">
              <button
                onClick={() => toggleSection('tcp')}
                className="flex items-center gap-1.5 font-semibold text-slate-300 w-full text-left"
              >
                {openSections.tcp ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                Transmission Control Protocol, Src Port: {selectedPacket.transport.srcPort}, Dst Port:{' '}
                {selectedPacket.transport.dstPort}
              </button>
              {openSections.tcp && (
                <div className="pl-5 pt-1.5 space-y-0.5 text-[11px] text-slate-400 font-mono">
                  <div>Source Port: {selectedPacket.transport.srcPort}</div>
                  <div>Destination Port: {selectedPacket.transport.dstPort}</div>
                  {selectedPacket.transport.flags && <div>Flags: {selectedPacket.transport.flags}</div>}
                  {selectedPacket.transport.seq !== undefined && <div>Sequence Number: {selectedPacket.transport.seq}</div>}
                </div>
              )}
            </div>
          )}

          {/* Layer 7: Payload */}
          <div className="border border-slate-800/80 rounded bg-slate-950/60 p-2">
            <button
              onClick={() => toggleSection('payload')}
              className="flex items-center gap-1.5 font-semibold text-slate-300 w-full text-left"
            >
              {openSections.payload ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              Application Layer Data ({selectedPacket.protocol})
            </button>
            {openSections.payload && (
              <div className="pl-5 pt-1.5 text-[11px] text-slate-300 whitespace-pre-wrap font-mono bg-slate-900/60 p-2 rounded mt-1 border border-slate-800">
                {selectedPacket.payloadText}
              </div>
            )}
          </div>
        </div>

        {/* Right: Hex / ASCII Raw Dump Pane */}
        <div className="p-3 overflow-y-auto bg-slate-950 text-xs">
          <div className="pb-1.5 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Raw Packet Hex Dump & ASCII Bytes</span>
            <span className="text-slate-500 font-normal">Offset: 0x0000 - 0x{selectedPacket.length.toString(16)}</span>
          </div>
          <pre className="mt-2 text-slate-400 font-mono text-[11px] leading-relaxed selection:bg-cyan-500 selection:text-slate-950">
            {selectedPacket.hexDump}
          </pre>

          {selectedPacket.no === 7 && (
            <div className="mt-4 p-2.5 rounded bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs">
              <span className="font-bold flex items-center gap-1 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Security Finding Detected:
              </span>
              Unencrypted HTTP POST request transmitting plaintext credentials (`admin` / `SuperSecretPassword2026!`).
              Solution: Enforce HTTPS TLS 1.3 with HSTS headers.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
