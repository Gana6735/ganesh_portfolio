"use client";

export default function ContactForm() {
  const recruiterEmail = "ganeshzambare26@gmail.com";
  const defaultMessage = "Hi Ganesh,\n\nI came across your portfolio and I am very impressed with your work as the Founder of EDGE GEN and your expertise in GenAI.\n\nI am a recruiter/founder and I am excited to connect with you regarding a potential collaboration. Let's find some time to chat!\n\nBest,\n[Your Name]";

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = `${formData.get('message')}`;
    window.location.href = `mailto:${recruiterEmail}?subject=Excited to Connect - Portfolio Inquiry&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 max-w-lg mx-auto w-full">
      <textarea 
        name="message" 
        defaultValue={defaultMessage}
        required
        className="w-full bg-industrial-800/50 border border-white/20 p-4 h-64 focus:border-industrial-cyan outline-none text-white transition-colors placeholder:text-white/30 tracking-wide resize-none rounded-xl font-mono text-sm" 
      />
      <button 
        type="submit"
        className="w-full py-4 bg-industrial-cyan text-black font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,243,255,0.3)]"
      >
        Initialize Connection
      </button>
    </form>
  );
}
