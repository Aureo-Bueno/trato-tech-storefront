import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export interface AnimatedFeedbackHandle {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

interface AnimatedFeedbackProps {
  children: ReactNode;
}

const SCALE_STEP = 0.04;
const MAX_SCALE = 1.3;

const AnimatedFeedback = forwardRef<AnimatedFeedbackHandle, AnimatedFeedbackProps>(
  ({ children }, ref) => {
    const [scale, setScale] = useState(1);
    const scaleRef = useRef(1);
    const directionRef = useRef(1);
    const frameRef = useRef<number | undefined>(undefined);

    const animate = () => {
      let next = scaleRef.current + SCALE_STEP * directionRef.current;

      if (next >= MAX_SCALE) {
        next = MAX_SCALE;
        directionRef.current = -1;
      }

      if (next <= 1) {
        scaleRef.current = 1;
        setScale(1);
        frameRef.current = undefined;
        return;
      }

      scaleRef.current = next;
      setScale(next);
      frameRef.current = requestAnimationFrame(animate);
    };

    useImperativeHandle(ref, () => ({
      start() {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        directionRef.current = 1;
        scaleRef.current = 1;
        setScale(1);
        frameRef.current = requestAnimationFrame(animate);
      },
      stop() {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = undefined;
        }
      },
      reset() {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = undefined;
        }
        directionRef.current = 1;
        scaleRef.current = 1;
        setScale(1);
      },
    }));

    useEffect(() => {
      return () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    }, []);

    return (
      <span style={{ display: 'inline-flex', transform: `scale(${scale})` }}>
        {children}
      </span>
    );
  }
);

export default AnimatedFeedback;
