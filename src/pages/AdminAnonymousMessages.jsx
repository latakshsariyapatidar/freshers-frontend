import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Inbox,
  Loader2,
  Mail,
  Search,
  ShieldCheck,
  Undo2
} from 'lucide-react';
import { getAllMessages, getMessagesByEmail } from '../services/api';

const useMessagesFormatter = (messages) => {
  return useMemo(() => {
    if (!Array.isArray(messages)) {
      return [];
    }

    return messages.map((entry, index) => {
      const user = entry.user || entry.sender || entry.owner || {};
      const email = entry.email || entry.userEmail || user.email || entry.recipientEmail || null;

      return {
        id: entry._id || entry.id || `${email || 'msg'}-${index}`,
        email,
        userName: user.name || entry.name || entry.userName || null,
        message: entry.message || entry.content || entry.text || '',
        createdAt: entry.createdAt || entry.timestamp || entry.created_at || entry.createdOn || null,
        raw: entry
      };
    });
  }, [messages]);
};

const EmptyState = ({ filtered }) => (
  <div className="surface-soft border border-white/10 rounded-3xl py-16 flex flex-col items-center gap-4 text-center text-white/60">
    <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center">
      <Inbox className="text-white/50" size={28} />
    </div>
    <div>
      <p className="text-lg font-medium text-white">{filtered ? 'No whispers match that inbox yet.' : 'Nothing dropped in... yet.'}</p>
      <p className="text-sm text-white/50">
        {filtered
          ? 'Try another campus ID or clear the filter to view every anonymous note.'
          : 'As soon as someone sends a shoutout, it will appear here for moderation.'}
      </p>
    </div>
  </div>
);

const AdminAnonymousMessages = () => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searching, setSearching] = useState(false);
  const [filteredView, setFilteredView] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);

  const formattedMessages = useMessagesFormatter(messages);

  const recordFetch = useCallback((payload, meta = {}) => {
    setMessages(payload || []);
    setStats(meta.results || meta.stats || meta || null);
    setLastFetched(new Date());
  }, []);

  const loadAllMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllMessages();

      if (!result.success) {
        throw new Error(result.error || 'Failed to load messages');
      }

      recordFetch(result.messages, { results: result.results });
      setFilteredView(false);
    } catch (err) {
      setError(err.message || 'Unexpected error occurred while loading messages.');
    } finally {
      setLoading(false);
    }
  }, [recordFetch]);

  useEffect(() => {
    loadAllMessages();
  }, [loadAllMessages]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchEmail.trim()) {
      await loadAllMessages();
      return;
    }

    try {
      setSearching(true);
      setError(null);
      const result = await getMessagesByEmail(searchEmail.trim());

      if (!result.success) {
        throw new Error(result.error || 'No messages found for that email');
      }

      const combined = Array.isArray(result.messages) ? result.messages : [];
      recordFetch(combined, {
        results: {
          ...result.results,
          totalMessages: combined.length,
          filteredEmail: result.user?.email || searchEmail.trim()
        }
      });
      setFilteredView(true);
    } catch (err) {
      setError(err.message || 'Could not fetch messages for that email.');
    } finally {
      setSearching(false);
    }
  };

  const clearFilter = async () => {
    setSearchEmail('');
    await loadAllMessages();
  };

  const totalMessages = stats?.totalMessages ?? formattedMessages.length;
  const filteredEmail = stats?.filteredEmail;

  return (
    <div className="px-4 sm:px-6 lg:px-10 pt-24 pb-28">
      <div className="max-w-6xl mx-auto space-y-10">
        <Motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card overflow-hidden"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/50">
                <ShieldCheck size={16} />
                Admin moderation lane
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-white">Anonymous Message Inbox</h1>
                <p className="text-white/60 text-sm">
                  Review every anonymous whisper sent across campus. Filter by IIT Dharwad ID when something sketchy pops up.
                </p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="surface-soft border border-white/10 rounded-full px-4 py-3 flex items-center gap-3">
                <Search size={18} className="text-white/40" />
                <input
                  value={searchEmail}
                  onChange={(event) => setSearchEmail(event.target.value)}
                  type="email"
                  placeholder="Search by IIT Dharwad email"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 disabled:opacity-50"
                >
                  {searching ? 'Searching…' : 'Filter'}
                </button>
              </div>
            </form>
          </div>
        </Motion.section>

        <Motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="surface-soft border border-white/10 rounded-3xl px-6 py-5 flex items-center gap-4 text-white">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/70 to-purple-500/60 flex items-center justify-center">
              <Inbox size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Total whispers</p>
              <p className="text-2xl font-semibold">{loading ? '—' : totalMessages}</p>
            </div>
          </div>

          <div className="surface-soft border border-white/10 rounded-3xl px-6 py-5 flex items-center gap-4 text-white">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/70 to-blue-500/60 flex items-center justify-center">
              <Mail size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Filter scope</p>
              <p className="text-sm text-white/70">
                {filteredEmail ? filteredEmail : 'All anonymous submissions'}
              </p>
            </div>
          </div>
        </Motion.section>

        <AnimatePresence>
          {error && (
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="surface-soft border border-rose-500/40 bg-rose-500/10 text-rose-100 rounded-3xl px-6 py-4 flex items-center gap-3"
            >
              <AlertTriangle size={18} />
              <span>{error}</span>
            </Motion.div>
          )}
        </AnimatePresence>

        <Motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">
              Moderation queue
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/45">
              <span>
                Last synced: {lastFetched ? lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
              </span>
              {filteredView && (
                <button
                  onClick={clearFilter}
                  type="button"
                  className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                >
                  <Undo2 size={14} />
                  Clear filter
                </button>
              )}
              <button
                onClick={loadAllMessages}
                type="button"
                className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors"
              >
                <Loader2 size={14} className="animate-spin-slow" />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4 text-white/60">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span>Fetching the secret stash…</span>
            </div>
          ) : formattedMessages.length === 0 ? (
            <EmptyState filtered={filteredView} />
          ) : (
            <div className="grid gap-4">
              {formattedMessages.map((item) => (
                <div
                  key={item.id}
                  className="surface-soft border border-white/10 rounded-3xl p-6 flex flex-col gap-4"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/60">
                      <ShieldCheck size={14} />
                      {item.email || 'anonymous@freshers'}
                    </div>
                    {item.userName && (
                      <span className="text-xs text-white/40">
                        {item.userName}
                      </span>
                    )}
                    {item.createdAt && (
                      <span className="text-xs text-white/40">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap">
                    {item.message || <span className="italic text-white/50">(Empty message body)</span>}
                  </p>

                  <details className="text-xs text-white/35">
                    <summary className="cursor-pointer text-white/50 hover:text-white/80 transition-colors">
                      Raw payload
                    </summary>
                    <pre className="mt-2 rounded-2xl bg-black/30 p-4 text-[11px] leading-relaxed whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(item.raw, null, 2)}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          )}
        </Motion.section>
      </div>
    </div>
  );
};

export default AdminAnonymousMessages;
