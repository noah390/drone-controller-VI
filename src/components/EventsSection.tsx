import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Filter, ChevronRight, Star } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: '2024-01-14',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    category: 'Worship',
    attendees: 300,
    description: 'Join us for our weekly worship service with inspiring music and meaningful messages.',
    image: 'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=800',
    recurring: 'Weekly',
    featured: true
  },
  {
    id: 2,
    title: 'Youth Group Meeting',
    date: '2024-01-16',
    time: '7:00 PM',
    location: 'Youth Center',
    category: 'Youth',
    attendees: 45,
    description: 'Fun activities, games, and discussions for teens aged 13-18.',
    image: 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=800',
    recurring: 'Weekly',
    featured: false
  },
  {
    id: 3,
    title: 'Community Food Drive',
    date: '2024-01-20',
    time: '9:00 AM',
    location: 'Church Parking Lot',
    category: 'Service',
    attendees: 80,
    description: 'Help us collect food donations for local families in need.',
    image: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=800',
    recurring: 'Monthly',
    featured: false
  },
  {
    id: 4,
    title: 'Bible Study Group',
    date: '2024-01-17',
    time: '7:30 PM',
    location: 'Fellowship Hall',
    category: 'Study',
    attendees: 25,
    description: 'Deep dive into scripture with guided discussion and prayer.',
    image: 'https://images.pexels.com/photos/8468471/pexels-photo-8468471.jpeg?auto=compress&cs=tinysrgb&w=800',
    recurring: 'Weekly',
    featured: false
  },
  {
    id: 5,
    title: 'Senior Fellowship Lunch',
    date: '2024-01-18',
    time: '12:00 PM',
    location: 'Fellowship Hall',
    category: 'Fellowship',
    attendees: 60,
    description: 'Monthly gathering for our senior members with lunch and activities.',
    image: 'https://images.pexels.com/photos/6646943/pexels-photo-6646943.jpeg?auto=compress&cs=tinysrgb&w=800',
    recurring: 'Monthly',
    featured: false
  },
  {
    id: 6,
    title: 'Marriage Enrichment Workshop',
    date: '2024-01-21',
    time: '2:00 PM',
    location: 'Conference Room',
    category: 'Workshop',
    attendees: 20,
    description: 'Strengthen your marriage with practical tools and biblical wisdom.',
    image: 'https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&w=800',
    recurring: 'Quarterly',
    featured: false
  }
];

const categories = ['All', 'Worship', 'Youth', 'Service', 'Study', 'Fellowship', 'Workshop'];

export const EventsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
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
        <h2 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-gold bg-clip-text text-transparent mb-6">
          Upcoming Events
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Join us for meaningful activities that strengthen our faith and build community connections.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center mb-12 gap-3"
      >
        <div className="flex items-center space-x-3 mr-6">
          <Filter className="w-5 h-5 text-church-accent" />
          <span className="text-text-secondary font-semibold">Filter by:</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all border ${
                selectedCategory === category
                  ? 'bg-gradient-gold text-white shadow-gold-glow border-gold-600'
                  : 'bg-white text-text-secondary hover:bg-gold-50 hover:text-church-accent border-gold-200 hover:border-church-accent'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white rounded-2xl shadow-elegant hover:shadow-gold-glow transition-all overflow-hidden group border border-gold-200/50"
          >
            {/* Event Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-gold text-white px-4 py-2 rounded-full text-sm font-semibold shadow-medium">
                  {event.category}
                </span>
              </div>
              
              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-white/90 text-church-accent px-3 py-1 rounded-full text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Featured</span>
                  </div>
                </div>
              )}
              
              {/* Recurring Badge */}
              <div className="absolute bottom-4 right-4">
                <span className="bg-white/90 text-church-primary px-3 py-1 rounded-full text-sm font-medium">
                  {event.recurring}
                </span>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-church-primary mb-3 group-hover:text-church-accent transition-colors">
                {event.title}
              </h3>
              <p className="text-text-secondary mb-4 line-clamp-2 leading-relaxed">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-text-secondary">
                  <div className="p-1 bg-gold-100 rounded-full">
                    <Calendar className="w-4 h-4 text-church-accent" />
                  </div>
                  <span className="font-medium">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-text-secondary">
                  <div className="p-1 bg-gold-100 rounded-full">
                    <Clock className="w-4 h-4 text-church-accent" />
                  </div>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-text-secondary">
                  <div className="p-1 bg-gold-100 rounded-full">
                    <MapPin className="w-4 h-4 text-church-accent" />
                  </div>
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-text-secondary">
                  <div className="p-1 bg-gold-100 rounded-full">
                    <Users className="w-4 h-4 text-church-accent" />
                  </div>
                  <span className="font-medium">{event.attendees} expected</span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-gold text-white py-3 rounded-xl font-semibold hover:shadow-gold-glow transition-all flex items-center justify-center space-x-2 border border-gold-600/20"
              >
                <span>Learn More</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Events Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(26, 22, 17, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-church-primary border-2 border-church-accent px-10 py-4 rounded-full font-bold hover:bg-gold-50 hover:shadow-elegant transition-all"
        >
          View All Events
        </motion.button>
      </motion.div>
    </div>
  );
};