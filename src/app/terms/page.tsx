// src/app/terms/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { 
  DocumentTextIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function TermsOfServicePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: DocumentTextIcon,
      content: [
        {
          subtitle: 'Agreement to Terms',
          text: 'By accessing and using Jodi\'s List, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          subtitle: 'Eligibility',
          text: 'You must be at least 18 years old to use our services. By using our platform, you represent and warrant that you have the legal capacity to enter into these terms.'
        }
      ]
    },
    {
      id: 'platform-description',
      title: 'Platform Description',
      icon: BuildingOfficeIcon,
      content: [
        {
          subtitle: 'Service Overview',
          text: 'Jodi\'s List is a platform that connects customers with military veteran-owned businesses. We provide a directory service that helps users find and contact qualified service providers.'
        },
        {
          subtitle: 'Verification Process',
          text: 'While we strive to verify the military status and credentials of business owners, users are responsible for conducting their own due diligence before engaging services.'
        }
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: UserGroupIcon,
      content: [
        {
          subtitle: 'Account Security',
          text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.'
        },
        {
          subtitle: 'Accurate Information',
          text: 'You agree to provide accurate, current, and complete information when creating your account and to update such information as necessary to maintain its accuracy.'
        },
        {
          subtitle: 'Prohibited Activities',
          text: 'You may not use our platform for any unlawful purpose, to harm our systems, to impersonate others, or to engage in any activity that interferes with or disrupts our services.'
        }
      ]
    },
    {
      id: 'business-listings',
      title: 'Business Listings',
      icon: BuildingOfficeIcon,
      content: [
        {
          subtitle: 'Listing Requirements',
          text: 'Business owners must provide accurate information about their services, credentials, and military background. False or misleading information may result in removal from the platform.'
        },
        {
          subtitle: 'Content Standards',
          text: 'All business content must be professional, truthful, and comply with applicable laws. We reserve the right to remove content that violates our standards.'
        },
        {
          subtitle: 'Reviews and Ratings',
          text: 'Users may leave honest reviews based on their experiences. Fake reviews or attempts to manipulate ratings are prohibited and may result in account suspension.'
        }
      ]
    },
    {
      id: 'limitations',
      title: 'Limitations and Disclaimers',
      icon: ExclamationTriangleIcon,
      content: [
        {
          subtitle: 'Platform Role',
          text: 'Jodi\'s List acts as an intermediary platform. We do not provide the actual services listed and are not responsible for the quality, safety, or legality of services provided by listed businesses.'
        },
        {
          subtitle: 'No Warranties',
          text: 'Our platform is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any content or information on our platform.'
        },
        {
          subtitle: 'Limitation of Liability',
          text: 'To the fullest extent permitted by law, Jodi\'s List shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our platform.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: ShieldCheckIcon,
      content: [
        {
          subtitle: 'Platform Content',
          text: 'The Jodi\'s List platform, including its design, functionality, and content, is protected by copyright, trademark, and other intellectual property laws.'
        },
        {
          subtitle: 'User Content',
          text: 'By posting content on our platform, you grant us a non-exclusive, royalty-free license to use, display, and distribute such content in connection with our services.'
        },
        {
          subtitle: 'Respect for IP Rights',
          text: 'You agree not to infringe upon the intellectual property rights of others and to respect all applicable copyright and trademark laws.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-military-800 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <ScaleIcon className="h-12 w-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-heading">
                Terms of Service
              </h1>
            </div>
            <p className="text-xl text-gray-200 mb-6">
              These terms govern your use of Jodi's List and outline the rights and 
              responsibilities of all users of our platform.
            </p>
            <div className="text-sm text-gray-300">
              <p>Last updated: January 1, 2025</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-3">
                Important Notice
              </h2>
              <p className="text-amber-800 mb-0">
                Please read these Terms of Service carefully before using Jodi's List. 
                By accessing or using our platform, you agree to be bound by these terms. 
                If you disagree with any part of these terms, you may not access our services.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mr-4">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment and Fees */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Payment and Fees
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Free Services
                </h3>
                <p className="text-gray-700 mb-4">
                  Basic access to our platform and business directory is free for all users. 
                  Customers can search and contact businesses at no charge.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Premium Features
                </h3>
                <p className="text-gray-700 mb-4">
                  Business owners may access premium features such as enhanced listings, 
                  analytics, and promotional tools for applicable fees.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Payment Processing
                </h3>
                <p className="text-gray-700 mb-4">
                  All payments are processed through secure third-party payment processors. 
                  We do not store payment card information on our servers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Refund Policy
                </h3>
                <p className="text-gray-700 mb-4">
                  Refunds for premium services may be available under certain circumstances. 
                  Please contact our support team for assistance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Termination and Modifications */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Account Termination
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• You may terminate your account at any time</li>
                <li>• We may suspend or terminate accounts for violations</li>
                <li>• Termination does not affect existing obligations</li>
                <li>• Some provisions survive account termination</li>
              </ul>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Terms Modifications
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• We may update these terms periodically</li>
                <li>• Users will be notified of significant changes</li>
                <li>• Continued use constitutes acceptance</li>
                <li>• Check for updates regularly</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact and Legal */}
      <section className="py-12 bg-military-50">
        <div className="container-custom max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Questions About These Terms?
            </h2>
            
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              If you have any questions about these Terms of Service or need 
              clarification on any provisions, please contact our legal team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="mailto:legal@jodislist.com"
                className="btn-primary"
              >
                Contact Legal Team
              </a>
              <a
                href="/contact"
                className="btn-secondary"
              >
                General Support
              </a>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Governing Law and Dispute Resolution
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                These terms are governed by the laws of [Your State/Country]. Any disputes 
                arising from these terms or your use of our platform will be resolved through 
                binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
              <p className="text-gray-600 text-xs">
                This provision does not apply to claims that may be brought in small claims court 
                or claims related to intellectual property rights.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}