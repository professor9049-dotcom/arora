import React from 'react';
import { Home, Briefcase, HelpCircle, ArrowRight } from 'lucide-react';

interface BuySectionProps {
  onDiscussRequirements: () => void;
  onBrowseResidential: () => void;
  onBrowseCommercial: () => void;
}

export const BuySection: React.FC<BuySectionProps> = ({
  onDiscussRequirements,
  onBrowseResidential,
  onBrowseCommercial,
}) => {
  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
            Property Acquisition Assistance
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14283F] leading-tight mb-4">
            Find the Right Property for Your Future
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Whether you're searching for your first home, upgrading to a larger space, or exploring a property purchase, Arora Real Estate can help you navigate your options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1: Residential Buying */}
          <div className="bg-[#F6F7F9] p-7 rounded-xl border border-slate-200 hover:border-[#C5A15A]/40 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#14283F] text-[#C5A15A] flex items-center justify-center mb-5">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#14283F] mb-3">
                Residential Buying
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                Explore apartments, flats, independent houses, builder floors, and other residential options across premier Delhi neighbourhoods.
              </p>
            </div>
            <button
              type="button"
              onClick={onBrowseResidential}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#14283F] group-hover:text-[#C5A15A] transition-colors self-start cursor-pointer"
            >
              <span>Explore Residential</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Commercial Buying */}
          <div className="bg-[#F6F7F9] p-7 rounded-xl border border-slate-200 hover:border-[#C5A15A]/40 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#14283F] text-[#C5A15A] flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#14283F] mb-3">
                Commercial Buying
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                Discover commercial property opportunities suitable for offices, retail shops, showrooms, and business premises with prime frontage.
              </p>
            </div>
            <button
              type="button"
              onClick={onBrowseCommercial}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#14283F] group-hover:text-[#C5A15A] transition-colors self-start cursor-pointer"
            >
              <span>Explore Commercial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Property Consultation */}
          <div className="bg-[#F6F7F9] p-7 rounded-xl border border-slate-200 hover:border-[#C5A15A]/40 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#14283F] text-[#C5A15A] flex items-center justify-center mb-5">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#14283F] mb-3">
                Property Consultation
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                Discuss your preferences, budget, preferred location, and property requirements with experienced local advisors in Krishna Nagar.
              </p>
            </div>
            <button
              type="button"
              onClick={onDiscussRequirements}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#14283F] group-hover:text-[#C5A15A] transition-colors self-start cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-[#14283F] text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl font-bold font-serif mb-2">
              Ready to take the next step in your property journey?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Share your location preferences and budget with Esha Arora for personalized property matchmaking.
            </p>
          </div>
          <button
            type="button"
            onClick={onDiscussRequirements}
            className="px-6 py-3 text-sm font-semibold text-[#14283F] bg-[#C5A15A] hover:bg-[#B5914A] rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            Discuss Your Requirements
          </button>
        </div>
      </div>
    </section>
  );
};
