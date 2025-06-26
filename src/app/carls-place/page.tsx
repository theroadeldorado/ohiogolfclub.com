'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Section } from '@/components/Section';
import { ImageSlider } from '@/components/ImageSlider';
import { ContactModal } from '@/components/ContactModal';
import { fadeIn, initAnimations } from '@/utils/animation';

export default function CarlsPlace() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState('');

  const openModal = (subject: string) => {
    setModalSubject(subject);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Initialize animations when component mounts
  useEffect(() => {
    initAnimations();
  }, []);

  // Listen for contact modal events from Navbar
  useEffect(() => {
    const handleOpenContactModal = (event: CustomEvent<string>) => {
      setModalSubject(event.detail || 'Contact Us');
      setModalOpen(true);
    };

    window.addEventListener('openContactModal', handleOpenContactModal as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('openContactModal', handleOpenContactModal as EventListener);
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/images/carl-1.webp" alt="Custom Indoor Golf Simulator" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className={`mb-8 ${fadeIn('sm')}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.3 37.4" className="w-32 lg:w-48 h-auto fill-white mx-auto mb-4" width="128" height="64" role="img">
              <path d="M57.6 19.1c-.6 0-1 .5-1.4 1.1-1.4 2.2-3.1 4.1-4.4 4.1-.6 0-1.1-.5-1.1-1.5 0-1.9 1.1-5 2.6-8.2 2-3.4 3.8-6.5 3.8-7.7v-.1c-.1-.6-.6-1.1-1.2-1-.7 0-1.7 1-2.5 2.6-1.8 3.5-4.2 8.5-5.1 12-1.4 2.1-2.9 3.8-4.2 3.8-.5 0-.8-.4-.8-1.1 0-2.5 2.7-4.9 2.7-6.9 0-1.5-1.8-2.1-3.1-2.8.5-.7.8-1.5.9-2.4v-.2c-.1-.7-.7-1.2-1.4-1.1-1.1 0-2.5 1.4-2.5 3.6v.4c-1 2.3-2.3 4.5-3.6 6.6-1.4 2.1-3 4.1-4.3 4.1-.5 0-.9-.4-.9-1.4 0-1.6.9-3.8 2.1-6.4.6-.8 1-1.7 1.3-2.6v-.1c-.1-.6-.6-1-1.2-.9-.9.1-1.7.7-2 1.6-.5-1-1.6-1.6-2.8-1.6-3.7 0-7.6 3.4-8.6 7.3-2.1 3.3-6.5 4.8-9.9 4.8-4 0-6.6-2.4-6.6-6.4 0-7.7 7.4-14.5 13.4-14.6-1.1 1.2-1.7 2.8-1.7 4.5 0 2.4 1.7 3.9 4.2 3.9h.1c2.7-.1 4.8-2.4 4.7-5.1 0-1.7-.7-3.2-2.1-4.2.5-.3 1.1-.6 1.7-.7 1.2-.4 1.6-.6 1.6-1.1 0-.8-.5-1.2-1.5-1.2C22 .1 20.3.8 19 1.9c-.8-.2-1.5-.2-2.3-.2C9.1 1.6 0 9.5 0 18.6c0 5.7 4.1 8.9 9.6 8.9 3.8 0 7.3-1.5 10-3.9.5 1.6 2.1 2.7 3.9 2.6 1.7 0 3.3-1.1 4.6-2.7.2 1.6 1.7 2.8 3.4 2.7 2.7 0 5.1-2.6 7-5.5v-.1c1.2-1.9 2.3-3.8 3.3-5.7.6.3 1.3.7 1.3 1.3 0 1.7-2.7 4.4-2.7 6.8v.5c.2 1.6 1.6 2.8 3.3 2.7 1.5 0 3-.9 4.3-2.2.4 1.4 1.6 2.2 3.4 2.2 2.7 0 5.2-2.6 7.1-5.5.1-.2.2-.4.2-.6 0-.6-.5-1-1.1-1zM19.7 4.8c.9.6 1.5 1.6 1.4 2.7 0 1.3-.8 2.6-1.9 2.6-.8 0-1.3-.5-1.3-1.5 0-1.5.7-2.9 1.8-3.8zm8.1 16.4c-1.2 1.7-2.4 3-3.7 3-.8 0-1.5-.6-1.5-1.9 0-3.5 3.2-7.5 5.6-7.5 1.2 0 1.9.6 2 1.5-.6 1.8-1.4 3.4-2.4 4.9zM64.6 7.9c0-1.7-.8-2.8-1.8-2.8-.8 0-1.5.6-1.6 1.5 0 .9.6 1 .6 2.3 0 1.4-.8 2.7-2 3.4-1.1.5-1.3.7-1.3 1.2 0 .4.3.6.8.6 1.5 0 5.3-2.8 5.3-6.2zm4.9 6.2c.6-.9 1.1-1.9 1.3-2.9 0-.8-.6-1.3-1.6-1.3-1.1 0-2.5 1.4-2.5 3.5v.4c-1 2.3-2.1 4.5-3.5 6.5-.8 1.3-1.3 2-1.3 2.6 0 1.8 1.7 3.4 5 3.4 3.5 0 5.4-2 5.4-4.7 0-2.9-2.1-5.3-2.8-7.5zm-2.6 10.2c-1 .1-2-.6-2.1-1.7.1-.7.3-1.3.7-1.9.9-1.3 1.6-2.6 2.4-4 .9 1.5 1.4 3.2 1.5 4.9v.2c0 1.4-1.1 2.5-2.5 2.5zm-46.4 5.8h-2.6v7.1h1.7V35h.9c1.7 0 2.8-1 2.8-2.4 0-1.5-1-2.5-2.8-2.5zm.1 3.4h-1v-1.9h1c.7 0 1 .4 1 .9s-.3 1-1 1zm7-3.4h-1.7v7.1h4.9v-1.6h-3.2zm8.3 0l-2.7 7.1H35l.4-1.2h3l.4 1.2h1.8l-2.8-7.1zm.1 4.4l.5-1.4c.2-.6.4-1 .4-1l.4 1 .5 1.4zm10.1 1.3h-.2c-1-.1-1.8-1-1.7-2.1v-.2c0-1 .9-1.9 1.9-1.9.7 0 1.3.3 1.7.9l1.7-.5c-.6-1.3-1.9-2.1-3.3-2.1h-.3c-2 .1-3.5 1.7-3.4 3.7v.3c.1 2 1.7 3.5 3.7 3.4 1.5 0 2.8-.9 3.4-2.2l-1.7-.4c-.4.7-1.1 1.1-1.8 1.1zm7.8-1.4h2.6V33h-2.6v-1.2h3.5v-1.6h-5.2v7.1h5.2v-1.6h-3.5z"></path>
              <title>carls-place</title>
            </svg>
          </div>
          <h1 className={`text-4xl text-white md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance ${fadeIn('md')}`}>Custom Indoor Golf Simulator</h1>
          <p className={`text-xl text-white mb-8 max-w-2xl mx-auto ${fadeIn('lg')}`}>Let us help you design your indoor residential or commercial golf simulator!</p>
          <div className={`flex flex-col items-center sm:flex-row gap-4 justify-center ${fadeIn('lg')}`}>
            <Button variant="primary" style={{ backgroundColor: '#c1121f', color: 'white' }} onClick={() => openModal('Custom Simulator Quote')}>
              Get a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Transform Your Space Section */}
      <Section className="bg-black text-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${fadeIn()}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Transform Your Space with a Custom Indoor Golf Simulator!</h2>
            <p className="max-w-3xl mx-auto text-lg">
              Are you ready to take your love for golf to the next level? Imagine practicing your swing or hosting friends for a round of virtual golf—all from the comfort of your own home or
              business!
            </p>
          </div>

          <div className={`mb-16 rounded-2xl overflow-hidden shadow-xl ${fadeIn('md')}`}>
            <ImageSlider
              slides={[
                {
                  image: '/images/carl-2.webp',
                  alt: 'Custom Indoor Golf Simulator',
                  caption: 'Experience premium indoor golf simulation with custom designs tailored to your space',
                },
                {
                  image: '/images/carl-3.webp',
                  alt: 'Professional Installation',
                  caption: 'Our expert team handles everything from design to installation',
                },
                {
                  image: '/images/carl-4.webp',
                  alt: 'Residential Simulator',
                  caption: 'Perfect for home installations - practice anytime, rain or shine',
                },
                {
                  image: '/images/carl-5.webp',
                  alt: 'Commercial Simulator',
                  caption: 'Ideal for businesses looking to offer premium golf experiences',
                },
                {
                  image: '/images/carl-6.webp',
                  alt: 'Latest Technology',
                  caption: 'Featuring the latest in golf simulation technology for realistic gameplay',
                },
              ]}
              autoPlayInterval={6000}
            />
          </div>

          <div className={`text-center mb-12 ${fadeIn('lg')}`}>
            <p className="text-xl max-w-3xl mx-auto">
              Our team specializes in designing bespoke indoor golf simulators tailored to your unique space and needs. Whether it&apos;s for personal enjoyment or an engaging addition to your
              business, we create an immersive experience that fits perfectly into your environment.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section className="bg-[#121212] text-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${fadeIn()}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center p-8 bg-[#222] text-white rounded-xl shadow-md hover:shadow-lg transition-shadow ${fadeIn('sm')}`}>
              <h3 className="text-xl font-bold mb-4">Custom Designs</h3>
              <p className="">We work closely with you to create a simulator that complements your space and style.</p>
            </div>

            <div className={`text-center p-8 bg-[#222] text-white rounded-xl shadow-md hover:shadow-lg transition-shadow ${fadeIn('md')}`}>
              <h3 className="text-xl font-bold mb-4">Top Technology</h3>
              <p className="">Enjoy the latest in golf simulation technology, ensuring a realistic and fun experience.</p>
            </div>

            <div className={`text-center p-8 bg-[#222] text-white rounded-xl shadow-md hover:shadow-lg transition-shadow ${fadeIn('lg')}`}>
              <h3 className="text-xl font-bold mb-4">Seamless Installation</h3>
              <p className="">Our expert team handles everything, so you can focus on your game.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-black text-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${fadeIn()}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`bg-[#222] p-6 rounded-xl shadow-md ${fadeIn('sm')}`}>
              <p className="mb-4 italic">
                &quot;Joining the Ohio Golf Club was a game-changer for my golfing skills. The coaches are incredibly knowledgeable and supportive, helping me improve my technique tremendously. I
                highly recommend their training programs to anyone looking to elevate their golf game.&quot;
              </p>
              <p className="font-bold text-primary">- Jordan Flynn</p>
            </div>

            <div className={`bg-[#222] p-6 rounded-xl shadow-md ${fadeIn('md')}`}>
              <p className="mb-4 italic">
                &quot;Ohio Golf Club has transformed my approach to golf. The personalized coaching sessions have boosted my confidence and technique beyond my expectations. Their dedication to each
                player&apos;s progress is truly inspiring. I can&apos;t imagine training anywhere else!&quot;
              </p>
              <p className="font-bold text-primary">- Alex Bennett</p>
            </div>

            <div className={`bg-[#222] p-6 rounded-xl shadow-md ${fadeIn('lg')}`}>
              <p className="mb-4 italic">
                &quot;Ohio Golf Club&apos;s expert coaching has taken my skills to new heights. The personalized attention and structured training plans are unmatched. I&apos;ve seen significant
                improvement in both my technique and overall confidence on the course.&quot;
              </p>
              <p className="font-bold text-primary">- Taylor Reeves</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section className="bg-[#121212] text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={fadeIn()}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Home with Us</h2>
            <h3 className="text-xl font-bold mb-4">Get in Touch With Us</h3>
            <p className="mb-6">
              Let us know you&apos;re interested in building a custom golf enclosure! Ready to elevate your golf experience? Contact us today to discuss your vision, and let&apos;s make it a reality!
              ⛳️
            </p>
            <Button variant="red" onClick={() => openModal('Custom Golf Enclosure')}>
              Get Started Today
            </Button>
          </div>
          <div className={`relative aspect-square overflow-hidden rounded-2xl shadow-xl ${fadeIn('md')}`}>
            <Image src="/images/carl-6.webp" alt="Custom Golf Simulator Installation" fill className="object-cover" />
          </div>
        </div>
      </Section>

      <Footer />

      {/* Contact Modal */}
      <ContactModal isOpen={modalOpen} onClose={closeModal} subject={modalSubject} />
    </>
  );
}
