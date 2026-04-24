import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated museum background with subtle particles and gradient
 */
export const MuseumBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-museum-bg -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-museum" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-museum-accent rounded-full opacity-10"
            animate={{
              x: Math.sin(i) * 100,
              y: Math.cos(i) * 100,
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${(i * 100) / 15}%`,
              top: `${(i * 80) / 15}%`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay (very subtle) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
