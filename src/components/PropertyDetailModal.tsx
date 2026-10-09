import React, { useState, useEffect } from 'react';
import { X, Bed, Bath, Maximize, MapPin, Phone, MessageSquare, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { Property } from '../types';
import { api } from '../services/api';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (property) {
      setActiveImageIndex(0);
      setSuccessMessage(null);
      setErrorMessage(null);
      setEnquiryMessage(
        `Hello Esha Arora, I am interested in viewing "${property.title}". Please arrange a consultation or site visit.`
      );
    }
  }, [property]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const images =
    property.imageUrls && property.imageUrls.length > 0
      ? property.imageUrls
      : ['/src/assets/images/hero_delhi_luxury_home_1791555914513.jpg'];

  const whatsappMessage = encodeURIComponent(
    `Hello Arora Real Estate, I am interested in ${property.title}. Please share more information.`
  );
  const whatsappUrl = `https://wa.me/918930144597?text=${whatsappMessage}`;

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!enquiryName.trim()) {
      setErrorMessage('Full Name is required');
      return;
    }
    const cleanPhone = enquiryPhone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('A valid phone number is required');
      return;
    }
    if (!consentGiven) {
      setErrorMessage('Consent to contact is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitEnquiry({
        fullName: enquiryName,
        phone: enquiryPhone,
        email: enquiryEmail,
        enquiryType: property.category === 'Residential' ? 'Residential Property' : 'Commercial Property',
        message: enquiryMessage,
        propertyId: property.id,
        propertyTitle: property.title,
        consentGiven: true,
      });

      if (res.success) {
        setSuccessMessage('Thank you! Your enquiry has been received. Esha Arora will contact you shortly.');
        setEnquiryName('');
        setEnquiryPhone('');
        setEnquiryEmail('');
        setConsentGiven(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Sticky Close Header */}
        <div className="sticky top-0 right-0 z-20 flex justify-between items-center p-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#14283F]">{property.category}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600">{property.propertyType}</span>
            {property.isDemo && (
              <span className="ml-2 px-2 py-0.5 text-[11px] font-semibold uppercase bg-amber-500 text-white rounded">
                Demo Property
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close property details"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 shadow-inner">
              <img
                src={images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#14283F]/85 text-white px-3 py-1.5 rounded-lg text-sm font-bold font-serif shadow-sm">
                {property.price}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#C5A15A] scale-102 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and Specs */}
          <div>
            <h2 id="property-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-[#14283F] leading-tight mb-2">
              {property.title}
            </h2>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
              <MapPin className="w-4 h-4 text-[#C5A15A] shrink-0" />
              <span>{property.locationDetails}</span>
            </div>

            {/* Specs Strip */}
            <div className="flex flex-wrap items-center gap-6 py-3 px-4 bg-[#F6F7F9] rounded-xl text-xs text-slate-700 font-mono tabular-nums border border-slate-200/80">
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-[#14283F]" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-[#14283F]" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-2">
                  <Maximize className="w-4 h-4 text-[#14283F]" />
                  <span>{property.area} Area</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#14283F]" />
                <span>Purpose: {property.listingPurpose}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-[#14283F] uppercase tracking-wider mb-2">
              Property Description
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#14283F] uppercase tracking-wider mb-3">
                Key Features & Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-lg text-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fast Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href="tel:+918930144597"
              className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C5A15A]" />
              <span>Call Esha Arora (+91 8930144597)</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Inline "Interested in This Property?" Form */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-base font-serif font-bold text-[#14283F] mb-1">
              Interested in This Property?
            </h3>
            <p className="text-xs text-[#6B7280] mb-4">
              Contact Arora Real Estate to discuss this listing and request further information.
            </p>

            {successMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-medium text-emerald-900">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3">
                {errorMessage && (
                  <div className="p-2.5 text-xs bg-rose-50 text-rose-700 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="prop-modal-name" className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="prop-modal-name"
                      type="text"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      placeholder="Name"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="prop-modal-phone" className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="prop-modal-phone"
                      type="tel"
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      placeholder="+91 8930144597"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="prop-modal-email" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email Address (optional)
                  </label>
                  <input
                    id="prop-modal-email"
                    type="email"
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
                  />
                </div>

                <div>
                  <label htmlFor="prop-modal-message" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="prop-modal-message"
                    rows={2}
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="prop-modal-consent"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="rounded text-[#14283F] focus:ring-[#C5A15A]"
                  />
                  <label htmlFor="prop-modal-consent" className="text-[11px] text-slate-600 cursor-pointer">
                    I agree to be contacted by Arora Real Estate regarding this listing. *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Property Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
