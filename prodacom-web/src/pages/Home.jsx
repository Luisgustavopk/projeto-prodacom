import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import HeroSection from "../components/prodacom/HeroSection";
import NavBar from "../components/prodacom/NavBar";
import ServiceMatrix from "../components/prodacom/ServiceMatrix";
import ProductGallery from "../components/prodacom/ProductGallery";
import AboutSection from "../components/prodacom/AboutSection";
import PartnersBar from "../components/prodacom/PartnersBar";
import ContactSection from "../components/prodacom/ContactSection";
import Footer from "../components/prodacom/Footer";

export default function Home() {
  const location = useLocation();


  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
  
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-ghost"
    >
      <NavBar />
      <HeroSection />
      <ServiceMatrix /> 
      <ProductGallery />
      <AboutSection />
      <PartnersBar />
      <ContactSection />
      <Footer />
    </motion.div>
  );
}