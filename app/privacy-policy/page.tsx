"use client";

import React from "react";
import { InfoLayout } from "@/components/InfoLayout";

export default function PrivacyPolicy() {
  return (
    <InfoLayout title="Privacy Policy">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">1. Information We Collect</h2>
        <p className="text-slate-700">
          When you register for Jugore Triple L, we collect personal information such as:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>Full Name and Age</li>
          <li>Contact details (Phone number, Email)</li>
          <li>Address details</li>
          <li>Cricket player statistics and role</li>
          <li>Identity verification documents (if required)</li>
          <li>Payment information (processed securely via third-party gateways)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">2. How We Use Your Data</h2>
        <p className="text-slate-700">
          The information collected is used for:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>Managing tournament registrations and team selections.</li>
          <li>Communicating tournament schedules and updates.</li>
          <li>Verifying player eligibility.</li>
          <li>Promotional activities related to Jugore Triple L.</li>
          <li>Statistical analysis of the tournament.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">3. Data Security</h2>
        <p className="text-slate-700">
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration. Your payment data is handled by secure, PCI-compliant payment processors.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">4. Sharing Your Information</h2>
        <p className="text-slate-700">
          We do not sell your personal data. We may share your information with tournament organizers, team owners (limited to player stats), and service providers who help us operate the tournament platform.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">5. Cookies</h2>
        <p className="text-slate-700">
          Our website uses cookies to enhance your browsing experience and remember your preferences during the registration process.
        </p>
      </section>

      <section className="space-y-4 pt-8 border-t border-slate-200">
        <p className="text-slate-500 text-sm italic">
          Last updated: May 14, 2026
        </p>
      </section>
    </InfoLayout>
  );
}
