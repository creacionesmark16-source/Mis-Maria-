import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { ExchangeRate } from '../services/exchangeRateService';

interface ExchangeRateBannerProps {
  rate: ExchangeRate | null;
}

export const ExchangeRateBanner: React.FC<ExchangeRateBannerProps> = ({ rate }) => {
  if (!rate) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full h-8 md:h-9 bg-brand/90 backdrop-blur-md text-white px-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 z-[60]"
    >
      <div className="flex items-center gap-2">
        <TrendingUp size={14} className="text-brand-light" />
        <span>Tasa BCV del día:</span>
        <span className="text-brand-light font-black text-sm">Bs. {rate.price.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
      </div>
      <div className="hidden sm:flex items-center gap-2 opacity-60">
        <RefreshCw size={12} />
        <span>Sincronizado: {rate.last_update}</span>
      </div>
    </motion.div>
  );
};
