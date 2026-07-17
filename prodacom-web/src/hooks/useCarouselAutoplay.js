import { useState, useEffect, useRef } from "react";

export function useCarouselAutoplay(itemsCount, delay = 500) {
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayTimer = useRef(null);

  useEffect(() => {
    setActiveSlide(0);
  }, [itemsCount]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [activeSlide, itemsCount]);

  const startAutoplay = () => {
    stopAutoplay();
    if (itemsCount > 1) {
      autoplayTimer.current = setInterval(() => {
        handleNext();
      }, delay);
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % itemsCount);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + itemsCount) % itemsCount);
  };

  return {
    activeSlide,
    setActiveSlide,
    handleNext,
    handlePrev,
    startAutoplay,
    stopAutoplay,
  };
}