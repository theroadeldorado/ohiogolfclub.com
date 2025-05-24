'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface SlideType {
  image: string;
  alt: string;
  caption: string;
}

interface ImageSliderProps {
  slides: SlideType[];
  autoPlayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentIndex(slideIndex);
  }, []);

  const goToNextSlide = useCallback(() => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNextSlide, autoPlayInterval]);

  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {slides.map((slide, slideIndex) => (
        <div key={slideIndex} className={`absolute inset-0 transition-opacity duration-1000 ${slideIndex === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <Image src={slide.image} alt={slide.alt} fill className="object-cover" priority={slideIndex === 0} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-8 left-8 z-20 max-w-md">
            <p className="text-white text-lg md:text-xl font-medium">{slide.caption}</p>
          </div>
        </div>
      ))}

      {/* Dot Navigation */}
      <div className="absolute bottom-8 right-8 z-20 flex space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-all ${slideIndex === currentIndex ? 'bg-white scale-110' : 'bg-white/50'}`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export { ImageSlider };
