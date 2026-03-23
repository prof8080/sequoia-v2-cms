# Sequoia V2 - AI News & Insights Platform

A modern, lightweight CMS built with React and Node.js for publishing AI and technology news articles.

## Features

- **React-based Frontend**: Modern, responsive UI with Tailwind CSS
- **Express Backend**: RESTful API with JWT authentication
- **SQLite Database**: Lightweight, file-based database
- **Admin Dashboard**: Full article management system
- **Arabic Support**: Full RTL support for Arabic content
- **AdSense Integration**: Ready for monetization with Google AdSense
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 19, Wouter, Axios, Framer Motion, Tailwind CSS |
| Backend | Node.js, Express, Better-SQLite3 |
| Authentication | JWT, Bcryptjs |
| Build Tools | Vite, npm |

## Project Structure

```
sequoia-v2/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components (Home, Admin, etc.)
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── public/            # Static files
│   └── vite.config.js     # Vite configuration
├── server/                # Node.js backend
│   ├── index.js           # Express server
│   ├── db.js              # Database initialization
│   └── .env.example       # Environment variables template
├── package.json           # Root dependencies
└── DEPLOYMENT.md          # Deployment instructions
```

## Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Build frontend**
   ```bash
   npm run build
   ```

3. **Start server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Main site: http://localhost:5000
   - Admin panel: http://localhost:5000/admin

### Initial Setup

1. Create the first admin account:
   ```bash
   curl -X POST http://localhost:5000/api/admin/setup \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"your-password"}'
   ```

2. Log in to the admin panel at `/admin`

3. Start adding articles

## API Endpoints

### Public Endpoints

- `GET /api/articles` - Get all articles

### Admin Endpoints (Require JWT Token)

- `POST /api/admin/login` - Admin login
- `POST /api/admin/setup` - Create first admin (only works if no admin exists)
- `POST /api/articles` - Create new article
- `DELETE /api/articles/:id` - Delete article

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
```

## Deployment

For permanent hosting, see [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:
- **Render.com** (Recommended)
- **Railway.app**
- **Vercel** (Frontend only)

## Security Notes

1. Change the default `JWT_SECRET` to a strong, random value
2. Disable the `/api/admin/setup` endpoint after initial setup
3. Use HTTPS in production
4. Keep dependencies updated

## Future Improvements

- [ ] Implement article edit functionality
- [ ] Add article detail pages
- [ ] Implement newsletter subscription
- [ ] Add image upload functionality
- [ ] Implement search functionality
- [ ] Add pagination for articles
- [ ] Implement user comments
- [ ] Add analytics integration

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

**Repository**: https://github.com/prof8080/sequoia-v2-cms
