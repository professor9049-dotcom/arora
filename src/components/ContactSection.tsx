import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { EnquiryType } from '../types';

interface ContactSectionProps {
  initialEnquiryType?: EnquiryType;
  propertyContext?: { id: string; title: string };
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialEnquiryType = 'General Enquiry',
  propertyContext,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    enquiryType: initialEnquiryType,
    preferredLocation: '',
    budget: '',
    message: propertyContext
      ? `Hello Esha Arora, I am inquiring about the listing: "${propertyContext.title}". Please share further details.`
      : '',
    consentGiven: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid phone number is required (min 10 digits)';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a message or requirement summary';
    }

    if (!formData.consentGiven) {
      errs.consentGiven = 'Consent to contact is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await api.submitEnquiry({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        enquiryType: formData.enquiryType,
        preferredLocation: formData.preferredLocation,
        budget: formData.budget,
        message: formData.message,
        propertyId: propertyContext?.id,
        propertyTitle: propertyContext?.title,
        consentGiven: formData.consentGiven,
      });

      if (res.success) {
        setSuccessMessage(
          'Thank you for contacting Arora Real Estate! Your enquiry has been submitted successfully. Our team will contact you regarding your property requirements.'
        );
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          enquiryType: 'General Enquiry',
          preferredLocation: '',
          budget: '',
          message: '',
          consentGiven: false,
        });
      }
    } catch (err: any) {
      setErrors({ form: err.message || 'Submission failed. Please try again or call us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-16 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Business Contact Info (Left column) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
                Get in Touch
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14283F] leading-tight mb-4">
                Contact Arora Real Estate
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Connect directly with owner Esha Arora for personalized property advice, private site visits, or selling assessments.
              </p>
            </div>

            <div className="space-y-4">
              {/* Direct Telephone */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#14283F]/5 text-[#14283F] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#C5A15A]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Phone Call (Direct Dial)</span>
                  <a
                    href="tel:+918930144597"
                    className="text-base font-bold text-[#14283F] hover:text-[#C5A15A] transition-colors"
                  >
                    +91 8930144597
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Available for voice consultations</p>
                </div>
              </div>

              {/* Direct Email */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#14283F]/5 text-[#14283F] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#C5A15A]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Email Address</span>
                  <a
                    href="mailto:eshaarora927@gmail.com"
                    className="text-base font-bold text-[#14283F] hover:text-[#C5A15A] transition-colors break-all"
                  >
                    eshaarora927@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Official inquiry mailbox</p>
                </div>
              </div>

              {/* Physical Location */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#14283F]/5 text-[#14283F] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C5A15A]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Business Location</span>
                  <span className="text-sm font-bold text-[#14283F] block">
                    Krishna Nagar, Delhi, India
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">East Delhi corridor hub</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-[#14283F] block mb-1">Our Commitment to You:</span>
              We respect your privacy. Inquiries are handled directly by Esha Arora without automated spam or unsolicited third-party marketing.
            </div>
          </div>

          {/* Contact Form (Right column) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold font-serif text-[#14283F] mb-1">
                Send a Property Enquiry
              </h3>
              <p className="text-xs text-[#6B7280] mb-6">
                Tell us about your requirements and we will respond promptly.
              </p>

              {successMessage ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">Enquiry Submitted</h4>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    {successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccessMessage(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline pt-2 cursor-pointer"
                  >
                    <span>Send another message</span>
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
                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-fullName" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.fullName}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 8930144597"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email}</p>}
                    </div>

                    {/* Enquiry Type */}
                    <div>
                      <label htmlFor="contact-enquiryType" className="block text-xs font-semibold text-slate-700 mb-1">
                        Enquiry Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="contact-enquiryType"
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value as any })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      >
                        <option value="Buying a Property">Buying a Property</option>
                        <option value="Selling a Property">Selling a Property</option>
                        <option value="Residential Property">Residential Property</option>
                        <option value="Commercial Property">Commercial Property</option>
                        <option value="Property Investment">Property Investment</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Location */}
                    <div>
                      <label htmlFor="contact-prefLocation" className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Location <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-prefLocation"
                        type="text"
                        value={formData.preferredLocation}
                        onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                        placeholder="e.g. Krishna Nagar, Preet Vihar"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                    </div>

                    {/* Budget */}
                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-semibold text-slate-700 mb-1">
                        Budget Range <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-budget"
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. ₹75 Lakh - ₹1.5 Cr"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                      Message / Property Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your requirements (e.g. 3 BHK builder floor with lift, ready to move in)..."
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                    />
                    {errors.message && <p className="text-[11px] text-rose-500 mt-0.5">{errors.message}</p>}
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
                        I authorize Arora Real Estate to contact me regarding my property requirements. <span className="text-rose-500">*</span>
                      </span>
                    </label>
                    {errors.consentGiven && <p className="text-[11px] text-rose-500 mt-1">{errors.consentGiven}</p>}
                  </div>

                  {/* Submit button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] disabled:opacity-50 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#C5A15A]" />
                      <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry'}</span>
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
