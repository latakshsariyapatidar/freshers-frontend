import axios from 'axios';
import io from 'socket.io-client';

// Configure base URL for your backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth service
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Voting service
export const votingService = {
  getParticipants: async () => {
    const response = await api.get('/voting/participants');
    return response.data;
  },
  
  vote: async (participantId, category) => {
    const response = await api.post('/voting/vote', { participantId, category });
    return response.data;
  },
  
  getResults: async () => {
    const response = await api.get('/voting/results');
    return response.data;
  },
  
  hasUserVoted: async (category) => {
    const response = await api.get(`/voting/has-voted/${category}`);
    return response.data;
  }
};

// Music service
export const musicService = {
  submitRequest: async (songData) => {
    const response = await api.post('/music/request', songData);
    return response.data;
  },
  
  getRequests: async () => {
    const response = await api.get('/music/requests');
    return response.data;
  }
};

// Socket service for real-time updates
export const createSocket = () => {
  const socket = io(SOCKET_URL, {
    auth: {
      token: localStorage.getItem('token')
    }
  });
  
  return socket;
};
