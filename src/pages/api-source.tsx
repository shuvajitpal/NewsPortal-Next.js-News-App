// src/pages/api-source.tsx
"use client";
import { motion } from "framer-motion";

export default function ApiSourcePage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className='min-h-screen transition-colors duration-300'>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">API Sources</h1>
            <p className='text-lg'>
              Information about the news APIs powering our platform.
            </p>
          </motion.div>

          {/* Main API Source */}
          <motion.div 
            variants={itemVariants}
            className={`rounded-lg border shadow-lg`}
          >
            <div>
              <div>
                <h2 className="text-2xl font-bold">NewsAPI.org</h2>
                <p>
                  Primary News Data Provider
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">About NewsAPI</h3>
                <p>
                  NewsAPI is a simple HTTP REST API for searching and retrieving live articles from all over the web. 
                  It provides current and historical news articles from over 30,000 sources worldwide.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Features</h3>
                <ul className='list-disc list-inside space-y-1'>
                  <li>Real-time news articles from global sources</li>
                  <li>Search across multiple categories and keywords</li>
                  <li>Top headlines from specific countries</li>
                  <li>Pagination support for large datasets</li>
                  <li>Clean and consistent JSON response format</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">API Endpoints Used</h3>
                <div className="space-y-2">
                  <div className='p-3 rounded'>
                    <code className="text-sm">
                      GET https://newsapi.org/v2/top-headlines
                    </code>
                    <p className='text-sm mt-1'>
                      For fetching top headlines by category
                    </p>
                  </div>
                  <div className='p-3 rounded'>
                    <code className="text-sm">
                      GET https://newsapi.org/v2/everything
                    </code>
                    <p className='text-sm mt-1'>
                      For searching news articles by query
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Rate Limits</h3>
                <p>
                  Free tier: 100 requests per day<br />
                  Developer tier: 1,000 requests per day<br />
                  Enterprise tier: Custom limits based on needs
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Official Website</h3>
                <a 
                  href="https://newsapi.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors'
                >
                  https://newsapi.org
                </a>
              </div>
            </div>
          </motion.div>

          {/* API Status & Message */}
          <motion.div 
            variants={itemVariants}
            className='rounded-lg p-6 border shadow-lg'
          >
            <h2 className="text-2xl font-bold mb-4">API Status & Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Current Status</h3>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>
                    Service Operational
                  </span>
                </div>
                <p className='text-sm'>
                  Last checked: {new Date().toISOString().split('T')[0]}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Data Coverage</h3>
                <ul className='space-y-2'>
                  <li className="flex items-center">
                    30,000+ news sources
                  </li>
                  <li className="flex items-center">
                    50+ countries
                  </li>
                  <li className="flex items-center">
                    Multiple languages
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Important Notice</h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                This application uses the free tier of NewsAPI. For production use or higher traffic, 
                please consider upgrading to a paid plan on the NewsAPI website.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}