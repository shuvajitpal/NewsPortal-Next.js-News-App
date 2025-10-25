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
    <div>
      <div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          <motion.div variants={itemVariants}>
            <h1>API Sources</h1>
            <p>
              Information about the news APIs powering our platform.
            </p>
          </motion.div>
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

            <div>
              <div>
                <h3>About NewsAPI</h3>
                <p>
                  NewsAPI is a simple HTTP REST API for searching and retrieving live articles from all over the web.
                  It provides current and historical news articles from over 30,000 sources worldwide.
                </p>
              </div>

              <div>
                <h3>Features</h3>
                <ul>
                  <li>Real-time news articles from global sources</li>
                  <li>Search across multiple categories and keywords</li>
                  <li>Top headlines from specific countries</li>
                  <li>Pagination support for large datasets</li>
                  <li>Clean and consistent JSON response format</li>
                </ul>
              </div>

              <div>
                <h3>API Endpoints Used</h3>
                <div>
                  <div>
                    <code>
                      GET https://newsapi.org/v2/top-headlines
                    </code>
                    <p>
                      For fetching top headlines by category
                    </p>
                  </div>
                  <div>
                    <code>
                      GET https://newsapi.org/v2/everything
                    </code>
                    <p>
                      For searching news articles by query
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3>Rate Limits</h3>
                <p>
                  Free tier: 100 requests per day<br />
                  Developer tier: 1,000 requests per day<br />
                  Enterprise tier: Custom limits based on needs
                </p>
              </div>

              <div>
                <h3>Official Website</h3>
                <a
                  href="https://newsapi.org"
                  target="_blank"
                  rel="noopener noreferrer">
                  https://newsapi.org
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}>
            <h2>API Status & Information</h2>

            <div>
              <div>
                <h3>Current Status</h3>
                <div>
                  <div></div>
                  <span>
                    Service Operational
                  </span>
                </div>
                <p>
                  Last checked: {new Date().toISOString().split('T')[0]}
                </p>
              </div>

              <div>
                <h3>Data Coverage</h3>
                <ul>
                  <li>
                    30,000+ news sources
                  </li>
                  <li>
                    50+ countries
                  </li>
                  <li>
                    Multiple languages
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4>Important Notice</h4>
              <p>
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