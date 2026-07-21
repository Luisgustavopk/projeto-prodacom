import React from "react";
import { motion } from "framer-motion";

// Importação das imagens locais
import logoTopdata from "../../assets/images/logo/Topdata.png";
import logoInspell from "../../assets/images/logo/inspell.jpg";
import logoControlid from "../../assets/images/logo/controlid.jpg";

const partners = [
  { id: "topdata", name: "Topdata", logo: logoTopdata },
  { id: "inspell", name: "Inspell", logo: logoInspell },
  { id: "controlid", name: "Controlid", logo: logoControlid },
];

export default function PartnersBar() {
  return (
    <section className="py-12 md:py-16 bg-ghost border-t border-slate_mist">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h3 className="font-display font-semibold text-lg md:text-2xl text-obsidian/80 tracking-tight inline-block border-b-2 border-current pb-2">
            Nossos Parceiros Oficiais
          </h3>
        </motion.div>

        {/* Ajustado os gaps no mobile para dar mais espaço e alinhamento */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-24">
          {partners.map(function (partner, i) {
            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group cursor-pointer"
              >
                {/* - Mobile: h-12 (48px) ou h-14 (56px) para dar mais destaque
                  - Tablet/Desktop: md:h-16 (64px)
                */}
                <img
                  src={partner.logo}
                  alt={`Parceiro ${partner.name}`}
                  className="h-14 sm:h-16 md:h-22 w-auto object-contain opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300 mix-blend-multiply"
                />
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}