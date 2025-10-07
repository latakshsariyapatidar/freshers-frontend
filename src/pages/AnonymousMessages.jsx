import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Lock, Shield, Sparkles } from 'lucide-react';
import { sendAnonymousMessage } from '../services/api';

const AnonymousMessages = () => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: string }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Drop a note before hitting send.' });
      return;
    }

    try {
      setSending(true);
      const result = await sendAnonymousMessage(message.trim());

      if (result.success) {
        setStatus({
          type: 'success',
          text: "Sealed! Your note is anonymous—if it ever leaks, someone probably peeked over your shoulder."
        });
        setMessage('');
      } else {
        throw new Error(result.error || 'Unable to send message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        text: error.message || 'Could not send that whisper. Try again in a bit.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-28">
      <div className="max-w-2xl mx-auto space-y-10">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white mx-auto shadow-lg shadow-pink-500/30">
            <MessageCircle size={28} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-white">Whisper Drop</h1>
            <p className="text-slate-400 text-sm uppercase tracking-[0.35em]">Totally anonymous · IIT Dharwad</p>
          </div>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Slip in a compliment, confession, or hype message. We scrub your name, log the words, and let the vibes travel.
          </p>
        </Motion.div>

        <Motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/40">
              Your anonymous note
            </label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Message"
              className="dark-input resize-none"
              rows={6}
              maxLength={500}
            />
            <div className="flex items-center justify-between text-xs text-white/35">
              <span>{message.length}/500</span>
              <span className="inline-flex items-center gap-1">
                <Lock size={12} />
                Anonymous by default
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status && (
              <Motion.div
                key={status.text}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`rounded-xl px-4 py-3 text-sm border transition-colors ${
                  status.type === 'success'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                    : 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                }`}
              >
                {status.text}
              </Motion.div>
            )}
          </AnimatePresence>

          <Motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-4 font-semibold text-white shadow-lg shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Drop the whisper
              </>
            )}
          </Motion.button>
        </Motion.form>

        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid gap-4 md:grid-cols-3"
        >
          <div className="surface-soft border border-white/5 rounded-2xl p-4 flex flex-col gap-3 text-sm text-white/70">
            <div className="w-10 h-10 rounded-full bg-white/10 text-pink-300 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-semibold text-white">✨ Sweet only</p>
              <p>Keep it uplifting. We nuke spam, slander, and chaos instantly.</p>
            </div>
          </div>

          <div className="surface-soft border border-white/5 rounded-2xl p-4 flex flex-col gap-3 text-sm text-white/70">
            <div className="w-10 h-10 rounded-full bg-white/10 text-purple-300 flex items-center justify-center">
              <Lock size={18} />
            </div>
            <div>
              <p className="font-semibold text-white">🔒 No breadcrumbs</p>
              <p>We just store the words. No names, no timestamps on the public side.</p>
            </div>
          </div>

          <div className="surface-soft border border-white/5 rounded-2xl p-4 flex flex-col gap-3 text-sm text-white/70">
            <div className="w-10 h-10 rounded-full bg-white/10 text-indigo-300 flex items-center justify-center">
              <Shield size={18} />
            </div>
            <div>
              <p className="font-semibold text-white">🛡️ Freshers lounge fact</p>
              <p>If someone figures it out, it’s because they literally saw you typing.</p>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default AnonymousMessages;
