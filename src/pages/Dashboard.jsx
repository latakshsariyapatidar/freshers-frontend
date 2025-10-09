/**
 * Dashboard Component - Main Dashboard After Login
 * 
 * This component shows the main dashboard after successful login/signup.
 * It displays user information and provides navigation to different features
 * like v          </div>

          <div className="card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Anonymous shoutouts</h3>
                <p className="text-xs text-white/45">Coming soon</p>
              </div>
            </div>
            <p className="text-sm text-white/65">
              A secret messaging feature is being prepared. Stay tuned for the reveal!
            </p>
            <button disabled className="btn-secondary justify-center text-sm opacity-50 cursor-not-allowed">
              Coming soon
            </button>
          </div>
        </section>ons, and anonymous messages.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const metricCards = [
    {
      label: 'Your song submissions',
      value: stats.mySongs,
      icon: Music,
      accent: '#2cb67d'
    },
    {
      label: 'Your messages sent',
      value: stats.myMessages,
      icon: MessageCircle,
      accent: '#f25f4c'
    }
  ];

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
      <div className="px-4 sm:px-6 lg:px-8 pb-28">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-14 h-14 border-3 border-white/20 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-white/70 text-sm uppercase tracking-[0.35em]">Loading dashboard</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-28">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <section className="card">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(127,90,240,0.18)', color: '#7f5af0' }}>
                <PartyPopper className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/45">Dashboard</p>
                <h1 className="text-2xl font-semibold text-white mt-1">Welcome back, {user?.name}</h1>
                <p className="text-white/55 text-sm mt-1">
                  Prep for Freshers Night with live stats and quick actions.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="surface-soft px-4 py-3 rounded-2xl border border-white/8 flex items-center gap-3 min-w-[220px]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-white truncate">{user?.name}</p>
                  <p className="text-white/45 truncate">{user?.email}</p>
                  {isAdmin() && (
                    <span className="badge-muted mt-1 inline-block text-[10px] tracking-[0.3em] uppercase">Admin</span>
                  )}
                </div>
              </div>
              <button onClick={logout} className="btn-ghost flex items-center justify-center gap-2 text-sm">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metricCards.map(({ label, value, icon, accent }) => {
            const Icon = icon;
            return (
            <div key={label} className="surface-soft p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">{label}</p>
                  <p className="text-3xl font-semibold text-white mt-3">{value}</p>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent + '22', color: accent }}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
            );
          })}
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80">
                <Vote size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Cast your vote</h3>
                <p className="text-xs text-white/45">Voting is now open</p>
              </div>
            </div>
            <p className="text-sm text-white/65">
              Place your votes for Mr & Ms Freshie. Results update in real time.
            </p>
            <Link to="/voting" className="btn-secondary justify-center text-sm">
              Cast my vote
            </Link>
          </div>

          <div className="card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80">
                <Music size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Request tracks</h3>
                <p className="text-xs text-white/45">3 slots · Spotify links only</p>
              </div>
            </div>
            <p className="text-sm text-white/65">
              Submit up to three songs for the DJ set. We’ll confirm once they’re reviewed by the music team.
            </p>
            <Link to="/music" className="btn-primary justify-center text-sm">
              Share my picks
            </Link>
          </div>

          <div className="card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Anonymous shoutouts</h3>
                <p className="text-xs text-white/45">Drop a secret compliment</p>
              </div>
            </div>
            <p className="text-sm text-white/65">
              Fire off a totally anonymous note—just like NGL, but for Freshers Night. We’ll only reveal it if someone caught you typing.
            </p>
            <Link to="/messages" className="btn-secondary justify-center text-sm">
              Launch secret drop
            </Link>
          </div>
        </section>

        {/* Admin */}
        {isAdmin() && (
          <section className="card">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80">
                  <Settings size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Admin toolkit</h3>
                  <p className="text-xs text-white/45">Manage candidates, playlists, and submissions</p>
                </div>
              </div>
              <Link to="/admin" className="btn-primary justify-center text-sm">
                Open admin panel
              </Link>
            </div>
          </section>
        )}


      </div>
    </div>
  );
};

export default Dashboard;
