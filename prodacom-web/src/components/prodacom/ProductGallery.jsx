import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  { id: "relogio-de-ponto", title: "Relógio de Ponto", spec: "REP // Biometria + RFID + Senha", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/7f30343e8_generated_cdc1095e.png" },
  { id: "catracas", title: "Catraca Flap", spec: "Flap // Alto Fluxo + Design Premium", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/30ed482e7_generated_40703af9.png" },
  { id: "controle-de-acesso", title: "Controle Biométrico", spec: "Access // Facial + Digital + Cartão", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/aba616e9b_generated_4ec5bffc.png" },
  { id: "ronda", title: "Bastão de Ronda", spec: "Patrol // RFID + GPS + Relatórios", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/82bf69a93_generated_aa707a7d.png" },
  { id: "software", title: "Software de Gestão", spec: "Platform // Cloud + Integração ERP", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/544bfd891_generated_3040d10b.png" },
];

export default function ProductGallery({ onSelectProduct }) {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const slide = (direction) => {
    const currentX = x.get();
    const step = window.innerWidth < 768 ? 320 : 400;
    let newX = direction === "left" ? currentX + step : currentX - step;
    if (newX > 0) newX = 0;
    if (newX < -width) newX = -width;
    animate(x, newX, { type: "tween", duration: 0.5, ease: "easeOut" });
  };

  return (
    <section id="produtos" className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-xs font-mono tracking-widest text-white/20 uppercase block mb-4">03 // Hardware_Gallery</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">Produtos</h2>
            <a href="#contato" onClick={(e) => { e.preventDefault(); document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-white/40 hover:text-cobalt transition-colors group">
              Solicitar Orçamento <ArrowRight size={14} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="relative group/carousel">
        <div className="hidden md:flex absolute top-[40%] -translate-y-1/2 left-4 md:left-8 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button onClick={() => slide("left")} className="w-12 h-12 bg-obsidian/90 border border-white/10 hover:bg-cobalt hover:border-cobalt text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl pointer-events-auto"><ChevronLeft size={24} strokeWidth={1.5} /></button>
        </div>
        <div className="hidden md:flex absolute top-[40%] -translate-y-1/2 right-4 md:right-8 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button onClick={() => slide("right")} className="w-12 h-12 bg-obsidian/90 border border-white/10 hover:bg-cobalt hover:border-cobalt text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl pointer-events-auto"><ChevronRight size={24} strokeWidth={1.5} /></button>
        </div>

        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden pl-6 md:pl-16 py-4">
          <motion.div style={{ x }} drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-6 pr-6 md:pr-16">
            {products.map((product, i) => (
              <motion.div 
                key={i} 
                onClick={() => onSelectProduct(product.id)}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} 
                className="relative shrink-0 w-72 sm:w-80 md:w-96 group cursor-pointer"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-white/5">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-mono text-xs text-white/20 tracking-wider">{product.spec}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-display font-semibold text-base text-white group-hover:text-cobalt transition-colors duration-300">{product.title}</h3>
                  <ArrowRight size={14} strokeWidth={1} className="text-white/10 group-hover:text-cobalt group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}