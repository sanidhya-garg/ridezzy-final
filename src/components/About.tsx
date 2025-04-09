import React, { useState, useEffect, useRef, useCallback } from 'react';
import aboutImg from '../assets/delivery.jpeg';

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

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

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
  }, []);

  useEffect(() => {
    const scrollHandler = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '6vh 8vw',
        background: '#fefefe',
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '3rem',
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
              flex-direction: column !important;
            }
          }
        `}
      </style>

      {/* Text Section */}
      <div style={{ flex: '1 1 55%', maxWidth: '55%' }}>
        <h2
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
            maxWidth: '100%',
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

      {/* Clean Image Section */}
      <div
        style={{
          flex: '1 1 40%',
          maxWidth: '40%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <img
          src={aboutImg}
          alt="Delivery with Ridezzy"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '12px',
          }}
        />
      </div>
    </section>
  );
};

export default AboutUs;
