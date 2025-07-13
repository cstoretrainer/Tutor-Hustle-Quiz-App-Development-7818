import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [quizData, setQuizData] = useState({});

  const handleStartQuiz = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (data) => {
    setQuizData(data);
    setCurrentScreen('results');
  };

  const handleRestart = () => {
    setQuizData({});
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeScreen onStart={handleStartQuiz} />
          </motion.div>
        )}
        
        {currentScreen === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuizScreen onComplete={handleQuizComplete} />
          </motion.div>
        )}
        
        {currentScreen === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ResultsScreen data={quizData} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;