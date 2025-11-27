
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene } from './components/QuantumScene';
import { ArrowDown, Menu, X, BookOpen, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const AccordionItem = ({ title, children }: { title: string, children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left group focus:outline-none"
      >
        <span className={`font-serif text-xl transition-colors duration-300 ${isOpen ? 'text-nobel-gold' : 'text-stone-800 group-hover:text-nobel-gold'}`}>
          {title}
        </span>
        <ChevronDown 
          size={20} 
          className={`text-nobel-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-stone-600 leading-relaxed text-base pr-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "Tikunn cambió mi perspectiva completamente. Logré desbloquear patrones que llevaba años repitiendo y encontrar una paz que no conocía.",
      author: "María González",
      role: "Emprendedora"
    },
    {
      quote: "La claridad que obtuve en las sesiones es impresionante. Mi negocio fluye de una manera totalmente distinta desde que realineé mi energía.",
      author: "Carlos Rodríguez",
      role: "Director Creativo"
    },
    {
      quote: "Una experiencia profunda y transformadora. Sandy tiene una capacidad única para ver lo que está oculto y guiarte hacia tu verdad.",
      author: "Ana López",
      role: "Arquitecta"
    },
     {
      quote: "Cada sesión me ayuda a ver con claridad lo que antes no podía reconocer. Salgo más en paz, más centrado y con un sentido renovado de dirección en mi vida.",
      author: "Javier Martínez",
      role: "Consultor"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 md:px-12">
      <div className="overflow-hidden">
        <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="w-full flex-shrink-0 px-4 text-center">
              <div className="mb-6 text-nobel-gold">
                <svg className="w-10 h-10 mx-auto opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.896 14.789 15.547 15.422 14.501C15.118 14.501 14.914 14.501 14.914 14.501C12.358 14.501 10.259 12.441 10.259 9.85C10.259 7.29 12.33 5.379 14.869 5.379C17.408 5.379 19.507 7.439 19.507 9.85C19.507 14.591 16.516 19.743 14.017 21ZM5 21L5 18C5 16.896 5.772 15.547 6.406 14.501C6.101 14.501 5.897 14.501 5.897 14.501C3.341 14.501 1.242 12.441 1.242 9.85C1.242 7.29 3.313 5.379 5.852 5.379C8.391 5.379 10.49 7.439 10.49 9.85C10.49 14.591 7.499 19.743 5 21Z" />
                </svg>
              </div>
              <p className="font-serif text-xl md:text-3xl text-stone-800 italic mb-8 leading-relaxed">"{t.quote}"</p>
              <div>
                <h4 className="font-bold text-stone-900 tracking-wide">{t.author}</h4>
                <p className="text-stone-500 text-sm uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Controls */}
      <button 
        onClick={prev} 
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-nobel-gold transition-colors focus:outline-none"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={next} 
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-nobel-gold transition-colors focus:outline-none"
        aria-label="Next testimonial"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
            <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-nobel-gold w-6' : 'bg-stone-300 hover:bg-stone-400'}`}
                aria-label={`Go to testimonial ${i + 1}`}
            />
        ))}
      </div>
    </div>
  );
};

const CourseBadge = () => {
  return (
    <a 
      href="#agenda" 
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById('agenda');
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }}
      className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 flex items-center justify-center w-44 h-44 group cursor-pointer animate-fade-in hover:scale-105 transition-transform duration-300"
    >
      {/* Rotating Text Ring */}
      <div className="absolute inset-0 w-full h-full animate-spin-slow">
         <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
           <defs>
             <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
           </defs>
           <text fontSize="10.2">
             <textPath href="#circlePath" className="font-serif font-bold tracking-[0.11em] uppercase fill-stone-800">
               • INSCRIPCIÓN • NUEVOS CURSOS
             </textPath>
           </text>
         </svg>
      </div>
      
      {/* Center Circle - Shiny Gold Gradient matching the sphere */}
      <div className="absolute w-20 h-20 bg-gradient-to-br from-[#E6C985] to-[#C5A059] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#C5A059]/40 border-2 border-white group-hover:brightness-110 transition-all duration-300">
         <Calendar size={32} className="stroke-[1.5]" />
      </div>
    </a>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://github.com/planntaarquitectura-max/Tikunn/blob/main/SF.png?raw=true" 
              alt="Tikunn" 
              className="h-24 md:h-36 w-auto object-contain"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Introducción</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Experiencias</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Biografía</a>
            <a href="#testimonials" onClick={scrollToSection('testimonials')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Testimonios</a>
            <a href="#agenda" onClick={scrollToSection('agenda')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Agenda</a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Introducción</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Experiencias</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Biografía</a>
            <a href="#testimonials" onClick={scrollToSection('testimonials')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Testimonios</a>
            <a href="#agenda" onClick={scrollToSection('agenda')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Agenda</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay - Vignette: Transparent center, Opaque edges */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.0)_0%,rgba(249,248,244,0.3)_40%,rgba(249,248,244,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Transforming <br/> Inner Patterns <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">for Extraordinary Lives</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Cambia tu interior, expande tu realidad
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>DISCOVER</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>

        {/* Floating Course Badge */}
        <CourseBadge />

      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">INTRODUCCIÓN</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">La Corrección Cuántica de tu Realidad</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">T</span>ikunn viene de la palabra aramea Tikún, que significa “corrección”.
                Se refiere a los aspectos que estamos llamados a reparar en esta vida, de manera individual, para convertirnos en una contribución colectiva a todo lo que nos rodea. Nacemos con un Tikún que muestra cómo nuestro pasado influye en nuestro presente y cómo cada elección que hacemos abre —o cierra— las posibilidades de nuestro futuro.
              </p>
            </div>
          </div>
        </section>

        {/* The Science: Experiencias */}
        <section id="science" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-8 text-stone-900">Experiencias</h2>
                        
                        <div className="mt-2">
                           <AccordionItem title="Sesiones Individuales">
                             Identificación precisa y disolución de patrones inconscientes mediante test muscular y protocolos de resonancia, restaurando tu coherencia bioenergética para desbloquear situaciones específicas en tu vida.
                           </AccordionItem>
                           <AccordionItem title="Programas Cuánticos">
                             Procesos inmersivos de 6 a 12 semanas diseñados para generar saltos cuánticos en áreas fundamentales: Abundancia Financiera, Relaciones Conscientes y Propósito Vital.
                           </AccordionItem>
                           <AccordionItem title="Resonancia Empresarial">
                             Consultoría estratégica para líderes y fundadores. Alineamos la estructura energética de tu negocio para eliminar fricciones sistémicas y potenciar un crecimiento orgánico y expansivo.
                           </AccordionItem>
                           <AccordionItem title="Talleres de Frecuencia">
                             Experiencias grupales de alto impacto donde utilizamos sonido, movimiento y consciencia para elevar tu vibración basal y anclar nuevos estados de posibilidad.
                           </AccordionItem>
                           <AccordionItem title="Mentoría Estratégica">
                             Acompañamiento 1 a 1 de alto nivel para visionarios que buscan integrar su diseño humano y energético con sus decisiones de negocio e impacto global.
                           </AccordionItem>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Impact / Biografía */}
        <section id="impact" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-[3/4] md:aspect-auto md:h-full bg-black rounded-xl overflow-hidden relative border border-stone-800 shadow-md">
                        <img 
                          src="https://github.com/planntaarquitectura-max/Tikunn/blob/main/IMG_4072.JPG?raw=true" 
                          alt="Sandy Alvo" 
                          className="w-full h-full object-contain" 
                        />
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">BIOGRAFÍA</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Sandy Alvo</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        Nací en Guadalajara, Jalisco, un territorio donde la sabiduría ancestral convive con la visión de futuro. Durante más de once años he integrado principios de Física Cuántica, coherencia energética y neurociencia aplicada para transformar procesos personales, familiares, profesionales y empresariales.
                    </p>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        Fundé Tikunn como un espacio de expansión: un laboratorio de transformación donde desarrollo seminarios, clases maestras, experiencias de repatterning y proyectos que buscan elevar la conciencia colectiva y catalizar nuevas líneas de realidad.
                    </p>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        Integro diversas herramientas terapéuticas en mi práctica, entre ellas la psicoterapia, la facilitación de procesos individuales, la física cuántica aplicada, la decodificación emocional y las constelaciones familiares. También trabajo de manera profunda con el C-PTSD, el Niño Interior, el reparenting y la actualización de patrones que limitan la vida cotidiana. Mi camino incorpora además la base de los Programas de 12 Pasos, la comprensión de los sistemas disfuncionales y una mirada sistémica que atraviesa cada proceso. Vivo en Baja California, donde equilibro la práctica terapéutica con la maternidad consciente junto a mi familia, integrando una visión humana y real de las dinámicas personales y familiares.
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        Acompaño a empresarios, líderes y familias de alto rendimiento a disolver interferencias inconscientes, activar campos de coherencia y amplificar impacto, claridad y propósito desde una comprensión profunda de la dinámica humana y la expansión de la conciencia.
                    </p>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            “The extraordinary is always possible, no matter what.”
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Chloe Faith Wordsworth</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-white border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">TESTIMONIOS</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900">Lo que dicen nuestros clientes</h2>
                </div>
                <TestimonialCarousel />
            </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="py-24 bg-[#F9F8F4] border-t border-stone-200">
             <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">CALENDARIO</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-8 text-stone-900">Agenda</h2>
                    <p className="text-lg text-stone-600 mb-12 leading-relaxed">
                        Consulta la disponibilidad para sesiones individuales y las fechas de nuestros próximos encuentros presenciales y online.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="p-8 bg-white border border-stone-200 rounded-xl hover:border-nobel-gold/50 transition-colors shadow-sm group">
                            <h3 className="font-serif text-2xl mb-2 text-stone-900 group-hover:text-nobel-gold transition-colors">Sesiones 1:1</h3>
                            <p className="text-stone-500 mb-6">Reserva tu espacio para un proceso profundo de transformación personal.</p>
                            <a 
                                href="https://calendly.com/tikunn/sesion?back=1&month=2025-11" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-bold tracking-widest uppercase border-b border-stone-300 pb-1 hover:border-nobel-gold hover:text-nobel-gold transition-colors inline-block"
                            >
                                Reservar Ahora
                            </a>
                        </div>
                        <div className="p-8 bg-white border border-stone-200 rounded-xl hover:border-nobel-gold/50 transition-colors shadow-sm group">
                            <h3 className="font-serif text-2xl mb-2 text-stone-900 group-hover:text-nobel-gold transition-colors">Próximos Talleres</h3>
                            <p className="text-stone-500 mb-6">Inscripciones abiertas para "Tikún Ancestral Febrero 2025".</p>
                            <button className="text-sm font-bold tracking-widest uppercase border-b border-stone-300 pb-1 hover:border-nobel-gold hover:text-nobel-gold transition-colors">Ver Detalles</button>
                        </div>
                    </div>
                </div>
             </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <div className="container mx-auto px-6 text-center">
            <h4 className="font-serif text-xl text-white mb-6">Tikunn</h4>
            <div className="font-serif text-lg text-stone-300 mb-3">
                © 2025 Tikunn. Sesiones • Seminarios • Experiencias Cuánticas
            </div>
            <a href="mailto:info@tikunn.com" className="text-nobel-gold hover:text-white transition-colors text-sm font-medium tracking-wide">
                Contacto: info@tikunn.com
            </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
