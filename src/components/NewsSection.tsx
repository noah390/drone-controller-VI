import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, MessageCircle, Share2 } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    title: 'New Community Garden Project Launches This Spring',
    excerpt: 'Join us in creating a beautiful space where our church family can grow fresh produce for our food pantry while building community connections.',
    author: 'Pastor Michael Johnson',
    date: '2024-01-10',
    category: 'Community',
    readTime: '3 min read',
    image: 'https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 2,
    title: 'Youth Mission Trip to Guatemala - Registration Open',
    excerpt: 'High school students have the opportunity to serve communities in Guatemala this summer. Early bird registration ends February 15th.',
    author: 'Sarah Williams',
    date: '2024-01-08',
    category: 'Youth',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: 3,
    title: 'Marriage Enrichment Weekend: Strengthening Bonds',
    excerpt: 'Couples are invited to join us for a weekend retreat focused on communication, intimacy, and growing together in faith.',
    author: 'Dr. Emily Chen',
    date: '2024-01-05',
    category: 'Marriage',
    readTime: '2 min read',
    image: 'https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: 4,
    title: 'Food Drive Exceeds Goal: 2,000 Pounds Collected',
    excerpt: 'Thanks to our generous congregation, we exceeded our holiday food drive goal and will be able to serve 150 families this month.',
    author: 'Mark Thompson',
    date: '2024-01-03',
    category: 'Service',
    readTime: '2 min read',
    image: 'https://images.pexels.com/photos/6646944/pexels-photo-6646944.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: 5,
    title: 'New Small Group Study: "Faith in Daily Life"',
    excerpt: 'Explore how to live out your faith in everyday situations through this 8-week study starting February 1st.',
    author: 'Pastor David Lee',
    date: '2024-01-01',
    category: 'Study',
    readTime: '3 min read',
    image: 'https://images.pexels.com/photos/8468471/pexels-photo-8468471.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  }
];

const categoryColors = {
  Community: 'bg-green-100 text-green-800',
  Youth: 'bg-blue-100 text-blue-800',
  Marriage: 'bg-pink-100 text-pink-800',
  Service: 'bg-orange-100 text-orange-800',
  Study: 'bg-purple-100 text-purple-800'
};

export const NewsSection: React.FC = () => {
  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
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
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-church-primary mb-4">
          Church News & Updates
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Stay connected with the latest happenings, announcements, and stories from our church community.
        </p>
      </motion.div>

      {/* Featured Article */}
      {featuredArticle && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-medium overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[featuredArticle.category as keyof typeof categoryColors]}`}>
                    {featuredArticle.category}
                  </span>
                  <span className="text-church-accent font-medium text-sm">Featured</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-church-primary mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(featuredArticle.date)}</span>
                    </div>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-primary text-white px-6 py-2 rounded-full font-medium hover:shadow-medium transition-all flex items-center space-x-2"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Regular Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        {regularArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all overflow-hidden group"
          >
            {/* Article Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[article.category as keyof typeof categoryColors]}`}>
                  {article.category}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-church-primary mb-3 group-hover:text-church-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>
                <span>{article.readTime}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-accent text-white px-4 py-2 rounded-full font-medium hover:shadow-medium transition-all flex items-center space-x-2"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MessageCircle className="w-4 h-4 text-text-muted" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Share2 className="w-4 h-4 text-text-muted" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-gradient-warm rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-serif font-bold text-church-primary mb-4">
          Stay Updated with Our Newsletter
        </h3>
        <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
          Get the latest church news, event announcements, and inspiring stories delivered to your inbox weekly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-church-primary"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-6 py-3 rounded-full font-semibold hover:shadow-medium transition-all"
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};