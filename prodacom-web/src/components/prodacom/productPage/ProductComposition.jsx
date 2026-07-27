import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ProductComposition({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="flex justify-center w-full">
        <motion.img 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          src={images[0]} alt={`${title} Detalhe`} 
          className="w-full max-w-2xl h-auto object-contain mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-700"
        />
      </div>
    );
  }

  return (
    <>
      {/* 📱 VISÃO MOBILE */}
      <div className="block md:hidden w-full overflow-hidden relative">
        <motion.div 
          className="flex w-full items-center"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full shrink-0 flex justify-center px-4">
              <img 
                src={img} 
                alt={`${title} Visão ${idx + 1}`} 
                className="w-[85%] h-auto max-h-[350px] object-contain mix-blend-multiply drop-shadow-2xl"
              />
            </div>
          ))}
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-cobalt w-6" : "bg-obsidian/20 w-2"
              }`}
              aria-label={`Ir para a imagem ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 💻 VISÃO DESKTOP */}
      <div className="hidden md:flex">
        {images.length === 2 ? (
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto relative px-4">
            <motion.img
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
              src={images[0]} alt={`${title} Visão Principal`}
              className="w-[55%] h-auto object-contain mix-blend-multiply drop-shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-500"
            />
            <motion.img
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              src={images[1]} alt={`${title} Visão Secundária`}
              className="w-[45%] h-auto object-contain mix-blend-multiply drop-shadow-md z-0 mt-24 -ml-20 opacity-95 hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto relative px-4">
            <motion.img
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              src={images[1]} alt={`${title} Visão Esquerda`}
              className="hidden md:block w-[30%] h-auto object-contain mix-blend-multiply drop-shadow-md z-0 mt-20 -mr-16 opacity-90"
            />
            <motion.img
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              src={images[0]} alt={`${title} Visão Principal`}
              className="w-[85%] md:w-[45%] h-auto object-contain mix-blend-multiply drop-shadow-2xl z-10 hover:-translate-y-2 transition-transform duration-500"
            />
            <motion.img
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              src={images[2]} alt={`${title} Visão Direita`}
              className="w-[70%] md:w-[30%] h-auto object-contain mix-blend-multiply drop-shadow-md z-0 -mt-12 md:mt-20 md:-ml-16 opacity-90"
            />
          </div>
        )}
      </div>
    </>
  );
}