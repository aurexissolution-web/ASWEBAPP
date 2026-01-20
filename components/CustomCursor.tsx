
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isCursorEnabled, setIsCursorEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the cursor movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const rafRef = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const query = window.matchMedia('(pointer: fine)');
    const updateState = () => setIsCursorEnabled(query.matches);
    updateState();
    query.addEventListener('change', updateState);
    return () => query.removeEventListener('change', updateState);
  }, []);

  useEffect(() => {
    if (!isCursorEnabled || typeof document === 'undefined') return;
    const styleId = 'custom-cursor-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        body.custom-cursor-hidden, body.custom-cursor-hidden * {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    }
    document.body.classList.add('custom-cursor-hidden');
    return () => {
      document.body.classList.remove('custom-cursor-hidden');
    };
  }, [isCursorEnabled]);

  useEffect(() => {
    if (!isCursorEnabled) return;

    const moveCursor = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      const { clientX, clientY } = e;
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(clientX - 10);
        mouseY.set(clientY - 10);
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest('a, button, [role="button"], [data-cursor="interactive"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('pointerover', handlePointerOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('pointerover', handlePointerOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mouseX, mouseY, isCursorEnabled, isVisible]);

  if (!isCursorEnabled) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        willChange: 'transform'
      }}
    >
      <motion.div
        className="rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        animate={{
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : 1,
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.4)' : '#3B82F6', // Transparent blue on hover
          border: isHovering ? '2px solid #3B82F6' : '0px solid transparent'
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28
        }}
      />
      {/* Center dot for precision when hovering */}
      <motion.div 
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full w-2 h-2"
         animate={{ opacity: isHovering ? 1 : 0 }} 
      />
    </motion.div>
  );
};

export default CustomCursor;
