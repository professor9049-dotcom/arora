import React, { useState } from 'react';
import { Property, PropertyCategory } from '../types';
import { PropertyCard } from './PropertyCard';
import { Building2, SearchX, MessageSquare } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  onEnquire: (property?: Property) => void;
  activeCategory?: 'All' | 'Residential' | 'Commercial';
  onCategoryChange?: (category: 'All' | 'Residential' | 'Commercial') => void;
  title?: string;
  subtitle?: string;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onViewDetails,
  onEnquire,
  activeCategory = 'All',
  onCategoryChange,
  title = 'Featured Properties',
  subtitle = 'Explore property opportunities and discover a space that suits your goals.',
}) => {
  const [internalCategory, setInternalCategory] = useState<'All' | 'Residential' | 'Commercial'>('All');

  const selectedCategory = onCategoryChange ? activeCategory : internalCategory;

  const handleTabClick = (cat: 'All' | 'Residential' | 'Commercial') => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="properties-section" className="py-16 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
              Curated Delhi Portfolios
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14283F] leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-2">
              {subtitle}
            </p>
          </div>

          {/* Interactive Segmented Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start md:self-auto">
            {(['All', 'Residential', 'Commercial'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === tab
                    ? 'bg-white text-[#14283F] shadow-sm'
                    : 'text-slate-600 hover:text-[#14283F]'
                }`}
              >
                {tab === 'All' ? 'All Portfolios' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid or Empty State */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={onViewDetails}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        ) : (
          /* Mandated Empty State */
          <div className="bg-white rounded-xl border border-slate-200/90 p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#14283F]/5 text-[#14283F] flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-[#C5A15A]" />
            </div>
            <h3 className="text-lg font-bold text-[#14283F] mb-2">
              Looking for the right property?
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
              Contact our team for assistance with available opportunities across Krishna Nagar and Delhi NCR.
            </p>
            <button
              type="button"
              onClick={() => onEnquire()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#C5A15A]" />
              <span>Find My Property</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
