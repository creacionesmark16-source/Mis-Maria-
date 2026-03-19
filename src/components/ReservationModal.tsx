import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    diners: '2',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(2);
    } else {
      // Simulate API call
      setTimeout(() => {
        setIsSuccess(true);
      }, 1000);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-brand/30 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-lg bg-paper rounded-[3rem] shadow-2xl overflow-hidden border border-brand/10"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3 text-brand">
                  <Calendar size={28} />
                  <h3 className="font-serif text-3xl">Reserva tu Mesa</h3>
                </div>
                <button onClick={resetAndClose} className="p-2 hover:bg-brand/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={60} className="text-green-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-3xl">¡Reserva Confirmada!</h4>
                    <p className="text-gray-600">
                      Gracias, <strong>{formData.name}</strong>. Hemos reservado una mesa para <strong>{formData.diners} personas</strong> el día <strong>{formData.date}</strong> a las <strong>{formData.time}</strong>. Nos contactaremos al <strong>{formData.phone}</strong> si hay cambios.
                    </p>
                  </div>
                  <button
                    onClick={resetAndClose}
                    className="bg-brand text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-brand/20"
                  >
                    Entendido
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {step === 1 ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-brand flex items-center gap-2">
                            <Users size={14} /> Comensales
                          </label>
                          <select
                            name="diners"
                            value={formData.diners}
                            onChange={handleInputChange}
                            required
                            className="w-full p-4 bg-white border border-brand/10 rounded-2xl outline-none focus:border-brand transition-colors appearance-none"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                              <option key={n} value={n}>{n} {n === 1 ? 'Persona' : 'Personas'}</option>
                            ))}
                            <option value="9+">Más de 8</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-brand flex items-center gap-2">
                            <Calendar size={14} /> Fecha
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-4 bg-white border border-brand/10 rounded-2xl outline-none focus:border-brand transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand flex items-center gap-2">
                          <Clock size={14} /> Hora
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {['13:00', '13:30', '14:00', '14:30', '20:00', '20:30', '21:00', '21:30'].map(t => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, time: t }))}
                              className={`p-3 rounded-xl text-sm font-medium transition-all border ${formData.time === t ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20' : 'bg-white border-brand/10 hover:border-brand/30 text-gray-600'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="time" value={formData.time} required />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand">Nombre Completo</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Tu nombre"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-4 bg-white border border-brand/10 rounded-2xl outline-none focus:border-brand transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand">Correo Electrónico</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="ejemplo@correo.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-4 bg-white border border-brand/10 rounded-2xl outline-none focus:border-brand transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand">Teléfono de Contacto</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Ej: 0412 1234567"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-4 bg-white border border-brand/10 rounded-2xl outline-none focus:border-brand transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 p-4 border border-brand/20 text-brand rounded-2xl font-bold hover:bg-brand/5 transition-all"
                      >
                        Atrás
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={step === 1 && !formData.time}
                      className="flex-[2] bg-brand text-white p-4 rounded-2xl font-bold hover:bg-brand-light transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {step === 1 ? 'Siguiente Paso' : 'Confirmar Reserva'}
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
