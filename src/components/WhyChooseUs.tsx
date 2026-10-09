import React from 'react';
import { UserCheck, Heart, MessageSquare, Building2, Sliders, PhoneCall, Quote } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: UserCheck,
      title: 'Personalised property assistance',
      description: 'One-on-one attention from Esha Arora dedicated to understanding your specific family or business goals.',
    },
    {
      icon: Heart,
      title: 'A customer-focused approach',
      description: 'Your priorities dictate our search. No aggressive sales tactics or biased property steering.',
    },
    {
      icon: MessageSquare,
      title: 'Clear and professional communication',
      description: 'Prompt updates, honest feedback on property condition, and transparent discussion of market pricing.',
    },
    {
      icon: Building2,
      title: 'Residential and commercial guidance',
      description: 'Full-spectrum capability covering family homes, builder floors, corporate offices, and retail premises.',
    },
    {
      icon: Sliders,
      title: 'Assistance tailored to your budget',
      description: 'Realistic recommendations matched precisely to your budget brackets without compromising lifestyle essentials.',
    },
    {
      icon: PhoneCall,
      title: 'Convenient ways to contact our team',
      description: 'Instant accessibility via direct phone, WhatsApp chat, email, or in-person consultation in Krishna Nagar.',
    },
  ];

  return (
    <section className="py-16 bg-[#F6F7F9] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
            Distinctive Quality & Value
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14283F] leading-tight">
            Why Choose Arora Real Estate?
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] mt-3">
            Committed to making every transaction smooth, clear, and reassuring.
          </p>
        </div>

        {/* 6 Selling Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md hover:border-[#C5A15A]/40 transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#14283F]/5 text-[#14283F] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#C5A15A]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#14283F] mb-1.5">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* A Customer-First Approach (Neutral & Authentic - Section 18) */}
        <div className="bg-[#14283F] text-white rounded-2xl p-8 sm:p-10 border border-[#203D5B] relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#C5A15A]/20 text-[#C5A15A] flex items-center justify-center mx-auto mb-4">
              <Quote className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 text-white">
              A Customer-First Approach
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
              "Every property requirement is different. We focus on listening carefully, communicating clearly, and helping customers explore options that suit their needs."
            </p>
            <div className="text-xs text-[#C5A15A] font-semibold uppercase tracking-wider">
              ARORA REAL ESTATE — Where Your Property Dreams Become Reality.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
