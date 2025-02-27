'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setError('');
    }, 500);
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl overflow-hidden border border-amber-100 shadow-md p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-2 text-amber-900">Stay Updated</h2>
      <p className="text-sm text-amber-800 mb-4">
        Get the latest African music news and updates delivered to your inbox.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-4 w-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Your email address"
                className="w-full bg-white border border-amber-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Subscribe Now
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg p-4 text-center"
        >
          <CheckCircle className="text-green-500 h-8 w-8 mx-auto mb-2" />
          <h3 className="font-medium text-gray-900">Thank You!</h3>
          <p className="text-sm text-gray-600 mt-1">
            You've successfully subscribed to our newsletter.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
