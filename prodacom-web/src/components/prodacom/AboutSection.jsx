import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Gem } from "lucide-react";

const ABOUT_IMAGE = "https://media.base44.com/images/public/6a4d2719c2a64d5a6895b440/0e2da34b3_generated_100f781b.png";

const pillars = [
  { icon: Target, title: "Missão", text: "Comercializar, implantar, manter e gerir soluções integradas de Controle de Ponto e Acesso com excelência e comprometimento." },
  { icon: Eye, title: "Visão", text: "Ser a empresa líder em soluções integradas de Controle de Ponto e Acesso, referência em inovação e qualidade no mercado nacional." },
  { icon: Gem, title: "Valores", text: "Qualidade, integridade, melhoria contínua, inovação sustentável, valorização do capital humano e comprometimento com resultados." },
];

const stats = [
  { value: "10+", label: "Anos de Mercado" },
  { value: "500+", label: "Empresas Atendidas" },
  { value: "24/7", label: "Suporte Técnico" },
  { value: "100%", label: "Equipamentos Homologados" },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 md:mb-24">
          <span className="text-xs font-mono tracking-widest text-obsidian/30 uppercase block mb-4">04 // About_Prodacom</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-obsidian tracking-tight max-w-3xl">Tecnologia que transforma a gestão do seu negócio</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={ABOUT_IMAGE} alt="Sede corporativa da Prodacom Tecnologia" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 md:-right-6 bg-cobalt p-6">
              <span className="block font-display font-bold text-3xl text-white">10+</span>
              <span className="text-xs text-white/60 tracking-wider uppercase">Anos de Mercado</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
            <p className="text-base md:text-lg text-obsidian/60 leading-relaxed mb-8">
              A <strong className="text-obsidian font-semibold">Prodacom Tecnologia</strong> é uma empresa especializada em prover soluções para Controle de Acesso e Ponto informatizado. Atuamos no mercado há mais de 10 anos, especializados em sistemas para gestão de academias, clubes, escolas e empresas de todos os portes.
            </p>
            <p className="text-base md:text-lg text-obsidian/60 leading-relaxed mb-10">
              Contamos com parceiros consolidados no mercado nacional e internacional, oferecendo equipamentos homologados, suporte técnico especializado e soluções sob medida para cada necessidade.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-slate_mist pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block font-display font-bold text-2xl text-obsidian">{stat.value}</span>
                  <span className="text-xs text-obsidian/40 tracking-wider uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate_mist">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="bg-ghost p-8 md:p-10">
                <Icon size={24} strokeWidth={1} className="text-cobalt mb-6" />
                <h3 className="font-display font-semibold text-lg text-obsidian mb-3">{pillar.title}</h3>
                <p className="text-sm text-obsidian/50 leading-relaxed">{pillar.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}