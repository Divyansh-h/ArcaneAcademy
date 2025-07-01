'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  duration = 3500 // Extended for enhanced animations
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  // Particle variants for burst effect
  const particleVariants = {
    initial: { scale: 0, opacity: 1, x: 0, y: 0 },
    animate: (i: number) => ({
      scale: [0, 1.5, 0],
      opacity: 0,
      x: Math.cos(i * Math.PI / 5) * 120,
      y: Math.sin(i * Math.PI / 5) * 120,
      transition: {
        duration: 1.8,
        delay: i * 0.08,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
  };

  // Glitch effect for background
  const glitchVariants = {
    initial: { opacity: 0, x: 0 },
    animate: {
      opacity: [0, 0.1, 0],
      x: [0, 2, 0],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: 'linear',
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-10 animate-particle noise-bg" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-200/50 animate-slow-pulse" />
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-200/20 to-transparent animate-wave" />
          {/* Glitch Effect */}
          <motion.div
            className="absolute inset-0 bg-blue-200/10"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
          />
          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/50 rounded-full"
              initial={{ x: `${(i * 20)}%`, y: '100%' }}
              animate={{ y: '-100%', opacity: [0, 0.3, 0] }}
              transition={{
                duration: 6 + (i * 0.5),
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotateY: 30, rotateX: 15, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotateY: 0, 
              rotateX: 0, 
              y: 0,
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
              scale: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
            className="relative w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] max-w-[70vw] max-h-[70vw] interactive-card"
          >
            <Image
              src="/logonbg.png"
              alt="ArcaneAcademy logo representing the gateway to education"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              priority
            />
            {/* Particle Burst */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/70 rounded-full"
                variants={particleVariants}
                initial="initial"
                animate="animate"
                custom={i}
                style={{ top: '50%', left: '50%' }}
              />
            ))}
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight"
          >
            ArcaneAcademy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 text-lg text-gray-600 font-mono"
          >
            Empowering Education
          </motion.p>

          {/* Inline Styles */}
          <style jsx>{`
            @keyframes particle {
              0% { transform: translateY(0); opacity: 0.2; }
              50% { opacity: 0.3; }
              100% { transform: translateY(-10px); opacity: 0.2; }
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

            .font-mono {
              font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Monaco, Consolas, monospace;
            }

            ::selection {
              background: rgba(107, 114, 128, 0.3);
              color: white;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;