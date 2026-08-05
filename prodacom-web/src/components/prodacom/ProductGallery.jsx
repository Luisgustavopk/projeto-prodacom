import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";


import { productsData } from "../../data/products";


const featuredProductIds = [
  "leitor-facial-f4",
  "inner-rep-plus",
  "idface",
  "idface-max",
  "idlock-bio",
  "idlock",
  "catraca-revolution",
  "idblock-next",
  "idblock-pne",
  "bastao-viggia"
];

export default function ProductGallery() { //
  const navigate = useNavigate(); 
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

 
  const carouselProducts = featuredProductIds
    .map(id => productsData[id])
    .filter(Boolean);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    updateWidth();
    

    setTimeout(updateWidth, 100); 
    
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [carouselProducts]);

  const slide = (direction) => {
    const currentX = x.get();
    const step = window.innerWidth < 768 ? 320 : 400;
    let newX = direction === "left" ? currentX + step : currentX - step;
    if (newX > 0) newX = 0;
    if (newX < -width) newX = -width;
    animate(x, newX, { type: "tween", duration: 0.5, ease: "easeOut" });
  };

  // Se não houver nenhum produto válido na lista, não renderiza a seção
  if (carouselProducts.length === 0) return null;

  return (
    <section id="produtos" className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">Produtos em Destaque</h2>
            <a href="#contato" onClick={(e) => { e.preventDefault(); document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-white/40 hover:text-sky-600 transition-colors group">
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
            
           
            {carouselProducts.map((product, i) => (
              <motion.div 
                key={product.id} 
                onClick={() => navigate(`/produto/${product.id}`)}
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.6 }} 
                className="relative shrink-0 w-72 sm:w-80 md:w-[22rem] group cursor-pointer flex flex-col bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] rounded-2xl p-6 md:p-8 transition-all duration-500"
              >
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-cobalt/10 blur-[50px] rounded-full group-hover:bg-cobalt/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative h-48 md:h-56 flex items-center justify-center mb-8">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none drop-shadow-2xl relative z-10" 
                  />
                </div>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/5 pt-4 group-hover:border-white/10 transition-colors">
                  <h3 className="font-display font-semibold text-base md:text-lg text-white/90 group-hover:text-white transition-colors duration-300 leading-snug">
                    {product.title}
                  </h3>
                  
                  <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cobalt transition-colors duration-300">
                    <ArrowRight size={16} strokeWidth={1.5} className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </div>

              </motion.div>
            ))}

          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-16">
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          
          <p className="hidden md:block text-sm text-white/30">
            Equipamentos homologados e certificados. Garantia e suporte técnico especializado.
          </p>

          <a 
            href="https://wa.me/5531993092473" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full md:w-auto bg-cobalt text-white px-6 py-3.5 md:py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300 text-center flex items-center justify-center shrink-0 md:rounded-none"
          >
            Fale com um Consultor
          </a>

        </div>
      </div>
    </section>
  );
}