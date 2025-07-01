'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Eye, EyeOff, User2, School, Shield } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

const roles = ['Student', 'Teacher', 'Admin'] as const;
type Role = typeof roles[number];

const inputVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const particleVariants: Variants = {
  initial: { scale: 0, opacity: 0, x: 0, y: 0 },
  animate: (i: number) => ({
    scale: 1,
    opacity: [0, 0.5, 0],
    x: Math.cos(i * (Math.PI / 3)) * 20,
    y: Math.sin(i * (Math.PI / 3)) * 20,
    transition: { duration: 0.6, delay: i * 0.05, ease: 'ease-out' },
  }),
};

const logoTransitionVariants: Variants = {
  initial: { scale: 0, opacity: 0, rotate: 0 },
  animate: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  expand: {
    scale: 3,
    opacity: 1,
    rotate: 360,
    transition: { duration: 1.2, ease: [0.6, 0, 0.4, 1] },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('Student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    setLoading(true);
    setIsTransitioning(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the appropriate page
      const path = `/${role.toLowerCase()}`;
      router.push(path);
    } catch {
      setLoading(false);
      setIsTransitioning(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 py-8">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-5 animate-particle noise-bg" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-200/50 animate-slow-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 to-transparent animate-wave" />
        {/* Floating Particles - Reduced on mobile */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400/50 rounded-full"
            initial={{ x: `${(i % 4) * 25}%`, y: '100%' }}
            animate={{
              y: '-100%',
              opacity: [0, 0.3, 0],
              x: `${(i % 4) * 25}%`,
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
            style={{ left: `${(i % 4) * 25}%` }}
          />
        ))}
        {/* Pulsating Background Logo - Smaller on mobile */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 6, ease: 'easeInOut' }}
        >
          <div className="relative w-[80vmin] h-[80vmin] sm:w-[60vmin] sm:h-[60vmin] md:w-[40vmin] md:h-[40vmin]">
            <Image
              src="/logonbg.png"
              alt="ArcaneAcademy Background Logo"
              fill
              className="object-contain opacity-30"
            />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Header Logo - Smaller on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30"
      >
        <div className="relative h-8 w-8 sm:h-12 sm:w-12">
          <Image
            src="/logonbg.png"
            alt="ArcaneAcademy Logo"
            fill
            className="object-contain"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

      {/* Logo Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-24 h-24"
              variants={logoTransitionVariants}
              initial="initial"
              animate="expand"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/logonbg.png"
                alt="ArcaneAcademy Transition Logo"
                fill
                className="object-contain"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-blue-400 rounded-full"
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                    x: Math.cos(i * (Math.PI / 3)) * 60,
                    y: Math.sin(i * (Math.PI / 3)) * 60,
                  }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  style={{ top: '50%', left: '50%' }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Form - Adjusted padding and width for mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-auto p-6 sm:p-8 bg-white/90 backdrop-blur-lg rounded-3xl border border-blue-200 shadow-2xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="relative mx-auto w-16 h-16 mb-4">
            <Image
              src="/logonbg.png"
              alt="ArcaneAcademy Logo"
              fill
              className="object-contain"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your ArcaneAcademy account</p>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          custom={0}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Role</label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((roleOption) => (
              <button
                key={roleOption}
                type="button"
                onClick={() => setRole(roleOption)}
                className={clsx(
                  'relative p-3 rounded-xl border-2 transition-all duration-300 font-medium text-sm',
                  role === roleOption
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'
                )}
              >
                <div className="flex flex-col items-center gap-1">
                  {roleOption === 'Student' && <User2 className="w-4 h-4" />}
                  {roleOption === 'Teacher' && <School className="w-4 h-4" />}
                  {roleOption === 'Admin' && <Shield className="w-4 h-4" />}
                  <span>{roleOption}</span>
                </div>
                {role === roleOption && (
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-500 rounded-xl"
                    layoutId="role-selection"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <motion.div
            custom={1}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-800 placeholder-gray-500"
                placeholder="Enter your username"
                required
              />
              <div className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none transition-colors duration-300 group-focus-within:border-blue-500" />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            custom={2}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-800 placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none transition-colors duration-300 group-focus-within:border-blue-500" />
            </div>
          </motion.div>

          {/* Login Button */}
          <motion.div
            custom={3}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              ref={buttonRef}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Demo Login Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
        >
          <p className="text-sm text-gray-600 text-center">
            <strong>Demo Credentials:</strong> Use any username/password to explore the platform
          </p>
        </motion.div>
      </motion.div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes particle {
          0% {
            transform: translateY(0);
            opacity: 0.05;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-10px);
            opacity: 0.05;
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
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-particle {
          animation: particle 8s ease-in-out infinite;
        }
        .animate-slow-pulse {
          animation: slow-pulse 12s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 20s linear infinite;
        }
      `}</style>
    </div>
  );
}