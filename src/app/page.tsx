"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { ImageSlider } from "@/components/ImageSlider";
import { InstagramFeed } from "@/components/InstagramFeed";
import { ContactModal } from "@/components/ContactModal";
import { Reviews } from "@/components/Reviews";
import { Promotions } from "@/components/Promotions";
import { Membership } from "@/components/Membership";
import { fadeIn, initAnimations } from "@/utils/animation";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState("");
  const [modalRecipientEmail, setModalRecipientEmail] = useState<
    string | undefined
  >(undefined);

  const openModal = (subject: string, recipientEmail?: string) => {
    setModalSubject(subject);
    setModalRecipientEmail(recipientEmail);
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
    const handleOpenContactModal = (
      event: CustomEvent<{
        subject: string;
        recipientEmail?: string;
      }>
    ) => {
      setModalSubject(event.detail.subject || "Contact Us");
      setModalRecipientEmail(event.detail.recipientEmail);
      setModalOpen(true);
    };

    window.addEventListener(
      "openContactModal",
      handleOpenContactModal as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "openContactModal",
        handleOpenContactModal as EventListener
      );
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/ogc.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span
            className={`inline-block text-xs uppercase font-bold mb-8 md:bg-primary text-white md:rounded-full md:py-2 md:px-4 ${fadeIn("sm")}`}
          >
            Private Lessons • Club Fittings • Indoor Leagues
          </span>
          <h1
            className={`text-4xl text-white lg:text-7xl font-bold mb-6 leading-tight text-balance ${fadeIn("md")}`}
          >
            Master Your Game, Rain or Shine.
          </h1>
          <p
            className={`text-white text-lg mb-8 max-w-2xl mx-auto  ${fadeIn("lg")}`}
          >
            Experience Ohio’s premier indoor golf destination featuring TrackMan
            simulators, private hitting bays, and expert instruction. From
            private golf lessons and custom club fittings to memberships and
            leagues, everything you need to elevate your game starts here.
          </p>
          <div
            className={`flex flex-wrap items-center flex-row gap-4 justify-center ${fadeIn("lg")}`}
          >
            <Button
              variant="red"
              onClick={() =>
                openModal("Book a Lesson", "brandon@ohiogolfclubindoor.com")
              }
            >
              Book a Lesson
            </Button>
            {/* <Button
              variant="red"
              onClick={() =>
                openModal("Club Fittings", "eric@ohiogolfclubindoor.com")
              }
            >
              Club Fittings
            </Button> */}

            <Button
              variant="red"
              href="https://apimanager-cc29.clubcaddie.com/activities/view/hafdabab"
              target="_blank"
            >
              Book a Bay
            </Button>
          </div>
        </div>
      </section>
      <section className="relative z-10 text-white py-16 lg:py-0 bg-black flex flex-col gap-12">
        <div className="container mx-auto px-4 lg:-translate-y-1/4 lg:-mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="#lessons"
              className={`bg-black relative rounded-2xl shadow-xl overflow-hidden group h-60 lg:h-80 ${fadeIn("sm")}`}
            >
              <Image
                src="/images/IMG_9903.jpg"
                alt="Private Hitting Bays"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <h3 className="text-3xl lg:text-4xl text-shadow-md text-center text-balance">
                  Schedule Private Lessons
                </h3>
              </div>
            </a>
            <a
              href="#bay-rentals"
              className={`bg-black relative rounded-2xl shadow-xl overflow-hidden group h-60 lg:h-80 ${fadeIn("md")}`}
            >
              <Image
                src="/images/Ohio Golf Bays.jpg"
                alt="Trackman Simulators"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <h3 className="text-3xl lg:text-4xl text-shadow-md text-center text-balance">
                  Book a Private Hitting Bay
                </h3>
              </div>
            </a>
            <a
              href="#memberships-benefits"
              className={`bg-black relative rounded-2xl shadow-xl overflow-hidden group h-60 lg:h-80 ${fadeIn("lg")}`}
            >
              <Image
                src="/images/IMG_9907.jpg"
                alt="Short Game Area"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <h3 className="text-3xl lg:text-4xl text-shadow-md text-center text-balance">
                  Become A Member
                </h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* outing */}
      <Section className="py-12 bg-black text-white">
        <div className="grid gap-y-12">
          <div className={`text-center ${fadeIn()}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Events & Leagues
            </h2>
            <p className="max-w-2xl mx-auto text-lg">
              Join us for our upcoming events and leagues!
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            id="winter-league"
          >
            <div
              className={`relative aspect-video overflow-hidden rounded-2xl shadow-xl ${fadeIn()}`}
            >
              <Image
                src="/images/winter-league.jpg"
                alt="winter League"
                fill
                className="object-cover"
              />
            </div>
            <div className={fadeIn("md")}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Winter League!
              </h2>
              <p className="max-w-2xl mx-auto text-lg mb-4">
                12 weeks of competitive play from February 2nd - April 26th.
                Teams of two will compete in 18 holes on a variety of courses
                weekly via Trackman.
              </p>
              <p className="mb-6 text-lg">
                <b>Registration ends February 1st</b>
                <br />
                <b>League standings and updates sent out Sunday of each week</b>
                <br />
                <b>$450/player | $337.50/player with 4 for 3 Special</b>
              </p>
              <ul className="mb-6 list-disc list-inside">
                <li>12 Weeks</li>
                <li>2 Man Teams - Best Ball</li>
                <li>Tee Gift & Prizes</li>
              </ul>
              <Button
                variant="red"
                target="_blank"
                rel="noopener noreferrer"
                href="https://apimanager-cc29.clubcaddie.com/events/view/hafdabab/list?&Interaction=uv98s2aac7tsjcnsvdqb5g2dgv"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Instagram Feed Section */}
      <Section className="bg-black text-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${fadeIn()}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Follow Us</h2>
            <p className="max-w-2xl mx-auto text-lg">
              Stay connected with us on Instagram for the <br /> latest updates,
              events, and golf tips.
            </p>
          </div>

          <InstagramFeed />

          <div className={`text-center mt-8 ${fadeIn()}`}>
            <Button href="https://www.instagram.com/ohiogolfclub" variant="red">
              Follow Us on Instagram
            </Button>
          </div>
        </div>
      </Section>

      {/* Promotions Section */}
      <Promotions />

      {/* Performance Center Overview */}
      <Section className="bg-black text-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${fadeIn()}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Performance Center
            </h2>
            <p className="max-w-2xl mx-auto text-lg">
              Experience our world-class indoor golf facility designed for
              serious players.
            </p>
          </div>

          <div
            className={`mb-16 rounded-2xl overflow-hidden shadow-xl ${fadeIn("md")}`}
          >
            <ImageSlider
              slides={[
                {
                  image: "/images/IMG_9903.jpg",
                  alt: "Private Hitting Bays",
                  caption:
                    "Immerse yourself in our private bays with huge HD impact screens and premium hitting mats",
                },
                {
                  image: "/images/Ohio Golf Bays.jpg",
                  alt: "Trackman Simulators",
                  caption:
                    "Play on the industry-standard TrackMan 4 simulators - the most accurate technology in golf",
                },
                {
                  image: "/images/IMG_9907.jpg",
                  alt: "Putting Green",
                  caption:
                    "Hone your skills on our spacious 4,000 sq ft putting green and short game area",
                },
                {
                  image: "/images/IMG_9910.jpg",
                  alt: "Training Area",
                  caption:
                    "Work with our PGA-certified instructors in dedicated training areas",
                },
                {
                  image: "/images/IMG_9909.jpg",
                  alt: "Club Fitting",
                  caption:
                    "Get custom-fitted clubs from all major brands in our fitting studio",
                },
              ]}
              autoPlayInterval={6000}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div
              className={`text-center p-8 bg-[#222] text-white rounded-xl shadow-md hover:shadow-lg transition-shadow ${fadeIn("sm")}`}
            >
              <h3 className="text-xl font-bold mb-4">Private Hitting Bays</h3>
              <p className="">
                Experience our 9 private hitting bays featuring huge HD impact
                screens and premium hitting mats for the most realistic practice
                environment.
              </p>
            </div>

            <div
              className={`text-center p-8 bg-[#222] text-white rounded-xl shadow-md hover:shadow-lg transition-shadow ${fadeIn("md")}`}
            >
              <h3 className="text-xl font-bold mb-4">Trackman Simulators</h3>
              <p className="">
                Experience the industry-standard TrackMan 4 technology,
                recognized worldwide as the most accurate golf simulator system
                available.
              </p>
            </div>

            <div
              className={`text-center p-8 bg-[#222] text-white rounded-xl shadow-md hover:shadow-lg transition-shadow ${fadeIn("lg")}`}
            >
              <h3 className="text-xl font-bold mb-4">Short Game Area</h3>
              <p className=" ">
                Perfect your short game on our spacious 4,000 sq ft putting
                green and short game practice area.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Private Lessons & Fittings */}
      <Section className="bg-[#121212] text-white" id="lessons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={fadeIn()}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Private Lessons & Fittings
            </h2>
            <p className="mb-6">
              Led by Head Golf Professional Brandon Boggs, a certified GOLFTEC
              professional and Titleist/Callaway master club fitter with over
              7,500 lessons and 500 club fittings to his name.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#ae1b22] mr-3">✓</span>
                <span>
                  Experienced instructor with degree in exercise science
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#ae1b22] mr-3">✓</span>
                <span>
                  All-ages, client-focused approach for beginners to elite
                  players
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#ae1b22] mr-3">✓</span>
                <span>
                  State-of-the-art TrackMan technology and custom club fitting
                </span>
              </li>
            </ul>
            <Button
              variant="red"
              onClick={() =>
                openModal(
                  "Private Lessons & Fittings",
                  "brandon@ohiogolfclubindoor.com"
                )
              }
            >
              Book a Lesson
            </Button>
          </div>
          <div
            className={`relative aspect-square overflow-hidden rounded-2xl shadow-xl ${fadeIn("md")}`}
          >
            <Image
              src="/images/IMG_9910.jpg"
              alt="Brandon Boggs - Head Golf Professional"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Bay Rentals - Minimal Section */}
      <Section className="py-12 bg-black text-white" id="bay-rentals">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div
            className={`relative aspect-video overflow-hidden rounded-2xl shadow-xl ${fadeIn()}`}
          >
            <Image
              src="/images/Ohio Golf Bays (1).jpg"
              alt="Bay Rentals"
              fill
              className="object-cover"
            />
          </div>
          <div className={fadeIn("md")}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bay Rentals</h2>
            <p className="mb-6">
              Experience premium TrackMan simulator bays available for hourly
              rental. Our high-quality turf is designed to prevent injuries
              while providing a realistic feedback for your swing. Improve your
              game by practicing on virtual courses or driving ranges without
              ever leaving our facility.
            </p>
            <Button
              variant="red"
              href="https://apimanager-cc29.clubcaddie.com/activities/view/hafdabab"
              target="_blank"
            >
              View Rates & Book
            </Button>
          </div>
        </div>
      </Section>

      {/* Membership Benefits */}
      <Membership />

      {/* Events and Bar */}
      <Section className="bg-black text-white">
        <div className={`text-center mb-12 ${fadeIn()}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Events & Bar</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Host your next corporate event or celebration in our upscale
            facility with full-service bar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Events */}
          <div
            className={`relative aspect-video overflow-hidden rounded-2xl shadow-xl ${fadeIn("sm")}`}
          >
            <Image
              src="/images/IMG_0607.jpeg"
              alt="Private Events"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 transition-all duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold">Private Events</h3>
            </div>
          </div>

          {/* Bar */}
          <div
            className={`relative aspect-video overflow-hidden rounded-2xl shadow-xl ${fadeIn("md")}`}
          >
            <Image
              src="/images/IMG_9909.jpg"
              alt="Premium Bar"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 transition-all duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold">Premium Bar</h3>
            </div>
          </div>
        </div>

        <div className={`mt-8 text-center ${fadeIn("lg")}`}>
          <Button
            variant="red"
            onClick={() =>
              openModal("Events & Bar", "nicole@ohiogolfclubindoor.com")
            }
          >
            Book an Event
          </Button>
        </div>
      </Section>

      {/* Google Reviews */}
      <Section className="bg-[#121212] text-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${fadeIn()}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Our Members Say
            </h2>
            <p className="max-w-2xl mx-auto text-lg">
              Read reviews from our satisfied members and see why Ohio Golf Club
              is the premier indoor golf destination.
            </p>
          </div>

          <div className={fadeIn("md")}>
            <Reviews />
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-black text-white !py-0" fullWidth>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <Image
              src="/images/OGC1.jpg"
              alt="Ohio Golf Club"
              fill
              className="object-cover opacity-70"
            />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-40">
            <h2
              className={`text-4xl md:text-6xl font-bold mb-6 text-shadow-md text-balance ${fadeIn()}`}
            >
              Experience Ohio&apos;s Finest Indoor Golf Center
            </h2>
            <Button
              size="lg"
              style={{
                backgroundColor: "#ae1b22",
                color: "white",
              }}
              onClick={() =>
                openModal(
                  "Contact Us",
                  "info@ohiogolfclubindoor.com, brandon@ohiogolfclubindoor.com"
                )
              }
              className={fadeIn("md")}
            >
              Contact Us Today
            </Button>
          </div>
        </div>
      </Section>

      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={closeModal}
        subject={modalSubject}
        recipientEmail={modalRecipientEmail}
      />
    </>
  );
}
