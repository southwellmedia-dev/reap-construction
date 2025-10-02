import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo.tsx';

// Staggered container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
};

// Individual item animation - slide in from left with fade
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
    },
  },
};

export const HeroAnimatedContent: React.FC = () => {
  return (
    <motion.div
      className="hero-masonry__content"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div variants={itemVariants} className="hero-masonry__logo" id="hero-logo">
        <AnimatedLogo scale={2} />
      </motion.div>

      {/* Title */}
      <motion.h1 className="hero-masonry__title" variants={itemVariants}>
        Turning your challenges into{' '}
        <span className="hero-masonry__title-accent">opportunities</span>
      </motion.h1>

      {/* Description */}
      <motion.p className="hero-masonry__description" variants={itemVariants}>
        Premier commercial and residential construction services
        for the discerning client. A subsidiary of Reap Capital.
      </motion.p>

      {/* Actions */}
      <motion.div className="hero-masonry__actions" variants={itemVariants}>
        <a href="#portfolio" className="btn btn--primary btn--large btn--icon">
          View Our Work
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
        <a href="#contact" className="btn btn--outline btn--large">
          Start Your Project
        </a>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div className="hero-masonry__trust" variants={itemVariants}>
        <div className="hero-masonry__trust-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
          </svg>
          <span>Licensed &amp; Insured</span>
        </div>
        <div className="hero-masonry__trust-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          <span>Award Winning</span>
        </div>
        <div className="hero-masonry__trust-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
            <path d="M16 3.13a4 4 0 010 7.75"></path>
          </svg>
          <span>Expert Team</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Inline styles to match HeroMasonry
const styles = `
  .hero-masonry__content {
    position: relative;
    z-index: 10;
    max-width: 700px;
    width: 100%;
  }

  .hero-masonry__logo {
    display: inline-block;
    margin-bottom: 2rem;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .hero-masonry__title {
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 600;
    line-height: 1.1;
    color: #394334;
    margin-bottom: 2rem;
  }

  .hero-masonry__title-accent {
    color: #CCB37F;
    display: inline-block;
  }

  .hero-masonry__description {
    font-size: 1.125rem;
    line-height: 1.8;
    color: #666666;
    margin-bottom: 2rem;
  }

  .hero-masonry__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .hero-masonry__actions {
      flex-wrap: nowrap;
    }
  }

  .hero-masonry__trust {
    display: flex;
    gap: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(57, 67, 52, 0.1);
  }

  .hero-masonry__trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #666666;
  }

  .hero-masonry__trust-item svg {
    width: 20px;
    height: 20px;
    stroke: #CCB37F;
  }

  @media (max-width: 1023px) {
    .hero-masonry__content {
      max-width: 500px;
      margin: 0 auto;
    }

    .hero-masonry__logo {
      margin-left: auto;
      margin-right: auto;
    }

    .hero-masonry__trust {
      justify-content: center;
    }

    .hero-masonry__actions {
      justify-content: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-masonry__content {
      animation: none;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleId = 'hero-content-styles';
  if (!document.getElementById(styleId)) {
    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
  }
}
