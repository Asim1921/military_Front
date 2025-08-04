// src/components/about/team-section.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export function TeamSection() {
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

  const teamMembers = [
    {
      name: 'Jodi Call',
      role: 'Founder & CEO',
      bio: 'Military family advocate with 15+ years supporting veteran transitions. Passionate about connecting communities with those who serve.',
      military: 'Military Spouse',
      expertise: 'Community Building',
      quote: 'Every veteran deserves the chance to turn their service into civilian success.'
    },
    {
      name: 'Colonel (Ret.) Michael Chen',
      role: 'VP of Veteran Affairs',
      bio: 'Retired Army Colonel with 25 years of service. Expert in veteran transition programs and military-civilian career bridges.',
      military: 'Army Veteran',
      expertise: 'Veteran Programs',
      quote: 'Military training creates excellent entrepreneurs - we just need to connect the dots.'
    },
    {
      name: 'Sarah Martinez',
      role: 'Head of Business Development',
      bio: 'Former Navy logistics officer turned business strategist. Specializes in helping veteran-owned businesses scale and grow.',
      military: 'Navy Veteran',
      expertise: 'Business Strategy',
      quote: 'Precision and planning from military service translate perfectly to business success.'
    },
    {
      name: 'David Thompson',
      role: 'CTO',
      bio: 'Marine Corps veteran and tech entrepreneur. Built multiple platforms connecting service members with civilian opportunities.',
      military: 'Marine Veteran',
      expertise: 'Technology',
      quote: 'Technology should serve those who served our country first and foremost.'
    },
    {
      name: 'Dr. Angela Rodriguez',
      role: 'Head of Community Relations',
      bio: 'PhD in Social Work, specializes in military family support systems. Coordinates our nationwide community outreach programs.',
      military: 'Air Force Spouse',
      expertise: 'Community Outreach',
      quote: 'Strong communities are built one meaningful connection at a time.'
    },
    {
      name: 'James Mitchell',
      role: 'Director of Operations',
      bio: 'Former Air Force logistics expert. Ensures our platform runs with military precision and reliability.',
      military: 'Air Force Veteran',
      expertise: 'Operations',
      quote: 'Excellence in operations means excellence in serving our veterans.'
    }
  ];

  const advisors = [
    {
      name: 'General (Ret.) Patricia Williams',
      role: 'Senior Military Advisor',
      background: 'Former Joint Chiefs of Staff member'
    },
    {
      name: 'Robert Kim',
      role: 'Business Advisory Board',
      background: 'Fortune 500 CEO & Veteran Advocate'
    },
    {
      name: 'Dr. Maria Santos',
      role: 'Research Advisor',
      background: 'Veterans Affairs Policy Expert'
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A diverse team of veterans, military families, and civilian allies united by 
              a common mission to support veteran entrepreneurs and strengthen communities.
            </p>
          </motion.div>

          {/* Leadership Team */}
          <motion.div variants={fadeInUp} className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
              Leadership Team
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  {/* Profile Header */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-600 font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-primary-600 font-medium mb-2">
                      {member.role}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <span className="bg-military-100 text-military-700 px-2 py-1 rounded-full">
                        {member.military}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {member.expertise}
                      </span>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  {/* Quote */}
                  <blockquote className="bg-primary-50 p-3 rounded-lg border-l-4 border-primary-400">
                    <p className="text-primary-800 text-sm italic">
                      "{member.quote}"
                    </p>
                  </blockquote>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advisory Board */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advisory Board
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Distinguished leaders who guide our strategic direction and ensure we're 
                serving the veteran community with excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 bg-gray-50 rounded-xl"
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserIcon className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {advisor.name}
                  </h4>
                  <p className="text-primary-600 font-medium mb-2">
                    {advisor.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    {advisor.background}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Stats */}
          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-r from-military-600 to-primary-600 rounded-2xl p-8 md:p-12 text-white mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">
                Our Team by the Numbers
              </h3>
              <p className="text-primary-100 max-w-2xl mx-auto">
                A diverse team with deep military connections and business expertise
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">78%</div>
                <div className="text-primary-100 text-sm">Military Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">150+</div>
                <div className="text-primary-100 text-sm">Years Combined Service</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">25+</div>
                <div className="text-primary-100 text-sm">Years Business Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
                <div className="text-primary-100 text-sm">Military Branches</div>
              </div>
            </div>
          </motion.div>

          {/* Join Our Team */}
          <motion.div 
            variants={fadeInUp}
            className="text-center bg-gray-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Mission
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our commitment 
              to supporting veterans and building stronger communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/careers" className="btn-primary">
                View Open Positions
              </a>
              <a href="/contact" className="btn-secondary">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}