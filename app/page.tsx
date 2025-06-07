'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, User, Code, Play, LogIn, Sparkles, FileText, Edit, Lock, DollarSign } from 'lucide-react';
import SplashScreen from './components/SplashScreen';

export default function Home() {
  const router = useRouter();
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const features = [
    {
      icon: <FileText className="w-12 h-12 text-gray-200" />,
      title: 'Assignment Submission',
      description: 'Students can submit assignments securely with IPFS and blockchain verification.',
    },
    {
      icon: <Edit className="w-12 h-12 text-gray-200" />,
      title: 'Online Grading',
      description: 'Teachers grade assignments and exams online with canvas-based annotations.',
    },
    {
      icon: <Lock className="w-12 h-12 text-gray-200" />,
      title: 'Blockchain Security',
      description: 'Solana-powered immutability for submissions, grades, and rechecking requests.',
    },
    {
      icon: <DollarSign className="w-12 h-12 text-gray-200" />,
      title: 'Rechecking Payments',
      description: 'Students pay for rechecking using fast, low-cost Solana transactions.',
    },
  ];

  const demoOptions = [
    {
      title: 'Student Portal',
      icon: <User className="w-12 h-12 text-gray-200" />,
      description: 'Experience the student dashboard with live demo data',
      path: '/student',
    },
    {
      title: 'Teacher Portal',
      icon: <BookOpen className="w-12 h-12 text-gray-200" />,
      description: 'Explore teacher tools with sample classes and students',
      path: '/teacher',
    },
    {
      title: 'Admin Panel',
      icon: <Code className="w-12 h-12 text-gray-200" />,
      description: 'Full system access with administrative controls',
      path: '/admin',
    },
  ];

  const handleDemoClick = (path: string) => {
    setDemoDialogOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Animated Particle Background */}
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-particle"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-slow-pulse"></div>
      </div>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-50 w-full flex items-center justify-between px-8 py-6 backdrop-blur-lg bg-black/50 border-b border-gray-700"
      >
        <motion.div
          className="flex items-center gap-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <div className="relative h-12 w-12">
            <Image src="/logonbg.png" alt="Logo" fill className="object-contain filter grayscale brightness-150" />
            <div className="absolute inset-0 bg-gray-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
          </div>
          <span className="text-3xl font-extrabold text-gray-100 tracking-tight font-sans">
            ArcaneAcademy
          </span>
        </motion.div>

        <div className="flex gap-4">
          <motion.button
            onClick={() => setDemoDialogOpen(true)}
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 bg-gray-800 border border-gray-600 rounded-2xl font-bold text-gray-200 text-lg tracking-wide hover:bg-gray-700 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5" />
              <span>TRY DEMO</span>
            </div>
          </motion.button>

          <motion.button
            onClick={() => router.push('/login')}
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-2xl font-bold text-gray-200 text-lg tracking-wide hover:bg-gray-900 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <LogIn className="w-5 h-5" />
              <span>LOGIN</span>
            </div>
          </motion.button>
        </div>
      </motion.header>

      <SplashScreen onComplete={() => setIsLoading(false)} duration={2500} />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative min-h-screen"
        >
          {/* Hero Section */}
          <div className="relative z-10 max-w-7xl mx-auto pt-32 pb-20 px-6">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-none text-gray-100 font-sans">
                  SMART
                  <br />
                  EDUCATION
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                  Empower learning with AI-based grading, assignment management, and secure rechecking.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              >
                <motion.button
                  onClick={() => router.push('/get-started')}
                  whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-12 py-4 bg-gray-800 border-2 border-gray-500 rounded-full font-bold text-xl text-gray-200 tracking-wide hover:bg-gray-700 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    <span>GET STARTED</span>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setDemoDialogOpen(true)}
                  whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-black/50 backdrop-blur-sm border-2 border-gray-600 rounded-full font-bold text-xl text-gray-200 tracking-wide hover:bg-gray-900 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-6 h-6" />
                    <span>WATCH DEMO</span>
                  </div>
                </motion.button>
              </motion.div>

              {/* Logo Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="relative mx-auto w-80 h-80 mb-20"
              >
                <div className="absolute inset-0 bg-gray-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <Image
                  src="/logonbg.png"
                  alt="ArcaneAcademy Logo"
                  fill
                  className="object-contain relative z-10 filter grayscale brightness-150"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* Features Section */}
          <div className="relative z-10 max-w-7xl mx-auto py-20 px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-extrabold text-gray-100 mb-6 font-sans">
                Redefining Academia
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need for modern academic management with blockchain
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02, boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
                  className="group relative p-8 bg-black/50 backdrop-blur-lg border border-gray-700 rounded-3xl hover:bg-gray-900/70 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gray-800/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="mb-6 p-4 bg-gray-800 rounded-2xl">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-100 mb-4 font-sans">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Demo Dialog */}
          <AnimatePresence>
            {demoDialogOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setDemoDialogOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/50 backdrop-blur-lg rounded-3xl w-full max-w-4xl mx-6 p-8 border border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-100 mb-4 font-sans">CHOOSE YOUR DEMO</h2>
                    <p className="text-xl text-gray-400">Experience different perspectives of our platform</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {demoOptions.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                        className="group relative p-8 bg-gray-800/50 rounded-2xl cursor-pointer border border-gray-600 hover:bg-gray-900/70 transition-all duration-300"
                        onClick={() => handleDemoClick(option.path)}
                      >
                        <div className="relative text-center">
                          <div className="mb-6 flex justify-center">
                            <div className="p-4 bg-gray-700/50 rounded-xl backdrop-blur-sm">
                              {option.icon}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-100 mb-4 font-sans">{option.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{option.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 text-center">
                    <motion.button
                      onClick={() => setDemoDialogOpen(false)}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-full font-bold text-gray-200 hover:bg-gray-900 transition-all duration-300"
                    >
                      CLOSE
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* CSS for Animated Background */}
      <style jsx>{`
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
        .animate-particle {
          animation: particle 8s ease-in-out infinite;
        }
        .animate-slow-pulse {
          animation: slow-pulse 12s ease-in-out infinite;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
    </>
  );
}