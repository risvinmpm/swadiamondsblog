"use client";

import React, { useEffect, useState } from "react";

interface Props {
  words: string[];
  typeSpeed?: number;
  pause?: number;
}

const AutoTypingText: React.FC<Props> = ({ words, typeSpeed = 50, pause = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    if (charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentWord.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, typeSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, wordIndex, words, typeSpeed, pause]);

  return (
    <span className="whitespace-normal break-words text-base leading-relaxed">
      {displayedText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

export default AutoTypingText;
