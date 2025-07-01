import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, BookOpen, Music, Baby, Gamepad2, Briefcase, Globe } from 'lucide-react';

const ministries = [
  {
    id: 1,
    title: 'Children\'s Ministry',
    description: 'Nurturing young hearts with age-appropriate lessons, activities, and fun that help children grow in their faith.',
    icon: Baby,
    color: 'bg-blue-500',
    participants: 120,
    ageGroup: 'Ages 3-12',
    meetingTime: 'Sundays 10:00 AM',
    image: 'https://images.pexels.com/photos/8923182/pexels-photo-8923182.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    title: 'Youth Ministry',
    description: 'Empowering teenagers to discover their purpose and build lasting friendships through engaging programs and mentorship.',
    icon: Gamepad2,
    color: 'bg-green-500',
    participants: 85,
    ageGroup: 'Ages 13-18',
    meetingTime: 'Tuesdays 7:00 PM',
    image: 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    title: 'Worship Ministry',
    description: 'Leading our congregation in meaningful worship through music, vocals, and technical excellence.',
    icon: Music,
    color: 'bg-purple-500',
    participants: 45,
    ageGroup: 'All Ages',
    meetingTime: 'Thursdays 7:30 PM',
    image: 'https://images.pexels.com/photos/7551669/pexels-photo-7551669.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    title: 'Adult Bible Study',
    description: 'Deep exploration of Scripture with fellow believers, fostering spiritual growth and understanding.',
    icon: BookOpen,
    color: 'bg-orange-500',
    participants: 60,
    ageGroup: 'Adults 18+',
    meetingTime: 'Wednesdays 7:00 PM',
    image: 'https://images.pexels.com/photos/8468471/pexels-photo-8468471.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    title: 'Community Outreach',
    description: 'Serving our local community through food drives, volunteer work, and compassionate care for those in need.',
    icon: Heart,
    color: 'bg-red-500',
    participants: 150,
    ageGroup: 'All Ages',
    meetingTime: 'Saturdays 9:00 AM',
    image: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 6,
    title: 'Senior Fellowship',
    description: 'Building connections and providing support for our senior members through regular gatherings and activities.',
    icon: Users,
    color: 'bg-indigo-500',
    participants: 75,
    ageGroup: 'Ages 55+',
    meetingTime: 'Fridays 2:00 PM',
    image: 'https://images.pexels.com/photos/6646943/pexels-photo-6646943.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 7,
    title: 'Men\'s Ministry',
    description: 'Strengthening brotherhood through fellowship, accountability, and spiritual growth in a supportive environment.',
    icon: Briefcase,
    color: 'bg-gray-600',
    participants: 40,
    ageGroup: 'Men 18+',
    meetingTime: 'Saturdays 7:00 AM',
    image: 'https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 8,
    title: 'Missions Ministry',
    description: 'Supporting global missions and local evangelism efforts to spread God\'s love around the world.',
    icon: Globe,
    color: 'bg-teal-500',
    participants: 30,
    ageGroup: 'All Ages',
    meetingTime: 'Monthly Meetings',
    image: 'https://images.pexels.com/photos/6646944/pexels-photo-6646944.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const MinistriesSection: React.FC = () => {
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
          Our Ministries
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Discover meaningful ways to grow in faith, serve others, and build lasting relationships within our church family.
        </p>
      </motion.div>

      {/* Ministries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ministries.map((ministry, index) => (
          <motion.div
            key={ministry.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all overflow-hidden group"
          >
            {/* Ministry Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={ministry.image}
                alt={ministry.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className={`p-3 ${ministry.color} rounded-full`}>
                  <ministry.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Ministry Content */}
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-church-primary mb-2 group-hover:text-church-accent transition-colors">
                {ministry.title}
              </h3>
              <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                {ministry.description}
              </p>

              {/* Ministry Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Participants:</span>
                  <span className="font-medium text-church-primary">{ministry.participants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Age Group:</span>
                  <span className="font-medium text-church-primary">{ministry.ageGroup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Meets:</span>
                  <span className="font-medium text-church-primary">{ministry.meetingTime}</span>
                </div>
              </div>

              {/* Join Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-accent text-white py-2 rounded-xl font-medium hover:shadow-medium transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16 bg-gradient-warm rounded-2xl p-8"
      >
        <h3 className="text-2xl font-serif font-bold text-church-primary mb-4">
          Ready to Get Involved?
        </h3>
        <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
          Whether you're new to faith or have been walking with God for years, there's a place for you in our ministries. 
          Connect with us to find where you belong.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-medium transition-all"
        >
          Contact Ministry Leaders
        </motion.button>
      </motion.div>
    </div>
  );
};