
import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const NeuralAnimation = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { 
      label: "DATA INGESTION", 
      sub: "Structuring RAW AIS PORTAL JSON", 
      details: ["SFT Reporting", "TDS Mappings", "Salary Metadata"],
      color: "#00332B" 
    },
    { 
      label: "EVIDENCE LINKAGE", 
      sub: "Neural CROSS-REFERENCE Engine", 
      details: ["Bank OCR Scan", "Broker Ledger Sync", "Integrity Hashing"],
      color: "#00D18E" 
    },
    { 
      label: "RECONCILIATION", 
      sub: "DEFENSIBLE AUDIT Narratives", 
      details: ["Neutral Language", "Traceable Bundle", "Risk Flagging"],
      color: "#00332B" 
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-80 h-[500px] md:w-[400px] md:h-[550px] flex-shrink-0 flex flex-col items-center justify-center">
      <div className={`absolute w-72 h-72 blur-[120px] rounded-full transition-all duration-1000 ${
        activeStep === 0 ? 'bg-slate-200/30' : 
        activeStep === 1 ? 'bg-[#00D18E]/20' : 
        'bg-[#00332B]/20'
      }`} />

      <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center mb-12">
        <div className="absolute inset-0 border-4 border-dashed border-slate-100 rounded-full opacity-20"></div>
        <div className="absolute inset-12 border-2 border-dotted border-[#00D18E]/20 rounded-full animate-[spin_40s_linear_infinite]"></div>
        
        <div className="absolute inset-0 pointer-events-none">
          {steps[activeStep].details.map((detail, idx) => (
            <div 
              key={`${activeStep}-${idx}`}
              className={`absolute bg-white px-4 py-2 rounded-xl border-2 shadow-xl text-[10px] font-black text-[#00332B] uppercase tracking-widest transition-all duration-700 ${
                activeStep === 1 ? 'border-[#00D18E]' : 'border-slate-100'
              }`}
              style={{
                top: idx === 0 ? '0%' : idx === 1 ? '45%' : '90%',
                left: idx === 0 ? '55%' : idx === 1 ? '-15%' : '50%',
                transform: activeStep === 1 ? 'scale(1.1)' : 'scale(1)',
                opacity: 1,
                zIndex: 20
              }}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${activeStep === 1 ? 'bg-[#00D18E] animate-pulse' : 'bg-slate-300'}`} />
                <span>{detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`relative w-40 h-40 md:w-48 md:h-48 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 transform border-[6px] ${
          activeStep === 0 ? 'bg-white border-slate-50' : 
          activeStep === 1 ? 'bg-[#00D18E] scale-110 border-white shadow-[#00D18E]/50' : 
          'bg-[#00332B] border-[#00D18E]'
        }`}>
          <div className={`absolute transition-all duration-700 flex flex-col items-center ${activeStep === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75 translate-y-12'}`}>
            <div className="flex space-x-1 mb-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-8 bg-slate-100 rounded-full animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
            <span className="text-[12px] font-black text-slate-400 tracking-tighter">INGESTING</span>
          </div>

          <div className={`absolute transition-all duration-700 ${activeStep === 1 ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'}`}>
            <div className="relative w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          <div className={`absolute transition-all duration-700 flex flex-col items-center ${activeStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
             <div className="w-20 h-24 bg-white/5 rounded-2xl border-2 border-[#00D18E] flex items-center justify-center relative shadow-inner">
                <svg className="w-12 h-12 text-[#00D18E] drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <span className="text-[11px] font-black text-[#00D18E] mt-3 tracking-widest uppercase">AUDIT READY</span>
          </div>
        </div>

        {activeStep === 1 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-[#00D18E] blur-sm animate-[scan_1.5s_ease-in-out_infinite]"></div>
          </div>
        )}
      </div>

      <div className="text-center w-full px-8">
        <div className="h-32 relative">
          {steps.map((s, i) => (
            <div 
              key={i}
              className={`absolute inset-0 transition-all duration-1000 flex flex-col items-center justify-start ${
                activeStep === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 scale-90'
              }`}
            >
              <h4 className="text-3xl font-black tracking-tighter mb-2 uppercase" style={{ color: s.color }}>
                {s.label}
              </h4>
              <p className="text-sm font-extrabold text-slate-500 uppercase tracking-widest leading-tight">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-3 mt-4">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-500 ${activeStep === i ? 'w-12 bg-[#00D18E]' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-140px); opacity: 0; }
          20%, 80% { opacity: 1; }
          50% { transform: translateY(140px); }
        }
      `}</style>
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const pricingTiers = [
    {
      name: 'Individual',
      price: '999',
      monthly: '83',
      features: ['Limited AIS entries', 'Evidence upload', 'Explanation reports'],
      accent: 'border-slate-100',
    },
    {
      name: 'Advanced',
      price: '2,499',
      monthly: '208',
      features: ['Higher AIS limits', 'Priority processing', 'Risk flagging'],
      accent: 'border-[#00D18E] ring-1 ring-[#00D18E]',
      popular: true,
    },
    {
      name: 'Professional',
      price: '9,999',
      monthly: '833',
      features: ['Multi-client support', 'CA workflows', 'Audit bundle exports'],
      accent: 'border-slate-100',
    },
  ];

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => setFeedbackSent(false), 5000);
  };

  const faqs = [
    { q: 'Does this give tax advice?', a: 'No. AIS Clarity is a reconciliation tool that explains data mismatches based on provided evidence. It does not suggest tax positions or provide legal advice.' },
    { q: 'Is this for filing returns?', a: 'No. This platform is used before or during filing to ensure the AIS reported by the department matches your actual records. Filing is a separate activity performed on the IT portal.' },
    { q: 'Can Chartered Accountants use this?', a: 'Yes. The Professional tier is specifically designed for CAs to manage multiple client portfolios and generate defensible audit bundles for scrutiny responses.' },
    { q: 'Is it audit-safe?', a: 'Yes. Every output is focused on traceability and neutral, evidence-backed explanations that follow standard auditing logic.' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FBFA] text-[#00332B] selection:bg-[#00D18E]/30 font-sans overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#00332B] rounded-xl flex items-center justify-center font-black text-white shadow-xl">C</div>
          <span className="text-xl font-black tracking-tighter">AIS Clarity</span>
        </div>
        <div className="flex items-center space-x-8">
          <button onClick={onStart} className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#00332B] transition-colors">Log In</button>
          <button 
            onClick={onStart}
            className="bg-[#00332B] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            START RECONCILIATION
          </button>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="inline-block bg-[#E6F4F1] text-[#00D18E] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-12 border border-[#00D18E]/20">
          RECONCILIATION PROTOCOL V2.4
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 text-center lg:text-left max-w-6xl mx-auto">
          <div className="flex-1">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Turn AIS Data Into Defensible <span className="text-[#00D18E]">Financial Truth</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl lg:mx-0 mx-auto mb-12 leading-relaxed">
              AIS Clarity reconciles what authorities report with what actually happened — using evidence-backed, audit-ready explanations.
            </p>
            <div className="flex flex-col md:flex-row items-center lg:justify-start justify-center gap-4">
              <button 
                onClick={onStart}
                className="w-full md:w-auto bg-[#00332B] text-white px-10 py-5 rounded-2xl text-sm font-black shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Reconciling AIS
              </button>
              <button className="w-full md:w-auto bg-white border border-slate-200 text-[#00332B] px-10 py-5 rounded-2xl text-sm font-black hover:bg-slate-50 transition-all">
                View Sample Explanation
              </button>
            </div>
          </div>
          
          <NeuralAnimation />
        </div>
      </section>

      {/* DETAILED PROBLEM SECTION */}
      <section className="bg-white py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black tracking-tighter leading-none mb-6">AIS Shows Reports.<br/><span className="text-[#F87171]">Not Reality.</span></h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg">
              The Annual Information Statement (AIS) pulls data from banks, brokers, and registers. But these reports are often flawed, outdated, or duplicated.
            </p>
            <div className="space-y-8">
              {[
                { 
                  title: 'Double Counting Errors', 
                  desc: 'A single share sale may be reported by both your broker and your depository, appearing twice in your income list.' 
                },
                { 
                  title: 'Timing & Accrual Gaps', 
                  desc: 'Fixed Deposit interest earned in March but credited in April often creates unexplainable year-on-year mismatches.' 
                },
                { 
                  title: 'Aggregate Reporting', 
                  desc: 'Authorities often lump 50 distinct transactions into one "Bulk Sale" entry, making individual verification impossible manually.' 
                },
                { 
                  title: 'Incorrect PAN Mapping', 
                  desc: 'Financial data belonging to others can appear in your AIS due to human error at the reporting entity level.' 
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-[#00332B] uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm font-medium text-slate-400 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="bg-[#F8FBFA] rounded-[3.5rem] p-12 border border-slate-100 shadow-sm transform rotate-2">
                <div className="space-y-6 opacity-30 grayscale blur-[1px]">
                   <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
                   <div className="h-16 bg-slate-200 rounded-2xl w-5/6"></div>
                   <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-white p-10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(248,113,113,0.3)] border-2 border-rose-100 transform -rotate-3 scale-110">
                      <div className="flex items-center space-x-2 mb-3">
                         <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                         <span className="text-[12px] font-black text-rose-500 uppercase tracking-[0.2em]">High Risk Mismatch</span>
                      </div>
                      <span className="text-4xl font-black text-[#00332B] tracking-tighter">₹5,00,000 GAP</span>
                      <p className="text-sm font-bold text-slate-500 mt-4 leading-relaxed">
                        AIS reports "Sale of Securities", but your <br/>ledger shows a "Folio Transfer".
                      </p>
                      <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                         <span className="text-[10px] font-black text-slate-300 uppercase">Audit Trail ID: 99x2</span>
                         <span className="text-[10px] font-black text-[#00332B] uppercase underline">Resolve with Clarity</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* NO REFUND POLICY SECTION */}
      <section className="bg-rose-50/30 py-20 border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] mb-4">Refund Policy Notice</h3>
          <h2 className="text-3xl font-black text-[#00332B] tracking-tight mb-6">Strict No-Refund Protocol</h2>
          <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-2xl mx-auto">
            AIS Clarity provides high-precision clinical analysis. Due to the immediate activation of neural processing and cloud compute resources upon purchase, <span className="text-rose-600">all sales are final. No refunds will be issued under any circumstances.</span> By initiating reconciliation, you agree to these terms.
          </p>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black tracking-tighter mb-6">A Financial Truth Engine</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto mb-20 leading-relaxed text-lg">
            We treat every AIS entry as a discrete reconciliation case. Not another tax tool, but a system of record for your financial truth.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'No Advice', desc: 'We only present truth based on provided evidence, never suggested tax positions.' },
              { title: 'No Assumptions', desc: 'If evidence is insufficient, the system explicitly states "Unexplained" to maintain integrity.' },
              { title: 'No Hallucinations', desc: 'Every explanation is generated using clinical, department-safe logic linked to your docs.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-50 shadow-sm text-left group hover:bg-[#00332B] transition-all duration-500">
                <div className="w-12 h-12 bg-[#E6F4F1] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00D18E] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#00D18E] group-hover:bg-white" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-white">{item.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed group-hover:text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#00332B] py-32 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black tracking-tighter mb-20 text-center">How the Protocol Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 relative">
            {[
              { n: '01', t: 'Upload AIS Data', d: 'Paste entries or upload the official JSON export from the portal.' },
              { n: '02', t: 'Submit Evidence', d: 'Upload bank statements, broker ledgers, and salary records.' },
              { n: '03', t: 'Link & Map', d: 'Explicitly link specific documents to individual AIS line items.' },
              { n: '04', t: 'Neural Analysis', d: 'AI analyzes mismatches and generates defensible explanations.' },
              { n: '05', t: 'Refine & Review', d: 'Professional review of generated drafts to ensure absolute clinical accuracy.' },
              { n: '06', t: 'Export Bundle', d: 'Download a cryptographically traceable audit bundle ready for scrutiny.' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <span className="text-8xl font-black text-white/5 absolute -top-10 -left-6 leading-none select-none">{step.n}</span>
                <div className="relative z-10">
                   <h3 className="text-xl font-black tracking-tight mb-4">{step.t}</h3>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#00332B] tracking-tighter mb-4">Improve the Clarity Engine</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Help us refine the reconciliation protocol</p>
          </div>
          
          <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-xl relative overflow-hidden">
            {feedbackSent ? (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-[#E6F4F1] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#00D18E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black text-[#00332B] tracking-tighter">Transmission Successful</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Audit ID: FB-{Math.floor(Math.random() * 90000)}</p>
              </div>
            ) : (
              <form onSubmit={handleFeedback} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Professional Identity</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-[#F8FBFA] border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-[#00332B] focus:outline-none focus:border-[#00D18E] transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Email for Correspondence</label>
                    <input type="email" placeholder="email@address.com" className="w-full bg-[#F8FBFA] border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-[#00332B] focus:outline-none focus:border-[#00D18E] transition-all" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Protocol Feedback</label>
                  <textarea rows={4} placeholder="Describe any technical anomalies or feature requirements..." className="w-full bg-[#F8FBFA] border border-slate-100 rounded-3xl px-6 py-6 text-sm font-bold text-[#00332B] focus:outline-none focus:border-[#00D18E] transition-all resize-none" required />
                </div>
                <button type="submit" className="w-full bg-[#00332B] text-white py-5 rounded-[2rem] text-xs font-black tracking-widest hover:bg-[#00D18E] transition-all shadow-xl hover:shadow-[#00D18E]/20">
                  SUBMIT FEEDBACK PROTOCOL
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-black tracking-tighter mb-20 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-[2rem] overflow-hidden transition-all">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-black tracking-tight">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-transform ${activeFaq === i ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                {activeFaq === i && (
                  <div className="px-8 py-6 bg-white animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center space-x-3 opacity-50">
             <div className="w-8 h-8 bg-[#00332B] rounded-lg flex items-center justify-center font-black text-white">C</div>
             <span className="text-sm font-black tracking-tighter uppercase">AIS Clarity</span>
           </div>
           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-tight text-center md:text-right">
              Product of Hyqee Ecommerce Pvt Ltd.<br/>Clarity before action. © 2024
           </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
