import React, { useState, useEffect } from 'react';
import {
  Lock,
  Building,
  Users,
  FileText,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Search,
  LogOut,
  X,
  ExternalLink,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { Property, Enquiry, PropertySubmission, BusinessSettings } from '../types';
import { api } from '../services/api';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshProperties: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onRefreshProperties,
}) => {
  // Auth state
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('arora_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active tab inside admin
  const [adminTab, setAdminTab] = useState<'dashboard' | 'properties' | 'enquiries' | 'submissions' | 'settings'>('dashboard');

  // Data state
  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [submissions, setSubmissions] = useState<PropertySubmission[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Property modal state
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    category: 'Residential' as 'Residential' | 'Commercial',
    propertyType: 'Apartment / Flat' as any,
    listingPurpose: 'Buy' as any,
    price: '',
    priceNumericInLakhs: 100,
    location: 'Krishna Nagar' as any,
    locationDetails: '',
    area: '',
    bedrooms: 3,
    bathrooms: 3,
    amenities: '24/7 Security, Covered Parking, Power Backup',
    description: '',
    imageUrls: '/src/assets/images/property_delhi_apartment_1791555927643.jpg',
    status: 'Active' as any,
  });

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Search & filter for enquiries
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryFilterStatus, setEnquiryFilterStatus] = useState<string>('all');

  // Load admin data when token changes or modal opens
  useEffect(() => {
    if (token && isOpen) {
      loadAllAdminData();
    }
  }, [token, isOpen]);

  const loadAllAdminData = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const [props, enqs, subs, sett] = await Promise.all([
        api.getProperties(),
        api.getEnquiries(token),
        api.getSubmissions(token),
        api.getSettings(),
      ]);
      setProperties(props);
      setEnquiries(enqs);
      setSubmissions(subs);
      setSettings(sett);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      const res = await api.adminLogin(passwordInput);
      if (res.success && res.token) {
        localStorage.setItem('arora_admin_token', res.token);
        setToken(res.token);
        setPasswordInput('');
      } else {
        setAuthError(res.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setAuthError('Connection error during login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('arora_admin_token');
    setToken(null);
  };

  // Open property modal for create or edit
  const handleOpenAddProperty = () => {
    setEditingProperty(null);
    setPropertyForm({
      title: '',
      category: 'Residential',
      propertyType: 'Apartment / Flat',
      listingPurpose: 'Buy',
      price: '₹1.50 Cr',
      priceNumericInLakhs: 150,
      location: 'Krishna Nagar',
      locationDetails: 'Krishna Nagar, East Delhi',
      area: '1,600 sq.ft.',
      bedrooms: 3,
      bathrooms: 3,
      amenities: 'Reserved Parking, Lift, 24/7 Security, Modular Kitchen',
      description: '',
      imageUrls: '/src/assets/images/property_delhi_apartment_1791555927643.jpg',
      status: 'Active',
    });
    setIsPropertyModalOpen(true);
  };

  const handleOpenEditProperty = (prop: Property) => {
    setEditingProperty(prop);
    setPropertyForm({
      title: prop.title,
      category: prop.category,
      propertyType: prop.propertyType,
      listingPurpose: prop.listingPurpose,
      price: prop.price,
      priceNumericInLakhs: prop.priceNumericInLakhs,
      location: prop.location,
      locationDetails: prop.locationDetails,
      area: prop.area,
      bedrooms: prop.bedrooms || 0,
      bathrooms: prop.bathrooms || 0,
      amenities: prop.amenities.join(', '),
      description: prop.description,
      imageUrls: prop.imageUrls.join(', '),
      status: prop.status,
    });
    setIsPropertyModalOpen(true);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const payload = {
      title: propertyForm.title,
      category: propertyForm.category,
      propertyType: propertyForm.propertyType,
      listingPurpose: propertyForm.listingPurpose,
      price: propertyForm.price,
      priceNumericInLakhs: Number(propertyForm.priceNumericInLakhs) || 100,
      location: propertyForm.location,
      locationDetails: propertyForm.locationDetails,
      area: propertyForm.area,
      bedrooms: propertyForm.bedrooms ? Number(propertyForm.bedrooms) : undefined,
      bathrooms: propertyForm.bathrooms ? Number(propertyForm.bathrooms) : undefined,
      amenities: propertyForm.amenities.split(',').map((s) => s.trim()).filter(Boolean),
      description: propertyForm.description,
      imageUrls: propertyForm.imageUrls.split(',').map((s) => s.trim()).filter(Boolean),
      status: propertyForm.status,
    };

    if (editingProperty) {
      await api.updateProperty(editingProperty.id, payload, token);
    } else {
      await api.createProperty(payload, token);
    }

    setIsPropertyModalOpen(false);
    loadAllAdminData();
    onRefreshProperties();
  };

  const handleDeleteProperty = async (id: string) => {
    if (!token) return;
    await api.deleteProperty(id, token);
    setDeleteConfirmId(null);
    loadAllAdminData();
    onRefreshProperties();
  };

  const handleStatusChange = async (enquiryId: string, status: any) => {
    if (!token) return;
    await api.updateEnquiry(enquiryId, { status }, token);
    loadAllAdminData();
  };

  const handleNotesChange = async (enquiryId: string, internalNotes: string) => {
    if (!token) return;
    await api.updateEnquiry(enquiryId, { internalNotes }, token);
    loadAllAdminData();
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !settings) return;
    await api.updateSettings(settings, token);
    alert('Settings updated successfully!');
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative bg-white rounded-2xl max-w-6xl w-full min-h-[600px] max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#14283F] text-white shrink-0 border-b border-[#203D5B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C5A15A]/20 text-[#C5A15A] flex items-center justify-center font-serif font-bold text-sm">
              AR
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide">
                Arora Real Estate — Management Console
              </h2>
              <p className="text-[11px] text-slate-300">
                Owner Administrator: Esha Arora
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-[#203D5B] rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier or Admin Interface */}
        {!token ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#14283F]/5 text-[#14283F] flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-[#C5A15A]" />
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-[#14283F]">
                Owner Sign-In
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Enter your administrative key to manage listings and view inquiries.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {authError && (
                <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
                  {authError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administrator Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A15A]"
                  autoFocus
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 space-y-1">
                <span className="font-semibold block text-[#14283F]">Default Setup Password:</span>
                <code>EshaArora@2026</code>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors cursor-pointer"
              >
                {isLoggingIn ? 'Verifying...' : 'Access Management Console'}
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard Container */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <aside className="w-full md:w-56 bg-slate-50 border-r border-slate-200 p-4 space-y-1 shrink-0">
              <button
                type="button"
                onClick={() => setAdminTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  adminTab === 'dashboard'
                    ? 'bg-[#14283F] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Building className="w-4 h-4 text-[#C5A15A]" />
                <span>Overview Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('properties')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  adminTab === 'properties'
                    ? 'bg-[#14283F] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-[#C5A15A]" />
                  <span>Properties</span>
                </div>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                  {properties.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('enquiries')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  adminTab === 'enquiries'
                    ? 'bg-[#14283F] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#C5A15A]" />
                  <span>Enquiries</span>
                </div>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                  {enquiries.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('submissions')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  adminTab === 'submissions'
                    ? 'bg-[#14283F] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#C5A15A]" />
                  <span>Seller Leads</span>
                </div>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                  {submissions.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  adminTab === 'settings'
                    ? 'bg-[#14283F] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <SettingsIcon className="w-4 h-4 text-[#C5A15A]" />
                <span>Business Settings</span>
              </button>
            </aside>

            {/* Main Tab Content */}
            <main className="flex-1 p-6 overflow-y-auto bg-white">
              
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {adminTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-[#14283F]">
                      Welcome, Esha Arora
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Real-time analytics and management for Arora Real Estate.
                    </p>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Total Properties</span>
                      <span className="text-2xl font-bold font-mono text-[#14283F] mt-1 block">
                        {properties.length}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Active Listings</span>
                      <span className="text-2xl font-bold font-mono text-emerald-700 mt-1 block">
                        {properties.filter((p) => p.status === 'Active').length}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Customer Inquiries</span>
                      <span className="text-2xl font-bold font-mono text-[#14283F] mt-1 block">
                        {enquiries.length}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Pending Seller Leads</span>
                      <span className="text-2xl font-bold font-mono text-amber-700 mt-1 block">
                        {submissions.filter((s) => s.status === 'Pending Review').length}
                      </span>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                    <div className="border border-slate-200 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase text-[#14283F] mb-3">
                        Latest Inquiries
                      </h4>
                      {enquiries.slice(0, 3).map((enq) => (
                        <div key={enq.id} className="py-2 border-b border-slate-100 last:border-0 text-xs">
                          <div className="font-semibold text-slate-800">{enq.fullName} ({enq.phone})</div>
                          <div className="text-slate-500 text-[11px] truncate">{enq.message}</div>
                        </div>
                      ))}
                      {enquiries.length === 0 && (
                        <p className="text-xs text-slate-400">No customer inquiries yet.</p>
                      )}
                    </div>

                    <div className="border border-slate-200 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase text-[#14283F] mb-3">
                        Recent Seller Submissions
                      </h4>
                      {submissions.slice(0, 3).map((sub) => (
                        <div key={sub.id} className="py-2 border-b border-slate-100 last:border-0 text-xs">
                          <div className="font-semibold text-slate-800">{sub.ownerName} - {sub.propertyLocation}</div>
                          <div className="text-slate-500 text-[11px]">Expected: {sub.expectedPrice} ({sub.propertyType})</div>
                        </div>
                      ))}
                      {submissions.length === 0 && (
                        <p className="text-xs text-slate-400">No seller submissions yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROPERTIES MANAGEMENT */}
              {adminTab === 'properties' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-serif text-[#14283F]">
                        Manage Property Listings
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add, edit, or mark properties as sold/rented
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenAddProperty}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#C5A15A]" />
                      <span>Add New Property</span>
                    </button>
                  </div>

                  {/* Properties Table */}
                  <div className="border border-slate-200 rounded-xl overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Title & Location</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Type Flag</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {properties.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/60">
                            <td className="p-3">
                              <span className="font-semibold text-slate-900 block">{p.title}</span>
                              <span className="text-[11px] text-slate-500">{p.locationDetails}</span>
                            </td>
                            <td className="p-3 text-slate-600">{p.propertyType}</td>
                            <td className="p-3 font-mono font-medium text-slate-900">{p.price}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                p.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="p-3 text-[11px] text-slate-500">
                              {p.isDemo ? 'Demo Listing' : 'Verified Listing'}
                            </td>
                            <td className="p-3 text-right space-x-1">
                              <button
                                type="button"
                                onClick={() => handleOpenEditProperty(p)}
                                className="p-1.5 text-slate-500 hover:text-[#14283F] hover:bg-slate-100 rounded cursor-pointer"
                                title="Edit Property"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(p.id)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer"
                                title="Delete Property"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: ENQUIRIES MANAGEMENT */}
              {adminTab === 'enquiries' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold font-serif text-[#14283F]">
                        Customer Enquiries
                      </h3>
                      <p className="text-xs text-slate-500">
                        View contact details, property interest, and add private follow-up notes
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={enquiryFilterStatus}
                        onChange={(e) => setEnquiryFilterStatus(e.target.value)}
                        className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                      >
                        <option value="all">All Statuses</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {enquiries
                      .filter((e) => enquiryFilterStatus === 'all' || e.status === enquiryFilterStatus)
                      .map((enq) => (
                        <div
                          key={enq.id}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                            <div>
                              <span className="font-bold text-sm text-[#14283F]">{enq.fullName}</span>
                              <span className="text-slate-400 ml-2">({enq.enquiryType})</span>
                              {enq.propertyTitle && (
                                <div className="text-[11px] text-[#C5A15A] font-medium mt-0.5">
                                  Property Interest: {enq.propertyTitle}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[11px] text-slate-400 font-mono">
                                {new Date(enq.createdAt).toLocaleDateString()}
                              </span>
                              <select
                                value={enq.status}
                                onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                                className="text-xs font-semibold px-2 py-1 bg-white border border-slate-300 rounded"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700">
                            <div>
                              <span className="font-semibold block text-[11px] text-slate-500">Phone:</span>
                              <a href={`tel:${enq.phone}`} className="font-mono text-[#14283F] underline">
                                {enq.phone}
                              </a>
                            </div>
                            {enq.email && (
                              <div>
                                <span className="font-semibold block text-[11px] text-slate-500">Email:</span>
                                <a href={`mailto:${enq.email}`} className="text-[#14283F] underline">
                                  {enq.email}
                                </a>
                              </div>
                            )}
                            {enq.budget && (
                              <div>
                                <span className="font-semibold block text-[11px] text-slate-500">Budget:</span>
                                <span>{enq.budget}</span>
                              </div>
                            )}
                          </div>

                          <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                            <span className="font-semibold block text-[11px] text-slate-500 mb-0.5">Client Message:</span>
                            <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{enq.message}</p>
                          </div>

                          {/* Internal Notes */}
                          <div>
                            <label className="font-semibold block text-[11px] text-slate-500 mb-1">
                              Internal Notes (Private to Esha Arora):
                            </label>
                            <input
                              type="text"
                              defaultValue={enq.internalNotes || ''}
                              onBlur={(e) => handleNotesChange(enq.id, e.target.value)}
                              placeholder="Add follow-up notes or visit schedule..."
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-[#C5A15A]"
                            />
                          </div>
                        </div>
                      ))}

                    {enquiries.length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-8">
                        No client enquiries recorded yet.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: SUBMISSIONS (SELL PROPERTY LEADS) */}
              {adminTab === 'submissions' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-[#14283F]">
                      Seller Submissions
                    </h3>
                    <p className="text-xs text-slate-500">
                      Properties submitted by owners for sale or lease assessment
                    </p>
                  </div>

                  <div className="space-y-3">
                    {submissions.map((sub) => (
                      <div key={sub.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-sm text-[#14283F]">{sub.ownerName}</span>
                            <span className="text-slate-500 ml-2">({sub.listingType}: {sub.propertyType})</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
                          <div>
                            <span className="text-[11px] text-slate-500 block">Phone:</span>
                            <span className="font-mono font-semibold">{sub.phone}</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 block">Location:</span>
                            <span>{sub.propertyLocation}</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 block">Expected Price:</span>
                            <span className="font-semibold">{sub.expectedPrice}</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 block">Size:</span>
                            <span>{sub.propertySize}</span>
                          </div>
                        </div>

                        {sub.description && (
                          <div className="bg-white p-2.5 rounded border border-slate-200 text-slate-700">
                            {sub.description}
                          </div>
                        )}
                      </div>
                    ))}

                    {submissions.length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-8">
                        No property seller submissions yet.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: BUSINESS SETTINGS */}
              {adminTab === 'settings' && settings && (
                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-[#14283F]">
                      Business Profile Settings
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure company details, telephone, and location
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={settings.businessName}
                      onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      value={settings.ownerName}
                      onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Location
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#14283F] rounded-lg cursor-pointer"
                  >
                    Save Business Settings
                  </button>
                </form>
              )}
            </main>
          </div>
        )}

      </div>

      {/* Property Create/Edit Modal */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b mb-4">
              <h4 className="font-bold text-sm text-[#14283F]">
                {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h4>
              <button
                type="button"
                onClick={() => setIsPropertyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={propertyForm.title}
                  onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={propertyForm.category}
                    onChange={(e) => setPropertyForm({ ...propertyForm, category: e.target.value as any })}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Property Type</label>
                  <select
                    value={propertyForm.propertyType}
                    onChange={(e) => setPropertyForm({ ...propertyForm, propertyType: e.target.value as any })}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="Apartment / Flat">Apartment / Flat</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Villa">Villa</option>
                    <option value="Builder Floor">Builder Floor</option>
                    <option value="Plot / Land">Plot / Land</option>
                    <option value="Office Space">Office Space</option>
                    <option value="Shop / Retail Space">Shop / Retail Space</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Display Price</label>
                  <input
                    type="text"
                    required
                    value={propertyForm.price}
                    onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                    placeholder="e.g. ₹1.85 Cr"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price in Lakhs (for filter)</label>
                  <input
                    type="number"
                    value={propertyForm.priceNumericInLakhs}
                    onChange={(e) => setPropertyForm({ ...propertyForm, priceNumericInLakhs: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location District</label>
                  <select
                    value={propertyForm.location}
                    onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value as any })}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="Krishna Nagar">Krishna Nagar</option>
                    <option value="East Delhi">East Delhi</option>
                    <option value="North Delhi">North Delhi</option>
                    <option value="South Delhi">South Delhi</option>
                    <option value="West Delhi">West Delhi</option>
                    <option value="Central Delhi">Central Delhi</option>
                    <option value="Other Location">Other Location</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Specific Location Details</label>
                  <input
                    type="text"
                    value={propertyForm.locationDetails}
                    onChange={(e) => setPropertyForm({ ...propertyForm, locationDetails: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Area</label>
                  <input
                    type="text"
                    value={propertyForm.area}
                    onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={propertyForm.bedrooms}
                    onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={propertyForm.bathrooms}
                    onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={propertyForm.description}
                  onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={propertyForm.amenities}
                  onChange={(e) => setPropertyForm({ ...propertyForm, amenities: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={propertyForm.status}
                  onChange={(e) => setPropertyForm({ ...propertyForm, status: e.target.value as any })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Under Offer">Under Offer</option>
                  <option value="Sold">Sold</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPropertyModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-white bg-[#14283F] rounded font-semibold"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-70 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900">Confirm Deletion</h4>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this property listing? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-1.5 text-xs text-slate-600 bg-slate-100 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProperty(deleteConfirmId)}
                className="px-4 py-1.5 text-xs text-white bg-rose-600 rounded font-semibold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
