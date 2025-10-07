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

  const DEFAULT_SONG = 'https://open.spotify.com/track/1rEVydQSe04NJUqyyEyeEq?si=77634cc57bcb4d89';

  const padArrayToThree = (arr) => {
    const padded = [...arr];
    while (padded.length < 3) {
      padded.push(DEFAULT_SONG);
    }
    return padded;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const links = [formData.songLink1, formData.songLink2, formData.songLink3].filter((link) => link.trim() !== '');

      if (links.length === 0) {
        setError('Please provide at least one Spotify song link.');
        setSubmitting(false);
        return;
      }

      const spotifyRegex = /^https:\/\/open\.spotify\.com\/(track|album|playlist)\//;
      for (const link of links) {
        if (!spotifyRegex.test(link)) {
          setError('Please enter valid Spotify links (must start with https://open.spotify.com/).');
          setSubmitting(false);
          return;
        }
      }

      const paddedLinks = padArrayToThree(links);
      const result = await submitSongSuggestions({ songLinks: paddedLinks });

      if (result.success) {
        setSuccess('Your songs are with the DJ. Watch for them on both nights—and if something sounds off, it might just be your song.');
        setFormData({ songLink1: '', songLink2: '', songLink3: '' });
        setShowForm(false);
        setHasSubmitted(true);
      } else {
        setError(result.error || 'Failed to submit song suggestions.');
      }
    } catch (err) {
      console.error('Failed to submit song suggestions:', err);
      setError('We couldn\'t send your songs right now. Please try again.');
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
    <div className="px-4 sm:px-6 lg:px-8 pb-28">
      <div className="max-w-3xl mx-auto pt-6 sm:pt-10 space-y-10">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(127,90,240,0.18)', color: '#7f5af0' }}
            >
              <Music className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">Curate the Freshers soundtrack</h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Drop up to three Spotify links. The DJ booth reviews every submission and slips them into the set across both nights.
          </p>
          <div className="card text-left">
            <p className="text-sm text-white/65 leading-relaxed">
              <span className="font-semibold text-white">How to share your track:</span><br />
              1. Open Spotify · find your song<br />
              2. Tap <span className="font-mono text-white/80">••• → Share → Copy link</span><br />
              3. Paste it below (links must start with <span className="font-mono">https://open.spotify.com/</span>)
            </p>
          </div>
        </Motion.div>

        {!hasSubmitted && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-center"
          >
            <button onClick={() => setShowForm(!showForm)} className="btn-secondary inline-flex items-center gap-2">
              <Plus className="h-5 w-5" />
              <span>{showForm ? 'Hide form' : 'Add song suggestions'}</span>
            </button>
          </Motion.div>
        )}

        {hasSubmitted && success && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center space-y-3"
          >
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
                <Music className="h-7 w-7" />
              </div>
            </div>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed">{success}</p>
          </Motion.div>
        )}

        <AnimatePresence>
          {showForm && !hasSubmitted && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="card space-y-5 text-left">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  <span>Submit your songs</span>
                </h2>

                {error && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3">
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[1, 2, 3].map((slot) => (
                    <div key={slot} className="space-y-2">
                      <label className="block text-sm font-medium text-white/70">
                        Spotify song link #{slot}{slot === 1 ? '' : ' (optional)'}
                      </label>
                      <input
                        type="url"
                        name={`songLink${slot}`}
                        value={formData[`songLink${slot}`]}
                        onChange={handleChange}
                        className="dark-input"
                        placeholder="https://open.spotify.com/track/..."
                      />
                    </div>
                  ))}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          <span>Submit songs</span>
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-ghost justify-center text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MusicRequests;
