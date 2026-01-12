
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Trash2, X, Terminal, Activity, Bot } from 'lucide-react';
import { getRonAIResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import { Language, TRANSLATIONS } from '../constants';

interface ChatbotProps {
  lang: Language;
}

const NeuralSphere = ({ isTyping }: { isTyping: boolean }) => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <div className={`absolute inset-0 rounded-full bg-blue-600 blur-md transition-all duration-1000 ${isTyping ? 'scale-150 opacity-60 animate-pulse' : 'scale-100 opacity-40'}`}></div>
    <div className="relative z-10 w-12 h-12 rounded-full border border-white/20 overflow-hidden flex items-center justify-center bg-[#020617] group-hover:scale-110 transition-transform duration-500">
        <Activity className={`w-6 h-6 text-blue-400 transition-all ${isTyping ? 'animate-bounce' : ''}`} />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-emerald-500/20 animate-spin-slow"></div>
    </div>
    <div className={`absolute -inset-2 border border-blue-500/20 rounded-full animate-spin-slow ${isTyping ? '[animation-duration:1s]' : ''}`}></div>
  </div>
);

const Chatbot: React.FC<ChatbotProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].charlie;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.initial, timestamp: new Date() }]);
    const handleOpen = () => setIsMinimized(false);
    window.addEventListener('open-charlie', handleOpen);
    return () => window.removeEventListener('open-charlie', handleOpen);
  }, [lang, t.initial]);

  useEffect(() => {
    if (!isMinimized) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isMinimized]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', content: textToSend, timestamp: new Date() }]);
    if (!textOverride) setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const responseText = await getRonAIResponse(history, textToSend, lang);

    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: responseText, timestamp: new Date() }]);
  };

  const isRtl = lang === 'he';

  return (
    <div className={`fixed ${isRtl ? 'left-6 md:left-12' : 'right-6 md:right-12'} bottom-8 z-[1000] flex flex-col items-end pointer-events-none`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* HUD Chat Window */}
      <div className={`hologram-card rounded-[2rem] shadow-2xl flex flex-col h-[70vh] w-[90vw] sm:w-[450px] transition-all duration-700 origin-bottom-${isRtl ? 'left' : 'right'} mb-6 pointer-events-auto border-none ${
        isMinimized ? 'opacity-0 scale-90 translate-y-20 hidden' : 'opacity-100 scale-100 translate-y-0'
      }`}>
        {/* Header HUD */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-blue-600/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-blue-500/50 flex items-center justify-center relative overflow-hidden bg-slate-900">
                <Bot className="w-5 h-5 text-blue-500" />
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm tracking-tight">{t.title}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-widest">System Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1">
            <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Console Output */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-950/80">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed transition-all ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-lg' 
                    : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none'
                }`}>
                    <div className="flex items-center gap-2 mb-1.5 opacity-60 text-[9px] uppercase font-bold tracking-wider font-mono">
                        {msg.role === 'user' ? <User className="w-2.5 h-2.5" /> : <Terminal className="w-2.5 h-2.5" />}
                        <span>{msg.role} // {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="font-sans font-medium">
                      {msg.content}
                    </div>
                </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-bl-none flex gap-2 items-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Command Input Area */}
        <div className="p-4 bg-slate-900 border-t border-white/10">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-2xl p-2 pr-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-grow bg-transparent border-none py-3 px-4 focus:outline-none focus:ring-0 text-sm text-white placeholder:text-slate-600 font-sans"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all active:scale-95 disabled:opacity-30 disabled:hover:bg-blue-600 shadow-lg shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Toggle */}
      <div 
        onClick={() => setIsMinimized(!isMinimized)}
        className={`pointer-events-auto cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 ${isMinimized ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      >
        <NeuralSphere isTyping={isTyping} />
      </div>
    </div>
  );
};

export default Chatbot;
