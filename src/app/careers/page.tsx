// src/app/careers/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { 
  BriefcaseIcon,
  UsersIcon,
  HeartIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  GlobeAmericasIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

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

  const departments = [
    { id: 'all', name: 'All Positions', count: 12 },
    { id: 'engineering', name: 'Engineering', count: 4 },
    { id: 'marketing', name: 'Marketing', count: 3 },
    { id: 'sales', name: 'Sales', count: 2 },
    { id: 'support', name: 'Customer Support', count: 2 },
    { id: 'operations', name: 'Operations', count: 1 }
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'engineering',
      location: 'Remote / Austin, TX',
      type: 'Full-time',
      experience: 'Senior Level',
      postedDate: '2024-01-15',
      description: 'Build and maintain our platform that connects veteran businesses with customers. Work with modern technologies including React, Node.js, and PostgreSQL.',
      requirements: [
        '5+ years of full-stack development experience',
        'Strong proficiency in React, Node.js, and SQL databases',
        'Experience with cloud platforms (AWS/Google Cloud)',
        'Military background preferred but not required'
      ],
      benefits: [
        'Competitive salary + equity',
        'Comprehensive health insurance',
        'Unlimited PTO',
        'Remote-first culture'
      ]
    },
    {
      id: 2,
      title: 'Marketing Manager - Veteran Outreach',
      department: 'marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      postedDate: '2024-01-12',
      description: 'Lead marketing efforts to connect with veteran-owned businesses and military communities. Develop campaigns that honor service while driving business growth.',
      requirements: [
        '3+ years of marketing experience',
        'Strong understanding of military/veteran community',
        'Experience with digital marketing and social media',
        'Veteran or military spouse preferred'
      ],
      benefits: [
        'Competitive salary',
        'Marketing budget for professional development',
        'Work with meaningful mission',
        'Flexible schedule'
      ]
    },
    {
      id: 3,
      title: 'Customer Success Representative',
      department: 'support',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Entry Level',
      postedDate: '2024-01-10',
      description: 'Help veteran business owners succeed on our platform. Provide exceptional support and guidance to ensure their success.',
      requirements: [
        'Excellent communication skills',
        'Passion for helping others succeed',
        'Customer service experience preferred',
        'Military background a plus'
      ],
      benefits: [
        'Competitive starting salary',
        'Growth opportunities',
        'Training and mentorship',
        'Make a real impact'
      ]
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      postedDate: '2024-01-08',
      description: 'Maintain and scale our infrastructure to support growing veteran business community. Focus on reliability, security, and performance.',
      requirements: [
        '3+ years of DevOps/Infrastructure experience',
        'Experience with Docker, Kubernetes, and CI/CD',
        'Cloud platform expertise (AWS/GCP)',
        'Security-first mindset'
      ],
      benefits: [
        'Competitive salary + equity',
        'Latest tools and technology',
        'Professional development budget',
        'Impact millions of users'
      ]
    },
    {
      id: 5,
      title: 'Business Development Representative',
      department: 'sales',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      experience: 'Entry-Mid Level',
      postedDate: '2024-01-05',
      description: 'Connect with veteran-owned businesses to help them grow through our platform. Build relationships and drive revenue growth.',
      requirements: [
        '1-3 years of sales experience',
        'Strong relationship building skills',
        'Understanding of small business challenges',
        'Military background preferred'
      ],
      benefits: [
        'Base salary + commission',
        'Uncapped earning potential',
        'Sales training and mentorship',
        'Support veteran entrepreneurs'
      ]
    },
    {
      id: 6,
      title: 'Content Marketing Specialist',
      department: 'marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      postedDate: '2024-01-03',
      description: 'Create compelling content that tells the stories of veteran entrepreneurs and helps customers discover amazing businesses.',
      requirements: [
        '2+ years of content marketing experience',
        'Excellent writing and storytelling skills',
        'Experience with SEO and content strategy',
        'Passion for veteran stories'
      ],
      benefits: [
        'Competitive salary',
        'Creative freedom',
        'Professional development',
        'Share inspiring stories'
      ]
    },
    {
      id: 7,
      title: 'Product Manager',
      department: 'engineering',
      location: 'Remote / Austin, TX',
      type: 'Full-time',
      experience: 'Senior Level',
      postedDate: '2024-01-01',
      description: 'Drive product strategy and roadmap for features that help veteran businesses succeed. Work closely with engineering, design, and business teams.',
      requirements: [
        '4+ years of product management experience',
        'Experience with B2B platforms or marketplaces',
        'Strong analytical and communication skills',
        'Understanding of small business needs'
      ],
      benefits: [
        'Competitive salary + equity',
        'Product strategy ownership',
        'Cross-functional collaboration',
        'Direct impact on veteran success'
      ]
    },
    {
      id: 8,
      title: 'UI/UX Designer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      postedDate: '2023-12-28',
      description: 'Design intuitive user experiences that make it easy for customers to find veteran businesses and for businesses to manage their presence.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma, Sketch, or similar tools',
        'Experience with responsive web design',
        'Portfolio demonstrating user-centered design'
      ],
      benefits: [
        'Competitive salary',
        'Design tool subscriptions',
        'Creative autonomy',
        'User research opportunities'
      ]
    },
    {
      id: 9,
      title: 'Sales Development Representative',
      department: 'sales',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Entry Level',
      postedDate: '2023-12-25',
      description: 'Generate leads and qualify prospects for our business development team. Focus on outreach to veteran-owned businesses.',
      requirements: [
        'Excellent communication skills',
        'Enthusiasm for sales and business development',
        'Organized and detail-oriented',
        'Interest in supporting veteran community'
      ],
      benefits: [
        'Base salary + commission',
        'Sales training program',
        'Career growth path',
        'Supportive team environment'
      ]
    },
    {
      id: 10,
      title: 'Data Analyst',
      department: 'operations',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      postedDate: '2023-12-22',
      description: 'Analyze platform data to identify trends, measure success, and provide insights that help veteran businesses thrive.',
      requirements: [
        '2+ years of data analysis experience',
        'Proficiency in SQL, Python, or R',
        'Experience with data visualization tools',
        'Business intelligence mindset'
      ],
      benefits: [
        'Competitive salary',
        'Latest analytics tools',
        'Professional development',
        'Data-driven decision making'
      ]
    },
    {
      id: 11,
      title: 'Community Manager',
      department: 'marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      postedDate: '2023-12-20',
      description: 'Build and nurture our community of veteran business owners and customers. Manage social media, events, and community initiatives.',
      requirements: [
        '2+ years of community management experience',
        'Strong social media skills',
        'Excellent written communication',
        'Passion for veteran community'
      ],
      benefits: [
        'Competitive salary',
        'Event planning budget',
        'Community impact',
        'Flexible schedule'
      ]
    },
    {
      id: 12,
      title: 'Technical Support Specialist',
      department: 'support',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Entry-Mid Level',
      postedDate: '2023-12-18',
      description: 'Provide technical support to business owners using our platform. Help solve technical issues and improve user experience.',
      requirements: [
        'Strong problem-solving skills',
        'Basic technical knowledge',
        'Excellent customer service skills',
        'Patience and empathy'
      ],
      benefits: [
        'Competitive starting salary',
        'Technical training provided',
        'Growth opportunities',
        'Help veteran businesses succeed'
      ]
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobListings 
    : jobListings.filter(job => job.department === selectedDepartment);

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: 'Competitive Compensation',
      description: 'Fair salaries, equity options, and performance bonuses'
    },
    {
      icon: HeartIcon,
      title: 'Comprehensive Benefits',
      description: 'Health, dental, vision insurance plus mental health support'
    },
    {
      icon: ClockIcon,
      title: 'Work-Life Balance',
      description: 'Flexible schedules, unlimited PTO, and remote-first culture'
    },
    {
      icon: AcademicCapIcon,
      title: 'Professional Growth',
      description: 'Learning budgets, conferences, and mentorship programs'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Veteran-Friendly',
      description: 'We understand military culture and support veteran employees'
    },
    {
      icon: StarIcon,
      title: 'Meaningful Mission',
      description: 'Work that directly supports veteran entrepreneurs and their families'
    }
  ];

  const values = [
    {
      title: 'Service Above Self',
      description: 'We put our community and customers first, always.'
    },
    {
      title: 'Honor & Integrity',
      description: 'We do the right thing, even when no one is watching.'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do.'
    },
    {
      title: 'Teamwork',
      description: 'We succeed together, supporting each other like family.'
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
              <BriefcaseIcon className="h-12 w-12 text-yellow-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold font-heading">
                Join Our Mission
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Help us build the platform that empowers veteran entrepreneurs and connects 
              communities with businesses that share their values.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-positions"
                className="btn-primary bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              >
                View Open Positions
              </a>
              <a
                href="#company-culture"
                  className="btn-primary bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              >
                Learn About Our Culture
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: '50+', label: 'Team Members', icon: UsersIcon },
              { value: '10,000+', label: 'Veteran Businesses', icon: BuildingOfficeIcon },
              { value: '500,000+', label: 'Monthly Users', icon: GlobeAmericasIcon },
              { value: '95%', label: 'Employee Satisfaction', icon: HeartIcon }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mx-auto mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="company-culture" className="py-16">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work at Jodi's List?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer more than just a job - we offer the opportunity to make a meaningful 
              impact while building your career in a supportive, veteran-friendly environment.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-military-50">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg p-6 text-center shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our growing team and help build the future of veteran entrepreneurship.
            </p>
          </motion.div>

          {/* Department Filter */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedDepartment === dept.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dept.name} ({dept.count})
              </button>
            ))}
          </motion.div>

          {/* Job Listings */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {job.department.charAt(0).toUpperCase() + job.department.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <BriefcaseIcon className="h-4 w-4 mr-1" />
                        {job.experience}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {job.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.slice(0, 3).map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start">
                              <span className="text-primary-600 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                          {job.requirements.length > 3 && (
                            <li className="text-gray-500 italic">
                              +{job.requirements.length - 3} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              {benefit}
                            </li>
                          ))}
                          {job.benefits.length > 3 && (
                            <li className="text-gray-500 italic">
                              +{job.benefits.length - 3} more benefits
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-6">
                    <button className="w-full lg:w-auto btn-primary">
                      Apply Now
                      <ChevronRightIcon className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredJobs.length === 0 && (
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <p className="text-gray-500">
                No positions available in this department at the moment.
              </p>
              <p className="text-gray-500 mt-2">
                Check back soon or{' '}
                <a href="mailto:careers@jodislist.com" className="text-primary-600 hover:text-primary-700">
                  send us your resume
                </a>{' '}
                for future opportunities.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Hiring Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've designed our process to be transparent, fair, and respectful of your time.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              {
                step: '1',
                title: 'Application',
                description: 'Submit your application and resume through our online portal.'
              },
              {
                step: '2',
                title: 'Initial Review',
                description: 'Our team reviews your application and reaches out within 1 week.'
              },
              {
                step: '3',
                title: 'Interviews',
                description: 'Video interviews with hiring manager and team members.'
              },
              {
                step: '4',
                title: 'Offer',
                description: 'We make competitive offers and welcome you to the team!'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full text-lg font-bold mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600">
                  {process.description}
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
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              We're always looking for talented, mission-driven people to join our team. 
              Send us your resume and let's start a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:careers@jodislist.com"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Send Your Resume
              </a>
              <a 
                href="/contact"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Contact HR Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}