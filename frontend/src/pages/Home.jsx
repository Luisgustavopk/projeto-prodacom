import React, { useState, useEffect } from "react";
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

  const handleSelectCategory = (categoryId) => {
    setActiveCategorySlug(categoryId);
    setActiveProductSlug(null);
  };

  const handleSelectProduct = (productId) => {
    if (productsData[productId]) {
      setActiveProductSlug(productId);
    } else {
      alert("A página de especificações técnicas deste modelo específico está em construção!");
    }
  };

  const handleBackToHome = () => {
    setActiveCategorySlug(null);
    setActiveProductSlug(null);
  };

  const handleBackToCategory = () => {
    setActiveProductSlug(null);
  };

  // ========================================================
  // OUVINTES DE EVENTOS (Conecta com os cliques do Footer)
  // ========================================================
  useEffect(() => {
    const handleHashNavigation = (e) => {
      const href = e.detail;
      handleBackToHome(); // Retorna à Home principal
      // Dá um tempo mínimo para a tela inicial renderizar, e então rola para a seção
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    };

    const handleCategoryNavigation = (e) => {
      const categoryId = e.detail;
      handleSelectCategory(categoryId); // Abre a categoria selecionada direto
    };

    window.addEventListener('navigate-hash', handleHashNavigation);
    window.addEventListener('navigate-category', handleCategoryNavigation);

    return () => {
      window.removeEventListener('navigate-hash', handleHashNavigation);
      window.removeEventListener('navigate-category', handleCategoryNavigation);
    };
  }, []);

  // --- LÓGICA DE RENDERIZAÇÃO DAS TELAS ---

  if (activeProductSlug && productsData[activeProductSlug]) {
    return (
      <ProductPage 
        product={productsData[activeProductSlug]} 
        onBackToHome={activeCategorySlug ? handleBackToCategory : handleBackToHome} 
      />
    );
  }

  if (activeCategorySlug && catalogData[activeCategorySlug]) {
    return (
      <CategoryPage 
        category={catalogData[activeCategorySlug]} 
        onBackToHome={handleBackToHome} 
        onSelectModel={handleSelectProduct} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-ghost">
      <CommandBar onNavigateHome={handleBackToHome} />
      <HeroSection />
      <ServiceMatrix onSelectCategory={handleSelectCategory} />
      <ProductGallery onSelectProduct={handleSelectProduct} />
      <AboutSection />
      <PartnersBar />
      <ContactSection />
      <Footer />
    </div>
  );
}