import React, { useState } from 'react';
import { Cpu, Wifi, Radio, AlertTriangle, ShieldCheck, CheckCircle2, Lock, Terminal, RefreshCw, Key } from 'lucide-react';

export const IoTSecurityLab: React.FC = () => {
  const [activeStep, setActiveStep] = useState<'scan' | 'auth' | 'mqtt' | 'hardening'>('scan');

  // State
  const [deviceScanned, setDeviceScanned] = useState(false);
  const [testedCredentials, setTestedCredentials] = useState<'default' | 'custom' | null>(null);
  const [deviceRootAccess, setDeviceRootAccess] = useState(false);
  const [mqttEncrypted, setMqttEncrypted] = useState(false);
  const [vlanIsolated, setVlanIsolated] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  // Scan simulation
  const handleScan = () => {
    setDeviceScanned(true);
  };

  const handleTestLogin = (user: string, pass: string) => {
    if (user === 'root' && pass === 'default' && !passwordChanged) {
      setTestedCredentials('default');
      setDeviceRootAccess(true);
    } else {
      setTestedCredentials('custom');
      setDeviceRootAccess(false);
    }
  };

  const isHardened = passwordChanged && mqttEncrypted && vlanIsolated;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono shadow-2xl flex flex-col h-[580px]">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">IoT & Embedded Device Security Sandbox</span>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveStep('scan')}
            className={`px-3 py-1 rounded transition-colors ${
              activeStep === 'scan' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Port Discovery
          </button>
          <button
            onClick={() => setActiveStep('auth')}
            className={`px-3 py-1 rounded transition-colors ${
              activeStep === 'auth' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Credential Exploit
          </button>
          <button
            onClick={() => setActiveStep('mqtt')}
            className={`px-3 py-1 rounded transition-colors ${
              activeStep === 'mqtt' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. MQTT Sniffing
          </button>
          <button
            onClick={() => setActiveStep('hardening')}
            className={`px-3 py-1 rounded transition-colors ${
              activeStep === 'hardening' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Device Hardening
          </button>
        </div>
      </div>

      {/* Main Sandbox Canvas */}
      <div className="flex-1 p-5 overflow-y-auto text-xs space-y-4">
        {activeStep === 'scan' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" /> Target: Smart Industrial Thermostat / IP Camera (192.168.1.180)
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Scan the local subnet to discover open services and exposed ports on the IoT target device.
              </p>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="text-slate-300 font-mono text-xs">Command: nmap -sV -p 23,80,554,1883 192.168.1.180</span>
              <button
                onClick={handleScan}
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-xs transition-colors"
              >
                Execute Nmap Scan
              </button>
            </div>

            {deviceScanned ? (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
                <div className="text-emerald-400 font-bold">Nmap Scan Report for 192.168.1.180 (SmartCam-IoT v2.4):</div>
                <div className="space-y-1 text-slate-300 bg-slate-950 p-3 rounded border border-slate-800">
                  <div className="flex justify-between text-rose-400 font-semibold">
                    <span>PORT 23/tcp OPEN: Telnet (Insecure BusyBox Linux remote shell)</span>
                    <span className="text-[10px] bg-rose-950 px-1.5 rounded border border-rose-800">CRITICAL</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>PORT 80/tcp OPEN: HTTP (Lighttpd 1.4.35 web server)</span>
                    <span>Informational</span>
                  </div>
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>PORT 1883/tcp OPEN: Mosquitto MQTT (Unencrypted Telemetry)</span>
                    <span className="text-[10px] bg-amber-950 px-1.5 rounded border border-amber-800">MEDIUM</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>PORT 554/tcp OPEN: RTSP (Real-Time Video Stream)</span>
                    <span>Informational</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveStep('auth')}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-xs"
                  >
                    Proceed to Step 2: Test Factory Credentials →
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-lg">
                Click "Execute Nmap Scan" to probe the device.
              </div>
            )}
          </div>
        )}

        {activeStep === 'auth' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" /> Telnet Factory Default Credential Exploitation:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Over 70% of IoT compromises occur because manufacturers leave hardcoded factory credentials like
                <code className="text-cyan-300"> root/default</code> or <code className="text-cyan-300">admin/admin</code> enabled over unencrypted Telnet.
              </p>
            </div>

            {/* Test buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleTestLogin('root', 'default')}
                className="p-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-left space-y-1 transition-colors"
              >
                <div className="font-bold text-slate-200">Test Factory Credentials (root : default)</div>
                <div className="text-[11px] text-slate-500">Standard Mirai botnet dictionary attack vector</div>
              </button>

              <button
                onClick={() => handleTestLogin('root', 'CustomSecureP@ss2026!')}
                className="p-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-left space-y-1 transition-colors"
              >
                <div className="font-bold text-slate-200">Test Random Hardened Password</div>
                <div className="text-[11px] text-slate-500">Simulates guessing non-default password</div>
              </button>
            </div>

            {/* Terminal output simulation */}
            {testedCredentials && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
                <div className="text-slate-400"># Connecting to 192.168.1.180:23 via Telnet...</div>
                <div className="text-slate-300">Connected to SmartCam-IoT (Linux 4.9.84-arm).</div>
                <div className="text-slate-300">SmartCam login: root</div>
                <div className="text-slate-300">Password: ••••••••</div>

                {deviceRootAccess ? (
                  <div className="p-3 bg-rose-950/60 border border-rose-800 rounded text-rose-300 space-y-1 mt-2">
                    <div className="font-bold flex items-center gap-1.5 text-xs text-rose-400">
                      <AlertTriangle className="w-4 h-4" /> ROOT ACCESS GRANTED (IoT Compromise Successful!)
                    </div>
                    <div className="text-[11px] text-slate-300">
                      BusyBox v1.22.1 (built-in shell). The attacker now has complete administrative control of the device,
                      camera video stream, and microphone!
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded text-emerald-300 space-y-1 mt-2">
                    <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> LOGIN FAILED: Access Denied
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Authentication rejected. Device is not vulnerable to default credential dictionary attacks.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeStep === 'mqtt' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> MQTT Telemetry Sniffing (Port 1883 vs 8883):
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                MQTT is the standard messaging protocol for IoT sensors. Without TLS encryption (MQTTS), eavesdroppers on
                the local network can read real-time camera coordinates, facility temperatures, or inject malicious commands.
              </p>
            </div>

            {/* MQTT Stream view */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="font-bold text-slate-300">Live Sniffed MQTT Sensor Topic Stream (#)</span>
                <span className="text-slate-500 text-[10px] font-mono">Broker: 192.168.1.180</span>
              </div>

              {!mqttEncrypted ? (
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="p-2 bg-slate-900/80 rounded border border-slate-800 flex justify-between">
                    <span className="text-cyan-400">topic: factory/floor1/thermostat/temp</span>
                    <span className="text-amber-300 font-bold">payload: "72.4 F · Valve State: OPEN"</span>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded border border-slate-800 flex justify-between">
                    <span className="text-cyan-400">topic: smartcam/security/motion</span>
                    <span className="text-rose-400 font-bold">payload: "MOTION DETECTED · Person at Vault Door"</span>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded border border-slate-800 flex justify-between">
                    <span className="text-cyan-400">topic: factory/hvac/control</span>
                    <span className="text-rose-400 font-bold">payload: "EMERGENCY_SHUTDOWN=FALSE"</span>
                  </div>
                  <div className="text-[11px] text-rose-400 pt-1">
                    ⚠️ Vulnerability: Unauthenticated cleartext MQTT exposes physical operational infrastructure.
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> MQTTS (Port 8883 with TLS 1.3) Active:
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono">
                    Encrypted Payload: 4a9f81bc029e84... (Ciphertext unreadable by network sniffers).
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeStep === 'hardening' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> IoT Device Defensive Hardening Checklist:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Apply industrial cybersecurity controls to harden the embedded IoT device against persistent compromise.
              </p>
            </div>

            <div className="space-y-3">
              {/* Control 1 */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200 text-xs">1. Change Factory Default Passwords</div>
                  <div className="text-[11px] text-slate-400">Replace factory root password with a salted, complex 20-character secret.</div>
                </div>
                <button
                  onClick={() => setPasswordChanged(prev => !prev)}
                  className={`px-3 py-1.5 rounded font-bold text-xs transition-colors ${
                    passwordChanged ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {passwordChanged ? 'Password Changed ✓' : 'Update Password'}
                </button>
              </div>

              {/* Control 2 */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200 text-xs">2. Enforce MQTTS TLS 1.3 Encryption</div>
                  <div className="text-[11px] text-slate-400">Disable port 1883 cleartext; mandate certificate-authenticated port 8883.</div>
                </div>
                <button
                  onClick={() => setMqttEncrypted(prev => !prev)}
                  className={`px-3 py-1.5 rounded font-bold text-xs transition-colors ${
                    mqttEncrypted ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {mqttEncrypted ? 'MQTTS Active ✓' : 'Enable TLS 8883'}
                </button>
              </div>

              {/* Control 3 */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200 text-xs">3. Isolate on Dedicated IoT VLAN</div>
                  <div className="text-[11px] text-slate-400">Prevent compromised smart devices from laterally moving into enterprise networks.</div>
                </div>
                <button
                  onClick={() => setVlanIsolated(prev => !prev)}
                  className={`px-3 py-1.5 rounded font-bold text-xs transition-colors ${
                    vlanIsolated ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {vlanIsolated ? 'VLAN Isolated ✓' : 'Isolate Network'}
                </button>
              </div>
            </div>

            {/* Hardening status */}
            <div
              className={`p-4 rounded-xl border flex items-center justify-between ${
                isHardened
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                {isHardened ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                <div>
                  <div className="font-bold text-xs">
                    {isHardened ? 'DEFENSIVE HARDENING COMPLETE: IoT Device Fully Secured!' : 'Hardening Incomplete (Pending Controls)'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isHardened
                      ? 'Device is immune to Mirai botnet scans, telemetry is encrypted, and lateral movement is blocked.'
                      : 'Activate all 3 hardening controls above to achieve complete IoT protection.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
