import React from 'react';
import { ArrowUpDown, Building, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { EnquiryType } from '../types';

interface ServicesSectionProps {
  onEnquire: (type: EnquiryType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onEnquire }) => {
  const services = [
    {
      icon: ArrowUpDown,
      title: 'Buying and Selling Properties',
      description: 'Assistance for customers exploring property purchases or looking to sell their property.',
      enquiryType: 'Buying a Property' as EnquiryType,
      actionText: 'Enquire About Buying / Selling',
    },
    {
      icon: Building,
      title: 'Residential and Commercial Properties',
      description: 'Options and guidance for residential homes and commercial property requirements.',
      enquiryType: 'Residential Property' as EnquiryType,
      actionText: 'Explore Property Options',
    },
    {
      icon: TrendingUp,
      title: 'Property Investment Assistance',
      description: 'Support in exploring property opportunities based on your budget and objectives.',
      enquiryType: 'Property Investment' as EnquiryType,
      actionText: 'Request Investment Guidance',
    },
    {
      icon: Users,
      title: 'Personalised Property Consultation',
      description: 'Discuss your preferences, location, budget, and requirements with our team.',
      enquiryType: 'General Enquiry' as EnquiryType,
      actionText: 'Schedule Consultation',
    },
  ];

  return (
    <section id="services-section" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
            Comprehensive Real Estate Services
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14283F] leading-tight mb-4">
            Our Core Property Services
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Delivering dedicated advisory, market matchmaking, and personalized representation for home seekers and property owners across Delhi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#F6F7F9] p-6 rounded-xl border border-slate-200/90 hover:border-[#C5A15A]/50 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#14283F] text-[#C5A15A] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#14283F] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onEnquire(item.enquiryType)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14283F] group-hover:text-[#C5A15A] transition-colors self-start cursor-pointer pt-2"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
