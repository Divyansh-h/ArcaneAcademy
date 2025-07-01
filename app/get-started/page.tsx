'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Sparkles, LineChart, LogIn, Play, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

const steps = [
  {
    label: 'Your Role',
    description: 'Choose your primary role to tailor your ArcaneAcademy experience.',
    icon: <User className="w-5 h-5 text-blue-500" />,
    content: [
      {
        title: 'Student Portal',
        description: 'Access grades, track progress, and view performance with real-time updates.',
        icon: <User className="w-8 h-8 text-blue-500" />,
      },
      {
        title: 'Teacher Dashboard',
        description: 'Manage grades, check submissions, and analyze class performance.',
        icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      },
    ],
  },
  {
    label: 'Key Features',
    description: 'Discover the powerful capabilities of our smart grading system.',
    icon: <Sparkles className="w-5 h-5 text-blue-500" />,
    content: [
      {
        title: 'Smart Grading',
        description: 'AI-powered grade management with automatic CGPA calculation.',
        icon: <Sparkles className="w-8 h-8 text-blue-500" />,
      },
      {
        title: 'Analytics Dashboard',
        description: 'Visualize analytics, track progress, and gain insights.',
        icon: <LineChart className="w-8 h-8 text-blue-500" />,
      },
      {
        title: 'Real-time Updates',
        description: 'Live progress tracking with instant notifications.',
        icon: <Zap className="w-8 h-8 text-blue-500" />,
      },
    ],
  },
  {
    label: 'Ready to Start?',
    description: 'Login or explore with a demo.',
    icon: <LogIn className="w-5 h-5 text-blue-500" />,
    content: [
      {
        title: 'Login Now',
        description: 'Securely access your ArcaneAcademy account.',
        icon: <LogIn className="w-8 h-8 text-blue-500" />,
        path: '/login',
        actionType: 'login',
      },
      {
        title: 'Try Live Demo',
        description: 'Explore the system with sample data.',
        icon: <Play className="w-8 h-8 text-blue-500" />,
        path: '/student',
        actionType: 'demo',
      },
    ],
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleAction = (item) => {
    if (item.path) router.push(item.path);
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-inter">
      {/* Logo in Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4 z-20"
      >
        <div className="relative h-10 w-10">
          <Image
            src="/logonbg.png"
            alt="ArcaneAcademy Logo"
            fill
            className="object-contain"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl mx-4 bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Get Started with ArcaneAcademy
          </h1>
          <p className="text-base text-gray-600 max-w-lg mx-auto">
            Follow these steps to begin your journey with our smart grading platform.
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {steps.map((step, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200',
                activeStep === index
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              {step.icon}
              {step.label}
            </motion.button>
          ))}
        </div>

        {/* Step Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-8 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
              {steps[activeStep].label}
            </h2>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              {steps[activeStep].description}
            </p>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps[activeStep].content.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAction(item)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  className="p-5 bg-white rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors duration-200 text-gray-800 flex flex-col items-center text-center"
                >
                  <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex gap-3 justify-center mt-8">
          <motion.button
            onClick={handleBack}
            disabled={activeStep === 0}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 border border-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          {activeStep < steps.length - 1 && (
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}