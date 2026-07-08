import React from "react";
import { ArrowUpRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import logoProdacom from "../../assets/images/logo-prodacom-6.jpg";

const quickLinks = [
  { label: "Início", href: "#hero" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Produtos", href: "#produtos" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

// Atualizamos para conter os IDs exatos do nosso banco de dados
const productLinks = [
  { label: "Relógio de Ponto", id: "relogio-de-ponto" },
  { label: "Controle de Acesso", id: "controle-de-acesso" },
  { label: "Catracas", id: "catracas" },
  { label: "Bastão de Ronda", id: "ronda" },
  { label: "Softwares", id: "software" },
  { label: "Crachás", id: "crachas" },
];

export default function Footer() {
  
  // Função para links comuns (rola a página ou volta pra Home)
  const handleQuickLink = (e, href) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate-hash', { detail: href }));
  };

  // Função para links de produtos (abre a categoria específica)
  const handleProductLink = (e, id) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate-category', { detail: id }));
  };

  return (
    <footer className="bg-obsidian border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <img 
              src={logoProdacom} 
              alt="Prodacom Tecnologia" 
              className="h-10 w-auto object-contain invert mix-blend-screen opacity-90"
            />
            <p className="mt-4 text-sm text-white/30 leading-relaxed">Soluções integradas de controle de ponto e acesso. Tecnologia e confiabilidade há mais de 10 anos no mercado.</p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.facebook.com/prodacom.tecnologia.3" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/5 text-white/40 hover:bg-cobalt hover:text-white transition-all duration-300">
                <FaFacebook size={14} />
              </a>
              <a href="https://www.instagram.com/prodacom_tecnologia" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/5 text-white/40 hover:bg-cobalt hover:text-white transition-all duration-300">
                <FaInstagram size={14} />
              </a>
              <a href="https://www.youtube.com/channel/UCDsvQrK1nvN794j2Ifk6ytQ" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/5 text-white/40 hover:bg-cobalt hover:text-white transition-all duration-300">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono tracking-widest text-white/20 uppercase block mb-4">Navegação</span>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleQuickLink(e, link.href)} className="text-sm text-white/40 hover:text-cobalt transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-mono tracking-widest text-white/20 uppercase block mb-4">Produtos</span>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={`#${link.id}`} onClick={(e) => handleProductLink(e, link.id)} className="text-sm text-white/40 hover:text-cobalt transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-mono tracking-widest text-white/20 uppercase block mb-4">Acesso Rápido</span>
            <ul className="space-y-2">
              <li>
                <a href="https://ipontomobile.com.br/iponto_web" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-cobalt transition-colors duration-300 flex items-center gap-1">
                  Marcar o Ponto <ArrowUpRight size={12} strokeWidth={1} />
                </a>
              </li>
              <li>
                <a href="http://www.prodaloja.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-cobalt transition-colors duration-300 flex items-center gap-1">
                  Visitar Loja <ArrowUpRight size={12} strokeWidth={1} />
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <span className="text-xs text-white/20 uppercase tracking-wider block mb-2">Contato</span>
              <a href="tel:+553132451265" className="text-sm text-white/40 hover:text-cobalt transition-colors block">(31) 3245-1265</a>
              <a href="mailto:comercial@prodacom.com.br" className="text-sm text-white/40 hover:text-cobalt transition-colors block mt-1">comercial@prodacom.com.br</a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">© {new Date().getFullYear()} Prodacom Tecnologia. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#contato" onClick={(e) => handleQuickLink(e, "#contato")} className="text-xs text-white/20 hover:text-white/40 transition-colors">Política de Privacidade</a>
            <a href="#contato" onClick={(e) => handleQuickLink(e, "#contato")} className="text-xs text-white/20 hover:text-white/40 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}