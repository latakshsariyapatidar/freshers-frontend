# IIT Dharwad Freshers Party 2025 🎉

A modern, mobile-optimized React application for the IIT Dharwad Freshers Party 2025. This web app allows students to vote for Mr. & Ms. Freshie competitions, request songs, and view live results.

## ✅ Project Status

**The frontend is complete and ready for backend integration!**

- ✅ All components implemented
- ✅ Mobile-responsive design
- ✅ Authentication flow ready
- ✅ Voting system UI complete
- ✅ Music requests feature
- ✅ Real-time results display
- ✅ All lint issues resolved
- ✅ Clean, maintainable code structure

## Features ✨

- **🗳️ Voting System**: Vote for Mr. and Ms. Freshie participants
- **🎵 Music Requests**: Submit song requests for the DJ
- **📊 Real-time Results**: Live voting results with Socket.io
- **👤 User Authentication**: Login/Signup system
- **📱 Mobile Optimized**: Responsive design for all screen sizes
- **🎨 Modern UI**: Clean, funky design with Tailwind CSS and Framer Motion

## Tech Stack 🚀

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Routing**: React Router DOM

## Getting Started 🏃‍♂️

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd freshers
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your backend URLs:
```
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   ├── ProtectedRoute.jsx # Route protection
│   └── Loading.jsx     # Loading component
├── pages/              # Page components
│   ├── Home.jsx       # Landing page
│   ├── Login.jsx      # Login page
│   ├── Signup.jsx     # Registration page
│   ├── Voting.jsx     # Voting interface
│   ├── MusicRequests.jsx # Music requests
│   └── Results.jsx    # Live results
├── context/            # React Context and providers
│   ├── auth-context.js # Auth context definition
│   └── AuthContext.jsx # Auth provider component
├── hooks/              # Custom React hooks
│   └── useAuth.js     # Authentication hook
├── services/           # API services
│   └── api.js         # API calls and socket setup
└── App.jsx            # Main app component
```

## Backend Integration 🔗

This frontend is designed to work with a Node.js/Express backend. The API service is ready and waiting for your backend endpoints:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration  
- `GET /api/auth/profile` - Get user profile

### Voting Endpoints
- `GET /api/voting/participants` - Get all participants
- `POST /api/voting/vote` - Cast a vote
- `GET /api/voting/results` - Get voting results
- `GET /api/voting/has-voted/:category` - Check if user voted

### Music Endpoints
- `POST /api/music/request` - Submit song request
- `GET /api/music/requests` - Get all requests

### Socket Events
- `votesUpdated` - Real-time vote updates
- `participantsUpdated` - Participant list updates

## Key Features Ready for Integration 🎯

### 1. **Authentication System**
- Complete login/signup forms
- JWT token handling
- Protected routes
- User session management

### 2. **Voting System**
- Participant display cards
- Vote submission
- Vote status tracking
- Real-time updates ready

### 3. **Music Requests**
- Song request form
- Request history
- Like/dislike system ready

### 4. **Live Results**
- Real-time vote counting
- Leaderboard display
- Progress bars and animations

## Mobile Optimization 📱

The app is fully optimized for mobile devices:
- Touch-friendly UI elements
- Responsive breakpoints
- Mobile-first design approach
- Proper viewport configuration
- Performance optimized

## Next Steps for Backend Integration 🛠️

1. **Set up your backend API** with the endpoints listed above
2. **Update environment variables** in `.env` with your backend URLs
3. **Configure CORS** on your backend to allow requests from the frontend
4. **Set up Socket.io** on your backend for real-time features
5. **Test all endpoints** with the frontend

## Deployment 🚢

### Build for production:
```bash
npm run build
```

### Deploy to platforms like:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Remember to update environment variables in your deployment platform.

## Development Notes �

- All lint issues resolved
- Code follows React best practices
- Components are reusable and maintainable
- Error handling implemented throughout
- Loading states included
- Responsive design tested

---

**Frontend Complete! Ready for backend integration! 🚀**

**Made with ❤️ for IIT Dharwad Freshers Party 2025**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
