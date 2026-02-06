
import React from 'react';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: { name: string; role: string };
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, currentUser, onLogout }) => {
  const isAdmin = currentUser.role === 'SUPER_ADMIN';

  const navItems = [
    { 
      category: 'Command', 
      visible: isAdmin,
      items: [
        { id: 'admin_dashboard', label: 'Command Center', icon: Icons.Dashboard },
      ]
    },
    { 
      category: 'Current File', 
      visible: true,
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
        { id: 'ledger', label: 'AIS Ledger', icon: Icons.Ledger },
        { id: 'evidence', label: 'Documents', icon: Icons.Vault },
        { id: 'reports', label: 'Truth Report', icon: Icons.Report },
      ]
    },
    { 
      category: 'System', 
      visible: true,
      items: [
        { id: 'support', label: 'Support Desk', icon: Icons.Ledger },
        { id: 'feedback', label: 'System Feedback', icon: Icons.Report },
      ]
    },
  ];

  return (
    <div className="flex h-screen bg-[#F8FBFA] overflow-hidden">
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col z-20">
        <div className="p-8 flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#00332B] rounded-lg flex items-center justify-center font-bold text-white shadow-sm">C</div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#00332B]">AIS Clarity</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto">
          {navItems.filter(g => g.visible).map((group) => (
            <div key={group.category}>
              <h3 className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{group.category}</h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id 
                      ? 'bg-[#00332B] text-white shadow-lg' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-[#00332B]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs font-bold tracking-wider">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="p-8 border-t border-slate-50">
          <button 
            onClick={onLogout}
            className="group flex items-center space-x-2 text-[10px] font-black text-[#00D18E] uppercase tracking-[0.2em] mb-4 hover:text-[#00332B] transition-all"
          >
            <span>Portal Out</span>
            <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
          <div className="mt-2">
             <p className="text-[8px] text-slate-400 font-bold uppercase leading-tight">
               Enterprise Grade<br/>Compliance System
             </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 flex items-center justify-between px-10 z-10 border-b border-slate-50 bg-white/50 backdrop-blur-md">
          <div className="flex items-center space-x-4">
             <div className="bg-[#E6F4F1] text-[#00D18E] px-4 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-[#00D18E]/20">
               Session FY 2023-24
             </div>
             {isAdmin && activeTab !== 'admin_dashboard' && (
               <button onClick={() => setActiveTab('admin_dashboard')} className="text-[9px] font-black text-[#00332B] uppercase tracking-widest border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                 ← Back to Command Center
               </button>
             )}
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-right text-right">
                <span className="text-xs font-black text-[#00332B] tracking-tight">{currentUser.name}</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{currentUser.role.replace('_', ' ')}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-black text-[#00332B] border-2 border-slate-50 shadow-inner">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-100" />
            
            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-colors"
              title="Logout from portal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-10 pb-10 pt-10 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
