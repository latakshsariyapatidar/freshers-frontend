import React, { useState, useEffect } from 'react';
import { musicService } from '../services/api';
import { Music, Plus, Send, Clock, User, Heart } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const MusicRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    songName: '',
    artist: '',
    message: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await musicService.getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newRequest = await musicService.submitRequest(formData);
      setRequests(prev => [newRequest, ...prev]);
      setFormData({ songName: '', artist: '', message: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to submit request:', error);
      alert('Failed to submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-slate-300">Loading music requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Music className="h-16 w-16 text-purple-500 animate-pulse" />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold gradient-text mb-4">
            Music Requests
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Request your favorite songs and let the DJ know what gets you moving! 
            Your requests help make the party unforgettable.
          </p>
        </Motion.div>

        {/* Add Request Button */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Request a Song</span>
          </button>
        </Motion.div>

        {/* Request Form */}
        <AnimatePresence>
          {showForm && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <div className="card">
                <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
                  <Music className="h-6 w-6 text-purple-500" />
                  <span>Request Your Song</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Song Name *
                    </label>
                    <input
                      type="text"
                      name="songName"
                      required
                      value={formData.songName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter the song name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Artist *
                    </label>
                    <input
                      type="text"
                      name="artist"
                      required
                      value={formData.artist}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter the artist name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Any special message or reason for this song?"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>Submit Request</span>
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Requests List */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Recent Requests
          </h2>
          
          {requests.length === 0 ? (
            <div className="text-center py-12 card">
              <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No requests yet!</p>
              <p className="text-gray-500">Be the first to request a song and get the party started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request, index) => (
                <Motion.div
                  key={request.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Music className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {request.songName}
                          </h3>
                          <p className="text-gray-600">by {request.artist}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          {request.likes > 0 && (
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4 text-red-500" />
                              <span>{request.likes}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      {request.message && (
                        <p className="text-gray-600 text-sm mb-2 italic">
                          "{request.message}"
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>Requested by {request.userName || 'Anonymous'}</span>
                      </div>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          )}
        </Motion.div>

        {/* Info Footer */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-8 mt-12 bg-white/50 backdrop-blur-sm rounded-2xl"
        >
          <p className="text-gray-600 mb-2">
            🎵 All requests are reviewed by our DJ team
          </p>
          <p className="text-gray-500 text-sm">
            Popular requests have a higher chance of being played!
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default MusicRequests;
