import React, { useState, useEffect } from 'react';
/** @jsxImportSource react */
import type { FC } from 'react';
import { questions } from '../data/questions';
import { Timer, CheckCircle, XCircle } from 'lucide-react';

interface QuizProps {
  totalQuestions: number;
  onComplete: (score: number, userAnswers: number[]) => void;
}

interface Question {
  text: string;
  answers: string[];
  correctAnswer: number;
  explanation?: string;
}

export const Quiz: FC<QuizProps> = ({ totalQuestions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !showFeedback) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswer(-1);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, showFeedback]);

  useEffect(() => {
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [currentQuestion]);

  const handleAnswer = (answerIndex: number): void => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const newScore = answerIndex === questions[currentQuestion].correctAnswer ? score + 1 : score;
    setScore(newScore);
    
    // Track user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newUserAnswers);
    
    setTimeout(() => {
      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(newScore, newUserAnswers);
      }
    }, 3000);
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium text-gray-300 font-arabic">
            سؤال {currentQuestion + 1}/{totalQuestions}
          </div>
          <div className="flex items-center space-x-reverse space-x-2 text-gray-300">
            <Timer className="h-5 w-5" />
            <span>{timeLeft} ثانية</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 font-arabic">
            {question.text}
          </h2>
        </div>

        <div className="mb-4 w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswer(index)}
              disabled={showFeedback}
              className={`p-4 rounded-lg text-right transition-colors ${
                showFeedback
                  ? index === question.correctAnswer
                    ? 'bg-green-900 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-900 border-red-500'
                    : 'bg-gray-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              } border-2 font-arabic`}
            >
              <div className="flex items-center">
                <span className="ml-3">{String.fromCharCode(1632 + index)}.</span>
                <span>{answer}</span>
                {showFeedback && index === question.correctAnswer && (
                  <CheckCircle className="mr-auto h-5 w-5 text-green-500" />
                )}
                {showFeedback && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="mr-auto h-5 w-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && question.explanation && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-200 font-arabic">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}