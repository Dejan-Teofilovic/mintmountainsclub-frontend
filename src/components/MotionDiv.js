import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function MotionDiv({ children, variants }) {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    if (!inView) {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}