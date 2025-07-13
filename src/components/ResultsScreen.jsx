import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiTrendingUp, FiBookOpen, FiDollarSign, FiUsers, FiRefreshCw } = FiIcons;

const ResultsScreen = ({ data, onRestart }) => {
  const calculateReadinessScore = () => {
    let score = 0;
    
    // Subject expertise
    const subjects = data[1] || [];
    if (Array.isArray(subjects)) {
      if (subjects.includes('none')) score += 0;
      else score += Math.min(subjects.length * 15, 25);
    } else if (subjects !== 'none') {
      score += 20;
    }
    
    // Confidence
    const confidence = data[2] || 5;
    score += confidence * 2;
    
    // Experience helping others
    const experience = data[3];
    if (experience === 'often') score += 25;
    else if (experience === 'sometimes') score += 15;
    else score += 5;
    
    // Time commitment
    const time = data[5];
    if (time === '10+') score += 15;
    else if (time === '7-10') score += 12;
    else if (time === '4-6') score += 8;
    else score += 5;
    
    // Motivation
    const motivation = data[6];
    if (motivation === 'all-above') score += 15;
    else score += 10;
    
    return Math.min(score, 100);
  };

  const getReadinessLevel = (score) => {
    if (score >= 80) return { level: 'Ready to Launch!', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 60) return { level: 'Almost There!', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Getting Started', color: 'text-blue-600', bg: 'bg-blue-50' };
  };

  const getActionPlan = (score, data) => {
    const actions = [];
    
    if (score >= 80) {
      actions.push({
        title: 'Start Marketing Yourself',
        description: 'Create profiles on tutoring platforms like Wyzant, Tutor.com, or Varsity Tutors',
        icon: FiUsers
      });
      actions.push({
        title: 'Set Your Rates',
        description: 'Research local tutoring rates and price yourself competitively ($15-30/hour)',
        icon: FiDollarSign
      });
    } else if (score >= 60) {
      actions.push({
        title: 'Practice Teaching',
        description: 'Offer free sessions to friends or family to build confidence',
        icon: FiBookOpen
      });
      actions.push({
        title: 'Identify Your Niche',
        description: 'Focus on 1-2 subjects you excel at most',
        icon: FiStar
      });
    } else {
      actions.push({
        title: 'Build Subject Expertise',
        description: 'Strengthen your knowledge in subjects you want to tutor',
        icon: FiTrendingUp
      });
      actions.push({
        title: 'Start Small',
        description: 'Help classmates or younger students informally first',
        icon: FiUsers
      });
    }
    
    return actions;
  };

  const score = calculateReadinessScore();
  const readiness = getReadinessLevel(score);
  const actionPlan = getActionPlan(score, data);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiStar} className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Tutoring Readiness
          </h1>
          <div className={`inline-block px-4 py-2 rounded-full ${readiness.bg} ${readiness.color} font-semibold`}>
            {readiness.level}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-primary-600 mb-2">
              {score}%
            </div>
            <p className="text-gray-600">
              {score >= 80 
                ? "You're ready to start tutoring professionally!" 
                : score >= 60 
                ? "You're on the right track - just need a few more steps!"
                : "Great potential - let's build your tutoring foundation!"
              }
            </p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-primary-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Action Plan
          </h2>
          <div className="space-y-4">
            {actionPlan.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <SafeIcon icon={action.icon} className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
            <span>Take Quiz Again</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsScreen;