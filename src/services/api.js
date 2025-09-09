/**
 * API Service Layer for Fresher Party Voting System
 * 
 * This file contains all API endpoints and axios configurations
 * for the Fresher Party Voting System frontend application.
 * 
 * Base URL: http://your-api-domain/api/v1/fresherParty
 */

import axios from 'axios';

// Get API environment variables - Updated to use the correct API endpoint structure
const API_BASE_URL = import.meta.env.DEV 
  ? '/api/v1/fresherParty'  // Use proxy in development
  : import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/v1/fresherParty`
    : 'http://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com/api/v1/fresherParty';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor to add JWT token to all requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (updated key name to match auth system)
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    
    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log outgoing requests in development
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common response patterns and errors
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data
      });
    }
    
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle authentication errors
      if (status === 401) {
        // Clear invalid token
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      
      // Log errors in development
      if (import.meta.env.DEV) {
        console.error('❌ API Error:', {
          status,
          message: data?.message || 'Unknown error',
          url: error.config?.url
        });
      }
      
      // Return structured error object
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        data: data
      });
    }
    
    // Handle network errors
    if (error.request) {
      console.error('❌ Network Error:', error.message);
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your internet connection.',
        data: null
      });
    }
    
    // Handle other errors
    console.error('❌ Unexpected Error:', error.message);
    return Promise.reject({
      status: 0,
      message: 'An unexpected error occurred',
      data: null
    });
  }
);

// =============================================================================
// AUTHENTICATION ENDPOINTS
// =============================================================================

/**
 * Sign up a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @returns {Promise} API response with signup status
 */
export const signUp = async (userData) => {
  try {
    const response = await apiClient.post('/signup', {
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
    
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Signup successful. Please check your email for OTP.'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Verify OTP for user registration
 * @param {Object} otpData - OTP verification data
 * @param {string} otpData.email - User's email address
 * @param {string} otpData.otp - 6-digit OTP code
 * @returns {Promise} API response with verification status and JWT token
 */
export const verifyOTP = async (otpData) => {
  try {
    // Note: Backend uses kebab-case endpoint /verify-otp
    const response = await apiClient.post('/verify-otp', {
      email: otpData.email,
      otp: otpData.otp
    });
    
    // Store token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('token', response.data.token); // Keep both for backward compatibility
      localStorage.setItem('userData', JSON.stringify(response.data.data.user));
    }
    
    return {
      success: true,
      data: response.data,
      token: response.data.token,
      user: response.data.data.user,
      message: 'Account verified successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Login user with email and password
 * @param {Object} loginData - Login credentials
 * @param {string} loginData.email - User's email address
 * @param {string} loginData.password - User's password
 * @returns {Promise} API response with login status and JWT token
 */
export const login = async (loginData) => {
  try {
    const response = await apiClient.post('/login', {
      email: loginData.email,
      password: loginData.password
    });
    
    // Store token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('token', response.data.token); // Keep both for backward compatibility
      localStorage.setItem('userData', JSON.stringify(response.data.data.user));
    }
    
    return {
      success: true,
      data: response.data,
      token: response.data.token,
      user: response.data.data.user,
      message: 'Login successful!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Logout user (clear local storage)
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  window.location.href = '/login';
};

// =============================================================================
// VOTING ENDPOINTS
// =============================================================================

/**
 * Cast a vote for a candidate
 * @param {string} candidateID - ID of the candidate to vote for
 * @returns {Promise} API response with voting result
 */
export const castVote = async (candidateID) => {
  try {
    const response = await apiClient.post('/vote', {
      candidateID: candidateID
    });
    
    return {
      success: true,
      data: response.data,
      candidate: response.data.candidate,
      message: response.data.message || 'Vote registered successfully ✅'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Get candidates by category
 * @param {string} category - Category type ('Mr_Fresher' or 'Miss_Fresher')
 * @returns {Promise} API response with candidates list
 */
export const getCandidatesByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/vote/category/${category}`);
    
    return {
      success: true,
      data: response.data,
      candidates: response.data.data.candidates,
      results: response.data.results
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

// =============================================================================
// SONG SUGGESTION ENDPOINTS
// =============================================================================

/**
 * Submit song suggestions
 * @param {Object} data - Object containing songLinks array
 * @param {Array} data.songLinks - Array of Spotify song links (max 3)
 * @returns {Promise} API response with submission status
 */
export const submitSongSuggestions = async (data) => {
  try {
    const response = await apiClient.post('/songs/submit', {
      songLinks: data.songLinks
    });
    
    return {
      success: true,
      data: response.data,
      songSuggestion: response.data.data.songSuggestion,
      message: 'Song suggestions submitted successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Get user's own song suggestions
 * @returns {Promise} API response with user's song suggestions
 */
export const getMySongSuggestions = async () => {
  try {
    const response = await apiClient.get('/songs/my-suggestions');
    
    return {
      success: true,
      data: response.data,
      suggestions: response.data.data.suggestions,
      songLinks: response.data.data.suggestions.songLinks
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

// =============================================================================
// ANONYMOUS MESSAGES ENDPOINTS
// =============================================================================

/**
 * Send anonymous message
 * @param {string} message - Message content (max 100 words)
 * @returns {Promise} API response with message submission status
 */
export const sendAnonymousMessage = async (message) => {
  try {
    const response = await apiClient.post('/messages/send', {
      message: message
    });
    
    return {
      success: true,
      data: response.data,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Get user's own messages
 * @returns {Promise} API response with user's messages
 */
export const getMyMessages = async () => {
  try {
    const response = await apiClient.get('/messages/my-messages');
    
    return {
      success: true,
      data: response.data,
      messages: response.data.data.messages,
      results: response.data.results
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

// =============================================================================
// ADMIN ONLY ENDPOINTS
// =============================================================================

/**
 * Get all candidates participating in the elections
 * @returns {Promise} API response with all candidates
 */
export const getAllCandidates = async () => {
  try {
    const response = await apiClient.get('/vote/all');
    
    return {
      success: true,
      data: response.data,
      candidates: response.data.data.candidates,
      results: response.data.results,
      message: 'Candidates loaded successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Create new candidate (Admin only)
 * @param {Object} candidateData - Candidate information
 * @param {string} candidateData.name - Candidate's name
 * @param {string} candidateData.category - Candidate's category
 * @returns {Promise} API response with created candidate
 */
export const createCandidate = async (candidateData) => {
  try {
    const response = await apiClient.post('/admin', {
      name: candidateData.name,
      category: candidateData.category
    });
    
    return {
      success: true,
      data: response.data,
      candidate: response.data.data.candidate,
      candidateId: response.data.candidate_id,
      message: 'Candidate created successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Get all messages (Admin only)
 * @returns {Promise} API response with all messages
 */
export const getAllMessages = async () => {
  try {
    const response = await apiClient.get('/messages/all');
    
    return {
      success: true,
      data: response.data,
      messages: response.data.data.messages,
      results: response.data.results
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Get messages by email (Admin only)
 * @param {string} email - User's email address
 * @returns {Promise} API response with user's messages
 */
export const getMessagesByEmail = async (email) => {
  try {
    const response = await apiClient.get(`/messages/user/${email}`);
    
    return {
      success: true,
      data: response.data,
      user: response.data.data.user,
      messages: response.data.data.messages,
      results: response.data.results
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

/**
 * Get all song suggestions (Admin only)
 * @returns {Promise} API response with all song suggestions
 */
export const getAllSongSuggestions = async () => {
  try {
    const response = await apiClient.get('/songs/all');
    
    return {
      success: true,
      data: response.data,
      suggestions: response.data.data.suggestions,
      results: response.data.results
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.status
    };
  }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken') || localStorage.getItem('token');
  const userData = localStorage.getItem('userData');
  return !!(token && userData);
};

/**
 * Get current user data from localStorage
 * @returns {Object|null} User data or null if not authenticated
 */
export const getCurrentUser = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Check if current user is admin
 * @returns {boolean} Admin status
 */
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

/**
 * Get stored auth token
 * @returns {string|null} JWT token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken') || localStorage.getItem('token');
};

// =============================================================================
// LEGACY SERVICES FOR BACKWARD COMPATIBILITY
// =============================================================================

// Auth service (legacy format)
export const authService = {
  login: async (email, password) => {
    const result = await login({ email, password });
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  },
  
  signup: async (userData) => {
    const result = await signUp(userData);
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  },
  
  getProfile: async () => {
    const user = getCurrentUser();
    if (user) {
      return { user };
    } else {
      throw new Error('User not authenticated');
    }
  }
};

// Voting service (legacy format - updated to match new API)
export const votingService = {
  getParticipants: async () => {
    // Get both categories and combine
    const mrFresherResult = await getCandidatesByCategory('Mr_Fresher');
    const missFresherResult = await getCandidatesByCategory('Miss_Fresher');
    
    if (mrFresherResult.success && missFresherResult.success) {
      return {
        participants: [
          ...mrFresherResult.candidates,
          ...missFresherResult.candidates
        ]
      };
    } else {
      throw new Error('Failed to fetch participants');
    }
  },
  
  vote: async (participantId) => {
    const result = await castVote(participantId);
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  },
  
  hasUserVoted: async () => {
    // This endpoint might need to be implemented on backend
    // For now, return false
    return { hasVoted: false };
  }
};

// Music service (updated to match new API)
export const musicService = {
  submitRequest: async (songData) => {
    const result = await submitSongSuggestions(songData.songLinks || [songData.url]);
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  },
  
  getRequests: async () => {
    const result = await getMySongSuggestions();
    if (result.success) {
      return { requests: result.songLinks || [] };
    } else {
      throw new Error(result.error);
    }
  }
};

// Export axios instance for custom requests if needed
export { apiClient };

// Export default object with all functions
export default {
  // Auth
  signUp,
  verifyOTP,
  login,
  logout,
  
  // Voting
  castVote,
  getCandidatesByCategory,
  
  // Songs
  submitSongSuggestions,
  getMySongSuggestions,
  
  // Messages
  sendAnonymousMessage,
  getMyMessages,
  
  // Admin
  getAllCandidates,
  createCandidate,
  getAllMessages,
  getMessagesByEmail,
  getAllSongSuggestions,
  
  // Utilities
  isAuthenticated,
  getCurrentUser,
  isAdmin,
  getAuthToken,
  
  // Legacy services
  authService,
  votingService,
  musicService
};
