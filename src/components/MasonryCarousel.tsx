import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

interface MasonryItem {
  id: string;
  src: string;
  alt: string;
  size: "small" | "medium" | "large" | "tall" | "wide";
}

// Size variations for true masonry layout
const sizeMap = {
  small: { width: "100%", height: "140px" },
  medium: { width: "100%", height: "200px" },
  large: { width: "100%", height: "280px" },
  tall: { width: "100%", height: "360px" },
  wide: { width: "100%", height: "180px" },
};

// Image data with varied sizes for masonry effect
const masonryData: MasonryItem[] = [
  {
    id: "1",
    src: "/assets/projects/warren/1749646804367.jpg",
    alt: "Luxury residential project",
    size: "tall",
  },
  {
    id: "2",
    src: "/assets/projects/calvin/1750251601495.jpg",
    alt: "Commercial development",
    size: "medium",
  },
  {
    id: "3",
    src: "/assets/projects/bryant/1755615602011.jpg",
    alt: "Modern architecture",
    size: "large",
  },
  {
    id: "4",
    src: "/assets/projects/warren/1746792003243.jpg",
    alt: "Architectural excellence",
    size: "tall",
  },
  {
    id: "5",
    src: "/assets/projects/warren/1746792004678.jpg",
    alt: "Premium construction",
    size: "medium",
  },
  {
    id: "6",
    src: "/assets/projects/calvin/1750251602706.jpg",
    alt: "Office complex",
    size: "large",
  },
  {
    id: "7",
    src: "/assets/projects/bryant/1755615603383.jpg",
    alt: "Residential development",
    size: "medium",
  },
  {
    id: "8",
    src: "/assets/projects/warren/1749646802127.jpg",
    alt: "Luxury estate",
    size: "large",
  },
  {
    id: "9",
    src: "/assets/projects/calvin/1750251603507.jpg",
    alt: "Corporate headquarters",
    size: "tall",
  },
  {
    id: "10",
    src: "/assets/projects/bryant/1755615603719.jpg",
    alt: "Urban development",
    size: "medium",
  },
  {
    id: "11",
    src: "/assets/projects/warren/1746792006715.jpg",
    alt: "Modern residential",
    size: "large",
  },
  {
    id: "12",
    src: "/assets/projects/warren/1749646803996.jpg",
    alt: "Construction detail",
    size: "small",
  },
  {
    id: "13",
    src: "/assets/projects/bryant/1748520003642.jpg",
    alt: "Bryant project detail",
    size: "medium",
  },
  {
    id: "14",
    src: "/assets/projects/bryant/1748520004328.jpg",
    alt: "Bryant construction",
    size: "tall",
  },
  {
    id: "15",
    src: "/assets/projects/calvin/1750251604516.jpg",
    alt: "Calvin project detail",
    size: "large",
  },
];

// Split data into three columns
const column1Data = masonryData.filter((_, index) => index % 3 === 0);
const column2Data = masonryData.filter((_, index) => index % 3 === 1);
const column3Data = masonryData.filter((_, index) => index % 3 === 2);

const MasonryCarousel: React.FC = () => {
  const [coloredCards, setColoredCards] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [cardOpacities, setCardOpacities] = useState<Map<string, number>>(
    new Map()
  );

  const [isPaused1, setIsPaused1] = useState(false);
  const [isPaused2, setIsPaused2] = useState(false);
  const [isPaused3, setIsPaused3] = useState(false);

  const y1 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const y3 = useMotionValue(0);

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  // State for measured heights
  const [totalHeight1, setTotalHeight1] = useState(0);
  const [totalHeight2, setTotalHeight2] = useState(0);
  const [totalHeight3, setTotalHeight3] = useState(0);

  // Measure actual column heights
  useEffect(() => {
    const measureHeights = () => {
      // Each column renders data 3 times, so divide by 3 to get one iteration's height
      if (column1Ref.current) {
        const height = column1Ref.current.scrollHeight / 3;
        setTotalHeight1(height);
      }
      if (column2Ref.current) {
        const height = column2Ref.current.scrollHeight / 3;
        setTotalHeight2(height);
      }
      if (column3Ref.current) {
        const height = column3Ref.current.scrollHeight / 3;
        setTotalHeight3(height);
      }
    };

    // Initial measurement after a short delay to ensure rendering is complete
    const timeout = setTimeout(measureHeights, 100);

    // Set up ResizeObserver to update on size changes
    const resizeObserver = new ResizeObserver(() => {
      measureHeights();
    });

    if (column1Ref.current) resizeObserver.observe(column1Ref.current);
    if (column2Ref.current) resizeObserver.observe(column2Ref.current);
    if (column3Ref.current) resizeObserver.observe(column3Ref.current);

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
    };
  }, []);

  // Independent card coloring effect - each card has its own cycle
  useEffect(() => {
    // Initialize opacities for all cards (fixed depth layers)
    const initializeOpacities = () => {
      const opacityLevels = [0.25, 0.35, 0.45, 0.55];
      const newOpacities = new Map<string, number>();
      const allCards = [...masonryData, ...masonryData, ...masonryData];

      allCards.forEach((item, index) => {
        const cardKey = `${item.id}-${Math.floor(index / masonryData.length)}`;
        const opacity =
          opacityLevels[Math.floor(Math.random() * opacityLevels.length)];
        newOpacities.set(cardKey, opacity);
      });

      setCardOpacities(newOpacities);
    };

    // Create independent cycle for each card
    const startCardCycle = (cardKey: string, initialDelay: number) => {
      const cycleDuration = Math.random() * 3000 + 2000; // 2-5 seconds
      const shouldBeColored = Math.random() > 0.7; // 30% chance to be colored

      const timer = setTimeout(() => {
        if (!hoveredCard) {
          setColoredCards((prev) => {
            const newSet = new Set(prev);
            if (shouldBeColored && newSet.size < 8) {
              // Limit max colored cards
              newSet.add(cardKey);
            } else {
              newSet.delete(cardKey);
            }
            return newSet;
          });
        }

        // Schedule next cycle
        startCardCycle(cardKey, cycleDuration);
      }, initialDelay);

      cardTimers.current.set(cardKey, timer);
    };

    // Initialize opacities once
    if (cardOpacities.size === 0) {
      initializeOpacities();
    }

    // Start independent cycles for all cards with staggered initial delays
    const allCards = [...masonryData, ...masonryData, ...masonryData];
    allCards.forEach((item, index) => {
      const cardKey = `${item.id}-${Math.floor(index / masonryData.length)}`;
      const initialDelay = Math.random() * 2000; // Stagger start times 0-2s
      startCardCycle(cardKey, initialDelay);
    });

    // Cleanup
    return () => {
      cardTimers.current.forEach((timer) => clearTimeout(timer));
      cardTimers.current.clear();
    };
  }, [hoveredCard]);

  // Column 1 animation
  useEffect(() => {
    if (totalHeight1 === 0) return; // Wait for height measurement

    let cancelled = false;

    const animateColumn = async () => {
      while (!cancelled) {
        if (isPaused1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          if (cancelled) break;
          continue;
        }

        const currentY = y1.get();
        const normalizedY = currentY % -totalHeight1;

        await controls1.start({
          y: normalizedY - totalHeight1,
          transition: {
            duration: (normalizedY - totalHeight1 - currentY) / -37.5, // pixels per second
            ease: "linear",
          },
        });

        if (cancelled) break;
        y1.set(0);
      }
    };

    animateColumn();

    return () => {
      cancelled = true;
      controls1.stop();
    };
  }, [isPaused1, controls1, totalHeight1, y1]);

  // Column 2 animation
  useEffect(() => {
    if (totalHeight2 === 0) return; // Wait for height measurement

    let cancelled = false;

    const animateColumn = async () => {
      while (!cancelled) {
        if (isPaused2) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          if (cancelled) break;
          continue;
        }

        const currentY = y2.get();
        const normalizedY = currentY % -totalHeight2;

        await controls2.start({
          y: normalizedY - totalHeight2,
          transition: {
            duration: (normalizedY - totalHeight2 - currentY) / -33.3,
            ease: "linear",
          },
        });

        if (cancelled) break;
        y2.set(0);
      }
    };

    animateColumn();

    return () => {
      cancelled = true;
      controls2.stop();
    };
  }, [isPaused2, controls2, totalHeight2, y2]);

  // Column 3 animation
  useEffect(() => {
    if (totalHeight3 === 0) return; // Wait for height measurement

    let cancelled = false;

    const animateColumn = async () => {
      while (!cancelled) {
        if (isPaused3) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          if (cancelled) break;
          continue;
        }

        const currentY = y3.get();
        const normalizedY = currentY % -totalHeight3;

        await controls3.start({
          y: normalizedY - totalHeight3,
          transition: {
            duration: (normalizedY - totalHeight3 - currentY) / -35.7,
            ease: "linear",
          },
        });

        if (cancelled) break;
        y3.set(0);
      }
    };

    animateColumn();

    return () => {
      cancelled = true;
      controls3.stop();
    };
  }, [isPaused3, controls3, totalHeight3, y3]);

  const renderMasonryItem = (item: MasonryItem, itemKey: string) => {
    const isColored = coloredCards.has(itemKey) || hoveredCard === itemKey;
    const baseClasses = `masonry-item ${
      isColored ? "masonry-item--colored" : "masonry-item--grayscale"
    }`;
    const sizeStyle = sizeMap[item.size];

    // Get opacity for this card (only applied to grayscale)
    const cardOpacity = cardOpacities.get(itemKey) || 0.4;

    return (
      <div className={baseClasses} style={sizeStyle}>
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          style={!isColored ? { opacity: cardOpacity } : undefined}
        />
        <div className="masonry-item__overlay"></div>
      </div>
    );
  };

  const handleCardHover = (cardKey: string) => {
    setHoveredCard(cardKey);
    setColoredCards(new Set([cardKey]));
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="masonry-carousel" ref={containerRef}>
      <motion.div
        className="masonry-columns"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.div
          ref={column1Ref}
          className="masonry-column masonry-column--1"
          style={{ y: y1 }}
          animate={controls1}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsPaused1(true)}
          onMouseLeave={() => setIsPaused1(false)}
        >
          {[...column1Data, ...column1Data, ...column1Data].map(
            (item, index) => {
              const itemKey = `${item.id}-${Math.floor(
                index / column1Data.length
              )}`;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="masonry-item-wrapper"
                  onMouseEnter={() => handleCardHover(itemKey)}
                  onMouseLeave={handleCardLeave}
                >
                  {renderMasonryItem(item, itemKey)}
                </div>
              );
            }
          )}
        </motion.div>

        <motion.div
          ref={column2Ref}
          className="masonry-column masonry-column--2"
          style={{ y: y2 }}
          animate={controls2}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsPaused2(true)}
          onMouseLeave={() => setIsPaused2(false)}
        >
          {[...column2Data, ...column2Data, ...column2Data].map(
            (item, index) => {
              const itemKey = `${item.id}-${Math.floor(
                index / column2Data.length
              )}`;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="masonry-item-wrapper"
                  onMouseEnter={() => handleCardHover(itemKey)}
                  onMouseLeave={handleCardLeave}
                >
                  {renderMasonryItem(item, itemKey)}
                </div>
              );
            }
          )}
        </motion.div>

        <motion.div
          ref={column3Ref}
          className="masonry-column masonry-column--3"
          style={{ y: y3 }}
          animate={controls3}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsPaused3(true)}
          onMouseLeave={() => setIsPaused3(false)}
        >
          {[...column3Data, ...column3Data, ...column3Data].map(
            (item, index) => {
              const itemKey = `${item.id}-${Math.floor(
                index / column3Data.length
              )}`;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="masonry-item-wrapper"
                  onMouseEnter={() => handleCardHover(itemKey)}
                  onMouseLeave={handleCardLeave}
                >
                  {renderMasonryItem(item, itemKey)}
                </div>
              );
            }
          )}
        </motion.div>
      </motion.div>

      <style jsx>{`
        .masonry-carousel {
          --column-gap: clamp(12px, 1.5vw, 20px);
          --card-gap: 10px;

          position: relative;
          height: 80vh;
          overflow: hidden;
          padding-left: 20px;
          padding-right: 40px;
          width: 100%;
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .masonry-columns {
          display: grid;
          grid-template-columns: repeat(3, minmax(280px, 320px));
          gap: var(--column-gap);
          height: 100%;
          position: relative;
          margin-left: auto;
          margin-right: 0;
        }

        .masonry-column {
          display: flex;
          flex-direction: column;
          gap: var(--card-gap);
          min-width: 0;
        }

        .masonry-column--2 {
          margin-top: 50px;
        }

        .masonry-column--3 {
          margin-top: 100px;
        }

        .masonry-item-wrapper {
          width: 100%;
        }

        .masonry-item {
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          background: #ffffff;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .masonry-item--grayscale {
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }

        .masonry-item--colored {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          z-index: 5;
        }

        .masonry-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 1.2s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .masonry-item--grayscale img {
          filter: grayscale(95%) brightness(0.85) contrast(0.9);
          /* opacity set dynamically inline for depth variation */
        }

        .masonry-item--colored img {
          filter: grayscale(0%) brightness(1.05) contrast(1.1) saturate(1.2);
          opacity: 1;
        }

        .masonry-item:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25) !important;
          z-index: 10;
        }

        .masonry-item:hover img {
          filter: grayscale(0%) brightness(1.08) contrast(1.15) saturate(1.3) !important;
          opacity: 1 !important;
        }

        .masonry-item__overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(57, 67, 52, 0.05) 100%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .masonry-item:hover .masonry-item__overlay {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .masonry-columns {
            max-width: 600px;
          }
        }

        @media (max-width: 768px) {
          .masonry-carousel {
            --column-gap: 16px;
            --card-gap: 8px;
            padding-left: 10px;
            padding-right: 10px;
            height: 70vh;
          }

          .masonry-columns {
            max-width: 480px;
          }
        }
      `}</style>
    </div>
  );
};

export default MasonryCarousel;
