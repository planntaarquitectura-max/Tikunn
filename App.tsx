
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen, ChevronDown } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
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
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">T</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              TRANSFORMING <span className="font-normal text-stone-500">LIVES</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Introducción</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Experiencias</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Biografía</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Authors</a>
            <a 
              href="https://doi.org/10.1038/s41586-024-08148-8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              View Paper
            </a>
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
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Authors</a>
            <a 
              href="https://doi.org/10.1038/s41586-024-08148-8" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer"
            >
              View Paper
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay - Vignette: Transparent center, Opaque edges */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.0)_0%,rgba(249,248,244,0.3)_40%,rgba(249,248,244,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Nature • Nov 2024
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Transforming <br/> Inner Patterns <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">for Extraordinary Lives</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Resonancias para transformar tu realidad
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
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">T</span>ikún (טיקון), un término hebreo con raíz ancestral, expresa el principio de corrección profunda: realinear tu campo energético para liberar patrones limitantes y reconfigurar tu realidad desde la base.
              </p>
              <p>
                Cada persona nace con un mapa frecuencial único que explica por qué, incluso alcanzando éxito externo, siguen apareciendo bloqueos en ingresos, relaciones, misión y expansión.
              </p>
              <p>
                En Tikunn trabajamos con <strong>Resonance Repatterning</strong>, coherencia cuántica y neurociencia aplicada para disolver interferencias inconscientes, restaurar tu coherencia interna y activar estados de flujo que multiplican tu claridad estratégica, tu poder de decisión, tu magnetismo y tu creatividad exponencial.
              </p>
            </div>
          </div>
        </section>

        {/* The Science: Experiencias */}
        <section id="science" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> THE SYSTEM
                        </div>
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
                    <div className="lg:sticky lg:top-28">
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* The Science: Transformer Decoder */}
        <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                {/* Decorative background pattern - Gold/Stone theme */}
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            THE INNOVATION
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Neural Decoding</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Standard decoders assume simple, independent errors. Real hardware is messier. AlphaQubit treats decoding as a sequence prediction problem, using a <strong>Recurrent Transformer</strong> architecture.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            It ingests the history of stabilizer measurements and uses "soft" analog information—probabilities rather than just binary 0s and 1s—to make highly informed predictions about logical errors.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* The Science: Results */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Outperforming the Standard</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        AlphaQubit was tested on Google's Sycamore processor and accurate simulations. It consistently outperforms "Minimum-Weight Perfect Matching" (MWPM), the industry standard, effectively making the quantum computer appear cleaner than it actually is.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>

        {/* Impact / Biografía */}
        <section id="impact" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-[3/4] md:aspect-auto md:h-full bg-stone-900 rounded-xl overflow-hidden relative border border-stone-200 shadow-md">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
                          alt="Sandy Alvo" 
                          className="w-full h-full object-cover opacity-90" 
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
                        Mi camino integra la profundidad de los Programas de 12 Pasos, el trabajo con el niño interior y una especialización en Sistemas Disfuncionales y C-PTSD (Trauma Complejo). Resido en Baja California, donde equilibro mi práctica terapéutica con la maternidad consciente junto a mi esposo y nuestros hijos, integrando en mi trabajo la comprensión profunda de las dinámicas familiares y sistémicas.
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

        {/* Authors */}
        <section id="authors" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">RESEARCH TEAM</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Key Contributors</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">A collaboration between Google DeepMind and Google Quantum AI.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <AuthorCard 
                        name="Johannes Bausch" 
                        role="Google DeepMind" 
                        delay="0s" 
                    />
                    <AuthorCard 
                        name="Andrew W. Senior" 
                        role="Google DeepMind" 
                        delay="0.1s" 
                    />
                    <AuthorCard 
                        name="Francisco J. H. Heras" 
                        role="Google DeepMind" 
                        delay="0.2s" 
                    />
                    <AuthorCard 
                        name="Thomas Edlich" 
                        role="Google DeepMind" 
                        delay="0.3s" 
                    />
                    <AuthorCard 
                        name="Alex Davies" 
                        role="Google DeepMind" 
                        delay="0.4s" 
                    />
                    <AuthorCard 
                        name="Michael Newman" 
                        role="Google Quantum AI" 
                        delay="0.5s" 
                    />
                </div>
                <div className="text-center mt-12">
                    <p className="text-stone-500 italic">And many others contributing to hardware, theory, and engineering.</p>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Transforming Inner Patterns</div>
                <p className="text-sm">Visualizing "Learning high-accuracy error decoding for quantum processors"</p>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            Based on research published in Nature (2024). Generated by AI.
        </div>
      </footer>
    </div>
  );
};

export default App;
