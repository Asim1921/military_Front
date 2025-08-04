// src/components/business/business-filters.tsx
'use client';

import { useState } from 'react';
import { 
  XMarkIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';
import { BusinessCategory } from '@/lib/api';

interface BusinessFiltersProps {
  categories: BusinessCategory[];
  filters: {
    category_ids: number[];
    state: string;
    city: string;
    verified: boolean;
    featured: boolean;
    military_owned: boolean;
    emergency_service: boolean;
    insured: boolean;
    min_rating?: number;
    sort_by: string;
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  compact?: boolean;
}

export function BusinessFilters({
  categories,
  filters,
  onFilterChange,
  onClearFilters,
  compact = false
}: BusinessFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    location: true,
    features: true,
    rating: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    if (compact) return; // Don't allow collapsing in compact mode
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryToggle = (categoryId: number) => {
    const newCategoryIds = filters.category_ids.includes(categoryId)
      ? filters.category_ids.filter(id => id !== categoryId)
      : [...filters.category_ids, categoryId];
    
    onFilterChange({ category_ids: newCategoryIds });
  };

  const handleFeatureToggle = (feature: string) => {
    onFilterChange({ [feature]: !filters[feature as keyof typeof filters] });
  };

  const popularCategories = categories
    .sort((a, b) => b.businesses_count - a.businesses_count)
    .slice(0, compact ? 6 : 10);

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const stateNames: { [key: string]: string } = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
    'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
    'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
    'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
    'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
    'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
    'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
    'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
    'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
    'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
    'WI': 'Wisconsin', 'WY': 'Wyoming'
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category_ids.length > 0) count++;
    if (filters.state) count++;
    if (filters.city) count++;
    if (filters.verified) count++;
    if (filters.featured) count++;
    if (filters.military_owned) count++;
    if (filters.emergency_service) count++;
    if (filters.insured) count++;
    if (filters.min_rating) count++;
    return count;
  };

  const FilterSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
        disabled={compact}
      >
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {!compact && (
          <div className="flex items-center">
            {expandedSections[section] ? (
              <ChevronUpIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            )}
          </div>
        )}
      </button>
      {(expandedSections[section] || compact) && (
        <div className="pb-4 pl-1">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
            Filters
          </h2>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full transition-colors duration-200"
            >
              <XMarkIcon className="h-4 w-4" />
              Clear ({getActiveFilterCount()})
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Categories */}
        <FilterSection title="Categories" section="categories">
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {popularCategories.map((category) => (
              <label
                key={category.id}
                className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={filters.category_ids.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0"
                />
                <div className="ml-3 flex items-center flex-1 min-w-0">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <i className={`${category.icon_class} text-primary-600 text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block truncate">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {category.businesses_count} businesses
                    </span>
                  </div>
                </div>
              </label>
            ))}
            {!compact && categories.length > 10 && (
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-2 hover:bg-primary-50 px-2 py-1 rounded transition-colors duration-200">
                + Show all categories
              </button>
            )}
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection title="Location" section="location">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                <MapPinIcon className="h-3 w-3 inline mr-1" />
                State
              </label>
              <select
                value={filters.state}
                onChange={(e) => onFilterChange({ state: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {stateNames[state]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                City
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => onFilterChange({ city: e.target.value })}
                  placeholder="Enter city name"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-10"
                />
                <MapPinIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Business Features */}
        <FilterSection title="Business Features" section="features">
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="checkbox"
                checked={filters.military_owned}
                onChange={() => handleFeatureToggle('military_owned')}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center">
                <div className="w-8 h-8 bg-military-50 rounded-lg flex items-center justify-center mr-3">
                  <ShieldCheckIcon className="h-4 w-4 text-military-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block">
                    Military Owned
                  </span>
                  <span className="text-xs text-gray-500">Veteran-owned businesses</span>
                </div>
              </div>
            </label>

            <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={() => handleFeatureToggle('verified')}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block">
                    Verified
                  </span>
                  <span className="text-xs text-gray-500">Background checked</span>
                </div>
              </div>
            </label>

            <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="checkbox"
                checked={filters.featured}
                onChange={() => handleFeatureToggle('featured')}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center">
                <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center mr-3">
                  <StarIcon className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block">
                    Featured
                  </span>
                  <span className="text-xs text-gray-500">Premium listings</span>
                </div>
              </div>
            </label>

            <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="checkbox"
                checked={filters.emergency_service}
                onChange={() => handleFeatureToggle('emergency_service')}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center">
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block">
                    Emergency Service
                  </span>
                  <span className="text-xs text-gray-500">24/7 availability</span>
                </div>
              </div>
            </label>

            <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="checkbox"
                checked={filters.insured}
                onChange={() => handleFeatureToggle('insured')}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <ShieldCheckIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block">
                    Insured
                  </span>
                  <span className="text-xs text-gray-500">Liability covered</span>
                </div>
              </div>
            </label>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Minimum Rating" section="rating">
          <div className="space-y-3">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label
                key={rating}
                className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="min_rating"
                  checked={filters.min_rating === rating}
                  onChange={() => onFilterChange({ min_rating: rating })}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-offset-0"
                />
                <div className="ml-3 flex items-center">
                  <div className="flex items-center mr-3">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(rating) ? (
                        <StarIconSolid
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                        />
                      ) : (
                        <StarIcon
                          key={i}
                          className="h-4 w-4 text-gray-300"
                        />
                      )
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {rating}+ stars
                  </span>
                </div>
              </label>
            ))}
            <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="radio"
                name="min_rating"
                checked={!filters.min_rating}
                onChange={() => onFilterChange({ min_rating: undefined })}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Any rating
              </span>
            </label>
          </div>
        </FilterSection>
      </div>

      {/* Active Filters Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active
            </span>
            <div className="flex flex-wrap gap-1">
              {filters.military_owned && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-military-100 text-military-800">
                  Military Owned
                </span>
              )}
              {filters.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Verified
                </span>
              )}
              {filters.featured && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}