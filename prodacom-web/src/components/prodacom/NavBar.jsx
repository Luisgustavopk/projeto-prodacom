import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, Clock, ClipboardCheck, Dumbbell, ShieldCheck, Users } from "lucide-react";

import logoProdacom from "../../assets/images/logo/logo-prodacom-6-nbg.png";

// Href alterado para "/" no item Início
const navItems = [
  { label: "Início", href: "/" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Produtos", href: "#produtos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const webSolutions = [
  { label: "Iponto Marcação Web", href: "https://ipontomobile.com.br/iponto_web/", icon: Clock },
  { label: "Iponto Gestor", href: "https://ipontogestor.inspell.com.br/iponto/login/", icon: ClipboardCheck },
  { label: "Ifitness Gestor", href: "https://ifitnessmobile.inspell.com.br/gestor/", icon: Dumbbell },
  { label: "IDSecure", href: "https://idsecure.com.br/auth/login", icon: ShieldCheck },
  { label: "RHiD", href: "https://www.rhid.com.br/v2/#/login", icon: Users }
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(function () {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  function handleNavigation(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    setDropdownOpen(false);
    
    const isHome = location.pathname === "/";

    if (href === "/") {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState("", document.title, "/");
      } else {
        navigate("/");
      }
      return;
    }

    if (isHome) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/${href}`); 
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -48 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center py-3.5 bg-white border-b border-slate_mist shadow-sm"
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            onClick={function (e) { handleNavigation(e, "/"); }}
            className="font-display font-bold text-sm tracking-widest text-obsidian uppercase cursor-pointer flex items-center shrink-0"
          >
            <img 
              src={logoProdacom} 
              alt="Prodacom Tecnologia" 
              className="h-11 md:h-12 w-auto object-contain opacity-100"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(function (item) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={function (e) { handleNavigation(e, item.href); }}
                  className="text-xs font-medium tracking-wider uppercase text-obsidian/60 hover:text-cobalt transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-cobalt transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+553132451265" className="text-xs font-mono text-obsidian/50 hover:text-cobalt transition-colors">
              (31) 3245-1265
            </a>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={function () { setDropdownOpen(!dropdownOpen); }}
                className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase bg-cobalt text-white px-4 py-2 hover:bg-obsidian transition-all duration-500 cursor-pointer"
              >
                Acessar Soluções Web
                <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-slate_mist shadow-lg rounded-sm overflow-hidden"
                  >
                    <div className="py-2">
                      {webSolutions.map(function (solution, idx) {
                        const Icon = solution.icon;
                        return (
                          <a
                            key={idx}
                            href={solution.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={function () { setDropdownOpen(false); }}
                            className="flex items-center gap-3 px-4 py-3 text-xs font-medium text-obsidian/70 hover:text-cobalt hover:bg-ghost transition-colors"
                          >
                            <Icon size={16} strokeWidth={1.5} />
                            {solution.label}
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button onClick={function () { setMenuOpen(!menuOpen); }} className="md:hidden text-obsidian">
            {menuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }} 
            className="fixed inset-0 z-40 bg-ghost flex flex-col justify-center items-center overflow-y-auto pt-20 pb-10"
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-sm px-6">
              {navItems.map(function (item, i) {
                return (
                  <motion.a 
                    key={item.label} 
                    href={item.href} 
                    onClick={function (e) { handleNavigation(e, item.href); }} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.08 }} 
                    className="text-xl font-display font-semibold tracking-wider uppercase text-slate-800 hover:text-cobalt transition-colors"
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              <div className="w-full flex flex-col items-center gap-4 mt-8 pt-8 border-t border-slate_mist">
                <div className="w-full bg-white border border-slate_mist rounded-sm p-4 mb-4">
                  <h4 className="text-xs font-medium tracking-widest text-cobalt uppercase mb-4 text-center">Soluções Web</h4>
                  <div className="flex flex-col gap-3">
                    {webSolutions.map(function (solution, idx) {
                      const Icon = solution.icon;
                      return (
                        <a
                          key={idx}
                          href={solution.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-sm font-medium text-obsidian/70 hover:text-cobalt transition-colors py-2 border border-ghost hover:border-cobalt/20"
                        >
                          <Icon size={16} strokeWidth={1.5} />
                          {solution.label}
                        </a>
                      );
                    })}
                  </div>
                </div>

                <a href="tel:+553132451265" className="flex items-center gap-2 text-sm text-obsidian/60">
                  <Phone size={14} strokeWidth={1} /> (31) 3245-1265
                </a>
                <a href="mailto:comercial@prodacom.com.br" className="flex items-center gap-2 text-sm text-obsidian/60">
                  <Mail size={14} strokeWidth={1} /> comercial@prodacom.com.br
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}