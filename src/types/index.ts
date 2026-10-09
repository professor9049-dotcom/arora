export type PropertyType =
  | 'Apartment / Flat'
  | 'Independent House'
  | 'Villa'
  | 'Builder Floor'
  | 'Plot / Land'
  | 'Office Space'
  | 'Shop / Retail Space'
  | 'Other';

export type PropertyCategory = 'Residential' | 'Commercial';

export type ListingPurpose = 'Buy' | 'Rent' | 'Commercial';

export type LocationArea =
  | 'Krishna Nagar'
  | 'East Delhi'
  | 'North Delhi'
  | 'South Delhi'
  | 'West Delhi'
  | 'Central Delhi'
  | 'Other Location';

export type BudgetRange =
  | 'all'
  | 'under-25L'
  | '25L-50L'
  | '50L-1Cr'
  | '1Cr-2Cr'
  | 'above-2Cr';

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  category: PropertyCategory;
  listingPurpose: ListingPurpose;
  price: string;
  priceNumericInLakhs: number; // e.g. 185 for 1.85 Cr, 35 for 35 Lakhs
  location: LocationArea;
  locationDetails: string;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities: string[];
  imageUrls: string[];
  isDemo: boolean; // Flag marking demonstration listing
  status: 'Active' | 'Under Offer' | 'Sold' | 'Rented';
  createdAt: string;
  updatedAt: string;
}

export type EnquiryType =
  | 'Buying a Property'
  | 'Selling a Property'
  | 'Residential Property'
  | 'Commercial Property'
  | 'Property Investment'
  | 'General Enquiry';

export interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  enquiryType: EnquiryType;
  preferredLocation?: string;
  budget?: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Resolved';
  internalNotes?: string;
  consentGiven: boolean;
  createdAt: string;
}

export interface PropertySubmission {
  id: string;
  ownerName: string;
  phone: string;
  email?: string;
  propertyLocation: string;
  propertyType: string;
  listingType: 'Sale' | 'Rent';
  expectedPrice: string;
  propertySize: string;
  bedrooms?: string;
  description: string;
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
  consentGiven: boolean;
  createdAt: string;
  status: 'Pending Review' | 'Contacted' | 'Listed';
}

export interface BusinessSettings {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  whatsappDefaultMessage: string;
}

export interface PropertyFilterParams {
  purpose?: string;
  propertyType?: string;
  location?: string;
  budget?: string;
  searchQuery?: string;
  category?: 'Residential' | 'Commercial' | 'All';
}
