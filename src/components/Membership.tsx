"use client";

import React from "react";
import { Button } from "./Button";
import { Section } from "./Section";
import { fadeIn } from "@/utils/animation";

interface MembershipTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  note?: string;
}

interface MembershipRates {
  title: string;
  price: string;
  member: boolean;
}

const membershipTiers: MembershipTier[] = [
  {
    name: "Morning Member",
    price: "$75",
    period: "/Month",
    note: "Individual Member Only",
    features: [
      "Discounted bay rentals M-F 8am-5PM",
      "Chipping and Putting Green Access",
    ],
  },
  {
    name: "Classic Membership",
    price: "$200",
    period: "/Month",
    features: [
      "Discounted bay rentals and guest fees",
      "Chipping and Putting Green Access",
      "Discounts on Merchandise, Lessons and Services",
      "Additional family members $50/mth",
    ],
    isPopular: true,
  },
  {
    name: "Premium Membership",
    price: "$375",
    period: "/Month",
    features: [
      "Discounted bay rentals and guest fees",
      "Chipping and Putting Green Access",
      "Complimentary Club Services (Regrip, reshaft, loft and lie checks)",
      "2 Complimentary Lessons Per Month",
      "Additional family member $50/mth",
    ],
  },
  {
    name: "Junior Membership",
    price: "$99",
    period: "/Month",
    note: "Individual Member Only",
    features: [
      "All benefits of Classic Membership",
      "Designed for golfers under 25",
    ],
  },
];

const membershipRates: MembershipRates[] = [
  { title: "Non-Prime Simulator Rental", price: "$5", member: true },
  { title: "Prime Simulator Rental", price: "$10", member: true },
  { title: "Non-Prime Guest", price: "$10", member: false },
  { title: "Prime Guest", price: "$15", member: false },
];

const Membership = () => {
  return (
    <Section className="bg-[#121212] text-white" id="memberships-benefits">
      {/* Member Login Section */}
      <div
        className={`text-center mb-12 pb-12 border-b border-dashed border-gray-300 ${fadeIn()}`}
      >
        <h2 className="text-3xl font-bold mb-4">Member Login</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Current members can access their account and book tee times.
        </p>
        <Button
          href="https://customer-cc29.clubcaddie.com/login?clubid=103408"
          variant="red"
          className="px-8"
        >
          Login to Member Portal
        </Button>
      </div>

      {/* Membership Benefits Header */}
      <div className={`text-center mb-12 ${fadeIn("md")}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Membership Benefits
        </h2>
        <p className="max-w-2xl mx-auto">
          Join our exclusive community of dedicated golfers with premium access
          and special perks.
        </p>
      </div>

      {/* Membership Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {membershipTiers.map((tier, index) => (
          <div
            key={tier.name}
            className={`shadow-xl bg-white text-black rounded-2xl p-6 hover:border-primary transition-colors flex flex-col justify-between relative ${
              tier.isPopular ? "ring-2 ring-primary" : ""
            } ${fadeIn("sm")}`}
          >
            {tier.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              {tier.note && (
                <p className="text-sm text-gray-600 mb-2">{tier.note}</p>
              )}
              <p className="text-3xl font-bold mb-6">
                {tier.price}
                <span className="text-sm text-gray-800">{tier.period}</span>
              </p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-primary mr-3 flex-shrink-0">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="red"
              href="https://apimanager-cc29.clubcaddie.com/membership_sales/view/hafdabab"
              target="_blank"
              size="sm"
            >
              Join Now
            </Button>
          </div>
        ))}
      </div>

      {/* Member Rates Section */}
      <div className={`mb-12 ${fadeIn("lg")}`}>
        <h3 className="text-2xl font-bold text-center mb-8">Member Rates</h3>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white text-black rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4 gap-x-10">
              {membershipRates.map((rate, index) => (
                <div
                  key={rate.title}
                  className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                >
                  <span className="text-sm font-medium">{rate.title}</span>
                  <span className="text-lg font-bold text-primary">
                    {rate.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center">
        <Button
          variant="red"
          href="https://apimanager-cc29.clubcaddie.com/membership_sales/view/hafdabab"
          target="_blank"
        >
          View All Membership Packages
        </Button>
      </div>
    </Section>
  );
};

export { Membership };
