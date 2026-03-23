import React from 'react';

export default function Terms() {
  return (
    <div className="container py-12 max-w-4xl text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-primary">اتفاقية الاستخدام</h1>
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>باستخدامك لموقع Sequoia AI Insights، فإنك توافق على الشروط والأحكام التالية:</p>
        <h2 className="text-xl font-bold text-slate-800">1. شروط الاستخدام</h2>
        <p>يُسمح باستخدام المحتوى لأغراض شخصية وغير تجارية فقط. يمنع نسخ المحتوى دون إذن كتابي.</p>
        <h2 className="text-xl font-bold text-slate-800">2. إخلاء المسؤولية</h2>
        <p>المعلومات المقدمة في الموقع هي للأغراض العامة والإعلامية فقط ولا نضمن دقتها بنسبة 100%.</p>
      </div>
    </div>
  );
}
