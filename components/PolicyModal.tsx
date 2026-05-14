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
        className="glass-effect rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10 relative border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto cursor-default"
      >
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 border-b-2 border-slate-100 pb-4 mb-6 flex items-center justify-between uppercase italic tracking-tight">
          <div className="flex items-center">
            <i className="fa-solid fa-gavel mr-3 text-brand-primary"></i>
            <span>{t("policyPageTitle")}</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="text-[10px] bg-white text-brand-primary px-4 py-2 rounded-xl border-2 border-brand-accent transition flex items-center gap-2 shadow-sm font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white"
          >
            <i className="fa-solid fa-language text-lg"></i>
            <span>{t("langBtnText")}</span>
          </button>
        </h2>

        <div className="text-sm text-slate-700 bg-white p-4 sm:p-8 rounded-[2rem] border-2 border-brand-accent/20 space-y-6 shadow-inner">
          {currentLang === "en" ? (
            <>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-id-card text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Team Registration</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Only Confirmed Team Owners can participate in the Auction. Entry Fee must be submitted within the stipulated time (before the Auction).</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-wallet text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Team Purse</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Each Team will be given a specific amount of Virtual Purse Money (100 points). Players must be bought using this Purse. Once the Purse is empty, no further bids can be made.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-gavel text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Player Bidding System</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Each Player will have a Base Price (5). Bidding will start from the Base Price. The Team making the highest bid will get the Player.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-users text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Minimum & Maximum Players</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Each Team must maintain a specified Minimum and Maximum number of Players (10 Players + Owner). A team can buy more than 10 players, but no jerseys will be provided for the extra players. The Team will not be considered Final unless the Squad is Complete.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-rotate-left text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Retention Rule</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">No Player will be retained from the previous Season.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-user-slash text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Unsold Player</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">If a Player receives no bids, they will be considered Unsold. They may be brought up in a Re-Auction later.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-scale-balanced text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Discipline</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Unnecessary arguments, trouble-making, or rude behavior during the Auction are unacceptable. The Organizer&apos;s decision will be considered final.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-credit-card text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Payment Rule</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Once the Team is Confirmed, the Entry Fee is non-refundable. Payment must be completed within the designated time.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-circle-exclamation text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Match Related Rule</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Final decisions regarding matches will be taken by the Organizer & Management. Any Team intentionally ruining the Tournament environment may be disqualified.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-id-card text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">টিম রেজিস্ট্রেশন</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">শুধুমাত্র নিশ্চিত টিম মালিকরা নিলামে অংশ নিতে পারবেন। প্রবেশ ফি নির্ধারিত সময়ের মধ্যে (নিলামের আগে) জমা দিতে হবে।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-wallet text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">টিম পার্স</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">প্রতিটি দলকে নির্দিষ্ট পরিমাণ ভার্চুয়াল পার্স মানি (১০০ পয়েন্ট) দেওয়া হবে। খেলোয়াড়দের এই পার্স ব্যবহার করে কিনতে হবে। পার্স খালি হয়ে গেলে আর কোনো বিড করা যাবে না।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-gavel text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">খেলোয়াড় বিডিং সিস্টেম</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">প্রতিটি খেলোয়াড়ের একটি বেস প্রাইস (৫) থাকবে। বিডিং বেস প্রাইস থেকে শুরু হবে। সর্বোচ্চ দরদাতা দল খেলোয়াড়কে পাবে।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-users text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">সর্বনিম্ন ও সর্বোচ্চ খেলোয়াড়</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">প্রতিটি দলকে নির্দিষ্ট সর্বনিম্ন এবং সর্বোচ্চ সংখ্যক খেলোয়াড় বজায় রাখতে হবে (১০ জন খেলোয়াড় + মালিক)। একটি দল ১০ জনের বেশি খেলোয়াড় কিনতে পারে, তবে অতিরিক্ত খেলোয়াড়দের জন্য কোনও জার্সি দেওয়া হবে না। স্কোয়াড সম্পূর্ণ না হওয়া পর্যন্ত দলটিকে চূড়ান্ত বলে গণ্য করা হবে না।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-rotate-left text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">রিটেনশন রুল</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">আগের সিজন থেকে কোনো খেলোয়াড়কে রাখা (Retain) হবে না।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-user-slash text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">অবিক্রিত খেলোয়াড়</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">যদি কোনো খেলোয়াড় কোনো বিড না পায়, তবে তাকে অবিক্রিত (Unsold) বলে গণ্য করা হবে। পরবর্তীতে তাদের আবার নিলামে আনা হতে পারে।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-scale-balanced text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">শৃঙ্খলা</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">নিলামের সময় অপ্রয়োজনীয় তর্ক, ঝামেলা বা অভদ্র আচরণ গ্রহণযোগ্য নয়। আয়োজকদের সিদ্ধান্তই চূড়ান্ত বলে গণ্য হবে।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-credit-card text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">পেমেন্ট রুল</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">টিম নিশ্চিত হওয়ার পর এন্ট্রি ফি অফেরতযোগ্য। নির্ধারিত সময়ের মধ্যে পেমেন্ট সম্পন্ন করতে হবে।</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center mt-1">
                  <i className="fa-solid fa-circle-exclamation text-brand-primary"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">ম্যাচ সংক্রান্ত নিয়ম</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">ম্যাচ সংক্রান্ত চূড়ান্ত সিদ্ধান্ত আয়োজক ও ব্যবস্থাপনা কর্তৃপক্ষ গ্রহণ করবে। কোনো দল ইচ্ছাকৃতভাবে টুর্নামেন্টের পরিবেশ নষ্ট করলে তাকে বহিষ্কার করা হতে পারে।</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="group flex items-center gap-3 px-10 py-4 rounded-2xl bg-brand-primary text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-brand-primary/20 border-2 border-brand-secondary hover:brightness-110 transition-all duration-300"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>{t("btnBackToReg")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
