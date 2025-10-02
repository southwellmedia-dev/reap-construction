import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface AnimatedLogoProps {
  scale?: number; // Scale multiplier for the entire logo (default: 1)
}

export default function AnimatedLogo({ scale = 1 }: AnimatedLogoProps) {
  const dividerControls = useAnimationControls();
  const textControls = useAnimationControls();
  const bylineControls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Refs for cleanup
  const mountedRef = useRef(true);
  const isHoveredRef = useRef(false);
  const initialTimersRef = useRef<NodeJS.Timeout[]>([]);
  const hoverTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Initial animation sequence on mount
  useEffect(() => {
    const playInitialSequence = async () => {
      // 0.8s: Divider slides in
      const timer1 = setTimeout(() => {
        if (!mountedRef.current) return;
        dividerControls.start({
          width: "1px",
          opacity: 1,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        });
      }, 800);
      initialTimersRef.current.push(timer1);

      // 1.2s: Text slides in
      const timer2 = setTimeout(() => {
        if (!mountedRef.current) return;
        textControls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        });
      }, 1200);
      initialTimersRef.current.push(timer2);

      // 1.8s: Byline fades in
      const timer3 = setTimeout(() => {
        if (!mountedRef.current) return;
        bylineControls.start({
          opacity: 1,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        });
      }, 1800);
      initialTimersRef.current.push(timer3);

      // 4.2s: Start collapse - text and byline fade out
      const timer4 = setTimeout(() => {
        if (!mountedRef.current) return;
        textControls.start({
          x: -20,
          opacity: 0,
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        });
        bylineControls.start({
          opacity: 0,
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        });
      }, 4200);
      initialTimersRef.current.push(timer4);

      // 4.4s: Divider collapses
      const timer5 = setTimeout(() => {
        if (!mountedRef.current) return;
        dividerControls.start({
          width: "0px",
          opacity: 0,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        });
      }, 4400);
      initialTimersRef.current.push(timer5);

      // 4.7s: Set has played once
      const timer6 = setTimeout(() => {
        if (!mountedRef.current) return;
        setHasPlayedOnce(true);
      }, 4700);
      initialTimersRef.current.push(timer6);
    };

    playInitialSequence();

    // Cleanup function
    return () => {
      mountedRef.current = false;
      initialTimersRef.current.forEach(clearTimeout);
      initialTimersRef.current = [];
      hoverTimersRef.current.forEach(clearTimeout);
      hoverTimersRef.current = [];
    };
  }, [dividerControls, textControls, bylineControls]);

  // Hover animation sequence
  const handleMouseEnter = () => {
    if (!hasPlayedOnce) return;

    // Clear any existing hover timers
    hoverTimersRef.current.forEach(clearTimeout);
    hoverTimersRef.current = [];

    setIsHovered(true);
    isHoveredRef.current = true;

    // Divider slides in immediately
    dividerControls.start({
      width: "1px",
      opacity: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    });

    // Text slides in after 150ms
    const hoverTimer1 = setTimeout(() => {
      if (!mountedRef.current || !isHoveredRef.current) return;
      textControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      });
    }, 150);
    hoverTimersRef.current.push(hoverTimer1);

    // Byline fades in after 550ms
    const hoverTimer2 = setTimeout(() => {
      if (!mountedRef.current || !isHoveredRef.current) return;
      bylineControls.start({
        opacity: 1,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      });
    }, 550);
    hoverTimersRef.current.push(hoverTimer2);
  };

  const handleMouseLeave = () => {
    if (!hasPlayedOnce) return;

    // Clear hover timers immediately
    hoverTimersRef.current.forEach(clearTimeout);
    hoverTimersRef.current = [];

    setIsHovered(false);
    isHoveredRef.current = false;

    // Collapse sequence
    textControls.start({
      x: -20,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    });
    bylineControls.start({
      opacity: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    });

    // Divider collapses after 150ms
    const leaveTimer = setTimeout(() => {
      if (!mountedRef.current) return;
      dividerControls.start({
        width: "0px",
        opacity: 0,
        transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      });
    }, 150);
    hoverTimersRef.current.push(leaveTimer);
  };

  return (
    <a
      href="/"
      className="animated-logo"
      aria-label="Reap Construction Home"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ fontSize: `${scale}rem` }}
    >
      {/* Logomark - always visible */}
      <motion.img
        src="/assets/branding/reap-logomark.svg"
        alt="Reap Construction"
        className="animated-logo__img"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Divider - animates in/out */}
      <motion.div
        className="animated-logo__divider"
        initial={{ width: "0px", opacity: 0 }}
        animate={dividerControls}
      />

      {/* Logo content - animates in/out */}
      <motion.div
        className="animated-logo__content"
        initial={{ x: -20, opacity: 0 }}
        animate={textControls}
      >
        <span className="animated-logo__text">
          <strong>REAP</strong> CONSTRUCTION
        </span>
        <motion.span
          className="animated-logo__byline"
          initial={{ opacity: 0 }}
          animate={bylineControls}
        >
          A Reap Capital Company
        </motion.span>
      </motion.div>

      <style>{`
        .animated-logo {
          display: inline-flex;
          align-items: center;
          gap: ${1 * scale}rem;
          text-decoration: none;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .animated-logo:hover {
          transform: scale(1.02);
        }

        .animated-logo:focus-visible {
          outline: 2px solid #CCB37F;
          outline-offset: 8px;
          border-radius: 8px;
        }

        .animated-logo__img {
          height: ${3.5 * scale}rem;
          width: auto;
        }

        @media (min-width: 768px) {
          .animated-logo__img {
            height: ${3.75 * scale}rem;
          }

          .animated-logo__divider {
            height: ${4.5 * scale}rem;
          }
        }

        .animated-logo__divider {
          height: ${4.25 * scale}rem;
          background-color: rgba(57, 67, 52, 0.2);
          flex-shrink: 0;
        }

        .animated-logo__content {
          display: flex;
          flex-direction: column;
          gap: ${0.125 * scale}rem;
          min-width: max-content;
        }

        .animated-logo__text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: ${0.9 * scale}rem;
          font-weight: 500;
          color: #394334;
          letter-spacing: 0.15em;
          white-space: nowrap;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .animated-logo__text {
            font-size: ${1 * scale}rem;
          }

          .animated-logo__byline {
            font-size: ${0.55 * scale}rem;
            letter-spacing: 0.85em;
          }
        }

        .animated-logo__text strong {
          font-weight: 800;
        }

        .animated-logo__byline {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: ${0.5 * scale}rem;
          font-weight: 500;
          color: rgba(57, 67, 52, 0.5);
          letter-spacing: 0.635em;
          text-transform: uppercase;
          white-space: nowrap;
          line-height: 1;
        }
      `}</style>
    </a>
  );
}
