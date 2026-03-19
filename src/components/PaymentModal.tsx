import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Lock, CheckCircle2 } from 'lucide-react';

// Use a placeholder key for the demo as requested
const stripePromise = loadStripe('pk_test_51Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: { name: string; price: string; image?: string } | null;
  exchangeRate: number | null;
}

const CheckoutForm: React.FC<{ item: { name: string; price: string; image?: string }; exchangeRate: number | null; onSuccess: () => void }> = ({ item, exchangeRate, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    // Simulate payment processing for demo purposes
    // In a real app, you would create a PaymentIntent on the server
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {item.image && (
        <div className="h-32 w-full rounded-xl overflow-hidden mb-4 border border-brand/10">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      <div className="bg-paper p-4 rounded-xl border border-brand/10">
        <div className="flex justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Producto</span>
          <span className="text-sm font-bold">{item.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-500">Total (IVA incl.)</span>
          <div className="text-right">
            <span className="text-sm font-bold text-brand">${item.price}</span>
            {exchangeRate && (
              <p className="text-[10px] font-bold text-gray-400">
                Bs. {(parseFloat(item.price) * exchangeRate).toLocaleString('es-VE', { minimumFractionDigits: 2 })}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-brand">Datos de Tarjeta</label>
        <div className="p-4 bg-white border border-brand/20 rounded-xl">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1a1a1a',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="text-red-500 text-xs">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-brand text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-light transition-all disabled:opacity-50"
      >
        {processing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          <>
            <Lock size={18} />
            Pagar ${item.price}
            {exchangeRate && (
              <span className="text-[10px] opacity-60 ml-1">
                (Bs. {(parseFloat(item.price) * exchangeRate).toLocaleString('es-VE', { minimumFractionDigits: 0 })})
              </span>
            )}
          </>
        )}
      </button>
      
      <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
        <Lock size={10} /> Pago seguro procesado por Stripe
      </p>
    </form>
  );
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, item, exchangeRate }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!item) return null;

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
            className="relative w-full max-w-md bg-paper rounded-[2rem] shadow-2xl overflow-hidden border border-brand/10"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-brand">
                  <CreditCard size={24} />
                  <h3 className="font-serif text-2xl">Finalizar Pedido</h3>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-brand/5 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="flex justify-center">
                    <CheckCircle2 size={80} className="text-green-500" />
                  </div>
                  <h4 className="font-serif text-3xl">¡Pago Exitoso!</h4>
                  <p className="text-gray-600">Tu pedido de <strong>{item.name}</strong> está siendo preparado. ✨</p>
                  {exchangeRate && (
                    <p className="text-xs text-gray-400">
                      Total pagado: Bs. {(parseFloat(item.price) * exchangeRate).toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                    </p>
                  )}
                  <button
                    onClick={onClose}
                    className="bg-brand text-white px-8 py-3 rounded-full font-bold"
                  >
                    Cerrar
                  </button>
                </motion.div>
              ) : (
                <Elements stripe={stripePromise}>
                  <CheckoutForm item={item} exchangeRate={exchangeRate} onSuccess={() => setIsSuccess(true)} />
                </Elements>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
