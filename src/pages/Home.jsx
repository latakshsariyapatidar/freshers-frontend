import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PartyPopper, Vote, Music, Calendar, MapPin, Gift } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Event Timeline',
      description: 'A pocket guide for every performance and reveal',
      link: '/schedule',
      accent: '#7f5af0',
      protected: false
    },
    {
      icon: Vote,
      title: 'Mr & Ms Freshie',
      description: 'Cast your votes when the spotlight goes live',
      link: '',
      accent: '#2cb67d',
      protected: true,
      comingSoon: true,
      comingSoonText: 'Voting unlocks on Oct 11, 7 PM'
    },
    {
      icon: Music,
      title: 'Curate the Sound',
      description: 'Drop up to three Spotify tracks for the DJ',
      link: '/music',
      accent: '#f25f4c',
      protected: true
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-28">
      {/* Hero */}
      <section className="max-w-6xl mx-auto pt-6 sm:pt-10 lg:pt-12">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm">
            <PartyPopper className="w-4 h-4" />
            <span>Freshers Night · October 10 & 11, 2025</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Celebrate new beginnings under the Dharwad night sky
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Two nights of music, performances, and community. Collect memories, vote for your champions,
            and soundtrack the evening with your own picks.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
              <Link to="/signup" className="btn-primary w-full sm:w-auto">
                Create your access pass
              </Link>
              <Link to="/login" className="btn-secondary w-full sm:w-auto">
                I already have an account
              </Link>
            </div>
          )}
        </Motion.div>
      </section>

      {/* Quick facts */}
      <section className="max-w-4xl mx-auto mt-14 sm:mt-16">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Venue</p>
            <div className="flex items-center gap-3 text-white/80">
              <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                <MapPin size={18} />
              </span>
              <div>
                <p className="font-medium">Campus Amphitheatre & F600</p>
                <p className="text-xs text-white/40">Follow signage from the main quad</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Timings</p>
            <div className="text-white/80">
              <p>Night One · Friday · Oct 10 · 6 PM – Midnight</p>
              <p className="text-xs text-white/40 mt-1">Night Two · Saturday · Oct 11 · 4 PM – 11 PM</p>
            </div>
          </div>
        </Motion.div>
      </section>

      {/* Feature grid */}
      <section className="max-w-6xl mx-auto mt-16 sm:mt-20">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Your essentials for the night</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Shortcuts to everything you’ll need—from the schedule to the soundtrack. Mobile-first, because you’ll be on the move.
          </p>
        </Motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const canAccess = !feature.protected || user;

            return (
              <Motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                className={`card h-full text-left ${!canAccess ? 'opacity-70' : ''}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: feature.accent + '22', color: feature.accent }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60 mb-6">{feature.description}</p>

                {feature.comingSoon ? (
                  <div className="space-y-2">
                    <div className="badge-muted inline-flex items-center gap-2 text-xs">
                      🗳️ {feature.comingSoonText}
                    </div>
                    <button
                      disabled
                      className="w-full py-3 rounded-full border border-white/10 text-white/40 text-sm"
                    >
                      Locked
                    </button>
                  </div>
                ) : feature.surprise ? (
                  <div className="space-y-2">
                    <div className="badge-muted inline-flex items-center gap-2 text-xs">
                      🎁 {feature.surpriseText}
                    </div>
                    <button
                      disabled
                      className="w-full py-3 rounded-full border border-white/10 text-white/50 text-sm"
                    >
                      Revealing soon
                    </button>
                  </div>
                ) : canAccess ? (
                  <Link to={feature.link} className="btn-primary w-full justify-center text-sm">
                    Open
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-white/40">Login required</p>
                    <Link to="/login" className="btn-primary w-full justify-center text-sm">
                      Login to continue
                    </Link>
                  </div>
                )}
              </Motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto mt-16 sm:mt-20">
        <Motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card overflow-hidden"
        >
          <div className="bg-[linear-gradient(120deg,rgba(127,90,240,0.22),rgba(44,182,125,0.18))] rounded-3xl p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-white/50">Plan your night</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                  Save your favourite acts, prep your playlist, and arrive early for the surprise drop.
                </h3>
                <p className="text-white/60 max-w-xl">
                  Use the dashboard to keep track of everything you’ve unlocked. We’ll send reminders on your registered email.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={user ? '/dashboard' : '/signup'} className="btn-primary justify-center">
                  {user ? 'Open dashboard' : 'Create my account'}
                </Link>
                <Link to="/schedule" className="btn-secondary justify-center">
                  View full schedule
                </Link>
              </div>
            </div>
          </div>
        </Motion.div>
      </section>
    </div>
  );
};

export default Home;