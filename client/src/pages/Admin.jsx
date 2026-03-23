import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, Plus, Trash2, Edit2, Newspaper } from 'lucide-react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', description: '', content: '', category: 'General' });

  useEffect(() => {
    if (isLoggedIn) {
      fetchArticles();
    }
  }, [isLoggedIn]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('/api/articles');
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/articles', newArticle, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setNewArticle({ title: '', description: '', content: '', category: 'General' });
      fetchArticles();
    } catch (err) {
      alert('Failed to add article');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await axios.delete(`/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchArticles();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Sequoia Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4 text-right" dir="rtl">
            <div>
              <label className="block text-sm font-medium mb-1">اسم المستخدم</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">كلمة المرور</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" required />
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all">دخول</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <div className="flex items-center gap-3 mb-8">
          <Newspaper className="text-primary" />
          <h1 className="text-xl font-bold">لوحة التحكم</h1>
        </div>
        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-slate-800 rounded-lg"><LayoutDashboard size={20} /> المقالات</button>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-all"><LogOut size={20} /> خروج</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">إدارة المقالات</h2>
          <div className="md:hidden">
            <button onClick={handleLogout} className="text-red-500 font-bold p-2">خروج</button>
          </div>
        </div>

        {/* Add New Form */}
        <section className="bg-white p-6 rounded-2xl shadow-sm mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="text-green-500" /> إضافة مقال جديد</h3>
          <form onSubmit={handleAddArticle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="العنوان" value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})} className="p-3 border rounded-lg" required />
            <input placeholder="التصنيف" value={newArticle.category} onChange={e => setNewArticle({...newArticle, category: e.target.value})} className="p-3 border rounded-lg" />
            <textarea placeholder="الوصف المختصر" value={newArticle.description} onChange={e => setNewArticle({...newArticle, description: e.target.value})} className="p-3 border rounded-lg md:col-span-2" rows="2" />
            <textarea placeholder="المحتوى" value={newArticle.content} onChange={e => setNewArticle({...newArticle, content: e.target.value})} className="p-3 border rounded-lg md:col-span-2" rows="6" required />
            <button type="submit" className="md:col-span-2 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all">نشر المقال</button>
          </form>
        </section>

        {/* Article List */}
        <div className="space-y-4">
          {articles.map(article => (
            <div key={article.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border-l-4 border-primary">
              <div>
                <h4 className="font-bold text-lg">{article.title}</h4>
                <p className="text-sm text-slate-500">{new Date(article.published_at).toLocaleDateString('ar-EG')}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-500"><Edit2 size={20} /></button>
                <button onClick={() => handleDelete(article.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
