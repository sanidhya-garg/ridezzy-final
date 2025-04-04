import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Word {
  id: string;
  text: string;
  highlighted: boolean;
}

const AboutUs = () => {
  const paragraphText = "Ridezzy revolutionizes urban mobility through innovative EV solutions. Our platform offers flexible electric vehicle rentals with swappable batteries and smart fleet management, empowering delivery partners while reducing environmental impact. We combine cutting-edge technology with sustainable transportation to create cleaner, more efficient cities for tomorrow.";
  
  const [words, setWords] = useState<Word[]>(
    paragraphText.split(' ').map((word, i) => ({
      id: `word-${i}`,
      text: word,
      highlighted: false
    }))
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const highlightedWords = useRef<Set<string>>(new Set());

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const triggerPoint = window.innerHeight * 0.75;
    const wordElements = sectionRef.current.querySelectorAll('.about-word');
    const newHighlights = new Set<string>();

    wordElements.forEach((el) => {
      const wordRect = el.getBoundingClientRect();
      if (wordRect.top < triggerPoint) {
        const wordId = el.getAttribute('data-id');
        if (wordId) newHighlights.add(wordId);
      }
    });

    if (newHighlights.size !== highlightedWords.current.size || 
        !Array.from(newHighlights).every(val => highlightedWords.current.has(val))) {
      highlightedWords.current = newHighlights;
      setWords(prev => prev.map(word => ({
        ...word,
        highlighted: highlightedWords.current.has(word.id)
      })));
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
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f9f7f2',
        fontFamily: "'Inter', -apple-system, sans-serif",
        boxSizing: 'border-box'
      }}
    >
      <style>
        {`
          @keyframes wordPop {
            0% { transform: scale(0.95); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          .highlighted {
            position: relative;
            z-index: 1;
          }
          .highlighted::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 35%;
            background: rgba(255, 196, 0, 0.35);
            z-index: -1;
            border-radius: 3px;
            animation: highlightExpand 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          @keyframes highlightExpand {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}
      </style>

      <div style={{ 
        textAlign: 'center',
        marginBottom: '8vh'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: '700',
          color: '#2a2a2a',
          marginBottom: '2rem',
          lineHeight: '1.2'
        }}>
          About Us
        </h1>
        <div style={{
          width: '120px',
          height: '6px',
          background: 'linear-gradient(90deg, #FFD600, #FFA000)',
          margin: '0 auto',
          borderRadius: '3px',
          boxShadow: '0 2px 8px rgba(255, 180, 0, 0.2)'
        }} />
      </div>

      <p style={{
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        lineHeight: '1.6',
        color: '#333',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        letterSpacing: '0.2px',
        wordSpacing: '0.3em'
      }}>
        {words.map((word) => (
          <React.Fragment key={word.id}>
            <span 
              data-id={word.id}
              className={`about-word ${word.highlighted ? 'highlighted' : ''}`}
              style={{
                transition: 'all 0.3s ease-out',
                color: word.highlighted ? '#2a2a2a' : '#555',
                fontWeight: word.highlighted ? '650' : '450',
                display: 'inline-block',
                animation: word.highlighted ? 'wordPop 0.4s ease-out' : 'none',
                marginRight: '0.15em',
                whiteSpace: 'pre-wrap',
                padding: '0 1px'
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