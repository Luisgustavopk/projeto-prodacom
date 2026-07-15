import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

import logoProdacom from "../../assets/images/logo-prodacom-6-nbg.png";

const navItems = [
  { label: "Início", href: "#hero" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Produtos", href: "#produtos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function CommandBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    // Dispara o evento global para a Home ouvir e trocar de tela
    window.dispatchEvent(new CustomEvent('navigate-hash', { detail: href }));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-500 py-3.5 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-xl border-b border-slate_mist shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNavigation(e, "#hero")}
            className="font-display font-bold text-sm tracking-widest text-obsidian uppercase cursor-pointer flex items-center shrink-0"
          >
            <img 
              src={logoProdacom} 
              alt="Prodacom Tecnologia" 
              className={`h-11 md:h-12 w-auto object-contain transition-opacity duration-500 ${
                scrolled ? "opacity-100" : "opacity-30"
              }`}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
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
              onClick={(e) => handleNavigation(e, "#contato")}
              className={`text-xs font-medium tracking-wider uppercase bg-cobalt text-white px-4 py-1.5 hover:bg-obsidian hover:opacity-100 transition-all duration-500 text-center cursor-pointer ${
                scrolled ? "opacity-100" : "opacity-35"
              }`}
            >
              Orçamento
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-obsidian">
            {menuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
          </button>
        </div>
      </nav>

      {/* Menu responsivo sem dependência do Framer Motion */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-ghost flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={(e) => handleNavigation(e, item.href)} 
                className="text-xl font-display font-semibold tracking-wider uppercase text-slate-800 hover:text-sky-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col items-center gap-3 mt-6 pt-6 border-t border-slate_mist">
              <a href="tel:+553132451265" className="flex items-center gap-2 text-sm text-obsidian/60">
                <Phone size={14} strokeWidth={1} /> (31) 3245-1265
              </a>
              <a href="mailto:comercial@prodacom.com.br" className="flex items-center gap-2 text-sm text-obsidian/60">
                <Mail size={14} strokeWidth={1} /> comercial@prodacom.com.br
              </a>
              <button 
                onClick={(e) => handleNavigation(e, "#contato")} 
                className="mt-4 bg-cobalt text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-obsidian transition-colors"
              >
                Solicite seu Orçamento
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}