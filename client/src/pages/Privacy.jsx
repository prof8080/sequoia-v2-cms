import React from 'react';

export default function Privacy() {
  return (
    <div className="container py-12 max-w-4xl text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-primary">سياسة الخصوصية</h1>
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>مرحباً بك في Sequoia AI Insights. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>
        <h2 className="text-xl font-bold text-slate-800">1. البيانات التي نجمعها</h2>
        <p>نحن لا نجمع أي بيانات شخصية منك مباشرة إلا إذا قمت بالتواصل معنا أو الاشتراك في نشرتنا الإخبارية.</p>
        <h2 className="text-xl font-bold text-slate-800">2. إعلانات Google AdSense</h2>
        <p>يستخدم هذا الموقع جوجل أدسنس لعرض الإعلانات. تستخدم جوجل ملفات تعريف الارتباط (cookies) لعرض الإعلانات بناءً على زياراتك السابقة لهذا الموقع أو مواقع أخرى.</p>
        <h2 className="text-xl font-bold text-slate-800">3. حماية البيانات</h2>
        <p>نحن نطبق إجراءات أمنية لمنع الوصول غير المصرح به إلى معلوماتك.</p>
      </div>
    </div>
  );
}
