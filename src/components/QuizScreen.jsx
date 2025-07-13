import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

const { FiArrowLeft, FiArrowRight, FiCheck } = FiIcons;

const questions = [
  {
    id: 1,
    question: "What subject(s) do people already ask you for help with?",
    type: "multiple",
    options: [
      { value: "math", label: "Math", icon: "Calculator" },
      { value: "reading", label: "Reading/Writing", icon: "BookOpen" },
      { value: "science", label: "Science", icon: "Zap" },
      { value: "testprep", label: "Test Prep (SAT, ACT, etc.)", icon: "Target" },
      { value: "none", label: "None yet", icon: "HelpCircle" }
    ]
  },
  {
    id: 2,
    question: "How confident are you explaining things in a simple way?",
    type: "slider",
    min: 1,
    max: 10,
    step: 1
  },
  {
    id: 3,
    question: "Do you already help younger students (siblings, neighbors, classmates)?",
    type: "single",
    options: [
      { value: "often", label: "Yes, often" },
      { value: "sometimes", label: "Sometimes" },
      { value: "not-yet", label: "Not yet" }
    ]
  },
  {
    id: 4,
    question: "What's your biggest concern about tutoring?",
    type: "single",
    options: [
      { value: "finding-students", label: "Finding students" },
      { value: "setting-rates", label: "Setting rates" },
      { value: "explaining-concepts", label: "Explaining concepts clearly" },
      { value: "managing-time", label: "Managing my time" },
      { value: "no-concerns", label: "No major concerns" }
    ]
  },
  {
    id: 5,
    question: "How much time could you realistically commit to tutoring per week?",
    type: "single",
    options: [
      { value: "1-3", label: "1-3 hours" },
      { value: "4-6", label: "4-6 hours" },
      { value: "7-10", label: "7-10 hours" },
      { value: "10+", label: "10+ hours" }
    ]
  },
  {
    id: 6,
    question: "What's your main motivation for tutoring?",
    type: "single",
    options: [
      { value: "earn-money", label: "Earn money" },
      { value: "help-others", label: "Help others succeed" },
      { value: "build-skills", label: "Build teaching skills" },
      { value: "college-apps", label: "Boost college applications" },
      { value: "all-above", label: "All of the above" }
    ]
  }
];

const QuizScreen = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsAnimating(false);
      }, 150);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];
  const isAnswered = currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== '';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-4 py-8">
        <div className="max-w-lg mx-auto">
          <ProgressBar 
            current={currentQuestion + 1} 
            total={questions.length} 
          />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="mt-8"
            >
              <QuestionCard
                question={currentQuestionData}
                answer={currentAnswer}
                onAnswer={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-sm text-gray-500">
            {currentQuestion + 1} of {questions.length}
          </div>

          <motion.button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
            whileHover={isAnswered ? { scale: 1.02 } : {}}
            whileTap={isAnswered ? { scale: 0.98 } : {}}
          >
            <span>
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </span>
            <SafeIcon 
              icon={currentQuestion === questions.length - 1 ? FiCheck : FiArrowRight} 
              className="w-4 h-4" 
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;