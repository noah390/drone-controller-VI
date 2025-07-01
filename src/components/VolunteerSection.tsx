import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const volunteerOpportunities = [
  {
    id: 1,
    title: 'Sunday School Teacher',
    description: 'Share God\'s love with children through engaging lessons and activities.',
    timeCommitment: '2 hours/week',
    location: 'Children\'s Wing',
    volunteers: 8,
    needed: 12,
    skills: ['Teaching', 'Patience', 'Creativity'],
    urgency: 'high',
    category: 'Education'
  },
  {
    id: 2,
    title: 'Worship Team Musician',
    description: 'Lead our congregation in worship through instrumental music.',
    timeCommitment: '4 hours/week',
    location: 'Main Sanctuary',
    volunteers: 15,
    needed: 20,
    skills: ['Musical Ability', 'Team Player', 'Commitment'],
    urgency: 'medium',
    category: 'Worship'
  },
  {
    id: 3,
    title: 'Food Pantry Volunteer',
    description: 'Help distribute food to families in need in our community.',
    timeCommitment: '3 hours/month',
    location: 'Community Center',
    volunteers: 25,
    needed: 30,
    skills: ['Compassion', 'Organization', 'Physical Ability'],
    urgency: 'low',
    category: 'Service'
  },
  {
    id: 4,
    title: 'Youth Mentor',
    description: 'Guide and support teenagers in their faith journey.',
    timeCommitment: '2 hours/week',
    location: 'Youth Center',
    volunteers: 6,
    needed: 10,
    skills: ['Mentoring', 'Listening', 'Reliability'],
    urgency: 'high',
    category: 'Youth'
  },
  {
    id: 5,
    title: 'Greeter/Usher',
    description: 'Welcome visitors and help create a warm, inviting atmosphere.',
    timeCommitment: '2 hours/week',
    location: 'Main Entrance',
    volunteers: 20,
    needed: 24,
    skills: ['Friendliness', 'Communication', 'Punctuality'],
    urgency: 'medium',
    category: 'Hospitality'
  },
  {
    id: 6,
    title: 'Tech Team Member',
    description: 'Support our services with audio, video, and lighting equipment.',
    timeCommitment: '3 hours/week',
    location: 'Tech Booth',
    volunteers: 4,
    needed: 8,
    skills: ['Technical Skills', 'Attention to Detail', 'Problem Solving'],
    urgency: 'high',
    category: 'Technical'
  }
];

const urgencyColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

export const VolunteerSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const categories = ['All', 'Education', 'Worship', 'Service', 'Youth', 'Hospitality', 'Technical'];

  const filteredOpportunities = selectedCategory === 'All' 
    ? volunteerOpportunities 
    : volunteerOpportunities.filter(opp => opp.category === selectedCategory);

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
          Volunteer Opportunities
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Make a difference in our community by sharing your time, talents, and heart. 
          Every contribution matters in building God's kingdom.
        </p>
      </motion.div>

      {/* Impact Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
      >
        {[
          { label: 'Active Volunteers', value: '180+', icon: Users },
          { label: 'Hours Served Monthly', value: '1,200+', icon: Clock },
          { label: 'Families Helped', value: '350+', icon: Heart },
          { label: 'Community Programs', value: '25+', icon: MapPin }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 text-center shadow-soft"
          >
            <div className="p-3 bg-gradient-accent rounded-full w-fit mx-auto mb-3">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-church-primary">{stat.value}</div>
            <div className="text-text-secondary text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-church-primary text-white shadow-soft'
                : 'bg-white text-text-secondary hover:bg-church-primary hover:text-white border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Volunteer Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredOpportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-serif font-bold text-church-primary">
                  {opportunity.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${urgencyColors[opportunity.urgency]}`}>
                  {opportunity.urgency} priority
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {opportunity.description}
              </p>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center space-x-2 text-text-muted mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Time Commitment</span>
                  </div>
                  <div className="font-medium text-church-primary">{opportunity.timeCommitment}</div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-text-muted mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <div className="font-medium text-church-primary">{opportunity.location}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Volunteers</span>
                  <span className="font-medium text-church-primary">
                    {opportunity.volunteers}/{opportunity.needed}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-accent h-2 rounded-full transition-all"
                    style={{ width: `${(opportunity.volunteers / opportunity.needed) * 100}%` }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="text-sm text-text-muted mb-2">Skills Needed:</div>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-church-cream text-church-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApplicationForm(true)}
                className="w-full bg-gradient-primary text-white py-3 rounded-xl font-medium hover:shadow-medium transition-all flex items-center justify-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-primary rounded-2xl p-8 text-center text-white"
      >
        <h3 className="text-2xl font-serif font-bold mb-4">
          Don't See What You're Looking For?
        </h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          We believe everyone has unique gifts to offer. If you have a passion or skill you'd like to share, 
          we'd love to help you find the perfect way to serve.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-church-primary px-8 py-3 rounded-full font-semibold hover:shadow-medium transition-all"
        >
          Contact Volunteer Coordinator
        </motion.button>
      </motion.div>
    </div>
  );
};