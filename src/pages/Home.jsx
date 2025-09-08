import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PartyPopper, Vote, Music, Trophy, MessageCircle, Calendar, MapPin } from 'lucide-react';
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
      link: '/voting',
      color: 'from-blue-500 to-purple-500',
      protected: true
    },
    {
      icon: Music,
      title: 'Request Songs',
      description: 'Submit your favorite songs for the party',
      link: '/music',
      color: 'from-pink-500 to-red-500',
      protected: true
    },
    {
      icon: MessageCircle,
      title: 'Anonymous Messages',
      description: 'Send anonymous messages to fellow freshers',
      link: '/messages',
      color: 'from-orange-500 to-pink-500',
      protected: true
    },
    {
      icon: Trophy,
      title: 'Live Results',
      description: 'Check real-time voting results',
      link: '/results',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <PartyPopper className="h-16 w-16 text-blue-500 animate-bounce" />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold gradient-text leading-tight">
              IIT Dharwad
              <br />
              <span className="text-pink-400">Freshers Party 2025</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
              Welcome to the most awaited event of the year! Join us for an unforgettable night 
              filled with fun, music, and competitions.
            </p>

            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Link to="/login" className="btn-primary">
                  Login to Participate
                </Link>
                <Link to="/signup" className="btn-secondary">
                  New? Sign Up Here
                </Link>
              </div>
            )}
          </Motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section className="px-4 py-12 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card text-center"
            >
              <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-100 mb-2">When</h3>
              <p className="text-slate-300">
                September 12 and September 13, 2025
                <br />
              </p>
            </Motion.div>
            
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">
              What You Can Do
            </h2>
            <p className="text-slate-300 text-lg">
              Participate in the excitement and make your voice heard!
            </p>
          </Motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
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
                  
                  {canAccess ? (
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
      <section className="px-4 py-12 bg-gradient-to-r from-blue-600 to-purple-600">
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
      </section>
    </div>
  );
};

export default Home;
