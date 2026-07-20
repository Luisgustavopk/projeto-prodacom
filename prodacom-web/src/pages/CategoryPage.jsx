import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";

import NavBar from "../components/prodacom/NavBar";
import Footer from "../components/prodacom/Footer"; 

import { catalogData } from "../data/catalog";
import { productsData } from "../data/products";
import { imageRegistry } from "../data/imageRegistry";
import { useCarouselAutoplay } from "../hooks/useCarouselAutoplay";


const PRODUCT_NO_BG_MAPPING = {
  // Controle de Acesso
  "idface": imageRegistry.controleDeAcesso?.noBg?.idfaceFrontalEn,
  "idface-max": imageRegistry.controleDeAcesso?.noBg?.idfaceMaxFrontal,
  "idlock-bio": imageRegistry.controleDeAcesso?.noBg?.idlockBioFrente,
  "idlock": imageRegistry.controleDeAcesso?.noBg?.idlockFrente,

  // Relógio de Ponto
  "leitor-facial-f4": imageRegistry.relogioDePonto?.noBg?.controlePontoFacial,
  "inner-rep-plus": imageRegistry.relogioDePonto?.noBg?.relogioPontoEletronico,

  // Catracas
  "catraca-revolution": imageRegistry.catraca?.noBg?.eletronicaLeitorFacial,
  "catraca-box": imageRegistry.catraca?.noBg?.inoxLeitorFacial,
  "idblock-next": imageRegistry.catraca?.noBg?.idblockNextSemIdface,
  "idblock-pne": imageRegistry.catraca?.noBg?.idblockPcdPerspectiva,
  "catraca-fit": imageRegistry.catraca?.noBg?.paraAcademia,

  // Crachás
  "crachas-pvc": imageRegistry.cracha?.noBg?.pvc,
  "crachas-rfid": imageRegistry.cracha?.noBg?.rfid,

  // Bastão de Ronda
  "bastao-viggia": imageRegistry.bastaoDeRonda?.noBg?.bastaoDeRonda,

  // Softwares
  "software-iclube": imageRegistry.software?.noBg?.iclube,
  "software-iponto": imageRegistry.software?.noBg?.iponto,
  "software-icontrol": imageRegistry.software?.noBg?.icontrol,
  "software-ifitness": imageRegistry.software?.noBg?.ifitness,
  "software-refcontrol": imageRegistry.software?.noBg?.refcontrol,
  "software-school": imageRegistry.software?.noBg?.school
};

export default function CategoryPage() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const category = catalogData[id];
  const carouselItems = category?.models || [];

  const {
    activeSlide,
    handleNext,
    handlePrev,
    startAutoplay,
    stopAutoplay,
  } = useCarouselAutoplay(carouselItems.length, 2500);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!category) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center text-white p-6">
        <h1 className="font-display font-bold text-2xl mb-4">Categoria não encontrada</h1>
        <button 
          onClick={() => navigate("/")} 
          className="bg-cobalt border border-white/10 px-6 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all"
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-obsidian font-sans text-white"
    >
      <NavBar />

      {/* 1. HERO SECTION COM CARROSSEL ADAPTÁVEL E CENTRALIZADO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/5">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          
          {/* Botão Voltar usando rota nativa */}
          <motion.button 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="text-white/90 hover:text-white text-2xs font-mono tracking-widest uppercase mb-8 flex items-center gap-2 transition-colors"
          >
            &larr; Voltar ao início
          </motion.button>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Esquerda: Informações da Categoria */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="lg:col-span-4 max-w-xl"
            >
              <span className="text-xs font-mono tracking-widest text-cobalt uppercase block mb-3">
                Categoria de Soluções
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mb-6 leading-tight">
                {category.title}
              </h1>
              <p className="text-base text-white/50 leading-relaxed mb-8 max-w-md">
                {category.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => document.getElementById('linha-produtos')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="w-full sm:w-auto bg-cobalt border border-white/10 text-white px-8 py-3.5 text-xs font-medium tracking-wider uppercase hover:border-white hover:bg-white hover:text-obsidian transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Linha de Produtos <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* Direita: Janela do Carrossel */}
            <div 
              className="lg:col-span-8 relative w-full flex items-center justify-center"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
            >
              {carouselItems.length > 0 && (
                <div className="relative h-[480px] md:h-[580px] w-full flex items-center justify-center overflow-hidden">
                  
                  {/* Setas de Navegação Laterais Discretas */}
                  {carouselItems.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrev} 
                        className="absolute left-2 z-30 p-2.5 rounded-full border border-white/5 bg-obsidian/40 text-white/40 hover:text-white hover:bg-obsidian/85 hover:border-white/20 transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={handleNext} 
                        className="absolute right-2 z-30 p-2.5 rounded-full border border-white/5 bg-obsidian/40 text-white/40 hover:text-white hover:bg-obsidian/85 hover:border-white/20 transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Renderizador com Centralização Total e Tamanho Máximo Adaptável */}
                  <AnimatePresence mode="wait">
                    {carouselItems.map((model, idx) => {
                      if (idx !== activeSlide) return null;
                      
                      const productInfo = productsData[model.id];
                      const noBgImage = PRODUCT_NO_BG_MAPPING[model.id];
                      const isTransparent = !!noBgImage;
                      const productImage = noBgImage || productInfo?.image || model.image;

                      return (
                        <motion.div
                          key={model.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.35 }}
                          className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 w-full h-full select-none"
                        >
                          {/* Glow Radial Circular Suave sem bordas marcadas */}
                          {isTransparent && (
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[380px] md:h-[380px] bg-cobalt/20 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />
                          )}

                          <div className="relative flex items-center justify-center w-full h-full">
                            {productImage && (
                              <img 
                                src={productImage} 
                                alt={model.title} 
                                onClick={() => navigate(`/produto/${model.id}`)}
                                className={`w-full h-full object-contain cursor-pointer transition-transform duration-500 ${
                                  isTransparent 
                                    ? "drop-shadow-[0_15px_25px_rgba(0,0,0,0.55)] hover:scale-[1.03]" 
                                    : "hover:scale-[1.02]"
                                }`}
                              />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                </div>
              )}
            </div>

          </div>
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
            {category.benefits?.map((feat, i) => {
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
      <section id="linha-produtos" className="py-24 bg-obsidian border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
              Linha de produtos
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {carouselItems.map((model, i) => {
              const productInfo = productsData[model.id];
              const productImage = productInfo?.image || model.image;

              return (
                <div 
                  key={i} 
                  onClick={() => navigate(`/produto/${model.id}`)}
                  className="bg-white/[0.02] border border-white/5 hover:border-cobalt/30 p-8 rounded-2xl flex items-center gap-8 cursor-pointer hover:bg-white/[0.04] transition-all duration-300 group"
                >
                  {productImage && (
                    <div className="w-28 h-28 lg:w-56 lg:h-56 shrink-0 flex items-center justify-center bg-obsidian rounded-xl p-3 border border-white/5 group-hover:border-cobalt/20 transition-all">
                      <img 
                        src={productImage} 
                        alt={model.title} 
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-white/30 block mb-1">
                      PRODUTO {model.num}
                    </span>
                    <h3 className="font-display font-semibold text-xl text-white group-hover:text-cobalt transition-colors truncate">
                      {model.title}
                    </h3>
                    <p className="text-sm text-white/40 mt-2 line-clamp-2 leading-relaxed">
                      {model.desc}
                    </p>
                  </div>

                  <div className="shrink-0 text-white/20 group-hover:text-cobalt transition-colors pl-2">
                    <ArrowRight size={22} />
                  </div>
                </div>
              );
            })}
          </div>

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
              <Phone size={18} strokeWidth={1} className="text-cobalt mt-0.5" />(31) 3245-1265
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}