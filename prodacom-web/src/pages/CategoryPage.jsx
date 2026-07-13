import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";

export default function CategoryPage({ category, onBackToHome, onSelectModel }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  if (!category) return null;

  return (
    <div className="min-h-screen bg-obsidian font-sans text-white">

      {/* 1. HERO SECTION (DARK) */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-transparent z-10" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.button 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            onClick={onBackToHome}
            className="text-white/40 hover:text-white text-xs font-mono tracking-widest uppercase mb-12 flex items-center gap-2 transition-colors"
          >
            &larr; Voltar ao Início
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl">
          
            <h1 className="font-display font-bold text-5xl md:text-7xl text-white tracking-tight mb-6">
              {category.title}
            </h1>
            <p className="text-base text-white/50 leading-relaxed mb-10 max-w-md">
              {category.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="https://wa.me/5531993092473" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-cobalt text-white px-8 py-3.5 text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300 text-center">
                Solicite um Orçamento
              </a>
              <button onClick={() => document.getElementById('linha-produtos')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto border border-white/10 text-white/60 px-8 py-3.5 text-xs font-medium tracking-wider uppercase hover:border-white hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                Linha de Produtos <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BENEFÍCIOS (LIGHT) */}
      <section className="py-24 bg-white text-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              Por que escolher
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {category.benefits.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="group border-l border-slate_mist pl-6 hover:border-cobalt transition-colors duration-300">
                  <Icon size={24} strokeWidth={1.5} className="text-cobalt mb-6" />
                  <h3 className="font-display font-semibold text-lg mb-3">{feat.title}</h3>
                  <p className="text-sm text-obsidian/60 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LINHA DE PRODUTOS (DARK) */}
      <section id="linha-produtos" className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
        
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
              Linha de produtos
            </h2>
          </div>

          <div className="border-t border-white/10">
            {category.models.map((model, i) => (
              <div 
                key={i} 
                onClick={() => onSelectModel(model.id)}
                className="py-6 border-b border-white/10 flex items-start sm:items-center gap-6 group cursor-pointer hover:bg-white/5 transition-colors -mx-4 px-4 rounded-lg"
              >
                <span className="text-xs font-mono text-white/20 w-6 shrink-0">{model.num}</span>
                <Box size={20} strokeWidth={1} className="text-white/20 group-hover:text-cobalt shrink-0 hidden sm:block transition-colors" />
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-cobalt transition-colors">{model.title}</h3>
                  <p className="text-sm text-white/40 mt-1">{model.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Addons */}
          {category.addons && category.addons.length > 0 && (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
              {category.addons.map((addon, i) => {
                const Icon = addon.icon;
                return (
                  <div key={i}>
                    <Icon size={24} strokeWidth={1} className="text-cobalt mb-4" />
                    <h4 className="font-display font-semibold text-lg text-white mb-2">{addon.title}</h4>
                    <p className="text-sm text-white/40">{addon.desc}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA PRE-FOOTER (DARK) */}
      <section className="py-24 bg-[#0a0b0e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono tracking-widest text-white/20 uppercase block mb-3">
              // Vamos Conversar
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mb-6">
              Interesse em {category.title}?
            </h2>
            <p className="text-base text-white/40 leading-relaxed max-w-md">
              Solicite seu orçamento sem compromisso. Nossa equipe de consultores está pronta para encontrar a solução ideal para sua empresa.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <a href="https://wa.me/5531993092473" target="_blank" rel="noopener noreferrer" className="w-full bg-cobalt text-white py-4 text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300 text-center flex items-center justify-center gap-2">
              Solicitar Orçamento <ArrowRight size={14} />
            </a>
            <a href="tel:+553132451265" className="w-full border border-white/10 text-white/60 py-4 text-xs font-medium tracking-wider uppercase hover:border-white hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2">
              📞 (31) 3245-1265
            </a>
            <button onClick={onBackToHome} className="text-xs text-white/30 uppercase tracking-wider hover:text-white transition-colors mt-4">
              Ver todas as soluções
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}