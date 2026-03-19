import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { RESTAURANT_DATA } from '../constants';

export const WhatsAppButton: React.FC = () => {
  // Strip spaces and non-numeric characters, then ensure it starts with 58
  const cleanNumber = RESTAURANT_DATA.phone.replace(/\D/g, '');
  const phoneNumber = cleanNumber.startsWith('58') ? cleanNumber : `58${cleanNumber.startsWith('0') ? cleanNumber.slice(1) : cleanNumber}`;
  const welcomeMessage = encodeURIComponent("¡Hola! Bienvenido a Mis María. ¿Qué deseas pedir hoy? ✨");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${welcomeMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-2xl z-50 flex items-center gap-2 hover:bg-[#128C7E] transition-all border border-white/20"
      title="Contactar por WhatsApp"
    >
      <MessageCircle size={18} />
      <span className="font-bold text-xs tracking-wide">WhatsApp</span>
    </motion.a>
  );
};
