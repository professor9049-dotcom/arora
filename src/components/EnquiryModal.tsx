import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { EnquiryType } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: EnquiryType;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialType = 'General Enquiry',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(initialType);
  const [preferredLocation, setPreferredLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEnquiryType(initialType);
      setSuccessMessage(null);
      setErrors({});
    }
  }, [isOpen, initialType]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) errs.phone = 'Valid phone number required';
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email required';
    if (!message.trim()) errs.message = 'Requirement details are required';
    if (!consentGiven) errs.consentGiven = 'Consent is required to proceed';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await api.submitEnquiry({
        fullName,
        phone,
        email,
        enquiryType,
        preferredLocation,
        budget,
        message,
        consentGiven: true,
      });

      if (res.success) {
        setSuccessMessage(
          'Thank you for contacting Arora Real Estate! Your enquiry has been submitted successfully. Our team will contact you regarding your property requirements.'
        );
        setFullName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setPreferredLocation('');
        setBudget('');
        setConsentGiven(false);
      }
    } catch (err: any) {
      setErrors({ form: err.message || 'Submission failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
          <div>
            <h2 id="enquiry-modal-title" className="text-xl font-serif font-bold text-[#14283F]">
              Enquire with Arora Real Estate
            </h2>
            <p className="text-xs text-[#6B7280]">
              Direct assistance from Esha Arora
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMessage ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="text-sm text-emerald-900 leading-relaxed font-medium">
              {successMessage}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-xs font-semibold text-white bg-[#14283F] rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.form && (
              <div className="p-2.5 text-xs bg-rose-50 text-rose-700 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
                />
                {errors.fullName && <p className="text-[10px] text-rose-500 mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 8930144597"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
                />
                {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Email (optional)
                </label>
                <input
                  id="modal-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
                />
              </div>

              <div>
                <label htmlFor="modal-type" className="block text-xs font-semibold text-slate-700 mb-1">
                  Enquiry Type *
                </label>
                <select
                  id="modal-type"
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
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

            <div>
              <label htmlFor="modal-message" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Requirement / Questions *
              </label>
              <textarea
                id="modal-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your desired property, preferred location, or questions..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
              />
              {errors.message && <p className="text-[10px] text-rose-500 mt-0.5">{errors.message}</p>}
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                id="modal-consent"
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5 rounded text-[#14283F] focus:ring-[#C5A15A]"
              />
              <label htmlFor="modal-consent" className="text-[11px] text-slate-600 cursor-pointer">
                I agree to be contacted by Arora Real Estate regarding this enquiry. *
              </label>
            </div>
            {errors.consentGiven && <p className="text-[10px] text-rose-500">{errors.consentGiven}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
