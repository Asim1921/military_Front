// src/app/help/page.tsx
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const helpCategories = [
    {
      icon: QuestionMarkCircleIcon,
      title: 'Getting Started',
      description: 'Learn the basics of using Jodi\'s List',
      articles: 12,
      topics: ['Creating an account', 'Profile setup', 'First search', 'Understanding listings']
    },
    {
      icon: BookOpenIcon,
      title: 'For Customers',
      description: 'Find and connect with veteran businesses',
      articles: 18,
      topics: ['Searching businesses', 'Reading reviews', 'Contacting providers', 'Safety tips']
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'For Business Owners',
      description: 'Grow your veteran-owned business',
      articles: 25,
      topics: ['Creating listings', 'Managing reviews', 'Pricing plans', 'Marketing tools']
    },
    {
      icon: PhoneIcon,
      title: 'Account & Billing',
      description: 'Manage your account and subscriptions',
      articles: 15,
      topics: ['Account settings', 'Billing issues', 'Plan changes', 'Cancellations']
    }
  ];

  const faqs = [
    {
      question: 'How do I verify that a business is truly veteran-owned?',
      answer: 'All businesses on Jodi\'s List go through our comprehensive verification process. We verify military service through DD-214 documentation, business licenses, and conduct background checks. Look for the "Verified Veteran" badge on business profiles.'
    },
    {
      question: 'Is Jodi\'s List free to use for customers?',
      answer: 'Yes! Searching for and connecting with veteran-owned businesses is completely free for customers. We never charge fees for browsing listings, reading reviews, or contacting businesses.'
    },
    {
      question: 'How can I list my veteran-owned business?',
      answer: 'You can list your business by creating an account and selecting "Business Owner" during registration. We\'ll guide you through our verification process and help you create a compelling business profile. Basic listings are free, with premium options available.'
    },
    {
      question: 'What if I have a problem with a service provider?',
      answer: 'We take all concerns seriously. You can report issues through our platform, and we\'ll investigate promptly. We also encourage honest reviews to help other customers make informed decisions.'
    },
    {
      question: 'How do you ensure the quality of businesses on the platform?',
      answer: 'We use a multi-layered approach: veteran verification, business license validation, insurance confirmation, customer reviews, and ongoing monitoring. Businesses that don\'t meet our standards are removed from the platform.'
    },
    {
      question: 'Can military spouses list their businesses?',
      answer: 'Absolutely! We welcome businesses owned by military spouses and family members. While they receive a "Military Family" designation rather than "Veteran Owned," they\'re equally valued members of our community.'
    },
    {
      question: 'What types of services can I find on Jodi\'s List?',
      answer: 'Our platform features veteran-owned businesses across all major service categories: home services, professional services, healthcare, automotive, technology, construction, and many more. If there\'s a service you need, chances are a veteran provides it.'
    },
    {
      question: 'How do I leave a review for a business?',
      answer: 'After working with a business, you can leave a review by visiting their profile page and clicking "Write a Review." We encourage honest, detailed feedback to help other customers and help businesses improve.'
    }
  ];

  const quickActions = [
    { title: 'Search Businesses', description: 'Find veteran-owned services', href: '/businesses' },
    { title: 'Create Account', description: 'Join our community', href: '/register' },
    { title: 'List Business', description: 'Add your veteran business', href: '/register' },
    { title: 'Contact Support', description: 'Get personal help', href: '/contact' }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-military-700 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Find answers, get support, and make the most of Jodi's List
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Quick Actions
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.a
                  key={index}
                  href={action.href}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 * index }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all duration-200 text-center"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Browse Help Categories
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {helpCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 * index }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          {category.articles} articles
                        </span>
                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.topics.slice(0, 3).map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                        {category.topics.length > 3 && (
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{category.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.05 * index }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our support team is here to help you succeed. Get in touch and we'll respond quickly.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <PhoneIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-3">Mon-Fri, 8AM-6PM EST</p>
                <a href="tel:+15551234567" className="text-primary-600 font-medium">
                  (555) 123-4567
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-3">Available 24/7</p>
                <button className="text-primary-600 font-medium">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <BookOpenIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-3">Response within 24 hours</p>
                <a href="/contact" className="text-primary-600 font-medium">
                  Send Message
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}