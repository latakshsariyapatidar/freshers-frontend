# IIT Dharwad Freshers Party 2025 🎉

A modern, mobile-optimized React application for the IIT Dharwad Fresh#### Authentication Endpoints
- ✅ `POST /api/v1/fresherParty/signup` - User registration
- ✅ `POST /api/v1/fresherParty/verify-otp` - Email verification  
- ✅ `POST /api/v1/fresherParty/login` - User loginParty 2025. This web app allows students to vote for Mr. & Ms. Freshie competitio# Fresher Party Voting System - Frontend

A comprehensive React-based frontend application for a Fresher Party voting system with real-time features, built with modern technologies including React 19, Vite, Tailwind CSS, Framer Motion, and comprehensive API integration.

## 🚀 Features

### ✅ Complete Authentication System
- **User Registration**: Complete signup flow with email/password
- **OTP Verification**: Email-based OTP verification for account activation  
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route-level authentication guards
- **Admin Role Support**: Role-based access control

### ✅ Voting System
- **Candidate Categories**: Mr. Fresher and Miss Fresher voting
- **Real-time Updates**: Live vote counting with Socket.IO
- **Vote Validation**: Prevents duplicate voting
- **Results Display**: Live results visualization

### ✅ Music Integration
- **Spotify Integration**: Submit up to 3 Spotify song suggestions
- **Song Management**: View and manage your submitted songs
- **Party Playlist**: Collective music curation

### ✅ Anonymous Messaging
- **Private Messages**: Send anonymous messages (max 100 words)
- **Message History**: View your sent messages
- **Admin Moderation**: Admin can view all messages

### ✅ Admin Panel
- **User Management**: View and manage users
- **Candidate Management**: Add/edit/remove candidates
- **Content Moderation**: Monitor messages and songs
- **System Analytics**: Comprehensive dashboard

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios with interceptors
- **Real-time**: Socket.IO Client
- **State Management**: React Context + Hooks
- **Authentication**: JWT tokens with localStorage

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication context
│   └── auth-context.js # Auth context definition
├── hooks/              # Custom React hooks
│   └── useAuth.js      # Authentication hook
├── pages/              # Page components
│   ├── Signup.jsx      # Complete signup with OTP flow
│   ├── Dashboard.jsx   # Main dashboard after login
│   └── ApiTestPage.jsx # API testing interface
├── services/           # API service layer
│   └── api.js          # Comprehensive API integration
└── assets/             # Static assets
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd freshers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   # API Configuration for Fresher Party Voting System
   VITE_API_URL=http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com/api
   VITE_SOCKET_URL=http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com
   
   # Legacy API URL (keep for backward compatibility)
   API_URL=http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 API Integration

### Backend API Endpoints

The application integrates with a comprehensive REST API hosted on AWS EC2. All endpoints are fully implemented and documented.

#### Authentication Endpoints
- `POST /api/v1/fresherParty/signup` - User registration
- `POST /api/v1/fresherParty/verifyOTP` - Email verification
- `POST /api/v1/fresherParty/login` - User login

#### Voting Endpoints
- `POST /api/v1/fresherParty/vote` - Cast a vote
- `GET /api/v1/fresherParty/vote/category/{category}` - Get candidates by category

#### Song Suggestion Endpoints
- `POST /api/v1/fresherParty/songs/submit` - Submit song suggestions
- `GET /api/v1/fresherParty/songs/my-suggestions` - Get user's songs

#### Anonymous Message Endpoints
- `POST /api/v1/fresherParty/messages/send` - Send anonymous message
- `GET /api/v1/fresherParty/messages/my-messages` - Get user's messages

#### Admin Endpoints (Admin Access Required)
- `GET /api/v1/fresherParty/admin/all` - Get all candidates
- `POST /api/v1/fresherParty/admin` - Create new candidate
- `GET /api/v1/fresherParty/messages/all` - Get all messages
- `GET /api/v1/fresherParty/messages/user/{email}` - Get user's messages
- `GET /api/v1/fresherParty/songs/all` - Get all song suggestions

### API Service Features

- **Comprehensive Error Handling**: Structured error responses with user-friendly messages
- **Request/Response Interceptors**: Automatic token attachment and response processing
- **Authentication Management**: Automatic token refresh and logout handling
- **Development Logging**: Detailed request/response logging in development mode
- **Network Error Handling**: Graceful handling of network connectivity issues
- **Response Standardization**: Consistent response format across all endpoints

## 🔐 Authentication Flow

### 1. User Registration
```javascript
// 1. User submits signup form
const signupResult = await signUp({
  name: 'User Name',
  email: 'user@example.com', 
  password: 'password123'
});

// 2. Backend sends OTP to email
// 3. User enters OTP
const verifyResult = await verifyOTP({
  email: 'user@example.com',
  otp: '123456'
});

// 4. JWT token stored, user logged in
```

### 2. User Login
```javascript
const loginResult = await login({
  email: 'user@example.com',
  password: 'password123'
});
// JWT token stored automatically
```

### 3. Authenticated Requests
```javascript
// Token automatically attached to all API requests
const candidates = await getCandidatesByCategory('Mr_Fresher');
const voteResult = await castVote('candidateId');
```

## 🎨 UI/UX Features

### Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Tailwind CSS**: Modern, utility-first styling
- **Gradient Themes**: Beautiful purple-blue gradient theme
- **Glass Morphism**: Modern glass-effect components

### Animations & Interactions
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Loading States**: Comprehensive loading indicators
- **Form Validation**: Real-time form validation with visual feedback
- **Interactive Elements**: Hover effects and button animations

### Accessibility
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Proper focus handling for modals and forms

## 🧪 Testing & Development

### API Testing Interface
The application includes a comprehensive API testing page (`/api-test`) that allows you to:

- Test all authentication endpoints
- Verify voting functionality
- Test song submission and retrieval
- Test anonymous messaging
- Verify admin functionalities
- View real-time API responses and errors

### Development Tools

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Preview production build**
   ```bash
   npm run preview
   ```

4. **Lint code**
   ```bash
   npm run lint
   ```

## 📝 Component Documentation

### Key Components

#### `AuthContext.jsx`
- Manages global authentication state
- Provides login/logout/signup functions
- Integrates with API service layer
- Handles JWT token management

#### `Signup.jsx`
- Complete registration flow with OTP verification
- Optimized with React.memo and useCallback
- Responsive design with smooth transitions
- Real-time form validation

#### `Dashboard.jsx`
- Main landing page after authentication
- Displays voting statistics and user info
- Navigation to all app features
- Real-time status indicators

#### `api.js`
- Comprehensive API service layer
- Axios configuration with interceptors
- Error handling and response standardization
- Legacy service compatibility

### Custom Hooks

#### `useAuth`
- Provides authentication context
- Returns user state and auth functions
- Handles loading states and errors
- Type-safe authentication checking

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Automatic Token Management**: Auto-refresh and cleanup
- **Protected Routes**: Route-level access control
- **Input Validation**: Client-side and server-side validation
- **XSS Protection**: Sanitized inputs and outputs
- **HTTPS Ready**: Production-ready security headers

## 🚀 Deployment

### Environment Configuration

For production deployment, ensure these environment variables are set:

```env
VITE_API_URL=https://your-production-api.com/api
VITE_SOCKET_URL=https://your-production-api.com
```

### Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The dist/ folder contains the production build
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Issues (Cross-Origin Resource Sharing)**
   - **Problem**: `Access to XMLHttpRequest has been blocked by CORS policy`
   - **Solution**: The Vite proxy configuration automatically handles this in development
   - **Verification**: Check that the dev server shows proxy logs in the terminal
   - **Production**: Ensure backend server includes proper CORS headers
   
   ```javascript
   // Vite proxy automatically forwards /api requests to backend
   // Development: http://localhost:5175/api/v1/fresherParty/signup
   // Proxied to: http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com/api/v1/fresherParty/signup
   ```

2. **API Connection Issues**
   - Check `.env` file configuration
   - Verify backend server is running and accessible
   - Check network connectivity to AWS EC2 instance
   - Use the API Health Check component to test connection

3. **Authentication Problems**
   - Clear localStorage: `localStorage.clear()`
   - Check JWT token expiration
   - Verify API endpoint URLs
   - Check browser network tab for detailed error responses

4. **Build Issues**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility (18+ required)
   - Verify all dependencies are installed
   - Clear Vite cache: `rm -rf node_modules/.vite`

### Development vs Production Configuration

#### Development (with Vite Proxy)
```env
# .env for development
VITE_API_URL=http://localhost:5175/api
```

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com',
      changeOrigin: true,
      secure: false
    }
  }
}
```

#### Production (Direct API Calls)
```env
# .env for production
VITE_API_URL=http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com/api
```

### Debug Mode

Enable development logging by checking these:
1. **API Requests**: Check browser console for detailed request/response logs
2. **Proxy Logs**: Check terminal for proxy forwarding messages
3. **Network Tab**: Use browser DevTools Network tab to inspect all requests

### Testing API Connection

Use the built-in API Health Check component:
```javascript
import ApiHealthCheck from './components/ApiHealthCheck';

// Add to any component for testing
<ApiHealthCheck />
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:
- Create an issue in the repository
- Check the API testing page for endpoint verification
- Review the browser console for detailed error logs

---

**Built with ❤️ for the Fresher Party 2024**quest songs, and view live results.

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
