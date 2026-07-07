import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Phone, Mail, MapPin, Clock, ArrowRight, ArrowLeft, Check } from "lucide-react";

const steps = [
  { id: 1, label: "Identificação" },
  { id: 2, label: "Detalhes" },
  { id: 3, label: "Mensagem" },
];

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", telefone: "", segmento: "", qtdFuncionarios: "", mensagem: "" });

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Olá! Meu nome é ${form.nome} da empresa ${form.empresa}. ${form.mensagem}`);
    window.open(`https://web.whatsapp.com/send?phone=5531993092473&text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contato" className="relative py-24 md:py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-xs font-mono tracking-widest text-white/20 uppercase block mb-4">05 // Contact_Protocol</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight mb-6">Vamos Conversar</h2>
            <p className="text-base text-white/40 leading-relaxed mb-12 max-w-md">Solicite seu orçamento sem compromisso. Nossa equipe de consultores está pronta para encontrar a solução ideal para sua empresa.</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone size={18} strokeWidth={1} className="text-cobalt mt-0.5" />
                <div>
                  <span className="text-xs text-white/30 uppercase tracking-wider block mb-1">Telefone</span>
                  <a href="tel:+553132451265" className="text-sm text-white/70 hover:text-cobalt transition-colors">(31) 3245-1265</a>
                  <span className="text-white/20 mx-2">|</span>
                  <a href="tel:+5531993092473" className="text-sm text-white/70 hover:text-cobalt transition-colors">(31) 99309-2473</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={18} strokeWidth={1} className="text-cobalt mt-0.5" />
                <div>
                  <span className="text-xs text-white/30 uppercase tracking-wider block mb-1">E-mail</span>
                  <a href="mailto:comercial@prodacom.com.br" className="text-sm text-white/70 hover:text-cobalt transition-colors">comercial@prodacom.com.br</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={18} strokeWidth={1} className="text-cobalt mt-0.5" />
                <div>
                  <span className="text-xs text-white/30 uppercase tracking-wider block mb-1">Localização</span>
                  <p className="text-sm text-white/70">Belo Horizonte — MG</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={18} strokeWidth={1} className="text-cobalt mt-0.5" />
                <div>
                  <span className="text-xs text-white/30 uppercase tracking-wider block mb-1">Horário</span>
                  <p className="text-sm text-white/70">Segunda a Sexta — 08:00 às 17:40</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-cobalt/20 flex items-center justify-center mb-6">
                  <Check size={28} strokeWidth={1} className="text-cobalt" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-white mb-3">Mensagem Enviada</h3>
                <p className="text-sm text-white/40 max-w-sm">Sua solicitação foi encaminhada via WhatsApp. Nossa equipe retornará em breve.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 mb-8">
                  {steps.map((s) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <div className={`w-6 h-6 flex items-center justify-center text-xs font-mono transition-colors ${step >= s.id ? "bg-cobalt text-white" : "bg-white/5 text-white/20"}`}>
                        {s.id}
                      </div>
                      <span className={`text-xs tracking-wider uppercase hidden sm:inline ${step >= s.id ? "text-white/60" : "text-white/20"}`}>{s.label}</span>
                      {s.id < 3 && <div className={`w-8 h-px ${step > s.id ? "bg-cobalt" : "bg-white/10"}`} />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Nome completo *</label>
                        <Input value={form.nome} onChange={(e) => update("nome", e.target.value)} required className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cobalt rounded-none h-11" placeholder="Seu nome" />
                      </div>
                      <div>
                        <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Empresa</label>
                        <Input value={form.empresa} onChange={(e) => update("empresa", e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cobalt rounded-none h-11" placeholder="Nome da empresa" />
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button type="button" onClick={() => form.nome ? setStep(2) : null} className="bg-cobalt hover:bg-white hover:text-obsidian text-white rounded-none px-6 text-xs tracking-wider uppercase">
                          Próximo <ArrowRight size={14} strokeWidth={1} className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">E-mail *</label>
                        <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cobalt rounded-none h-11" placeholder="seu@email.com" />
                      </div>
                      <div>
                        <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Telefone</label>
                        <Input value={form.telefone} onChange={(e) => update("telefone", e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cobalt rounded-none h-11" placeholder="(00) 00000-0000" />
                      </div>
                      <div>
                        <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Segmento</label>
                        <Input value={form.segmento} onChange={(e) => update("segmento", e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cobalt rounded-none h-11" placeholder="Ex: Academia, Escola, Indústria..." />
                      </div>
                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-white/40 hover:text-white rounded-none text-xs tracking-wider uppercase">
                          <ArrowLeft size={14} strokeWidth={1} className="mr-2" /> Voltar
                        </Button>
                        <Button type="button" onClick={() => form.email ? setStep(3) : null} className="bg-cobalt hover:bg-white hover:text-obsidian text-white rounded-none px-6 text-xs tracking-wider uppercase">
                          Próximo <ArrowRight size={14} strokeWidth={1} className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Mensagem *</label>
                        <Textarea value={form.mensagem} onChange={(e) => update("mensagem", e.target.value)} required rows={5} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cobalt rounded-none resize-none" placeholder="Descreva sua necessidade..." />
                      </div>
                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="ghost" onClick={() => setStep(2)} className="text-white/40 hover:text-white rounded-none text-xs tracking-wider uppercase">
                          <ArrowLeft size={14} strokeWidth={1} className="mr-2" /> Voltar
                        </Button>
                        <Button type="submit" className="bg-cobalt hover:bg-white hover:text-obsidian text-white rounded-none px-6 text-xs tracking-wider uppercase">
                          Enviar via WhatsApp <ArrowRight size={14} strokeWidth={1} className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}