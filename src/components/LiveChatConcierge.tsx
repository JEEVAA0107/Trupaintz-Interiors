import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  action?: {
    label: string;
    targetSection?: string;
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: `Welcome to TruPaintz & Interiors! I am your architectural finish advisor. How can I assist with your living space or painting requirements today?`,
    time: 'Just now',
  },
];

export const LiveChatConcierge: React.FC<{ onNavigateToBooking: () => void }> = ({ onNavigateToBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Realistic smart response generation
    setTimeout(() => {
      let replyText = '';
      let action: ChatMessage['action'] | undefined = undefined;
      const lower = text.toLowerCase();

      if (lower.includes('stucco') || lower.includes('texture') || lower.includes('venetian') || lower.includes('cost')) {
        replyText = `Our Italian Stucco finishes (Marmorino, Travertino, Metallic Mica) range from ₹65 to ₹145 per sq.ft. including hand-trowel application by certified artisans and a 10-year adhesion guarantee.`;
        action = { label: 'Explore in 3D Studio', targetSection: 'visualizer' };
      } else if (lower.includes('visit') || lower.includes('book') || lower.includes('quote') || lower.includes('estimate') || lower.includes('price')) {
        replyText = `We provide on-site digital moisture audits and bring real 2x2 ft physical stucco swatches to your residence. Would you like to schedule an inspection?`;
        action = { label: 'Book Site Visit Now', targetSection: 'estimator' };
      } else if (lower.includes('kitchen') || lower.includes('modular')) {
        replyText = `Our turnkey modular kitchens feature German Blum servo-drives, anti-fingerprint acrylic shutters, and quartz countertops with a guaranteed 45-day handover.`;
      } else if (lower.includes('dust') || lower.includes('clean') || lower.includes('residential')) {
        replyText = `We use 99% dustless HEPA vacuum sanders and digital moisture meters, so you don't have to vacate or cover every inch of your furniture yourself.`;
      } else {
        replyText = `Thank you for reaching out! You can explore our signature portfolio, or our Senior Project Architect can inspect your site and provide an itemized quote.`;
        action = { label: 'Schedule Consultation', targetSection: 'estimator' };
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (action?.targetSection) {
      setIsOpen(false);
      const el = document.getElementById(action.targetSection);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigateToBooking();
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full bg-amber-600 px-4 py-3 text-white shadow-2xl hover:bg-amber-500 transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95"
          aria-label="Open Live Design Concierge"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs font-semibold tracking-wide">Design Concierge</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-4 py-3.5 bg-neutral-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">TruPaintz Design Concierge</h4>
                <p className="text-[10px] text-amber-300">Live Architectural Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>

                  {m.action && (
                    <button
                      onClick={() => handleActionClick(m.action)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-white/20 dark:bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-white/30 transition-colors"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-neutral-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">Architect typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex gap-1.5 overflow-x-auto">
            {[
              'Italian Stucco cost?',
              'Book site moisture test',
              'Modular Kitchen handover?',
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap rounded-lg border border-neutral-200 dark:border-neutral-800 px-2 py-1 text-[10px] text-neutral-600 dark:text-neutral-400 hover:text-amber-600 hover:border-amber-500"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about textures, timeline, paints..."
              className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="h-8 w-8 rounded-xl bg-amber-600 flex items-center justify-center text-white hover:bg-amber-500 disabled:opacity-40 transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
