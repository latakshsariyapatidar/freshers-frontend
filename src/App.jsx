import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ApiTestPage from "./pages/ApiTestPage";
import AdminPanel from "./pages/AdminPanel";
import MusicRequests from "./pages/MusicRequests";
import AnonymousMessages from "./pages/AnonymousMessages";
import AdminAnonymousMessages from "./pages/AdminAnonymousMessages";
import AddCandidate from "./pages/AddCandidate";
import Voting from "./pages/Voting";
import Schedule from "./pages/Schedule";
import ProtectedRoute from "./components/ProtectedRoute";
// Import debug test for signup
if (import.meta.env.DEV) {
  import("./debug/signupTest.js");
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen app-shell">
          <Navbar />
          <main className="pb-28 pt-16 lg:pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/api-test" element={<ApiTestPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiresAdmin>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/messages"
                element={
                  <ProtectedRoute requiresAdmin>
                    <AdminAnonymousMessages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/addCandidate"
                element={
                  <ProtectedRoute requiresAdmin>
                    <AddCandidate />
                  </ProtectedRoute>
                }
              />
              {/* TODO: Temporarily hidden - will be enabled later */}
              {/* <Route
                path="/voting"
                element={
                  <ProtectedRoute>
                    <Voting />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/music"
                element={
                  <ProtectedRoute>
                    <MusicRequests />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <AnonymousMessages />
                  </ProtectedRoute>
                }
              /> */}
              <Route path="/schedule" element={<Schedule />} />
            </Routes>
          </main>
        </div>
      </Router>

    </AuthProvider>
  );
}

export default App;
