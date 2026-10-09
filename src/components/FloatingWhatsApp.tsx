import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  propertyTitle?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ propertyTitle }) => {
  const message = propertyTitle
    ? `Hello Arora Real Estate, I am interested in ${propertyTitle}. Please share more information.`
    : 'Hello Arora Real Estate, I am interested in your property services. I would like to discuss my requirements.';

  const url = `https://wa.me/918930144597?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Arora Real Estate on WhatsApp"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group font-semibold text-xs"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline-block pr-1 font-medium tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
