import React from 'react';
import { motion } from 'framer-motion';
import { VolunteerSection } from '../components/VolunteerSection';

export const VolunteerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-church-cream">
      {/* Page Header */}
      <div className="bg-gradient-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif font-bold text-church-primary mb-4"
          >
            Volunteer Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Use your gifts and talents to make a difference in our community and beyond.
          </motion.p>
        </div>
      </div>

      {/* Volunteer Content */}
      <div className="py-20">
        <VolunteerSection />
      </div>
    </div>
  );
};