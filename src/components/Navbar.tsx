import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, Building2, ShieldCheck, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenEnquiry: (type?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenEnquiry,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'buy', label: 'Buy Property' },
    { id: 'sell', label: 'Sell Property' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'investment', label: 'Investment' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#14283F]/95 backdrop-blur-md text-white shadow-md border-b border-[#203D5B]'
          : 'bg-[#14283F] text-white border-b border-[#203D5B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Action) */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark with Architectural Roofline Icon */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-[#C5A15A]/15 border border-[#C5A15A]/40 flex items-center justify-center text-[#C5A15A] group-hover:bg-[#C5A15A]/25 transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider leading-none text-white uppercase group-hover:text-[#C5A15A] transition-colors">
                ARORA
              </span>
              <span className="text-[10px] tracking-[0.22em] text-[#C5A15A] font-semibold uppercase leading-tight mt-0.5">
                REAL ESTATE
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#C5A15A] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A15A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Phone Dialler */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="tel:+918930144597"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-[#203D5B]/70 hover:bg-[#203D5B] border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              title="Call Arora Real Estate at +91 8930144597"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A15A]" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => onOpenEnquiry('General Enquiry')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#14283F] bg-[#C5A15A] hover:bg-[#B5914A] rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="tel:+918930144597"
              className="p-2 text-[#C5A15A] hover:bg-[#203D5B] rounded-lg transition-colors"
              title="Call +91 8930144597"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-[#203D5B] rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#203D5B] bg-[#14283F] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#203D5B]/60">
            <a
              href="tel:+918930144597"
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-white bg-[#203D5B] rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A15A]" />
              <span>+91 8930144597</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-[#14283F] bg-[#C5A15A] rounded-lg"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>
          </div>

          <div className="py-2 space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#203D5B] text-[#C5A15A] font-medium'
                    : 'text-slate-300 hover:bg-[#203D5B]/50 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#203D5B]/60 flex items-center justify-between text-xs text-slate-400 px-3">
            <span>Krishna Nagar, Delhi, India</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-[#C5A15A]"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
