import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, Clock, ShoppingBag, ChevronLeft, ChevronRight, 
  Target, Eye, Heart, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { Button } from '../components/ui/button';

// Importação das Imagens Locais (Pasta assets/images)
import logoProdacom from '../assets/images/logo-prodacom-6.jpg';
import imgRelogioPonto from '../assets/images/relogio-de-ponto.jpeg';
import imgControleAcesso from '../assets/images/controle-de-acesso.jpg';
import imgCatracas from '../assets/images/catacras.jpg'; // Mantido o nome com o "r" trocado conforme o arquivo
import imgBastaoRonda from '../assets/images/bastao-de-ronda.jpg';
import imgSoftwares from '../assets/images/softwares.jpg';
import imgCrachas from '../assets/images/crachas.jpg';
import logoTopdata from '../assets/images/topdata-300x300.jpg';
import logoInspell from '../assets/images/inspell-300x77.jpg';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slides do Carrossel usando as imagens de Ponto e Acesso
  const slides = [
    {
      image: imgRelogioPonto,
      title: "Controle de Ponto e Acesso"
    },
    {
      image: imgControleAcesso,
      title: "Tecnologia para sua Empresa"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Mapeamento dos produtos com suas respectivas imagens locais
  const produtos = [
    { img: imgRelogioPonto, title: 'Relógio de Ponto', desc: 'Controle de ponto eletrônico informatizado.' },
    { img: imgControleAcesso, title: 'Controle de Acesso', desc: 'Segurança e controle de entrada biométrico.' },
    { img: imgCatracas, title: 'Catracas', desc: 'Catracas para controle de acesso de pessoas.' },
    { img: imgBastaoRonda, title: 'Bastão de Ronda', desc: 'Controle de rondas de vigilância.' },
    { img: imgSoftwares, title: 'Softwares', desc: 'Softwares de gestão de ponto e acesso.' },
    { img: imgCrachas, title: 'Crachás', desc: 'Crachás de PVC personalizados.' },
  ];

  const valores = [
    "Qualidade e Integridade em nossas condutas e em tudo o que fazemos.",
    "Melhoria Contínua dos nossos processos e práticas de trabalho adequando suas variabilidades.",
    "Iniciativa e Agilidade no atendimento às mudanças exigidas pelo mercado e às necessidades dos nossos clientes.",
    "Inovação com Sustentabilidade assegurando nossa permanente presença nos negócios.",
    "Valorização do Capital Humano respeitando a diversidade e privilegiando relações de confiança.",
    "Comprometimento com os Resultados Planejados através da auto-responsabilização das lideranças e equipes."
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      
      {/* 1. TOP BAR ESCURA */}
      <div className="bg-[#1e2228] text-white/90 text-sm py-2 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><Phone size={16} className="text-blue-400"/> (31) 3245-1265</div>
            <div className="flex items-center gap-2"><Phone size={16} className="text-blue-400"/> (31) 99309-2473</div>
            <div className="w-px h-4 bg-white/20 mx-2"></div>
            <div className="flex items-center gap-4">
              <svg className="w-4 h-4 fill-current hover:text-blue-400 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
              <svg className="w-4 h-4 fill-current hover:text-blue-400 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              <svg className="w-4 h-4 fill-current hover:text-blue-400 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93 $.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <Mail size={16} className="hover:text-blue-400 cursor-pointer transition-colors"/>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md font-medium transition-colors">
              <Clock size={16}/> Marcar o Ponto
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md font-medium transition-colors">
              <ShoppingBag size={16}/> Visitar Loja
            </button>
          </div>
        </div>
      </div>

      {/* 2. HEADER / NAVBAR BRANCA */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          
          {/* Logo Oficial da Prodacom inserida aqui */}
          <div className="flex items-center gap-3">
            <img src={logoProdacom} alt="Prodacom Tecnologia" className="h-16 w-auto object-contain" />
          </div>

          <nav className="hidden xl:flex gap-6 text-sm font-semibold text-slate-600">
            <a href="#produtos" className="hover:text-blue-600 transition-colors">Relógio de Ponto</a>
            <a href="#produtos" className="hover:text-blue-600 transition-colors">Controle de Acesso</a>
            <a href="#produtos" className="hover:text-blue-600 transition-colors">Catracas</a>
            <a href="#produtos" className="hover:text-blue-600 transition-colors">Bastão de Ronda</a>
            <a href="#produtos" className="hover:text-blue-600 transition-colors">Crachás</a>
            <a href="#produtos" className="hover:text-blue-600 transition-colors">Softwares</a>
          </nav>
          <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md h-10 px-6">
            Solicite seu Orçamento
          </Button>
        </div>
      </header>

      {/* 3. HERO CARROSSEL */}
      <section className="relative h-[500px] w-full overflow-hidden bg-slate-900 flex flex-col group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src={slides[currentSlide].image} 
              alt="Slide" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-16 flex items-center">
          <div className="max-w-xl text-white space-y-4">
            <span className="text-blue-400 font-semibold tracking-wider text-sm uppercase">Soluções</span>
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              {slides[currentSlide].title}
            </h1>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4 h-12 px-8 rounded-md font-medium text-lg flex items-center gap-2">
              Conhecer <ArrowRight size={20}/>
            </Button>
          </div>
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
          <ChevronLeft size={24}/>
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
          <ChevronRight size={24}/>
        </button>

        <div className="relative z-20 w-full bg-blue-600 py-3 text-center text-white font-medium">
          Temos a Solução ideal para sua empresa!
        </div>
      </section>

      {/* 4. SOBRE A PRODACOM */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Quem Somos</span>
              <h2 className="text-4xl font-black text-slate-800 mt-2">Sobre a <span className="text-blue-600">Prodacom</span></h2>
              <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full"></div>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              <p>
                A <strong className="text-slate-800">Prodacom Tecnologia</strong> é uma empresa especializada em prover soluções para Controle de Acesso e Ponto informatizado.
              </p>
              <p>
                Atuamos no mercado a mais de 10 anos e somos especializados em sistemas para gestão de Academias de Ginásticas, Clubes, Escolas, Empresas de Pequeno, Médio e Grande Porte.
              </p>
              <p>
                Temos em nossos parceiros empresas consolidadas no mercado Nacional e Internacional.
              </p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Target size={24}/>
              </div>
              <h3 className="font-bold text-slate-800 mb-3">Missão</h3>
              <p className="text-sm text-slate-600">Comercializar, implantar, manter e gerir soluções integradas de Controle de Ponto e Acesso.</p>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Eye size={24}/>
              </div>
              <h3 className="font-bold text-slate-800 mb-3">Visão</h3>
              <p className="text-sm text-slate-600">Ser a empresa líder em soluções integradas de Controle de Ponto e Acesso.</p>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Heart size={24}/>
              </div>
              <h3 className="font-bold text-slate-800 mb-3">Valores</h3>
              <p className="text-sm text-slate-600">Qualidade e Integridade em nossas condutas e em tudo o que fazemos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOSSOS VALORES */}
      <section className="bg-white py-20 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-800">Nossos <span className="text-blue-600">Valores</span></h2>
            <p className="text-slate-500 mt-2">Princípios que guiam a nossa atuação.</p>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((texto, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-xl flex items-start gap-4">
                <div className="text-blue-600 flex-shrink-0 mt-1">
                  <CheckCircle2 size={24} className="fill-blue-600 text-white"/>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUTOS (Vitrine de Imagens Locais) */}
      <section id="produtos" className="bg-slate-50 py-20 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtos.map((prod, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="h-52 overflow-hidden bg-slate-100">
                <img 
                  src={prod.img} 
                  alt={prod.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{prod.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{prod.desc}</p>
                <a href="#contato" className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:text-blue-700 transition-colors">
                  Saiba mais <ArrowRight size={16}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NOSSOS PARCEIROS (Imagens Oficiais) */}
      <section className="bg-white py-20 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-800">Nossos <span className="text-blue-600">Parceiros</span></h2>
          <p className="text-slate-500 mt-2">Empresas consolidadas no mercado Nacional e Internacional.</p>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 mb-12 rounded-full"></div>
          
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="w-52 h-24 flex items-center justify-center p-2 filter grayscale hover:grayscale-0 transition-all duration-300">
               <img src={logoTopdata} alt="Topdata" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="w-52 h-24 flex items-center justify-center p-2 filter grayscale hover:grayscale-0 transition-all duration-300">
               <img src={logoInspell} alt="Inspell" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. SEÇÃO VAMOS CONVERSAR */}
      <section id="contato" className="bg-[#1a202c] text-white py-16 px-6 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Vamos Conversar?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Solicite seu orçamento sem compromisso. Estamos prontos para atender sua empresa.
          </p>
          <div className="pt-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 rounded-md text-base transition-colors shadow-lg">
              Solicite seu Orçamento
            </Button>
          </div>
        </div>
      </section>

      {/* 9. RODAPÉ INSTITUCIONAL DETALHADO */}
      <footer className="bg-[#111622] text-slate-400 py-16 px-6 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Coluna 1: Logo Oficial e Redes */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoProdacom} alt="Prodacom" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-slate-400 leading-relaxed">
              Soluções integradas de Controle de Ponto e Acesso para sua empresa.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93 $.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
            </div>
          </div>

          {/* Coluna 2: Lista de Produtos */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Produtos</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#produtos" className="hover:text-blue-500 transition-colors">Relógio de Ponto</a></li>
              <li><a href="#produtos" className="hover:text-blue-500 transition-colors">Controle de Acesso</a></li>
              <li><a href="#produtos" className="hover:text-blue-500 transition-colors">Catracas</a></li>
              <li><a href="#produtos" className="hover:text-blue-500 transition-colors">Bastão de Ronda</a></li>
              <li><a href="#produtos" className="hover:text-blue-500 transition-colors">Crachás</a></li>
              <li><a href="#produtos" className="hover:text-blue-500 transition-colors">Softwares</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contatos */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Contato</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-500 flex-shrink-0"/>
                <span>(31) 3245-1265</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-500 flex-shrink-0"/>
                <span>(31) 99309-2473</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-500 flex-shrink-0"/>
                <span className="break-all">comercial@prodacom.com.br</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Horários e Botão */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Horário</h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-blue-500 flex-shrink-0"/>
                <span>Segunda a Sexta-feira</span>
              </p>
              <p className="pl-6 text-xs text-slate-500">08:00 - 17:40</p>
            </div>
            <div className="pt-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 rounded-md">
                Solicite seu Orçamento
              </Button>
            </div>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto border-t border-slate-800/60 mt-12 pt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Prodacom Tecnologia. Todos os direitos reservados.
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <a 
        href="https://wa.me/5531993092473" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all z-50"
        title="Fale conosco no WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.479 5.362 1.48 5.432 0 9.855-4.387 9.858-9.774.002-2.611-1.006-5.066-2.84-6.9a9.779 9.779 0 00-6.993-2.873c-5.438 0-9.863 4.39-9.866 9.78-.001 2.083.511 3.242 1.481 4.867L2.504 21.5l4.143-1.346zM17.51 14.86c-.3-.15-1.773-.875-2.047-.975s-.473-.15-.673.15-.773.975-.947 1.175-.35.225-.65.075c-.3-.15-1.266-.467-2.41-1.487-.89-.794-1.49-1.774-1.664-2.075s-.019-.463.13-.612c.135-.133.3-.35.45-.525s.2-.3.3-.5.05-.375-.025-.525-.673-1.62-.922-2.206c-.242-.582-.487-.503-.673-.512l-.574-.01c-.2 0-.525.075-.8 1.025s-1.05 2.175-1.05 2.65c0 .475.345 1.495 1.42 2.481 1.077.986 2.227 1.446 3.54 1.446.745 0 1.403-.131 1.954-.254.423-.094 1.135-.464 1.3-.913.165-.45.165-.836.115-.913s-.2-.15-.5-.3z"/></svg>
      </a>

    </div>
  );
}