// src/app/how-it-works/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { 
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckBadgeIcon,
  HeartIcon,
  UsersIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  DocumentCheckIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function HowItWorksPage() {
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

  const customerSteps = [
    {
      step: 1,
      icon: MagnifyingGlassIcon,
      title: 'Search for Services',
      description: 'Browse our directory of verified veteran-owned businesses or search by service type, location, or specific needs.',
      details: 'Use our advanced filters to find exactly what you need - from emergency services to specialized contractors.'
    },
    {
      step: 2,
      icon: CheckBadgeIcon,
      title: 'Compare Verified Businesses',
      description: 'View detailed profiles, read authentic reviews, and compare military-verified businesses in your area.',
      details: 'Every business is verified for military status and professional credentials.'
    },
    {
      step: 3,
      icon: ChatBubbleLeftRightIcon,
      title: 'Connect & Get Quotes',
      description: 'Contact businesses directly through our platform to discuss your project and get competitive quotes.',
      details: 'Communicate safely through our messaging system or contact businesses directly.'
    },
    {
      step: 4,
      icon: ChatBubbleLeftRightIcon,
      title: 'Hire with Confidence',
      description: 'Choose the right veteran business for your needs and get quality work from professionals who understand service.',
      details: 'All our businesses are committed to excellence and customer satisfaction.'
    }
  ];

  const businessSteps = [
    {
      step: 1,
      icon: DocumentCheckIcon,
      title: 'Create Your Profile',
      description: 'Sign up and create a comprehensive business profile showcasing your services and military background.',
      details: 'Free forever for verified military veterans and their families.'
    },
    {
      step: 2,
      icon: ShieldCheckIcon,
      title: 'Get Verified',
      description: 'Complete our verification process to confirm your military status and business credentials.',
      details: 'We verify military service and professional licenses to build customer trust.'
    },
    {
      step: 3,
      icon: UsersIcon,
      title: 'Connect with Customers',
      description: 'Receive inquiries from customers actively looking for veteran-owned businesses like yours.',
      details: 'Respond to inquiries, provide quotes, and build lasting customer relationships.'
    },
    {
      step: 4,
      icon: TrophyIcon,
      title: 'Grow Your Business',
      description: 'Build your reputation through customer reviews and expand your reach across multiple markets.',
      details: 'Use our analytics tools to track performance and optimize your business presence.'
    }
  ];

  const guarantees = [
    {
      icon: ShieldCheckIcon,
      title: 'Military Verification Guarantee',
      description: 'Every business owner\'s military status is verified through official documentation.'
    },
    {
      icon: StarIcon,
      title: 'Quality Service Promise',
      description: 'All businesses maintain high standards with verified reviews and ratings.'
    },
    {
      icon: HeartIcon,
      title: 'Community Support',
      description: 'When you hire through Jodi\'s List, you\'re directly supporting veteran entrepreneurs.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Fair Pricing',
      description: 'Transparent pricing and competitive quotes from trusted service providers.'
    }
  ];

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Advanced Search',
      description: 'Find exactly what you need with our powerful search and filtering system.'
    },
    {
      icon: MapPinIcon,
      title: 'Location-Based Results',
      description: 'Discover veteran businesses in your area with GPS-powered location services.'
    },
    {
      icon: StarIcon,
      title: 'Verified Reviews',
      description: 'Read authentic reviews from real customers to make informed decisions.'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Direct Communication',
      description: 'Connect directly with business owners through our secure messaging platform.'
    },
    {
      icon: PhoneIcon,
      title: 'Instant Contact',
      description: 'Call or email businesses directly from their profiles for immediate assistance.'
    },
    {
      icon: ClockIcon,
      title: '24/7 Emergency Services',
      description: 'Find businesses that offer emergency services when you need help most.'
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
            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6">
              How Jodi's List Works
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Connect with trusted military veteran-owned businesses and get quality service 
              from professionals who understand your values.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Whether you're a customer seeking services or a veteran business owner looking to grow, 
              we make the connection simple, secure, and meaningful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/businesses" className="btn-primary bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                Find Services Now
              </Link>
              <Link href="/register" className="btn-secondary border-white text-Black hover:bg-white/10">
                List Your Business
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <UsersIcon className="h-12 w-12 text-primary-600 mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                For Customers
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Finding trusted veteran-owned businesses has never been easier. 
              Here's how to connect with service providers who share your values.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {customerSteps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 text-white rounded-full text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2 flex items-center justify-center w-12 h-12 bg-yellow-400 text-primary-900 rounded-full">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                <p className="text-sm text-gray-500">
                  {step.details}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Business Owners Section */}
      <section className="py-20 bg-military-50">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <BuildingOfficeIcon className="h-12 w-12 text-military-600 mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                For Veteran Business Owners
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Grow your veteran-owned business by connecting with customers who value your service. 
              It's completely free for verified military veterans.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {businessSteps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-military-600 text-white rounded-full text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2 flex items-center justify-center w-12 h-12 bg-yellow-400 text-military-900 rounded-full">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                <p className="text-sm text-gray-500">
                  {step.details}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl mx-auto">
              <HeartIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Always Free for Veterans
              </h3>
              <p className="text-gray-600 mb-6">
                There is never a cost with Jodi's List for Veterans. We want Veterans to be successful 
                and achieve their goals, whether finding services or growing their business.
              </p>
              <Link href="/register" className="btn-primary">
                Start Your Free Profile
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Guarantees */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Commitments to You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to creating a trusted platform where quality service meets 
              military values of integrity, excellence, and commitment.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mx-auto mb-4">
                  <guarantee.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {guarantee.title}
                </h3>
                <p className="text-gray-600">
                  {guarantee.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to find trusted services or grow your veteran business, 
              all in one easy-to-use platform.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
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

      {/* Success Stories Preview */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Stories, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Jodi's List is helping veterans build successful businesses and 
              customers find trusted service providers.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Customer Success Story */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg border border-gray-200 p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <UsersIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Customer Success</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "Finding a trustworthy contractor was always stressful until I discovered Jodi's List. 
                Knowing I'm working with fellow military families gives me complete confidence. 
                The quality of work has been exceptional every time."
              </blockquote>
              <p className="text-sm text-gray-600">
                — Sarah M., Military Spouse, Austin, TX
              </p>
            </motion.div>

            {/* Business Success Story */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-lg border border-gray-200 p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <BuildingOfficeIcon className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Business Growth</h3>
                  <div className="flex items-center mt-1">
                    <TrophyIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">Featured Business</span>
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "Jodi's List has been a game-changer for my HVAC business. In just six months, 
                I've connected with over 50 new customers who specifically sought out veteran-owned services. 
                The platform's support has been incredible."
              </blockquote>
              <p className="text-sm text-gray-600">
                — Mike R., Army Veteran, HVAC Contractor, Dallas, TX
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
                question: "Is Jodi's List really free for veterans?",
                answer: "Yes, absolutely! All features and services are completely free for verified military veterans, active duty, and their spouses. We believe in supporting those who served our country."
              },
              {
                question: "How do you verify military status?",
                answer: "We verify military status through official documentation such as DD-214 forms, military ID cards, or VA documentation. The process is secure and confidential."
              },
              {
                question: "How do I know if a business is trustworthy?",
                answer: "All businesses on our platform are verified for military status and professional credentials. You can also read authentic customer reviews and see ratings from previous clients."
              },
              {
                question: "Can I get quotes from multiple businesses?",
                answer: "Yes! You can contact multiple businesses through our platform to compare quotes, services, and find the best fit for your project needs."
              },
              {
                question: "What if I have an emergency service need?",
                answer: "Many of our businesses offer 24/7 emergency services. Use our emergency service filter to find businesses that can help immediately."
              },
              {
                question: "How do businesses get listed?",
                answer: "Veteran-owned businesses can create a free profile by registering on our platform and completing our military verification process. All listings are reviewed before approval."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
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

      {/* Statistics Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join a Growing Community
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Thousands of customers and veteran businesses trust Jodi's List 
              to make meaningful connections.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: '10,000+', label: 'Veteran Businesses', icon: BuildingOfficeIcon },
              { value: '500,000+', label: 'Happy Customers', icon: UsersIcon },
              { value: '50', label: 'States Covered', icon: GlobeAltIcon },
              { value: '4.8★', label: 'Average Rating', icon: StarIcon }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 jodis-gradient">
        <div className="container-custom text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join the community that's supporting veteran entrepreneurs and 
              connecting customers with trusted service providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/businesses"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Find Veteran Services
              </Link>
              <Link 
                href="/register"
               className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                List Your Business
              </Link>
            </div>
            <p className="text-sm text-gray-300 mt-6">
              🇺🇸 Supporting American veterans, one connection at a time
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}