
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Trash2, Download, Minimize2, Sparkles, Brain, X } from 'lucide-react';
import { getRonAIResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import { Language, TRANSLATIONS } from '../constants';

interface ChatbotProps {
  lang: Language;
}

const Chatbot: React.FC<ChatbotProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].charlie;
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: t.initial,
      timestamp: new Date()
    }]);

    const handleOpen = () => setIsMinimized(false);
    window.addEventListener('open-charlie', handleOpen);
    return () => window.removeEventListener('open-charlie', handleOpen);
  }, [lang, t.initial]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isMinimized]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isTyping) return;

    const currentInput = textToSend;
    const userMessage: ChatMessage = {
      role: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textOverride) setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const responseText = await getRonAIResponse(history, currentInput, lang);

    setIsTyping(false);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    }]);
  };

  const handleClear = () => {
    if (confirm(t.clear)) {
      setMessages([{
        role: 'assistant',
        content: t.initial,
        timestamp: new Date()
      }]);
    }
  };

  const handleExport = () => {
    const text = messages.map(m => `[${m.role.toUpperCase()}] ${m.content}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Charlie_Chat_${lang}.txt`;
    a.click();
  };

  const renderMessageContent = (content: string) => {
    const parts = content.split(/Sources?:|מקורות:/i);
    const body = parts[0];
    const source = parts[1];

    return (
      <div className="space-y-3">
        {body.split('\n').map((line, idx) => (
          <p key={idx} className={`${idx > 0 ? 'mt-2' : ''} font-medium`}>{line}</p>
        ))}
        {source && (
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
            <div className="p-1 bg-blue-400/20 rounded">
              <Sparkles className="w-2.5 h-2.5 text-blue-400" />
            </div>
            <span className="text-[10px] font-black text-blue-400/70 uppercase tracking-[0.2em]">
              {t.sources}: {source.trim()}
            </span>
          </div>
        )}
      </div>
    );
  };

  const isRtl = lang === 'he';

  return (
    <div 
      className={`fixed ${isRtl ? 'left-4 sm:left-10' : 'right-4 sm:right-10'} bottom-10 z-[110] transition-all duration-500 ease-out flex flex-col items-end`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Expanded Chat Window */}
      <div 
        className={`glass rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col h-[600px] w-[92vw] sm:w-[420px] border-white/10 transition-all duration-500 origin-bottom-right mb-4 ${
          isMinimized ? 'opacity-0 scale-90 translate-y-10 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.03] backdrop-blur-3xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center relative shadow-lg">
              <Bot className="w-6 h-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-black text-base">{lang === 'he' ? "צ'ארלי" : "Charlie"}</h3>
              <span className="text-[9px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                {t.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleExport} title="Export Chat" className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-all hover:text-white">
              <Download className="w-4 h-4" />
            </button>
            <button onClick={handleClear} title="Clear Chat" className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-all hover:text-white">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => setIsMinimized(true)} title="Close" className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-all hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar bg-gradient-to-b from-transparent to-white/[0.01]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? (isRtl ? 'flex-row' : 'flex-row-reverse') : (isRtl ? 'flex-row-reverse' : 'flex-row')}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg ${
                  msg.role === 'user' ? 'bg-slate-800' : 'bg-blue-600'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-xs leading-relaxed relative shadow-xl transition-all ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/[0.07] border border-white/10 text-slate-200 backdrop-blur-xl'
                }`}>
                  {msg.role === 'assistant' ? renderMessageContent(msg.content) : <p className="font-medium">{msg.content}</p>}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 ${isRtl ? 'flex-row' : 'flex-row'}`}>
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-xl">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white/[0.07] border border-white/10 p-4 rounded-xl flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-white/5 bg-white/[0.02] space-y-4">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 no-scrollbar">
            {t.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                disabled={isTyping}
                className="whitespace-nowrap px-4 py-2 bg-blue-600/10 hover:bg-blue-600 hover:text-white border border-blue-500/20 rounded-xl text-[9px] font-black text-blue-400 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-[0.1em]"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="relative flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              disabled={isTyping}
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-4 px-6 pr-14 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] text-xs font-medium transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`absolute ${isRtl ? 'left-2.5' : 'right-2.5'} top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-lg transition-all shadow-lg active:scale-90`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Bubble */}
      <div 
        onClick={() => setIsMinimized(!isMinimized)}
        className={`p-5 bg-blue-600 rounded-full shadow-[0_20px_60px_-15px_rgba(59,130,246,0.6)] cursor-pointer hover:scale-110 transition-all group animate-float ${
          isMinimized ? 'opacity-100' : 'opacity-0 scale-50 pointer-events-none'
        }`}
      >
        <Bot className="w-10 h-10 text-white" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-4 border-slate-950 rounded-full"></div>
      </div>
    </div>
  );
};

export default Chatbot;
