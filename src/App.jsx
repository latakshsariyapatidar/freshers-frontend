import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Voting from './pages/Voting'
import MusicRequests from './pages/MusicRequests'
import Results from './pages/Results'
import AnonymousMessages from './pages/AnonymousMessages'
import ProtectedRoute from './components/ProtectedRoute'

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
              <Route path="/voting" element={
                <ProtectedRoute>
                  <Voting />
                </ProtectedRoute>
              } />
              <Route path="/music" element={
                <ProtectedRoute>
                  <MusicRequests />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <AnonymousMessages />
                </ProtectedRoute>
              } />
              <Route path="/results" element={<Results />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App