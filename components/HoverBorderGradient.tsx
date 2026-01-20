import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type HoverBorderGradientProps = React.PropsWithChildren<{
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
}> & React.HTMLAttributes<HTMLElement>;

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false);
  const highlight =
    'radial-gradient(75% 181% at 50% 50%, rgba(125,211,252,0.9) 0%, rgba(125,211,252,0) 70%)';

  const handleEnter = () => setHovered(true);
  const handleLeave = () => setHovered(false);

  return (
    <Tag
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(
        'relative flex h-min w-fit flex-col items-center justify-center gap-10 overflow-visible rounded-full border p-px transition duration-500 text-current',
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 rounded-[inherit] px-4 py-2',
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: 'blur(2px)' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ ease: 'linear', duration }}
      >
        {hovered && <div className="h-full w-full" style={{ background: highlight }} />}
      </motion.div>
    </Tag>
  );
}
