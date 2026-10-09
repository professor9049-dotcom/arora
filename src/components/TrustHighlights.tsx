import React from 'react';
import { Compass, MessageCircleHeart, Building, UserCheck } from 'lucide-react';

export const TrustHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Compass,
      title: 'Personalised Guidance',
      description: 'Get property recommendations tailored to your needs, lifestyle, and budget.',
    },
    {
      icon: MessageCircleHeart,
      title: 'Transparent Communication',
      description: 'We focus on clear communication and help you understand the property journey.',
    },
    {
      icon: Building,
      title: 'Residential and Commercial',
      description: 'Explore options for living, working, and property investment across Delhi.',
    },
    {
      icon: UserCheck,
      title: 'Dedicated Assistance',
      description: 'Receive personal assistance throughout your property search and enquiry process.',
    },
  ];

  return (
    <section className="py-12 bg-[#F6F7F9] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
            The Arora Real Estate Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14283F]">
            Built on Trust, Clarity & Local Insight
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#C5A15A]/40 transition-all duration-200 flex flex-col group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#14283F]/5 text-[#14283F] group-hover:bg-[#14283F] group-hover:text-[#C5A15A] flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-105" />
                </div>
                <h3 className="text-base font-bold text-[#14283F] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
