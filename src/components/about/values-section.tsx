// src/components/about/values-section.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  HeartIcon,
  LightBulbIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export function ValuesSection() {
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

  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Integrity',
      description: 'We operate with unwavering honesty and transparency in all our interactions, maintaining the highest ethical standards.',
      militaryConnection: 'Honor - A core military value that guides every decision'
    },
    {
      icon: StarIcon,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, continuously improving our platform and services for our community.',
      militaryConnection: 'Service before self - Always delivering our best'
    },
    {
      icon: HeartIcon,
      title: 'Service',
      description: 'We are committed to serving those who served, putting the needs of veterans and their families at the center of our mission.',
      militaryConnection: 'Duty - Our obligation to support our heroes'
    },
    {
      icon: LightBulbIcon,
      title: 'Community',
      description: 'We foster strong relationships and build bridges between military and civilian communities across the nation.',
      militaryConnection: 'Unity - Stronger together than apart'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We embrace technology and creative solutions to solve problems and create new opportunities for veteran entrepreneurs.',
      militaryConnection: 'Adapt and overcome - Military problem-solving mindset'
    },
    {
      icon: TrophyIcon,
      title: 'Results',
      description: 'We measure our success by the success of the veterans we serve, focusing on tangible outcomes and real impact.',
      militaryConnection: 'Mission accomplishment - Getting the job done'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built on military principles, guided by civilian purpose. These values shape 
              how we serve our veteran community and drive every aspect of our platform.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-xl mb-6">
                    <value.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {value.description}
                  </p>
                  
                  <div className="bg-military-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-military-700">
                      {value.militaryConnection}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Values in Action */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Values in Action
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how our values translate into real impact for the veteran business community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">99.8%</div>
                <div className="text-sm text-gray-600 mb-1">Verification Accuracy</div>
                <div className="text-xs text-gray-500">Integrity in action</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
                <div className="text-sm text-gray-600 mb-1">Customer Satisfaction</div>
                <div className="text-xs text-gray-500">Excellence delivered</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600 mb-1">Support Available</div>
                <div className="text-xs text-gray-500">Service commitment</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">$8.4M</div>
                <div className="text-sm text-gray-600 mb-1">Revenue Generated</div>
                <div className="text-xs text-gray-500">Results that matter</div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary-600 to-military-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Share Our Values?
              </h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Join a community that honors military values while building civilian success. 
                Whether you're a veteran entrepreneur or someone who values what veterans bring 
                to business, you belong here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Join Our Community
                </a>
                <a href="/businesses" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Support Veterans
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}