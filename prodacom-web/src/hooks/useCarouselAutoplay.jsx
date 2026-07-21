import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook para gerenciar carrosel com autoplay automático e controle manual.
 * @param {number} itemsCount - Quantidade total de itens no carrossel.
 * @param {number} delay - Tempo de transição em milissegundos (padrão: 2500ms).
 */
export function useCarouselAutoplay(itemsCount, delay = 2500) {
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayTimer = useRef(null);

 
  useEffect(function () {
    setActiveSlide(0);
  }, [itemsCount]);

  
  const handleNext = useCallback(function () {
    if (itemsCount <= 1) return;
    setActiveSlide(function (prev) {
      return (prev + 1) % itemsCount;
    });
  }, [itemsCount]);

  const handlePrev = useCallback(function () {
    if (itemsCount <= 1) return;
    setActiveSlide(function (prev) {
      return (prev - 1 + itemsCount) % itemsCount;
    });
  }, [itemsCount]);


  const stopAutoplay = useCallback(function () {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  }, []);

  
  const startAutoplay = useCallback(function () {
    stopAutoplay();
    if (itemsCount > 1) {
      autoplayTimer.current = setInterval(function () {
        handleNext();
      }, delay);
    }
  }, [itemsCount, delay, handleNext, stopAutoplay]);

  useEffect(function () {
    startAutoplay();
    
   
    return function () {
      stopAutoplay();
    };
  }, [startAutoplay, stopAutoplay]);

  return {
    activeSlide,
    setActiveSlide,
    handleNext,
    handlePrev,
    startAutoplay,
    stopAutoplay,
  };
}