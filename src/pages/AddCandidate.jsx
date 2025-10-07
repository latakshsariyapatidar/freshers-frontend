import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trophy, Loader2, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { createCandidate, getAllCandidates } from '../services/api';

const AddCandidate = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Mr');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: string }
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const result = await getAllCandidates();
      
      if (result.success) {
        setCandidates(result.candidates || []);
      } else {
        setStatus({ type: 'error', text: result.error || 'Failed to load candidates' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Unexpected error loading candidates' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setStatus({ type: 'error', text: 'Please enter a candidate name' });
      return;
    }

    try {
      setSubmitting(true);
      setStatus(null);

      const result = await createCandidate({
        name: name.trim(),
        category: category
      });

      if (result.success) {
        setStatus({
          type: 'success',
          text: `${name} has been added as a candidate for ${category}!`
        });
        setName('');
        // Reload candidates list
        await loadCandidates();
      } else {
        setStatus({
          type: 'error',
          text: result.error || 'Failed to add candidate'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        text: error.message || 'Could not add candidate. Try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const mrFreshers = candidates.filter(c => c.category === 'Mr_Fresher' || c.category === 'Mr');
  const missFreshers = candidates.filter(c => c.category === 'Miss_Fresher' || c.category === 'Miss');

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-28">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <Motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mx-auto shadow-lg shadow-purple-500/30">
            <UserPlus size={28} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-white">Add Candidate</h1>
            <p className="text-slate-400 text-sm uppercase tracking-[0.35em]">Admin · Candidate Management</p>
          </div>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Register new candidates for Mr & Miss Fresher voting. Once added, they'll appear in the voting interface for all users.
          </p>
        </Motion.section>

        {/* Add Candidate Form */}
        <Motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Register New Candidate</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/40">
                Candidate Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter full name"
                className="dark-input"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/40">
                Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCategory('Mr')}
                  className={`py-4 px-6 rounded-2xl border transition-all ${
                    category === 'Mr'
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Trophy size={24} />
                    <span className="font-medium">Mr Fresher</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('Miss')}
                  className={`py-4 px-6 rounded-2xl border transition-all ${
                    category === 'Miss'
                      ? 'border-pink-500 bg-pink-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Trophy size={24} />
                    <span className="font-medium">Miss Fresher</span>
                  </div>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {status && (
                <Motion.div
                  key={status.text}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`rounded-xl px-4 py-3 text-sm border flex items-center gap-3 ${
                    status.type === 'success'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                      : 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{status.text}</span>
                </Motion.div>
              )}
            </AnimatePresence>

            <Motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={submitting || !name.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 py-4 font-semibold text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Adding candidate...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Add Candidate
                </>
              )}
            </Motion.button>
          </form>
        </Motion.section>

        {/* Candidates List */}
        <Motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Users size={20} />
              Registered Candidates
            </h2>
            <button
              onClick={loadCandidates}
              type="button"
              className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"
            >
              <Loader2 size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="card py-16 flex flex-col items-center gap-4 text-white/60">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span>Loading candidates...</span>
            </div>
          ) : candidates.length === 0 ? (
            <div className="card py-16 flex flex-col items-center gap-4 text-center text-white/60">
              <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                <Users className="text-white/50" size={28} />
              </div>
              <div>
                <p className="text-lg font-medium text-white">No candidates yet</p>
                <p className="text-sm text-white/50">Add your first candidate using the form above.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Mr Fresher List */}
              <div className="card space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/70 to-indigo-500/60 flex items-center justify-center">
                    <Trophy size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Mr Fresher</h3>
                    <p className="text-xs text-white/50">{mrFreshers.length} candidate(s)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {mrFreshers.length === 0 ? (
                    <p className="text-sm text-white/40 py-4 text-center">No candidates added</p>
                  ) : (
                    mrFreshers.map((candidate, index) => (
                      <div
                        key={candidate._id || candidate.id || index}
                        className="surface-soft border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{candidate.name}</p>
                          {candidate.votes !== undefined && (
                            <p className="text-xs text-white/40">{candidate.votes} vote(s)</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Miss Fresher List */}
              <div className="card space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/70 to-rose-500/60 flex items-center justify-center">
                    <Trophy size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Miss Fresher</h3>
                    <p className="text-xs text-white/50">{missFreshers.length} candidate(s)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {missFreshers.length === 0 ? (
                    <p className="text-sm text-white/40 py-4 text-center">No candidates added</p>
                  ) : (
                    missFreshers.map((candidate, index) => (
                      <div
                        key={candidate._id || candidate.id || index}
                        className="surface-soft border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{candidate.name}</p>
                          {candidate.votes !== undefined && (
                            <p className="text-xs text-white/40">{candidate.votes} vote(s)</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </Motion.section>
      </div>
    </div>
  );
};

export default AddCandidate;
