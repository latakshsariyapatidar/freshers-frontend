import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ApiTestPage from './pages/ApiTestPage'
// TODO: Temporarily hidden - will be enabled later
// import Voting from './pages/Voting'
import MusicRequests from './pages/MusicRequests'
// TODO: Temporarily hidden - will be enabled later
// import AnonymousMessages from './pages/AnonymousMessages'
import Schedule from './pages/Schedule'
import ProtectedRoute from './components/ProtectedRoute'

// Import debug test for signup
if (import.meta.env.DEV) {
  import('./debug/signupTest.js');
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-slate-100">
          <Navbar />
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/api-test" element={<ApiTestPage />} />
              {/* TODO: Temporarily hidden - will be enabled later */}
              {/* <Route path="/voting" element={
                <ProtectedRoute>
                  <Voting />
                </ProtectedRoute>
              } /> */}
              <Route path="/music" element={
                <ProtectedRoute>
                  <MusicRequests />
                </ProtectedRoute>
              } />
              {/* TODO: Temporarily hidden - will be enabled later */}
              {/* <Route path="/messages" element={
                <ProtectedRoute>
                  <AnonymousMessages />
                </ProtectedRoute>
              } /> */}
              <Route path="/schedule" element={<Schedule />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App