
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Trash2, Download, Minimize2, Sparkles, Brain, Mic, MicOff, Volume2, Loader2 } from 'lucide-react';
import { getRonAIResponse, transcribeAudio, generateSpeech, decodeBase64, decodeAudioData } from '../services/gemini';
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize greeting on mount and when language changes
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: t.initial,
      timestamp: new Date()
    }]);
  }, [lang, t.initial]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTranscribing]);

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput !== undefined ? overrideInput : input;
    if (!messageToSend.trim() || isTyping) return;

    const currentInput = messageToSend;
    const userMessage: ChatMessage = {
      role: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const responseText = await getRonAIResponse(history, currentInput, lang);

    setIsTyping(false);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    }]);

    // Automatically speak the response
    handleSpeak(responseText);
  };

  const handleSpeak = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    
    // Clean text from "Sources:" for cleaner TTS
    const cleanText = text.split(/Sources?:|מקורות:/i)[0].trim();
    const base64Audio = await generateSpeech(cleanText, lang);
    
    if (base64Audio) {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      } catch (err) {
        console.error("Playback error", err);
        setIsSpeaking(false);
      }
    } else {
      setIsSpeaking(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data = (reader.result as string).split(',')[1];
          setIsTranscribing(true);
          const transcription = await transcribeAudio(base64data, 'audio/webm', lang);
          setIsTranscribing(false);
          if (transcription) {
            handleSend(transcription);
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
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
      <div className="space-y-2">
        {body.split('\n').map((line, idx) => (
          <p key={idx} className={idx > 0 ? 'mt-1' : ''}>{line}</p>
        ))}
        {source && (
          <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="text-[9px] font-bold text-blue-400/70 uppercase tracking-widest">
              {t.sources}: {source.trim()}
            </span>
          </div>
        )}
      </div>
    );
  };

  if (isMinimized) {
    return (
      <div 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform group"
      >
        <Bot className="w-8 h-8 text-white" />
      </div>
    );
  }

  return (
    <section id="chatbot" className="py-20 px-6 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
            <Brain className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{t.badge}</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">{t.title}</h2>
          <p className="text-slate-500 text-sm">{t.subtitle}</p>
        </div>

        <div className="glass rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px] border-white/5">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center relative">
                <Bot className="w-4 h-4 text-white" />
                {isSpeaking && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>}
              </div>
              <div>
                <h3 className="font-bold text-xs">{lang === 'he' ? "צ'ארלי" : "Charlie"}</h3>
                <span className="text-[9px] text-green-500 font-mono">{t.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={handleExport} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button onClick={handleClear} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-colors">
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-slate-800' : 'bg-blue-600'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed relative ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'
                  }`}>
                    {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
                    {msg.role === 'assistant' && (
                      <button 
                        onClick={() => handleSpeak(msg.content)}
                        className="absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Speak"
                      >
                        <Volume2 className="w-3 h-3 text-slate-500 hover:text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            {isTranscribing && (
              <div className="flex justify-end">
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-blue-600/20 border border-blue-500/20 p-4 rounded-2xl rounded-tr-none flex items-center gap-3">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-xs text-blue-400 font-mono">
                      {lang === 'he' ? 'מתמלל את הקול שלך...' : 'Transcribing your voice...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/5 bg-white/[0.01]">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isRecording ? (lang === 'he' ? 'מקשיב...' : 'Listening...') : t.placeholder}
                  disabled={isTyping || isTranscribing || isRecording}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-blue-500 text-xs transition-all"
                />
                {/* Wrap handleSend in an arrow function to prevent MouseEvent from being passed as overrideInput */}
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping || isTranscribing}
                  className={`absolute ${lang === 'he' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-lg transition-all shadow-lg`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTyping || isTranscribing}
                className={`p-3 rounded-xl transition-all ${
                  isRecording 
                    ? 'bg-red-600/20 text-red-500 animate-pulse border border-red-500/30' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
