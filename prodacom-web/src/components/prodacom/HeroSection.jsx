import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "../../assets/images/component-image/hero-image-2.png";

const HERO_IMAGE = heroImage;

export default function HeroSection() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 120]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
  
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Scanner biométrico" className="w-full h-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 grid-overlay opacity-10" />
      <motion.div style={{ y: textY, opacity }} className="relative z-10 max-w-7xl 2xl:max-w-[90rem] mx-auto w-full px-6">
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white leading-tight tracking-tight pt-2">
            SOLUÇÕES PARA
          </motion.h1>
        </div>
        
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white/30 leading-tight tracking-tight pt-2">
            O CONTROLE 
          </motion.h1>
        </div>
        
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-sky-600 leading-tight tracking-tight pt-2">
            DE PONTO E ACESSO.
          </motion.h1>
        </div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-6 lg:mt-8 max-w-lg 2xl:max-w-xl text-sm md:text-base 2xl:text-lg text-white/50 leading-relaxed">
          Há mais de 10 anos provendo soluções integradas de controle de ponto e acesso para empresas de todos os portes. Tecnologia que transforma a gestão do seu negócio.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-8 lg:mt-10 flex flex-col sm:flex-row w-full sm:w-auto gap-4">
          <a 
            href="#contato" 
            onClick={(e) => { e.preventDefault(); document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" }); }} 
            className="w-full sm:w-auto text-center bg-cobalt text-white px-8 py-4 sm:py-3 text-xs sm:text-sm 2xl:text-base font-bold tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300 sm:rounded-none shadow-lg sm:shadow-none"
          >
            Solicite um Orçamento
          </a>
          <a 
            href="#solucoes" 
            onClick={(e) => { e.preventDefault(); document.querySelector("#solucoes")?.scrollIntoView({ behavior: "smooth" }); }} 
            className="w-full sm:w-auto text-center border border-white/20 text-white/70 px-8 py-4 sm:py-3 text-xs sm:text-sm 2xl:text-base font-bold tracking-wider uppercase hover:border-white hover:text-white transition-all duration-300 sm:rounded-none"
          >
            Nossas Soluções
          </a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={16} strokeWidth={1} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}