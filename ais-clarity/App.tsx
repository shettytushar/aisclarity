
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ReconciliationLedger from './components/ReconciliationLedger';
import EvidenceVault from './components/EvidenceVault';
import InsightReport from './components/InsightReport';
import FeedbackForm from './components/FeedbackForm';
import LandingPage from './components/LandingPage';
import SupportDesk from './components/SupportDesk';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';
import { AISEntry, AISSection, Evidence, ReconciliationStatus, UserRole, SupportTicket, SupportMessage, ClientRecord } from './types';
import { analyzeEntry } from './services/geminiService';

type AppScreen = 'LANDING' | 'AUTH' | 'APP';

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: 'CL-001',
    name: 'John Smith',
    pan: 'ABCPS1234F',
    status: 'ACTION_REQUIRED',
    lastActivity: '2 hours ago',
    riskCount: 1,
    verifiedCount: 1,
    totalEntries: 3,
    entries: [
      {
        id: 'AIS-001',
        section: AISSection.SFT,
        description: 'Income from Salary',
        reportedAmount: 1250000,
        reportingEntity: 'TechCorp Solutions India',
        financialYear: '2023-24',
        auditTrail: [{ id: 'EV-1', timestamp: new Date().toISOString(), action: 'Entry Ingested', user: 'System', details: 'Imported' }]
      },
      {
        id: 'AIS-002',
        section: AISSection.SFT,
        description: 'Dividend Income',
        reportedAmount: 15200,
        reportingEntity: 'HDFC Bank Ltd',
        financialYear: '2023-24',
        reconciliation: {
          status: ReconciliationStatus.VERIFIED,
          explanation: "Amount matches credit entry in Savings Account xxxx1234 on 16-Sep-2023.",
          evidenceIds: ['EVID-002'],
          confidenceScore: 0.98,
          timestamp: new Date().toISOString()
        },
        auditTrail: [{ id: 'EV-2', timestamp: new Date().toISOString(), action: 'Verified', user: 'AI Engine', details: 'Automated match' }]
      },
      {
        id: 'AIS-003',
        section: AISSection.SFT,
        description: 'Purchase of Mutual Funds',
        reportedAmount: 500000,
        reportingEntity: 'Zerodha Broking Ltd',
        financialYear: '2023-24',
        reconciliation: {
          status: ReconciliationStatus.RISK_FLAG,
          explanation: "AIS reports 5,00,000 but bank records only show 50,000 withdrawal for this folio.",
          evidenceIds: ['EVID-003'],
          confidenceScore: 0.85,
          timestamp: new Date().toISOString()
        },
        auditTrail: [{ id: 'EV-3', timestamp: new Date().toISOString(), action: 'Flagged', user: 'AI Engine', details: 'Mismatch detected' }]
      }
    ]
  },
  {
    id: 'CL-002',
    name: 'Priya Sharma',
    pan: 'BVXPM9910H',
    status: 'IN_PROGRESS',
    lastActivity: 'Yesterday',
    riskCount: 0,
    verifiedCount: 5,
    totalEntries: 12,
    entries: [] // Simplified for demo
  }
];

const DUMMY_EVIDENCE: Evidence[] = [
  { id: 'EVID-001', name: 'SalarySlip_March24.png', type: 'image/png', size: 450000, uploadDate: new Date().toISOString() },
  { id: 'EVID-002', name: 'HDFC_Statement_Sep_2023.pdf', type: 'application/pdf', size: 1200000, uploadDate: new Date().toISOString(), content: "Extracted dividend credit of 15200 on 16/09/23." },
  { id: 'EVID-003', name: 'Zerodha_Ledger_Q3.pdf', type: 'application/pdf', size: 2400000, uploadDate: new Date().toISOString(), content: "Identified buy order for 50000; AIS reports 500000." }
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('LANDING');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<{ name: string; role: UserRole } | null>(null);
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [evidences, setEvidences] = useState<Evidence[]>(DUMMY_EVIDENCE);
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);

  // Computed: current client the view is focusing on
  const activeClient = useMemo(() => {
    if (user?.role === 'CLIENT') return clients[0]; // Self-portal
    return clients.find(c => c.id === selectedClientId) || null;
  }, [user, clients, selectedClientId]);

  const handleLogin = (authenticatedUser: { name: string; role: UserRole }) => {
    setUser(authenticatedUser);
    setCurrentScreen('APP');
    // If admin, start at command center. If client, start at dashboard.
    setActiveTab(authenticatedUser.role === 'SUPER_ADMIN' ? 'admin_dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('LANDING');
    setSelectedClientId(null);
  };

  const handleAnalyze = async (entryId: string) => {
    if (!activeClient) return;
    setIsAnalyzing(entryId);
    try {
      const entry = activeClient.entries.find(e => e.id === entryId);
      if (!entry) return;
      const result = await analyzeEntry(entry, evidences);
      
      setClients(prev => prev.map(c => c.id === activeClient.id ? {
        ...c,
        entries: c.entries.map(e => e.id === entryId ? {
          ...e,
          reconciliation: {
            status: result.status as ReconciliationStatus,
            explanation: result.explanation,
            evidenceIds: result.evidenceIds || [evidences[0].id],
            confidenceScore: result.confidenceScore,
            timestamp: new Date().toISOString()
          }
        } : e)
      } : c));
    } catch (error) {
      console.error("AI Analysis failed", error);
    } finally {
      setIsAnalyzing(null);
    }
  };

  if (currentScreen === 'LANDING') return <LandingPage onStart={() => setCurrentScreen('AUTH')} />;
  if (currentScreen === 'AUTH') return <AuthPage onLogin={handleLogin} onBack={() => setCurrentScreen('LANDING')} />;

  if (currentScreen === 'APP' && user) {
    return (
      <div className="animate-in fade-in duration-700">
        <Layout 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          currentUser={user}
          onLogout={handleLogout}
        >
          {/* Super Admin specific view */}
          {activeTab === 'admin_dashboard' && (
            <AdminDashboard 
              clients={clients} 
              onSelectClient={(id) => {
                setSelectedClientId(id);
                setActiveTab('dashboard');
              }} 
            />
          )}

          {/* Contextual Views (Based on activeClient) */}
          {!activeClient && activeTab !== 'admin_dashboard' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
              <p className="text-xl font-black uppercase tracking-[0.2em] mb-4">No Client Active</p>
              <button onClick={() => setActiveTab('admin_dashboard')} className="bg-[#00332B] text-white px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest">RETURN TO COMMAND CENTER</button>
            </div>
          )}

          {activeClient && (
            <>
              {activeTab === 'dashboard' && <Dashboard entries={activeClient.entries} />}
              {activeTab === 'ledger' && <ReconciliationLedger entries={activeClient.entries} onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />}
              {activeTab === 'evidence' && <EvidenceVault evidences={evidences} onUpload={(f) => {}} />}
              {activeTab === 'reports' && <InsightReport entries={activeClient.entries} />}
            </>
          )}

          {activeTab === 'feedback' && <FeedbackForm />}
          {activeTab === 'support' && (
            <SupportDesk 
              tickets={[]} 
              userRole={user.role === 'SUPER_ADMIN' ? 'CLIENT' : 'CLIENT'} 
              userName={user.name}
              onSendMessage={() => {}}
              onNewTicket={() => {}}
            />
          )}
        </Layout>
      </div>
    );
  }

  return null;
};

export default App;
