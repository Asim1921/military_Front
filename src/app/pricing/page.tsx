// src/app/pricing/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { 
  CheckIcon,
  XMarkIcon,
  StarIcon,
  ShieldCheckIcon,
  HeartIcon,
  CurrencyDollarIcon,
  UsersIcon,
  TrophyIcon,
  BoltIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
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

  const plans = [
    {
      name: 'Basic Listing',
      description: 'Perfect for veteran businesses just getting started',
      price: 0,
      period: 'Forever Free',
      popular: false,
      veteranFree: true,
      features: [
        'Business profile and contact information',
        'Basic business description (300 characters)',
        'Service category selection',
        'Customer reviews and ratings',
        'Basic search visibility',
        'Mobile-friendly listing',
        'Email notifications for inquiries',
        'Veterans support hotline access'
      ],
      limitations: [
        'Limited to 2 photos',
        'Basic analytics only',
        'Standard customer support'
      ]
    },
    {
      name: 'Professional',
      description: 'Enhanced visibility and professional tools',
      price: isAnnual ? 29 : 39,
      period: isAnnual ? '/month (billed annually)' : '/month',
      popular: true,
      veteranFree: true,
      features: [
        'Everything in Basic Listing',
        'Enhanced business profile with unlimited photos',
        'Extended business description (1000 characters)',
        'Featured placement in search results',
        'Priority customer support',
        'Advanced analytics dashboard',
        'Social media integration',
        'Custom business hours and availability',
        'Lead management tools',
        'Review response capabilities',
        'Business verification badge'
      ],
      limitations: []
    },
    {
      name: 'Premium',
      description: 'Maximum exposure and advanced marketing tools',
      price: isAnnual ? 79 : 99,
      period: isAnnual ? '/month (billed annually)' : '/month',
      popular: false,
      veteranFree: true,
      features: [
        'Everything in Professional',
        'Top placement in all searches',
        'Featured on homepage rotation',
        'Advanced lead generation tools',
        'Custom promotional campaigns',
        'Detailed customer insights',
        'API access for integrations',
        'Dedicated account manager',
        'Marketing consultation calls',
        'Custom landing page',
        'Advanced SEO optimization',
        'Multi-location support'
      ],
      limitations: []
    }
  ];

  const addOnServices = [
    {
      name: 'Professional Photography',
      description: 'High-quality photos of your business and team',
      price: 'Starting at $299',
      icon: StarIcon
    },
    {
      name: 'Content Writing',
      description: 'Professional business description and service details',
      price: 'Starting at $149',
      icon: BoltIcon
    },
    {
      name: 'SEO Optimization',
      description: 'Optimize your listing for better search visibility',
      price: 'Starting at $199',
      icon: ChartBarIcon
    },
    {
      name: 'Marketing Consultation',
      description: 'One-on-one strategy session with marketing experts',
      price: '$99/hour',
      icon: TrophyIcon
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-military-800 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <HeartIcon className="h-12 w-12 text-yellow-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold font-heading">
                Always Free for Veterans
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              There is never a cost with Jodi's List for Veterans. We want Veterans to be successful 
              and achieve their goals, whether finding services or growing their business.
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-yellow-400 mr-3" />
                <h3 className="text-xl font-semibold">Our Commitment to Veterans</h3>
              </div>
              <p className="text-gray-200">
                Every feature, every tool, every service - completely free for our military veterans 
                and their families. Because your service to our country deserves our service to you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <span className={`mr-3 ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="ml-2 text-sm text-green-600 font-medium">
                Save 25%
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden ${
                  plan.popular 
                    ? 'border-primary-500 ring-2 ring-primary-200' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                {plan.veteranFree && (
                  <div className="absolute top-0 right-0 bg-military-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                    FREE for Veterans
                  </div>
                )}

                <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {plan.description}
                    </p>
                    
                    <div className="flex items-center justify-center">
                      {plan.price === 0 ? (
                        <div className="text-4xl font-bold text-green-600">
                          FREE
                        </div>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-gray-900">
                            ${plan.price}
                          </span>
                          <span className="text-gray-600 ml-2">
                            {plan.period}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {plan.veteranFree && (
                      <div className="mt-4 flex items-center justify-center text-military-700">
                        <ShieldCheckIcon className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">
                          Always free with veteran verification
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-6">
                        <p className="text-xs text-gray-500 mb-2">Limitations:</p>
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-start">
                            <XMarkIcon className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 text-xs">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/register"
                    className={`w-full btn-primary text-center block ${
                      plan.popular ? 'bg-primary-600 hover:bg-primary-700' : ''
                    }`}
                  >
                    Get Started
                  </Link>
                  
                  {plan.veteranFree && (
                    <p className="text-center text-xs text-gray-500 mt-2">
                      Veteran verification required
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Optional Add-on Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your listing with professional services to attract more customers
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {addOnServices.map((service, index) => (
              <motion.div
                key={service.name}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <p className="text-primary-600 font-semibold">
                  {service.price}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {[
              {
                question: "How do I verify my veteran status?",
                answer: "We accept DD-214 forms, VA cards, or other official military documentation. Our verification process is secure and confidential."
              },
              {
                question: "What happens after my free trial period?",
                answer: "Veterans never have a trial period - all features remain free forever with verified veteran status."
              },
              {
                question: "Can I change plans at any time?",
                answer: "Yes, you can upgrade, downgrade, or cancel at any time. Changes take effect immediately."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. Veterans always get free access."
              },
              {
                question: "Is there a setup fee?",
                answer: "No setup fees ever. We believe in transparent, straightforward pricing."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
                  {faq.answer}
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
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Grow Your Veteran Business?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of veteran entrepreneurs who trust Jodi's List to connect 
              them with customers who value their service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Start Your Free Listing
              </Link>
              <Link 
                href="/contact"
                 className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}