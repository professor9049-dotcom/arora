import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(express.json());

// Ensure data folder and db file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DatabaseSchema {
  properties: any[];
  enquiries: any[];
  submissions: any[];
  settings: any;
}

const DEFAULT_SETTINGS = {
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

const DEFAULT_PROPERTIES = [
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

function readDB(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial: DatabaseSchema = {
        properties: DEFAULT_PROPERTIES,
        enquiries: [],
        submissions: [],
        settings: DEFAULT_SETTINGS,
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db:', err);
    return {
      properties: DEFAULT_PROPERTIES,
      enquiries: [],
      submissions: [],
      settings: DEFAULT_SETTINGS,
    };
  }
}

function writeDB(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing db:', err);
  }
}

// Simple Admin Authentication Token
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EshaArora@2026';
const ADMIN_TOKEN = 'arora-admin-token-auth-' + Buffer.from(ADMIN_PASSWORD).toString('base64');

function authenticateAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
    return;
  }
  next();
}

/* ==================== API ROUTES ==================== */

// 1. Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    res.status(401).json({ success: false, error: 'Invalid password. Please check credentials.' });
    return;
  }
  res.json({
    success: true,
    token: ADMIN_TOKEN,
    user: { name: 'Esha Arora', role: 'Owner / Administrator' },
  });
});

// 2. Admin Verify
app.get('/api/admin/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${ADMIN_TOKEN}`) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// 3. Properties - GET (Public)
app.get('/api/properties', (req: Request, res: Response) => {
  const db = readDB();
  const { purpose, type, location, budget, search, category } = req.query;

  let filtered = [...db.properties];

  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (purpose && purpose !== 'all') {
    filtered = filtered.filter(
      (p) => p.listingPurpose.toLowerCase() === (purpose as string).toLowerCase()
    );
  }

  if (type && type !== 'all') {
    filtered = filtered.filter((p) => p.propertyType === type);
  }

  if (location && location !== 'all') {
    filtered = filtered.filter((p) => p.location === location);
  }

  if (budget && budget !== 'all') {
    filtered = filtered.filter((p) => {
      const priceLakhs = p.priceNumericInLakhs;
      switch (budget) {
        case 'under-25L':
          return priceLakhs < 25;
        case '25L-50L':
          return priceLakhs >= 25 && priceLakhs <= 50;
        case '50L-1Cr':
          return priceLakhs > 50 && priceLakhs <= 100;
        case '1Cr-2Cr':
          return priceLakhs > 100 && priceLakhs <= 200;
        case 'above-2Cr':
          return priceLakhs > 200;
        default:
          return true;
      }
    });
  }

  if (search && typeof search === 'string' && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q)
    );
  }

  res.json({ properties: filtered, total: filtered.length });
});

// 4. Property by ID or Slug (Public)
app.get('/api/properties/:idOrSlug', (req: Request, res: Response) => {
  const db = readDB();
  const item = db.properties.find(
    (p) => p.id === req.params.idOrSlug || p.slug === req.params.idOrSlug
  );
  if (!item) {
    res.status(404).json({ error: 'Property not found' });
    return;
  }
  res.json({ property: item });
});

// 5. Create Property (Admin)
app.post('/api/properties', authenticateAdmin, (req: Request, res: Response) => {
  const db = readDB();
  const data = req.body;

  if (!data.title || !data.propertyType || !data.location) {
    res.status(400).json({ error: 'Title, property type, and location are required' });
    return;
  }

  const slug =
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') +
    '-' +
    Date.now().toString().slice(-4);

  const newProperty = {
    id: 'prop-' + Date.now(),
    title: data.title,
    slug,
    description: data.description || '',
    propertyType: data.propertyType,
    category: data.category || 'Residential',
    listingPurpose: data.listingPurpose || 'Buy',
    price: data.price || 'Price on Request',
    priceNumericInLakhs: Number(data.priceNumericInLakhs) || 100,
    location: data.location,
    locationDetails: data.locationDetails || data.location,
    area: data.area || 'As per layout',
    bedrooms: data.bedrooms ? Number(data.bedrooms) : undefined,
    bathrooms: data.bathrooms ? Number(data.bathrooms) : undefined,
    amenities: Array.isArray(data.amenities) ? data.amenities : [],
    imageUrls: Array.isArray(data.imageUrls) && data.imageUrls.length > 0
      ? data.imageUrls
      : ['/src/assets/images/hero_delhi_luxury_home_1791555914513.jpg'],
    isDemo: false, // Newly added properties by admin are real properties
    status: data.status || 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.properties.unshift(newProperty);
  writeDB(db);

  res.status(201).json({ success: true, property: newProperty });
});

// 6. Update Property (Admin)
app.put('/api/properties/:id', authenticateAdmin, (req: Request, res: Response) => {
  const db = readDB();
  const index = db.properties.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: 'Property not found' });
    return;
  }

  const existing = db.properties[index];
  const updated = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  db.properties[index] = updated;
  writeDB(db);

  res.json({ success: true, property: updated });
});

// 7. Delete Property (Admin)
app.delete('/api/properties/:id', authenticateAdmin, (req: Request, res: Response) => {
  const db = readDB();
  const index = db.properties.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: 'Property not found' });
    return;
  }

  const removed = db.properties.splice(index, 1);
  writeDB(db);

  res.json({ success: true, message: 'Property deleted successfully', deleted: removed[0] });
});

// 8. Public Enquiry Submission
app.post('/api/enquiries', (req: Request, res: Response) => {
  const { fullName, phone, email, enquiryType, message, preferredLocation, budget, propertyId, propertyTitle, consentGiven } = req.body;

  if (!fullName || !phone || !message) {
    res.status(400).json({ error: 'Full name, phone number, and message are required' });
    return;
  }

  // Validate phone format (minimum 10 digits for Indian numbers)
  const phoneClean = phone.replace(/[^0-9+]/g, '');
  if (phoneClean.length < 10) {
    res.status(400).json({ error: 'Please provide a valid phone number (minimum 10 digits)' });
    return;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Please provide a valid email address' });
    return;
  }

  if (!consentGiven) {
    res.status(400).json({ error: 'Consent to contact regarding your enquiry is required' });
    return;
  }

  const db = readDB();
  const newEnquiry = {
    id: 'enq-' + Date.now(),
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : undefined,
    enquiryType: enquiryType || 'General Enquiry',
    preferredLocation: preferredLocation || undefined,
    budget: budget || undefined,
    message: message.trim(),
    propertyId: propertyId || undefined,
    propertyTitle: propertyTitle || undefined,
    status: 'New',
    consentGiven: true,
    createdAt: new Date().toISOString(),
  };

  db.enquiries.unshift(newEnquiry);
  writeDB(db);

  res.status(201).json({
    success: true,
    message:
      'Thank you for contacting Arora Real Estate! Your enquiry has been submitted successfully. Our team will contact you regarding your property requirements.',
    enquiryId: newEnquiry.id,
  });
});

// 9. Admin Get Enquiries
app.get('/api/enquiries', authenticateAdmin, (_req: Request, res: Response) => {
  const db = readDB();
  res.json({ enquiries: db.enquiries, total: db.enquiries.length });
});

// 10. Admin Update Enquiry Status / Notes
app.patch('/api/enquiries/:id', authenticateAdmin, (req: Request, res: Response) => {
  const db = readDB();
  const item = db.enquiries.find((e) => e.id === req.params.id);

  if (!item) {
    res.status(404).json({ error: 'Enquiry not found' });
    return;
  }

  if (req.body.status) {
    item.status = req.body.status;
  }
  if (req.body.internalNotes !== undefined) {
    item.internalNotes = req.body.internalNotes;
  }

  writeDB(db);
  res.json({ success: true, enquiry: item });
});

// 11. Property Submission (Sell Property - Public)
app.post('/api/property-submissions', (req: Request, res: Response) => {
  const { ownerName, phone, email, propertyLocation, propertyType, listingType, expectedPrice, propertySize, bedrooms, description, preferredContact, consentGiven } = req.body;

  if (!ownerName || !phone || !propertyLocation || !propertyType || !expectedPrice || !propertySize) {
    res.status(400).json({ error: 'Required fields: Owner Name, Phone, Location, Property Type, Expected Price, and Property Size' });
    return;
  }

  const phoneClean = phone.replace(/[^0-9+]/g, '');
  if (phoneClean.length < 10) {
    res.status(400).json({ error: 'Please provide a valid phone number' });
    return;
  }

  if (!consentGiven) {
    res.status(400).json({ error: 'Consent to evaluate your property details is required' });
    return;
  }

  const db = readDB();
  const submission = {
    id: 'sub-' + Date.now(),
    ownerName: ownerName.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : undefined,
    propertyLocation: propertyLocation.trim(),
    propertyType,
    listingType: listingType || 'Sale',
    expectedPrice: expectedPrice.trim(),
    propertySize: propertySize.trim(),
    bedrooms: bedrooms || undefined,
    description: description ? description.trim() : '',
    preferredContact: preferredContact || 'Phone',
    consentGiven: true,
    status: 'Pending Review',
    createdAt: new Date().toISOString(),
  };

  db.submissions.unshift(submission);
  writeDB(db);

  res.status(201).json({
    success: true,
    message: 'Your property details have been received! Esha Arora and the team will review the specifications and reach out to discuss the next steps.',
    submissionId: submission.id,
  });
});

// 12. Admin Get Submissions
app.get('/api/property-submissions', authenticateAdmin, (_req: Request, res: Response) => {
  const db = readDB();
  res.json({ submissions: db.submissions, total: db.submissions.length });
});

// 13. Settings - GET (Public)
app.get('/api/settings', (_req: Request, res: Response) => {
  const db = readDB();
  res.json({ settings: db.settings });
});

// 14. Settings - PUT (Admin)
app.put('/api/settings', authenticateAdmin, (req: Request, res: Response) => {
  const db = readDB();
  db.settings = { ...db.settings, ...req.body };
  writeDB(db);
  res.json({ success: true, settings: db.settings });
});

/* ==================== VITE / STATIC SERVE ==================== */

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arora Real Estate server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
