import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  Music,
  MessageCircle,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import {
  getAllCandidates,
  getAllSongSuggestions,
  getAllMessages
} from '../services/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [songSubmissions, setSongSubmissions] = useState([]);
  const [uniqueSongLinks, setUniqueSongLinks] = useState([]);
  const [songStats, setSongStats] = useState({ totalSubmissions: 0, uniqueSongs: 0 });
  const [messages, setMessages] = useState([]);

  const loadAdminData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const [candidatesRes, songsRes, messagesRes] = await Promise.all([
        getAllCandidates(),
        getAllSongSuggestions(),
        getAllMessages()
      ]);

      const failures = [];

      if (candidatesRes?.success) {
        setCandidates(candidatesRes.candidates || []);
      } else {
        setCandidates([]);
        failures.push('candidates');
      }

      if (songsRes?.success) {
        setSongSubmissions(songsRes.submissions || []);
        setUniqueSongLinks(songsRes.uniqueSongs || []);
        setSongStats({
          totalSubmissions:
            songsRes.results?.totalSubmissions ?? (songsRes.submissions?.length ?? 0),
          uniqueSongs:
            songsRes.results?.uniqueSongs ?? (songsRes.uniqueSongs?.length ?? 0)
        });
      } else {
        setSongSubmissions([]);
        setUniqueSongLinks([]);
        setSongStats({ totalSubmissions: 0, uniqueSongs: 0 });
        failures.push('song requests');
      }

      if (messagesRes?.success) {
        setMessages(messagesRes.messages || []);
      } else {
        setMessages([]);
        failures.push('messages');
      }

      if (failures.length) {
        setError(`Unable to load ${failures.join(', ')}. Please retry.`);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setError(err.message || 'Failed to load admin data.');
      setCandidates([]);
  setSongSubmissions([]);
  setUniqueSongLinks([]);
  setSongStats({ totalSubmissions: 0, uniqueSongs: 0 });
      setMessages([]);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadAdminData(false);
  }, [loadAdminData]);

  const summaryCards = useMemo(() => ([
    {
      title: 'Registered candidates',
      value: candidates.length,
      subtext: 'Across all categories',
      icon: Users,
      accent: '#7f5af0'
    },
    {
      title: 'Song submissions',
      value: songStats.totalSubmissions,
      subtext: `${songStats.uniqueSongs} unique tracks`,
      icon: Music,
      accent: '#2cb67d'
    },
    {
      title: 'Anonymous messages',
      value: messages.length,
      subtext: 'Awaiting moderation',
      icon: MessageCircle,
      accent: '#f25f4c'
    }
  ]), [candidates.length, songStats.totalSubmissions, songStats.uniqueSongs, messages.length]);

  const formatCategory = (category) => {
    if (!category) return 'General';
    return category.replace(/_/g, ' ');
  };

  const extractSpotifyTrackId = (link) => {
    if (!link || typeof link !== 'string') return null;
    const trimmed = link.trim();
    const directMatch = trimmed.match(/track\/([A-Za-z0-9]+)/);
    if (directMatch?.[1]) {
      return directMatch[1];
    }

    try {
      const url = new URL(trimmed);
      const segments = url.pathname.split('/').filter(Boolean);
      const trackIndex = segments.indexOf('track');
      if (trackIndex !== -1 && segments[trackIndex + 1]) {
        return segments[trackIndex + 1];
      }
    } catch {
      return null;
    }

    return null;
  };

  const getSpotifyEmbedSrc = (link) => {
    const trackId = extractSpotifyTrackId(link);
    return trackId ? `https://open.spotify.com/embed/track/${trackId}?utm_source=generator` : null;
  };

  const renderLoadingState = () => (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-white/20 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white/60 text-sm tracking-[0.35em] uppercase">
          Syncing admin data
        </p>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-28">
      <div className="max-w-6xl mx-auto space-y-10">
        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-800 bg-slate-900/70 text-pink-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/40">Admin console</p>
                <h1 className="text-2xl font-semibold text-white mt-1">Welcome, {user?.name}</h1>
                <p className="text-white/55 text-sm mt-1">
                  Monitor participants, requests, and community messages in one overview.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(-1)}
                className="btn-ghost justify-center text-sm flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                onClick={() => loadAdminData(true)}
                className="btn-secondary justify-center text-sm flex items-center gap-2"
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing' : 'Refresh data'}
              </button>
            </div>
          </div>
        </Motion.section>

        {error && (
          <Motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-rose-500/40 bg-rose-500/10 text-rose-200 px-4 py-3 rounded-xl text-sm"
          >
            {error}
          </Motion.div>
        )}

        {loading ? (
          renderLoadingState()
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="surface-soft rounded-2xl border border-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/45">{card.title}</p>
                        <p className="text-3xl font-semibold text-white mt-3">{card.value}</p>
                        <p className="text-xs text-white/40 mt-2">{card.subtext}</p>
                      </div>
                      <span
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${card.accent}20`, color: card.accent }}
                      >
                        <Icon size={22} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Candidates</h2>
                    <p className="text-xs text-white/40">Latest registrations across categories</p>
                  </div>
                  <span className="text-xs text-white/45 tracking-[0.3em] uppercase">
                    {candidates.length} total
                  </span>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {candidates.length === 0 ? (
                    <p className="text-sm text-white/50">No candidates found yet.</p>
                  ) : (
                    candidates.map((candidate) => (
                      <div
                        key={candidate?._id || candidate?.id || candidate?.name}
                        className="surface-soft border border-white/5 rounded-xl px-4 py-3"
                      >
                        <p className="text-sm font-medium text-white">{candidate?.name || 'Unnamed'}</p>
                        <p className="text-xs text-white/40 mt-1">
                          {formatCategory(candidate?.category)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Song requests</h2>
                    <p className="text-xs text-white/40">Spotify links submitted by attendees</p>
                  </div>
                  <span className="text-xs text-white/45 tracking-[0.3em] uppercase">
                    {songStats.totalSubmissions} submissions
                  </span>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {songSubmissions.length === 0 ? (
                    <p className="text-sm text-white/50">No song requests yet.</p>
                  ) : (
                    songSubmissions.map((entry, index) => (
                      <div
                        key={entry?._id || entry?.id || entry?.user?.email || `${entry?.userName}-${index}`}
                        className="surface-soft border border-white/5 rounded-xl px-4 py-3 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs text-white/45">
                          <span>{entry?.user?.name || entry?.userName || 'Anonymous'}</span>
                          <span>{(entry?.songLinks || []).length} tracks</span>
                        </div>
                        <div className="space-y-1">
                          {(entry?.songLinks || []).map((link, idx) => (
                            <a
                              key={`${link}-${idx}`}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xs text-pink-300 hover:text-pink-200 truncate"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Unique Spotify tracks</h2>
                    <p className="text-xs text-white/40">Curated from all submissions</p>
                  </div>
                  <span className="text-xs text-white/45 tracking-[0.3em] uppercase text-right">
                    {songStats.uniqueSongs} tracks
                  </span>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {uniqueSongLinks.length === 0 ? (
                    <p className="text-sm text-white/50">No unique tracks yet.</p>
                  ) : (
                    uniqueSongLinks.map((link, idx) => {
                      const embedSrc = getSpotifyEmbedSrc(link);
                      const itemKey = embedSrc || `${idx}-${link}`;
                      return (
                        <div
                          key={itemKey}
                          className="surface-soft border border-white/5 rounded-xl px-3 py-3 space-y-3"
                        >
                          {embedSrc ? (
                            <iframe
                              title={`spotify-track-${idx}`}
                              src={embedSrc}
                              width="100%"
                              height="152"
                              frameBorder="0"
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                              loading="lazy"
                              style={{ borderRadius: '12px' }}
                            ></iframe>
                          ) : (
                            <p className="text-xs text-white/50">Preview unavailable for this link.</p>
                          )}
                          <div className="flex items-center justify-between text-xs text-white/45">
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-300 hover:text-pink-200 truncate"
                            >
                              Open in Spotify
                            </a>
                            <span className="text-[10px] uppercase text-white/35">#{idx + 1}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>

            <section className="card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Anonymous messages</h2>
                  <p className="text-xs text-white/40">Moderate shoutouts before they go live</p>
                </div>
                <span className="text-xs text-white/45 tracking-[0.3em] uppercase">
                  {messages.length} pending
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {messages.length === 0 ? (
                  <p className="text-sm text-white/50">No messages awaiting review.</p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message?._id || message?.id || message?.createdAt}
                      className="surface-soft border border-white/5 rounded-xl px-4 py-3 space-y-2"
                    >
                      <p className="text-sm text-white/80 whitespace-pre-wrap">
                        {message?.message || 'No content provided.'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/35">
                        <span>{message?.createdAt ? new Date(message.createdAt).toLocaleString() : 'Timestamp unavailable'}</span>
                        <span>{message?.sender?.email || message?.email || 'Anonymous'}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
