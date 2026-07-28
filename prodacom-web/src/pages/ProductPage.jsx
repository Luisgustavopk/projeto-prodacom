import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

import NavBar from "../components/prodacom/NavBar";
import Footer from "../components/prodacom/Footer"; 
import { ProductComposition } from "../components/prodacom/productPage/ProductComposition"; 
import { productsData } from "../data/products";
import { PRODUCT_GALLERY_MAPPING } from "../data/galleryMapping"; 

export default function ProductPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const product = productsData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-ghost flex flex-col items-center justify-center text-obsidian p-6">
        <h1 className="font-display font-bold text-2xl mb-4">Produto não encontrado</h1>
        <button onClick={() => navigate("/")} className="bg-cobalt text-white px-6 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-obsidian transition-all">
          Voltar ao início
        </button>
      </div>
    );
  }

  const galleryImages = (PRODUCT_GALLERY_MAPPING[product.id] || []).filter(Boolean);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="min-h-screen bg-ghost font-sans animate-fadeIn">
      <NavBar />

      {/* SEÇÃO 1: HERO */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4 leading-tight">
                {product.title}
              </h1>
              <h2 className="text-xl text-sky-600 font-medium mb-6">
                {product.subtitle}
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-10 max-w-lg text-justify">
                {product.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button onClick={() => navigate("/#contato")} className="w-full sm:w-auto bg-cobalt text-white px-8 py-3 text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300 text-center flex items-center justify-center gap-2">
                  Solicitar Orçamento <ArrowRight size={14} />
                </button>
                <button onClick={() => navigate(-1)} className="w-full sm:w-auto text-white/90 hover:text-white text-2xs font-medium tracking-wider uppercase transition-colors py-3">
                  &larr; Voltar
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative flex justify-center">
              <div className="absolute w-72 h-72 bg-cobalt/20 blur-[120px] rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <motion.img animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} src={product.image} alt={product.title} className="relative z-10 max-h-96 w-auto object-contain drop-shadow-2xl mix-blend-screen" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 2: DIFERENCIAIS */}
      <section className="py-24 bg-ghost">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="font-display font-bold text-2xl md:text-4xl text-obsidian tracking-tight">Diferenciais da <span className="text-cobalt">Nossa Solução</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features?.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="bg-white border border-slate_mist p-8 hover:shadow-md transition-all duration-300 group rounded-xl">
                  <div className="w-10 h-10 bg-ghost group-hover:bg-cobalt/10 flex items-center justify-center rounded-lg mb-6 transition-colors">
                    <Icon size={20} className="text-obsidian group-hover:text-cobalt transition-colors" />
                  </div>
                  <h4 className="font-display font-semibold text-base text-obsidian mb-2">{feat.title}</h4>
                  <p className="text-xs text-obsidian/50 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: DESIGN DA SOLUÇÃO (COMPONENTE ISOLADO) */}
      {galleryImages.length > 0 && (
        <section className="py-24 bg-white border-t border-slate_mist overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <span className="text-xs font-mono tracking-widest text-cobalt uppercase block mb-3">Visão Detalhada</span>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-obsidian tracking-tight">Design da Solução</h3>
            </div>
            
            <ProductComposition images={galleryImages} title={product.title} />
          </div>
        </section>
      )}

      {/* SEÇÃO 4: DADOS TÉCNICOS */}
      <section className="py-24 bg-ghost border-t border-slate_mist">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-obsidian tracking-tight">Dados técnicos</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24">
            {product.specs?.map((spec, i) => (
              <div key={i} className="py-5 border-b border-slate_mist flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                <span className="text-sm text-obsidian/50">{spec.label}</span>
                <span className="text-sm font-mono font-medium text-obsidian text-left sm:text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: CTA PRE-FOOTER */}
      <section className="py-24 bg-[#0a0b0e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mb-6">Interesse nesse Produto?</h2>
            <p className="text-base text-white/40 leading-relaxed max-w-md">Solicite seu orçamento sem compromisso. Nossa equipe de consultores está pronta para encontrar a solução ideal para sua empresa.</p>
          </div>
          <div className="flex flex-col gap-4">
            <a href="https://wa.me/5531993092473" target="_blank" rel="noopener noreferrer" className="w-full bg-cobalt text-white py-4 text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300 text-center flex items-center justify-center gap-2">
              Solicitar Orçamento no WhatsApp <ArrowRight size={14} />
            </a>
            <a href="tel:+553132451265" className="w-full border border-white/10 text-white/60 py-4 text-xs font-medium tracking-wider uppercase hover:border-white hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2">
              <Phone size={18} className="text-cobalt" /> (31) 3245-1265
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}