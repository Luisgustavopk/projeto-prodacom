import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Shield, Fence, Radio, Monitor, CreditCard, ArrowRight } from "lucide-react";

const services = [
  { id: "ponto", num: "01", title: "Relógio de Ponto", desc: "Sistemas REP homologados pelo MTE com biometria, cartão e senha.", icon: Clock, image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/7f30343e8_generated_cdc1095e.png" },
  { id: "acesso", num: "02", title: "Controle de Acesso", desc: "Soluções biométricas e RFID para gerenciamento de acesso.", icon: Shield, image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/aba616e9b_generated_4ec5bffc.png" },
  { id: "catracas", num: "03", title: "Catracas", desc: "Catracas de pedestal, flap e torniquete com integração biométrica.", icon: Fence, image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/30ed482e7_generated_40703af9.png" },
  { id: "ronda", num: "04", title: "Bastão de Ronda", desc: "Controle eletrônico de rondas de vigilância.", icon: Radio, image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/82bf69a93_generated_aa707a7d.png" },
  { id: "software", num: "05", title: "Softwares", desc: "Plataformas completas para gestão de ponto, acesso e segurança.", icon: Monitor, image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/544bfd891_generated_3040d10b.png" },
  { id: "crachas", num: "06", title: "Crachás", desc: "Confecção de crachás em PVC com tecnologia RFID.", icon: CreditCard, image: "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/6903d7954_generated_de96904b.png" },
];

export default function ServiceMatrix() {
  const [activeId, setActiveId] = useState(null);
  const activeService = services.find((s) => s.id === activeId);

  return (
    <section id="solucoes" className="relative py-24 md:py-32 overflow-hidden">
      <AnimatePresence>
        {activeService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 pointer-events-none">
            <img src={activeService.image} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 md:mb-24">
          <span className="text-xs font-mono tracking-widest text-obsidian/30 uppercase block mb-4">02 // Capability_Matrix</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-obsidian tracking-tight">Nossas Soluções</h2>
        </motion.div>

        <div className="border-t border-slate_mist">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} onMouseEnter={() => setActiveId(service.id)} onMouseLeave={() => setActiveId(null)} className="border-b border-slate_mist group cursor-pointer">
                <div className="py-6 md:py-8 flex items-center gap-6 md:gap-10">
                  <span className="text-xs font-mono text-obsidian/20 w-8 shrink-0">{service.num}</span>
                  <Icon size={20} strokeWidth={1} className="text-obsidian/20 group-hover:text-cobalt transition-colors duration-300 shrink-0 hidden sm:block" />
                  <h3 className="font-display font-semibold text-lg md:text-2xl text-obsidian group-hover:text-cobalt transition-colors duration-300 flex-1">{service.title}</h3>
                  <p className="hidden lg:block max-w-sm text-sm text-obsidian/40 group-hover:text-obsidian/60 transition-colors duration-300">{service.desc}</p>
                  <ArrowRight size={16} strokeWidth={1} className="text-obsidian/10 group-hover:text-cobalt group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                </div>
                <p className="lg:hidden px-0 pb-4 ml-14 sm:ml-24 text-sm text-obsidian/40">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}