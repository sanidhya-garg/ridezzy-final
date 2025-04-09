import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Word {
  id: string;
  text: string;
  highlighted: boolean;
}

const AboutUs = () => {
  const paragraphText = `Ridezzy is redefining urban transportation with advanced electric vehicle solutions tailored for modern logistics and personal mobility. Our flexible rental system, powered by swappable batteries and intelligent fleet management, is designed to empower delivery partners and promote sustainable, efficient transport. We’re committed to building cleaner cities through technology-driven, eco-conscious mobility solutions.`;

  const [words, setWords] = useState<Word[]>(
    paragraphText.split(' ').map((word, i) => ({
      id: `word-${i}`,
      text: word,
      highlighted: false,
    }))
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const highlightedWords = useRef<Set<string>>(new Set());

  const isMobile = window.innerWidth < 768;

  const highlightAllWords = useCallback(() => {
    const allIds = new Set(words.map((word) => word.id));
    highlightedWords.current = allIds;
    setWords((prev) =>
      prev.map((word) => ({
        ...word,
        highlighted: true,
      }))
    );
  }, [words]);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || isMobile) return;

    const triggerPoint = window.innerHeight * 0.85;
    const wordElements = sectionRef.current.querySelectorAll('.about-word');
    const newHighlights = new Set<string>();

    wordElements.forEach((el) => {
      const wordRect = el.getBoundingClientRect();
      if (wordRect.top < triggerPoint) {
        const wordId = el.getAttribute('data-id');
        if (wordId) newHighlights.add(wordId);
      }
    });

    if (
      newHighlights.size !== highlightedWords.current.size ||
      !Array.from(newHighlights).every((val) => highlightedWords.current.has(val))
    ) {
      highlightedWords.current = newHighlights;
      setWords((prev) =>
        prev.map((word) => ({
          ...word,
          highlighted: highlightedWords.current.has(word.id),
        }))
      );
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      highlightAllWords();
    } else {
      const scrollHandler = () => requestAnimationFrame(handleScroll);
      window.addEventListener('scroll', scrollHandler, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', scrollHandler);
    }
  }, [handleScroll, highlightAllWords, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="about-section"
      style={{
        padding: '6vh 8vw',
        background: '#fefefe',
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>
        {`
          @keyframes fadeInFloat {
            0% {
              transform: translateY(10px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .highlighted {
            animation: fadeInFloat 0.4s ease-out forwards;
          }

          @media (max-width: 768px) {
            .about-section {
              text-align: center;
            }

            .about-text {
              max-width: 100% !important;
              text-align: center !important;
            }

            .about-heading {
              text-align: center !important;
            }
          }
        `}
      </style>

      <div className="about-text" style={{ maxWidth: '820px', width: '100%' }}>
        <h2
          className="about-heading"
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: '#1e1e1e',
            marginBottom: '1.2rem',
            letterSpacing: '0.5px',
            textAlign: 'left',
          }}
        >
          <span style={{ color: '#FFD600' }}>About</span> Ridezzy
        </h2>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
            lineHeight: '1.8',
            color: '#444',
            textAlign: 'left',
          }}
        >
          {words.map((word) => (
            <React.Fragment key={word.id}>
              <span
                data-id={word.id}
                className={`about-word ${word.highlighted ? 'highlighted' : ''}`}
                style={{
                  display: 'inline-block',
                  transition: 'all 0.3s ease-out',
                  color: word.highlighted ? '#1e1e1e' : '#bbb',
                  fontWeight: word.highlighted ? 600 : 400,
                  marginRight: '0.3em',
                }}
              >
                {word.text}
              </span>
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
