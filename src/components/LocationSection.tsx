import React from 'react';
import { MapPin, Navigation, Phone, Mail, Clock } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const directionsUrl =
    'https://www.google.com/maps/search/?api=1&query=Krishna+Nagar+Delhi+India';

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
              Our Base of Operations
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14283F] leading-tight mb-4">
              Visit Arora Real Estate
            </h2>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
              Centrally based in Krishna Nagar, East Delhi. We assist clients across the entire National Capital Region, offering tailored property walk-throughs and in-person consultations.
            </p>

            <div className="bg-[#F6F7F9] p-5 rounded-xl border border-slate-200/90 space-y-3.5 mb-6 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#14283F]">Location</span>
                  <span>Krishna Nagar, Delhi, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#14283F]">Direct Phone</span>
                  <a href="tel:+918930144597" className="text-[#14283F] hover:text-[#C5A15A] transition-colors">
                    +91 8930144597
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#14283F]">Email Inquiries</span>
                  <a href="mailto:eshaarora927@gmail.com" className="text-[#14283F] hover:text-[#C5A15A] transition-colors">
                    eshaarora927@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors shadow-sm"
            >
              <Navigation className="w-4 h-4 text-[#C5A15A]" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Right Map View / Interactive Map Embed */}
          <div className="lg:col-span-7">
            <div className="bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative h-[360px] sm:h-[400px]">
              <iframe
                title="Arora Real Estate Krishna Nagar Delhi Location Map"
                src="https://maps.google.com/maps?q=Krishna+Nagar+Delhi+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium text-[#14283F] shadow-sm pointer-events-none">
                Krishna Nagar, Delhi, India
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
