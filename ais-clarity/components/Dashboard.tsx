
import React from 'react';
import { AISEntry, ReconciliationStatus } from '../types';

interface DashboardProps {
  entries: AISEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ entries }) => {
  const verifiedCount = entries.filter(e => e.reconciliation?.status === ReconciliationStatus.VERIFIED).length;
  const pendingCount = entries.filter(e => !e.reconciliation).length;
  const riskCount = entries.filter(e => e.reconciliation?.status === ReconciliationStatus.RISK_FLAG).length;
  const explainableCount = entries.filter(e => e.reconciliation?.status === ReconciliationStatus.EXPLAINABLE).length;
  
  const verifiedPercentage = Math.round((verifiedCount / entries.length) * 100) || 0;
  
  // Circumference = 2 * PI * R (R=80, so ~502.6)
  const strokeDasharray = 502.6;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * verifiedPercentage) / 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
           <h2 className="text-4xl font-black text-[#00332B] tracking-tighter">Insight Ledger</h2>
           <p className="text-sm text-slate-500 font-medium">Your reconciled financial truth for FY 2023-24.</p>
        </div>
        <div className="flex space-x-3">
           <button className="bg-[#00332B] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">UPLOAD AIS / BANK EVIDENCE</button>
           <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">CONTINUE RECONCILIATION</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total AIS Entries', value: entries.length, color: 'text-[#00332B]' },
          { label: 'Verified Truth', value: verifiedCount, color: 'text-[#00D18E]', dot: true, dotColor: 'bg-[#00D18E]' },
          { label: 'Pending Insight', value: pendingCount, color: 'text-slate-400' },
          { label: 'Risk Indicators', value: riskCount, color: 'text-[#F87171]', dot: true, dotColor: 'bg-[#F87171]' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col justify-between min-h-[160px] hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</span>
               {card.dot && <div className={`w-2.5 h-2.5 rounded-full ${card.dotColor}`} />}
             </div>
             <span className={`text-6xl font-black tracking-tighter ${card.color}`}>{card.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Integrity State Chart */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col items-center justify-between min-h-[500px]">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-12 self-start">Integrity State</h3>
           
           <div className="relative w-56 h-56 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle cx="96" cy="96" r="80" stroke="#F1F5F9" strokeWidth="20" fill="transparent" />
                <circle 
                  cx="96" 
                  cy="96" 
                  r="80" 
                  stroke="#00D18E" 
                  strokeWidth="20" 
                  fill="transparent" 
                  strokeDasharray={strokeDasharray} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="flex flex-col items-center justify-center text-center z-10">
                 <span className="text-5xl font-black text-[#00332B] leading-none tracking-tighter">{verifiedPercentage}%</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Verified</span>
              </div>
           </div>

           <div className="mt-12 w-full space-y-4 px-2">
              {[
                { label: 'Verified', count: verifiedCount, color: 'bg-[#00D18E]' },
                { label: 'Explainable', count: explainableCount, color: 'bg-orange-400' },
                { label: 'Unexplained', count: pendingCount, color: 'bg-slate-400' },
                { label: 'Risk Flag', count: riskCount, color: 'bg-[#F87171]' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest">
                   <div className="flex items-center space-x-3">
                     <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                     <span className="text-slate-500">{item.label}</span>
                   </div>
                   <span className="text-[#00332B] font-black">{item.count}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Neural Reconciliation Log */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden flex flex-col">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Reconciliation Log</h3>
              <span className="bg-[#E6F4F1] text-[#00D18E] px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Real-time Feed</span>
           </div>
           
           <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
              {entries.map((entry, idx) => (
                <div key={entry.id} className="flex items-start space-x-6 group animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${idx * 100}ms` }}>
                   <div className={`w-3 h-3 rounded-full mt-2.5 flex-shrink-0 ${
                     entry.reconciliation?.status === ReconciliationStatus.VERIFIED ? 'bg-[#00D18E]' :
                     entry.reconciliation?.status === ReconciliationStatus.RISK_FLAG ? 'bg-[#F87171]' : 'bg-slate-200'
                   }`} />
                   <div className="flex-1 pb-8 border-b border-slate-50 last:border-0 group-hover:bg-slate-50/30 transition-colors rounded-xl px-2">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-xl font-black text-[#00332B] tracking-tight">{entry.description}</h4>
                         <span className="text-2xl font-black text-[#00332B] tracking-tighter">₹{entry.reportedAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium italic mb-3 leading-relaxed">
                        {entry.reconciliation?.explanation || "Pending neural reconciliation analysis..."}
                      </p>
                      <div className="flex items-center space-x-3">
                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{entry.financialYear}</span>
                         {entry.reconciliation && (
                           <>
                             <span className="w-1 h-1 rounded-full bg-slate-200" />
                             <span className="text-[10px] font-black text-[#00D18E] uppercase tracking-widest">Verified Evidence Linked</span>
                           </>
                         )}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
