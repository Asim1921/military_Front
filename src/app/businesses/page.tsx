// src/app/businesses/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  MapIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  EyeIcon,
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { api, Business, BusinessCategory } from '@/lib/api';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BusinessCard } from '@/components/business/business-card';
import { SearchBar } from '@/components/search/search-bar';
import { BusinessFilters } from '../businesses/business-filters';
import { BusinessMap } from '@/components/business/business-map';

// Loading Skeleton Component
const LoadingSkeleton = ({ type }: { type: string }) => {
  if (type === 'business-grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  totalCount,
  perPage,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
}) => {
  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // If only 1 page, just return [1]
    if (totalPages <= 1) return [1];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-700 mb-4 sm:mb-0">
          Showing <span className="font-medium">{totalCount > 0 ? startItem : 0}</span> to{' '}
          <span className="font-medium">{totalCount > 0 ? endItem : 0}</span> of{' '}
          <span className="font-medium">{totalCount.toLocaleString()}</span> results
        </div>

        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-1">
              {pageNumbers.map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
                  disabled={pageNumber === '...'}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    pageNumber === currentPage
                      ? 'bg-primary-600 text-white'
                      : pageNumber === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function BusinessesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    perPage: 20
  });

  // Initialize filters from URL parameters
  const initializeFilters = () => {
    return {
      category_ids: searchParams.get('category') ? [parseInt(searchParams.get('category')!)] : [],
      state: searchParams.get('state') || '',
      city: searchParams.get('city') || '',
      verified: searchParams.get('verified') === 'true',
      featured: searchParams.get('featured') === 'true',
      military_owned: searchParams.get('military_owned') === 'true',
      emergency_service: searchParams.get('emergency_service') === 'true',
      insured: searchParams.get('insured') === 'true',
      min_rating: searchParams.get('min_rating') ? parseFloat(searchParams.get('min_rating')!) : undefined,
      sort_by: searchParams.get('sort_by') || 'relevance',
      q: searchParams.get('q') || '' // Add search query to filters
    };
  };

  const [filters, setFilters] = useState(initializeFilters);

  // Hero search state
  const [heroSearchQuery, setHeroSearchQuery] = useState(searchParams.get('q') || '');
  const [heroSearchLocation, setHeroSearchLocation] = useState(searchParams.get('location') || '');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Update filters when URL params change
  useEffect(() => {
    const newFilters = initializeFilters();
    setFilters(newFilters);
    setHeroSearchQuery(searchParams.get('q') || '');
    setHeroSearchLocation(searchParams.get('location') || '');
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchParams, filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const currentPage = parseInt(searchParams.get('page') || '1');
      
      const params = {
        page: currentPage,
        per_page: 20,
        ...filters,
        // Remove empty values to clean up the API call
        category_ids: filters.category_ids.length > 0 ? filters.category_ids : undefined,
        state: filters.state || undefined,
        city: filters.city || undefined,
        min_rating: filters.min_rating || undefined,
        q: filters.q || undefined // Add search query
      };

      // Remove undefined values
      Object.keys(params).forEach(key => {
        if (params[key] === undefined) {
          delete params[key];
        }
      });

      console.log('API Request params:', params); // Debug log
      
      // Use search endpoint if there's a query, otherwise use list endpoint
      let response;
      if (filters.q && filters.q.trim()) {
        console.log('Using search endpoint with query:', filters.q);
        response = await api.businesses.search(params);
      } else {
        console.log('Using list endpoint');
        response = await api.businesses.list(params);
      }
      
      console.log('API Response:', response.data); // Debug log
      
      // Handle different possible response structures
      let businessesData = [];
      let metaData = null;
      
      if (response.data.success) {
        businessesData = response.data.data?.businesses || response.data.data || [];
        metaData = response.data.meta || response.data.data?.meta;
      } else {
        // Try alternate structure
        businessesData = response.data.businesses || [];
        metaData = response.data.meta;
      }
      
      console.log('Processed businesses:', businessesData.length, 'businesses');
      console.log('Meta data:', metaData);
      
      setBusinesses(businessesData);
      
      // Update pagination with proper data or calculate from businesses length
      if (metaData) {
        setPagination({
          currentPage: metaData.current_page || currentPage,
          totalPages: metaData.total_pages || Math.ceil((metaData.total_count || businessesData.length) / 20),
          totalCount: metaData.total_count || businessesData.length,
          perPage: metaData.per_page || 20
        });
      } else {
        // Fallback pagination calculation
        setPagination({
          currentPage: currentPage,
          totalPages: Math.max(1, Math.ceil(businessesData.length / 20)),
          totalCount: businessesData.length,
          perPage: 20
        });
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
      // Set empty state on error
      setBusinesses([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        perPage: 20
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.categories.list();
      if (response.data.success) {
        setCategories(response.data.data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Update URL parameters
    const url = new URL(window.location.href);
    
    // Clear existing filter params
    ['category', 'state', 'city', 'verified', 'featured', 'military_owned', 'emergency_service', 'insured', 'min_rating', 'sort_by', 'q', 'location'].forEach(param => {
      url.searchParams.delete(param);
    });
    
    // Set new filter params
    if (updatedFilters.category_ids.length > 0) {
      url.searchParams.set('category', updatedFilters.category_ids[0].toString());
    }
    if (updatedFilters.state) url.searchParams.set('state', updatedFilters.state);
    if (updatedFilters.city) url.searchParams.set('city', updatedFilters.city);
    if (updatedFilters.verified) url.searchParams.set('verified', 'true');
    if (updatedFilters.featured) url.searchParams.set('featured', 'true');
    if (updatedFilters.military_owned) url.searchParams.set('military_owned', 'true');
    if (updatedFilters.emergency_service) url.searchParams.set('emergency_service', 'true');
    if (updatedFilters.insured) url.searchParams.set('insured', 'true');
    if (updatedFilters.min_rating) url.searchParams.set('min_rating', updatedFilters.min_rating.toString());
    if (updatedFilters.sort_by !== 'relevance') url.searchParams.set('sort_by', updatedFilters.sort_by);
    if (updatedFilters.q) url.searchParams.set('q', updatedFilters.q);
    if (heroSearchLocation) url.searchParams.set('location', heroSearchLocation);
    
    // Reset to page 1 when filters change
    url.searchParams.delete('page');
    
    router.push(url.toString(), { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    if (page === 1) {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page.toString());
    }
    
    router.push(url.toString(), { scroll: false });
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    const clearedFilters = {
      category_ids: [],
      state: '',
      city: '',
      verified: false,
      featured: false,
      military_owned: false,
      emergency_service: false,
      insured: false,
      min_rating: undefined,
      sort_by: 'relevance',
      q: '' // Clear search query too
    };
    
    setFilters(clearedFilters);
    setHeroSearchQuery('');
    setHeroSearchLocation('');
    
    // Clear URL parameters
    const url = new URL(window.location.href);
    ['category', 'state', 'city', 'verified', 'featured', 'military_owned', 'emergency_service', 'insured', 'min_rating', 'sort_by', 'page', 'q', 'location'].forEach(param => {
      url.searchParams.delete(param);
    });
    
    router.push(url.toString(), { scroll: false });
  };

  // Hero search handlers
  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update filters with search query and location
    const newFilters = {
      ...filters,
      q: heroSearchQuery.trim(),
      // Parse location into city/state if possible
      city: heroSearchLocation.trim() ? parseLocationToCity(heroSearchLocation.trim()) : '',
      state: heroSearchLocation.trim() ? parseLocationToState(heroSearchLocation.trim()) : ''
    };
    
    handleFilterChange(newFilters);
  };

  const handleServiceTagClick = (service: string) => {
    setHeroSearchQuery(service);
    const newFilters = {
      ...filters,
      q: service
    };
    handleFilterChange(newFilters);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Use a simple reverse geocoding service or implement your own
            // For now, we'll use a placeholder that you can replace with your preferred service
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            
            if (data.city && data.principalSubdivision) {
              const locationString = `${data.city}, ${data.principalSubdivisionCode}`;
              setHeroSearchLocation(locationString);
            }
          } catch (error) {
            console.error('Error getting location name:', error);
            // Fallback to coordinates
            setHeroSearchLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
          
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsGettingLocation(false);
          // You could show a toast notification here
        }
      );
    } else {
      setIsGettingLocation(false);
      console.error('Geolocation is not supported by this browser');
    }
  };

  // Helper functions to parse location
  const parseLocationToCity = (location: string): string => {
    // Simple parsing - you can make this more sophisticated
    const parts = location.split(',');
    return parts[0]?.trim() || '';
  };

  const parseLocationToState = (location: string): string => {
    // Simple parsing - you can make this more sophisticated
    const parts = location.split(',');
    if (parts.length > 1) {
      const statePart = parts[1]?.trim();
      // Extract state code (last 2 characters if it looks like a state code)
      if (statePart && statePart.length >= 2) {
        return statePart.slice(-2).toUpperCase();
      }
    }
    return '';
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') return value !== '' && value !== 'relevance';
      if (typeof value === 'number') return true;
      return false;
    }).length;
  };

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: ArrowsUpDownIcon },
    { value: 'rating', label: 'Highest Rated', icon: ArrowsUpDownIcon },
    { value: 'newest', label: 'Newest First', icon: ArrowsUpDownIcon },
    { value: 'name', label: 'Name A-Z', icon: ArrowsUpDownIcon },
    { value: 'membership', label: 'Military Priority', icon: ArrowsUpDownIcon }
  ];

  const currentSortOption = sortOptions.find(option => option.value === filters.sort_by);

  // Calculate display counts
  const startCount = pagination.totalCount > 0 ? (pagination.currentPage - 1) * pagination.perPage + 1 : 0;
  const endCount = Math.min(pagination.currentPage * pagination.perPage, pagination.totalCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-military-800 to-veteran-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute top-20 right-0 w-32 h-32 bg-white rounded-full translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white rounded-full translate-y-12"></div>
        </div>

        <div className="relative container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              {filters.q ? `Search Results for "${filters.q}"` : 'Veteran Business Directory'}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              {filters.q 
                ? `Found businesses matching "${filters.q}" from trusted military veteran-owned providers.`
                : 'Browse and connect with trusted military veteran-owned businesses across all categories. Supporting those who served while getting quality service.'
              }
            </p>
          </motion.div>

          {/* Hero Search */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Main Search Container */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <form onSubmit={handleHeroSearch} className="flex flex-col lg:flex-row">
                {/* Service Search Input */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={heroSearchQuery}
                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                    placeholder="Search for services (plumbing, legal, HVAC...)"
                    className="w-full h-16 pl-16 pr-6 text-lg text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:ring-0 focus:outline-none"
                  />
                </div>
                
                {/* Divider */}
                <div className="hidden lg:block w-px bg-gray-200 my-3"></div>
                
                {/* Location Input */}
                <div className="lg:w-80 relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <MapPinIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={heroSearchLocation}
                    onChange={(e) => setHeroSearchLocation(e.target.value)}
                    placeholder="City, State or ZIP"
                    className="w-full h-16 pl-16 pr-20 text-lg text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:ring-0 focus:outline-none lg:border-l lg:border-gray-200"
                  />
                  {/* GPS Button */}
                  <button 
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="absolute inset-y-0 right-6 flex items-center text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50"
                  >
                    {isGettingLocation ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                    ) : (
                      <span className="text-sm font-medium">GPS</span>
                    )}
                  </button>
                </div>
                
                {/* Search Button */}
                <div className="lg:w-auto">
                  <button 
                    type="submit"
                    className="w-full lg:w-auto h-16 px-8 lg:px-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-200"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Popular Services Tags */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                'Plumbing', 
                'HVAC', 
                'Legal Services', 
                'Electrical', 
                'Security', 
                'Event Planning'
              ].map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceTagClick(service)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-200 text-sm font-medium"
                >
                  {service}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 text-sm mt-8"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-gray-200">{pagination.totalCount.toLocaleString()} verified businesses</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-gray-200">All 50 states covered</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-gray-200">100% military veteran owned</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="lg:flex lg:gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <BusinessFilters
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Enhanced Controls Bar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Side - Filters & Results */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium rounded-lg border border-primary-200 transition-colors duration-200"
                  >
                    <FunnelIcon className="h-4 w-4" />
                    <span>Filters</span>
                    {getActiveFilterCount() > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                        {getActiveFilterCount()}
                      </span>
                    )}
                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Results Count */}
                  <div className="flex items-center gap-2 text-sm">
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      Showing{' '}
                      <span className="font-semibold text-gray-900">
                        {loading ? '...' : (pagination.totalCount === 0 ? '0' : `${startCount}-${endCount}`)}
                      </span>{' '}
                      of{' '}
                      <span className="font-semibold text-gray-900">
                        {loading ? '...' : pagination.totalCount.toLocaleString()}
                      </span>{' '}
                      businesses
                    </span>
                  </div>
                </div>

                {/* Right Side - Controls */}
                <div className="flex items-center gap-4">
                  {/* Enhanced Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={filters.sort_by}
                      onChange={(e) => handleFilterChange({ sort_by: e.target.value })}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Enhanced View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-white text-primary-700 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Squares2X2Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'map'
                          ? 'bg-white text-primary-700 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <MapIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Map</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {getActiveFilterCount() > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {filters.q && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Search: "{filters.q}"
                        </span>
                      )}
                      {filters.military_owned && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-military-100 text-military-800">
                          Military Owned
                        </span>
                      )}
                      {filters.verified && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      )}
                      {filters.featured && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                      {filters.emergency_service && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Emergency Service
                        </span>
                      )}
                      {filters.insured && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Insured
                        </span>
                      )}
                      {filters.state && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {filters.state}
                        </span>
                      )}
                      {filters.city && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {filters.city}
                        </span>
                      )}
                      {filters.min_rating && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {filters.min_rating}+ Stars
                        </span>
                      )}
                    </div>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mb-8"
                >
                  <BusinessFilters
                    categories={categories}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                    compact={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content */}
            {loading ? (
              <LoadingSkeleton type="business-grid" />
            ) : viewMode === 'list' ? (
              <div className="space-y-8">
                {/* Business Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {businesses.map((business, index) => (
                    <motion.div
                      key={business.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <BusinessCard business={business} />
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Empty State */}
                {businesses.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MagnifyingGlassIcon className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        No businesses found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        We couldn't find any businesses matching your criteria. 
                        Try adjusting your filters or search terms.
                      </p>
                      <div className="space-y-3">
                        <button
                          onClick={clearFilters}
                          className="btn-primary"
                        >
                          Clear all filters
                        </button>
                        <div className="text-sm text-gray-500">
                          or <Link href="/categories" className="text-primary-600 hover:text-primary-700 font-medium">browse by category</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pagination - ALWAYS SHOW IF WE HAVE BUSINESSES */}
                {businesses.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <Pagination
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      totalCount={pagination.totalCount}
                      perPage={pagination.perPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* Enhanced Map View */
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Map View - {businesses.length} Businesses
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Click on markers to view business details
                    </p>
                  </div>
                  <div className="h-[600px]">
                    <BusinessMap businesses={businesses} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}