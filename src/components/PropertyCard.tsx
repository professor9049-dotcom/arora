import React from 'react';
import { Bed, Bath, Maximize, MapPin, Eye, MessageSquare, Tag } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onEnquire: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onEnquire,
}) => {
  const primaryImage =
    property.imageUrls && property.imageUrls.length > 0
      ? property.imageUrls[0]
      : '/src/assets/images/hero_delhi_luxury_home_1791555914513.jpg';

  return (
    <article className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              '/src/assets/images/hero_delhi_luxury_home_1791555914513.jpg';
          }}
        />

        {/* Purpose Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-white bg-[#14283F]/90 backdrop-blur-sm rounded-md shadow-sm">
          <span>{property.listingPurpose === 'Buy' ? 'For Sale' : property.listingPurpose === 'Rent' ? 'For Rent' : 'Commercial'}</span>
        </div>

        {/* Clear Demonstration Listing Marker (Mandated) */}
        {property.isDemo && (
          <div className="absolute top-3 right-3 px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-amber-500/90 text-white rounded-md shadow-sm">
            Demo Property
          </div>
        )}

        {/* Price Overlay Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0D1C2E]/90 via-[#0D1C2E]/40 to-transparent p-3 pt-6">
          <div className="text-lg font-bold text-white font-serif">
            {property.price}
          </div>
        </div>
      </div>

      {/* Property Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-2">
            <span>{property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{property.category}</span>
          </div>

          <h3 className="text-base font-bold text-[#14283F] leading-snug line-clamp-2 mb-2 group-hover:text-[#203D5B] transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C5A15A] shrink-0" />
            <span className="truncate">{property.locationDetails}</span>
          </div>

          {/* Property Specifications Row */}
          <div className="flex items-center gap-4 py-3 border-y border-slate-100 text-xs text-slate-600 mb-4 font-mono tabular-nums">
            {property.bedrooms !== undefined && (
              <div className="flex items-center gap-1.5" title="Bedrooms">
                <Bed className="w-3.5 h-3.5 text-[#14283F]" />
                <span>{property.bedrooms} BHK</span>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1.5" title="Bathrooms">
                <Bath className="w-3.5 h-3.5 text-[#14283F]" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1.5" title="Built-up Area">
                <Maximize className="w-3.5 h-3.5 text-[#14283F]" />
                <span>{property.area}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onViewDetails(property)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#14283F] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          <button
            type="button"
            onClick={() => onEnquire(property)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A15A]" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </article>
  );
};
