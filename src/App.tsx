import { motion } from 'motion/react';
import { Utensils, Clock, Phone, MapPin, Instagram, Facebook, ChevronRight, Share2, ShoppingBag, Calendar, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Chat } from './components/Chat';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PaymentModal } from './components/PaymentModal';
import { ShareModal } from './components/ShareModal';
import { ReservationModal } from './components/ReservationModal';
import { RESTAURANT_DATA } from './constants';
import { getExchangeRate, ExchangeRate } from './services/exchangeRateService';
import { ExchangeRateBanner } from './components/ExchangeRateBanner';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<{ name: string; price: string; image?: string } | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      const rate = await getExchangeRate();
      setExchangeRate(rate);
    };
    fetchRate();
    // Refresh rate every hour
    const interval = setInterval(fetchRate, 3600000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservation = () => {
    const chatBtn = document.getElementById('chat-toggle-btn');
    if (chatBtn) chatBtn.click();
  };

  const handleItemClick = (item: { name: string; price: string; image?: string }) => {
    setSelectedItem(item);
    setIsPaymentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand/30">
      <ExchangeRateBanner rate={exchangeRate} />
      {/* Navigation */}
      <nav className={`fixed ${exchangeRate ? 'top-8 md:top-9' : 'top-0'} w-full z-40 glass-nav transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 
            className="font-serif text-2xl font-bold tracking-tight text-brand cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Mis María
          </h1>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium mr-4">
              <button onClick={() => scrollToSection('menu')} className="hover:text-brand transition-colors">Menú</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-brand transition-colors">Nosotros</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-brand transition-colors">Contacto</button>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={handleShare}
                className="p-2.5 text-brand hover:bg-brand/5 rounded-full transition-colors flex items-center gap-2"
                title="Compartir"
              >
                <Share2 size={20} />
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">Compartir</span>
              </button>
              <button 
                onClick={handleReservation}
                className="bg-brand text-white px-5 md:px-6 py-2.5 rounded-full hover:bg-brand-light transition-all shadow-lg shadow-brand/20 active:scale-95 text-sm font-medium"
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative h-[65vh] flex items-center justify-center overflow-hidden ${exchangeRate ? 'pt-[112px] md:pt-[116px]' : 'pt-20'} bg-[#1a1a1a]`}>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/20 via-transparent to-brand/10" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="font-serif text-5xl md:text-7xl text-white font-light tracking-tight">
              Bienvenidos a tu restaurant <br />
              <span className="italic font-normal text-brand-light">Mis María</span>
            </h2>
            <div className="w-24 h-px bg-white/50 mx-auto mt-8" />
            <p className="text-white/90 text-lg uppercase tracking-[0.2em] font-medium pt-4">
              Somos excelencia en gastronomía
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Dish / Plato Estrella */}
      <section className="py-20 px-6 bg-paper overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-brand/5 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=1200" 
                  alt="Arroz del Senyoret" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-brand text-white px-6 py-2 rounded-full font-serif italic text-lg shadow-lg">
                  Plato Estrella
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="font-serif text-4xl md:text-5xl text-brand">Arroz del Senyoret</h3>
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                Nuestro arroz insignia, preparado con el más fresco marisco pelado y un fondo de pescado cocinado a fuego lento durante horas. Una explosión de sabor mediterráneo en cada bocado.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <button 
                  onClick={() => setIsReservationOpen(true)}
                  className="bg-brand text-white px-8 py-3 rounded-full hover:bg-brand-light transition-all shadow-lg shadow-brand/20 active:scale-95"
                >
                  Reservar un pedido
                </button>
                <div className="text-right">
                  <span className="font-serif text-3xl text-brand font-bold block">$22.00</span>
                  {exchangeRate && (
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Bs. {(22.00 * exchangeRate.price).toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#E6D5B8]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="font-serif text-4xl md:text-5xl text-brand">Nuestra Esencia</h3>
          <p className="text-xl text-gray-800 font-light leading-relaxed italic">
            "En Mis María, no solo servimos comida; creamos momentos. Nuestra cocina es un tributo a los ingredientes de temporada, tratados con el respeto que merecen y presentados con la sofisticación de la era moderna."
          </p>
          <div className="w-20 h-1 bg-brand mx-auto" />
          <p className="text-gray-700 leading-relaxed">
            Nuestra historia comenzó con un pequeño local en el centro histórico, con la visión de elevar la gastronomía tradicional a una experiencia sensorial completa. Hoy, seguimos manteniendo esa misma pasión en cada detalle.
          </p>
          <p className="font-serif text-2xl italic text-brand">Desde 1995</p>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-32 px-6 bg-brand overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="font-serif text-4xl md:text-5xl mb-4 text-white">Experiencias</h3>
            <p className="text-white/70 font-light italic">Lo que nuestros comensales dicen de nosotros.</p>
            <div className="w-24 h-px bg-white/30 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Elena García",
                role: "Crítica Gastronómica",
                text: "Una experiencia sublime. El Arroz del Senyoret es, sin duda, el mejor que he probado en años. La atención al detalle es impecable.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
              },
              {
                name: "Marco Rossi",
                role: "Chef Ejecutivo",
                text: "Me ha sorprendido la técnica en la Lubina a la Sal. Un equilibrio perfecto entre tradición y vanguardia. Volveré sin duda.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
              },
              {
                name: "Sofía Martínez",
                role: "Sommelier",
                text: "La carta de vinos está exquisitamente seleccionada. El maridaje con el Solomillo al Pedro Ximénez fue una revelación.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 space-y-6 relative"
              >
                <div className="absolute top-0 right-10 transform -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-brand shadow-lg">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <p className="text-white/90 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-serif text-xl text-white">{testimonial.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-white/50 font-bold">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section id="menu" className="py-32 px-6 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="font-serif text-4xl md:text-5xl mb-4">Nuestra Selección</h3>
            <p className="text-gray-500 font-light italic mb-8">Haz clic en un plato para realizar tu pedido directamente</p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsReservationOpen(true)}
              className="bg-brand text-white px-12 py-5 rounded-full font-serif text-2xl italic shadow-2xl shadow-brand/40 hover:bg-brand-light transition-all mb-12 flex items-center gap-3 mx-auto"
            >
              <Calendar size={24} />
              Reservar una Mesa
            </motion.button>

            <div className="w-24 h-px bg-brand/30 mx-auto" />
          </div>

          <div className="space-y-24">
            {RESTAURANT_DATA.menu.map((category, idx) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-6 mb-12">
                  <div className="h-px flex-1 bg-brand/10" />
                  <h4 className="font-serif text-3xl italic text-brand">
                    {category.category}
                  </h4>
                  <div className="h-px flex-1 bg-brand/10" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map(item => (
                    <motion.div 
                      key={item.name} 
                      whileHover={{ y: -5 }}
                      onClick={() => handleItemClick(item)}
                      className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-brand/5 hover:border-brand/20"
                    >
                      {item.image && (
                        <div className="h-56 overflow-hidden relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="font-serif text-xl group-hover:text-brand transition-colors flex items-center gap-2">
                            {item.name}
                            <ShoppingBag size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand" />
                          </span>
                          <div className="text-right">
                            <span className="text-brand font-serif font-bold text-lg">${item.price}</span>
                            {exchangeRate && (
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                Bs. {(parseFloat(item.price) * exchangeRate.price).toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="contact" className="py-32 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000" 
              alt="Restaurant Interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-4xl mb-6">Visítanos</h3>
              <p className="text-lg text-white/70 leading-relaxed">
                Ubicados en el corazón de la ciudad, ofrecemos un refugio de paz y buen gusto. Cada plato es una historia contada con los mejores ingredientes de nuestra tierra.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-light">
                  <Clock size={20} />
                  <span className="font-bold uppercase tracking-widest text-xs">Horarios</span>
                </div>
                <div className="space-y-2 text-sm text-white/60">
                  {Object.entries(RESTAURANT_DATA.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-light">
                  <Phone size={20} />
                  <span className="font-bold uppercase tracking-widest text-xs">Contacto</span>
                </div>
                <div className="space-y-2 text-sm text-white/60">
                  <a 
                    href={`https://wa.me/58${RESTAURANT_DATA.phone.replace(/\D/g, '').startsWith('0') ? RESTAURANT_DATA.phone.replace(/\D/g, '').slice(1) : RESTAURANT_DATA.phone.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium hover:text-brand transition-colors flex items-center gap-2"
                  >
                    {RESTAURANT_DATA.phone}
                    <MessageCircle size={14} />
                  </a>
                  <p>Urb. La Rosaleda, San Antonio de los Altos, Mirandinos, Venezuela</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 text-center bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <h4 className="font-serif text-3xl text-white">Mis María</h4>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-brand transition-all shadow-sm active:scale-95 font-bold uppercase tracking-widest text-xs"
          >
            <Share2 size={18} />
            Compartir esta experiencia
          </button>

          <div className="w-12 h-px bg-white/20" />
          
          <p className="text-sm text-white/40">© 2026 Mis María. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Chat Component */}
      <Chat exchangeRate={exchangeRate?.price || null} />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        item={selectedItem} 
        exchangeRate={exchangeRate?.price || null}
      />

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
      />

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />
    </div>
  );
}
