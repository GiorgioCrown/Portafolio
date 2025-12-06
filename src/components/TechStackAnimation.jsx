import { useState, useEffect } from 'react';

const technologies = [
  'Next.js',
  'React Native',
  'React.js',
  'Node.js',
  'Directus',
  'Shadcn',
  'Tailwind CSS',
  'Turborepo',
  'Pandas',
  'Matplotlib',
];

const TechStackAnimation = () => {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Efecto de cursor parpadeante
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentTech = technologies[currentTechIndex];
    let charIndex = 0;
    let timeoutId;

    if (isTyping) {
      // Escribir el texto letra por letra
      const typeChar = () => {
        if (charIndex < currentTech.length) {
          setDisplayText(currentTech.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeChar, 80);
        } else {
          // Esperar antes de borrar
          setTimeout(() => {
            setIsTyping(false);
          }, 2000);
        }
      };
      typeChar();
    } else {
      // Borrar el texto letra por letra
      const deleteChar = () => {
        if (charIndex > 0) {
          setDisplayText(currentTech.substring(0, charIndex - 1));
          charIndex--;
          timeoutId = setTimeout(deleteChar, 50);
        } else {
          // Cambiar a la siguiente tecnología
          setCurrentTechIndex((prev) => (prev + 1) % technologies.length);
          setIsTyping(true);
        }
      };
      deleteChar();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentTechIndex, isTyping]);

  // Calcular el ancho máximo necesario (la tecnología más larga)
  const maxWidth = Math.max(...technologies.map(tech => tech.length)) * 0.6; // Aproximación en rem

  return (
    <div className="flex items-center justify-center text-lg md:text-xl w-full">
      <span 
        className="relative inline-flex items-center justify-center"
        style={{
          minWidth: '200px',
        }}
      >
        <span
          className="
            font-mono font-semibold
            text-[--brand]
            inline-block
            relative
            whitespace-nowrap
          "
          style={{
            textShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
          }}
        >
          {displayText}
          <span
            className="
              inline-block w-0.5 h-5 md:h-6
              bg-[--brand]
              ml-1
              align-middle
            "
            style={{
              boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.1s ease-in-out',
            }}
          />
        </span>
        {/* Efecto de brillo que se mueve */}
        <span
          className="
            absolute inset-0
            bg-gradient-to-r
            from-transparent via-[--brand]/20 to-transparent
            -translate-x-full
            animate-shimmer
            pointer-events-none
          "
        />
      </span>
    </div>
  );
};

export default TechStackAnimation;

