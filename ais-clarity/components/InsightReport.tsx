
import React from 'react';
import { AISEntry, ReconciliationStatus } from '../types';

interface InsightReportProps {
  entries: AISEntry[];
}

const InsightReport: React.FC<InsightReportProps> = ({ entries }) => {
  const verifiedEntries = entries.filter(e => e.reconciliation);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
           <h2 className="text-5xl font-black text-[#00332B] tracking-tighter">Truth Ledger</h2>
           <p className="text-sm text-slate-500 font-medium">Final reconciled findings for audit and verification purposes.</p>
        </div>
        <div className="flex space-x-3">
           <button className="bg-[#00332B] text-white px-8 py-3 rounded-2xl text-xs font-bold shadow-lg hover:shadow-xl transition-all">EXPORT AUDIT BUNDLE</button>
           <button className="bg-white border border-slate-200 text-slate-600 px-8 py-3 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all">DOWNLOAD PDF REPORT</button>
        </div>
      </div>

      {/* Aggregate Certificate */}
      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-50 shadow-sm flex items-center justify-between mb-16">
         <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-[#00332B] rounded-2xl flex items-center justify-center text-2xl font-black text-[#00D18E]">C</div>
            <div>
               <h3 className="text-2xl font-black text-[#00332B] tracking-tight">Audit Confidence Certificate</h3>
               <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">FY 2023-24 • INTERNAL PROTOCOL RELEASE 2.4</p>
            </div>
         </div>
         <div className="text-right">
            <span className="text-6xl font-black text-[#00D18E] block tracking-tighter">98.2%</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate Confidence</span>
         </div>
      </div>

      {/* Reconciled Items */}
      <div className="space-y-12">
        {verifiedEntries.map(entry => (
          <div key={entry.id} className="relative bg-white p-12 rounded-[3.5rem] border border-slate-50 shadow-sm">
             <div className="flex justify-between items-start mb-10">
                <div>
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-2">ENTRY REF: {entry.id}</span>
                   <h4 className="text-4xl font-black text-[#00332B] tracking-tighter">{entry.description}</h4>
                   <span className="text-xs font-bold text-slate-400 tracking-tight">Authority: {entry.reportingEntity}</span>
                </div>
                <div className="text-right">
                   <span className="text-4xl font-black text-[#00332B] block tracking-tighter">₹{entry.reportedAmount.toLocaleString('en-IN')}</span>
                   <span className={`inline-block px-4 py-1.5 rounded-full text-[8px] font-extrabold tracking-widest uppercase mt-4 ${
                     entry.reconciliation?.status === ReconciliationStatus.VERIFIED ? 'bg-[#E6F4F1] text-[#00D18E]' : 'bg-rose-50 text-rose-500'
                   }`}>
                     RECONCILIATION {entry.reconciliation?.status}
                   </span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-[#F8FBFA] p-10 rounded-3xl border border-slate-100">
                   <div className="flex items-center space-x-3 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#00D18E]" />
                      <span className="text-[10px] font-black text-[#00332B] uppercase tracking-widest">Definitive Explanation</span>
                   </div>
                   <p className="text-sm font-bold text-[#00332B]/80 italic leading-relaxed">
                     "{entry.reconciliation?.explanation}"
                   </p>
                </div>

                <div className="bg-white p-10 rounded-3xl border border-slate-100">
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-4">Referenced Evidence</span>
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                         <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div>
                         <p className="text-xs font-black text-[#00332B] tracking-tight truncate max-w-[200px]">
                           {entry.reconciliation?.evidenceIds[0]}.pdf
                         </p>
                         <p className="text-[8px] font-extrabold text-slate-300 uppercase tracking-widest">Hashed Integrity Verified</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightReport;
