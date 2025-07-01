import React from 'react';
import { motion } from 'framer-motion';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Page Header */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif font-bold text-church-primary mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            We'd love to hear from you. Get in touch with Chosen Generation Church.
          </motion.p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="pb-20">
        <ContactSection />
      </div>
    </div>
  );
};