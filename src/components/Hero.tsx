import React, { useState } from 'react';
import { Search, RotateCcw, ArrowRight, ShieldCheck, MapPin, IndianRupee, Home } from 'lucide-react';
import { PropertyFilterParams } from '../types';

interface HeroProps {
  onSearch: (params: PropertyFilterParams) => void;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onExploreClick,
  onContactClick,
}) => {
  const [purpose, setPurpose] = useState<string>('all');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [budget, setBudget] = useState<string>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      purpose,
      propertyType,
      location,
      budget,
    });
  };

  const handleReset = () => {
    setPurpose('all');
    setPropertyType('all');
    setLocation('all');
    setBudget('all');
    onSearch({
      purpose: 'all',
      propertyType: 'all',
      location: 'all',
      budget: 'all',
    });
  };

  return (
    <div className="relative bg-[#14283F] text-white">
      {/* Hero Visual Background with Measured Contrast Scrim */}
      <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_delhi_luxury_home_1791555914513.jpg"
            alt="Arora Real Estate - Premium Residential and Commercial Properties in Delhi"
            className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback styling if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Measured Scrim for WCAG AA readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1C2E]/95 via-[#14283F]/85 to-[#14283F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14283F] via-transparent to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-3xl">
            {/* Quiet Editorial Kicker - No pills */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-4">
              <span>Arora Real Estate</span>
              <span aria-hidden="true">·</span>
              <span>Krishna Nagar, Delhi</span>
              <span aria-hidden="true">·</span>
              <span>Your Dream Home, Our Commitment</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.15] text-balance mb-6">
              Find a Place You'll Be Proud to Call Home.
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl mb-8">
              Discover residential and commercial properties with Arora Real Estate. Whether you're buying your first home, selling a property, or exploring an investment opportunity, we're here to guide you every step of the way.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#14283F] bg-[#C5A15A] hover:bg-[#B5914A] rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-lg transition-colors cursor-pointer"
              >
                <span>Contact Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Property Search Panel */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 lg:-mt-14 mb-8">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-5 sm:p-7 text-[#222B35]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base font-bold text-[#14283F]">
                Search Verified Property Inventory
              </h2>
              <p className="text-xs text-[#6B7280]">
                Filter by purpose, property category, Delhi location, and budget
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#14283F] transition-colors self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Purpose */}
            <div>
              <label htmlFor="search-purpose" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Property Purpose
              </label>
              <select
                id="search-purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C5A15A] focus:border-transparent transition-shadow"
              >
                <option value="all">Any Purpose (All)</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="search-type" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Property Type
              </label>
              <select
                id="search-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C5A15A] focus:border-transparent transition-shadow"
              >
                <option value="all">All Property Types</option>
                <option value="Apartment / Flat">Apartment / Flat</option>
                <option value="Independent House">Independent House</option>
                <option value="Villa">Villa</option>
                <option value="Builder Floor">Builder Floor</option>
                <option value="Plot / Land">Plot / Land</option>
                <option value="Office Space">Office Space</option>
                <option value="Shop / Retail Space">Shop / Retail Space</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="search-location" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Location in Delhi
              </label>
              <select
                id="search-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C5A15A] focus:border-transparent transition-shadow"
              >
                <option value="all">All Delhi Locations</option>
                <option value="Krishna Nagar">Krishna Nagar (Local Hub)</option>
                <option value="East Delhi">East Delhi</option>
                <option value="North Delhi">North Delhi</option>
                <option value="South Delhi">South Delhi</option>
                <option value="West Delhi">West Delhi</option>
                <option value="Central Delhi">Central Delhi</option>
                <option value="Other Location">Other Location</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="search-budget" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Budget Range
              </label>
              <select
                id="search-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C5A15A] focus:border-transparent transition-shadow"
              >
                <option value="all">Any Budget</option>
                <option value="under-25L">Under ₹25 lakh</option>
                <option value="25L-50L">₹25–50 lakh</option>
                <option value="50L-1Cr">₹50 lakh–₹1 crore</option>
                <option value="1Cr-2Cr">₹1–2 crore</option>
                <option value="above-2Cr">Above ₹2 crore</option>
              </select>
            </div>

            {/* Submit Bar */}
            <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#C5A15A]" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
