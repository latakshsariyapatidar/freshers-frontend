import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Menu,
  X,
  Home,
  Music,
  LogOut,
  User,
  Calendar,
  LayoutDashboard,
  Shield,
  Lock
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdminUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic event name for October 10-11, 2025
  const getCurrentEventName = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth() + 1;

    if (currentMonth === 10) {
      if (currentDate === 10) {
        if (currentHour < 12) return "Freshers Night '25 · Prelude";
        if (currentHour < 18) return "Freshers Night '25 · Day One";
        return "Freshers Night '25 · Nightfall";
      }

      if (currentDate === 11) {
        if (currentHour < 12) return "Freshers Night '25 · Day Two";
        if (currentHour < 18) return "Freshers Night '25 · Momentum";
        return "Freshers Night '25 · Finale";
      }
    }

    return "Freshers Night 2025";
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home', protected: false },
    { path: '/schedule', icon: Calendar, label: 'Schedule', protected: false },
    { path: '/music', icon: Music, label: 'Music', protected: true },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', protected: true },
    ...(user && isAdminUser ? [{ path: '/admin', icon: Shield, label: 'Admin', protected: true }] : [])
  ];

  const isActive = (path) => location.pathname === path;
  const currentEventName = getCurrentEventName();

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 dark-navbar z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
          <Link
            to="/"
            className="text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-white flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            {currentEventName}
          </Link>
          <div className="flex items-center gap-3 lg:hidden">
            {user ? (
              <div className="flex items-center gap-2 text-sm text-white/70">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="max-w-[110px] truncate">{user.name}</span>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-full text-sm font-medium text-white/80 border border-white/10"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navItems.map(({ path, icon, label, protected: isProtected }) => {
              if (isProtected && !user) return null;
              const Icon = icon;
              const active = isActive(path);

              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
                    active
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="flex items-center gap-2 text-white/70">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-white truncate max-w-[140px]">{user.name}</p>
                    <p className="text-white/40 truncate max-w-[140px]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm px-6">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm px-6">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile slide-over menu */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <Motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[rgba(7,10,18,0.96)] backdrop-blur-xl border-l border-white/10 px-6 py-8 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Navigate</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/60 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {user && (
                <div className="surface-soft p-4 rounded-2xl border border-white/5 mb-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <User size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-white truncate">{user.name}</p>
                    <p className="text-sm text-white/50 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {navItems.map(({ path, icon, label, protected: isProtected }) => {
                  const Icon = icon;
                  const active = isActive(path);
                  const locked = isProtected && !user;

                  const handleClick = () => {
                    if (locked) {
                      setIsOpen(false);
                      navigate('/login', { state: { from: path } });
                    } else {
                      setIsOpen(false);
                    }
                  };

                  return (
                    <Link
                      key={path}
                      to={locked ? '/login' : path}
                      onClick={handleClick}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                        active
                          ? 'border-white/20 bg-white/10 text-white'
                          : 'border-white/5 text-white/70 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                          <Icon size={18} />
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{label}</p>
                          {locked ? (
                            <p className="text-xs text-white/40 flex items-center gap-1">
                              <Lock size={12} /> Login required
                            </p>
                          ) : (
                            <p className="text-xs text-white/40">Tap to open</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-white/5 pt-6">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-sm font-semibold text-white/80 hover:text-white hover:border-white/30 transition-all"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full btn-secondary justify-center">
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full btn-primary justify-center">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 mobile-dock py-3 px-6 lg:hidden z-40">
        <div className="flex items-center justify-between">
          {navItems.map(({ path, icon, label, protected: isProtected }) => {
            const Icon = icon;
            const active = isActive(path);
            const locked = isProtected && !user;

            const handleTap = (e) => {
              if (locked) {
                e.preventDefault();
                navigate('/login', { state: { from: path } });
              }
            };

            return (
              <Link
                key={path}
                to={locked ? '/login' : path}
                onClick={handleTap}
                className={`flex flex-col items-center gap-1 text-xs font-medium transition-all ${
                  active ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center border ${
                    active ? 'border-white/30 bg-white/10' : 'border-white/10'
                  }`}
                >
                  {locked ? <Lock size={18} /> : <Icon size={18} />}
                </span>
                {label}
              </Link>
            );
          })}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 text-xs font-medium text-rose-300/90"
            >
              <span className="w-11 h-11 rounded-full flex items-center justify-center border border-rose-400/40 bg-rose-500/10 text-rose-200">
                <LogOut size={18} />
              </span>
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center gap-1 text-xs font-medium text-white/60"
            >
              <span className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10">
                <User size={18} />
              </span>
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;