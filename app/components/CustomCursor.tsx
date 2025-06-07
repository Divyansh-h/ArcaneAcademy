'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12; // Slightly smoother easing
      cursorY += (mouseY - cursorY) * 0.12;
      setPosition({ x: cursorX, y: cursorY });

      // Update trail (reduced to 5 points for academic minimalism)
      trailRef.current = [
        { x: cursorX, y: cursorY, id: Date.now() },
        ...trailRef.current.slice(0, 4),
      ];
      setTrail([...trailRef.current]);

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Select interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .interactive-card');
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Staggered animation for nav links
    const navLinks = document.querySelectorAll('nav ul li');
    navLinks.forEach((li, i) => {
      (li as HTMLElement).style.animationDelay = `${i * 140}ms`;
    });

    // Add event listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'none';

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.body.style.cursor = 'auto';
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Trail Effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-400/50"
            style={{
              transform: `scale(${1 - index * 0.2})`,
              opacity: (1 - index * 0.15) * 0.5,
            }}
          />
        </div>
      ))}

      {/* Main Cursor */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer Ring - Subtle Glow */}
        <div
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            isHovering ? 'scale-150' : 'scale-100'
          } ${isClicking ? 'scale-75' : ''}`}
        >
          <div className="w-10 h-10 border-2 border-gray-400/30 rounded-full animate-glow">
            <div className="absolute inset-0 bg-gray-200/10 rounded-full blur-sm" />
          </div>
        </div>

        {/* Inner Core - Minimal Center */}
        <div
          className={`absolute inset-0 transition-all duration-150 ease-out ${
            isHovering ? 'scale-125' : 'scale-100'
          } ${isClicking ? 'scale-50' : ''}`}
        >
          <div className="w-2.5 h-2.5 bg-gray-200 rounded-full shadow-md">
            <div className="absolute inset-0 bg-gray-400/30 rounded-full animate-pulse-slow" />
          </div>
        </div>

        {/* Hover Effect - Particle Rings */}
        {isHovering && (
          <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 border border-gray-200/20 rounded-full animate-ping-slow" />
            <div className="absolute inset-2 border border-gray-400/30 rounded-full animate-ping-slow animation-delay-100" />
          </div>
        )}

        {/* Click Effect - Ripple */}
        {isClicking && (
          <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 border-2 border-gray-200/50 rounded-full animate-ripple" />
          </div>
        )}

        {/* Particle Burst on Hover */}
        {isHovering &&
          [...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gray-200 rounded-full"
              initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
                x: Math.cos(i * (Math.PI * 2) / 3) * 15,
                y: Math.sin(i * (Math.PI * 2) / 3) * 15,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          ))}
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        /* Animation Keyframes */
        @keyframes glow {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 10px rgba(229, 229, 229, 0.2);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 15px rgba(229, 229, 229, 0.4);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

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

        @keyframes navLinkFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Animation Classes */
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 1.5s ease-out infinite;
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out;
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

        /* Staggered Nav Link Animation */
        nav ul li {
          opacity: 0;
          transform: translateY(20px);
          animation: navLinkFade 0.6s ease-out forwards;
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

        .animation-delay-100 {
          animation-delay: 100ms;
        }
      `}</style>
    </>
  );
}


