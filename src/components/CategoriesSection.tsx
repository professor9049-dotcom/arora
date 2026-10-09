import React from 'react';
import { ArrowRight, Building, Home, Briefcase, Landmark, Store } from 'lucide-react';
import { PropertyType } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (category: 'Residential' | 'Commercial', type?: PropertyType) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const residentialCategories = [
    {
      title: 'Apartments & Flats',
      type: 'Apartment / Flat' as PropertyType,
      desc: 'Modern high-rise residences with verified amenities, security, and metro connectivity.',
      image: '/src/assets/images/property_delhi_apartment_1791555927643.jpg',
    },
    {
      title: 'Builder Floors',
      type: 'Builder Floor' as PropertyType,
      desc: 'Independent floor living with stilt car parking, private lift, and low-density privacy.',
      image: '/src/assets/images/property_builder_floor_1791555943176.jpg',
    },
    {
      title: 'Luxury Villas & Houses',
      type: 'Villa' as PropertyType,
      desc: 'Expansive private houses with independent driveway, landscaped lawns, and multi-level floorplans.',
      image: '/src/assets/images/property_luxury_villa_1791555971141.jpg',
    },
  ];

  const commercialCategories = [
    {
      title: 'Corporate Office Spaces',
      type: 'Office Space' as PropertyType,
      desc: 'Grade-A professional workspaces with open floorplates, fiber internet, and 100% power backup.',
      image: '/src/assets/images/property_commercial_space_1791555957934.jpg',
    },
    {
      title: 'High-Street Retail Shops',
      type: 'Shop / Retail Space' as PropertyType,
      desc: 'Prime ground-floor retail shops and showrooms located in busy commercial markets with heavy footfall.',
      image: '/src/assets/images/property_commercial_space_1791555957934.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Residential Portfolios */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-1.5">
                Living Spaces
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14283F]">
                Residential Portfolios
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onSelectCategory('Residential')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14283F] hover:text-[#C5A15A] transition-colors self-start cursor-pointer"
            >
              <span>View All Residential</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {residentialCategories.map((item, idx) => (
              <div
                key={idx}
                className="group bg-[#F6F7F9] rounded-xl overflow-hidden border border-slate-200 hover:shadow-md hover:border-[#C5A15A]/40 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="font-bold text-base block font-serif">{item.title}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('Residential', item.type)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14283F] group-hover:text-[#C5A15A] transition-colors self-start cursor-pointer"
                  >
                    <span>Browse Properties</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Portfolios */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-1.5">
                Business & Investment Premises
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14283F]">
                Commercial Portfolios
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onSelectCategory('Commercial')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14283F] hover:text-[#C5A15A] transition-colors self-start cursor-pointer"
            >
              <span>View All Commercial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commercialCategories.map((item, idx) => (
              <div
                key={idx}
                className="group bg-[#F6F7F9] rounded-xl overflow-hidden border border-slate-200 hover:shadow-md hover:border-[#C5A15A]/40 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="font-bold text-base block font-serif">{item.title}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('Commercial', item.type)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14283F] group-hover:text-[#C5A15A] transition-colors self-start cursor-pointer"
                  >
                    <span>Browse Properties</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
