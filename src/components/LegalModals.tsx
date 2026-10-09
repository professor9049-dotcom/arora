import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-[#C5A15A]" />
            ) : (
              <FileText className="w-5 h-5 text-[#C5A15A]" />
            )}
            <h2 className="text-xl font-serif font-bold text-[#14283F]">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'privacy' ? (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-[#14283F]">
              Last updated: March 2026. Arora Real Estate, operated by Esha Arora in Krishna Nagar, Delhi, respects your personal privacy.
            </p>

            <div>
              <h3 className="font-bold text-[#14283F] mb-1">1. Information We Collect</h3>
              <p>
                When you submit an enquiry, request a property walkthrough, or register a property for sale, we collect your full name, telephone number, email address (if provided), property specifications, and requirement notes.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#14283F] mb-1">2. Purpose of Collection</h3>
              <p>
                Your contact details are collected strictly to communicate directly with you regarding relevant residential and commercial property opportunities, schedule site visits, and respond to your inquiries.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#14283F] mb-1">3. Storage and Protection</h3>
              <p>
                Inquiry details are stored securely and accessed exclusively by Esha Arora and authorized consultancy staff. We never sell, lease, or distribute your personal contact information to third-party telemarketers or advertisers.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#14283F] mb-1">4. Contact Regarding Your Data</h3>
              <p>
                To request the review, update, or deletion of your stored inquiry details, you may contact Esha Arora directly at{' '}
                <a href="mailto:eshaarora927@gmail.com" className="text-[#14283F] font-semibold underline">
                  eshaarora927@gmail.com
                </a>{' '}
                or via phone at{' '}
                <a href="tel:+918930144597" className="text-[#14283F] font-semibold underline">
                  +91 8930144597
                </a>.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-[#14283F]">
              Terms of Use for Arora Real Estate (Krishna Nagar, Delhi, India).
            </p>

            <div>
              <h3 className="font-bold text-[#14283F] mb-1">1. General Website Use</h3>
              <p>
                This website is operated as an informational property advisory portal. Information provided does not constitute a formal legal deed or binding financial contract until official legal documentation is signed by the concerned property parties.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#14283F] mb-1">2. Property Information Accuracy & Availability</h3>
              <p>
                Property prices, dimensions, specifications, and availability are subject to change without prior notice as market transactions occur. Sample listings are clearly marked as demonstration properties. Visitors must verify current availability, titles, and layout approvals directly with the agency prior to making financial commitments.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#14283F] mb-1">3. No Guaranteed Investment Returns</h3>
              <p>
                Real estate valuations, rental income, and appreciation rates depend on broader economic trends and individual due diligence. Arora Real Estate does not guarantee speculative yields or investment performance.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#14283F] mb-1">4. Intellectual Property</h3>
              <p>
                All brand identity assets, written content, logos, and curated layout assets are property of Arora Real Estate and may not be republished without written consent.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#14283F] rounded-lg cursor-pointer"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
