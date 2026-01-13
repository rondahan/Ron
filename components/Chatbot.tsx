
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Trash2, X, Terminal, Activity, Bot, Zap, Cpu, Key } from 'lucide-react';
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

// Helper to parse simple markdown links [title](url) and plain URLs
const formatMessage = (text: string) => {
  // Regex for Markdown links: [title](url)
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = mdLinkRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add the link
    parts.push(
      <a 
        key={match.index} 
        href={match[2]} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-cyan-400 underline hover:text-cyan-300 font-bold transition-colors inline-flex items-center gap-1"
      >
        {match[1]}
      </a>
    );
    lastIndex = mdLinkRegex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex);
    // Simple linkify for plain URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const subParts = [];
    let subLastIndex = 0;
    let subMatch;

    while ((subMatch = urlRegex.exec(remaining)) !== null) {
      if (subMatch.index > subLastIndex) {
        subParts.push(remaining.substring(subLastIndex, subMatch.index));
      }
      subParts.push(
        <a 
          key={subMatch.index} 
          href={subMatch[1]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cyan-400 underline hover:text-cyan-300 transition-colors"
        >
          {subMatch[1]}
        </a>
      );
      subLastIndex = urlRegex.lastIndex;
    }
    if (subLastIndex < remaining.length) {
      subParts.push(remaining.substring(subLastIndex));
    }
    parts.push(...subParts);
  }

  return parts.length > 0 ? parts : text;
};

const NeuralSphere = ({ isTyping, size = "large" }: { isTyping: boolean, size?: "small" | "large" }) => {
  const isSmall = size === "small";
  const containerSize = isSmall ? "w-10 h-10" : "w-20 h-20";
  const innerSize = isSmall ? "w-8 h-8" : "w-16 h-16";
  
  // High-fidelity AI Robot Head - Reliable URL
  const aiAvatarUrl = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&h=400&auto=format&fit=crop";

  return (
    <div className={`relative ${containerSize} flex items-center justify-center group`}>
      {/* Outer Atmospheric Glow */}
      <div className={`absolute inset-0 rounded-full bg-cyan-500 blur-2xl transition-all duration-1000 ${
        isTyping ? 'scale-150 opacity-50 animate-pulse' : 'scale-100 opacity-20'
      }`}></div>
      
      {/* Dynamic Energy Rings */}
      <div className={`absolute inset-0 border-2 border-cyan-400/20 rounded-full animate-spin-slow ${isTyping ? '[animation-duration:3s]' : '[animation-duration:10s]'}`}></div>
      <div className={`absolute -inset-1 border border-emerald-400/10 rounded-full animate-spin-slow direction-reverse ${isTyping ? '[animation-duration:5s]' : '[animation-duration:15s]'}`}></div>

      {/* Main Core - The Robot Avatar */}
      <div className={`relative z-10 ${innerSize} rounded-full border-2 border-white/20 overflow-hidden flex items-center justify-center bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:scale-105 transition-transform duration-500`}>
        {/* The Robot Head Image */}
        <img 
          src={aiAvatarUrl} 
          alt="Charlie AI Avatar"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isTyping ? 'scale-115 brightness-125 saturate-150' : 'scale-110 brightness-110 animate-float'
          }`}
        />

        {/* Scanline / Holographic Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.05)_50%)] bg-[length:100%_4px] animate-scanline opacity-30"></div>
        
        {/* Thinking State Overlay */}
        {isTyping && (
          <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center backdrop-blur-[1px]">
            <Zap className="w-1/2 h-1/2 text-cyan-200 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,1)]" />
          </div>
        )}
        
        {/* Subtle Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
      </div>

      {/* Pulsing Orbit Dots */}
      <div className={`absolute w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[0.5px] animate-orbit shadow-[0_0_5px_#22d3ee] ${isTyping ? 'opacity-100' : 'opacity-60'}`}></div>
    </div>
  );
};

const Chatbot: React.FC<ChatbotProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].charlie;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [lastErrorType, setLastErrorType] = useState<'quota' | null>(null);
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
    setLastErrorType(null);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const responseText = await getRonAIResponse(history, textToSend, lang);

    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: responseText, timestamp: new Date() }]);

    // Check if the response contains keywords suggesting a quota error
    if (responseText.includes('quota') || responseText.includes('מכסה')) {
      setLastErrorType('quota');
    }
  };

  const handleOpenKeySelection = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Assume success and clear error state
      setLastErrorType(null);
    } catch (e) {
      console.error("Could not open key selection", e);
    }
  };

  const isRtlUI = lang === 'he';

  return (
    <div className={`fixed ${isRtlUI ? 'left-6 md:left-12' : 'right-6 md:right-12'} bottom-8 z-[1000] flex flex-col items-end pointer-events-none`} dir={isRtlUI ? 'rtl' : 'ltr'}>
      {/* HUD Chat Window */}
      <div className={`hologram-card rounded-[2.5rem] shadow-2xl flex flex-col h-[70vh] w-[90vw] sm:w-[450px] transition-all duration-700 origin-bottom-${isRtlUI ? 'left' : 'right'} mb-6 pointer-events-auto border-none ${
        isMinimized ? 'opacity-0 scale-90 translate-y-20 hidden' : 'opacity-100 scale-100 translate-y-0'
      }`}>
        {/* Header HUD */}
        <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between bg-cyan-600/5">
          <div className="flex items-center gap-4">
            <NeuralSphere isTyping={isTyping} size="small" />
            <div className={isRtlUI ? 'text-right' : 'text-left'}>
              <h3 className="font-bold text-white text-sm tracking-tight flex items-center gap-2">
                {t.title}
                <div className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 text-[8px] border border-cyan-500/30 rounded font-mono">NEURAL_V3</div>
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                <span className="text-[9px] text-cyan-400 font-mono font-bold uppercase tracking-widest">Interface Stream: Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1">
            <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-950/80">
          {messages.map((msg, i) => {
            const isRTL = isRTLText(msg.content);
            const isLastMessage = i === messages.length - 1;
            return (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed transition-all relative ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-500/10' 
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    style={{ fontFamily: isRTL ? 'Assistant, Inter, sans-serif' : 'Inter, Assistant, sans-serif' }}
                  >
                      {msg.role === 'assistant' && (
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#22d3ee_1px,transparent_1px)] bg-[size:12px_12px] rounded-2xl"></div>
                      )}
                      
                      <div className={`flex items-center gap-2 mb-1.5 opacity-60 text-[9px] uppercase font-bold tracking-wider font-mono ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                          {msg.role === 'user' ? <User className="w-2.5 h-2.5" /> : <Terminal className="w-2.5 h-2.5" />}
                          <span>{msg.role} // {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className="font-medium whitespace-pre-wrap break-words relative z-10">
                        {formatMessage(msg.content)}
                      </div>

                      {/* Actionable Error Correction UI */}
                      {isLastMessage && msg.role === 'assistant' && lastErrorType === 'quota' && (
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                          <button 
                            onClick={handleOpenKeySelection}
                            className="flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-cyan-500/30 transition-all active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                          >
                            <Key className="w-3 h-3" />
                            {lang === 'he' ? 'השתמש במפתח API משלך' : 'Use your own API Key'}
                          </button>
                          <p className="text-[9px] text-slate-500 text-center leading-tight">
                            {lang === 'he' 
                              ? 'בחר מפתח API מפרויקט בתשלום כדי להימנע ממגבלות מכסה.' 
                              : 'Select an API key from a paid project to bypass global quota limits.'}
                            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="ml-1 text-cyan-600/60 underline hover:text-cyan-400">Docs</a>
                          </p>
                        </div>
                      )}
                  </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-cyan-500/5 border border-cyan-500/20 p-3 rounded-xl rounded-bl-none flex gap-2 items-center">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                <span className="text-[10px] font-mono text-cyan-400 ml-1 uppercase tracking-tighter">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input HUD */}
        <div className="p-4 bg-slate-900 border-t border-cyan-500/10">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 bg-slate-950 border border-cyan-500/20 rounded-2xl p-2 pr-2">
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
              className="p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all active:scale-95 disabled:opacity-30 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Avatar Trigger */}
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
