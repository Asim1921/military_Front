// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { 
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  StarIcon as StarIconSolid 
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { api, Business, BusinessCategory } from '@/lib/api';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BusinessCard } from '@/components/business/business-card';
import { SearchBar } from '@/components/search/search-bar';
import { CategoryGrid } from '@/components/business/category-grid';

export default function HomePage() {
  const router = useRouter();
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    totalVeterans: 0,
    totalCategories: 0,
    totalReviews: 0
  });
  const [loading, setLoading] = useState(true);

  // Hero search state
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const [heroSearchLocation, setHeroSearchLocation] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching homepage data...');
        
        const [featuredResponse, categoriesResponse] = await Promise.all([
          api.businesses.featured({ per_page: 6 }),
          api.categories.list()
        ]);

        console.log('Featured response:', featuredResponse.data);
        console.log('Categories response:', categoriesResponse.data);

        // Handle featured businesses
        let featuredData = [];
        if (featuredResponse.data.success) {
          featuredData = featuredResponse.data.data?.businesses || featuredResponse.data.data || [];
        } else {
          featuredData = featuredResponse.data.businesses || [];
        }
        setFeaturedBusinesses(featuredData);

        // Handle categories
        let categoriesData = [];
        if (categoriesResponse.data.success) {
          categoriesData = categoriesResponse.data.data?.categories || categoriesResponse.data.data || [];
        } else {
          categoriesData = categoriesResponse.data.categories || [];
        }
        setCategories(categoriesData);

        // Get stats from businesses list to get accurate counts
        try {
          const businessesResponse = await api.businesses.list({ per_page: 1 });
          console.log('Businesses response for stats:', businessesResponse.data);
          
          let totalCount = 0;
          if (businessesResponse.data.meta) {
            totalCount = businessesResponse.data.meta.total_count || 0;
          } else if (businessesResponse.data.data?.meta) {
            totalCount = businessesResponse.data.data.meta.total_count || 0;
          }

          setStats({
            totalBusinesses: totalCount,
            totalVeterans: totalCount, // Assuming all businesses are veteran-owned
            totalCategories: categoriesData.length,
            totalReviews: Math.floor(totalCount * 2.5) // Estimated reviews
          });
        } catch (statsError) {
          console.error('Error fetching stats:', statsError);
          // Fallback stats
          setStats({
            totalBusinesses: featuredData.length,
            totalVeterans: featuredData.length,
            totalCategories: categoriesData.length,
            totalReviews: 0
          });
        }

      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hero search handlers
  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Hero search triggered:', { query: heroSearchQuery, location: heroSearchLocation });
    
    // Build search URL parameters
    const params = new URLSearchParams();
    
    if (heroSearchQuery.trim()) {
      params.set('q', heroSearchQuery.trim());
    }
    
    if (heroSearchLocation.trim()) {
      // Parse location into city/state if possible
      const locationParts = heroSearchLocation.trim().split(',');
      if (locationParts.length >= 1) {
        const city = locationParts[0].trim();
        if (city) params.set('city', city);
      }
      if (locationParts.length >= 2) {
        const state = locationParts[1].trim();
        if (state) params.set('state', state);
      }
      params.set('location', heroSearchLocation.trim());
    }

    // Navigate to businesses page with search parameters
    const searchUrl = `/businesses${params.toString() ? `?${params.toString()}` : ''}`;
    console.log('Navigating to:', searchUrl);
    router.push(searchUrl);
  };

  const handleServiceTagClick = (service: string) => {
    console.log('Service tag clicked:', service);
    setHeroSearchQuery(service);
    
    // Immediately navigate to search results
    const params = new URLSearchParams();
    params.set('q', service);
    router.push(`/businesses?${params.toString()}`);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Use a simple reverse geocoding service
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
        }
      );
    } else {
      setIsGettingLocation(false);
      console.error('Geolocation is not supported by this browser');
    }
  };

  // Fixed animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUpChild = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-military-800 to-veteran-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom py-20 lg:py-32">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold font-heading mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Because No one will take care of your home and significant other while you're in the field like{' '}
              <span className="text-yellow-400">Jodi!</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Find reliable service providers who understand your values. 
              Supporting veteran-owned businesses across all 50 states.
            </motion.p>

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
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { icon: UsersIcon, label: 'Veteran Businesses', value: stats.totalBusinesses },
                { icon: CheckBadgeIcon, label: 'Verified Services', value: stats.totalVeterans },
                { icon: StarIcon, label: 'Customer Reviews', value: stats.totalReviews },
                { icon: ShieldCheckIcon, label: 'Service Categories', value: stats.totalCategories }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUpChild}
                  transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold">
                    {loading ? '...' : (stat.value > 0 ? `${stat.value.toLocaleString()}+` : '0+')}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              Popular Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse by category to find the right veteran-owned business for your needs
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CategoryGrid categories={categories.slice(0, 12)} />
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/categories"
              className="btn-secondary"
            >
              View All Categories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              Are you a Veteran Owned Business? Get featured here! 
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
             If you have a DD214, there is absolutely no cost to you! We just want to help the veteran community find veteran owned businesses to work with! We gotta support each other and keep it all in the family!  
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="business-card">
                  <div className="skeleton h-48 w-full mb-4"></div>
                  <div className="p-6">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {featuredBusinesses.slice(0, 6).map((business, index) => (
                <motion.div 
                  key={business.id} 
                  variants={fadeInUpChild}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                >
                  <BusinessCard business={business} featured />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link 
              href="/businesses"
              className="btn-primary"
            >
              Browse All Businesses
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-military-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              Why Choose Jodi's List?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
             Because no one is going to take care of the Vetern Community like the Vetern Community!
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                icon: ShieldCheckIcon,
                title: 'No Stolen Valor here',
                description: 'All businesses are verified military veteran-owned with proper documentation.'
              },
              {
                icon: StarIcon,
                title: 'Always 100% free for Veterns',
                description: 'There is no cost to use Jodi List. Our goal is to be the connective tissue that brings everyone together'
              },
              {
                icon: UsersIcon,
                title: 'Supporting the Community',
                description: 'We as a Vetern Community needs to take care of each other and support each other'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                variants={fadeInUpChild}
                transition={{ duration: 0.4, delay: 0.2 + (index * 0.2) }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 jodis-gradient">
        <div className="container-custom text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Whether you're looking for services or want to list your veteran-owned business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/businesses"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Find Services
              </Link>
              <Link 
                href="/register"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                List Your Business
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}