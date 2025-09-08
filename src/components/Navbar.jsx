import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X, Home, Vote, Music, BarChart3, MessageCircle, LogOut, User, Calendar } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home', protected: false },
    { path: '/schedule', icon: Calendar, label: 'Schedule', protected: false },
    { path: '/voting', icon: Vote, label: 'Vote', protected: true },
    { path: '/music', icon: Music, label: 'Music', protected: true },
    { path: '/messages', icon: MessageCircle, label: 'Messages', protected: true },
    { path: '/results', icon: BarChart3, label: 'Results', protected: false }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 dark-navbar backdrop-blur-md z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="text-2xl font-bold gradient-text">
            Freshers'25
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-blue-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <Motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="absolute left-0 top-16 bottom-0 w-80 bg-slate-800/95 backdrop-blur-md p-6 border-r border-slate-600"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                {user && (
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100">{user.name}</p>
                      <p className="text-sm text-slate-300">{user.email}</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  {navItems.map(({ path, icon, label, protected: isProtected }) => {
                    if (isProtected && !user) return null;
                    const Icon = icon;
                    
                    return (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                          isActive(path)
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{label}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-gray-200">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all w-full"
                    >
                      <LogOut size={20} />
                      <span className="font-medium">Logout</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center btn-primary"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center border-2 border-primary-500 text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-primary-50 transition-all"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 dark-navbar backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          <Link to="/" className="text-3xl font-bold gradient-text">
            IIT Dharwad Freshers'25
          </Link>
          
          <div className="flex items-center space-x-8">
            {navItems.map(({ path, icon, label, protected: isProtected }) => {
              if (isProtected && !user) return null;
              const Icon = icon;
              
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    isActive(path)
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-300">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-400 hover:bg-red-900/30 px-4 py-2 rounded-full transition-all"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border-2 border-primary-500 text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-primary-50 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
