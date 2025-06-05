'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Sparkles, LineChart, Code, LogIn, Play, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'; // Added ArrowLeft, ArrowRight, CheckCircle

// Define the structure for each step's content item
interface StepContentItem {
  title: string;
  description: string;
  icon: JSX.Element;
  gradient: string; // Tailwind CSS gradient classes
  path?: string; // Optional path for direct navigation on final step
  actionType?: 'login' | 'demo'; // Optional action type for final step
}

// Define the structure for each step in the wizard
interface WizardStep {
  label: string;
  description: string;
  icon: JSX.Element;
  content: StepContentItem[];
}

// Data for the wizard steps
const steps: WizardStep[] = [
  {
    label: "Your Role",
    description: "Choose your primary role to tailor your Evalis experience.",
    icon: <User className="w-6 h-6" />, // Smaller icon for tab
    content: [
      {
        title: "Student Portal",
        description: "Access your grades, track progress, and view academic performance with real-time updates.",
        icon: <User className="w-12 h-12 text-white" />,
        gradient: "from-blue-600 to-purple-700",
      },
      {
        title: "Teacher Dashboard",
        description: "Manage grades, check submissions, and analyze class performance with advanced tools.",
        icon: <BookOpen className="w-12 h-12 text-white" />,
        gradient: "from-purple-600 to-pink-700",
      },
    ],
  },
  {
    label: "Key Features",
    description: "Discover the powerful capabilities of our smart grading system.",
    icon: <Sparkles className="w-6 h-6" />,
    content: [
      {
        title: "Smart Grading",
        description: "AI-powered grade management with automatic CGPA calculation and insights.",
        icon: <Sparkles className="w-12 h-12 text-white" />,
        gradient: "from-green-600 to-blue-700",
      },
      {
        title: "Analytics Dashboard",
        description: "Visualize detailed analytics, track progress, and gain performance insights.",
        icon: <LineChart className="w-12 h-12 text-white" />,
        gradient: "from-orange-600 to-red-700",
      },
      {
        title: "Real-time Updates",
        description: "Experience live progress tracking with instant notifications and data synchronization.",
        icon: <Zap className="w-12 h-12 text-white" />,
        gradient: "from-yellow-600 to-amber-700", // Added new feature
      },
    ],
  },
  {
    label: "Ready to Start?",
    description: "Login to your existing account or explore with a demo.",
    icon: <LogIn className="w-6 h-6" />,
    content: [
      {
        title: "Login Now",
        description: "Securely access your personalized Evalis account.",
        icon: <LogIn className="w-12 h-12 text-white" />,
        gradient: "from-blue-700 to-indigo-800",
        path: "/login",
        actionType: "login",
      },
      {
        title: "Try Live Demo",
        description: "Explore the system with sample data and features.",
        icon: <Play className="w-12 h-12 text-white" />,
        gradient: "from-purple-700 to-fuchsia-800",
        path: "/student", // Direct to student portal for demo as per page.tsx
        actionType: "demo",
      },
    ],
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleAction = (item: StepContentItem) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  // Variants for step content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.4, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Animated background overlays - Now directly using the primary gradient with animation */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-x z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 animate-pulse z-0" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: "radial-gradient(circle at 70% 30%, rgba(168,85,247,0.15) 0, transparent 70%)"}} />
      
      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient-x-text">
            Get Started with Evalis
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto font-light">
            Follow these simple steps to begin your journey with our smart grading platform.
          </p>
        </div>

        {/* Stepper Navigation (Tabs) */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {steps.map((step, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveStep(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeStep === idx
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <motion.div
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                initial={false} // Prevents initial animation on mount
                animate={{
                  backgroundColor: activeStep === idx ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                  borderColor: activeStep === idx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                }}
                transition={{ duration: 0.3 }}
              >
                {activeStep > idx ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  step.icon
                )}
              </motion.div>
              <span className="font-semibold text-sm md:text-base">{step.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Step Content Area with AnimatePresence */}
        <AnimatePresence mode="wait"> {/* 'wait' mode ensures one component exits before the next enters */}
          <motion.div
            key={activeStep} // Essential for AnimatePresence to detect content change
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {steps[activeStep].label}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              {steps[activeStep].description}
            </p>
            
            {/* Dynamic Content Cards */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch"> {/* items-stretch for equal height cards */}
              {steps[activeStep].content.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAction(item)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-xl flex flex-col items-center justify-center text-left transform transition-all duration-300`}
                >
                  <div className="mb-4 p-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-white/90 text-center">{item.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex gap-4 justify-center mt-10">
          <motion.button
            onClick={handleBack}
            disabled={activeStep === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          {activeStep < steps.length - 1 ? (
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-lg transition-all duration-300 hover:shadow-purple-500/25"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            // Render only if on the last step and show no "Next" button
            <div className="flex gap-4">
              {/* Optional: Add a "Finished" button or simply let the cards be the final actions */}
              {/* If you want a clear "Finish" button that does nothing but confirm, add it here */}
            </div>
          )}
        </div>
      </motion.div>

      {/* Custom CSS for background and text gradient animations */}
      <style jsx>{`
        /* Background Gradient Animation */
        @keyframes gradient-x {
          0% {
            transform: translateX(0%);
          }
          100% { /* Changed from 50% to 100% for full cycle */
            transform: translateX(100%);
          }
        }
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 6s ease forwards; /* Removed infinite, added forwards */
        }

        /* Text Gradient Animation (already present) */
        @keyframes gradient-x-text {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x-text {
          background-size: 200% auto;
          animation: gradient-x-text 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}