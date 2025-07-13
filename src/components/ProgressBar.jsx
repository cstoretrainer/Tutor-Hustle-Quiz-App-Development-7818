import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Question {current} of {total}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-primary-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;