// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      info: '(555) 123-4567',
      availability: 'Mon-Fri, 8AM-6PM EST',
      action: 'Call Now',
      href: 'tel:+15551234567'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Send us a detailed message',
      info: 'support@jodislist.com',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      href: 'mailto:support@jodislist.com'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'Get instant help from our team',
      info: 'Available 24/7',
      availability: 'Average response: 2 minutes',
      action: 'Start Chat',
      href: '#'
    }
  ];

  const officeLocations = [
    {
      city: 'Arlington, VA',
      address: '1234 Military Way, Suite 100\nArlington, VA 22202',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 8AM-6PM EST'
    },
    {
      city: 'San Diego, CA',
      address: '5678 Veterans Blvd, Floor 2\nSan Diego, CA 92101',
      phone: '(555) 234-5678',
      hours: 'Mon-Fri: 6AM-4PM PST'
    },
    {
      city: 'Austin, TX',
      address: '9012 Service Drive, Building A\nAustin, TX 78701',
      phone: '(555) 345-6789',
      hours: 'Mon-Fri: 7AM-5PM CST'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'business', label: 'Business Listing' },
    { value: 'customer', label: 'Customer Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'media', label: 'Media Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        urgency: 'normal'
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
                <HeartIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              We're here to help veterans, customers, and partners succeed. 
              Reach out and let's build something great together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Choose How to Reach Us
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 * index }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <method.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {method.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="font-medium text-gray-900 mb-1">
                      {method.info}
                    </p>
                    <p className="text-sm text-gray-500">
                      {method.availability}
                    </p>
                  </div>
                  
                  <a
                    href={method.href}
                    className="btn-primary w-full"
                  >
                    {method.action}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="form-input"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      required
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="form-input"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    id="urgency"
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="form-select"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="normal">Normal - Standard support</option>
                    <option value="high">High - Business critical</option>
                    <option value="urgent">Urgent - Immediate attention needed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="form-textarea"
                    placeholder="Please provide as much detail as possible about your inquiry..."
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    * Required fields. We typically respond within 24 hours during business days. 
                    For urgent matters, please call us directly at (555) 123-4567.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Office Locations
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {officeLocations.map((location, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 * index }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="text-center mb-4">
                    <MapPinIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {location.city}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <MapPinIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        {location.address.split('\n').map((line, lineIndex) => (
                          <div key={lineIndex} className="text-gray-600">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="text-primary-600 hover:text-primary-700">
                        {location.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{location.hours}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Support */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Additional Resources
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Need immediate help? Check out these resources while you wait for our response.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href="/help"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
                <p className="text-sm text-gray-600">Browse FAQs and guides</p>
              </a>
              
              <a
                href="/safety"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Safety Guide</h3>
                <p className="text-sm text-gray-600">Platform safety tips</p>
              </a>
              
              <a
                href="/about"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">About Us</h3>
                <p className="text-sm text-gray-600">Learn our mission</p>
              </a>
              
              <a
                href="/report"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Report Issue</h3>
                <p className="text-sm text-gray-600">Report problems</p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}