
import React, { useState, useEffect } from "react";
import HeroSection from "../components/prodacom/HeroSection";
import ServiceMatrix from "../components/prodacom/ServiceMatrix";
import ProductGallery from "../components/prodacom/ProductGallery";
import AboutSection from "../components/prodacom/AboutSection";
import PartnersBar from "../components/prodacom/PartnersBar";
import ContactSection from "../components/prodacom/ContactSection";

import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import { SiteLayout } from "../layouts/SiteLayout"; 

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

  if (activeProductSlug && productsData[activeProductSlug]) {
    return (
      <SiteLayout onNavigateHome={activeCategorySlug ? handleBackToCategory : handleBackToHome}>
        <ProductPage 
          product={productsData[activeProductSlug]} 
          onBackToHome={activeCategorySlug ? handleBackToCategory : handleBackToHome} 
        />
      </SiteLayout>
    );
  }

  if (activeCategorySlug && catalogData[activeCategorySlug]) {
    return (
      <SiteLayout onNavigateHome={handleBackToHome}>
        <CategoryPage 
          category={catalogData[activeCategorySlug]} 
          onBackToHome={handleBackToHome} 
          onSelectModel={handleSelectProduct} 
        />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout onNavigateHome={handleBackToHome}>
      <HeroSection />
      <ServiceMatrix onSelectCategory={handleSelectCategory} />
      <ProductGallery onSelectProduct={handleSelectProduct} />
      <AboutSection />
      <PartnersBar />
      <ContactSection />
    </SiteLayout>
  );
}