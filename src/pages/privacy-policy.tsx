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
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toISOString().split('T')[0]}
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to NewsPortal. We are committed to protecting your privacy and ensuring
                transparency about how we handle your information. This Privacy Policy explains
                how we collect, use, and safeguard your data when you use our news platform.
              </p>
              <p className="text-gray-700">
                By using NewsPortal, you agree to the terms outlined in this policy.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information We Collect</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Referring website and search queries</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">News Preferences</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Categories you browse (technology, sports, business, etc.)</li>
                  <li>Search queries for news articles</li>
                  <li>Reading history and favorite articles</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">How We Use Your Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="text-lg font-semibold mb-2 text-blue-800">Service Improvement</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Personalize news recommendations</li>
                  <li>Improve user experience</li>
                  <li>Optimize website performance</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="text-lg font-semibold mb-2 text-green-800">Analytics</h3>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  <li>Understand user behavior</li>
                  <li>Analyze popular content</li>
                  <li>Track platform performance</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Sharing and Disclosure</h2>
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">We Do Not Sell Your Data</h3>
              <p className="text-yellow-700 mb-4">
                NewsPortal does not sell, trade, or rent your personal information to third parties.
                We may share aggregated, anonymized data for analytical purposes.
              </p>

              <h4 className="font-semibold mb-2 text-yellow-800">Third-Party Services</h4>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                <li>NewsAPI.org - Our primary news data provider</li>
                <li>Analytics services (Google Analytics)</li>
                <li>Cloud hosting providers</li>
              </ul>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cookies and Tracking</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience
                and analyze website traffic.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="text-center p-4 bg-white rounded border">
                  <div className="text-2xl mb-2"></div>
                  <h4 className="font-semibold text-gray-800">🍪 Essential Cookies</h4>
                  <p className="text-sm text-gray-600 mt-2">Required for basic functionality</p>
                </div>

                <div className="text-center p-4 bg-white rounded border">
                  <div className="text-2xl mb-2"></div>
                  <h4 className="font-semibold text-gray-800">📊 Analytics Cookies</h4>
                  <p className="text-sm text-gray-600 mt-2">Help us improve our service</p>
                </div>

                <div className="text-center p-4 bg-white rounded border">
                  <div className="text-2xl mb-2"></div>
                  <h4 className="font-semibold text-gray-800">⚙️ Preference Cookies</h4>
                  <p className="text-sm text-gray-600 mt-2">Remember your settings</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Security</h2>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-start mb-4">
                <div className="text-2xl mr-4"></div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">🔒 We Protect Your Information</h3>
                  <p className="text-green-700">
                    We implement appropriate security measures to protect against unauthorized access,
                    alteration, disclosure, or destruction of your personal information.
                  </p>
                </div>
              </div>

              <ul className="list-disc list-inside space-y-2 text-green-700 ml-10">
                <li>SSL encryption for data transmission</li>
                <li>Regular security assessments</li>
                <li>Limited access to personal data</li>
                <li>Secure server infrastructure</li>
              </ul>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Rights</h2>
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <p className="text-purple-700 mb-4">
                You have the right to control your personal information. As a user of NewsPortal, you can:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside space-y-2 text-purple-700">
                  <li>Access your personal data</li>
                  <li>Request data correction</li>
                  <li>Opt-out of analytics tracking</li>
                </ul>
                <ul className="list-disc list-inside space-y-2 text-purple-700">
                  <li>Delete your account data</li>
                  <li>Export your information</li>
                  <li>Withdraw consent</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <p className="text-blue-700 mb-4">
                If you have any questions about this Privacy Policy or how we handle your data,
                please contact us:
              </p>

              <div className="space-y-2 text-blue-700">
                <p>📧 Email: shuvajitpal103@gmail.com</p>
                <p>🌐 Website: XXXXXX</p>
                <p>📝 Address: #####</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Policy Updates</h2>
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="text-gray-700 mt-2 font-semibold">
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-4">
              <div>
                <Link
                  href="/"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
              <div>
                <Link
                  href="/api-source"
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  API Sources
                </Link>
              </div>
              <div>
                <Link
                  href="#"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
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