import * as React from 'react';
import { useState } from 'react';
import type { FC } from 'react';
import { Trophy, Share2, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { questions } from '../data/questions';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  userAnswers?: number[];
}

export const Results: FC<ResultsProps> = ({ score, totalQuestions, onRestart, userAnswers = [] }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const [showExplanations, setShowExplanations] = useState(false);
  
  const shareResults = async (): Promise<void> => {
    const shareData: ShareData = {
      title: 'نتائج اختبار المعرفة المغربية',
      text: `حصلت على ${score}/${totalQuestions} (${percentage}%) في اختبار المعرفة المغربية! هل يمكنك تحقيق نتيجة أفضل؟`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        alert('تم نسخ النتائج إلى الحافظة!');
      } else {
        alert('عذراً، لا يمكن مشاركة النتائج على هذا المتصفح.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('حدث خطأ أثناء محاولة المشاركة.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto" dir="rtl">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
        <div className="flex justify-center mb-6">
          <Trophy className="h-16 w-16 text-yellow-400" />
        </div>

        <h2 className="text-3xl font-bold text-gray-100 mb-4 font-arabic">اكتمل الاختبار!</h2>
        
        <div className="text-5xl font-bold text-blue-400 mb-4 font-arabic">
          {percentage}%
        </div>
        
        <p className="text-xl text-gray-300 mb-8 font-arabic">
          حصلت على {score} من أصل {totalQuestions} إجابات صحيحة
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onRestart}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-arabic"
          >
            <RotateCcw className="h-5 w-5 ml-2" />
            <span>حاول مرة أخرى</span>
          </button>
          
          <button
            onClick={shareResults}
            className="flex items-center justify-center space-x-2 bg-gray-700 text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors font-arabic"
          >
            <Share2 className="h-5 w-5 ml-2" />
            <span>شارك النتائج</span>
          </button>
        </div>

        <button
          onClick={() => setShowExplanations(!showExplanations)}
          className="mt-6 flex items-center justify-center space-x-reverse space-x-2 text-gray-300 hover:text-gray-100 transition-colors font-arabic"
        >
          {showExplanations ? (
            <ChevronUp className="h-5 w-5 ml-2" />
          ) : (
            <ChevronDown className="h-5 w-5 ml-2" />
          )}
          <span>عرض التفسيرات</span>
        </button>

        {showExplanations && (
          <div className="mt-6 space-y-4 text-right">
            {questions.slice(0, totalQuestions).map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <div key={index} className={`bg-gray-700 rounded-lg p-4 border-2 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-100 font-semibold font-arabic flex-1">{question.text}</h3>
                    {userAnswer !== undefined && (
                      <span className={`px-3 py-1 rounded-full text-sm ${isCorrect ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {isCorrect ? 'صحيح' : 'خطأ'}
                      </span>
                    )}
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-300 font-arabic">
                      إجابتك: {userAnswer !== undefined ? question.answers[userAnswer] : 'لم تجب'}
                    </p>
                    <p className="text-green-400 font-arabic">
                      الإجابة الصحيحة: {question.answers[question.correctAnswer]}
                    </p>
                  </div>
                  {question.explanation && (
                    <p className="text-gray-300 font-arabic mt-2 pt-2 border-t border-gray-600">
                      {question.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}