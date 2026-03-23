# تعليمات النشر الدائم لمشروع Sequoia V2

هذا الملف يحتوي على تعليمات كاملة لنشر مشروع Sequoia V2 على خوادم دائمة.

## الخيار 1: النشر على Render.com (الموصى به)

### المميزات:
- دعم كامل لـ Node.js و SQLite
- تخزين دائم للملفات (Persistent Storage)
- نطاق مجاني أولي
- سهل الاستخدام

### خطوات النشر:

1. **انتقل إلى موقع Render.com**
   - اذهب إلى https://render.com
   - سجل حسابًا جديدًا أو قم بتسجيل الدخول

2. **إنشاء Web Service جديد**
   - انقر على "New +" ثم اختر "Web Service"
   - اختر "Deploy an existing repository"
   - اختر المستودع `sequoia-v2-cms` من GitHub

3. **تكوين الإعدادات**
   - **Name**: `sequoia-v2`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: اختر الخطة المناسبة (يمكن البدء بـ Free)

4. **إضافة متغيرات البيئة**
   - انقر على "Environment"
   - أضف المتغيرات التالية:
     ```
     JWT_SECRET=your-very-secure-random-string-here
     NODE_ENV=production
     PORT=5000
     ```

5. **تفعيل Persistent Storage**
   - انقر على "Disks"
   - أضف disk جديد:
     - **Mount Path**: `/var/data`
     - **Size**: 1 GB (أو أكثر حسب الحاجة)
   - عدّل `server/db.js` لاستخدام المسار:
     ```javascript
     const dbPath = join('/var/data', 'database.sqlite');
     ```

6. **النشر**
   - انقر على "Deploy"
   - انتظر اكتمال النشر (عادة 2-5 دقائق)

---

## الخيار 2: النشر على Railway.app

### المميزات:
- واجهة سهلة الاستخدام
- دعم قواعد بيانات متعددة
- نطاق مجاني

### خطوات النشر:

1. **انتقل إلى موقع Railway.app**
   - اذهب إلى https://railway.app
   - سجل حسابًا جديدًا باستخدام GitHub

2. **إنشاء مشروع جديد**
   - انقر على "New Project"
   - اختر "Deploy from GitHub repo"
   - اختر المستودع `sequoia-v2-cms`

3. **تكوين الإعدادات**
   - أضف متغيرات البيئة:
     ```
     JWT_SECRET=your-very-secure-random-string-here
     NODE_ENV=production
     ```

4. **النشر**
   - Railway سيقوم بالنشر تلقائيًا

---

## الخيار 3: النشر على Vercel (للواجهة الأمامية فقط)

إذا كنت تريد فصل الواجهة الأمامية عن الخادم:

### نشر الخادم على Render أو Railway
### نشر الواجهة الأمامية على Vercel

1. **انتقل إلى Vercel**
   - اذهب إلى https://vercel.com
   - سجل بحسابك على GitHub

2. **استيراد المشروع**
   - انقر على "New Project"
   - اختر المستودع `sequoia-v2-cms`

3. **تكوين الإعدادات**
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build` (في مجلد client)
   - **Output Directory**: `client/dist`

4. **إضافة متغيرات البيئة**
   - أضف `VITE_API_URL` بقيمة رابط الخادم (Render أو Railway)

---

## تحديث قاعدة البيانات

بعد النشر، ستحتاج إلى إعداد حساب المشرف الأول:

```bash
curl -X POST https://your-deployed-url/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-secure-password"}'
```

---

## نصائح الأمان

1. **غيّر JWT_SECRET**: استخدم قيمة قوية وعشوائية
2. **استخدم HTTPS**: تأكد من أن الموقع يستخدم HTTPS
3. **حماية نقطة الإعداد**: بعد إنشاء المشرف الأول، قم بتعطيل `/api/admin/setup`
4. **نسخ احتياطية**: قم بعمل نسخ احتياطية دورية من قاعدة البيانات

---

## استكشاف الأخطاء

### الموقع يعرض خطأ 404
- تأكد من أن `Build Command` يشمل `npm run build` في مجلد client
- تأكد من أن `Output Directory` يشير إلى `client/dist`

### لا يمكن الوصول إلى API
- تأكد من أن الخادم يعمل على المنفذ 5000
- تأكد من أن متغيرات البيئة تم تعيينها بشكل صحيح

### فقدان البيانات بعد إعادة النشر
- تأكد من تفعيل Persistent Storage على Render
- تأكد من أن مسار قاعدة البيانات يشير إلى المجلد الدائم

---

## الدعم والمساعدة

للمزيد من المعلومات، راجع:
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
