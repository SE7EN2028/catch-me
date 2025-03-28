import React, { useState, useEffect } from 'react';
import './CatchMeIfYouCan.css';
import characterImg from './character.png';

function CatchMeIfYouCan() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePosition, setActivePosition] = useState(null);
  
  console.log("Image path:", characterImg);

  function startGame() {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setActivePosition(null);
  }

  function catchCharacter(position) {
    if (position === activePosition && isPlaying) {
      setScore(score + 1);
      setActivePosition(null);
    }
  }

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let characterInterval;
    
    if (isPlaying) {
      characterInterval = setInterval(() => {
        const newPosition = Math.floor(Math.random() * 9);
        setActivePosition(newPosition);
        
        setTimeout(() => {
          setActivePosition(null);
        }, 700);
      }, 800);
    }
    
    return () => clearInterval(characterInterval);
  }, [isPlaying]);

  const positions = Array(9).fill(null);

  return (
    <div className="game-container">
      <h1 className="game-title">Catch The Rat</h1>
      
      <div style={{ display: 'none' }}>
        <img src={characterImg} alt="Test" />
      </div>
      
      <div className="game-info">
        <div className="score">Score: {score}</div>
        <div className="timer">Time: {timeLeft}s</div>
      </div>
      
      {!isPlaying && (
        <button 
          className="start-button"
          onClick={startGame}
        >
          {timeLeft === 30 ? 'Start Game' : 'Play Again'}
        </button>
      )}
      
      <div className="game-board">
        {positions.map((_, index) => (
          <div 
            key={index} 
            className="hole"
            onClick={() => catchCharacter(index)}
          >
            <div className={`character ${activePosition === index ? 'active' : ''}`}>
              <img 
                src={characterImg} 
                alt="Character" 
                className="character-image" 
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatchMeIfYouCan;