"use client";

import React from "react";
import { InfoLayout } from "@/components/InfoLayout";

export default function RefundPolicy() {
  return (
    <InfoLayout title="Refund Policy">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">1. Registration Fee Refunds</h2>
        <p className="text-slate-700">
          The registration fee for Jugore Triple L Season 2 is generally <strong>non-refundable</strong>. However, exceptions may be made in the following cases:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li><strong>Tournament Cancellation:</strong> If the tournament is cancelled by the organizers due to internal reasons, a full refund will be processed within 7-10 working days.</li>
          <li><strong>Duplicate Payment:</strong> If you have been charged twice for the same registration, the duplicate amount will be refunded upon verification.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">2. Player Withdrawal</h2>
        <p className="text-slate-700">
          If a player chooses to withdraw from the tournament after successful registration, no refund will be issued. The registration fee covers administrative costs and team planning which are initiated immediately upon registration.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">3. Disqualification</h2>
        <p className="text-slate-700">
          No refunds will be provided to players or teams disqualified for violating the Code of Conduct, providing false information, or failing to meet eligibility criteria.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">4. Process for Refund</h2>
        <p className="text-slate-700">
          To request a refund for duplicate payments or other valid reasons, please contact us at <a href="mailto:jamilaktar27856@gmail.com" className="text-blue-600 hover:underline">jamilaktar27856@gmail.com</a> with your registration ID and transaction details. Approved refunds will be credited back to the original payment method.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4">5. Force Majeure</h2>
        <p className="text-slate-700">
          In case of tournament postponement or cancellation due to natural disasters, government restrictions, or other &quot;Force Majeure&quot; events, the organizers will decide on partial refunds or credits for future seasons based on the expenses already incurred.
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
