import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Users, Heart, ArrowRight, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-elegant">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-gold rounded-full blur-3xl animate-elegant-float"></div>
        <div className="absolute bottom-40 right-20 w-56 h-56 bg-church-accent rounded-full blur-3xl animate-elegant-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-warm-gold rounded-full blur-3xl animate-elegant-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-church-accent rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-warm-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-32 w-1.5 h-1.5 bg-church-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <Sparkles className="w-6 h-6 text-church-accent" />
            <span className="text-church-accent font-semibold tracking-wider uppercase text-sm">Welcome to Our Community</span>
            <Sparkles className="w-6 h-6 text-church-accent" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl font-serif font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-church-primary via-church-accent to-church-primary bg-clip-text text-transparent">
              Chosen
            </span>
            <br />
            <span className="bg-gradient-gold bg-clip-text text-transparent animate-gold-shimmer bg-[length:200%_100%]">
              Generation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Join us in faith, fellowship, and service as we grow together in God's love. 
            Discover meaningful activities, connect with others, and make a difference in our community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-gold text-white px-10 py-4 rounded-full font-bold text-lg shadow-gold-glow hover:shadow-strong transition-all flex items-center space-x-3 border border-gold-600/20"
              >
                <Calendar className="w-6 h-6" />
                <span>View Events</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>

            <Link to="/ministries">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(26, 22, 17, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-church-primary border-2 border-church-accent px-10 py-4 rounded-full font-bold text-lg shadow-elegant hover:bg-gold-50 transition-all"
              >
                Explore Ministries
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
        >
          {[
            { icon: Users, label: 'Active Members', value: '1,200+', color: 'from-blue-500 to-blue-600' },
            { icon: Calendar, label: 'Weekly Events', value: '25+', color: 'from-green-500 to-green-600' },
            { icon: Heart, label: 'Years Serving', value: '45+', color: 'from-red-500 to-red-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant hover:shadow-gold-glow transition-all border border-gold-200/50 group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 bg-gradient-${stat.color} rounded-full shadow-medium group-hover:shadow-gold-glow transition-all`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent font-serif">
                    {stat.value}
                  </div>
                  <div className="text-text-secondary font-semibold mt-1">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Elegant Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-8 h-12 border-2 border-church-accent rounded-full flex justify-center shadow-gold-glow"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-1.5 h-4 bg-gradient-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};