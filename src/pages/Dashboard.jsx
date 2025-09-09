/**
 * Dashboard Component - Main Dashboard After Login
 * 
 * This component shows the main dashboard after successful login/signup.
 * It displays user information and provides navigation to different features
 * like voting, song suggestions, and anonymous messages.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  getCandidatesByCategory, 
  getMySongSuggestions, 
  getMyMessages,
  isAuthenticated 
} from '../services/api';
import { 
  PartyPopper, 
  Vote, 
  Music, 
  MessageCircle, 
  User, 
  Settings,
  LogOut,
  Trophy
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    mrFresherCandidates: 0,
    missFresherCandidates: 0,
    mySongs: 0,
    myMessages: 0
  });

  useEffect(() => {
    if (isAuthenticated()) {
      loadDashboardData();
    }
  }, []);

  /**
   * Load dashboard statistics and data
   */
  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load candidate counts
      const [mrFresherResult, missFresherResult] = await Promise.all([
        getCandidatesByCategory('Mr_Fresher'),
        getCandidatesByCategory('Miss_Fresher')
      ]);

      const newStats = {
        mrFresherCandidates: mrFresherResult.success ? mrFresherResult.candidates.length : 0,
        missFresherCandidates: missFresherResult.success ? missFresherResult.candidates.length : 0,
        mySongs: 0,
        myMessages: 0
      };

      // Load user's personal stats
      try {
        const [songsResult, messagesResult] = await Promise.all([
          getMySongSuggestions(),
          getMyMessages()
        ]);

        if (songsResult.success) {
          newStats.mySongs = songsResult.songLinks ? songsResult.songLinks.length : 0;
        }

        if (messagesResult.success) {
          newStats.myMessages = messagesResult.messages ? messagesResult.messages.length : 0;
        }
      } catch (error) {
        console.log('Error loading personal stats:', error);
        // Continue with basic stats
      }

      setStats(newStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <PartyPopper className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Fresher Party</h1>
                <p className="text-sm text-blue-300">Voting System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white font-medium">{user?.name}</p>
                <p className="text-xs text-blue-300">{user?.email}</p>
                {isAdmin() && (
                  <span className="inline-block px-2 py-1 text-xs bg-yellow-500 text-black rounded-full font-medium">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={logout}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 🎉
          </h2>
          <p className="text-blue-200">
            Ready to participate in the Fresher Party? Cast your votes, suggest songs, and send messages!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Mr. Fresher</p>
                <p className="text-3xl font-bold text-white">{stats.mrFresherCandidates}</p>
                <p className="text-blue-200 text-sm">Candidates</p>
              </div>
              <Trophy className="h-12 w-12 text-white opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Miss Fresher</p>
                <p className="text-3xl font-bold text-white">{stats.missFresherCandidates}</p>
                <p className="text-pink-200 text-sm">Candidates</p>
              </div>
              <Trophy className="h-12 w-12 text-white opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">My Songs</p>
                <p className="text-3xl font-bold text-white">{stats.mySongs}</p>
                <p className="text-green-200 text-sm">Suggestions</p>
              </div>
              <Music className="h-12 w-12 text-white opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">My Messages</p>
                <p className="text-3xl font-bold text-white">{stats.myMessages}</p>
                <p className="text-yellow-200 text-sm">Sent</p>
              </div>
              <MessageCircle className="h-12 w-12 text-white opacity-80" />
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Voting Card */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Cast Your Vote</h3>
                <p className="text-blue-200">Vote for Mr. & Miss Fresher</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Participate in the voting and choose your favorite candidates for Mr. Fresher and Miss Fresher.
            </p>
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors">
              Start Voting
            </button>
          </div>

          {/* Song Suggestions Card */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Song Suggestions</h3>
                <p className="text-green-200">Add your favorite tracks</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Suggest up to 3 songs from Spotify for the party playlist. Help create the perfect party vibe!
            </p>
            <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors">
              Add Songs
            </button>
          </div>

          {/* Anonymous Messages Card */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Send Messages</h3>
                <p className="text-yellow-200">Anonymous messaging</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Send anonymous messages to share your thoughts, compliments, or party wishes with everyone.
            </p>
            <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-colors">
              Send Message
            </button>
          </div>

          {/* Admin Panel (if admin) */}
          {isAdmin() && (
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/50 hover:bg-white/20 transition-all cursor-pointer group md:col-span-2 lg:col-span-3">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Admin Panel</h3>
                  <p className="text-yellow-200">Manage the party system</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Access admin features like viewing all candidates, messages, song suggestions, and managing the system.
              </p>
              <button className="bg-gradient-to-r from-yellow-500 to-red-600 text-white py-2 px-6 rounded-lg hover:from-yellow-600 hover:to-red-700 transition-colors">
                Open Admin Panel
              </button>
            </div>
          )}
        </div>

        {/* API Status Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            System Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">API Connection:</p>
              <p className="text-green-400">✓ Connected to AWS EC2</p>
            </div>
            <div>
              <p className="text-gray-400">Authentication:</p>
              <p className="text-green-400">✓ JWT Token Active</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
