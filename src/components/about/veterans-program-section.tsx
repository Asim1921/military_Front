// src/components/about/veterans-program-section.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  PhoneIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export function VeteransProgramSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const programBenefits = [
    {
      icon: ShieldCheckIcon,
      title: 'Verification & Trust',
      description: 'Military service verification and trusted business badges to build customer confidence',
      features: ['DD-214 verification', 'Business license validation', 'Insurance confirmation', 'Background checks']
    },
    {
      icon: AcademicCapIcon,
      title: 'Business Training',
      description: 'Comprehensive training programs designed specifically for veteran entrepreneurs',
      features: ['Digital marketing basics', 'Customer service excellence', 'Financial management', 'Legal compliance']
    },
    {
      icon: ChartBarIcon,
      title: 'Growth Support',
      description: 'Tools and resources to help scale your business and increase profitability',
      features: ['Performance analytics', 'Lead generation tools', 'Pricing optimization', 'Market insights']
    },
    {
      icon: UserGroupIcon,
      title: 'Community Network',
      description: 'Connect with fellow veteran business owners for mentorship and collaboration',
      features: ['Peer mentorship program', 'Industry networking events', 'Regional meetups', 'Online forums']
    }
  ];

  const membershipTiers = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Basic business listing',
        'Customer reviews',
        'Contact information display',
        'Mobile-friendly profile'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Professional',
      price: '$29/month',
      description: 'Enhanced visibility and tools',
      features: [
        'Everything in Basic',
        'Featured listing placement',
        'Advanced analytics',
        'Priority customer support',
        'Social media integration',
        'Lead management tools'
      ],
      cta: 'Start 30-Day Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99/month',
      description: 'Full marketing suite',
      features: [
        'Everything in Professional',
        'Premium featured placement',
        'Custom marketing campaigns',
        'Dedicated account manager',
        'API access',
        'White-label solutions'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const successStories = [
    {
      name: 'Maria Rodriguez',
      business: 'Rodriguez Legal Services',
      branch: 'Navy Veteran',
      quote: 'Jodi\'s List helped me transition from military legal work to building a thriving civilian practice.',
      growth: '300% revenue increase in first year'
    },
    {
      name: 'James Mitchell',
      business: 'Mitchell HVAC Solutions',
      branch: 'Air Force Veteran',
      quote: 'The verification badge and marketing tools gave me credibility I couldn\'t get elsewhere.',
      growth: '150+ new customers in 6 months'
    },
    {
      name: 'Sarah Chen',
      business: 'Chen Security Consulting',
      branch: 'Army Veteran',
      quote: 'The peer network connected me with mentors who understood both military and business worlds.',
      growth: 'Expanded to 3 states'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-military-600 rounded-full mb-6">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
              Veterans Business Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive support designed specifically for military veterans ready to build 
              successful businesses in the civilian marketplace.
            </p>
          </motion.div>

          {/* Program Benefits */}
          <motion.div variants={fadeInUp} className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
              What's Included in Our Program
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {programBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {benefit.description}
                      </p>
                      <ul className="space-y-2">
                        {benefit.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Membership Tiers */}
          <motion.div variants={fadeInUp} className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Choose Your Membership Level
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                All plans include our core veteran verification and support services. 
                Scale up as your business grows.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {membershipTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                    tier.popular
                      ? 'border-primary-500 bg-primary-50 scale-105'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {tier.name}
                    </h4>
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      {tier.price}
                    </div>
                    <p className="text-gray-600">
                      {tier.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      tier.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Stories */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Veteran Success Stories
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real veterans, real businesses, real success. See how our program 
                has helped fellow service members thrive.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-6 rounded-xl"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-military-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-military-600 font-bold text-lg">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.business}</p>
                    <p className="text-xs text-military-600 font-medium">{story.branch}</p>
                  </div>
                  
                  <blockquote className="text-gray-600 text-sm italic mb-4 text-center">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="bg-green-100 p-3 rounded-lg text-center">
                    <p className="text-green-800 text-sm font-medium">
                      {story.growth}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Get Started CTA */}
          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-r from-military-600 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of veteran entrepreneurs who are building successful businesses 
              with the support of the Jodi's List community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/register"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Start Free Today
              </Link>
              <button className="btn-secondary border-white text-white hover:bg-white/10 flex items-center justify-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Call (555) 123-4567
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-primary-100">
              <div className="flex items-center">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Free consultation
              </div>
              <div className="flex items-center">
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                No setup fees
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                24/7 support
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}