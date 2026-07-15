
import React, { useState, useEffect } from "react";
import HeroSection from "../components/prodacom/HeroSection";
import NavBar from "../components/prodacom/NavBar";
import ServiceMatrix from "../components/prodacom/ServiceMatrix";
import ProductGallery from "../components/prodacom/ProductGallery";
import AboutSection from "../components/prodacom/AboutSection";
import PartnersBar from "../components/prodacom/PartnersBar";
import ContactSection from "../components/prodacom/ContactSection";
import Footer from "../components/prodacom/Footer";
import ChatWidget from "../components/prodacom/ChatWidget";

import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";


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

  useEffect(() => {
    const handleHashNavigation = (e) => {
      const href = e.detail;
      handleBackToHome();
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    };

    const handleCategoryNavigation = (e) => {
      const categoryId = e.detail;
      handleSelectCategory(categoryId);
    };

    window.addEventListener('navigate-hash', handleHashNavigation);
    window.addEventListener('navigate-category', handleCategoryNavigation);

    return () => {
      window.removeEventListener('navigate-hash', handleHashNavigation);
      window.removeEventListener('navigate-category', handleCategoryNavigation);
    };
  }, []);

  // --- RENDERS COM ENVELOPAMENTO DE LAYOUT ---

  return (
    <>
      {activeProductSlug && productsData[activeProductSlug] ? (
        <ProductPage 
          product={productsData[activeProductSlug]} 
          onBackToHome={activeCategorySlug ? handleBackToCategory : handleBackToHome} 
        />
      ) : activeCategorySlug && catalogData[activeCategorySlug] ? (
        <CategoryPage 
          category={catalogData[activeCategorySlug]} 
          onBackToHome={handleBackToHome} 
          onSelectModel={handleSelectProduct} 
        />
      ) : (
        <div className="min-h-screen bg-ghost">
          <NavBar onNavigateHome={handleBackToHome} />
          <HeroSection />
          <ServiceMatrix onSelectCategory={handleSelectCategory} />
          <ProductGallery onSelectProduct={handleSelectProduct} />
          <AboutSection />
          <PartnersBar />
          <ContactSection />
          <Footer />
        </div>
      )}
      <ChatWidget />
    </>
  );
}