// src/app/safety/page.tsx
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PhoneIcon,
  CreditCardIcon,
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Type definitions
interface SafetyTip {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  dos: string[];
  donts: string[];
}

interface RedFlag {
  category: string;
  warning: string;
  description: string;
}

interface EmergencyContact {
  service: string;
  number: string;
  description: string;
}

type TabType = 'customers' | 'businesses';

export default function SafetyGuidelinesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('customers');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
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

  const safetyTips: Record<TabType, SafetyTip[]> = {
    customers: [
      {
        icon: EyeIcon,
        title: 'Verify Business Credentials',
        dos: [
          'Check for "Verified Veteran" badges',
          'Read recent customer reviews',
          'Verify business licenses and insurance',
          'Look for professional certifications'
        ],
        donts: [
          'Work with unverified businesses',
          'Ignore red flags in reviews',
          'Skip checking credentials for major work',
          'Rush into large contracts'
        ]
      },
      {
        icon: PhoneIcon,
        title: 'Safe Communication',
        dos: [
          'Use Jodi\'s List messaging initially',
          'Keep records of all communications',
          'Ask for written estimates',
          'Verify business phone numbers'
        ],
        donts: [
          'Share personal information immediately',
          'Use only text or informal communication',
          'Accept verbal agreements only',
          'Ignore unprofessional communication'
        ]
      },
      {
        icon: CreditCardIcon,
        title: 'Secure Payments',
        dos: [
          'Use credit cards for larger payments',
          'Request detailed invoices',
          'Pay in stages for big projects',
          'Keep payment receipts'
        ],
        donts: [
          'Pay large amounts upfront',
          'Use cash for expensive services',
          'Wire money to unknown accounts',
          'Pay without written contracts'
        ]
      },
      {
        icon: HomeIcon,
        title: 'Property Safety',
        dos: [
          'Be present during initial consultations',
          'Secure valuables before work begins',
          'Check worker identification',
          'Verify insurance covers work area'
        ],
        donts: [
          'Leave workers unsupervised initially',
          'Allow unrestricted property access',
          'Skip checking worker credentials',
          'Ignore safety protocol violations'
        ]
      }
    ],
    businesses: [
      {
        icon: UserIcon,
        title: 'Professional Conduct',
        dos: [
          'Maintain professional communication',
          'Provide clear, written estimates',
          'Be transparent about costs and timelines',
          'Follow up promptly on inquiries'
        ],
        donts: [
          'Make unrealistic promises',
          'Pressure customers into quick decisions',
          'Avoid providing written agreements',
          'Ignore customer concerns'
        ]
      },
      {
        icon: DocumentTextIcon,
        title: 'Documentation & Contracts',
        dos: [
          'Use detailed written contracts',
          'Clearly outline scope of work',
          'Include payment terms and schedules',
          'Document any changes in writing'
        ],
        donts: [
          'Rely only on verbal agreements',
          'Start work without signed contracts',
          'Hide additional fees or costs',
          'Make unauthorized changes to scope'
        ]
      },
      {
        icon: ShieldCheckIcon,
        title: 'Safety & Compliance',
        dos: [
          'Maintain current licenses and insurance',
          'Follow all safety protocols',
          'Use proper safety equipment',
          'Report any accidents immediately'
        ],
        donts: [
          'Work without proper licensing',
          'Skip safety procedures to save time',
          'Use damaged or inadequate equipment',
          'Hide safety incidents from customers'
        ]
      },
      {
        icon: CreditCardIcon,
        title: 'Payment Practices',
        dos: [
          'Accept secure payment methods',
          'Provide detailed invoices',
          'Be flexible with payment terms',
          'Process refunds promptly when warranted'
        ],
        donts: [
          'Demand full payment upfront',
          'Accept only cash payments',
          'Charge hidden fees',
          'Refuse reasonable refund requests'
        ]
      }
    ]
  };

  const redFlags: RedFlag[] = [
    {
      category: 'Communication',
      warning: 'Door-to-door solicitation',
      description: 'Legitimate businesses rarely cold-call or visit unannounced'
    },
    {
      category: 'Pricing',
      warning: 'Extremely low prices',
      description: 'Prices significantly below market rate often indicate poor quality or hidden costs'
    },
    {
      category: 'Pressure',
      warning: 'High-pressure sales tactics',
      description: 'Reputable businesses give you time to make informed decisions'
    },
    {
      category: 'Payment',
      warning: 'Full payment upfront',
      description: 'Most legitimate services require only a small deposit to begin work'
    },
    {
      category: 'Documentation',
      warning: 'No written estimates',
      description: 'Professional businesses provide detailed written estimates'
    },
    {
      category: 'Credentials',
      warning: 'Cannot provide license numbers',
      description: 'Licensed professionals should readily provide their license information'
    }
  ];

  const emergencyContacts: EmergencyContact[] = [
    { service: 'Emergency Services', number: '911', description: 'Life-threatening emergencies' },
    { service: 'Jodi\'s List Support', number: '(555) 123-4567', description: 'Platform-related issues' },
    { service: 'Better Business Bureau', number: '(703) 276-0100', description: 'Business complaints' },
    { service: 'Consumer Protection', number: '1-877-FTC-HELP', description: 'Consumer fraud reporting' }
  ];

  const checklistItems: string[] = [
    'Verify the business has a "Verified Veteran" badge on Jodi\'s List',
    'Check recent customer reviews and ratings',
    'Confirm business license and insurance status',
    'Request and review written estimate or quote',
    'Verify worker identification and credentials',
    'Ensure clear communication about scope of work',
    'Establish payment terms and schedule in writing',
    'Confirm emergency contact information',
    'Document the initial condition of work area (photos)',
    'Keep records of all communications and agreements'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Safety Guidelines
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Your safety is our priority. Learn how to stay secure while using Jodi's List 
              and working with veteran-owned businesses.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-green-100">
                <strong>Remember:</strong> Trust your instincts. If something feels wrong, 
                don't hesitate to report it or seek help.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'customers'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Customers
              </button>
              <button
                onClick={() => setActiveTab('businesses')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'businesses'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Businesses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {activeTab === 'customers' ? 'Customer Safety Guidelines' : 'Business Safety Guidelines'}
              </h2>
              <p className="text-lg text-gray-600">
                {activeTab === 'customers' 
                  ? 'Essential tips to stay safe when hiring services through our platform'
                  : 'Best practices for providing services safely and professionally'
                }
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-2 gap-8"
            >
              {safetyTips[activeTab].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <tip.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {tip.title}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Do's */}
                    <div>
                      <h4 className="flex items-center text-sm font-semibold text-green-700 mb-3">
                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                        DO
                      </h4>
                      <ul className="space-y-2">
                        {tip.dos.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Don'ts */}
                    <div>
                      <h4 className="flex items-center text-sm font-semibold text-red-700 mb-3">
                        <XCircleIcon className="h-4 w-4 mr-2" />
                        DON'T
                      </h4>
                      <ul className="space-y-2">
                        {tip.donts.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Red Flags Section */}
      <section className="py-16 bg-red-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Warning Signs & Red Flags
              </h2>
              <p className="text-lg text-gray-600">
                Be aware of these warning signs that may indicate fraudulent or unprofessional behavior
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redFlags.map((flag, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 * index }}
                  className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm"
                >
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full mb-2">
                      {flag.category}
                    </span>
                    <h3 className="font-semibold text-gray-900">
                      {flag.warning}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {flag.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Emergency Contacts & Resources
              </h2>
              <p className="text-lg text-gray-600">
                Keep these important numbers handy for different types of emergencies or issues
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {emergencyContacts.map((contact, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 * index }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {contact.service}
                    </h3>
                    <a
                      href={`tel:${contact.number}`}
                      className="text-primary-600 hover:text-primary-700 font-mono font-bold"
                    >
                      {contact.number}
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">
                    {contact.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    When to Contact Emergency Services
                  </h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Immediate physical danger or injury</li>
                    <li>• Property damage or theft in progress</li>
                    <li>• Threats or intimidation</li>
                    <li>• Any situation requiring immediate police, fire, or medical response</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safety Checklist */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pre-Service Safety Checklist
              </h2>
              <p className="text-lg text-gray-600">
                Use this checklist before engaging with any service provider
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="space-y-6">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                    </div>
                    <label className="ml-3 text-gray-700 cursor-pointer">
                      {item}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Print this checklist for reference
                  </span>
                  <button 
                    onClick={() => window.print()}
                    className="btn-secondary text-sm"
                  >
                    Print Checklist
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reporting Issues */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-military-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">
                Report Safety Concerns
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                If you encounter any safety issues, unprofessional behavior, or have concerns 
                about a service provider, report it immediately.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/report"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
                >
                  Report an Issue
                </a>
                <a
                  href="/contact"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
                >
                  Contact Support
                </a>
              </div>
              
              <div className="mt-6 text-sm text-primary-100">
                For urgent safety concerns, call us immediately at{' '}
                <a href="tel:+15551234567" className="font-bold text-white underline">
                  (555) 123-4567
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Additional Safety Resources
              </h2>
              <p className="text-lg text-gray-600">
                Learn more about staying safe and making informed decisions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href="/help"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all duration-200 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
                <p className="text-sm text-gray-600">FAQs and detailed guides</p>
              </a>
              
              <a
                href="/about"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all duration-200 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Verification Process</h3>
                <p className="text-sm text-gray-600">How we verify businesses</p>
              </a>
              
              <a
                href="/contact"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all duration-200 text-center"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600">Get personalized help</p>
              </a>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Safety Tips</h3>
                <p className="text-sm text-gray-600">This page - bookmark it!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}