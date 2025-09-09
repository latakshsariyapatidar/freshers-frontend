import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PartyPopper, Vote, Music, MessageCircle, Calendar, MapPin, Gift } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Event Schedule',
      description: 'View the complete timeline of party events',
      link: '/schedule',
      color: 'from-emerald-500 to-teal-500',
      protected: false
    },
    {
      icon: Vote,
      title: 'Vote Now!',
      description: 'Cast your vote for Mr. & Ms. Freshie 2025',
      link: '',
      color: 'from-blue-500 to-purple-500',
      protected: true,
      comingSoon: true,
      comingSoonText: 'Available on Freshers Party Day!'
    },
    {
      icon: Music,
      title: 'Request Songs',
      description: 'Submit your favorite songs for the party',
      link: '/music',
      color: 'from-pink-500 to-red-500',
      protected: true
    },
    // {
    //   icon: MessageCircle,
    //   title: 'Anonymous Messages',
    //   description: 'Send anonymous messages to fellow freshers',
    //   link: '',
    //   color: 'from-orange-500 to-pink-500',
    //   protected: true,
    //   surprise: true,
    //   surpriseText: 'Something Special Coming Soon... 🎉'
    // },
    {
      icon: Gift,
      title: 'Surprise',
      link: '',
      color: 'from-orange-500 to-pink-500',
      protected: true,
      surprise: true,
      surpriseText: 'Something Special Coming Soon... 🎉'
    }
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="px-3 py-8 sm:px-4 sm:py-12 lg:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex justify-center">
              <PartyPopper className="h-12 w-12 sm:h-16 sm:w-16 text-blue-500 animate-bounce" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold gradient-text leading-tight px-2">
              IIT Dharwad
              <br />
              <span className="text-pink-400">Freshers Party 2025</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto px-4">
              Welcome to the most awaited event of the year! Join us for an unforgettable night 
              filled with fun, music, and competitions.
            </p>

            {!user && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8 px-4">
                <Link to="/login" className="btn-primary w-full sm:w-auto min-w-[160px] text-center">
                  Login to Participate
                </Link>
                <Link to="/signup" className="btn-secondary w-full sm:w-auto min-w-[160px] text-center">
                  New? Sign Up Here
                </Link>
              </div>
            )}
          </Motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section className="px-3 py-8 sm:px-4 sm:py-12 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card text-center p-6 sm:p-8 w-full max-w-md mx-auto"
          >
            <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-blue-500 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3 sm:mb-4">When</h3>
            <p className="text-slate-300 text-base sm:text-lg">
              September 12 and September 13, 2025
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-3 py-8 sm:px-4 sm:py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4 px-2">
              What You Can Do
            </h2>
            <p className="text-slate-300 text-base sm:text-lg px-4">
              Participate in the excitement and make your voice heard!
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const canAccess = !feature.protected || user;
              
              return (
                <Motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  className={`card text-center group hover:scale-105 transition-transform duration-300 ${
                    !canAccess ? 'opacity-75' : ''
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h3>
                  <p className="text-slate-300 mb-6">{feature.description}</p>
                  
                  {feature.comingSoon ? (
                    <div className="space-y-3">
                      <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3 mb-4">
                        <p className="text-yellow-300 text-sm font-medium">
                          🗳️ {feature.comingSoonText}
                        </p>
                      </div>
                      <button
                        disabled
                        className="w-full py-2 px-4 rounded-full font-semibold bg-slate-600 text-slate-400 cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    </div>
                  ) : feature.surprise ? (
                    <div className="space-y-3">
                      <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 mb-4">
                        <p className="text-purple-300 text-sm font-medium">
                          {feature.surpriseText}
                        </p>
                      </div>
                      <button
                        disabled
                        className="w-full py-2 px-4 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-not-allowed opacity-75"
                      >
                        Surprise! 🎁
                      </button>
                    </div>
                  ) : canAccess ? (
                    <Link
                      to={feature.link}
                      className="inline-block btn-primary"
                    >
                      Get Started
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-400 mb-4">Login required</p>
                      <Link to="/login" className="inline-block btn-primary">
                        Login First
                      </Link>
                    </div>
                  )}
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="px-4 py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Join the Fun?
            </h2>
            <p className="text-lg lg:text-xl mb-8 opacity-90">
              Don't miss out on the biggest celebration of the year!
            </p>
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/voting"
                  className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  Start Voting
                </Link>
                <Link
                  to="/music"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Request Songs
                </Link>
              </div>
            ) : (
              <Link
                to="/signup"
                className="bg-black text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-colors inline-block"
              >
                Sign Up Now
              </Link>
            )}
          </Motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
