import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, Newspaper, Calendar, User } from 'lucide-react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('/api/articles').then(res => setArticles(res.data)).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-4">Sequoia AI Insights</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">روؤى متقدمة في عالم الذكاء الاصطناعي والتكنولوجيا الحديثة</p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Feed */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 border-b-4 border-primary pb-2 w-fit">
              <Newspaper className="text-primary" /> آخر الأخبار
            </h2>
            
            <div className="grid gap-6">
              {articles.length === 0 ? (
                <div className="bg-slate-50 p-12 rounded-2xl text-center text-slate-500">لا توجد مقالات حالياً</div>
              ) : (
                articles.map(article => (
                  <motion.article key={article.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{article.category}</span>
                    <h3 className="text-2xl font-bold mt-3 mb-2">{article.title}</h3>
                    <p className="text-slate-600 mb-4">{article.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(article.published_at).toLocaleDateString('ar-EG')}</span>
                      <span className="flex items-center gap-1"><User size={14} /> المشرف</span>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </div>

          {/* Sidebar / Ads */}
          <aside className="space-y-8 text-center">
            <div className="bg-slate-100 h-64 flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-300">
              <span className="text-slate-400">هنا ستظهر إعلانات AdSense</span>
            </div>
            
            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg shadow-primary/20">
              <h3 className="text-xl font-bold mb-2">اشترك في نشرتنا</h3>
              <p className="text-sm text-primary-foreground mb-4 opacity-80">احصل على آخر التحديثات مباشرة</p>
              <div className="flex gap-2">
                <input className="bg-white/10 border border-white/20 p-2 rounded-lg flex-1 text-sm outline-none placeholder:text-white/50" placeholder="بريدك الإلكتروني" />
                <button className="bg-white text-primary p-2 px-4 rounded-lg font-bold text-sm">متابعة</button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-white font-medium">
            <a href="/about">من نحن</a>
            <a href="/privacy">سياسة الخصوصية</a>
            <a href="/terms">اتفاقية الاستخدام</a>
          </div>
          <p>© 2025 Sequoia AI Insights. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
