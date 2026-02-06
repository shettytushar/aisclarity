
import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ['Bugs & Errors', 'Feature Request', 'Data Accuracy', 'UI/UX Feedback', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#E6F4F1] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <svg className="w-12 h-12 text-[#00D18E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-[#00332B] tracking-tighter mb-4">Submission Received</h2>
        <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
          Your insights are critical to maintaining the clinical accuracy of the AIS Clarity protocol. 
          Our engineering team will review this report shortly.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setRating(0); setCategory(''); setComments(''); }}
          className="bg-[#00332B] text-white px-10 py-4 rounded-2xl text-xs font-black tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          SUBMIT ANOTHER REPORT
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="text-5xl font-black text-[#00332B] tracking-tighter mb-2">Improve the Protocol</h2>
        <p className="text-sm text-slate-500 font-medium">AIS Clarity evolves through professional feedback. Report anomalies or suggest structural improvements.</p>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-50 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Rating */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-6">Overall Tool Precision</label>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-xl font-black transition-all ${
                    rating >= num 
                    ? 'bg-[#00D18E] border-[#00D18E] text-white shadow-lg' 
                    : 'border-slate-50 bg-slate-50/50 text-slate-300 hover:border-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Feedback Category</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border-2 text-center ${
                    category === cat 
                    ? 'bg-[#00332B] border-[#00332B] text-white shadow-md' 
                    : 'bg-white border-slate-50 text-slate-400 hover:border-slate-100 hover:text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Clinical Observations</label>
            <textarea
              required
              rows={5}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide specific details about mismatches, UI glitches, or required evidence linking features..."
              className="w-full bg-[#F8FBFA] border-2 border-slate-50 rounded-3xl p-6 text-sm font-medium text-[#00332B] placeholder:text-slate-300 focus:outline-none focus:border-[#00D18E]/30 transition-all resize-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || rating === 0 || !category}
              className={`w-full py-5 rounded-[2rem] text-sm font-black tracking-widest shadow-2xl transition-all flex items-center justify-center space-x-3 ${
                loading || rating === 0 || !category 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-[#00332B] text-white hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <span>SUBMIT FEEDBACK PROTOCOL</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <p className="text-center mt-10 text-[10px] font-black text-slate-300 uppercase tracking-widest">
        Traceable Audit ID: FB-{Math.floor(Math.random() * 900000 + 100000)}
      </p>
    </div>
  );
};

export default FeedbackForm;
