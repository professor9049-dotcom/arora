import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustHighlights } from './components/TrustHighlights';
import { PropertyGrid } from './components/PropertyGrid';
import { BuySection } from './components/BuySection';
import { SellSection } from './components/SellSection';
import { CategoriesSection } from './components/CategoriesSection';
import { InvestmentSection } from './components/InvestmentSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { EnquiryModal } from './components/EnquiryModal';
import { LegalModal } from './components/LegalModals';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Property, PropertyFilterParams, EnquiryType, PropertyType } from './types';
import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterParams, setFilterParams] = useState<PropertyFilterParams>({});

  // Modals & Active state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquiryModalType, setEnquiryModalType] = useState<EnquiryType>('General Enquiry');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Load properties on initial render
  useEffect(() => {
    loadProperties();
  }, [filterParams]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await api.getProperties(filterParams);
      setProperties(data);
    } catch (err) {
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroSearch = (params: PropertyFilterParams) => {
    setFilterParams(params);
    setActiveTab('home');
    const el = document.getElementById('properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiryModal = (type: string = 'General Enquiry') => {
    setEnquiryModalType(type as EnquiryType);
    setIsEnquiryModalOpen(true);
  };

  const handleSelectCategory = (cat: 'Residential' | 'Commercial', type?: PropertyType) => {
    setFilterParams({
      category: cat,
      propertyType: type || 'all',
    });
    if (cat === 'Residential') {
      setActiveTab('residential');
    } else {
      setActiveTab('commercial');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-[#222B35]">
      {/* Premium Header */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiryModal}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <>
            <Hero
              onSearch={handleHeroSearch}
              onExploreClick={() => {
                const el = document.getElementById('properties-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onContactClick={() => handleOpenEnquiryModal('General Enquiry')}
            />

            <TrustHighlights />

            <PropertyGrid
              properties={properties}
              onViewDetails={(prop) => setSelectedProperty(prop)}
              onEnquire={(prop) => {
                if (prop) {
                  setSelectedProperty(prop);
                } else {
                  handleOpenEnquiryModal('General Enquiry');
                }
              }}
              onCategoryChange={(cat) => {
                setFilterParams((prev) => ({ ...prev, category: cat }));
              }}
            />

            <BuySection
              onDiscussRequirements={() => handleOpenEnquiryModal('Buying a Property')}
              onBrowseResidential={() => handleSelectCategory('Residential')}
              onBrowseCommercial={() => handleSelectCategory('Commercial')}
            />

            <CategoriesSection onSelectCategory={handleSelectCategory} />

            <SellSection />

            <ServicesSection
              onEnquire={(type) => handleOpenEnquiryModal(type)}
            />

            <InvestmentSection
              onDiscussInvestment={() => handleOpenEnquiryModal('Property Investment')}
            />

            <AboutSection
              onContactClick={() => handleOpenEnquiryModal('General Enquiry')}
            />

            <WhyChooseUs />

            <LocationSection />

            <ContactSection
              initialEnquiryType="General Enquiry"
            />
          </>
        )}

        {/* VIEW 2: BUY PROPERTY */}
        {activeTab === 'buy' && (
          <div className="space-y-8">
            <div className="bg-[#14283F] text-white py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
                  Acquisition Guidance
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
                  Buy Property with Arora Real Estate
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Navigate verified residential and commercial opportunities across Krishna Nagar and premier Delhi corridors with personalized assistance from Esha Arora.
                </p>
              </div>
            </div>

            <BuySection
              onDiscussRequirements={() => handleOpenEnquiryModal('Buying a Property')}
              onBrowseResidential={() => handleSelectCategory('Residential')}
              onBrowseCommercial={() => handleSelectCategory('Commercial')}
            />

            <PropertyGrid
              properties={properties.filter((p) => p.listingPurpose === 'Buy')}
              title="Properties Available for Purchase"
              subtitle="Browse curated homes, independent builder floors, and residential assets."
              onViewDetails={(prop) => setSelectedProperty(prop)}
              onEnquire={(prop) => {
                if (prop) setSelectedProperty(prop);
                else handleOpenEnquiryModal('Buying a Property');
              }}
            />

            <ContactSection initialEnquiryType="Buying a Property" />
          </div>
        )}

        {/* VIEW 3: SELL PROPERTY */}
        {activeTab === 'sell' && (
          <div className="space-y-8">
            <div className="bg-[#14283F] text-white py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
                  Property Owners
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
                  Sell or Lease Your Property
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Connect with genuine prospective buyers and tenants. List your property details securely for direct review and consultation with Esha Arora.
                </p>
              </div>
            </div>

            <SellSection />

            <WhyChooseUs />
          </div>
        )}

        {/* VIEW 4: RESIDENTIAL PROPERTIES */}
        {activeTab === 'residential' && (
          <div className="space-y-8">
            <div className="bg-[#14283F] text-white py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
                  Living Spaces & Family Homes
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
                  Residential Properties in Delhi
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Explore apartments, independent builder floors, villas, and family homes in East Delhi and surrounding NCR micro-markets.
                </p>
              </div>
            </div>

            <PropertyGrid
              properties={properties.filter((p) => p.category === 'Residential')}
              title="Residential Listings"
              subtitle="Curated apartments, floors, and independent homes matching your family lifestyle."
              activeCategory="Residential"
              onViewDetails={(prop) => setSelectedProperty(prop)}
              onEnquire={(prop) => {
                if (prop) setSelectedProperty(prop);
                else handleOpenEnquiryModal('Residential Property');
              }}
            />

            <CategoriesSection onSelectCategory={handleSelectCategory} />
          </div>
        )}

        {/* VIEW 5: COMMERCIAL PROPERTIES */}
        {activeTab === 'commercial' && (
          <div className="space-y-8">
            <div className="bg-[#14283F] text-white py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
                  Corporate & Retail Assets
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
                  Commercial Properties in Delhi
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Offices, boutique retail showrooms, and business premises situated in high-footfall corridors and commercial hubs.
                </p>
              </div>
            </div>

            <PropertyGrid
              properties={properties.filter((p) => p.category === 'Commercial')}
              title="Commercial Listings"
              subtitle="Spaces designed for corporate growth, retail visibility, and business prestige."
              activeCategory="Commercial"
              onViewDetails={(prop) => setSelectedProperty(prop)}
              onEnquire={(prop) => {
                if (prop) setSelectedProperty(prop);
                else handleOpenEnquiryModal('Commercial Property');
              }}
            />

            <ContactSection initialEnquiryType="Commercial Property" />
          </div>
        )}

        {/* VIEW 6: PROPERTY INVESTMENT */}
        {activeTab === 'investment' && (
          <div className="space-y-8">
            <div className="bg-[#14283F] text-white py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
                  Long-Term Advisory
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
                  Real Estate Investment Advisory
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Explore objective property options aligned with your budget and horizon without speculative promises or false guarantees.
                </p>
              </div>
            </div>

            <InvestmentSection
              onDiscussInvestment={() => handleOpenEnquiryModal('Property Investment')}
            />

            <PropertyGrid
              properties={properties}
              title="Potential Investment Portfolios"
              subtitle="Assets with consistent tenancy demand or prime street frontage."
              onViewDetails={(prop) => setSelectedProperty(prop)}
              onEnquire={(prop) => {
                if (prop) setSelectedProperty(prop);
                else handleOpenEnquiryModal('Property Investment');
              }}
            />

            <ContactSection initialEnquiryType="Property Investment" />
          </div>
        )}

        {/* VIEW 7: ABOUT US */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div className="bg-[#14283F] text-white py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
                  Our Identity & Vision
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
                  About Arora Real Estate
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Your trusted real estate partner in Krishna Nagar, Delhi. Founded on transparency, local expertise, and customer-first guidance.
                </p>
              </div>
            </div>

            <AboutSection
              onContactClick={() => handleOpenEnquiryModal('General Enquiry')}
            />

            <WhyChooseUs />

            <LocationSection />
          </div>
        )}

        {/* VIEW 8: CONTACT US */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div className="bg-[#14283F] text-white py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
                  Direct Accessibility
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
                  Contact Arora Real Estate
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Speak directly with Esha Arora by phone, WhatsApp, or email for personalized real estate advice in Delhi.
                </p>
              </div>
            </div>

            <ContactSection initialEnquiryType="General Enquiry" />

            <LocationSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsApp
        propertyTitle={selectedProperty ? selectedProperty.title : undefined}
      />

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      {/* General / Service Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        initialType={enquiryModalType}
      />

      {/* Legal Documentation Modals (Privacy Policy / Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Protected Admin Portal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshProperties={loadProperties}
      />
    </div>
  );
}
