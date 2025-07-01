import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Heart, ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-warm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-church-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-church-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-church-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-church-primary leading-tight"
          >
            Welcome to Our
            <span className="block text-church-accent">Community</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Join us in faith, fellowship, and service as we grow together in God's love. 
            Discover meaningful activities, connect with others, and make a difference in our community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('events')}
              className="bg-gradient-primary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-medium hover:shadow-strong transition-all flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>View Events</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('ministries')}
              className="bg-white text-church-primary border-2 border-church-primary px-8 py-4 rounded-full font-semibold text-lg shadow-soft hover:shadow-medium transition-all"
            >
              Explore Ministries
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { icon: Users, label: 'Active Members', value: '1,200+' },
            { icon: Calendar, label: 'Weekly Events', value: '25+' },
            { icon: Heart, label: 'Years Serving', value: '45+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gradient-accent rounded-full">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-church-primary">{stat.value}</div>
                  <div className="text-text-secondary font-medium">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-church-primary rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-church-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};