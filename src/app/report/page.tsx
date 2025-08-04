// src/app/report/page.tsx
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import { 
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  UserIcon,
  BuildingOfficeIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  PhotoIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    reportType: '',
    severity: 'medium',
    subject: '',
    description: '',
    businessName: '',
    businessId: '',
    incidentDate: '',
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    anonymous: false,
    evidenceFiles: null as FileList | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const reportTypes = [
    {
      id: 'business_conduct',
      icon: BuildingOfficeIcon,
      title: 'Business Conduct',
      description: 'Unprofessional behavior, fraud, or unethical practices',
      examples: ['Poor service quality', 'Fraudulent charges', 'Unprofessional behavior', 'Contract violations']
    },
    {
      id: 'safety_concern',
      icon: ShieldExclamationIcon,
      title: 'Safety Concern',
      description: 'Safety issues or dangerous practices',
      examples: ['Unsafe work practices', 'Unlicensed work', 'Property damage', 'Safety violations']
    },
    {
      id: 'platform_abuse',
      icon: UserIcon,
      title: 'Platform Abuse',
      description: 'Misuse of the Jodi\'s List platform',
      examples: ['Fake reviews', 'Spam messages', 'Identity fraud', 'Terms of service violations']
    },
    {
      id: 'technical_issue',
      icon: ComputerDesktopIcon,
      title: 'Technical Issue',
      description: 'Website bugs or technical problems',
      examples: ['Page not loading', 'Broken features', 'Payment issues', 'Account problems']
    }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', description: 'Minor issue, no immediate risk', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', description: 'Moderate issue requiring attention', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', description: 'Serious issue needing prompt action', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', description: 'Urgent safety or security concern', color: 'bg-red-100 text-red-800' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reportType) {
      toast.error('Please select a report type');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Report submitted successfully. We\'ll investigate and respond within 24-48 hours.');
      
      // Reset form
      setFormData({
        reportType: '',
        severity: 'medium',
        subject: '',
        description: '',
        businessName: '',
        businessId: '',
        incidentDate: '',
        reporterName: '',
        reporterEmail: '',
        reporterPhone: '',
        anonymous: false,
        evidenceFiles: null
      });
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean | FileList | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-orange-700 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
                <ExclamationTriangleIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Report an Issue
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Help us maintain a safe and trustworthy platform for our veteran community. 
              Your reports help protect everyone.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-red-100">
                <strong>Emergency:</strong> If you're experiencing an immediate safety emergency, 
                please call 911. For urgent security concerns, call us at (555) 123-4567.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Report Types */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What Type of Issue Are You Reporting?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {reportTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleInputChange('reportType', type.id)}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.reportType === type.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                      formData.reportType === type.id ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <type.icon className={`h-6 w-6 ${
                        formData.reportType === type.id ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {type.description}
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Examples:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {type.examples.slice(0, 2).map((example, exampleIndex) => (
                            <li key={exampleIndex} className="flex items-center">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                              {example}
                            </li>
                          ))}
                          {type.examples.length > 2 && (
                            <li className="text-gray-500">
                              +{type.examples.length - 2} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Report Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Report Details
                </h2>
                <p className="text-lg text-gray-600">
                  Please provide as much detail as possible to help us investigate effectively
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Severity Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Severity Level *
                  </label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {severityLevels.map((level) => (
                      <label
                        key={level.value}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.severity === level.value
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="severity"
                          value={level.value}
                          checked={formData.severity === level.value}
                          onChange={(e) => handleInputChange('severity', e.target.value)}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${level.color}`}>
                            {level.label}
                          </span>
                          <p className="text-xs text-gray-600">{level.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subject */}
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
                    placeholder="Brief summary of the issue"
                  />
                </div>

                {/* Business Information */}
                {(formData.reportType === 'business_conduct' || formData.reportType === 'safety_concern') && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className="form-input"
                        placeholder="Name of the business involved"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Incident Date
                      </label>
                      <input
                        id="incidentDate"
                        type="date"
                        value={formData.incidentDate}
                        onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="form-textarea"
                    placeholder="Please provide a detailed description of the issue, including what happened, when it occurred, and any relevant circumstances..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Include specific details, dates, times, and any relevant context that would help us investigate.
                  </p>
                </div>

                {/* Evidence Upload */}
                <div>
                  <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Evidence
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <label htmlFor="evidence" className="cursor-pointer">
                      <span className="text-primary-600 hover:text-primary-500 font-medium">
                        Upload files
                      </span>
                      <span className="text-gray-600"> or drag and drop</span>
                    </label>
                    <input
                      id="evidence"
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={(e) => handleInputChange('evidenceFiles', e.target.files)}
                      className="sr-only"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Screenshots, documents, photos (Max 10MB per file)
                    </p>
                  </div>
                </div>

                {/* Reporter Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Contact Information
                  </h3>
                  
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.anonymous}
                        onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                        className="form-checkbox"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Submit this report anonymously
                      </span>
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      Anonymous reports may limit our ability to follow up or investigate thoroughly.
                    </p>
                  </div>

                  {!formData.anonymous && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          id="reporterName"
                          type="text"
                          required={!formData.anonymous}
                          value={formData.reporterName}
                          onChange={(e) => handleInputChange('reporterName', e.target.value)}
                          className="form-input"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="reporterEmail" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Email *
                        </label>
                        <input
                          id="reporterEmail"
                          type="email"
                          required={!formData.anonymous}
                          value={formData.reporterEmail}
                          onChange={(e) => handleInputChange('reporterEmail', e.target.value)}
                          className="form-input"
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="reporterPhone" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Phone (Optional)
                        </label>
                        <input
                          id="reporterPhone"
                          type="tel"
                          value={formData.reporterPhone}
                          onChange={(e) => handleInputChange('reporterPhone', e.target.value)}
                          className="form-input"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 mb-1">
                        Important Notice
                      </h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• False reports may result in account suspension</p>
                        <p>• We investigate all reports thoroughly and confidentially</p>
                        <p>• Response time: 24-48 hours for most issues</p>
                        <p>• Critical safety issues are prioritized immediately</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.reportType}
                  className="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting Report...
                    </div>
                  ) : (
                    'Submit Report'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What Happens After You Report?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Report Review</h3>
                <p className="text-sm text-gray-600">
                  We review your report within 2 hours and categorize it based on severity and type.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Investigation</h3>
                <p className="text-sm text-gray-600">
                  Our team investigates thoroughly, contacting relevant parties and gathering evidence.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShieldExclamationIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Resolution</h3>
                <p className="text-sm text-gray-600">
                  We take appropriate action and follow up with you about the outcome within 48 hours.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Need Immediate Help?</h4>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+15551234567" className="btn-primary bg-red-600 hover:bg-red-700">
                  Call Emergency Line: (555) 123-4567
                </a>
                <a href="/contact" className="btn-secondary">
                  Contact Support Team
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