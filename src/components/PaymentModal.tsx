import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Lock, CheckCircle2, Wallet, Banknote, Smartphone, Globe, Bitcoin } from 'lucide-react';

// Use a placeholder key for the demo as requested
const stripePromise = loadStripe('pk_test_51Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: { name: string; price: string; image?: string } | null;
  exchangeRate: number | null;
}

type PaymentMethod = 'card' | 'paypal' | 'crypto' | 'cash' | 'pagomovil' | 'transferencia';

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
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-brand">Datos de Tarjeta</label>
        <div className="p-4 bg-white border border-brand/20 rounded-xl shadow-sm">
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
        className="w-full bg-brand text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-light transition-all disabled:opacity-50 shadow-lg shadow-brand/20"
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
          </>
        )}
      </button>
    </form>
  );
};

const PaymentMethodSelector: React.FC<{ 
  onSelect: (method: PaymentMethod) => void; 
  selected: PaymentMethod;
}> = ({ onSelect, selected }) => {
  const methods = [
    { id: 'card', icon: <CreditCard size={18} />, label: 'Tarjeta' },
    { id: 'paypal', icon: <Globe size={18} />, label: 'PayPal' },
    { id: 'crypto', icon: <Bitcoin size={18} />, label: 'Crypto' },
    { id: 'pagomovil', icon: <Smartphone size={18} />, label: 'Pago Móvil' },
    { id: 'transferencia', icon: <Wallet size={18} />, label: 'Transf.' },
    { id: 'cash', icon: <Banknote size={18} />, label: 'Efectivo' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      {methods.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelect(m.id as PaymentMethod)}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-tighter gap-1 ${
            selected === m.id 
              ? 'bg-brand text-white border-brand shadow-md' 
              : 'bg-white border-brand/10 text-gray-500 hover:border-brand/30'
          }`}
        >
          {m.icon}
          {m.label}
        </button>
      ))}
    </div>
  );
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, item, exchangeRate }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [processing, setProcessing] = useState(false);

  if (!item) return null;

  const handleSimulatedPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const renderPaymentContent = () => {
    const [paymentData, setPaymentData] = useState({
      reference: '',
      phone: '',
      bank: '',
      email: '',
      txid: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    switch (method) {
      case 'card':
        return (
          <Elements stripe={stripePromise}>
            <CheckoutForm item={item} exchangeRate={exchangeRate} onSuccess={() => setIsSuccess(true)} />
          </Elements>
        );
      case 'paypal':
        return (
          <div className="space-y-4">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <Globe className="mx-auto text-blue-600 mb-2" size={32} />
              <p className="text-sm text-blue-800 font-medium">Ingresa tu correo de PayPal para recibir la solicitud de pago.</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand">Correo PayPal</label>
              <input 
                type="email" 
                name="email"
                placeholder="ejemplo@correo.com"
                value={paymentData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-brand/10 rounded-xl text-sm outline-none focus:border-brand"
              />
            </div>
            <button 
              onClick={handleSimulatedPayment}
              disabled={processing || !paymentData.email}
              className="w-full bg-[#0070ba] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? "Procesando..." : "Continuar con PayPal"}
            </button>
          </div>
        );
      case 'crypto':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 space-y-2">
              <p className="text-[10px] font-bold text-orange-800 uppercase">Dirección USDT (TRC20)</p>
              <code className="block p-2 bg-white rounded border border-orange-200 text-[10px] break-all">
                Txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </code>
              <p className="text-[10px] text-orange-600">Envía el equivalente a ${item.price} y pega el TXID abajo.</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand">Hash de Transacción (TXID)</label>
              <input 
                type="text" 
                name="txid"
                placeholder="Pega aquí el hash de la transacción"
                value={paymentData.txid}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-brand/10 rounded-xl text-sm outline-none focus:border-brand"
              />
            </div>
            <button 
              onClick={handleSimulatedPayment}
              disabled={processing || !paymentData.txid}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold disabled:opacity-50"
            >
              {processing ? "Verificando..." : "Confirmar Envío"}
            </button>
          </div>
        );
      case 'pagomovil':
      case 'transferencia':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-brand/5 rounded-2xl border border-brand/10 space-y-3">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-brand uppercase">Datos de {method === 'pagomovil' ? 'Pago Móvil' : 'Transferencia'}</p>
                <p className="text-xs">Banco: Banesco (0134)</p>
                <p className="text-xs">Teléfono/Cuenta: 0412-3223237</p>
                <p className="text-xs">RIF: V-12345678-9</p>
              </div>
              <div className="pt-2 border-t border-brand/10">
                <p className="text-[10px] font-bold text-brand uppercase">Monto a Pagar</p>
                <p className="text-lg font-bold">Bs. {(parseFloat(item.price) * (exchangeRate || 1)).toLocaleString('es-VE', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-brand">Referencia</label>
                <input 
                  type="text" 
                  name="reference"
                  placeholder="Últimos 4-6 dígitos"
                  value={paymentData.reference}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-white border border-brand/10 rounded-xl text-sm outline-none focus:border-brand"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-brand">Banco Emisor</label>
                <input 
                  type="text" 
                  name="bank"
                  placeholder="Ej: Mercantil"
                  value={paymentData.bank}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-white border border-brand/10 rounded-xl text-sm outline-none focus:border-brand"
                />
              </div>
            </div>

            {method === 'pagomovil' && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-brand">Teléfono Emisor</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="04xx-xxxxxxx"
                  value={paymentData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-white border border-brand/10 rounded-xl text-sm outline-none focus:border-brand"
                />
              </div>
            )}

            <button 
              onClick={handleSimulatedPayment}
              disabled={processing || !paymentData.reference || !paymentData.bank}
              className="w-full bg-brand text-white py-4 rounded-xl font-bold disabled:opacity-50"
            >
              {processing ? "Verificando..." : "Reportar Pago"}
            </button>
          </div>
        );
      case 'cash':
        return (
          <div className="space-y-4">
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100 text-center">
              <Banknote className="mx-auto text-green-600 mb-2" size={32} />
              <p className="text-sm text-green-800 font-medium">Paga en efectivo al recibir tu pedido o al llegar al local.</p>
            </div>
            <button 
              onClick={handleSimulatedPayment}
              disabled={processing}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold"
            >
              {processing ? "Procesando..." : "Confirmar Pedido"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

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
              <div className="flex justify-between items-center mb-6">
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
                  <h4 className="font-serif text-3xl">¡Pedido Recibido!</h4>
                  <p className="text-gray-600">Tu pedido de <strong>{item.name}</strong> está siendo procesado. ✨</p>
                  <button
                    onClick={onClose}
                    className="bg-brand text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-brand/20"
                  >
                    Entendido
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Item Summary */}
                  <div className="bg-white p-4 rounded-2xl border border-brand/5 flex gap-4 items-center">
                    {item.image && (
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt={item.name} referrerPolicy="no-referrer" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-brand font-bold">${item.price}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand">Método de Pago</label>
                    <PaymentMethodSelector selected={method} onSelect={setMethod} />
                  </div>

                  <div className="min-h-[200px]">
                    {renderPaymentContent()}
                  </div>

                  <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                    <Lock size={10} /> Transacción segura y protegida
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
