// src/components/about/about-hero.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeartIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline';

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-military-800 to-veteran-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="relative container-custom py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 jodis-gradient rounded-full">
                <HeartIcon className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Honoring Service,{' '}
              <span className="text-yellow-400">Building Bridges</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Jodi's List connects communities with trusted military veteran-owned businesses, 
              creating opportunities that honor service and strengthen our economy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="#mission" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Our Mission
              </Link>
              <Link href="#veterans" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Veterans Program
              </Link>
            </div>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <ShieldCheckIcon className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-gray-300">Verified Businesses</div>
            </div>
            <div className="text-center">
              <UsersIcon className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold">50</div>
              <div className="text-sm text-gray-300">States Served</div>
            </div>
            <div className="text-center">
              <HeartIcon className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-gray-300">Lives Impacted</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}