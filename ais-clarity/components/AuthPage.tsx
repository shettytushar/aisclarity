
import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthPageProps {
  onLogin: (user: { name: string; role: UserRole }) => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [role, setRole] = useState<UserRole>('CLIENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const defaultName = role === 'SUPER_ADMIN' ? 'Firm Master' : 'Compliance User';
      onLogin({ name: defaultName, role });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FBFA] flex items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D18E]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00332B]/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-xl relative z-10">
        <div className="text-center mb-10">
          <button onClick={onBack} className="group flex items-center space-x-2 mx-auto mb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#00332B] transition-colors">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            <span>Back to Home</span>
          </button>
          
          <div className="w-16 h-16 bg-[#00332B] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-2xl font-black text-[#00D18E]">C</span>
          </div>
          <h1 className="text-4xl font-black text-[#00332B] tracking-tighter mb-2">AIS Clarity</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Financial Truth Portal</p>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl p-10 md:p-14">
          <div className="grid grid-cols-2 gap-4 mb-10">
            <button
              type="button"
              onClick={() => setRole('CLIENT')}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${role === 'CLIENT' ? 'border-[#00D18E] bg-[#E6F4F1]/30' : 'border-slate-100 bg-white grayscale'}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full mb-3 ${role === 'CLIENT' ? 'bg-[#00D18E]' : 'bg-slate-300'}`} />
              <span className="block text-[10px] font-black text-[#00332B] uppercase tracking-widest">Client Portal</span>
              <span className="text-[9px] font-medium text-slate-400">Taxpayers & CAs</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('SUPER_ADMIN')}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${role === 'SUPER_ADMIN' ? 'border-[#00332B] bg-slate-50' : 'border-slate-100 bg-white grayscale'}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full mb-3 ${role === 'SUPER_ADMIN' ? 'bg-[#00332B]' : 'bg-slate-300'}`} />
              <span className="block text-[10px] font-black text-[#00332B] uppercase tracking-widest">Firm Admin</span>
              <span className="text-[9px] font-medium text-slate-400">Master Control</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Secure Identifier (Email)</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@clarity.ai" 
                className="w-full bg-slate-100 border-2 border-slate-100 rounded-2xl px-6 py-5 text-sm font-bold text-[#00332B] placeholder:text-slate-400 focus:outline-none focus:border-[#00D18E] focus:bg-white transition-all" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Access Key (Password)</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-100 border-2 border-slate-100 rounded-2xl px-6 py-5 text-sm font-bold text-[#00332B] placeholder:text-slate-400 focus:outline-none focus:border-[#00D18E] focus:bg-white transition-all" 
                required 
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                <span className="text-[#00D18E]">Login Hint:</span> For demo, choose a role and enter any credentials.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#00332B] text-white py-6 rounded-[2rem] text-xs font-black tracking-widest shadow-2xl hover:bg-[#00D18E] transition-all flex items-center justify-center space-x-3 mt-4"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Access Portal</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
