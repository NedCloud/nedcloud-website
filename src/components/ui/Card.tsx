'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export const Card = ({
  children,
  className,
  hoverGlow = true
}: CardProps) => {
  const baseClasses = 'rounded-xl p-6 backdrop-blur-sm border border-white/10 bg-dark-800/50';
  
  const hoverClasses = hoverGlow ? 'hover:shadow-lg hover:shadow-neon-blue/20 hover:border-neon-blue/30' : '';
  
  return (
    <motion.div
      whileHover={hoverGlow ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(baseClasses, hoverClasses, className)}
    >
      {children}
    </motion.div>
  );
};