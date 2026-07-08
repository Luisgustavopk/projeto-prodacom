import React from "react";
import { motion } from "framer-motion";

// Importação das imagens locais
import logoTopdata from "../../assets/images/Topdata.png";
import logoInspell from "../../assets/images/inspell.jpg";

const partners = [
  { id: "topdata", name: "Topdata", logo: logoTopdata },
  { id: "inspell", name: "Inspell", logo: logoInspell },
];

export default function PartnersBar() {
  return (
    <section className="py-16 bg-ghost border-t border-slate_mist">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* NOVO TÍTULO: Mais chamativo que o anterior, mas menos que as seções principais */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="font-display font-semibold text-xl md:text-2xl text-obsidian/80 tracking-tight inline-block border-b-2 border-current pb-2">
            Nossos Parceiros Oficiais
          </h3>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <img
                src={partner.logo}
                alt={`Parceiro ${partner.name}`}
                className="h-10 md:h-18 w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 mix-blend-multiply"
              />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}