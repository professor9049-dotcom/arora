import React, { useState } from 'react';
import { Building, CheckCircle2, AlertCircle, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { PropertySubmission } from '../types';

export const SellSection: React.FC = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    email: '',
    propertyLocation: '',
    propertyType: 'Apartment / Flat',
    listingType: 'Sale' as 'Sale' | 'Rent',
    expectedPrice: '',
    propertySize: '',
    bedrooms: '',
    description: '',
    preferredContact: 'Phone' as 'Phone' | 'WhatsApp' | 'Email',
    consentGiven: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.ownerName.trim()) {
      errs.ownerName = "Owner's full name is required";
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid phone number is required (min 10 digits)';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }

    if (!formData.propertyLocation.trim()) {
      errs.propertyLocation = 'Property location/area is required';
    }

    if (!formData.expectedPrice.trim()) {
      errs.expectedPrice = 'Expected price or rent is required';
    }

    if (!formData.propertySize.trim()) {
      errs.propertySize = 'Property size/area is required (e.g. 1500 sq.ft.)';
    }

    if (!formData.consentGiven) {
      errs.consentGiven = 'Please give consent to review your property details';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await api.submitProperty(formData);
      if (res.success) {
        setSuccessMessage(res.message);
        setFormData({
          ownerName: '',
          phone: '',
          email: '',
          propertyLocation: '',
          propertyType: 'Apartment / Flat',
          listingType: 'Sale',
          expectedPrice: '',
          propertySize: '',
          bedrooms: '',
          description: '',
          preferredContact: 'Phone',
          consentGiven: false,
        });
      }
    } catch (err: any) {
      setErrors({ form: err.message || 'Unable to submit property details at this time.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sell-section" className="py-16 bg-[#F6F7F9] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Information Column */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
              For Property Owners
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14283F] leading-tight mb-4">
              Thinking About Selling Your Property?
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed mb-8">
              Let us understand your property, your expectations, and your preferred timeline. Our team can discuss suitable next steps and help you connect with interested buyers where available.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#14283F] text-[#C5A15A] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#14283F]">Submit Details Privately</h3>
                  <p className="text-xs text-[#6B7280]">
                    Your property information and contact details are kept strictly confidential with Esha Arora.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#14283F] text-[#C5A15A] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#14283F]">Personal Consultation</h3>
                  <p className="text-xs text-[#6B7280]">
                    We review local market trends in your Delhi locality to determine realistic pricing expectations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#14283F] text-[#C5A15A] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#14283F]">Screened Buyer Matching</h3>
                  <p className="text-xs text-[#6B7280]">
                    We introduce genuine, pre-qualified buyers to save your valuable time and avoid unnecessary visits.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-[#14283F] mb-1">Direct Seller Helpline:</div>
              <a href="tel:+918930144597" className="text-base font-bold text-[#14283F] hover:text-[#C5A15A] transition-colors">
                +91 8930144597
              </a>
              <div className="text-xs text-slate-500 mt-1">Esha Arora, Arora Real Estate, Krishna Nagar</div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold font-serif text-[#14283F] mb-1">
                List Your Property
              </h3>
              <p className="text-xs text-[#6B7280] mb-6">
                Fill in the details below to begin the assessment with our team.
              </p>

              {successMessage ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">Submission Received</h4>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    {successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccessMessage(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline pt-2 cursor-pointer"
                  >
                    <span>Submit another property</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errors.form && (
                    <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Owner Name */}
                    <div>
                      <label htmlFor="sell-ownerName" className="block text-xs font-semibold text-slate-700 mb-1">
                        Owner's Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="sell-ownerName"
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.ownerName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.ownerName}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="sell-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="sell-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="sell-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="sell-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email}</p>}
                    </div>

                    {/* Listing Type: Sale or Rent */}
                    <div>
                      <label htmlFor="sell-listingType" className="block text-xs font-semibold text-slate-700 mb-1">
                        Listing Intention <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="sell-listingType"
                        value={formData.listingType}
                        onChange={(e) => setFormData({ ...formData, listingType: e.target.value as any })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      >
                        <option value="Sale">For Sale (Outright Sale)</option>
                        <option value="Rent">For Rent / Lease</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Location */}
                    <div>
                      <label htmlFor="sell-location" className="block text-xs font-semibold text-slate-700 mb-1">
                        Property Location / Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="sell-location"
                        type="text"
                        value={formData.propertyLocation}
                        onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                        placeholder="e.g. Krishna Nagar, East Delhi"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.propertyLocation && <p className="text-[11px] text-rose-500 mt-0.5">{errors.propertyLocation}</p>}
                    </div>

                    {/* Property Type */}
                    <div>
                      <label htmlFor="sell-propertyType" className="block text-xs font-semibold text-slate-700 mb-1">
                        Property Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="sell-propertyType"
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      >
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Expected Price */}
                    <div>
                      <label htmlFor="sell-price" className="block text-xs font-semibold text-slate-700 mb-1">
                        Expected Price / Rent <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="sell-price"
                        type="text"
                        value={formData.expectedPrice}
                        onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                        placeholder="e.g. ₹1.5 Cr or ₹40,000/mo"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.expectedPrice && <p className="text-[11px] text-rose-500 mt-0.5">{errors.expectedPrice}</p>}
                    </div>

                    {/* Size */}
                    <div>
                      <label htmlFor="sell-size" className="block text-xs font-semibold text-slate-700 mb-1">
                        Property Size <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="sell-size"
                        type="text"
                        value={formData.propertySize}
                        onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                        placeholder="e.g. 150 sq.yd / 1800 sq.ft"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.propertySize && <p className="text-[11px] text-rose-500 mt-0.5">{errors.propertySize}</p>}
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label htmlFor="sell-bedrooms" className="block text-xs font-semibold text-slate-700 mb-1">
                        Bedrooms <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="sell-bedrooms"
                        type="text"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        placeholder="e.g. 3 BHK"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="sell-desc" className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Property Description / Key Highlights
                    </label>
                    <textarea
                      id="sell-desc"
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="e.g. Corner property, 2nd floor with lift, stilt parking, recently renovated."
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <span className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Contact Method
                    </span>
                    <div className="flex items-center gap-4 text-xs">
                      {(['Phone', 'WhatsApp', 'Email'] as const).map((method) => (
                        <label key={method} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            checked={formData.preferredContact === method}
                            onChange={() => setFormData({ ...formData, preferredContact: method })}
                            className="text-[#14283F] focus:ring-[#C5A15A]"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentGiven}
                        onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                        className="mt-1 rounded text-[#14283F] focus:ring-[#C5A15A]"
                      />
                      <span className="text-xs text-slate-600">
                        I consent to Arora Real Estate contacting me regarding my property submission and storing the provided details for valuation and buyer matching purposes. <span className="text-rose-500">*</span>
                      </span>
                    </label>
                    {errors.consentGiven && <p className="text-[11px] text-rose-500 mt-1">{errors.consentGiven}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] disabled:opacity-50 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#C5A15A]" />
                      <span>{isSubmitting ? 'Submitting Details...' : 'Submit Property for Assessment'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
