import React from 'react';
import { motion } from 'framer-motion';
import { Church, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart, Crown } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-primary text-gold-100 relative overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-church-accent rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-warm-gold rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Church Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-gold rounded-full shadow-gold-glow">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-church-accent">Chosen Generation</h3>
                <p className="text-sm text-gold-200">Church</p>
              </div>
            </div>
            <p className="text-gold-200 leading-relaxed">
              Building a community of faith, hope, and love. Join us as we grow together 
              in God's grace and serve our neighbors with compassion and elegance.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="p-3 bg-white/10 rounded-full hover:bg-church-accent hover:shadow-gold-glow transition-all border border-gold-600/20"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-serif font-bold mb-6 text-church-accent">Quick Links</h4>
            <ul className="space-y-3">
              {[
                'About Us',
                'Our Beliefs',
                'Leadership',
                'Sermons',
                'Events Calendar',
                'Give Online',
                'Prayer Requests',
                'Contact Us'
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gold-200 hover:text-church-accent transition-colors hover:translate-x-2 transform duration-200 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ministries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-serif font-bold mb-6 text-church-accent">Ministries</h4>
            <ul className="space-y-3">
              {[
                'Children\'s Ministry',
                'Youth Group',
                'Adult Bible Study',
                'Worship Team',
                'Community Outreach',
                'Senior Fellowship',
                'Men\'s Ministry',
                'Women\'s Ministry'
              ].map((ministry) => (
                <li key={ministry}>
                  <a
                    href="#"
                    className="text-gold-200 hover:text-church-accent transition-colors hover:translate-x-2 transform duration-200 inline-block"
                  >
                    {ministry}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-serif font-bold mb-6 text-church-accent">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-church-accent mt-1" />
                <div>
                  <p className="text-gold-200">Community hall behind S.T Paul School</p>
                  <p className="text-gold-200">Aseese</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-church-accent" />
                <p className="text-gold-200">09046456469</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-church-accent" />
                <p className="text-gold-200">abbeyayo53@gmail.com</p>
              </div>
            </div>

            {/* Service Times */}
            <div className="mt-8 p-6 bg-white/5 rounded-xl border border-gold-600/20">
              <h5 className="font-serif font-bold mb-4 text-church-accent">Service Times</h5>
              <div className="text-gold-200 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Sunday Worship:</span>
                  <span className="text-church-accent font-semibold">10:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday School:</span>
                  <span className="text-church-accent font-semibold">9:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Bible Study:</span>
                  <span className="text-church-accent font-semibold">7:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gold-600/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gold-200 text-sm">
            © {currentYear} Chosen Generation Church. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-gold-200 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-church-accent animate-pulse" />
            <span>and</span>
            <Crown className="w-4 h-4 text-church-accent" />
            <span>for our community</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};