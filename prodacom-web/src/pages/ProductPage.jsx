import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

import NavBar from "../components/prodacom/NavBar";
import Footer from "../components/prodacom/Footer"; 

// Importa a central de registro de imagens
import { imageRegistry } from "../data/imageRegistry";

// Mapeador dinâmico em Array: Coloque as imagens na ordem que deseja (Ex: [Principal, Fundo/Lado])
const PRODUCT_GALLERY_MAPPING = {
  // Controle de Acesso
  "idface": [
    imageRegistry.controleDeAcesso?.newBg?.idfacePerspectivaAEn,
    imageRegistry.controleDeAcesso?.newBg?.idfaceFrontalEn
  ],
  "idface-max": [
    imageRegistry.controleDeAcesso?.newBg?.idfaceMaxPerspectiva,
    imageRegistry.controleDeAcesso?.newBg?.idfaceMaxFrontal
  ],
  "idlock-bio": [
    imageRegistry.controleDeAcesso?.newBg?.idlockBioPerspectiva,
    imageRegistry.controleDeAcesso?.newBg?.idlockBioFrente,
    imageRegistry.controleDeAcesso?.newBg?.idlockInternoFrente
    
  ],
  "idlock": [
    imageRegistry.controleDeAcesso?.newBg?.idlockPerspectiva,
    imageRegistry.controleDeAcesso?.newBg?.idlockFrente,
    imageRegistry.controleDeAcesso?.newBg?.idlockInternoFrente
  ],

  // Relógio de Ponto
  "leitor-facial-f4": [
    imageRegistry.relogioDePonto?.newBg?.leitorFacialParaControlePonto,
    imageRegistry.relogioDePonto?.newBg?.controlePontoFacial,

  ],
  "inner-rep-plus": [
    imageRegistry.relogioDePonto?.newBg?.relogioPontoHomologado,
    imageRegistry.relogioDePonto?.newBg?.relogioPontoEletronico
  ],

  // Catracas
  "catraca-revolution": [
    imageRegistry.catraca?.newBg?.eletronicaAntiPanico1024,
    imageRegistry.catraca?.newBg?.eletronicaLeitorFacial1024,
    imageRegistry.catraca?.newBg?.eletronicaReconhecimentoFacial,
  ],
  "catraca-box": [
    imageRegistry.catraca?.newBg?.inox,
    imageRegistry.catraca?.newBg?.balcao,
    imageRegistry.catraca?.newBg?.inoxComLeitorFacial
  ],
  "idblock-next": [
    imageRegistry.catraca?.newBg?.idblockNextComIdface,
    imageRegistry.catraca?.newBg?.idblockNextSemIdface
  ],
  "idblock-pne": [
    imageRegistry.catraca?.newBg?.idblockPcdFrontal,
    imageRegistry.catraca?.newBg?.idblockPcdPerspectiva,
  ],
  "catraca-fit": [
    imageRegistry.catraca?.newBg?.paraAcademia1024,
    imageRegistry.catraca?.newBg?.biometrica
  ]
};

export default function ProductPage({ product, onBackToHome }) {
  // Rola para o topo sempre que o produto mudar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) return null;

  // Filtra as imagens cadastradas removendo possíveis valores 'undefined'
  const galleryImages = (PRODUCT_GALLERY_MAPPING[product.id] || []).filter(Boolean);

  return (
    <div className="min-h-screen bg-ghost animate-fadeIn">
      <NavBar onNavigateHome={onBackToHome} />

      {/* SEÇÃO 1: HERO (Visual Escuro Premium) */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Texto */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4 leading-tight">
                {product.title}
              </h1>
              <h2 className="text-xl text-cobalt font-medium mb-6">
                {product.subtitle}
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-10 max-w-lg text-justify">
                {product.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a 
                  href="https://wa.me/5531993092473" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto bg-cobalt text-white px-8 py-3 text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  Solicitar Orçamento <ArrowRight size={14} />
                </a>
                <button 
                  onClick={onBackToHome}
                  className="w-full sm:w-auto text-white/90 hover:text-white text-2xs font-medium tracking-wider uppercase transition-colors py-3"
                >
                  &larr; Voltar
                </button>
              </div>
            </motion.div>

            {/* Imagem Flutuante Principal */}
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative flex justify-center">
              <div className="absolute w-72 h-72 bg-cobalt/20 blur-[120px] rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <motion.img 
                animate={{ y: [0, -3, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                src={product.image} 
                alt={product.title} 
                className="relative z-10 max-h-96 w-auto object-contain drop-shadow-2xl mix-blend-screen"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 2: DIFERENCIAIS (Design Limpo) */}
      <section className="py-24 bg-ghost">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="font-display font-bold text-2xl md:text-4xl text-obsidian tracking-tight">
              Diferenciais da <span className="text-cobalt">Nossa Solução</span>
            </h3>
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

      {/* SEÇÃO 3: COMPOSIÇÃO DE DESIGN (Galeria Estática Estilo Apple) */}
      {galleryImages.length > 0 && (
        <section className="py-24 bg-white border-t border-slate_mist overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <span className="text-xs font-mono tracking-widest text-cobalt uppercase block mb-3">Visão Detalhada</span>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-obsidian tracking-tight">
                Design em Detalhes
              </h3>
            </div>
            
            <ProductComposition images={galleryImages} title={product.title} />
          </div>
        </section>
      )}

      {/* SEÇÃO 4: TABELA ESPECIFICAÇÕES */}
      <section className="py-24 bg-ghost border-t border-slate_mist">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-obsidian tracking-tight">
              Dados técnicos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24">
            {product.specs?.map((spec, i) => (
              <div key={i} className="py-5 border-b border-slate_mist flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                <span className="text-sm text-obsidian/50">
                  {spec.label}
                </span>
                <span className="text-sm font-mono font-medium text-obsidian text-left sm:text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SEÇÃO 5: CTA PRE-FOOTER */}
      <section className="py-24 bg-[#0a0b0e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono tracking-widest text-white/20 uppercase block mb-3">
              // Vamos Conversar
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mb-6">
              Interesse nesse Produto?
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
              <Phone size={18} strokeWidth={1} className="text-cobalt mt-0.5" /> (31) 3245-1265
            </a>
            <button onClick={onBackToHome} className="text-xs text-white/30 uppercase tracking-wider hover:text-white transition-colors mt-4">
              Ver todas as soluções
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ============================================================================
// COMPONENTE AUXILIAR: Composição Fotográfica Elegante (Sem Carrossel)
// ============================================================================
function ProductComposition({ images, title }) {
  if (!images || images.length === 0) return null;

  // LAYOUT 1: Apenas uma imagem extra (Centralizada e Grande)
  if (images.length === 1) {
    return (
      <div className="flex justify-center w-full">
        <motion.img 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          src={images[0]} alt={`${title} Detalhe`} 
          className="w-full max-w-2xl h-auto object-contain mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-700"
        />
      </div>
    );
  }

  // LAYOUT 2: Duas imagens (Uma principal na frente, outra menor atrás/deslocada criando profundidade)
  if (images.length === 2) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto relative px-4">
        {/* Imagem 1 (Destaque principal) */}
        <motion.img
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
          src={images[0]} alt={`${title} Visão Principal`}
          className="w-[85%] md:w-[55%] h-auto object-contain mix-blend-multiply drop-shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-500"
        />
        {/* Imagem 2 (Secundária, levemente menor e sobreposta) */}
        <motion.img
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          src={images[1]} alt={`${title} Visão Secundária`}
          className="w-[70%] md:w-[45%] h-auto object-contain mix-blend-multiply drop-shadow-md z-0 -mt-16 md:mt-24 md:-ml-20 opacity-95 hover:-translate-y-2 transition-transform duration-500"
        />
      </div>
    );
  }

  // LAYOUT 3: Três ou mais imagens (Uma no centro, ladeada por detalhes menores)
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto relative px-4">
       <motion.img
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          src={images[1]} alt={`${title} Visão Esquerda`}
          className="hidden md:block w-[30%] h-auto object-contain mix-blend-multiply drop-shadow-md z-0 mt-20 -mr-16 opacity-90"
        />
        <motion.img
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          src={images[0]} alt={`${title} Visão Principal`}
          className="w-[85%] md:w-[45%] h-auto object-contain mix-blend-multiply drop-shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-500"
        />
        <motion.img
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          src={images[2]} alt={`${title} Visão Direita`}
          className="w-[70%] md:w-[30%] h-auto object-contain mix-blend-multiply drop-shadow-md z-0 -mt-12 md:mt-20 md:-ml-16 opacity-90"
        />
    </div>
  );
}