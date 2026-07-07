import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";

const navItems = [
  { label: "Início", href: "#hero" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Produtos", href: "#produtos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function CommandBar({ onNavigateHome }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    
    // Se o usuário estiver na tela de um produto, força o retorno para a Home
    if (onNavigateHome) {
      onNavigateHome();
    }

    // Pequeno intervalo para dar tempo da Home renderizar antes de rolar
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -48 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-12 flex items-center transition-all duration-500 ${
          scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate_mist shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="font-display font-bold text-sm tracking-widest text-obsidian uppercase cursor-pointer"
          >
            PRODACOM
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className="text-xs font-medium tracking-wider uppercase text-obsidian/60 hover:text-cobalt transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cobalt transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+553132451265" className="text-xs font-mono text-obsidian/50 hover:text-cobalt transition-colors">
              (31) 3245-1265
            </a>
            <a
              href="#contato"
              onClick={(e) => { e.preventDefault(); scrollTo("#contato"); }}
              className="text-xs font-medium tracking-wider uppercase bg-cobalt text-white px-4 py-1.5 hover:bg-obsidian transition-colors duration-300 text-center cursor-pointer"
            >
              Orçamento
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-obsidian">
            {menuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-ghost flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); scrollTo(item.href); }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="text-2xl font-display font-semibold tracking-wider uppercase text-obsidian hover:text-cobalt transition-colors">
                  {item.label}
                </motion.a>
              ))}
              <div className="flex flex-col items-center gap-3 mt-6 pt-6 border-t border-slate_mist">
                <a href="tel:+553132451265" className="flex items-center gap-2 text-sm text-obsidian/60"><Phone size={14} strokeWidth={1} /> (31) 3245-1265</a>
                <a href="mailto:comercial@prodacom.com.br" className="flex items-center gap-2 text-sm text-obsidian/60"><Mail size={14} strokeWidth={1} /> comercial@prodacom.com.br</a>
                <button onClick={() => scrollTo("#contato")} className="mt-4 bg-cobalt text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-obsidian transition-colors">Solicite seu Orçamento</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}