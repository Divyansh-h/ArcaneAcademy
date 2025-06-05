'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, LineChart, Shield, User, Code, Play, LogIn, Sparkles, Zap, FileText, Edit, Lock, DollarSign } from 'lucide-react';
import SplashScreen from '../components/SplashScreen';

export default function Home() {
  const router = useRouter();
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const features = [
    {
      icon: <FileText className="w-12 h-12 text-white" />,
      title: 'Assignment Submission',
      description: 'Students can submit assignments securely with IPFS and blockchain verification.'
    },
    {
      icon: <Edit className="w-12 h-12 text-white" />,
      title: 'Online Grading',
      description: 'Teachers grade assignments and exams online with canvas-based annotations.'
    },
    {
      icon: <Lock className="w-12 h-12 text-white" />,
      title: 'Blockchain Security',
      description: 'Solana-powered immutability for submissions, grades, and rechecking requests.'
    },
    {
      icon: <DollarSign className="w-12 h-12 text-white" />,
      title: 'Rechecking Payments',
      description: 'Students pay for rechecking using fast, low-cost Solana transactions.'
    }
  ];

  const demoOptions = [
    {
      title: 'Student Portal',
      icon: <User className="w-12 h-12 text-white" />,
      description: 'Experience the student dashboard with live demo data',
      path: '/student',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Teacher Portal',
      icon: <BookOpen className="w-12 h-12 text-white" />,
      description: 'Explore teacher tools with sample classes and students',
      path: '/teacher',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Admin Panel',
      icon: <Code className="w-12 h-12 text-white" />,
      description: 'Full system access with administrative controls',
      path: '/admin', // Fixed path from '/teacher' to '/admin'
      gradient: 'from-pink-500 to-red-600'
    }
  ];

  const handleDemoClick = (path: string) => {
    setDemoDialogOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-x"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 animate-pulse"></div>
      
      {/* Navigation */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 w-full flex items-center justify-between px-8 py-6 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="relative">
            <img src="/logonbg.png" alt="Logo" className="h-12 w-12 object-contain" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30"></div>
          </div>
          <span className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
            ArcaneAcademy
          </span>
        </motion.div>
        
        <div className="flex gap-4">
          <motion.button
            onClick={() => setDemoDialogOpen(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-black text-white text-lg tracking-wide shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <Play className="w-5 h-5" />
              <span>TRY DEMO</span>
            </div>
          </motion.button>
          
          <motion.button
            onClick={() => router.push('/login')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3 overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-black text-white text-lg tracking-wide hover:bg-white/20 transition-all duration-300"
          >
            <div className="relative flex items-center gap-3">
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
                <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                    SMART
                  </span>
                  <br />
                  <span className="text-white">
                    EDUCATION
                  </span>
                </h1>
                <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                  Empower learning with Smart AI-based grading, assignment management, and secure rechecking.
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
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-black text-xl text-white tracking-wide shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    <span>GET STARTED</span>
                  </div>
                </motion.button>
                
                <motion.button
                  onClick={() => setDemoDialogOpen(true)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full font-black text-xl text-white tracking-wide hover:bg-white/20 hover:border-white/40 transition-all duration-300"
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <Image
                  src="/logonbg.png"
                  alt="ArcaneAcademy Logo"
                  fill
                  className="object-contain relative z-10"
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
              <h2 className="text-5xl font-black text-white mb-6">
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">{feature.title}</h3>
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
                  className="bg-white/10 backdrop-blur-xl rounded-3xl w-full max-w-4xl mx-6 p-8 border border-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white mb-4">CHOOSE YOUR DEMO</h2>
                    <p className="text-xl text-gray-400">Experience different perspectives of our platform</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {demoOptions.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`group relative p-8 bg-gradient-to-br ${option.gradient} rounded-2xl cursor-pointer overflow-hidden`}
                        onClick={() => handleDemoClick(option.path)}
                      >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        <div className="relative text-center">
                          <div className="mb-6 flex justify-center">
                            <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                              {option.icon}
                            </div>
                          </div>
                          <h3 className="text-2xl font-black text-white mb-4">{option.title}</h3>
                          <p className="text-white/80 leading-relaxed">{option.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-10 text-center">
                    <motion.button
                      onClick={() => setDemoDialogOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-bold text-white hover:bg-white/20 transition-all duration-300"
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

      {/* MODIFIED CSS FOR ANIMATED BACKGROUND */}
      <style jsx>{`
        @keyframes gradient-x {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 6s ease forwards;
        }
      `}</style>
    </>
  );
}