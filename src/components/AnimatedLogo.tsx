import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  scale?: number; // Scale multiplier for the entire logo (default: 1)
}

export default function AnimatedLogo({ scale = 1 }: AnimatedLogoProps) {
  const dividerControls = useAnimationControls();
  const textControls = useAnimationControls();
  const bylineControls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Initial animation sequence on mount
  useEffect(() => {
    const playInitialSequence = async () => {
      // 0.8s: Divider slides in
      await new Promise((resolve) => setTimeout(resolve, 800));
      dividerControls.start({
        width: "1px",
        opacity: 1,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      });

      // 1.2s: Text slides in
      await new Promise((resolve) => setTimeout(resolve, 400));
      textControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
      });

      // 1.8s: Byline fades in
      await new Promise((resolve) => setTimeout(resolve, 600));
      bylineControls.start({
        opacity: 1,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      });

      // 2.2-4.2s: Hold for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 4.2s: Start collapse - text and byline fade out
      textControls.start({
        x: -20,
        opacity: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      });
      bylineControls.start({
        opacity: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      });

      // Divider collapses
      await new Promise((resolve) => setTimeout(resolve, 200));
      dividerControls.start({
        width: "0px",
        opacity: 0,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      });

      setHasPlayedOnce(true);
    };

    playInitialSequence();
  }, [dividerControls, textControls, bylineControls]);

  // Hover animation sequence
  const handleMouseEnter = () => {
    if (!hasPlayedOnce) return;
    setIsHovered(true);

    const playHoverSequence = async () => {
      // Divider slides in
      dividerControls.start({
        width: "1px",
        opacity: 1,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      });

      // Text slides in
      await new Promise((resolve) => setTimeout(resolve, 150));
      textControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      });

      // Byline fades in
      await new Promise((resolve) => setTimeout(resolve, 400));
      bylineControls.start({
        opacity: 1,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      });
    };

    playHoverSequence();
  };

  const handleMouseLeave = () => {
    if (!hasPlayedOnce) return;
    setIsHovered(false);

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

    setTimeout(() => {
      dividerControls.start({
        width: "0px",
        opacity: 0,
        transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      });
    }, 150);
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
