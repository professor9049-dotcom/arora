import React from 'react';
import { Building2, Phone, Mail, MapPin, Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenAdmin,
}) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14283F] text-white border-t border-[#203D5B] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#203D5B]">
          
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C5A15A]/15 border border-[#C5A15A]/40 flex items-center justify-center text-[#C5A15A]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider leading-none text-white uppercase block">
                  ARORA
                </span>
                <span className="text-[10px] tracking-[0.22em] text-[#C5A15A] font-semibold uppercase leading-tight block">
                  REAL ESTATE
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-medium">
              "Your Dream Home, Our Commitment."
            </p>

            <p className="text-xs text-slate-400 italic">
              "Where Your Property Dreams Become Reality."
            </p>

            <div className="pt-2 text-xs text-slate-400 leading-relaxed">
              Assisting home seekers, families, and commercial investors in Krishna Nagar and the wider Delhi NCR territory with personalized guidance.
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#C5A15A]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('home');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('about');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('buy');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Buy Property
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('sell');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sell Property
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('residential');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Residential Properties
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('commercial');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Commercial Properties
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('contact');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#C5A15A]">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('buy')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Buying & Selling
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('residential')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Residential Guidance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('commercial')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Commercial Spaces
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('investment')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Investment Assistance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Property Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#C5A15A]">
              Contact Information
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Phone:</span>
                  <a href="tel:+918930144597" className="font-semibold text-white hover:text-[#C5A15A] transition-colors">
                    +91 8930144597
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Email:</span>
                  <a href="mailto:eshaarora927@gmail.com" className="font-semibold text-white hover:text-[#C5A15A] transition-colors break-all">
                    eshaarora927@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Address:</span>
                  <span className="text-white">Krishna Nagar, Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {currentYear} Arora Real Estate. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms and Conditions
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-[#C5A15A] transition-colors cursor-pointer text-slate-400"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 bg-[#203D5B] hover:bg-[#C5A15A] hover:text-[#14283F] rounded-lg transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
