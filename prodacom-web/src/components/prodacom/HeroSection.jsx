import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HERO_IMAGE = "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/3e20c6951_generated_6a07d945.png";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 120]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Scanner biométrico" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 grid-overlay opacity-10" />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-16 md:pb-24">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
    
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1 initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight">
            INFRAESTRUTURA
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white/30 leading-none tracking-tight">
            PARA A ERA DA
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cobalt leading-none tracking-tight">
            PRECISÃO.
          </motion.h1>
        </div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-8 max-w-lg text-sm md:text-base text-white/50 leading-relaxed">
          Há mais de 10 anos provendo soluções integradas de controle de ponto e acesso para empresas de todos os portes. Tecnologia que transforma a gestão do seu negócio.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-10 flex flex-col sm:flex-row items-start gap-4">
          <a href="#contato" onClick={(e) => { e.preventDefault(); document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-cobalt text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300">
            Solicite um Orçamento
          </a>
          <a href="#solucoes" onClick={(e) => { e.preventDefault(); document.querySelector("#solucoes")?.scrollIntoView({ behavior: "smooth" }); }} className="border border-white/20 text-white/60 px-8 py-3 text-sm font-medium tracking-wider uppercase hover:border-white hover:text-white transition-all duration-300">
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