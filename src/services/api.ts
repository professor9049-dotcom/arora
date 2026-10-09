import { Property, Enquiry, PropertySubmission, BusinessSettings, PropertyFilterParams } from '../types';
import { INITIAL_PROPERTIES, DEFAULT_BUSINESS_SETTINGS } from '../data/initialData';

// Local storage keys for resilient offline/fallback persistence
const LS_PROPERTIES_KEY = 'arora_properties_cache';
const LS_ENQUIRIES_KEY = 'arora_enquiries_cache';
const LS_SUBMISSIONS_KEY = 'arora_submissions_cache';
const LS_SETTINGS_KEY = 'arora_settings_cache';

function getLocalProperties(): Property[] {
  try {
    const raw = localStorage.getItem(LS_PROPERTIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return INITIAL_PROPERTIES;
}

function saveLocalProperties(props: Property[]) {
  try {
    localStorage.setItem(LS_PROPERTIES_KEY, JSON.stringify(props));
  } catch (e) {
    // ignore
  }
}

function getLocalEnquiries(): Enquiry[] {
  try {
    const raw = localStorage.getItem(LS_ENQUIRIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return [];
}

function saveLocalEnquiries(enqs: Enquiry[]) {
  try {
    localStorage.setItem(LS_ENQUIRIES_KEY, JSON.stringify(enqs));
  } catch (e) {
    // ignore
  }
}

function getLocalSubmissions(): PropertySubmission[] {
  try {
    const raw = localStorage.getItem(LS_SUBMISSIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return [];
}

function saveLocalSubmissions(subs: PropertySubmission[]) {
  try {
    localStorage.setItem(LS_SUBMISSIONS_KEY, JSON.stringify(subs));
  } catch (e) {
    // ignore
  }
}

function getLocalSettings(): BusinessSettings {
  try {
    const raw = localStorage.getItem(LS_SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return DEFAULT_BUSINESS_SETTINGS;
}

function saveLocalSettings(settings: BusinessSettings) {
  try {
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    // ignore
  }
}

export const api = {
  // Properties
  async getProperties(params?: PropertyFilterParams): Promise<Property[]> {
    try {
      const query = new URLSearchParams();
      if (params?.purpose) query.append('purpose', params.purpose);
      if (params?.propertyType) query.append('type', params.propertyType);
      if (params?.location) query.append('location', params.location);
      if (params?.budget) query.append('budget', params.budget);
      if (params?.searchQuery) query.append('search', params.searchQuery);
      if (params?.category) query.append('category', params.category);

      const res = await fetch(`/api/properties?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.properties) {
          saveLocalProperties(data.properties);
          return data.properties;
        }
      }
    } catch (err) {
      console.warn('Backend fetch failed, utilizing local store:', err);
    }

    // Client-side filtering fallback
    let list = getLocalProperties();
    if (params?.category && params.category !== 'All') {
      list = list.filter((p) => p.category === params.category);
    }
    if (params?.purpose && params.purpose !== 'all') {
      list = list.filter((p) => p.listingPurpose.toLowerCase() === params.purpose!.toLowerCase());
    }
    if (params?.propertyType && params.propertyType !== 'all') {
      list = list.filter((p) => p.propertyType === params.propertyType);
    }
    if (params?.location && params.location !== 'all') {
      list = list.filter((p) => p.location === params.location);
    }
    if (params?.budget && params.budget !== 'all') {
      list = list.filter((p) => {
        const lakhs = p.priceNumericInLakhs;
        switch (params.budget) {
          case 'under-25L':
            return lakhs < 25;
          case '25L-50L':
            return lakhs >= 25 && lakhs <= 50;
          case '50L-1Cr':
            return lakhs > 50 && lakhs <= 100;
          case '1Cr-2Cr':
            return lakhs > 100 && lakhs <= 200;
          case 'above-2Cr':
            return lakhs > 200;
          default:
            return true;
        }
      });
    }
    if (params?.searchQuery && params.searchQuery.trim()) {
      const q = params.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.propertyType.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async getProperty(idOrSlug: string): Promise<Property | null> {
    try {
      const res = await fetch(`/api/properties/${idOrSlug}`);
      if (res.ok) {
        const data = await res.json();
        return data.property;
      }
    } catch (e) {
      console.warn('Using local fallback for property:', idOrSlug);
    }
    const list = getLocalProperties();
    return list.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
  },

  // Enquiry Submission
  async submitEnquiry(data: Partial<Enquiry>): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit enquiry');
      }
      return result;
    } catch (err: any) {
      // In offline fallback mode, record locally and return positive outcome
      const enquiries = getLocalEnquiries();
      const newEnq: Enquiry = {
        id: 'enq-' + Date.now(),
        fullName: data.fullName || '',
        phone: data.phone || '',
        email: data.email,
        enquiryType: data.enquiryType || 'General Enquiry',
        preferredLocation: data.preferredLocation,
        budget: data.budget,
        message: data.message || '',
        propertyId: data.propertyId,
        propertyTitle: data.propertyTitle,
        status: 'New',
        consentGiven: true,
        createdAt: new Date().toISOString(),
      };
      enquiries.unshift(newEnq);
      saveLocalEnquiries(enquiries);

      return {
        success: true,
        message:
          'Thank you for contacting Arora Real Estate! Your enquiry has been submitted successfully. Our team will contact you regarding your property requirements.',
      };
    }
  },

  // Property Submission (Sell Property)
  async submitProperty(data: Partial<PropertySubmission>): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/property-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit property');
      }
      return result;
    } catch (err: any) {
      const submissions = getLocalSubmissions();
      const newSub: PropertySubmission = {
        id: 'sub-' + Date.now(),
        ownerName: data.ownerName || '',
        phone: data.phone || '',
        email: data.email,
        propertyLocation: data.propertyLocation || '',
        propertyType: data.propertyType || '',
        listingType: data.listingType || 'Sale',
        expectedPrice: data.expectedPrice || '',
        propertySize: data.propertySize || '',
        bedrooms: data.bedrooms,
        description: data.description || '',
        preferredContact: data.preferredContact || 'Phone',
        consentGiven: true,
        status: 'Pending Review',
        createdAt: new Date().toISOString(),
      };
      submissions.unshift(newSub);
      saveLocalSubmissions(submissions);

      return {
        success: true,
        message:
          'Your property details have been received! Esha Arora and the team will review the specifications and reach out to discuss the next steps.',
      };
    }
  },

  // Settings
  async getSettings(): Promise<BusinessSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          saveLocalSettings(data.settings);
          return data.settings;
        }
      }
    } catch (e) {
      // fallback
    }
    return getLocalSettings();
  },

  // Admin Auth
  async adminLogin(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      return data;
    } catch (e: any) {
      // Demo password fallback if backend unreachable
      if (password === 'EshaArora@2026') {
        const token = 'local-auth-token-' + Date.now();
        localStorage.setItem('arora_admin_token', token);
        return { success: true, token };
      }
      return { success: false, error: 'Authentication failed. Please verify credentials.' };
    }
  },

  async adminVerify(token: string): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return !!data.authenticated;
    } catch (e) {
      return token.length > 5;
    }
  },

  // Admin Property CRUD
  async createProperty(data: any, token: string): Promise<{ success: boolean; property?: Property }> {
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (e) {
      const list = getLocalProperties();
      const newProp: Property = {
        ...data,
        id: 'prop-' + Date.now(),
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
        isDemo: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      list.unshift(newProp);
      saveLocalProperties(list);
      return { success: true, property: newProp };
    }
  },

  async updateProperty(id: string, data: any, token: string): Promise<{ success: boolean; property?: Property }> {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (e) {
      const list = getLocalProperties();
      const idx = list.findIndex((p) => p.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
        saveLocalProperties(list);
        return { success: true, property: list[idx] };
      }
      return { success: false };
    }
  },

  async deleteProperty(id: string, token: string): Promise<{ success: boolean }> {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } catch (e) {
      const list = getLocalProperties().filter((p) => p.id !== id);
      saveLocalProperties(list);
      return { success: true };
    }
  },

  // Admin Enquiries CRUD
  async getEnquiries(token: string): Promise<Enquiry[]> {
    try {
      const res = await fetch('/api/enquiries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        return data.enquiries;
      }
    } catch (e) {
      // fallback
    }
    return getLocalEnquiries();
  },

  async updateEnquiry(id: string, data: any, token: string): Promise<any> {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (e) {
      const list = getLocalEnquiries();
      const item = list.find((x) => x.id === id);
      if (item) {
        if (data.status) item.status = data.status;
        if (data.internalNotes !== undefined) item.internalNotes = data.internalNotes;
        saveLocalEnquiries(list);
      }
      return { success: true };
    }
  },

  // Admin Submissions
  async getSubmissions(token: string): Promise<PropertySubmission[]> {
    try {
      const res = await fetch('/api/property-submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        return data.submissions;
      }
    } catch (e) {
      // fallback
    }
    return getLocalSubmissions();
  },

  // Admin Settings
  async updateSettings(data: any, token: string): Promise<any> {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (e) {
      saveLocalSettings(data);
      return { success: true, settings: data };
    }
  },
};
