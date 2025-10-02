import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/buttons.scss';

// Staggered container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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
      duration: 0.6,
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
      <motion.div variants={itemVariants} style={{ display: 'contents' }}>
        <a href="/" className="hero-masonry__logo" id="hero-logo" aria-label="Reap Construction Home">
          <img
            src="/assets/branding/reap-logomark.svg"
            alt="Reap Construction"
            width={160}
            height={160}
            loading="eager"
            className="hero-masonry__logo-img"
          />
        </a>
      </motion.div>

      {/* Title */}
      <motion.div variants={itemVariants} style={{ display: 'contents' }}>
        <h1 className="hero-masonry__title">
          Turning your challenges into{' '}
          <span className="hero-masonry__title-accent">opportunities</span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants} style={{ display: 'contents' }}>
        <p className="hero-masonry__description">
          Premier commercial and residential construction services
          for the discerning client. A subsidiary of Reap Capital.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} style={{ display: 'contents' }}>
        <div className="hero-masonry__actions">
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
        </div>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div variants={itemVariants} style={{ display: 'contents' }}>
        <div className="hero-masonry__trust">
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
        </div>
      </motion.div>
    </motion.div>
  );
};
