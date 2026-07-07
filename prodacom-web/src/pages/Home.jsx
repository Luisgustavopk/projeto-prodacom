import React, { useState } from "react";
import CommandBar from "../components/prodacom/CommandBar";
import HeroSection from "../components/prodacom/HeroSection";
import ServiceMatrix from "../components/prodacom/ServiceMatrix";
import ProductGallery from "../components/prodacom/ProductGallery";
import AboutSection from "../components/prodacom/AboutSection";
import PartnersBar from "../components/prodacom/PartnersBar";
import ContactSection from "../components/prodacom/ContactSection";
import Footer from "../components/prodacom/Footer";

// Importando as Páginas Secundárias
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";

// Importando os Dados Reais
import { catalogData } from "../data/catalog";
import { productsData } from "../data/products";

export default function Home() {
  const [activeCategorySlug, setActiveCategorySlug] = useState(null);
  const [activeProductSlug, setActiveProductSlug] = useState(null);

  // Abre a Página de CATEGORIA (Vindo do ServiceMatrix)
  const handleSelectCategory = (categoryId) => {
    setActiveCategorySlug(categoryId);
    setActiveProductSlug(null);
  };

  // Abre direto a Página do PRODUTO (Vindo do Carrossel ou de dentro da Categoria)
  const handleSelectProduct = (productId) => {
    if (productsData[productId]) {
      setActiveProductSlug(productId);
    } else {
      alert("A página de especificações técnicas deste modelo específico está em construção!");
    }
  };

  // Zera tudo e volta para a tela inicial
  const handleBackToHome = () => {
    setActiveCategorySlug(null);
    setActiveProductSlug(null);
  };

  // Se estiver num produto, volta para a Categoria (se houver uma ativa)
  const handleBackToCategory = () => {
    setActiveProductSlug(null);
  };

  // --- LÓGICA DE RENDERIZAÇÃO DAS TELAS ---

  // 1. Se tem um PRODUTO ativo (Nível 3)
  if (activeProductSlug && productsData[activeProductSlug]) {
    return (
      <ProductPage 
        product={productsData[activeProductSlug]} 
        // Se a pessoa veio da categoria, volta pra categoria. Se veio da Home, volta pra Home.
        onBackToHome={activeCategorySlug ? handleBackToCategory : handleBackToHome} 
      />
    );
  }

  // 2. Se tem uma CATEGORIA ativa (Nível 2)
  if (activeCategorySlug && catalogData[activeCategorySlug]) {
    return (
      <CategoryPage 
        category={catalogData[activeCategorySlug]} 
        onBackToHome={handleBackToHome} 
        onSelectModel={handleSelectProduct} 
      />
    );
  }

  // 3. HOME (Nível 1)
  return (
    <div className="min-h-screen bg-ghost">
      <CommandBar onNavigateHome={handleBackToHome} />
      <HeroSection />
      
      {/* Aqui é o pulo do gato: A matriz abre a Categoria, a Galeria abre o Produto */}
      <ServiceMatrix onSelectCategory={handleSelectCategory} />
      <ProductGallery onSelectProduct={handleSelectProduct} />
      
      <AboutSection />
      <PartnersBar />
      <ContactSection />
      <Footer />
    </div>
  );
}