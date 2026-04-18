"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { fadeIn, initAnimations } from "@/utils/animation";

type Interests = {
  lessons: boolean;
  fittings: boolean;
};

const INTEREST_OPTIONS: Array<{
  key: keyof Interests;
  title: string;
  description: string;
}> = [
  {
    key: "lessons",
    title: "Lessons",
    description:
      "Private instruction with our PGA-certified coaches, for all skill levels.",
  },
  {
    key: "fittings",
    title: "Fittings",
    description:
      "Custom club fittings with all major brands using TrackMan technology.",
  },
];

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [interests, setInterests] = useState<Interests>({
    lessons: false,
    fittings: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    initAnimations();
  }, []);

  const toggleInterest = (key: keyof Interests) => {
    setInterests((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setInterests({ lessons: false, fittings: false });
    setSubmitError("");
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const honeyToken = Date.now().toString();

      const ccEmails: string[] = [];
      if (interests.lessons) ccEmails.push("brandon@ohiogolfclubindoor.com");
      if (interests.fittings) ccEmails.push("eric@ohiogolfclubindoor.com");

      const selectedLabels: string[] = [];
      if (interests.lessons) selectedLabels.push("Lessons");
      if (interests.fittings) selectedLabels.push("Fittings");
      const subject =
        selectedLabels.length > 0
          ? `Contact Us — Interested in ${selectedLabels.join(" & ")}`
          : "Contact Us";

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          subject,
          honeyToken,
          honeypot: "",
          recipientEmail: "info@ohiogolfclubindoor.com",
          ccEmails,
          interests,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with sending your message.");
      }

      setSubmitSuccess(true);
      resetForm();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/brandon-bay.png"
            alt="Ohio Golf Club fitting and simulator bay"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-20">
          <span
            className={`inline-block text-xs uppercase font-bold mb-6 bg-primary text-white rounded-full py-2 px-4 ${fadeIn("sm")}`}
          >
            Get in Touch
          </span>
          <h1
            className={`text-4xl text-white lg:text-6xl font-bold mb-4 leading-tight text-balance ${fadeIn("md")}`}
          >
            Contact Us
          </h1>
          <p
            className={`text-white text-lg max-w-xl mx-auto ${fadeIn("lg")}`}
          >
            Have a question about lessons, fittings, or a visit? Drop us a line
            and a member of our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact + Form */}
      <Section className="bg-black text-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left: contact info */}
          <div className={`lg:col-span-2 ${fadeIn()}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We&apos;d love to hear from you.
            </h2>
            <p className="text-gray-300 mb-8">
              Fill out the form and we&apos;ll follow up soon. Prefer to call or
              stop by? Here&apos;s how to reach us directly.
            </p>

            <dl className="space-y-6">
              <div>
                <dt className="text-xs uppercase tracking-wide text-primary font-bold mb-1">
                  Visit
                </dt>
                <dd className="text-white">
                  2262 S Arlington Rd
                  <br />
                  Akron, OH 44319
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-primary font-bold mb-1">
                  Call
                </dt>
                <dd>
                  <a
                    href="tel:13309580052"
                    className="text-white hover:text-primary transition-colors"
                  >
                    (330) 958-0052
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-primary font-bold mb-1">
                  Email
                </dt>
                <dd>
                  <a
                    href="mailto:info@ohiogolfclubindoor.com"
                    className="text-white hover:text-primary transition-colors"
                  >
                    info@ohiogolfclubindoor.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: form card */}
          <div className={`lg:col-span-3 ${fadeIn("md")}`}>
            <div className="bg-white text-black rounded-2xl shadow-xl p-6 md:p-10">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-3">
                    Thank you for your message!
                  </h3>
                  <p className="text-gray-700 mb-6">
                    We&apos;ll be in touch soon.
                  </p>
                  <Button
                    variant="red"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-black p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-black p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-black p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <fieldset className="mb-6">
                    <legend className="block text-gray-700 font-medium mb-3">
                      Interested in
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INTEREST_OPTIONS.map((option) => {
                        const checked = interests[option.key];
                        return (
                          <label
                            key={option.key}
                            className={`relative flex cursor-pointer rounded-lg border p-4 transition-colors ${
                              checked
                                ? "border-primary bg-primary/5"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => toggleInterest(option.key)}
                            />
                            <span
                              className={`mt-0.5 mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                                checked
                                  ? "bg-primary border-primary text-white"
                                  : "border-gray-400 bg-white"
                              }`}
                              aria-hidden="true"
                            >
                              {checked && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.42L8.5 12.086l6.79-6.796a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="flex-1">
                              <span className="block font-semibold text-black">
                                {option.title}
                              </span>
                              <span className="block text-sm text-gray-600 mt-0.5">
                                {option.description}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Additional message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-black p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary h-32"
                      required
                    ></textarea>
                  </div>

                  {/* Honeypot */}
                  <div className="hidden">
                    <input type="text" name="honeypot" tabIndex={-1} />
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
                      {submitError}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="red"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
