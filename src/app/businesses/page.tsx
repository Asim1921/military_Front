// src/app/businesses/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { api, Business, BusinessCategory } from '@/lib/api';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BusinessCard } from '@/components/business/business-card';
import { SearchBar } from '@/components/search/search-bar';
import { BusinessFilters } from '../businesses/business-filters';
import { BusinessMap } from '@/components/business/business-map';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Pagination } from '@/components/ui/pagination';

export default function BusinessesPage() {
  const searchParams = useSearchParams();
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

  const [filters, setFilters] = useState({
    category_ids: searchParams.get('category') ? [parseInt(searchParams.get('category')!)] : [],
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || '',
    verified: searchParams.get('verified') === 'true',
    featured: searchParams.get('featured') === 'true',
    military_owned: searchParams.get('military_owned') === 'true',
    emergency_service: searchParams.get('emergency_service') === 'true',
    insured: searchParams.get('insured') === 'true',
    min_rating: searchParams.get('min_rating') ? parseFloat(searchParams.get('min_rating')!) : undefined,
    sort_by: searchParams.get('sort_by') || 'relevance'
  });

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [searchParams, filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        page: parseInt(searchParams.get('page') || '1'),
        per_page: 20,
        ...filters
      };

      const response = await api.businesses.list(params);
      setBusinesses(response.data.data.businesses || []);
      
      if (response.data.meta) {
        setPagination({
          currentPage: response.data.meta.current_page,
          totalPages: response.data.meta.total_pages,
          totalCount: response.data.meta.total_count,
          perPage: response.data.meta.per_page
        });
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.categories.list();
      setCategories(response.data.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category_ids: [],
      state: '',
      city: '',
      verified: false,
      featured: false,
      military_owned: false,
      emergency_service: false,
      insured: false,
      min_rating: undefined,
      sort_by: 'relevance'
    });
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
              Veteran Business Directory
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Browse and connect with trusted military veteran-owned businesses across all categories. 
              Supporting those who served while getting quality service.
            </p>
          </motion.div>

          {/* Main Search Container */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Service Search Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for services (plumbing, legal, HVAC...)"
                      className="w-full h-16 pl-16 pr-6 text-lg text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:ring-0 focus:outline-none"
                    />
                  </div>
                  
                  {/* Divider */}
                  <div className="hidden lg:block w-px bg-gray-200 my-3"></div>
                  
                  {/* Location Input */}
                  <div className="lg:w-80 relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                      {/* <MapPinIcon className="h-6 w-6 text-gray-400" /> */}
                    </div>
                    <input
                      type="text"
                      placeholder="City, State or ZIP"
                      className="w-full h-16 pl-16 pr-20 text-lg text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:ring-0 focus:outline-none lg:border-l lg:border-gray-200"
                    />
                    {/* GPS Button */}
                    <button className="absolute inset-y-0 right-6 flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                      <span className="text-sm font-medium">GPS</span>
                    </button>
                  </div>
                  
                  {/* Search Button */}
                  <div className="lg:w-auto">
                    <button className="w-full lg:w-auto h-16 px-8 lg:px-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-200">
                      Search
                    </button>
                  </div>
                </div>
              </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 text-sm"
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
                      Showing <span className="font-semibold text-gray-900">{businesses.length}</span> of{' '}
                      <span className="font-semibold text-gray-900">{pagination.totalCount.toLocaleString()}</span> businesses
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
                {businesses.length === 0 && (
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

                {/* Pagination */}
                {businesses.length > 0 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      totalCount={pagination.totalCount}
                      perPage={pagination.perPage}
                      onPageChange={(page) => {
                        const url = new URL(window.location.href);
                        url.searchParams.set('page', page.toString());
                        window.history.pushState({}, '', url.toString());
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
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