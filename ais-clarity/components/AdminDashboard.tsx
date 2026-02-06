
import React from 'react';
import { ClientRecord } from '../types';

interface AdminDashboardProps {
  clients: ClientRecord[];
  onSelectClient: (clientId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ clients, onSelectClient }) => {
  const totalRisks = clients.reduce((acc, c) => acc + c.riskCount, 0);
  const totalVerified = clients.reduce((acc, c) => acc + (c.verifiedCount / c.totalEntries || 0), 0) / (clients.length || 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-5xl font-black text-[#00332B] tracking-tighter">Firm Command</h2>
          <p className="text-sm text-slate-500 font-medium italic">Aggregate oversight of all client AIS reconciliation processes.</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl px-8 py-4 flex items-center space-x-10 shadow-sm">
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Clients</p>
             <p className="text-2xl font-black text-[#00332B]">{clients.length}</p>
           </div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Firm-wide Risks</p>
             <p className="text-2xl font-black text-rose-500">{totalRisks}</p>
           </div>
           <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Integrity</p>
             <p className="text-2xl font-black text-[#00D18E]">{Math.round(totalVerified * 100)}%</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Client Inventory</h3>
          <div className="flex space-x-2">
            <input type="text" placeholder="Search PAN or Name..." className="bg-slate-50 border-none rounded-xl px-6 py-2 text-[10px] font-bold focus:ring-1 ring-[#00D18E] outline-none w-64" />
            <button className="bg-[#00332B] text-white px-6 py-2 rounded-xl text-[10px] font-black tracking-widest">ADD CLIENT</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                <th className="px-10 py-6">Client Identity</th>
                <th className="px-10 py-6">PAN Profile</th>
                <th className="px-10 py-6">Reconciliation Health</th>
                <th className="px-10 py-6">Action Indicators</th>
                <th className="px-10 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id} className="border-b border-slate-50 last:border-0 hover:bg-[#F8FBFA]/50 transition-colors group">
                  <td className="px-10 py-8">
                    <h4 className="text-lg font-black text-[#00332B] tracking-tight">{client.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Activity: {client.lastActivity}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-black text-slate-600 font-mono tracking-widest">{client.pan}</span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                        <div className="h-full bg-[#00D18E]" style={{ width: `${(client.verifiedCount / client.totalEntries) * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-black text-[#00332B] uppercase tracking-widest">
                        {Math.round((client.verifiedCount / client.totalEntries) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${client.status === 'COMPLETED' ? 'bg-[#E6F4F1] text-[#00D18E]' : client.status === 'ACTION_REQUIRED' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                        {client.status.replace('_', ' ')}
                      </span>
                      {client.riskCount > 0 && (
                        <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                          {client.riskCount} RISKS
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button 
                      onClick={() => onSelectClient(client.id)}
                      className="bg-white border border-slate-200 text-[#00332B] px-6 py-2 rounded-xl text-[10px] font-black tracking-widest hover:bg-[#00332B] hover:text-white transition-all shadow-sm"
                    >
                      OPEN FILE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
