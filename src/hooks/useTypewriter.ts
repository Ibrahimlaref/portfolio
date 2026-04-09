// hooks/useTypewriter.ts
import { useState, useEffect } from 'react';

export const useTypewriter = (texts: string[], speed: number = 100) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.slice(0, currentText.length + 1));
        if (currentText.length === text.length) {
          setTimeout(() => setIsDeleting(true), 2000); // pause
        }
      } else {
        setCurrentText(text.slice(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts, speed]);

  return currentText;
};