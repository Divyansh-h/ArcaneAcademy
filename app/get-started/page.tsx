
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Sparkles, LineChart, LogIn, Play, Zap, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface StepContentItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: string;
  actionType?: 'login' | 'demo';
}

interface WizardStep {
  label: string;
  description: string;
  icon: React.ReactNode;
  content: StepContentItem[];
}

const steps: WizardStep[] = [
  {
    label: 'Your Role',
    description: 'Choose your primary role to tailor your ArcaneAcademy experience.',
    icon: <User className="w-6 h-6 text-gray-200" />,
    content: [
      {
        title: 'Student Portal',
        description: 'Access your grades, track progress, and view academic performance with real-time updates.',
        icon: <User className="w-12 h-12 text-gray-200" />,
      },
      {
        title: 'Teacher Dashboard',
        description: 'Manage grades, check submissions, and analyze class performance with advanced tools.',
        icon: <BookOpen className="w-12 h-12 text-gray-200" />,
      },
    ],
  },
  {
    label: 'Key Features',
    description: 'Discover the powerful capabilities of our smart grading system.',
    icon: <Sparkles className="w-6 h-6 text-gray-200" />,
    content: [
      {
        title: 'Smart Grading',
        description: 'AI-powered grade management with automatic CGPA calculation and insights.',
        icon: <Sparkles className="w-12 h-12 text-gray-200" />,
      },
      {
        title: 'Analytics Dashboard',
        description: 'Visualize detailed analytics, track progress, and gain performance insights.',
        icon: <LineChart className="w-12 h-12 text-gray-200" />,
      },
      {
        title: 'Real-time Updates',
        description: 'Experience live progress tracking with instant notifications and data synchronization.',
        icon: <Zap className="w-12 h-12 text-gray-200" />,
      },
    ],
  },
  {
    label: 'Ready to Start?',
    description: 'Login to your existing account or explore with a demo.',
    icon: <LogIn className="w-6 h-6 text-gray-200" />,
    content: [
      {
        title: 'Login Now',
        description: 'Securely access your personalized ArcaneAcademy account.',
        icon: <LogIn className="w-12 h-12 text-gray-200" />,
        path: '/login',
        actionType: 'login',
      },
      {
        title: 'Try Live Demo',
        description: 'Explore the system with sample data and features.',
        icon: <Play className="w-12 h-12 text-gray-200" />,
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

  const contentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95, rotateX: -10 },
    visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, scale: 0.95, rotateX: 10, transition: { duration: 0.4, ease: 'easeIn' } },
  };

  const particleVariants = {
    initial: { scale: 0, opacity: 0, x: 0, y: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: [0, 0.6, 0],
      x: Math.cos(i * Math.PI / 4) * 60,
      y: Math.sin(i * Math.PI / 4) * 60,
      transition: {
        duration: 1,
        delay: i * 0.05,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-10 animate-particle z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black animate-slow-pulse z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-gray-800/20 to-transparent animate-wave z-0"></div>
      {/* Pulsating Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center z-0">
        <motion.div
          className="relative w-[60vmin] h-[60vmin] md:w-[40vmin] md:h-[40vmin]"
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 6,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/logonbg.png"
            alt="ArcaneAcademy Background Logo"
            fill
            className="object-contain filter grayscale brightness-150 opacity-50"
          />
          <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-3xl animate-pulse"></div>
        </motion.div>
      </div>

      {/* Logo in Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-6 left-6 z-20"
      >
        <div className="relative h-12 w-12">
          <Image
            src="/logonbg.png"
            alt="ArcaneAcademy Logo"
            fill
            className="object-contain filter grayscale brightness-150"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gray-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl mx-auto bg-black/50 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 md:p-12"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-4 tracking-tight">
            Get Started with ArcaneAcademy
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto font-mono">
            Follow these simple steps to begin your journey with our smart grading platform.
          </p>
        </div>

        {/* Stepper Navigation (Tabs) */}
        <div className="flex justify-center flex-wrap gap-4 mb-12 relative">
          <motion.div
            className="absolute bottom-0 h-1 bg-gray-400 rounded-full"
            layoutId="underline"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <motion.button
                onClick={() => setActiveStep(idx)}
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeStep === idx
                    ? 'bg-gray-800 border border-gray-600 text-gray-200'
                    : 'bg-black/50 text-gray-400 hover:bg-gray-900/70'
                }`}
              >
                <motion.div
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50"
                  initial={false}
                  animate={{
                    backgroundColor: activeStep === idx ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    borderColor: activeStep === idx ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                    scale: activeStep === idx ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {activeStep > idx ? (
                    <CheckCircle className="w-5 h-5 text-gray-200" />
                  ) : (
                    step.icon
                  )}
                </motion.div>
                <span className="font-semibold text-sm md:text-base">{step.label}</span>
              </motion.button>
            </div>
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
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-100 mb-4">
              {steps[activeStep].label}
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto font-mono">
              {steps[activeStep].description}
            </p>

            {/* Dynamic Content Cards */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
              {steps[activeStep].content.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAction(item)}
                  initial={{ opacity: 0, y: 20, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -8, scale: 1.02, rotateX: 5, boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 p-6 md:p-8 rounded-2xl bg-gray-800/50 border border-gray-700 text-gray-200 shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-gray-900/70 relative overflow-hidden"
                >
                  {/* Particle Burst on Hover */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gray-400 rounded-full"
                      variants={particleVariants}
                      initial="initial"
                      whileHover="animate"
                      custom={i}
                    />
                  ))}
                  <div className="mb-4 p-3 rounded-full bg-gray-700/50 backdrop-blur-sm">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400 font-mono">{item.description}</p>
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
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/50 text-gray-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-900/70 border border-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          {activeStep < steps.length - 1 && (
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)', backgroundColor: '#333333' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 text-gray-200 font-bold border border-gray-600 transition-all duration-300"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Inline Styles */}
      <style jsx>{`
        /* Animation Keyframes */
        @keyframes particle {
          0% {
            transform: translateY(0);
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            transform: translateY(-10px);
            opacity: 0.1;
          }
        }

        @keyframes slow-pulse {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.8;
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(-100%);
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(100%);
            opacity: 0.2;
          }
        }

        /* Animation Classes */
        .animate-particle {
          animation: particle 8s ease-in-out infinite;
        }

        .animate-slow-pulse {
          animation: slow-pulse 12s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 6s ease-in-out infinite;
        }

        /* Base Styles */
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #000000;
          color: #e5e5e5;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .font-mono {
          font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Monaco, Consolas, monospace;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #4b4b4b;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #666666;
        }
      `}</style>
    </div>
  );
}
