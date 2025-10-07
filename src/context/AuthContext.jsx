/**
 * AuthContext - Authentication Context Provider
 * 
 * This context provides authentication state management for the Fresher Party
 * Voting System. It integrates with the comprehensive API service and handles
 * user authentication, login/logout, and OTP verification.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AuthContext } from './auth-context';
import { 
  login as apiLogin, 
  signUp as apiSignUp, 
  verifyOTP as apiVerifyOTP, 
  logout as apiLogout,
  isAuthenticated,
  getCurrentUser
} from '../services/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const persistUser = useCallback((userData) => {
    if (!userData) {
      setUser(null);
      localStorage.removeItem('userData');
      return null;
    }

    const rawRole = userData.role ?? getCurrentUser()?.role;
    const normalizedRole = typeof rawRole === 'string' ? rawRole.toLowerCase() : rawRole;
    const resolvedUser = normalizedRole
      ? { ...userData, role: normalizedRole }
      : { ...userData };

    localStorage.setItem('userData', JSON.stringify(resolvedUser));
    setUser(resolvedUser);
    return resolvedUser;
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  /**
   * Check current authentication status using the new API service
   */
  const checkAuthStatus = useCallback(async () => {
    try {
      const authenticated = isAuthenticated();
      const userData = getCurrentUser();
      
      if (authenticated && userData) {
        persistUser(userData);
        setIsLoggedIn(true);
      } else {
        persistUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      persistUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, [persistUser]);

  /**
   * Handle user login using the new API service
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} Login result
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await apiLogin({ email, password });
      
      if (result.success) {
        persistUser(result.user || getCurrentUser());
        setIsLoggedIn(true);
        return { 
          success: true, 
          message: result.message || 'Login successful!'
        };
      } else {
        return { 
          success: false, 
          error: result.error 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user signup using the new API service
   * @param {Object} userData - User registration data
   * @returns {Object} Signup result
   */
  const signup = async (userData) => {
    try {
      setLoading(true);
      const result = await apiSignUp(userData);
      
      // Note: Signup doesn't automatically log user in anymore
      // They need to verify OTP first
      return {
        success: result.success,
        message: result.message || 'Signup successful! Please check your email for OTP.',
        error: result.error
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Signup failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle OTP verification using the new API service
   * @param {Object} otpData - OTP verification data
   * @returns {Object} Verification result
   */
  const verifyOTP = async (otpData) => {
    try {
      setLoading(true);
      const result = await apiVerifyOTP(otpData);
      
      if (result.success) {
        persistUser(result.user || getCurrentUser());
        setIsLoggedIn(true);
        return {
          success: true,
          message: result.message || 'Account verified successfully!'
        };
      } else {
        return {
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'OTP verification failed'
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user logout using the new API service
   */
  const logout = () => {
    persistUser(null);
    setIsLoggedIn(false);
    apiLogout(); // This clears localStorage and redirects
  };

  /**
   * Check if current user is admin
   * @returns {boolean} Admin status
   */
  const userIsAdmin = useCallback(() => {
    const storedRole = (user?.role || getCurrentUser()?.role || '').toString().toLowerCase();
    return storedRole === 'admin';
  }, [user]);

  /**
   * Update user data in context
   * @param {Object} userData - Updated user data
   */
  const updateUser = (userData) => {
    const updated = persistUser(userData);
    setIsLoggedIn(!!updated);
    return updated;
  };

  const role = useMemo(() => {
    if (user?.role) {
      return user.role;
    }
    const storedUser = getCurrentUser();
    return storedUser?.role || 'guest';
  }, [user]);

  const isAdminUser = useMemo(() => userIsAdmin(), [userIsAdmin]);

  // Context value with all auth functions and state
  const value = {
    // State
    user,
    loading,
    isLoggedIn,
    
    // Authentication functions
    login,
    signup,
    verifyOTP,
    logout,
    
    // Utility functions
    isAdmin: userIsAdmin,
    isAdminUser,
    updateUser,
    checkAuthStatus,
    
    // Computed values
    isAuthenticated: isLoggedIn,
    role,
    userName: user?.name || '',
    userEmail: user?.email || '',
    userId: user?._id || user?.id || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
