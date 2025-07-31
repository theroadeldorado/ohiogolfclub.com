"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { fadeIn, initAnimations } from "@/utils/animation";

interface PromotionButton {
  title: string;
  url: string;
  target?: string;
}

interface Promotion {
  id: string;
  startDate: string;
  endDate: string;
  image?: string;
  heading: string;
  description: string;
  subheading?: string;
  buttons: PromotionButton[];
  recurring?: boolean; // If true, runs every year using month/day only
}

interface PromotionsData {
  promotions: Promotion[];
}

export function Promotions() {
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  // Random background images to use when no specific image is provided
  const randomBackgrounds = [
    "/images/IMG_9903.jpg",
    "/images/IMG_9904.jpg",
    "/images/IMG_9905.jpg",
    "/images/IMG_9906.jpg",
    "/images/IMG_9907.jpg",
    "/images/IMG_9909.jpg",
    "/images/IMG_9910.jpg",
    "/images/Ohio Golf Bays.jpg",
    "/images/Ohio Golf Bays (1).jpg",
    "/images/OGC1.jpg",
  ];

  const getRandomBackground = (promotionId: string) => {
    // Use promotion ID as seed for consistent image selection
    const hash = promotionId.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % randomBackgrounds.length;
    return randomBackgrounds[index];
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        // Add cache busting parameter
        const cacheBuster = new Date().getTime();
        const response = await fetch(`/data/promotions.json?v=${cacheBuster}`);
        const data: PromotionsData = await response.json();

        // Filter promotions by current date
        const now = new Date();
        const currentPromotions = data.promotions.filter((promotion) => {
          if (promotion.recurring) {
            // For recurring promotions, check month/day only
            const currentYear = now.getFullYear();
            const startDate = new Date(promotion.startDate);
            const endDate = new Date(promotion.endDate);

            // Create dates for current year using month/day from promotion
            const currentYearStart = new Date(
              currentYear,
              startDate.getMonth(),
              startDate.getDate()
            );
            const currentYearEnd = new Date(
              currentYear,
              endDate.getMonth(),
              endDate.getDate()
            );

            // Handle cross-year promotions (e.g., Dec 15 - Jan 15)
            if (currentYearEnd < currentYearStart) {
              // Check if we're in the start period (current year) or end period (next year)
              const nextYearEnd = new Date(
                currentYear + 1,
                endDate.getMonth(),
                endDate.getDate()
              );
              return now >= currentYearStart || now <= nextYearEnd;
            } else {
              // Normal same-year range
              return now >= currentYearStart && now <= currentYearEnd;
            }
          } else {
            // For non-recurring promotions, use exact dates
            const startDate = new Date(promotion.startDate);
            const endDate = new Date(promotion.endDate);
            return now >= startDate && now <= endDate;
          }
        });

        setActivePromotions(currentPromotions);
      } catch (error) {
        console.error("Failed to load promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Re-initialize animations when promotions load
  useEffect(() => {
    if (!loading && activePromotions.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        initAnimations();
      }, 100);
    }
  }, [loading, activePromotions]);

  if (loading) {
    return (
      <section className="bg-[#121212] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-600 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-600 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activePromotions.length === 0) {
    return null; // Don't render section if no active promotions
  }

  return (
    <section className="bg-[#121212] text-white py-16">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${fadeIn()}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Current Promotions
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            Don&apos;t miss out on our limited-time offers and special deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activePromotions.map((promotion, index) => (
            <div
              key={promotion.id}
              className={`relative overflow-hidden rounded-2xl min-h-[300px] shadow-xl ${fadeIn(index % 2 === 0 ? "sm" : "md")} ${activePromotions.length % 2 === 1 ? "last:md:translate-x-1/2" : ""}`}
            >
              {/* Background Image with Black Background */}
              <div className="absolute inset-0 bg-black">
                <Image
                  src={promotion.image || getRandomBackground(promotion.id)}
                  alt={promotion.heading}
                  fill
                  className="object-cover opacity-50"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-8 py-24 h-full flex flex-col items-center gap-4 justify-center">
                <h3 className="text-4xl text-center md:text-3xl font-bold">
                  {promotion.heading}
                </h3>

                {promotion.subheading && (
                  <div className="text-2xl text-center font-semibold text-white">
                    {promotion.subheading}
                  </div>
                )}

                <p className="text-xl text-center leading-relaxed">
                  {promotion.description}
                </p>

                {/* Buttons */}
                {promotion.buttons.length > 0 && (
                  <div className="flex flex-col pt-4 items-center justify-center sm:flex-row gap-4">
                    {promotion.buttons.map((button, buttonIndex) => (
                      <Button
                        key={buttonIndex}
                        variant="red"
                        href={button.url}
                        target={button.target}
                      >
                        {button.title}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
