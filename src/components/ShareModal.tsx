import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, MessageCircle, Facebook, Twitter, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = "Descubre la experiencia gastronómica de Mis María. ✨";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook size={24} />,
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: <Twitter size={24} />,
      color: 'bg-[#1DA1F2]',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-paper rounded-[2.5rem] shadow-2xl overflow-hidden border border-brand/10"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-brand">
                  <Share2 size={24} />
                  <h3 className="font-serif text-2xl">Compartir</h3>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-brand/5 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`${option.color} text-white p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{option.name}</span>
                  </a>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand ml-1">Copiar Enlace</label>
                <div className="flex items-center gap-2 p-2 bg-white border border-brand/10 rounded-2xl">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-transparent text-xs text-gray-500 px-2 outline-none overflow-hidden text-ellipsis whitespace-nowrap"
                  />
                  <button
                    onClick={handleCopy}
                    className={`p-3 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-brand text-white hover:bg-brand-light'}`}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
