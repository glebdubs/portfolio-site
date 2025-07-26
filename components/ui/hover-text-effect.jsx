import React, { useState, useEffect, useRef } from 'react';

const CursorTraceText = ({ text = "Hover over any character to see the effect!", className = "" }) => {
  const [charStates, setCharStates] = useState([]);
  const [activeIndices, setActiveIndices] = useState(new Set());
  const intervalRefs = useRef(new Map());
  const timeoutRefs = useRef(new Map());
  
  // Extended set of symbols for more variety
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`№§©®™€£¥¢¤°×÷±∞≈≠≤≥√∑∏∫∂∆∇';
  
  // Initialize character states
  useEffect(() => {
    setCharStates(text.split('').map((char, index) => ({
      char,
      display: char,
      index
    })));
  }, [text]);

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  const startEffect = (index) => {
    if (activeIndices.has(index)) {
      return;
    }
    // Clear any existing timeout for this character
    if (timeoutRefs.current.has(index)) {
      clearTimeout(timeoutRefs.current.get(index));
      timeoutRefs.current.delete(index);
    }
    
    // Add to active indices
    setActiveIndices(prev => new Set([...prev, index]));
    
    // Start cycling symbols
    const intervalId = setInterval(() => {
      setCharStates(prev =>
        prev.map((state, i) =>
          i === index ? { ...state, display: getRandomSymbol() } : state
        )
      );
    }, 50); // Faster cycling for more dynamic effect
    
    intervalRefs.current.set(index, intervalId);
  };

  const stopEffect = (index) => {
    // Set a timeout before stopping the effect
    const timeoutId = setTimeout(() => {
      // Clear the interval
      if (intervalRefs.current.has(index)) {
        clearInterval(intervalRefs.current.get(index));
        intervalRefs.current.delete(index);
      }
      
      // Remove from active indices
      setActiveIndices(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      
      // Reset to original character
      setCharStates(prev =>
        prev.map((state, i) =>
          i === index ? { ...state, display: state.char } : state
        )
      );
      
      timeoutRefs.current.delete(index);
    }, 900); // Effect continues for 600ms after mouse leave
    
    timeoutRefs.current.set(index, timeoutId);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      intervalRefs.current.forEach(interval => clearInterval(interval));
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className={`inline-block ${className}`}>
      <p className="font-mono rounded-lg shadow-lg">
        {charStates.map((state, index) => (
          <span
            key={index}
            className={`
              inline-block cursor-pointer transition-all duration-200
              ${activeIndices.has(index) ? 'text-orange-400 scale-110' : 'hover:text-gray-300'}
            `}
            onMouseEnter={() => startEffect(index)}
            onMouseLeave={() => stopEffect(index)}
            style={{
              display: 'inline-block',
              minWidth: state.char === ' ' ? '0.5em' : 'auto'
            }}
          >
            {state.display}
          </span>
        ))}
      </p>
    </div>
  );
};
export default CursorTraceText;