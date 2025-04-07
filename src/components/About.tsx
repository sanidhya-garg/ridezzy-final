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
        padding: '10vh 10vw',
        backgroundColor: '#fdfdfd',
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              transform: translateY(8px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .highlighted {
            animation: fadeInUp 0.4s ease-out forwards;
          }
        `}
      </style>

      <div style={{ marginBottom: '3rem', maxWidth: '1000px' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#1e1e1e',
            marginBottom: '0.5rem',
            letterSpacing: '0.5px',
            textAlign: 'left',
          }}
        >
          <span style={{ color: '#FFD600' }}>About</span> Ridezzy
        </h2>
      </div>

      <p
        style={{
          fontSize: 'clamp(1.5rem, 2vw, 2rem)',
          lineHeight: '1.8',
          color: '#444',
          maxWidth: '1000px',
          letterSpacing: '0.3px',
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
                color: word.highlighted ? '#1e1e1e' : '#aaa',
                fontWeight: word.highlighted ? 600 : 400,
                marginRight: '0.25em',
                whiteSpace: 'pre-wrap',
              }}
            >
              {word.text}
            </span>
          </React.Fragment>
        ))}
      </p>
    </section>
  );
};

export default AboutUs;
