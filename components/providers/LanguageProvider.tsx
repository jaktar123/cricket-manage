"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "bn";

const translations: Record<Language, Record<string, string>> = {
  en: {
    langBtnText: "বাংলা",
    formSubtitle: "Single Player Registration",
    step1Label: "Step 1 of 3",
    step2Label: "Step 2 of 3",
    step3Label: "Step 3 of 3",
    kitSelectionTitle: "Cricket Profile & Kit",
    personalDetailsTitle: "Personal Details",
    labelFullName: "Full Name",
    placeholderFullName: "e.g. Rohit Sharma",
    labelAge: "Age",
    labelMobile: "Mobile Number",
    placeholderMobile: "10-digit mobile number",
    labelEmailMain: "Email Address",
    labelEmailOpt: "(Optional)",
    placeholderEmail: "For payment receipt",
    playerStatsTitle: "Player Stats",
    labelPrimaryRole: "Primary Role",
    roleBatsman: "Batsman",
    roleBowler: "Bowler",
    roleAllRounder: "All-Rounder",
    roleKeeper: "Keeper",
    labelBattingStyle: "Batting Style",
    batRight: "Right Hand Bat",
    batLeft: "Left Hand Bat",
    labelBowlingStyle: "Bowling Style",
    bowlNone: "None / Pure Batsman",
    bowlRightPace: "Right Arm Pace",
    bowlRightSpin: "Right Arm Spin",
    bowlLeftPace: "Left Arm Pace",
    bowlLeftSpin: "Left Arm Spin",
    rulesTitle: "Tournament Rules",
    rule1: "Any misbehavior, trouble-making, or rudeness during the tournament may result in player suspension.",
    rule2: "Bowlers have a speed limit and must bowl standing within the designated box line.",
    rule3: "If any player has a problem, they should inform the captain. The captain will then inform the tournament committee.",
    rule4: "If any player sledges another player or committee member, they will be <strong>banned for 2 matches</strong>.",
    rule5: "Players must reach the ground on time; if not, they will be <strong>disqualified</strong> from the tournament.",
    rule6: "Filling the form doesn't guarantee a team. Players will be bought through an auction.",
    rule7: "Players can be suspended for misbehavior, trouble-making, or rudeness during the tournament.",
    rule8: "The organizer's decision is final regarding player selection and auction matters.",
    ruleAdvisory: "Please read all rules and policies carefully before filling the form.",
    consentLabel: "I have read and agree to follow these rules.",
    infoLinkText: "Form Fill-Up Rules",
    infoLinkDesc: "Read the rules before filling out the form.",
    infoBtnView: "View Rules",
    infoPageTitle: "Form Fill-Up Rules",
    policyLinkText: "Auction Rules",
    policyLinkDesc: "Read the official auction bidding rules.",
    policyBtnView: "Auction Rules",
    policyPageTitle: "Auction Rules",
    btnBackToReg: "Back",
    btnBackToRegFromInfo: "Back to Registration",
    photoTitle: "Player Photo",
    photoLabel: "Upload Profile Picture",
    photoHelp: "High quality photos supported. Compressed automatically.",
    btnBack1: "Back",
    btnContinue: "Continue",
    step2Title: "Cricket Profile & Kit",
    step3Title: "Summary & Payment",
    step2Desc: "Please review your details before proceeding.",
    sumAgeLabel: "Age",
    sumBatDetailsLabel: "Batting Details",
    jerseyTitle: "JERSEY",
    jerseySeason: "Season 2 Jersey",
    jerseyNumLabel: "Jersey Number (preference)",
    jerseySizeLabel: "Jersey Size",
    feeLabel: "Registration Fee",
    btnBack2: "Back",
    btnPay: "Pay ₹100 & Register",
    securePayText: "Secure payment powered by Razorpay",
    helpTitle: "Need help with registration?",
    btnChat: "Chat with Support"
  },
  bn: {
    langBtnText: "English",
    formSubtitle: "সিঙ্গেল প্লেয়ার রেজিস্ট্রেশন",
    step1Label: "ধাপ ১ / ৩",
    step2Label: "ধাপ ২ / ৩",
    step3Label: "ধাপ ৩ / ৩",
    kitSelectionTitle: "ক্রিকেট প্রোফাইল ও কিট",
    personalDetailsTitle: "ব্যক্তিগত বিবরণ",
    labelFullName: "পুরো নাম",
    placeholderFullName: "যেমন: রোহিত শর্মা",
    labelAge: "বয়স",
    labelMobile: "মোবাইল নম্বর",
    placeholderMobile: "১০-সংখ্যার মোবাইল নম্বর",
    labelEmailMain: "ইমেইল ঠিকানা",
    labelEmailOpt: "(ঐচ্ছিক)",
    placeholderEmail: "পেমেন্ট রসিদের জন্য",
    playerStatsTitle: "খেলোয়াড়ের পরিসংখ্যান",
    labelPrimaryRole: "প্রাথমিক ভূমিকা",
    roleBatsman: "ব্যাটসম্যান",
    roleBowler: "বোলার",
    roleAllRounder: "অলরাউন্ডার",
    roleKeeper: "কিপার",
    labelBattingStyle: "ব্যাটিং স্টাইল",
    batRight: "ডানহাতি ব্যাট",
    batLeft: "বাঁহাতি ব্যাট",
    labelBowlingStyle: "বোলিং স্টাইল",
    bowlNone: "নেই / পিওর ব্যাটসম্যান",
    bowlRightPace: "ডানহাতি পেস",
    bowlRightSpin: "ডানহাতি স্পিন",
    bowlLeftPace: "বাঁহাতি পেস",
    bowlLeftSpin: "বাঁহাতি স্পিন",
    rulesTitle: "টুর্নামেন্টের নিয়মাবলী",
    rule1: "Tournament চলাকালীন খারাপ আচরণ, ঝামেলা বা অসভ্যতা করলে Player Suspend হতে পারে।",
    rule2: "বোলারদের একটি নির্দিষ্ট গতিসীমা থাকবে এবং তাদের নির্দিষ্ট বক্স লাইনের মধ্যে দাঁড়িয়ে বল করতে হবে।",
    rule3: "যদি কোনো খেলোয়াড়ের কোনো সমস্যা থাকে, তবে তাকে অধিনায়ককে (Captain) জানাতে হবে। অধিনায়ক তারপর টুর্নামেন্ট কমিটিকে জানাবেন।",
    rule4: "যদি কোনো খেলোয়াড় অন্য কোনো খেলোয়াড় বা কমিটির সদস্যকে স্লেজিং (Sledging) বা অপমান করে, তবে তাকে <strong>২ ম্যাচের জন্য নিষিদ্ধ (ban)</strong> করা হবে।",
    rule5: "খেলোয়াড়দের ঠিক সময়ে মাঠে পৌঁছাতে হবে; অন্যথায় তাদের টুর্নামেন্ট থেকে <strong>বাতিল</strong> করা হবে।",
    rule6: "ফর্ম পূরণ করলেই দলে সুযোগ পাওয়া নিশ্চিত নয়। খেলোয়াড়দের নিলামের মাধ্যমে কেনা হবে।",
    rule7: "টুর্নামেন্ট চলাকালীন খারাপ আচরণ বা বিশৃঙ্খলা করলে খেলোয়াড়কে বহিষ্কার করা হতে পারে।",
    rule8: "খেলোয়াড় নির্বাচন এবং নিলাম সংক্রান্ত বিষয়ে আয়োজকদের সিদ্ধান্তই চূড়ান্ত।",
    ruleAdvisory: "ফর্ম পূরণ করার আগে সব নিয়ম এবং নীতিগুলি সাবধানে পড়ুন।",
    consentLabel: "আমি এই নিয়মগুলি পড়েছি এবং মেনে চলতে রাজি আছি।",
    infoLinkText: "সঠিক তথ্য প্রদান",
    infoLinkDesc: "ফর্ম পূরণ করার আগে নিয়মগুলো পড়ুন।",
    infoBtnView: "নিয়মাবলী দেখুন",
    infoPageTitle: "সঠিক তথ্য প্রদান",
    policyLinkText: "নিলামের নিয়মাবলী",
    policyLinkDesc: "অফিসিয়াল নিলামের বিডিং নিয়মাবলী পড়ুন।",
    policyBtnView: "নিলামের নিয়মাবলী",
    policyPageTitle: "নিলামের নিয়মাবলী",
    btnBackToReg: "পেছনে",
    btnBackToRegFromInfo: "রেজিস্ট্রেশনে ফিরে যান",
    photoTitle: "খেলোয়াড়ের ছবি",
    photoLabel: "প্রোফাইল ছবি আপলোড করুন",
    photoHelp: "উচ্চ মানের ছবি আপলোড করুন। অটোমেটিক কম্প্রেস হবে।",
    btnBack1: "পেছনে",
    btnContinue: "চালিয়ে যান",
    step2Title: "ক্রিকেট প্রোফাইল ও কিট",
    step3Title: "সারাংশ এবং পেমেন্ট",
    step2Desc: "এগিয়ে যাওয়ার আগে আপনার বিবরণ পর্যালোচনা করুন।",
    sumAgeLabel: "বয়স",
    sumBatDetailsLabel: "ব্যাটিং বিবরণ",
    jerseyTitle: "জার্সি",
    jerseySeason: "সিজন ২ জার্সি",
    jerseyNumLabel: "জার্সি নম্বর (পছন্দ অনুযায়ী)",
    jerseySizeLabel: "জার্সির সাইজ",
    feeLabel: "রেজিস্ট্রেশন ফি",
    btnBack2: "পেছনে",
    btnPay: "১০০ টাকা দিন এবং রেজিস্টার করুন",
    securePayText: "রেজারপে দ্বারা সুরক্ষিত পেমেন্ট",
    helpTitle: "রেজিস্ট্রেশনে সাহায্য লাগবে?",
    btnChat: "সাপোর্টের সাথে কথা বলুন"
  }
};

type LanguageContextType = {
  currentLang: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<Language>("en");

  const toggleLanguage = () => {
    setCurrentLang((prev: Language) => (prev === "en" ? "bn" : "en"));
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[currentLang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
