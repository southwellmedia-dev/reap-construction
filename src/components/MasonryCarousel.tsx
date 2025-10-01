import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

interface MasonryItem {
  id: string;
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
}

// Size variations for true masonry layout
const sizeMap = {
  small: { width: '100%', height: '140px' },
  medium: { width: '100%', height: '200px' },
  large: { width: '100%', height: '280px' },
  tall: { width: '100%', height: '360px' },
  wide: { width: '100%', height: '180px' }
};

// Image data with varied sizes for masonry effect
const masonryData: MasonryItem[] = [
  {
    id: '1',
    src: '/assets/projects/warren/1746792001987.jpg',
    alt: 'Luxury residential project',
    size: 'tall'
  },
  {
    id: '2',
    src: '/assets/projects/calvin/1750251601495.jpg',
    alt: 'Commercial development',
    size: 'medium'
  },
  {
    id: '3',
    src: '/assets/projects/bryant/1755615602011.jpg',
    alt: 'Modern architecture',
    size: 'large'
  },
  {
    id: '4',
    src: '/assets/projects/warren/1746792003243.jpg',
    alt: 'Architectural excellence',
    size: 'tall'
  },
  {
    id: '5',
    src: '/assets/projects/warren/1746792004678.jpg',
    alt: 'Premium construction',
    size: 'medium'
  },
  {
    id: '6',
    src: '/assets/projects/calvin/1750251602706.jpg',
    alt: 'Office complex',
    size: 'large'
  },
  {
    id: '7',
    src: '/assets/projects/bryant/1755615603383.jpg',
    alt: 'Residential development',
    size: 'medium'
  },
  {
    id: '8',
    src: '/assets/projects/warren/1746792005699.jpg',
    alt: 'Luxury estate',
    size: 'large'
  },
  {
    id: '9',
    src: '/assets/projects/calvin/1750251603507.jpg',
    alt: 'Corporate headquarters',
    size: 'tall'
  },
  {
    id: '10',
    src: '/assets/projects/bryant/1755615603719.jpg',
    alt: 'Urban development',
    size: 'medium'
  },
  {
    id: '11',
    src: '/assets/projects/warren/1746792006715.jpg',
    alt: 'Modern residential',
    size: 'large'
  },
  {
    id: '12',
    src: '/assets/projects/warren/1746792007716.jpg',
    alt: 'Construction detail',
    size: 'small'
  },
  {
    id: '13',
    src: '/assets/projects/bryant/1755615604879.jpg',
    alt: 'Bryant project detail',
    size: 'medium'
  },
  {
    id: '14',
    src: '/assets/projects/bryant/1755615606507.jpg',
    alt: 'Bryant construction',
    size: 'tall'
  },
  {
    id: '15',
    src: '/assets/projects/calvin/1750251604516.jpg',
    alt: 'Calvin project detail',
    size: 'large'
  }
];

// Split data into three columns
const column1Data = masonryData.filter((_, index) => index % 3 === 0);
const column2Data = masonryData.filter((_, index) => index % 3 === 1);
const column3Data = masonryData.filter((_, index) => index % 3 === 2);

const MasonryCarousel: React.FC = () => {
  const [coloredCards, setColoredCards] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [cardOpacities, setCardOpacities] = useState<Map<string, number>>(new Map());

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
  const colorInterval = useRef<NodeJS.Timeout | null>(null);

  // Calculate total heights for seamless loops
  const totalHeight1 = column1Data.length * 250;
  const totalHeight2 = column2Data.length * 250;
  const totalHeight3 = column3Data.length * 250;

  // Random card coloring effect (others are grayscale)
  useEffect(() => {
    const updateColors = () => {
      if (hoveredCard) return;

      const numColored = Math.floor(Math.random() * 4) + 5;
      const newColored = new Set<string>();
      const usedPositions = new Map<number, Set<number>>(); // Track positions per column
      const newOpacities = new Map<string, number>();

      // Initialize tracking for each column
      [0, 1, 2].forEach(col => usedPositions.set(col, new Set()));

      // Try to select cards avoiding adjacent images
      let attempts = 0;
      while (newColored.size < numColored && attempts < 150) {
        attempts++;

        // Pick a random column (0, 1, or 2)
        const columnIndex = Math.floor(Math.random() * 3);
        const columnData = [column1Data, column2Data, column3Data][columnIndex];

        // Pick a random item in that column (accounting for 3x duplication)
        const itemIndex = Math.floor(Math.random() * columnData.length);
        const duplicationSet = Math.floor(Math.random() * 3);
        const item = columnData[itemIndex];

        const cardKey = `${item.id}-${duplicationSet}`;

        // Check if this position would be adjacent to an existing colored card in this column
        const columnPositions = usedPositions.get(columnIndex)!;
        const globalIndex = itemIndex + (duplicationSet * columnData.length);

        // Check if adjacent positions are taken (within same duplication set matters most)
        const isAdjacent = Array.from(columnPositions).some(pos =>
          Math.abs(pos - globalIndex) === 1
        );

        // Allow if not adjacent, or if we're running out of attempts
        if (!isAdjacent || attempts > 120) {
          newColored.add(cardKey);
          columnPositions.add(globalIndex);
        }
      }

      // Assign varying opacities to all cards for depth effect
      // Opacity layers: 0.25, 0.35, 0.45, 0.55 for grayscale cards
      const opacityLevels = [0.25, 0.35, 0.45, 0.55];
      const allCards = [...masonryData, ...masonryData, ...masonryData];

      allCards.forEach((item, index) => {
        const cardKey = `${item.id}-${Math.floor(index / masonryData.length)}`;
        // Randomly assign an opacity level
        const opacity = opacityLevels[Math.floor(Math.random() * opacityLevels.length)];
        newOpacities.set(cardKey, opacity);
      });

      setColoredCards(newColored);
      setCardOpacities(newOpacities);
    };

    if (coloredCards.size === 0) {
      updateColors();
    }

    colorInterval.current = setInterval(updateColors, 3000);

    return () => {
      if (colorInterval.current) {
        clearInterval(colorInterval.current);
      }
    };
  }, [hoveredCard]);

  // Column 1 animation
  useEffect(() => {
    const animateColumn = async () => {
      while (true) {
        if (isPaused1) {
          await new Promise(resolve => setTimeout(resolve, 100));
          continue;
        }

        const currentY = y1.get();
        const normalizedY = currentY % -totalHeight1;

        await controls1.start({
          y: normalizedY - totalHeight1,
          transition: {
            duration: ((normalizedY - totalHeight1) - currentY) / -37.5, // pixels per second
            ease: 'linear'
          }
        });

        y1.set(0);
      }
    };

    animateColumn();
  }, [isPaused1, controls1, totalHeight1, y1]);

  // Column 2 animation
  useEffect(() => {
    const animateColumn = async () => {
      while (true) {
        if (isPaused2) {
          await new Promise(resolve => setTimeout(resolve, 100));
          continue;
        }

        const currentY = y2.get();
        const normalizedY = currentY % -totalHeight2;

        await controls2.start({
          y: normalizedY - totalHeight2,
          transition: {
            duration: ((normalizedY - totalHeight2) - currentY) / -33.3,
            ease: 'linear'
          }
        });

        y2.set(0);
      }
    };

    animateColumn();
  }, [isPaused2, controls2, totalHeight2, y2]);

  // Column 3 animation
  useEffect(() => {
    const animateColumn = async () => {
      while (true) {
        if (isPaused3) {
          await new Promise(resolve => setTimeout(resolve, 100));
          continue;
        }

        const currentY = y3.get();
        const normalizedY = currentY % -totalHeight3;

        await controls3.start({
          y: normalizedY - totalHeight3,
          transition: {
            duration: ((normalizedY - totalHeight3) - currentY) / -35.7,
            ease: 'linear'
          }
        });

        y3.set(0);
      }
    };

    animateColumn();
  }, [isPaused3, controls3, totalHeight3, y3]);

  const renderMasonryItem = (item: MasonryItem, itemKey: string) => {
    const isColored = coloredCards.has(itemKey) || hoveredCard === itemKey;
    const baseClasses = `masonry-item ${isColored ? 'masonry-item--colored' : 'masonry-item--grayscale'}`;
    const sizeStyle = sizeMap[item.size];

    // Get opacity for this card (only applied to grayscale)
    const cardOpacity = cardOpacities.get(itemKey) || 0.4;

    return (
      <div
        className={baseClasses}
        style={sizeStyle}
      >
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
    <div
      className="masonry-carousel"
      ref={containerRef}
    >
      <div className="masonry-columns">
        <motion.div
          className="masonry-column masonry-column--1"
          style={{ y: y1 }}
          animate={controls1}
          onMouseEnter={() => setIsPaused1(true)}
          onMouseLeave={() => setIsPaused1(false)}
        >
          {[...column1Data, ...column1Data, ...column1Data].map((item, index) => {
            const itemKey = `${item.id}-${Math.floor(index / column1Data.length)}`;
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
          })}
        </motion.div>

        <motion.div
          className="masonry-column masonry-column--2"
          style={{ y: y2 }}
          animate={controls2}
          onMouseEnter={() => setIsPaused2(true)}
          onMouseLeave={() => setIsPaused2(false)}
        >
          {[...column2Data, ...column2Data, ...column2Data].map((item, index) => {
            const itemKey = `${item.id}-${Math.floor(index / column2Data.length)}`;
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
          })}
        </motion.div>

        <motion.div
          className="masonry-column masonry-column--3"
          style={{ y: y3 }}
          animate={controls3}
          onMouseEnter={() => setIsPaused3(true)}
          onMouseLeave={() => setIsPaused3(false)}
        >
          {[...column3Data, ...column3Data, ...column3Data].map((item, index) => {
            const itemKey = `${item.id}-${Math.floor(index / column3Data.length)}`;
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
          })}
        </motion.div>
      </div>

      <style jsx>{`
        .masonry-carousel {
          position: relative;
          height: 80vh;
          overflow: hidden;
          padding-left: 20px;
          padding-right: 0;
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
          display: flex;
          gap: 12px;
          height: 100%;
          position: relative;
          justify-content: flex-end;
        }

        .masonry-column {
          flex: 0 0 250px;
          display: flex;
          flex-direction: column;
          gap: 10px;
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
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18) !important;
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

        @media (max-width: 1600px) {
          .masonry-column {
            flex: 0 0 230px;
          }
        }

        @media (max-width: 1440px) {
          .masonry-column {
            flex: 0 0 210px;
          }
        }

        @media (max-width: 1280px) {
          .masonry-column {
            flex: 0 0 190px;
          }
        }

        @media (max-width: 1024px) {
          .masonry-column {
            flex: 0 0 170px;
          }
        }

        @media (max-width: 768px) {
          .masonry-carousel {
            padding-left: 10px;
            height: 70vh;
          }

          .masonry-columns {
            gap: 8px;
          }

          .masonry-column {
            flex: 0 0 150px;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default MasonryCarousel;
