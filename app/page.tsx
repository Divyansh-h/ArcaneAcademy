'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, User, Code, Play, LogIn, Sparkles, FileText, Edit, Lock, DollarSign } from 'lucide-react';
import SplashScreen from './components/SplashScreen';

export default function Home() {
  const router = useRouter();
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Optimize splash screen duration
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <FileText className="w-10 h-10 text-blue-500" />,
      title: 'Assignment Submission',
      description: 'Securely submit assignments with IPFS and blockchain verification.',
    },
    {
      icon: <Edit className="w-10 h-10 text-green-500" />,
      title: 'Online Grading',
      description: 'Grade assignments with intuitive canvas-based annotations.',
    },
    {
      icon: <Lock className="w-10 h-10 text-purple-500" />,
      title: 'Blockchain Security',
      description: 'Solana-powered immutability for submissions and grades.',
    },
    {
      icon: <DollarSign className="w-10 h-10 text-orange-500" />,
      title: 'Rechecking Payments',
      description: 'Fast, low-cost Solana-based rechecking payments.',
    },
  ];

  const demoOptions = [
    {
      title: 'Student Portal',
      icon: <User className="w-10 h-10 text-blue-500" />,
      description: 'Explore student dashboard with live demo data',
      path: '/student',
    },
    {
      title: 'Teacher Portal',
      icon: <BookOpen className="w-10 h-10 text-green-500" />,
      description: 'Access teacher tools with sample classes',
      path: '/teacher',
    },
    {
      title: 'Admin Panel',
      icon: <Code className="w-10 h-10 text-purple-500" />,
      description: 'Full system access with admin controls',
      path: '/admin',
    },
  ];

  const handleDemoClick = (path: string) => {
    setDemoDialogOpen(false);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-white/90 backdrop-blur-md shadow-sm"
      >
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="relative h-10 w-10">
            <Image src="/logonbg.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <span className="text-2xl font-bold text-gray-800">ArcaneAcademy</span>
        </motion.div>

        <div className="flex gap-3">
          <motion.button
            onClick={() => setDemoDialogOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Try Demo
          </motion.button>
          <motion.button
            onClick={() => router.push('/login')}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 border border-blue-200"
          >
            <LogIn className="w-5 h-5" />
            Login
          </motion.button>
        </div>
      </motion.header>

      <SplashScreen onComplete={() => setIsLoading(false)} duration={1500} />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto pt-24 pb-16 px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
            >
              Smart Education
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Empower learning with AI-based grading, assignment management, and secure rechecking.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <motion.button
                onClick={() => router.push('/get-started')}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Get Started
              </motion.button>
              <motion.button
                onClick={() => setDemoDialogOpen(true)}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 border border-blue-200"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative mx-auto w-64 h-64 mt-12"
            >
              <Image
                src="/logonbg.png"
                alt="ArcaneAcademy Logo"
                fill
                className="object-contain"
                priority
                loading="eager"
              />
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="max-w-7xl mx-auto py-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '-50px' }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Redefining Academia</h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Modern academic management powered by blockchain technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -5, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)' }}
                  className="p-6 bg-white/95 rounded-2xl border border-gray-100 hover:bg-white transition-colors duration-300"
                >
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Demo Dialog */}
          <AnimatePresence>
            {demoDialogOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                onClick={() => setDemoDialogOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/95 rounded-2xl w-full max-w-4xl mx-4 p-6 border border-gray-100 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Choose Your Demo</h2>
                    <p className="text-gray-600">Experience different perspectives of our platform</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {demoOptions.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)' }}
                        className="p-6 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors duration-200"
                        onClick={() => handleDemoClick(option.path)}
                      >
                        <div className="text-center">
                          <div className="mb-4 p-3 bg-white rounded-lg inline-block">
                            {option.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{option.title}</h3>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <motion.button
                      onClick={() => setDemoDialogOpen(false)}
                      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}