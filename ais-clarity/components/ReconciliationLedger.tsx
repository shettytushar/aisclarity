
import React from 'react';
import { AISEntry, ReconciliationStatus } from '../types';

interface LedgerProps {
  entries: AISEntry[];
  onAnalyze: (entryId: string) => void;
  isAnalyzing: string | null;
}

const ReconciliationLedger: React.FC<LedgerProps> = ({ entries, onAnalyze, isAnalyzing }) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden p-6">
      <div className="flex justify-between items-center mb-10 px-6">
        <div className="flex space-x-3">
          {['ALL ENTRIES', 'VERIFIED', 'EXPLAINABLE', 'UNEXPLAINED', 'RISK FLAG'].map((tab, i) => (
            <button key={tab} className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
              i === 0 ? 'bg-[#00332B] text-white' : 'bg-white border border-slate-100 text-slate-400 hover:text-slate-600'
            }`}>
              {tab}
            </button>
          ))}
        </div>
        <button className="bg-[#00332B] text-white px-8 py-2.5 rounded-xl text-[10px] font-black tracking-widest">FINAL TRUTH REPORT</button>
      </div>

      <div className="grid grid-cols-12 px-10 mb-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
        <div className="col-span-4">Entry Descriptor</div>
        <div className="col-span-2 text-center">Reported Amount</div>
        <div className="col-span-2 text-center">Evidence Mapping</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="grid grid-cols-12 items-center px-10 py-8 bg-[#F8FBFA]/50 rounded-[2rem] border border-slate-50 hover:bg-[#F8FBFA] transition-all group">
            <div className="col-span-4">
               <h4 className="text-xl font-black text-[#00332B] tracking-tight">{entry.description}</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{entry.section} • 2024-03-31</p>
            </div>
            
            <div className="col-span-2 text-center">
               <span className="text-2xl font-black text-[#00332B] tracking-tighter">₹{entry.reportedAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="col-span-2 text-center">
               {entry.reconciliation ? (
                 <span className="bg-[#E6F4F1] text-[#00D18E] px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest">
                   LINKED <span className="opacity-50">({entry.reconciliation.evidenceIds.length})</span>
                 </span>
               ) : (
                 <span className="bg-rose-50 text-rose-400 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest">MISSING EVIDENCE</span>
               )}
            </div>

            <div className="col-span-2 text-center">
               <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold tracking-widest uppercase ${
                 entry.reconciliation?.status === ReconciliationStatus.VERIFIED ? 'bg-[#E6F4F1] text-[#00D18E]' : 
                 entry.reconciliation?.status === ReconciliationStatus.RISK_FLAG ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'
               }`}>
                 {entry.reconciliation?.status || 'PENDING'}
               </span>
            </div>

            <div className="col-span-2 text-right">
               <button 
                 onClick={() => onAnalyze(entry.id)}
                 disabled={!!isAnalyzing}
                 className="bg-white border border-slate-100 text-[#00332B] px-6 py-2 rounded-xl text-[10px] font-black tracking-widest hover:bg-[#00332B] hover:text-white transition-all shadow-sm"
               >
                 {isAnalyzing === entry.id ? 'ANALYZING' : 'RESOLVE'}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReconciliationLedger;
