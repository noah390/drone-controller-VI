import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-church-primary mb-4">
          Get in Touch
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          We'd love to hear from you. Whether you have questions, need prayer, or want to get involved, 
          we're here to help you on your faith journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-serif font-bold text-church-primary mb-6">
              Visit Us
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: 'Address',
                  content: 'Community hall behind S.T Paul School\nAseese'
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  content: '09046456469'
                },
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'abbeyayo53@gmail.com'
                },
                {
                  icon: Clock,
                  title: 'Office Hours',
                  content: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 bg-gradient-accent rounded-full">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-church-primary mb-1">{item.title}</h4>
                    <p className="text-text-secondary whitespace-pre-line">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Service Times */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-soft"
          >
            <h3 className="text-xl font-serif font-bold text-church-primary mb-4">
              Service Times
            </h3>
            <div className="space-y-3">
              {[
                { service: 'Sunday Worship', time: '10:00 AM' },
                { service: 'Sunday School', time: '9:00 AM' },
                { service: 'Wednesday Bible Study', time: '7:00 PM' },
                { service: 'Friday Youth Group', time: '7:00 PM' }
              ].map((service) => (
                <div key={service.service} className="flex justify-between items-center">
                  <span className="text-text-secondary">{service.service}</span>
                  <span className="font-medium text-church-primary">{service.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="w-12 h-12 text-church-primary mx-auto mb-2" />
              <p className="text-text-secondary">Interactive Map</p>
              <p className="text-sm text-text-muted">Click to view directions</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-medium"
        >
          <h3 className="text-2xl font-serif font-bold text-church-primary mb-6">
            Send Us a Message
          </h3>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-church-primary mb-2">
                Message Sent Successfully!
              </h4>
              <p className="text-text-secondary">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-church-primary transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-church-primary transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-church-primary transition-colors"
                    placeholder="09046456469"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-church-primary transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="events">Events & Activities</option>
                    <option value="pastoral">Pastoral Care</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-church-primary transition-colors resize-none"
                  placeholder="Please share your message, questions, or prayer requests..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-primary text-white py-4 rounded-xl font-semibold hover:shadow-medium transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};