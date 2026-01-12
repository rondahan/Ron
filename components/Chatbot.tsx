
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Trash2, X, Terminal, Activity, Bot, Zap } from 'lucide-react';
import { getRonAIResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import { Language, TRANSLATIONS } from '../constants';

interface ChatbotProps {
  lang: Language;
}

// Helper to detect if content is primarily Hebrew/RTL
const isRTLText = (text: string) => {
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(text);
};

const NeuralSphere = ({ isTyping, size = "large" }: { isTyping: boolean, size?: "small" | "large" }) => {
  const isSmall = size === "small";
  const containerSize = isSmall ? "w-10 h-10" : "w-20 h-20";
  const innerSize = isSmall ? "w-8 h-8" : "w-14 h-14";
  const iconSize = isSmall ? "w-4 h-4" : "w-7 h-7";

  return (
    <div className={`relative ${containerSize} flex items-center justify-center group`}>
      {/* Outer Glow / Atmosphere */}
      <div className={`absolute inset-0 rounded-full bg-blue-500 blur-xl transition-all duration-1000 ${
        isTyping ? 'scale-125 opacity-40 animate-pulse' : 'scale-100 opacity-20'
      }`}></div>
      
      {/* Dynamic Rings */}
      <div className={`absolute inset-0 border border-blue-500/30 rounded-full animate-spin-slow ${isTyping ? '[animation-duration:3s]' : '[animation-duration:8s]'}`}></div>
      <div className={`absolute -inset-1 border border-emerald-500/20 rounded-full animate-spin-slow ${isTyping ? '[animation-duration:2s]' : '[animation-duration:12s]'} direction-reverse`}></div>

      {/* Main Core */}
      <div className={`relative z-10 ${innerSize} rounded-full border border-white/20 overflow-hidden flex items-center justify-center bg-slate-950 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
        {/* Animated Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-emerald-500/30 animate-pulse ${isTyping ? 'opacity-100' : 'opacity-50'}`}></div>
        
        {/* Floating Particles SVG Effect */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="1" fill="white" className={`animate-ping ${isTyping ? 'duration-700' : 'duration-[3000ms]'}`} />
          <circle cx="80" cy="30" r="1.5" fill="white" className={`animate-pulse ${isTyping ? 'duration-500' : 'duration-[4000ms]'}`} />
          <circle cx="40" cy="70" r="1" fill="white" className={`animate-bounce ${isTyping ? 'duration-1000' : 'duration-[5000ms]'}`} />
        </svg>

        {/* Central Intelligence Icon */}
        <div className="relative z-20">
          {isTyping ? (
            <Zap className={`${iconSize} text-blue-400 animate-pulse`} />
          ) : (
            <Activity className={`${iconSize} text-blue-400 opacity-80`} />
          )}
        </div>
      </div>

      {/* Internal Orbitals (SVG) */}
      <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${isTyping ? 'opacity-100' : 'opacity-40'}`} viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/30 animate-spin-slow" style={{ animationDuration: isTyping ? '2s' : '5s' }} />
        <ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/30 animate-spin-slow" style={{ animationDuration: isTyping ? '3s' : '7s' }} />
      </svg>
    </div>
  );
};

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

  const isRtlUI = lang === 'he';

  return (
    <div className={`fixed ${isRtlUI ? 'left-6 md:left-12' : 'right-6 md:right-12'} bottom-8 z-[1000] flex flex-col items-end pointer-events-none`} dir={isRtlUI ? 'rtl' : 'ltr'}>
      {/* HUD Chat Window */}
      <div className={`hologram-card rounded-[2rem] shadow-2xl flex flex-col h-[70vh] w-[90vw] sm:w-[450px] transition-all duration-700 origin-bottom-${isRtlUI ? 'left' : 'right'} mb-6 pointer-events-auto border-none ${
        isMinimized ? 'opacity-0 scale-90 translate-y-20 hidden' : 'opacity-100 scale-100 translate-y-0'
      }`}>
        {/* Header HUD */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-blue-600/5">
          <div className="flex items-center gap-4">
            <NeuralSphere isTyping={isTyping} size="small" />
            <div className={isRtlUI ? 'text-right' : 'text-left'}>
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
          {messages.map((msg, i) => {
            const isRTL = isRTLText(msg.content);
            return (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed transition-all ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none shadow-lg' 
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    style={{ fontFamily: isRTL ? 'Assistant, Inter, sans-serif' : 'Inter, Assistant, sans-serif' }}
                  >
                      <div className={`flex items-center gap-2 mb-1.5 opacity-60 text-[9px] uppercase font-bold tracking-wider font-mono ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                          {msg.role === 'user' ? <User className="w-2.5 h-2.5" /> : <Terminal className="w-2.5 h-2.5" />}
                          <span>{msg.role} // {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className="font-medium whitespace-pre-wrap break-words">
                        {msg.content}
                      </div>
                  </div>
              </div>
            );
          })}
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
              dir="auto"
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
