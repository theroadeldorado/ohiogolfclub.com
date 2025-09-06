"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { fadeIn, initAnimations } from "@/utils/animation";

const teamMembers = [
  {
    name: "Brandon Boggs",
    title: "Owner & Golf Professional",
    email: "brandon@ohiogolfclubindoor.com",
    image: "/images/brandon.jpg",
    description:
      "Brandon is a highly experienced golf instructor who specializes in full swing and course management.",
  },
  {
    name: "Eric Jacobs",
    title: "Golf Professional",
    email: "eric@ohiogolfclubindoor.com",
    image: "/images/eric.jpg",
    description:
      "Eric is an excellent instructor with a passion for club fitting! Let us know you're wanting to upgrade your bag and Eric will get you dialed in!",
  },
  {
    name: "Sean Stanistreet",
    title: "Golf Professional",
    email: "sean@ohiogolfclubindoor.com",
    image: "/images/sean.jpg",
    description:
      "Sean is a skilled swing coach and loves tracking goals and helping every golfer improve!",
  },
  {
    name: "Kyle Cheney",
    title: "Co-Owner",
    email: "kyle@ohiogolfclubindoor.com",
    image: "/images/kyle.jpg",
    description: "Kyle is our co-owner.",
  },
  {
    name: "Nicole Willard",
    title: "Event Manager",
    email: "nicole@ohiogolfclubindoor.com",
    image: "/images/nicole.jpg",
    description:
      "Nicole is our event manager and loves to help with any event planning!",
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

      {/* Team Section */}
      <Section className="bg-black text-white">
        <div className="container !max-w-6xl mx-auto px-4">
          <div className={`text-center my-20 ${fadeIn()}`}>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Our People Make Us Great
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              Here we focus on providing exceptional golf instruction and
              facilities where expertise, innovation, and passion unlock your
              potential.
            </p>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mt-4">
              You&apos;ll interact with talented professionals who will
              challenge you to improve your game and think in new and creative
              ways about golf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`${fadeIn(index % 3 === 0 ? "sm" : index % 3 === 1 ? "md" : "lg")}`}
              >
                <div
                  className={`relative group rounded-2xl overflow-hidden shadow-xl bg-[#222]`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>
                </div>
                <div className="p-4 text-white">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  {member.title && (
                    <p className="text-white  font-semibold mb-0">
                      {member.title}
                    </p>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-gray-200 hover:text-primary duration-300 ease-in-out leading-relaxed mb-3 inline-block"
                    >
                      {member.email}
                    </a>
                  )}
                  {member.description && (
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {member.description}
                    </p>
                  )}
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
