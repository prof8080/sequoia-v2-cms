import React from 'react';

export default function About() {
  return (
    <div className="container py-12 max-w-4xl text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-primary">من نحن</h1>
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>Sequoia AI Insights هي منصة متخصصة في تقديم أحدث الأخبار والتحليلات في مجال الذكاء الاصطناعي والتكنولوجيا.</p>
        <p>هدفنا هو تمكين القارئ العربي من فهم التغيرات التكنولوجية المتسارعة وتأثيرها على حياتنا اليومية ومستقبلنا.</p>
      </div>
    </div>
  );
}
