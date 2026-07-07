import React from "react";
import { motion } from "framer-motion";

const partners = ["TOPDATA", "INSPELL", "DIMEP", "HENRY", "CONTROL ID"];

export default function PartnersBar() {
  return (
    <section className="py-16 md:py-20 border-t border-slate_mist">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-obsidian/20 uppercase">Parceiros // Tecnologia de Confiança</span>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner, i) => (
            <motion.div key={partner} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="group">
              <span className="font-display font-bold text-lg md:text-xl tracking-widest text-obsidian/10 group-hover:text-obsidian/30 transition-colors duration-500 uppercase">{partner}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}