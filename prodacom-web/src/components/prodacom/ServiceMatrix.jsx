import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Shield, Fence, Radio, Monitor, CreditCard, ArrowRight } from "lucide-react";
import { imageRegistry } from "../../data/imageRegistry";

const categoryImages = {
  "relogio-de-ponto": imageRegistry.relogioDePonto.noBg.relogioPontoEletronico,
  "controle-de-acesso": imageRegistry.controleDeAcesso.noBg.idfaceFrontalEn,
  "catracas": imageRegistry.catraca.noBg.eletronicaLeitorFacial,
  "ronda": imageRegistry.bastaoDeRonda.noBg.bastaoDeRonda,
  "softwares": imageRegistry.software.noBg.iponto,
  "crachas": imageRegistry.cracha.noBg.pvc,
};

const services = [
  { id: "relogio-de-ponto", num: "01", title: "Relógio de Ponto", desc: "Sistemas REP homologados pelo MTE com biometria, cartão e senha.", icon: Clock },
  { id: "controle-de-acesso", num: "02", title: "Controle de Acesso", desc: "Soluções biométricas e RFID para gerenciamento de acesso.", icon: Shield  },
  { id: "catracas", num: "03", title: "Catracas", desc: "Catracas de pedestal, flap e torniquete com integração biométrica.", icon: Fence  },
  { id: "ronda", num: "04", title: "Bastão de Ronda", desc: "Controle eletrônico de rondas de vigilância.", icon: Radio},
  { id: "softwares", num: "05", title: "Softwares", desc: "Plataformas completas para gestão de ponto, acesso e segurança.", icon: Monitor },
  { id: "crachas", num: "06", title: "Crachás", desc: "Confecção de crachás em PVC com tecnologia RFID.", icon: CreditCard },
];

export default function ServiceMatrix() { 
  const navigate = useNavigate(); 
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="solucoes" className="relative py-24 md:py-32 overflow-hidden bg-ghost">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-obsidian tracking-tight">
            Nossas Soluções
          </h2>
        </motion.div>

        <div className="border-t border-slate_mist" onMouseLeave={function() { setActiveId(null); }}>
          {services.map(function(service, i) {
            const Icon = service.icon;
            const isActive = activeId === service.id;

            return (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08, duration: 0.6 }} 
                onMouseEnter={function() { setActiveId(service.id); }} 
                onClick={function() { navigate(`/categoria/${service.id}`); }}
                className={`border-b border-slate_mist group cursor-pointer transition-colors duration-300 ${isActive ? 'bg-white' : 'hover:bg-white/40'}`}
              >
                {/* CABEÇALHO DA LINHA */}
                <div className="py-6 md:py-8 flex items-center gap-6 md:gap-10 px-4">
                  <span className={`text-xs font-mono w-8 shrink-0 transition-colors ${isActive ? 'text-cobalt' : 'text-obsidian/20'}`}>
                    {service.num}
                  </span>
                  
                  <Icon size={20} strokeWidth={1} className={`shrink-0 hidden sm:block transition-colors duration-300 ${isActive ? 'text-cobalt' : 'text-obsidian/20 group-hover:text-cobalt'}`} />
                  
                  <h3 className={`font-display font-semibold text-lg md:text-2xl transition-colors duration-300 flex-1 ${isActive ? 'text-cobalt' : 'text-obsidian group-hover:text-cobalt'}`}>
                    {service.title}
                  </h3>
                  
                  {/* Seta indicativa */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'border-cobalt bg-cobalt text-white' : 'border-slate_mist text-obsidian/30 group-hover:border-cobalt group-hover:text-cobalt'}`}>
                    <ArrowRight size={14} strokeWidth={isActive ? 2 : 1} className={isActive ? '' : 'group-hover:translate-x-0.5 transition-transform'} />
                  </div>
                </div>

                {/* CORPO EXPANSÍVEL*/}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-8 pt-2 flex flex-col md:flex-row items-center gap-8 md:gap-16 ml-0 md:ml-24 lg:ml-32">
                        
                        {/* Texto e Botão */}
                        <div className="flex-1">
                          <p className="text-sm md:text-base text-obsidian/60 leading-relaxed mb-6 max-w-lg">
                            {service.desc}
                          </p>
                          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-cobalt hover:text-obsidian transition-colors">
                            Ver linha de produtos
                          </span>
                        </div>

                        {/* Imagem do Produto (Se existir) */}
                        {categoryImages[service.id] && (
                          <div className="w-full md:w-48 h-40 shrink-0 relative flex items-center justify-center bg-ghost/50 rounded-xl p-4 border border-slate_mist/50">
                            <div className="absolute w-24 h-24 bg-cobalt/10 blur-[40px] rounded-full" />
                            <motion.img 
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                              src={categoryImages[service.id]} 
                              alt={service.title} 
                              className="max-h-full max-w-full object-contain relative z-10 drop-shadow-md"
                            />
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}