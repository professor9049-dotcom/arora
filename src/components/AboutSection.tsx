import React from 'react';
import { MapPin, Phone, Mail, Award, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about-section" className="py-16 lg:py-20 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Owner Profile Card (Left column) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A15A]/10 rounded-bl-full pointer-events-none" />

              {/* Initials-based Monogram Avatar (Strict compliance: no fake photos) */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-[#14283F] border-2 border-[#C5A15A] flex items-center justify-center text-white shadow-md">
                  <span className="font-serif text-2xl font-bold tracking-wider text-[#C5A15A]">
                    EA
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#14283F] font-serif">
                    Esha Arora
                  </h3>
                  <p className="text-xs font-semibold text-[#C5A15A] uppercase tracking-wider">
                    Owner, Arora Real Estate
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A15A]" />
                    <span>Krishna Nagar, Delhi, India</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-100 text-xs text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#14283F]" />
                  <a href="tel:+918930144597" className="hover:text-[#C5A15A] transition-colors font-semibold">
                    +91 8930144597
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#14283F]" />
                  <a href="mailto:eshaarora927@gmail.com" className="hover:text-[#C5A15A] transition-colors">
                    eshaarora927@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#14283F]" />
                  <span>Personalised Property Guidance</span>
                </div>
              </div>

              {/* Our Promise Quote */}
              <blockquote className="bg-[#14283F] text-white p-5 rounded-xl text-xs sm:text-sm italic leading-relaxed relative">
                <p>
                  "Every great journey begins with the right address. Let Arora Real Estate help you find a place to call home."
                </p>
                <footer className="mt-2 text-[11px] text-[#C5A15A] not-italic font-semibold text-right">
                  — Esha Arora
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Business Philosophy & Story (Right column) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
              About Arora Real Estate
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14283F] leading-tight mb-6">
              Your Trusted Partner in Finding Your Dream Property
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mb-8">
              <p className="font-medium text-[#14283F]">
                "At Arora Real Estate, we help you find the perfect property that matches your needs, lifestyle, and budget. Whether you are looking to buy, sell, or invest in real estate, we are committed to making your property journey smooth, transparent, and hassle-free."
              </p>
              
              <p className="text-slate-600">
                Choosing a property is an important decision. We believe the process should begin with understanding your requirements, answering your questions clearly, and helping you explore suitable options.
              </p>

              <p className="text-slate-600">
                From residential homes to commercial spaces, our focus is on providing personalised assistance and making your property search more convenient.
              </p>
            </div>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0 mt-0.5" />
                <span>Deep local familiarity with Krishna Nagar & Delhi NCR</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0 mt-0.5" />
                <span>Transparent pricing and requirement matching</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0 mt-0.5" />
                <span>Single point of contact from discovery to closing</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0 mt-0.5" />
                <span>No pressure, client-first advisory approach</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onContactClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Connect with Esha Arora
              </button>
              
              <a
                href="tel:+918930144597"
                className="px-5 py-3 text-sm font-semibold text-[#14283F] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                Call +91 8930144597
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
