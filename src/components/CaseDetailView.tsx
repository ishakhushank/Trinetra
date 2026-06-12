import React, { useState, useEffect } from 'react';
import { CaseStudy } from '../types';
import { ArrowLeft, Download, Check, HelpCircle, Save, Info } from 'lucide-react';

interface CaseDetailViewProps {
  caseStudy: CaseStudy;
  onBack: () => void;
  answersState: Record<string, string>;
  onSaveAnswer: (questionId: string, answer: string, isCorrect: boolean) => void;
  questionsProgress: { completed: number; total: number };
}

export default function CaseDetailView({
  caseStudy,
  onBack,
  answersState,
  onSaveAnswer,
  questionsProgress,
}: CaseDetailViewProps) {
  const [note, setNote] = useState('');
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED'>('IDLE');
  
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checkingResult, setCheckingResult] = useState<Record<string, 'CORRECT' | 'WRONG' | 'NONE'>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  // Load saved answers
  useEffect(() => {
    const loadedInputs: Record<string, string> = {};
    const loadedResults: Record<string, 'CORRECT' | 'WRONG' | 'NONE'> = {};
    
    caseStudy.investigationQuestions.forEach((q) => {
      const savedAns = answersState[`${caseStudy.id}-${q.id}`];
      if (savedAns) {
        loadedInputs[q.id] = savedAns;
        loadedResults[q.id] = 'CORRECT';
      } else {
        loadedInputs[q.id] = '';
        loadedResults[q.id] = 'NONE';
      }
    });
    
    setInputs(loadedInputs);
    setCheckingResult(loadedResults);
  }, [caseStudy, answersState]);

  // Load and Autosave Notes
  useEffect(() => {
    const savedNotes = localStorage.getItem(`trinetra-note-${caseStudy.id}`);
    if (savedNotes) {
      setNote(savedNotes);
    } else {
      setNote('');
    }
    setSaveStatus('IDLE');
  }, [caseStudy.id]);

  const handleNotesChange = (text: string) => {
    setNote(text);
    setSaveStatus('SAVING');
  };

  useEffect(() => {
    if (saveStatus !== 'SAVING') return;

    const delayDebounceFn = setTimeout(() => {
      localStorage.setItem(`trinetra-note-${caseStudy.id}`, note);
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('IDLE'), 1500);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [note, saveStatus, caseStudy.id]);

  // Download simulation generator (highly realistic mock logs matching actual investigation questions)
  const triggerFileDownload = (fileName: string) => {
    let content = '';

    if (caseStudy.id === 'cdr-murder') {
      if (fileName.includes('suspect_thomas_k')) {
        content = 'Timestamp,Event_Type,Recipient_Phone,Duration_Seconds,Cell_ID,Sector,IMEI,Metadata\n' +
                  '2026-04-12 21:10,Outgoing,+91-98450-12888,240,TWR-SUB-12,Sector_Alpha,860294028472019,Active alibi route check\n' +
                  '2026-04-12 22:30,Incoming,+91-98450-12888,1420,TWR-HWY-03,Sector_Beta,860294028472019,Unusually long incoming session\n' +
                  '2026-04-12 23:45,Outgoing,+91-91223-45544,45,TWR-DOCK-09,Sector_Alpha,860294028472019,Ping near Crime Scene\n' +
                  '2026-04-13 01:15,Incoming,+91-98450-12888,380,TWR-CITY-40,Sector_Gamma,860294028472019,Post-crime coordination\n' +
                  '2026-04-13 02:40,SMS_Received,+91-98450-12888,0,TWR-HOME-01,Sector_Alpha,860294028472019,Status update text\n';
      } else {
        content = 'Tower_ID,Location_Zone,Capacity,Antenna_Height_M,Sector_Directivity,Operational_State\n' +
                  'TWR-HOME-01,Residential West,500,45,Directional,NORMAL\n' +
                  'TWR-SUB-12,Suburban Crossways,800,60,Multi-beam,NORMAL\n' +
                  'TWR-DOCK-09,Waterfront Docks South,1200,85,Omni-beam,HIGH_LOAD\n' +
                  'TWR-CITY-40,Metropolis Center,2000,110,Sectorized,NORMAL\n';
      }
    } else if (caseStudy.id === 'cdr-kidnap') {
      if (fileName.includes('burner_sim')) {
        content = 'Event_ID,Timestamp,Cell_Tower_ID,Coverage_Sector,IMSI,Channel_Freq,MCC_MNC,Call_Length_Sec\n' +
                  'EVT-1049,15:10,TWR-SUB-94,Sector_01,404459827361542,1800MHz,404-45 (Airtel),120\n' +
                  'EVT-2204,16:21,TWR-IND-24,Sector_03,404459827361542,1800MHz,404-45 (Airtel),680\n' +
                  'EVT-3950,17:40,TWR-CBD-91,120_Degrees,404459827361542,900MHz,404-45 (Airtel),540\n' +
                  'EVT-5011,19:15,TWR-OUT-08,Sector_02,404459827361542,900MHz,404-45 (Airtel),1180\n';
      } else {
        content = 'INTERCEPT REPORT - LAW ENFORCEMENT RECORDING\n' +
                  '--------------------------------------------------\n' +
                  'TARGET USER: Extortion Caller / Pre-paid Line\n' +
                  'RECORDINGS:\n' +
                  '- 15:10 Call: Ransom demand issued to family. Location flagged Suburban 4 (TWR-SUB-94).\n' +
                  '- 17:40 Call: Hand-off directions. Angle Sector 120_Degrees. Carrier MNC 404-45.\n' +
                  '- Final log: Total accumulative connection threshold clocked at 42 active minutes.\n';
      }
    } else if (caseStudy.id === 'cdr-drugs') {
      content = 'Row_No,Source_Courier,Destination_No,Duration_Sec,Traffic_Type,Base_Station,Timestamp\n' +
                '1,Courier_A_Handset,+91-90011-33222,120,VOICE,TWR-WEST-01,2026-04-12 14:12\n' +
                '2,Courier_B_Handset,+91-90011-33222,0,SMS,TWR-HUB-01,2026-04-12 23:15\n' +
                '3,Courier_C_Handset,+91-90011-33222,0,SMS,TWR-HUB-01,2026-04-12 23:42\n' +
                'Note: This combined file shows 118 communications links focusing on the central dispatcher hub +91-90011-33222 peaking between 23:00-24:00. Total text logs received sum to 84.\n';
    } else if (caseStudy.id === 'cdr-contract') {
      if (fileName.includes('primary_alibi')) {
        content = 'Timestamp,Event,Target,Tower,Sector,Notes\n' +
                  '20:10,PING,Home_Wifi,TWR-HOME-03,Sector_1,Alibi active\n' +
                  '22:00,VOICE_IN,+91-88877-66554,TWR-HWY-14,Sector_A,Coordination call\n';
      } else {
        content = 'Timestamp,Operative_ID,Recipient,Tower_Registered,Speed_Kmh,SIM_ZIP,Device_State\n' +
                  '19:40,OP-091,+91-88877-66554,TWR-HWY-14,92,110001,Expressway Toll checkpoint\n' +
                  '22:00,OP-091,+91-88877-66554,TWR-HWY-14,0,110001,Simultaneous match with alibi phone\n' +
                  '22:35,OP-091,LOCAL_BROADCAST,TWR-CRIME-SEC3,10,110001,Post-incident alibi breakout\n';
      }
    } else if (caseStudy.id === 'cdr-simswap') {
      if (fileName.includes('displaced_victim')) {
        content = 'Network_Timestamp,IMSI,Status,Registered_IMEI,Loss_Signal_Code\n' +
                  '11:30,404101928374201,CONNECTED,354490100482010,NORMAL\n' +
                  '11:42,404101928374201,DETACH_SIGNAL,354490100482010,FORCED_EXTERNAL_PROVISIONING_SWAP\n';
      } else {
        content = 'Dealer_Register,Store_Code,Processor_Terminal,Requested_IMSI,Approved_By,Authorized_Forward_No\n' +
                  'PROV-9011,DLRS-WEST-09,TERM-88402,404101928374201,Store_Credential_88214,+91-70012-99887\n' +
                  'Security Alert: Swapped SIM first pinged from secondary hardware IMEI 359871100482710 at 11:43.\n';
      }
    } else if (caseStudy.id === 'ipdr-leak') {
      if (fileName.includes('access_log')) {
        content = 'Web_Access_Timestamp,Client_Request_IP,Request_URI,HTTP_Status_Code,Bytes_Sent,Client_User_Agent\n' +
                  '03:10:15,192.168.42.10,/,302,1024,Mozilla/5.0\n' +
                  '03:14:22,192.168.42.115,/admin/sec/security_exam_final.pdf,200,4194304,Mozilla/5.0 (Windows NT 10.0; Win64; x64) curl/7.88.1\n' +
                  'Target exfiltration routed to proxy gateway node 185.220.101.5\n';
      } else {
        content = 'EXAM BLUEPRINT SYSTEM MANIFEST\n' +
                  '-------------------------------\n' +
                  'Filename: security_exam_final.pdf\n' +
                  'Security Class: Secret Level 4\n' +
                  'Hash MD5: a49f3e098df2410f22ff3452bd\n' +
                  'Storage Size: 4194304 Bytes\n';
      }
    } else if (caseStudy.id === 'ipdr-espionage') {
      if (fileName.includes('blueprint_server')) {
        content = 'Timestamp,Internal_Operator_Host,Requested_File,Total_Payload_Downloaded,Auth_Verified\n' +
                  '15:20,10.10.12.85,/repos/blueprint_master_rev4.tar.gz,812000000,YES\n';
      } else {
        content = 'Firewall_Egress_Timestamp,Source_Internal,External_Target,Target_Port,Total_MB,Socket_Status\n' +
                  '15:35,10.10.12.85,45.79.120.33,Port 22 (SFTP),812,ACTIVE\n' +
                  '16:45:12,10.10.12.85,45.79.120.33,Port 22 (SFTP),0,SOCKET_CLOSED_OK\n';
      }
    } else if (caseStudy.id === 'ipdr-stalking') {
      content = 'Reset_Attempt_Timestamp,Requested_Username,Client_IP,ISP_Provider,Platform_OS,Geo_Sector\n' +
                '2026-05-10 11:22,influencer_official,198.51.100.222,Excelsior_Comms,Android_OS,North_Delhi\n' +
                'This IP submitted 47 failed password reset attempts running Android OS platforms.\n';
    } else if (caseStudy.id === 'ipdr-crypto') {
      if (fileName.includes('network_trace')) {
        content = 'Timestamp,Query_Host,Action,Destination_IP,Endpoint_URI,Latency_Ms\n' +
                  '10:45:22,secure-ledger-login.org,RESOLVED_DNS,185.112.144.90,-,12\n' +
                  '10:45:25,secure-ledger-login.org,POST_PAYLOAD_EVICT,185.112.144.90,/api/v1/harvest/keys,340\n';
      } else {
        content = 'WHOIS INFORMATION QUERY\n' +
                  '-----------------------\n' +
                  'Domain Name: secure-ledger-login.org\n' +
                  'Registry Domain ID: 981140283_DOMAIN_ORG\n' +
                  'Registrar URL: https://ru-tld-register.example\n' +
                  'IP Owner Country State: Russia (RU)\n';
      }
    } else if (caseStudy.id === 'ipdr-terror') {
      if (fileName.includes('sleeper_agent_network_ipdr')) {
        content = 'Timestamp,Source_Agent,Proxy_Bridge_IP,Destination_Port,Payload_KB,Active_Connection_Handshake\n' +
                  '22:15,Suspect-04,198.51.100.81,9001,18420,TLSv1.3\n' +
                  'Failover bridge activation noted: 203.0.113.155 initiated as gateway backup post disconnection.\n';
      } else {
        content = 'Sleeper Cell Network Relay Coordinates\n' +
                  '- Primary Entry Portal: IP 198.51.100.81\n' +
                  '- Primary Port: 9001\n' +
                  '- Failover Route: Backup gateway relay IP 203.0.113.155\n' +
                  '- TLS Version Negotiated: TLSv1.3\n';
      }
    } else {
      content = 'Trinetra Investigative Support Log\n' +
                '----------------------------------\n' +
                'This file contains practice dataset payloads matching Trinetra requirements.\n';
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAnswerSubmit = (qId: string) => {
    const rawVal = inputs[qId]?.trim().toLowerCase() || '';
    if (!rawVal) return;

    let isCorrect = false;

    // Check if the question defines diagnostic keywords dynamically
    const question = caseStudy.investigationQuestions.find((q) => q.id === qId);

    if (question && question.correctKeywords) {
      isCorrect = question.correctKeywords.some((keyword) =>
        rawVal.includes(keyword.trim().toLowerCase())
      );
    } else {
      // Fallback for custom or old cases (if any)
      if (caseStudy.id === 'cdr-case-1') {
        if (qId === 'q1') isCorrect = rawVal.includes('11111');
        if (qId === 'q2') isCorrect = rawVal.includes('11:30') || rawVal.includes('1130');
      } else if (caseStudy.id === 'cdr-case-2') {
        if (qId === 'q1') isCorrect = rawVal.includes('metro_02') || rawVal.includes('metro02') || rawVal.includes('metro 2');
        if (qId === 'q2') isCorrect = rawVal.includes('2') || rawVal.includes('two');
      } else if (caseStudy.id === 'ipdr-case-1') {
        if (qId === 'q1') isCorrect = rawVal.includes('100.12') || rawVal.includes('198.51.100.12');
        if (qId === 'q2') isCorrect = rawVal.includes('443');
      } else if (caseStudy.id === 'ipdr-case-2') {
        if (qId === 'q1') isCorrect = rawVal.includes('10.0.0.1');
        if (qId === 'q2') isCorrect = rawVal.includes('2') || rawVal.includes('two') || rawVal.includes('17');
      } else {
        isCorrect = rawVal.length > 0;
      }
    }

    setCheckingResult((prev) => ({ ...prev, [qId]: isCorrect ? 'CORRECT' : 'WRONG' }));
    onSaveAnswer(qId, inputs[qId], isCorrect);
  };

  const forceAcceptAnswer = (qId: string, customText: string) => {
    setInputs(prev => ({ ...prev, [qId]: customText }));
    setCheckingResult(prev => ({ ...prev, [qId]: 'CORRECT' }));
    onSaveAnswer(qId, customText, true);
  };

  const getSolutionText = (qId: string) => {
    const question = caseStudy.investigationQuestions.find((q) => q.id === qId);
    if (question && question.solutionText) {
      return question.solutionText;
    }

    // Fallbacks
    if (caseStudy.id === 'cdr-case-1') {
      if (qId === 'q1') return '+91-99999-11111';
      if (qId === 'q2') return '11:30';
    }
    if (caseStudy.id === 'cdr-case-2') {
      if (qId === 'q1') return 'Metro_02';
      if (qId === 'q2') return '2';
    }
    if (caseStudy.id === 'ipdr-case-1') {
      if (qId === 'q1') return '198.51.100.12';
      if (qId === 'q2') return '443';
    }
    if (caseStudy.id === 'ipdr-case-2') {
      if (qId === 'q1') return '10.0.0.1';
      if (qId === 'q2') return '2 (the connections made at 12:05 and 12:08)';
    }
    return 'Sample finding text';
  };

  const allSolved = questionsProgress.completed === questionsProgress.total;

  return (
    <div className="space-y-6 py-2">
      {/* Back Header */}
      <div className="flex justify-between items-center bg-dark-card p-4 rounded-lg border border-dark-border">
        <button
          onClick={onBack}
          className="text-sm text-brand-blue hover:underline flex items-center gap-1 font-medium cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to list
        </button>

        <span className="text-xs text-text-secondary font-mono">
          Progress: {questionsProgress.completed} of {questionsProgress.total} answered
        </span>
      </div>

      {allSolved && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg text-emerald-300 text-sm flex items-center gap-2">
          <Check className="h-5 w-5 stroke-[3]" />
          <span>Case completed! You answered all questions for this study.</span>
        </div>
      )}

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dossier info */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-brand-blue font-bold uppercase">{caseStudy.category.toUpperCase()} Cases Category</span>
              <h1 className="text-2xl font-bold text-white">{caseStudy.title}</h1>
            </div>

            <hr className="border-dark-border" />

            {/* Case summary */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Summary</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-sans">{caseStudy.summary}</p>
            </div>

            {/* Background Story */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Background / Story</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-sans">{caseStudy.backgroundStory}</p>
            </div>

            {/* Objective */}
            <div className="bg-dark-bg p-4 rounded border border-dark-border text-xs text-text-secondary space-y-1">
              <span className="font-bold text-white uppercase text-[10px] block">Investigation Objective</span>
              <p>{caseStudy.objective}</p>
            </div>
          </div>

          {/* Evidence Dossier section */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Evidence Files</h3>
            <p className="text-xs text-text-secondary">Download these files and open them to answer the questions.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caseStudy.evidenceFiles.map((file, i) => (
                <div key={i} className="bg-dark-bg border border-dark-border p-4 rounded flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white truncate">{file.name}</h4>
                    <span className="text-[10px] text-text-muted">Size: {file.size} ({file.type})</span>
                    <p className="text-xs text-text-secondary mt-1">{file.description}</p>
                  </div>
                  <button
                    onClick={() => triggerFileDownload(file.name)}
                    className="w-full text-xs bg-dark-card hover:bg-dark-border text-white py-1.5 px-3 rounded border border-dark-border flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Questions Section */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-6">
            <h3 className="font-bold text-white text-base">Investigation Questions</h3>

            <div className="space-y-4">
              {caseStudy.investigationQuestions.map((q, idx) => {
                const status = checkingResult[q.id] || 'NONE';
                const isCorrect = status === 'CORRECT';
                const isWrong = status === 'WRONG';
                const hintVisible = revealedHints[q.id];

                return (
                  <div key={q.id} className={`p-4 rounded-lg border bg-dark-bg/50 ${isCorrect ? 'border-emerald-500/20 bg-emerald-500/2' : 'border-dark-border'}`}>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <h4 className="text-sm font-semibold text-white">Q{idx + 1}: {q.question}</h4>
                      {isCorrect && <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Solved</span>}
                    </div>

                    <div className="flex gap-2">
                      <input
                        id={`input-${q.id}`}
                        type="text"
                        placeholder="Type answer here..."
                        disabled={isCorrect}
                        value={inputs[q.id] || ''}
                        onChange={(e) => setInputs({ ...inputs, [q.id]: e.target.value })}
                        className="flex-grow bg-dark-bg px-3 py-1.5 text-xs text-white rounded border border-dark-border focus:outline-none focus:border-brand-blue"
                      />
                      {!isCorrect && (
                        <button
                          onClick={() => handleAnswerSubmit(q.id)}
                          className="px-3 py-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                        >
                          Check
                        </button>
                      )}
                    </div>

                    {isWrong && (
                      <div className="text-xs text-red-400 mt-2 p-2 bg-red-500/5 rounded border border-red-500/10 flex flex-col gap-1.5">
                        <span>Answer is incorrect. Try again!</span>
                        <button 
                          onClick={() => forceAcceptAnswer(q.id, getSolutionText(q.id))}
                          className="text-left text-[11px] underline text-text-secondary hover:text-white"
                        >
                          Auto-fill correct answer key
                        </button>
                      </div>
                    )}

                    <div className="mt-3 flex gap-3 text-[11px]">
                      <button
                        onClick={() => setRevealedHints(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="text-text-secondary hover:text-brand-blue transition-colors flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        {hintVisible ? 'Hide hint & answer key' : 'Show hint & answer key'}
                      </button>
                    </div>

                    {hintVisible && (
                      <div className="mt-2.5 p-3 bg-dark-card border border-dark-border rounded text-xs text-text-secondary space-y-1">
                        <p><strong className="text-white">Hint:</strong> {q.hint}</p>
                        <hr className="border-dark-border/40 my-1" />
                        <p>
                          <span className="text-brand-blue font-bold">Answer Key: </span>
                          <span className="font-mono text-emerald-400 select-all underline font-bold">{getSolutionText(q.id)}</span>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notes sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-dark-card border border-dark-border rounded-xl p-5 space-y-4 sticky top-20">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Notes Scratchpad</h3>
              <span className="text-[10px] font-mono text-text-muted">
                {saveStatus === 'SAVING' ? 'Saving...' : saveStatus === 'SAVED' ? 'Saved!' : 'Autosaved'}
              </span>
            </div>

            <textarea
              id="case-notes-textarea"
              placeholder="Jot down notes about suspicious phone numbers, specific codes, IP servers, or general analysis thoughts..."
              value={note}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={12}
              className="w-full bg-dark-bg p-3 text-xs text-white rounded border border-dark-border placeholder:text-text-muted focus:outline-none focus:border-brand-blue resize-y font-mono leading-relaxed"
            />

            <div className="text-[11px] text-text-secondary space-y-1">
              <div className="font-semibold text-white flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-brand-blue" />
                Quick Instruction
              </div>
              <p>Type anything into the notepad to archive ideas. Your text persists to localStorage instantly as you type.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
