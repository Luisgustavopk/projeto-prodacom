import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const products = [
  { title: "Relógio de Ponto", spec: "REP // Biometria + RFID + Senha", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/7f30343e8_generated_cdc1095e.png" },
  { title: "Catraca Flap", spec: "Flap // Alto Fluxo + Design Premium", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/30ed482e7_generated_40703af9.png" },
  { title: "Controle Biométrico", spec: "Access // Facial + Digital + Cartão", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/aba616e9b_generated_4ec5bffc.png" },
  { title: "Bastão de Ronda", spec: "Patrol // RFID + GPS + Relatórios", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/82bf69a93_generated_aa707a7d.png" },
  { title: "Software de Gestão", spec: "Platform // Cloud + Integração ERP", image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/544bfd891_generated_3040d10b.png" },
];

export default function ProductGallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-40%"]);

  return (
    <section id="produtos" ref={containerRef} className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
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

      <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-16">
        {products.map((product, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="relative shrink-0 w-72 sm:w-80 md:w-96 group">
            <div className="relative aspect-[3/2] overflow-hidden bg-white/5">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-white/30">Equipamentos homologados e certificados. Garantia e suporte técnico especializado.</p>
          <a href="https://web.whatsapp.com/send?phone=5531993092473" target="_blank" rel="noopener noreferrer" className="bg-cobalt text-white px-6 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-obsidian transition-all duration-300 shrink-0">
            Fale com um Consultor
          </a>
        </div>
      </div>
    </section>
  );
}