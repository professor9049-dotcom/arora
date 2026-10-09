import { Property, BusinessSettings } from '../types';

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  businessName: 'ARORA REAL ESTATE',
  ownerName: 'Esha Arora',
  phone: '+91 8930144597',
  email: 'eshaarora927@gmail.com',
  address: 'Krishna Nagar, Delhi, India',
  tagline: 'Your Dream Home, Our Commitment.',
  heroHeading: "Find a Place You'll Be Proud to Call Home.",
  heroSubheading:
    "Discover residential and commercial properties with Arora Real Estate. Whether you're buying your first home, selling a property, or exploring an investment opportunity, we're here to guide you every step of the way.",
  whatsappDefaultMessage:
    'Hello Arora Real Estate, I am interested in your property services. I would like to discuss my requirements.',
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Modern 3 BHK Luxury Apartment in East Delhi',
    slug: 'modern-3-bhk-luxury-apartment-east-delhi',
    description:
      'A sunlit 3 BHK contemporary apartment featuring spacious high-ceiling living zones, designer modular kitchen, marble flooring, and panoramic balcony views. Situated in a prime residential pocket with easy connectivity to metro stations and local markets.',
    propertyType: 'Apartment / Flat',
    category: 'Residential',
    listingPurpose: 'Buy',
    price: '₹1.85 Cr',
    priceNumericInLakhs: 185,
    location: 'East Delhi',
    locationDetails: 'Near Krishna Nagar, East Delhi',
    area: '1,950 sq.ft.',
    bedrooms: 3,
    bathrooms: 3,
    amenities: [
      'Reserved Covered Parking',
      '24/7 Security & CCTV',
      'Power Backup',
      'Modular Kitchen',
      'Spacious Balconies',
      'High-Speed Elevators'
    ],
    imageUrls: [
      '/src/assets/images/property_delhi_apartment_1791555927643.jpg',
      '/src/assets/images/hero_delhi_luxury_home_1791555914513.jpg'
    ],
    isDemo: true,
    status: 'Active',
    createdAt: '2026-03-01T10:00:00.000Z',
    updatedAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 'prop-2',
    title: 'Architectural 4 BHK Builder Floor with Stilt Parking',
    slug: 'architectural-4-bhk-builder-floor-krishna-nagar',
    description:
      'Newly constructed 4-bedroom luxury independent builder floor with private elevator access, premium Italian finishings, teakwood woodwork, and dedicated double stilt parking. Located in Krishna Nagar with immediate access to prime avenues.',
    propertyType: 'Builder Floor',
    category: 'Residential',
    listingPurpose: 'Buy',
    price: '₹2.40 Cr',
    priceNumericInLakhs: 240,
    location: 'Krishna Nagar',
    locationDetails: 'Krishna Nagar, East Delhi',
    area: '2,200 sq.ft.',
    bedrooms: 4,
    bathrooms: 4,
    amenities: [
      'Stilt Car Parking',
      'Private Lift',
      'Designer False Ceilings',
      'Full Modular Kitchen',
      'Separate Servant Room',
      'Vastu Compliant Layout'
    ],
    imageUrls: [
      '/src/assets/images/property_builder_floor_1791555943176.jpg',
      '/src/assets/images/property_delhi_apartment_1791555927643.jpg'
    ],
    isDemo: true,
    status: 'Active',
    createdAt: '2026-03-05T12:00:00.000Z',
    updatedAt: '2026-03-05T12:00:00.000Z'
  },
  {
    id: 'prop-3',
    title: 'Grade-A Commercial Office & Showroom Space',
    slug: 'grade-a-commercial-office-showroom-space-delhi',
    description:
      'High-visibility commercial premises ideal for corporate offices, consulting firms, diagnostic setups, or boutique retail showrooms. Features an expansive open floor plate, central air conditioning provisions, and glass facade frontage.',
    propertyType: 'Office Space',
    category: 'Commercial',
    listingPurpose: 'Commercial',
    price: '₹1.65 Lakh / month',
    priceNumericInLakhs: 48,
    location: 'Central Delhi',
    locationDetails: 'Connaught Place & Central Corridor Link, Delhi',
    area: '2,800 sq.ft.',
    amenities: [
      'Main Road Frontage',
      '100% Power Backup',
      'Dedicated Basement Parking',
      'Glass Facade Visibility',
      'Fire Safety Compliant',
      'High Footfall Commercial Hub'
    ],
    imageUrls: [
      '/src/assets/images/property_commercial_space_1791555957934.jpg'
    ],
    isDemo: true,
    status: 'Active',
    createdAt: '2026-03-10T09:30:00.000Z',
    updatedAt: '2026-03-10T09:30:00.000Z'
  },
  {
    id: 'prop-4',
    title: 'Contemporary 5 BHK Luxury Independent House / Villa',
    slug: 'contemporary-5-bhk-luxury-villa-delhi-ncr',
    description:
      'An exquisite modern residence with private landscaped lawn, sun decks, double-height foyer, and multi-vehicle driveway. Thoughtfully crafted for privacy, elegance, and multi-generational family living.',
    propertyType: 'Villa',
    category: 'Residential',
    listingPurpose: 'Buy',
    price: '₹4.95 Cr',
    priceNumericInLakhs: 495,
    location: 'South Delhi',
    locationDetails: 'Green Boulevard Enclave, South Delhi Corridor',
    area: '4,500 sq.ft.',
    bedrooms: 5,
    bathrooms: 6,
    amenities: [
      'Private Landscaped Lawn',
      'Covered Multi-Car Garage',
      'Terrace Garden & Deck',
      'Imported Marble Finishes',
      'Solar Water Heating',
      'Gated Community Enclave'
    ],
    imageUrls: [
      '/src/assets/images/property_luxury_villa_1791555971141.jpg',
      '/src/assets/images/hero_delhi_luxury_home_1791555914513.jpg'
    ],
    isDemo: true,
    status: 'Active',
    createdAt: '2026-03-15T15:00:00.000Z',
    updatedAt: '2026-03-15T15:00:00.000Z'
  },
  {
    id: 'prop-5',
    title: 'Prime High-Street Retail Shop & Commercial Unit',
    slug: 'prime-high-street-retail-shop-krishna-nagar',
    description:
      'Well-situated ground floor retail shop offering prime commercial frontage in the bustling market district of Krishna Nagar. Excellent consumer footfall, ready-to-move-in condition, suitable for apparel, electronics, or retail franchise.',
    propertyType: 'Shop / Retail Space',
    category: 'Commercial',
    listingPurpose: 'Commercial',
    price: '₹95 Lakh',
    priceNumericInLakhs: 95,
    location: 'Krishna Nagar',
    locationDetails: 'Main Commercial Market, Krishna Nagar, Delhi',
    area: '720 sq.ft.',
    amenities: [
      'Ground Floor Market Frontage',
      'Rolling Shutter Security',
      'High Pedestrian Traffic',
      'Water Connection Available',
      'Wide Street Approach'
    ],
    imageUrls: [
      '/src/assets/images/property_commercial_space_1791555957934.jpg'
    ],
    isDemo: true,
    status: 'Active',
    createdAt: '2026-03-18T11:20:00.000Z',
    updatedAt: '2026-03-18T11:20:00.000Z'
  },
  {
    id: 'prop-6',
    title: 'Spacious 2 BHK Builder Floor Apartment',
    slug: 'spacious-2-bhk-builder-floor-north-delhi',
    description:
      'Charming and affordable 2 BHK builder floor flat with well-proportioned bedrooms, ventilated balconies, and clean title documentation. Ideal choice for first-time home buyers and nuclear families looking for comfort and location value.',
    propertyType: 'Apartment / Flat',
    category: 'Residential',
    listingPurpose: 'Buy',
    price: '₹68 Lakh',
    priceNumericInLakhs: 68,
    location: 'North Delhi',
    locationDetails: 'Model Town link corridor, North Delhi',
    area: '980 sq.ft.',
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      'Two-Wheeler & Car Parking',
      'Close to Metro Station',
      'Fresh Ventilation',
      'Semi-Furnished Fittings',
      'Municipal Water Supply'
    ],
    imageUrls: [
      '/src/assets/images/property_delhi_apartment_1791555927643.jpg'
    ],
    isDemo: true,
    status: 'Active',
    createdAt: '2026-03-20T14:45:00.000Z',
    updatedAt: '2026-03-20T14:45:00.000Z'
  }
];
