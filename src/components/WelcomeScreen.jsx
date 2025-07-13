import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBook, FiTarget, FiArrowRight } = FiIcons;

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.4 
          }}
        >
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiBook} className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Could You Score That{' '}
          <span className="text-primary-600">Tutoring Gig?</span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Answer 6 quick questions to find out if you're ready to launch your tutoring hustle.
        </motion.p>

        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <SafeIcon icon={FiTarget} className="w-5 h-5" />
            <span className="text-sm">Takes less than 3 minutes</span>
          </div>
        </motion.div>

        <motion.button
          onClick={onStart}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-lg">Start Quiz</span>
          <SafeIcon 
            icon={FiArrowRight} 
            className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;