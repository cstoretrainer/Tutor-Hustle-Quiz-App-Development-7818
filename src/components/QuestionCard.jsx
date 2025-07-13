import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalculator, FiBookOpen, FiZap, FiTarget, FiHelpCircle } = FiIcons;

const iconMap = {
  Calculator: FiCalculator,
  BookOpen: FiBookOpen,
  Zap: FiZap,
  Target: FiTarget,
  HelpCircle: FiHelpCircle
};

const QuestionCard = ({ question, answer, onAnswer }) => {
  const handleSliderChange = (e) => {
    onAnswer(question.id, parseInt(e.target.value));
  };

  const handleOptionClick = (value) => {
    if (question.type === 'multiple') {
      const currentAnswers = Array.isArray(answer) ? answer : [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(a => a !== value)
        : [...currentAnswers, value];
      onAnswer(question.id, newAnswers);
    } else {
      onAnswer(question.id, value);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
        {question.question}
      </h2>

      {question.type === 'slider' && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Not confident</span>
            <span>Very confident</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={question.min}
              max={question.max}
              step={question.step}
              value={answer || 5}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              {Array.from({ length: question.max }, (_, i) => i + 1).map(num => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-primary-600">
              {answer || 5}
            </span>
          </div>
        </div>
      )}

      {(question.type === 'single' || question.type === 'multiple') && (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = question.type === 'multiple' 
              ? Array.isArray(answer) && answer.includes(option.value)
              : answer === option.value;

            return (
              <motion.button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center space-x-3 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {option.icon && (
                  <SafeIcon 
                    icon={iconMap[option.icon]} 
                    className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} 
                  />
                )}
                <span className="font-medium">{option.label}</span>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;