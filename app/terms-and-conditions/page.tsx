"use client";

import React from "react";
import { InfoLayout } from "@/components/InfoLayout";

export default function TermsConditions() {
  return (
    <InfoLayout title="Terms & Conditions">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">1. Acceptance of Terms</h2>
        <p className="text-slate-700">
          By registering for the Jugore Triple L Cricket Tournament, you agree to comply with and be bound by the following terms and conditions. If you do not agree, please do not register for the tournament.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">2. Eligibility</h2>
        <p className="text-slate-700">
          The tournament is open to all cricket enthusiasts. However, Jugore Triple L reserves the right to verify the age and identity of any participant. Players must adhere to the specific age categories defined for the season.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">3. Registration & Fees</h2>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>Registration is complete only after the payment of the prescribed tournament fee.</li>
          <li>Fees are non-refundable unless specified in the Refund Policy.</li>
          <li>Accurate information must be provided during registration. Any false information may lead to disqualification.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">4. Code of Conduct</h2>
        <p className="text-slate-700">
          All participants are expected to maintain sportsmanship and discipline. Any form of verbal or physical abuse, cheating, or violation of tournament rules will lead to immediate disqualification without refund.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">5. Liability</h2>
        <p className="text-slate-700">
          Jugore Triple L and its organizers are not responsible for any injuries, loss of equipment, or personal property during the tournament. Participants are advised to have their own health/accident insurance.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">6. Changes to Schedule</h2>
        <p className="text-slate-700">
          The organizers reserve the right to change the tournament schedule, venue, or format due to weather conditions or other unforeseen circumstances.
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
