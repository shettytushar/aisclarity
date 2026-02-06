
import React, { useRef } from 'react';
import { Evidence } from '../types';

interface EvidenceVaultProps {
  evidences: Evidence[];
  onUpload: (file: File) => void;
}

const EvidenceVault: React.FC<EvidenceVaultProps> = ({ evidences, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end mb-12">
        <div>
           <h2 className="text-5xl font-black text-[#00332B] tracking-tighter">Document Vault</h2>
           <p className="text-sm text-slate-500 font-medium">Cryptographically secured evidence linked to your AIS ledger.</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#00332B] text-white px-8 py-4 rounded-2xl text-xs font-bold shadow-lg hover:shadow-xl transition-all"
        >
          UPLOAD NEW EVIDENCE
        </button>
        <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {evidences.map((doc) => (
          <div key={doc.id} className="bg-white p-12 rounded-[3.5rem] border border-slate-50 shadow-sm relative group hover:shadow-xl transition-all">
             <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                   <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                  doc.id === 'EVID-003' ? 'bg-orange-50 text-orange-400' : 'bg-[#E6F4F1] text-[#00D18E]'
                }`}>
                  {doc.id === 'EVID-003' ? 'PENDING LINKAGE' : 'FULLY MAPPED'}
                </span>
             </div>

             <h4 className="text-2xl font-black text-[#00332B] tracking-tight mb-2 truncate">{doc.name}</h4>
             <p className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest mb-10">
               {doc.type.split('/')[1].toUpperCase()} • 5/10/2024
             </p>

             <div className="mb-10">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-4">Supported AIS Entries</span>
                <div className="flex flex-wrap gap-2">
                   {doc.id !== 'EVID-003' ? (
                     <span className="bg-[#00332B] text-white px-3 py-1 rounded text-[10px] font-bold">AIS-00{doc.id.slice(-1)}</span>
                   ) : (
                     <span className="text-slate-300 text-[10px] font-bold italic">Unlinked...</span>
                   )}
                </div>
             </div>

             {doc.content && (
                <div className="bg-[#F8FBFA] p-6 rounded-2xl border border-slate-100 mb-10">
                   <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#00D18E]" />
                      <span className="text-[9px] font-black text-[#00332B] uppercase tracking-widest">AI Analysis Snippet</span>
                   </div>
                   <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic truncate">
                     "{doc.content}"
                   </p>
                </div>
             )}

             <div className="flex gap-4">
                <button className="flex-1 bg-white border border-slate-100 text-slate-600 py-3 rounded-2xl text-[10px] font-black tracking-widest hover:bg-slate-50">RELINK ENTRY</button>
                <button className="flex-1 bg-rose-50 text-rose-400 py-3 rounded-2xl text-[10px] font-black tracking-widest hover:bg-rose-100">DELETE</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvidenceVault;
