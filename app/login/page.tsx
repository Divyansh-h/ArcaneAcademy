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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black px-4 sm:px-6 py-8">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-particle" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-slow-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/20 to-transparent animate-wave" />
        {/* Floating Particles - Reduced on mobile */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-400/50 rounded-full"
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
              className="object-contain filter grayscale brightness-150 opacity-50"
            />
            <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-3xl animate-pulse" />
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
            className="object-contain filter grayscale brightness-150"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gray-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

      {/* Logo Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
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
                className="object-contain filter grayscale brightness-150"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gray-400/20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gray-200 rounded-full"
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
        className="relative z-20 w-full max-w-[95%] sm:max-w-md bg-black/70 backdrop-blur-lg p-6 sm:p-10 rounded-3xl border border-gray-700/50 shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-100 text-center mb-2 tracking-tight"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-gray-400 mb-6 sm:mb-8 font-mono text-xs sm:text-sm"
        >
          Login to access your ArcaneAcademy portal
        </motion.p>

        {/* Role Selection - Stack on mobile */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-6 sm:mb-8 relative">
          <motion.div
            className="absolute bottom-0 h-1 bg-gray-400 rounded-full"
            layoutId="role-underline"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {roles.map((r, i) => (
            <motion.button
              key={r}
              onClick={() => {
                setRole(r);
              }}
              custom={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                'relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full transition font-semibold text-xs sm:text-sm interactive-card',
                role === r
                  ? 'bg-gray-800 border border-gray-600 text-gray-200'
                  : 'bg-black/50 text-gray-400 hover:bg-gray-900/70'
              )}
            >
              {r === 'Student' && <User2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse-slow" />}
              {r === 'Teacher' && <School className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse-slow" />}
              {r === 'Admin' && <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse-slow" />}
              {r}
            </motion.button>
          ))}
        </div>

        {/* Form - Adjusted input sizes for mobile */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
            <label className="block mb-1 text-xs sm:text-sm font-semibold text-gray-300 font-mono">
              Email / Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-800/50 text-gray-200 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-500 text-sm sm:text-base"
                placeholder={role === 'Student' ? 'student@email.com' : 'Enter your email or username'}
                required
              />
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-gray-400/20 pointer-events-none"
                whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)', scale: 1.02, rotateX: 5 }}
                whileFocus={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)', scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gray-200 rounded-full"
                    variants={particleVariants}
                    initial="initial"
                    whileHover="animate"
                    custom={i}
                    style={{ top: '50%', left: '50%' }}
                  />
                ))}
                <motion.div
                  className="absolute inset-0 bg-gray-400/10 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileFocus={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible" className="relative">
            <label className="block mb-1 text-xs sm:text-sm font-semibold text-gray-300 font-mono">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-800/50 text-gray-200 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-500 text-sm sm:text-base"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 interactive-card"
              >
                {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
              </button>
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-gray-400/20 pointer-events-none"
                whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)', scale: 1.02, rotateX: 5 }}
                whileFocus={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)', scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gray-200 rounded-full"
                    variants={particleVariants}
                    initial="initial"
                    whileHover="animate"
                    custom={i}
                    style={{ top: '50%', left: '50%' }}
                  />
                ))}
                <motion.div
                  className="absolute inset-0 bg-gray-400/10 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileFocus={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.button
            custom={2}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            type="submit"
            disabled={loading}
            ref={buttonRef}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2.5 sm:py-3 rounded-xl font-bold bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-900/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden interactive-card text-sm sm:text-base"
          >
            {loading ? (
              <motion.div
                className="flex items-center justify-center gap-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <span>Loading...</span>
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-gray-200 rounded-full border-t-transparent animate-spin" />
              </motion.div>
            ) : (
              `Login as ${role}`
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center mt-4 sm:mt-6 text-xs sm:text-sm space-y-2 text-gray-400"
        >
          <button
            onClick={() => alert('Reset Password coming soon!')}
            className="hover:underline hover:text-gray-200 interactive-card"
          >
            Forgot password?
          </button>
        </motion.div>
      </motion.div>

      {/* Inline Styles */}
      <style jsx>{`
        /* Animation Keyframes */
        @keyframes particle {
          0% { transform: translateY(0); opacity: 0.1; }
          50% { opacity: 0.15; }
          100% { transform: translateY(-10px); opacity: 0.1; }
        }

        @keyframes slow-pulse {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }

        @keyframes wave {
          0% { transform: translateX(-100%); opacity: 0.2; }
          50% { opacity: 0.3; }
          100% { transform: translateX(100%); opacity: 0.2; }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
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

        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Base Styles */
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

        /* Selection Styling */
        ::selection {
          background: rgba(107, 114, 128, 0.3);
          color: white;
        }

        /* Mobile-specific styles */
        @media (max-width: 640px) {
          .interactive-card {
            -webkit-tap-highlight-color: transparent;
          }
          
          input, button {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
      `}</style>
    </div>
  );
}