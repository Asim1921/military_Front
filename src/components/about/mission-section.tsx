// src/components/about/mission-section.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  SparklesIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

export function MissionSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const objectives = [
    {
      title: 'Economic Empowerment',
      description: 'Create sustainable income opportunities for veteran entrepreneurs and their families',
      metric: '$50M+ in veteran business revenue generated'
    },
    {
      title: 'Community Building',
      description: 'Foster connections between military and civilian communities nationwide',
      metric: '500+ communities served across all 50 states'
    },
    {
      title: 'Quality Assurance',
      description: 'Maintain the highest standards through verification and customer feedback',
      metric: '4.8+ average customer satisfaction rating'
    },
    {
      title: 'Skills Translation',
      description: 'Help veterans leverage military skills in successful civilian careers',
      metric: '85% business success rate after 2 years'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-military-50 to-primary-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-6">
             
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To empower military veterans by connecting them with communities that value their service, 
              skills, and dedication to excellence.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                 
                  Mission Statement
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We exist to bridge the gap between exceptional veteran-owned businesses and 
                  customers seeking quality, trust, and values-driven service. Through our platform, 
                  we transform military training and character into civilian success stories.
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  <span>Learn about our impact</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <EyeIcon className="h-6 w-6 text-primary-600 mr-3" />
                  Vision Statement
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  To create a world where every veteran entrepreneur has the opportunity to thrive, 
                  where military service is recognized as premium preparation for business leadership, 
                  and where communities actively choose to support those who served.
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  <span>Join our vision</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Objectives */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full mb-4">
                <SparklesIcon className="h-6 w-6 text-yellow-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Strategic Objectives
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our mission drives everything we do. Here are the key objectives guiding our work:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {objective.title}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {objective.description}
                  </p>
                  <div className="bg-primary-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-primary-800">
                      Target: {objective.metric}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission in Action */}
          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-r from-primary-600 to-military-600 rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Mission in Action
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Every day, we're making our mission real through verified connections, 
                business growth, and community impact.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    1,200+
                  </div>
                  <div className="text-primary-100 text-sm">
                    Veterans Supported
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    $5.2M
                  </div>
                  <div className="text-primary-100 text-sm">
                    Revenue Generated
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    50,000+
                  </div>
                  <div className="text-primary-100 text-sm">
                    Connections Made
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    94%
                  </div>
                  <div className="text-primary-100 text-sm">
                    Satisfaction Rate
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}