import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, X, Utensils, Calendar, Info } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/gemini';

interface ChatProps {
  exchangeRate?: number | null;
}

export const Chat: React.FC<ChatProps> = ({ exchangeRate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: '¡Hola! Soy el Concierge Digital de "Mis María". ✨ ¿En qué puedo ayudarte hoy? ¿Te gustaría reservar una mesa o conocer nuestro delicioso menú? 🍷',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(input, messages, exchangeRate);
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-black text-red-600 px-4 py-2.5 rounded-full shadow-2xl z-50 flex items-center gap-2 hover:bg-neutral-900 transition-all border border-red-600/20 whitespace-nowrap"
        id="chat-toggle-btn"
      >
        {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
        {!isOpen && <span className="font-bold text-xs tracking-wide">Chatear ahora</span>}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[600px] bg-[#f5f5f0] rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#5A5A40]/10"
            id="chat-window"
          >
            {/* Header */}
            <div className="bg-[#5A5A40] p-6 text-white flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Utensils size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg leading-tight">Mis María</h3>
                <p className="text-xs opacity-80 uppercase tracking-widest">Concierge Digital</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[#5A5A40] text-white rounded-tr-none'
                        : 'bg-white text-[#1a1a1a] rounded-tl-none border border-[#5A5A40]/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-[#5A5A40]/5 flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#5A5A40] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#5A5A40] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#5A5A40] rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {[
                { icon: <Calendar size={14} />, text: 'Reservar' },
                { icon: <Utensils size={14} />, text: 'Menú' },
                { icon: <Info size={14} />, text: 'Horario' },
              ].map((action) => (
                <button
                  key={action.text}
                  onClick={() => setInput(action.text)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#5A5A40]/20 rounded-full text-xs text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition-colors"
                >
                  {action.icon}
                  {action.text}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-[#5A5A40]/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu consulta..."
                  className="w-full pl-4 pr-12 py-3 bg-[#f5f5f0] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#5A5A40]/30"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 text-[#5A5A40] hover:bg-[#5A5A40]/10 rounded-lg transition-colors disabled:opacity-30"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
