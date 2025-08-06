// src/app/privacy/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { 
  ShieldCheckIcon,
  EyeIcon,
  DocumentTextIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function PrivacyPolicyPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: DocumentTextIcon,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect personal information that you voluntarily provide to us when you register on our platform, create a business listing, contact businesses, or communicate with us. This may include your name, email address, phone number, military service information, and business details.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect certain information about your device and use of our services, including IP address, browser type, operating system, referring URLs, and pages visited.'
        },
        {
          subtitle: 'Location Information',
          text: 'With your permission, we may collect location information to help you find nearby veteran-owned businesses and to improve our location-based services.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: EyeIcon,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our services, including connecting customers with veteran-owned businesses and facilitating communications between users.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your contact information to send you service-related notifications, updates, and promotional materials (with your consent).'
        },
        {
          subtitle: 'Safety and Security',
          text: 'We use information to verify user identities, prevent fraud, and maintain the safety and security of our platform.'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: ShieldCheckIcon,
      content: [
        {
          subtitle: 'Business Listings',
          text: 'Information included in business listings is publicly visible to help customers find and contact veteran-owned businesses.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share information with trusted third-party service providers who assist us in operating our platform, conducting business, or serving our users.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information when required by law or to protect our rights, property, or safety, or that of our users or others.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: ShieldCheckIcon,
      content: [
        {
          subtitle: 'Protection Measures',
          text: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.'
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
              <ShieldCheckIcon className="h-12 w-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-heading">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-gray-200 mb-6">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your information when you use Jodi's List.
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">
                Our Commitment to Your Privacy
              </h2>
              <p className="text-blue-800 mb-0">
                At Jodi's List, we are committed to protecting the privacy and security of our users, 
                especially our military veterans and their families. This Privacy Policy describes how we 
                collect, use, share, and protect information about you when you use our platform to 
                connect with veteran-owned businesses.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Sections */}
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

      {/* Your Rights Section */}
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
              Your Rights and Choices
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Access and Update
                </h3>
                <p className="text-gray-700 mb-4">
                  You can access and update your personal information through your account settings 
                  or by contacting us directly.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Data Portability
                </h3>
                <p className="text-gray-700 mb-4">
                  You have the right to request a copy of your personal information in a 
                  commonly used, machine-readable format.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Account Deletion
                </h3>
                <p className="text-gray-700 mb-4">
                  You can request deletion of your account and associated personal information, 
                  subject to certain legal and business requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Marketing Communications
                </h3>
                <p className="text-gray-700 mb-4">
                  You can opt out of marketing communications at any time by using the 
                  unsubscribe link in our emails or updating your preferences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-military-50">
        <div className="container-custom max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <EnvelopeIcon className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Questions About Privacy?
              </h2>
            </div>
            
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or how we handle your 
              personal information, please don't hesitate to contact us.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@jodislist.com"
                className="btn-primary"
              >
                Email Privacy Team
              </a>
              <a
                href="/contact"
                className="btn-secondary"
              >
                Contact Support
              </a>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 inline-block">
              <p className="text-sm text-gray-600">
                <strong>Mailing Address:</strong><br />
                Jodi's List Privacy Team<br />
                [Your Address]<br />
                [City, State ZIP]
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}