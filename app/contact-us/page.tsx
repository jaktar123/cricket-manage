"use client";

import React from "react";
import { InfoLayout } from "@/components/InfoLayout";

export default function ContactUs() {
  return (
    <InfoLayout title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4 uppercase tracking-wider text-sm">Main Office</h2>
            <p className="text-slate-700">
              Jugore, West Bengal, India<br />
              Cricket Ground Road, PIN: 742121
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4 uppercase tracking-wider text-sm">Registration Support</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <i className="fa-solid fa-phone text-blue-600"></i>
                </div>
                <div>
                  <p className="text-yellow-600 text-[10px] font-black uppercase tracking-widest">Jamil</p>
                  <p className="text-slate-900 font-bold">+91 9907434605</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <i className="fa-solid fa-phone text-blue-600"></i>
                </div>
                <div>
                  <p className="text-yellow-600 text-[10px] font-black uppercase tracking-widest">Ayatullah</p>
                  <p className="text-slate-900 font-bold">+91 6294979597</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-yellow-500 pl-4 uppercase tracking-wider text-sm">Email Us</h2>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <i className="fa-solid fa-envelope text-emerald-600"></i>
              </div>
              <div>
                <p className="text-yellow-600 text-[10px] font-black uppercase tracking-widest">General Inquiries</p>
                <p className="text-slate-900 font-bold">jamilaktar27856@gmail.com</p>
              </div>
            </div>
          </section>
        </div>

        {/* Quick Message Form Placeholder/Visual */}
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <i className="fa-solid fa-message text-3xl text-brand-primary"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Send us a message</h3>
          <p className="text-slate-600 text-sm">
            For faster assistance, please call the numbers listed or message us on WhatsApp using the same numbers.
          </p>
          <div className="w-full pt-4">
             <button 
               onClick={() => window.open('https://wa.me/919907434605', '_blank')}
               className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-3"
             >
               <i className="fa-brands fa-whatsapp text-xl"></i>
               CHAT ON WHATSAPP
             </button>
          </div>
        </div>
      </div>
    </InfoLayout>
  );
}
