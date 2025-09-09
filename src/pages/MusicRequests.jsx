import React, { useState } from 'react';
import { submitSongSuggestions } from '../services/api';
import { Music, Plus, Send } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const MusicRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    songLink1: '',
    songLink2: '',
    songLink3: ''
  });
  const [showWarning, setShowWarning] = useState(false);

  // Helper function to pad array to length 3 with empty strings
  const padArrayToThree = (arr) => {
    const paddedArray = [...arr];
    while (paddedArray.length < 3) {
      paddedArray.push('');
    }
    return paddedArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    setShowWarning(false);
    setSubmitting(true);

    try {
      // Collect non-empty links
      const links = [formData.songLink1, formData.songLink2, formData.songLink3]
        .filter(link => link.trim() !== '');
      
      // Check if at least one link is provided
      if (links.length === 0) {
        setError('Please provide at least one Spotify song link');
        setSubmitting(false);
        return;
      }

      // Validate Spotify links
      const spotifyRegex = /^https:\/\/open\.spotify\.com\/(track|album|playlist)\//;
      for (const link of links) {
        if (!spotifyRegex.test(link)) {
          setError('Please enter valid Spotify links (must start with https://open.spotify.com/)');
          setSubmitting(false);
          return;
        }
      }

      // Show warning if submitting less than 3 songs
      if (links.length < 3) {
        setShowWarning(true);
        setSubmitting(false);
        return;
      }

      // Pad array to length 3 for API consistency
      const paddedLinks = padArrayToThree(links);

      const result = await submitSongSuggestions({
        songLinks: paddedLinks
      });

      if (result.success) {
        setSuccess('Your request is submitted and will be reviewed by our DJ team. If you think this was a mistake, then let everyone enjoy the mistake😉');
        setFormData({ songLink1: '', songLink2: '', songLink3: '' });
        setShowForm(false);
        setHasSubmitted(true);
      } else {
        setError(result.error || 'Failed to submit song suggestions');
      }
    } catch (error) {
      console.error('Failed to submit request:', error);
      setError('Failed to submit your song suggestions. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWarningConfirm = async () => {
    setShowWarning(false);
    setSubmitting(true);

    try {
      const links = [formData.songLink1, formData.songLink2, formData.songLink3]
        .filter(link => link.trim() !== '');

      // Pad array to length 3 for API consistency
      const paddedLinks = padArrayToThree(links);

      const result = await submitSongSuggestions({
        songLinks: paddedLinks
      });

      if (result.success) {
        setSuccess('Your request is submitted and will be reviewed by our DJ team. If you think this was a mistake, then let everyone enjoy the mistake😉');
        setFormData({ songLink1: '', songLink2: '', songLink3: '' });
        setShowForm(false);
        setHasSubmitted(true);
      } else {
        setError(result.error || 'Failed to submit song suggestions');
      }
    } catch (error) {
      console.error('Failed to submit request:', error);
      setError('Failed to submit your song suggestions. Please try again.');
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
          <h1 className="text-2xl lg:text-4xl font-bold gradient-text mb-4 py-5">
            Song Suggestions
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Share your favorite Spotify songs for the party playlist! 
            You can submit 1-3 songs, but remember - you only get one chance!
          </p>
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg max-w-lg mx-auto">
            <p className="text-sm text-blue-200">
              <strong>How to get Spotify links:</strong><br />
              1. Open Spotify app or web player<br />
              2. Find your song → Click "..." → Share → Copy song link<br />
              3. Paste the link below (should start with https://open.spotify.com/)
            </p>
          </div>
        </Motion.div>

        {/* Add Request Button - Only show if not submitted */}
        {!hasSubmitted && (
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
              <span>Add Song Suggestions</span>
            </button>
          </Motion.div>
        )}

        {/* Success message after submission */}
        {hasSubmitted && success && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Music className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <p className="text-green-200 text-lg font-medium">{success}</p>
            </div>
          </Motion.div>
        )}

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
                  <span>Submit Your Songs</span>
                </h2>
                
                {/* Error message */}
                {error && (
                  <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}
                
                {/* Success message */}
                {success && (
                  <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-200 text-sm">{success}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Spotify Song Link #1
                    </label>
                    <input
                      type="url"
                      name="songLink1"
                      value={formData.songLink1}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="https://open.spotify.com/track/... (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Spotify Song Link #2 (Optional)
                    </label>
                    <input
                      type="url"
                      name="songLink2"
                      value={formData.songLink2}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="https://open.spotify.com/track/... (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Spotify Song Link #3 (Optional)
                    </label>
                    <input
                      type="url"
                      name="songLink3"
                      value={formData.songLink3}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="https://open.spotify.com/track/... (optional)"
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
                          <span>Submit Songs</span>
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

        {/* Warning Dialog */}
        <AnimatePresence>
          {showWarning && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <Motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    One-Time Submission
                  </h3>
                  <p className="text-slate-300 text-sm">
                    You're submitting fewer than 3 songs. Remember, you won't be able to submit again after this. 
                    Are you sure you want to continue?
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWarning(false)}
                    className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleWarningConfirm}
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Anyway'}
                  </button>
                </div>
              </Motion.div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MusicRequests;
