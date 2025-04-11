import React, { useState } from 'react';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Layout } from './components/Layout';

export type GameState = 'home' | 'quiz' | 'results';

function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [score, setScore] = useState(0);
  const [totalQuestions] = useState(10);

  const startQuiz = () => setGameState('quiz');
  const endQuiz = (finalScore: number) => {
    setScore(finalScore);
    setGameState('results');
  };
  const restartQuiz = () => {
    setScore(0);
    setGameState('home');
  };

  return (
    <Layout>
      {gameState === 'home' && <Home onStart={startQuiz} />}
      {gameState === 'quiz' && (
        <Quiz totalQuestions={totalQuestions} onComplete={endQuiz} />
      )}
      {gameState === 'results' && (
        <Results
          score={score}
          totalQuestions={totalQuestions}
          onRestart={restartQuiz}
        />
      )}
    </Layout>
  );
}

export default App;