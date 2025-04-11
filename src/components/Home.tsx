import React from 'react';
import { BookOpen, Timer, Award } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  return (
    <div className="max-w-3xl mx-auto text-center" dir="rtl">
      <h1 className="text-4xl font-bold text-gray-100 mb-8 font-arabic">
        مرحباً بك في اختبار المعرفة المغربية
      </h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 font-arabic">كيفية اللعب</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center">
            <BookOpen className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-100 mb-2 font-arabic">الأسئلة</h3>
            <p className="text-gray-300 font-arabic">أجب على أسئلة حول المغرب والمعرفة العامة</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Timer className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-100 mb-2 font-arabic">الوقت المحدد</h3>
            <p className="text-gray-300 font-arabic">30 ثانية لكل سؤال لاختبار معرفتك</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Award className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-100 mb-2 font-arabic">النتيجة</h3>
            <p className="text-gray-300 font-arabic">احصل على نقاط لكل إجابة صحيحة</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-arabic"
        >
          ابدأ الاختبار
        </button>
      </div>
    </div>
  );
}