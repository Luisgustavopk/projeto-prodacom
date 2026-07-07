import React from "react";
import CommandBar from "../components/prodacom/CommandBar";
import HeroSection from "../components/prodacom/HeroSection";
import ServiceMatrix from "../components/prodacom/ServiceMatrix";
import ProductGallery from "../components/prodacom/ProductGallery";
import AboutSection from "../components/prodacom/AboutSection";
import PartnersBar from "../components/prodacom/PartnersBar";
import ContactSection from "../components/prodacom/ContactSection";
import Footer from "../components/prodacom/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-ghost">
      <CommandBar />
      <HeroSection />
      <ServiceMatrix />
      <ProductGallery />
      <AboutSection />
      <PartnersBar />
      <ContactSection />
      <Footer />
    </div>
  );
}