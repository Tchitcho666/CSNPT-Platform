'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import type { ComponentProps, MouseEvent } from 'react';

type MagneticButtonProps = ComponentProps<typeof motion.button> & {
  strength?: number;
};

export default function MagneticButton({
  children,
  className = '',
  strength = 0.18,
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: MagneticButtonProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 260, damping: 20, mass: 0.35 });
  const y = useSpring(pointerY, { stiffness: 260, damping: 20, mass: 0.35 });
  const reduceMotion = useReducedMotion();

  function trackPointer(event: MouseEvent<HTMLButtonElement>) {
    onMouseMove?.(event);
    if (reduceMotion || document.documentElement.dataset.sensoryMode === 'calm') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * strength;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * strength;
    pointerX.set(Math.max(-10, Math.min(10, offsetX)));
    pointerY.set(Math.max(-10, Math.min(10, offsetY)));
  }

  function resetPointer(event: MouseEvent<HTMLButtonElement>) {
    pointerX.set(0);
    pointerY.set(0);
    onMouseLeave?.(event);
  }

  return (
    <motion.button
      {...props}
      onMouseMove={trackPointer}
      onMouseLeave={resetPointer}
      style={{ ...style, x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
      className={`group relative isolate after:pointer-events-none after:absolute after:-inset-2 after:-z-10 after:rounded-[inherit] after:bg-[#0E5A5F]/20 after:opacity-0 after:blur-xl after:transition-opacity hover:after:opacity-100 focus-visible:after:opacity-60 ${className}`}
    >
      {children}
    </motion.button>
  );
}
