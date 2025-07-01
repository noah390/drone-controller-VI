import React from 'react';
import { motion } from 'framer-motion';
import { EventsSection } from '../components/EventsSection';

export const EventsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-church-light">
      {/* Page Header */}
      <div className="bg-gradient-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif font-bold text-church-primary mb-4"
          >
            Church Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Stay connected with all the exciting activities and gatherings at Chosen Generation Church.
          </motion.p>
        </div>
      </div>

      {/* Events Content */}
      <div className="py-20">
        <EventsSection />
      </div>
    </div>
  );
};