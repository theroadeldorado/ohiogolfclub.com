'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { fadeIn, initAnimations } from '@/utils/animation';

const teamMembers = [
  {
    name: 'Brandon Boggs',
    title: 'Head Golf Professional',
    image: '/images/IMG_9910.jpg',
    description: 'Certified GOLFTEC professional and Titleist/Callaway master club fitter with over 7,500 lessons and 500 club fittings.',
  },
  {
    name: 'Mike Johnson',
    title: 'Assistant Golf Professional',
    image: '/images/IMG_9903.jpg',
    description: 'Specializes in beginner instruction and short game coaching with 5+ years of teaching experience.',
  },
  {
    name: 'Sarah Williams',
    title: 'Facility Manager',
    image: '/images/IMG_9907.jpg',
    description: 'Ensures smooth operations and exceptional member experience at Ohio Golf Club.',
  },
  {
    name: 'Tom Anderson',
    title: 'Equipment Specialist',
    image: '/images/IMG_9909.jpg',
    description: 'Expert in club fitting and equipment maintenance with extensive knowledge of all major golf brands.',
  },
  {
    name: 'Lisa Chen',
    title: 'Events Coordinator',
    image: '/images/IMG_0607.jpeg',
    description: 'Manages corporate events, tournaments, and special occasions at our facility.',
  },
  {
    name: 'David Martinez',
    title: 'Technology Director',
    image: '/images/Ohio Golf Bays.jpg',
    description: 'Oversees TrackMan systems and ensures all technology runs smoothly for the best member experience.',
  },
];

export default function Team() {
  // Initialize animations when component mounts
  useEffect(() => {
    initAnimations();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/images/OGC1.jpg" alt="Ohio Golf Club Team" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className={`text-4xl text-white lg:text-7xl font-bold mb-6 leading-tight text-balance ${fadeIn('md')}`}>Meet Our Team</h1>
          <p className={`text-xl text-white/90 max-w-2xl mx-auto leading-relaxed ${fadeIn('lg')}`}>
            Our dedicated professionals are here to help you elevate your golf game and ensure an exceptional experience at Ohio Golf Club.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <Section className="bg-black text-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${fadeIn()}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our People Make Us Great</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              Here we focus on providing exceptional golf instruction and facilities where expertise, innovation, and passion unlock your potential.
            </p>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mt-4">
              You&apos;ll interact with talented professionals who will challenge you to improve your game and think in new and creative ways about golf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className={`relative group rounded-2xl overflow-hidden shadow-xl bg-[#222] ${fadeIn(index % 3 === 0 ? 'sm' : index % 3 === 1 ? 'md' : 'lg')}`}>
                <div className="relative aspect-square overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-[#c1121f] font-semibold mb-3">{member.title}</p>
                  <p className="text-sm text-gray-200 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
