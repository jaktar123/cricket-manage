"use client";

import React from "react";
import { useLanguage } from "./providers/LanguageProvider";

export const PolicyModal = ({ onClose }: { onClose: () => void }) => {
  const { t, toggleLanguage, currentLang } = useLanguage();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-2xl shadow-2xl p-8 md:p-10 relative border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto cursor-default"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fa-solid fa-gavel mr-3 text-blue-600"></i>
            <span>{t("policyPageTitle")}</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 transition flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-language text-lg"></i>
            <span className="font-bold">{t("langBtnText")}</span>
          </button>
        </h2>

        <div className="text-sm text-slate-700 bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
          {currentLang === "en" ? (
            <>
              <p><strong><i className="fa-solid fa-id-card mr-3 text-blue-600"></i> Team Registration</strong><br />Only Confirmed Team Owners can participate in the Auction.<br />Entry Fee must be submitted within the stipulated time (before the Auction).</p>
              <p><strong><i className="fa-solid fa-wallet mr-3 text-blue-600"></i> Team Purse</strong><br />Each Team will be given a specific amount of Virtual Purse Money (100 points).<br />Players must be bought using this Purse.<br />Once the Purse is empty, no further bids can be made.</p>
              <p><strong><i className="fa-solid fa-gavel mr-3 text-blue-600"></i> Player Bidding System</strong><br />Each Player will have a Base Price (5).<br />Bidding will start from the Base Price.<br />The Team making the highest bid will get the Player.</p>
              <p><strong><i className="fa-solid fa-users mr-3 text-blue-600"></i> Minimum & Maximum Players</strong><br />Each Team must maintain a specified Minimum and Maximum number of Players (10 Players + Owner). A team can buy more than 10 players, but no jerseys will be provided for the extra players.<br />The Team will not be considered Final unless the Squad is Complete.</p>
              <p><strong><i className="fa-solid fa-clock-rotate-left mr-3 text-blue-600"></i> Retention Rule</strong><br />No Player will be retained from the previous Season.</p>
              <p><strong><i className="fa-solid fa-user-slash mr-3 text-blue-600"></i> Unsold Player</strong><br />If a Player receives no bids, they will be considered Unsold.<br />They may be brought up in a Re-Auction later.</p>
              <p><strong><i className="fa-solid fa-handshake-angle mr-3 text-blue-600"></i> Discipline</strong><br />Unnecessary arguments, trouble-making, or rude behavior during the Auction are unacceptable.<br />The Organizer&apos;s decision will be considered final.</p>
              <p><strong><i className="fa-solid fa-credit-card mr-3 text-blue-600"></i> Payment Rule</strong><br />Once the Team is Confirmed, the Entry Fee is non-refundable.<br />Payment must be completed within the designated time.</p>
              <p><strong><i className="fa-solid fa-baseball mr-3 text-blue-600"></i> Match Related Rule</strong><br />Final decisions regarding matches will be taken by the Organizer & Management.<br />Any Team intentionally ruining the Tournament environment may be disqualified.</p>
              <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                <p className="text-blue-600 font-bold mb-2"><i className="fa-solid fa-bolt-lightning mr-2 text-yellow-500"></i> Special Note</p>
                <p>Everyone&apos;s cooperation is desired to make the Tournament beautiful and competitive.</p>
                <p className="mt-4 text-xl font-black text-slate-800"><i className="fa-solid fa-trophy mr-2 text-yellow-500"></i> Triple L Season II</p>
                <p className="italic font-medium text-slate-500">“Cricket, Passion & Pride”</p>
              </div>
            </>
          ) : (
            <>
              <p><strong><i className="fa-solid fa-id-card mr-3 text-blue-600"></i> Team Registration</strong><br />শুধুমাত্র Confirm করা Team Owner রাই Auction এ অংশ নিতে পারবেন।<br />নির্ধারিত সময়ের মধ্যে Entry Fee জমা দিতে হবে। (Auction এর আগে)</p>
              <p><strong><i className="fa-solid fa-wallet mr-3 text-blue-600"></i> Team Purse</strong><br />প্রতিটি Team কে নির্দিষ্ট পরিমাণ Virtual Purse Money দেওয়া হবে। (100points)<br />সেই Purse দিয়েই খেলোয়াড় কিনতে হবে।<br />Purse শেষ হয়ে গেলে আর Bid করা যাবে না।</p>
              <p><strong><i className="fa-solid fa-gavel mr-3 text-blue-600"></i> Player Bidding System</strong><br />প্রতিটি Player এর একটি Base Price থাকবে (5)।<br />Bid Base Price থেকে শুরু হবে।<br />সর্বোচ্চ Bid করা Team Player টি পাবে।</p>
              <p><strong><i className="fa-solid fa-users mr-3 text-blue-600"></i> Minimum & Maximum Players</strong><br />প্রতিটি Team 에 Minimum এবং Maximum নির্ধারিত সংখ্যক Player রাখতে হবে। (10জন+ওনার) 10 জনের বেশি কিনতে পারে কিন্তু তার জন্য কোনো জার্সি পাবে না।<br />এবং Squad Complete না হলে Team Final বলে গণ্য হবে না।</p>
              <p><strong><i className="fa-solid fa-clock-rotate-left mr-3 text-blue-600"></i> Retention Rule</strong><br />পূর্বের Season থেকে কোনো Player Retain থাকবে না।</p>
              <p><strong><i className="fa-solid fa-user-slash mr-3 text-blue-600"></i> Unsold Player</strong><br />কোনো Player যদি Bid না পায়, তাহলে তাকে Unsold ধরা হবে।<br />পরে আবার Re-Auction এ তোলা হতে পারে।</p>
              <p><strong><i className="fa-solid fa-handshake-angle mr-3 text-blue-600"></i> Discipline</strong><br />Auction চলাকালীন অপ্রয়োজনীয় তর্ক, ঝামেলা বা অসভ্য আচরণ গ্রহণযোগ্য নয়।<br />Organizer এর সিদ্ধান্তই চূড়ান্ত সিদ্ধান্ত হিসেবে গণ্য হবে।</p>
              <p><strong><i className="fa-solid fa-credit-card mr-3 text-blue-600"></i> Payment Rule</strong><br />Team Confirm করার পর Entry Fee ফেরতযোগ্য নয়।<br />নির্ধারিত সময়ের মধ্যে Payment Complete করতে হবে।</p>
              <p><strong><i className="fa-solid fa-baseball mr-3 text-blue-600"></i> Match Related Rule</strong><br />ম্যাচ সংক্রান্ত Final সিদ্ধান্ত Organizer ও Management নেবে।<br />কোনো Team ইচ্ছাকৃতভাবে Tournament এর পরিবেশ নষ্ট করলে Team বাতিল করা হতে পারে।</p>
              <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                <p className="text-blue-600 font-bold mb-2"><i className="fa-solid fa-bolt-lightning mr-2 text-yellow-500"></i> Special Note</p>
                <p>Tournament কে সুন্দর ও প্রতিযোগিতামূলক করতে সকলের সহযোগিতা কাম্য।</p>
                <p className="mt-4 text-xl font-black text-slate-800"><i className="fa-solid fa-trophy mr-2 text-yellow-500"></i> Triple L Season II</p>
                <p className="italic font-medium text-slate-500">“Cricket, Passion & Pride”</p>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-slate-200 pt-6 flex justify-start">
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-xl transition flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>{t("btnBackToReg")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
