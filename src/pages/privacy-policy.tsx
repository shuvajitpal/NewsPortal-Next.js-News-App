"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            <h1>Privacy Policy</h1>
            <p>
              Last updated: {new Date().toISOString().split('T')[0]}
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div>
              <h2>Introduction</h2>
              <p>
                Welcome to NewsPortal. We are committed to protecting your privacy and ensuring
                transparency about how we handle your information. This Privacy Policy explains
                how we collect, use, and safeguard your data when you use our news platform.
              </p>
              <p>
                By using NewsPortal, you agree to the terms outlined in this policy.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2 >Information We Collect</h2>
            <div>
              <div>
                <h3>Automatically Collected Information</h3>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Referring website and search queries</li>
                </ul>
              </div>

              <div>
                <h3>News Preferences</h3>
                <ul>
                  <li>Categories you browse (technology, sports, business, etc.)</li>
                  <li>Search queries for news articles</li>
                  <li>Reading history and favorite articles</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2>How We Use Your Information</h2>
            <div >
              <div>
                <h3>Service Improvement</h3>
                <ul>
                  <li>Personalize news recommendations</li>
                  <li>Improve user experience</li>
                  <li>Optimize website performance</li>
                </ul>
              </div>

              <div>
                <h3>Analytics</h3>
                <ul>
                  <li>Understand user behavior</li>
                  <li>Analyze popular content</li>
                  <li>Track platform performance</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2>Data Sharing and Disclosure</h2>
            <div >
              <h3>We Do Not Sell Your Data</h3>
              <p>
                NewsPortal does not sell, trade, or rent your personal information to third parties.
                We may share aggregated, anonymized data for analytical purposes.
              </p>

              <h4>Third-Party Services</h4>
              <ul>
                <li>NewsAPI.org - Our primary news data provider</li>
                <li>Analytics services (Google Analytics)</li>
                <li>Cloud hosting providers</li>
              </ul>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2>Cookies and Tracking</h2>
            <div>
              <p>
                We use cookies and similar tracking technologies to enhance your experience
                and analyze website traffic.
              </p>

              <div >
                <div>
                  <div></div>
                  <h4>🍪 Essential Cookies</h4>
                  <p>Required for basic functionality</p>
                </div>

                <div>
                  <div></div>
                  <h4>📊 Analytics Cookies</h4>
                  <p >Help us improve our service</p>
                </div>

                <div>
                  <div></div>
                  <h4>⚙️ Preference Cookies</h4>
                  <p >Remember your settings</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2>Data Security</h2>
            <div>
              <div>
                <div></div>
                <div>
                  <h3>🔒 We Protect Your Information</h3>
                  <p>
                    We implement appropriate security measures to protect against unauthorized access,
                    alteration, disclosure, or destruction of your personal information.
                  </p>
                </div>
              </div>

              <ul>
                <li>SSL encryption for data transmission</li>
                <li>Regular security assessments</li>
                <li>Limited access to personal data</li>
                <li>Secure server infrastructure</li>
              </ul>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2>Your Rights</h2>
            <div>
              <p>
                You have the right to control your personal information. As a user of NewsPortal, you can:
              </p>

              <div>
                <ul>
                  <li>Access your personal data</li>
                  <li>Request data correction</li>
                  <li>Opt-out of analytics tracking</li>
                </ul>
                <ul>
                  <li>Delete your account data</li>
                  <li>Export your information</li>
                  <li>Withdraw consent</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2>Contact Us</h2>
            <div>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data,
                please contact us:
              </p>

              <div>
                <p>📧 Email: shuvajitpal103@gmail.com</p>
                <p>🌐 Website: XXXXXX</p>
                <p>📝 Address: #####</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2>Policy Updates</h2>
            <div>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div >
              <div>
                <Link
                  href="/">
                  Back to Home
                </Link>
              </div>
              <div>
                <Link
                  href="/api-source">
                  API Sources
                </Link>
              </div>
              <div>
                <Link
                  href="#">
                  About Us
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}