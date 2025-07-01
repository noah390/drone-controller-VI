import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Church, Menu, X, Phone, Mail, MapPin } from 'lucide-react';

const navigation = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'events', label: 'Events', path: '/events' },
  { id: 'ministries', label: 'Ministries', path: '/ministries' },
  { id: 'volunteer', label: 'Volunteer', path: '/volunteer' },
  { id: 'news', label: 'News', path: '/news' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-primary text-gold-100 py-3 px-4 text-sm border-b border-gold-600/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:text-church-accent transition-colors">
              <Phone className="w-4 h-4 text-church-accent" />
              <span>09046456469</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-church-accent transition-colors">
              <Mail className="w-4 h-4 text-church-accent" />
              <span>abbeyayo53@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 hover:text-church-accent transition-colors">
            <MapPin className="w-4 h-4 text-church-accent" />
            <span>Community hall behind S.T Paul School, Aseese</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-gold-glow border-b border-gold-200' 
            : 'bg-gradient-elegant shadow-elegant'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4 cursor-pointer group"
              >
                <div className="p-3 bg-gradient-gold rounded-full shadow-gold-glow group-hover:shadow-strong transition-all">
                  <Church className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-church-primary to-church-accent bg-clip-text text-transparent">
                    Chosen Generation
                  </h1>
                  <p className="text-sm text-text-muted font-medium">Church</p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link key={item.id} to={item.path}>
                  <motion.div
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-church-accent'
                        : 'text-text-secondary hover:text-church-accent'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-accent rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-gradient-gold text-white px-8 py-3 rounded-full font-semibold shadow-medium hover:shadow-gold-glow transition-all border border-gold-600/20"
            >
              Join Us Sunday
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gold-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-church-primary" />
              ) : (
                <Menu className="w-6 h-6 text-church-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-elegant border-t border-gold-200"
          >
            <div className="px-4 py-6 space-y-3">
              {navigation.map((item) => (
                <Link key={item.id} to={item.path}>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive(item.path)
                        ? 'bg-gradient-gold text-white shadow-medium'
                        : 'text-text-secondary hover:bg-gold-100 hover:text-church-accent'
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
              <button className="w-full bg-gradient-gold text-white px-6 py-3 rounded-full font-semibold mt-4 shadow-medium">
                Join Us Sunday
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};