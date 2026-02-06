
import React, { useState } from 'react';
import { SupportTicket, UserRole, SupportMessage } from '../types';

interface SupportDeskProps {
  tickets: SupportTicket[];
  userRole: UserRole;
  userName: string;
  onSendMessage: (ticketId: string, content: string) => void;
  onNewTicket: (subject: string, content: string) => void;
}

const SupportDesk: React.FC<SupportDeskProps> = ({ tickets, userRole, userName, onSendMessage, onNewTicket }) => {
  const [activeTicketId, setActiveTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [replyContent, setReplyContent] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  const handleSend = () => {
    if (!activeTicketId || !replyContent.trim()) return;
    onSendMessage(activeTicketId, replyContent);
    setReplyContent('');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onNewTicket(newSubject, newContent);
    setNewSubject('');
    setNewContent('');
    setShowNewModal(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-5xl font-black text-[#00332B] tracking-tighter">Support Desk</h2>
          <p className="text-sm text-slate-500 font-medium italic">Audit-safe correspondence between compliance professionals and clients.</p>
        </div>
        {userRole === 'CLIENT' && (
          <button 
            onClick={() => setShowNewModal(true)}
            className="bg-[#00332B] text-white px-8 py-3 rounded-2xl text-xs font-black tracking-widest shadow-xl hover:scale-105 transition-all"
          >
            NEW CLARIFICATION REQUEST
          </button>
        )}
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Ticket List */}
        <div className="w-80 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {tickets.map(ticket => (
            <button
              key={ticket.id}
              onClick={() => setActiveTicketId(ticket.id)}
              className={`text-left p-6 rounded-[2rem] border transition-all ${
                activeTicketId === ticket.id 
                ? 'bg-[#00332B] border-[#00332B] shadow-xl translate-x-2' 
                : 'bg-white border-slate-50 hover:border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                  activeTicketId === ticket.id ? 'bg-[#00D18E] text-[#00332B]' : 'bg-slate-100 text-slate-400'
                }`}>
                  {ticket.status}
                </span>
                <span className={`text-[8px] font-black uppercase tracking-widest ${activeTicketId === ticket.id ? 'text-white/40' : 'text-slate-300'}`}>
                  {ticket.id}
                </span>
              </div>
              <h4 className={`text-sm font-black tracking-tight mb-1 truncate ${activeTicketId === ticket.id ? 'text-white' : 'text-[#00332B]'}`}>
                {ticket.subject}
              </h4>
              <p className={`text-[10px] font-medium truncate ${activeTicketId === ticket.id ? 'text-white/60' : 'text-slate-400'}`}>
                {ticket.messages[ticket.messages.length - 1]?.content}
              </p>
            </button>
          ))}
        </div>

        {/* Message View */}
        <div className="flex-1 bg-white rounded-[3.5rem] border border-slate-50 shadow-sm flex flex-col overflow-hidden relative">
          {activeTicket ? (
            <>
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h3 className="text-2xl font-black text-[#00332B] tracking-tight">{activeTicket.subject}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    Traceable Correspondence Log • Linked to Entry {activeTicket.linkedEntryId || 'N/A'}
                  </p>
                </div>
                {userRole === 'CA_ADMIN' && activeTicket.status !== 'RESOLVED' && (
                  <button className="text-[10px] font-black text-[#00D18E] uppercase tracking-widest hover:opacity-80">Mark as Resolved</button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                {activeTicket.messages.map((msg, i) => (
                  <div key={msg.id} className={`flex flex-col ${msg.senderRole === userRole ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-500`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{msg.timestamp}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${msg.senderRole === 'CA_ADMIN' ? 'text-[#00D18E]' : 'text-[#00332B]'}`}>
                        {msg.senderName} ({msg.senderRole === 'CA_ADMIN' ? 'CA' : 'CLIENT'})
                      </span>
                    </div>
                    <div className={`max-w-[70%] p-6 rounded-[2rem] text-sm font-medium leading-relaxed ${
                      msg.senderRole === userRole 
                      ? 'bg-[#00332B] text-white rounded-tr-none' 
                      : 'bg-[#F8FBFA] text-[#00332B] rounded-tl-none border border-slate-100'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 border-t border-slate-50 bg-[#F8FBFA]/50">
                <div className="relative">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`Compose professional ${userRole === 'CA_ADMIN' ? 'response' : 'clarification'}...`}
                    className="w-full bg-white border-2 border-slate-100 rounded-3xl p-6 pr-32 text-sm font-medium focus:outline-none focus:border-[#00D18E] transition-all resize-none shadow-inner"
                    rows={3}
                  />
                  <button
                    onClick={handleSend}
                    className="absolute right-4 bottom-4 bg-[#00332B] text-white px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest shadow-xl hover:bg-[#00D18E] transition-all"
                  >
                    SEND LOG
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
               <svg className="w-20 h-20 mb-6 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Select Correspondence Thread</span>
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-[#00332B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl p-12 animate-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-10">
              <h3 className="text-3xl font-black text-[#00332B] tracking-tighter">New Clarification Request</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-300 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Subject</label>
                <input 
                  type="text" 
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Mismatch in Dividends" 
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-[#00D18E] transition-all" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail Explanation</label>
                <textarea 
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide context regarding the specific entry or evidence gap..." 
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-3xl px-6 py-6 text-sm font-bold focus:outline-none focus:border-[#00D18E] transition-all resize-none" 
                  required 
                />
              </div>
              <button type="submit" className="w-full bg-[#00332B] text-white py-5 rounded-[2rem] text-xs font-black tracking-widest shadow-xl hover:bg-[#00D18E] transition-all">
                INITIATE AUDIT REQUEST
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportDesk;
