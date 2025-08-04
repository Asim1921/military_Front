// src/components/about/about-us-section.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

export function AboutUsSection() {
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

  const features = [
    {
      icon: HeartIcon,
      title: 'Trust & Connection',
      description: 'Building meaningful relationships between customers and veteran-owned businesses through verified profiles and authentic reviews.'
    },
    {
      icon: AcademicCapIcon,
      title: 'Education & Support',
      description: 'Providing resources, training, and ongoing support to help veteran entrepreneurs succeed in the civilian marketplace.'
    },
    {
      icon: BriefcaseIcon,
      title: 'Economic Impact',
      description: 'Creating sustainable economic opportunities that benefit veteran families and strengthen local communities nationwide.'
    },
    {
      icon: HeartIcon,
      title: 'Community First',
      description: 'Fostering a community where military values of integrity, excellence, and service continue to make a difference.'
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
              About Jodi's List
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Named after Jodi Call, a passionate advocate for military families, Jodi's List was born 
              from a simple yet powerful idea: connecting those who have served our country with the 
              communities they continue to serve.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Story
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In 2023, we recognized a critical gap in the marketplace. While millions of Americans 
                  wanted to support veteran-owned businesses, there was no comprehensive, trustworthy 
                  platform to connect them with quality service providers who happened to be veterans.
                </p>
                <p>
                  Many skilled veteran entrepreneurs were struggling to gain visibility and establish 
                  trust in competitive markets, despite having the training, discipline, and work ethic 
                  that military service instills.
                </p>
                <p>
                  Jodi's List bridges this gap by creating a verified marketplace where military values 
                  meet civilian needs, ensuring every connection benefits both the customer seeking 
                  quality service and the veteran building their business.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-military-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Jodi Call
                  </h4>
                  <p className="text-gray-600">
                    Military Family Advocate
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-xl mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-16 p-8 bg-gradient-to-r from-primary-50 to-military-50 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're looking for trusted services or want to grow your veteran-owned business, 
              join our community today and be part of something meaningful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/businesses" className="btn-primary">
                Find Services
              </a>
              <a href="/register" className="btn-secondary">
                List Your Business
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}