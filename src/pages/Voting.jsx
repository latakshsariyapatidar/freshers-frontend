import React, { useState, useEffect } from 'react';
import { votingService, createSocket } from '../services/api';
import { Trophy, Users, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const Voting = () => {
  const [participants, setParticipants] = useState({ male: [], female: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [votedFor, setVotedFor] = useState({ male: null, female: null });
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    fetchParticipants();
    checkVotingStatus();
    
    // Set up socket connection for real-time updates
    const socket = createSocket();
    
    socket.on('participantsUpdated', (data) => {
      setParticipants(data);
    });

    return () => socket.disconnect();
  }, []);

  const fetchParticipants = async () => {
    try {
      const data = await votingService.getParticipants();
      setParticipants(data);
    } catch (err) {
      console.error('Failed to load participants:', err);
      setError('Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  const checkVotingStatus = async () => {
    try {
      const maleVoted = await votingService.hasUserVoted('male');
      const femaleVoted = await votingService.hasUserVoted('female');
      
      setVotedFor({
        male: maleVoted.hasVoted ? maleVoted.participantId : null,
        female: femaleVoted.hasVoted ? femaleVoted.participantId : null
      });
    } catch (error) {
      console.error('Failed to check voting status:', error);
    }
  };

  const handleVote = async (participantId, category) => {
    if (votedFor[category] || isVoting) return;

    setIsVoting(true);
    try {
      await votingService.vote(participantId, category);
      setVotedFor({ ...votedFor, [category]: participantId });
      await fetchParticipants(); // Refresh to get updated vote counts
    } catch (err) {
      console.error('Voting failed:', err);
      setError('Failed to vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  const ParticipantCard = ({ participant, category }) => {
    const hasVoted = votedFor[category] === participant.id;
    const canVote = !votedFor[category] && !isVoting;

    return (
      <Motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`card relative transform transition-all duration-300 hover:scale-105 ${
          hasVoted ? 'ring-2 ring-green-400 shadow-green-400/20' : ''
        }`}
      >
        {hasVoted && (
          <div className="absolute -top-2 -right-2 z-10 bg-green-500 rounded-full p-1">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
        )}
        
        <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-slate-700">
          <img
            src={participant.photo || '/api/placeholder/300/300'}
            alt={participant.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/api/placeholder/300/300';
            }}
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-100 mb-2">{participant.name}</h3>
          <p className="text-slate-300 text-sm mb-2">{participant.department}</p>
          <p className="text-slate-400 text-xs mb-4">Roll: {participant.rollNumber}</p>
          
          <div className="flex items-center justify-center space-x-2 mb-4 text-sm text-slate-300">
            <Heart className="h-4 w-4" />
            <span>{participant.voteCount || 0} votes</span>
          </div>
          
          <button
            onClick={() => handleVote(participant.id, category)}
            disabled={!canVote}
            className={`w-full py-2 px-4 rounded-full font-semibold transition-all ${
              hasVoted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : canVote
                ? 'btn-primary'
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}
          >
            {hasVoted ? 'Voted!' : canVote ? 'Vote Now' : 'Already Voted'}
          </button>
        </div>
      </Motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading participants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Oops! Something went wrong</h2>
          <p className="text-slate-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Trophy className="h-16 w-16 text-yellow-500 animate-bounce" />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold gradient-text mb-4">
            Vote for Freshers' 2025
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Cast your vote for Mr. and Ms. Freshie! Choose wisely - you can vote once for each category.
          </p>
          
          {/* Voting Status */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              votedFor.male ? 'bg-green-900/30 text-green-300' : 'bg-slate-700 text-slate-300'
            }`}>
              Mr. Freshie: {votedFor.male ? '✓ Voted' : 'Not voted yet'}
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              votedFor.female ? 'bg-green-900/30 text-green-300' : 'bg-slate-700 text-slate-300'
            }`}>
              Ms. Freshie: {votedFor.female ? '✓ Voted' : 'Not voted yet'}
            </div>
          </div>
        </Motion.div>

        {/* Mr. Freshie Section */}
        <Motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl lg:text-3xl font-bold gradient-text">Mr. Freshie 2025</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {participants.male.map((participant) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                category="male"
              />
            ))}
          </div>
          
          {participants.male.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No male participants yet.</p>
            </div>
          )}
        </Motion.section>

        {/* Ms. Freshie Section */}
        <Motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center mb-8">
            <Users className="h-8 w-8 text-pink-500 mr-3" />
            <h2 className="text-2xl lg:text-3xl font-bold gradient-text">Ms. Freshie 2025</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {participants.female.map((participant) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                category="female"
              />
            ))}
          </div>
          
          {participants.female.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No female participants yet.</p>
            </div>
          )}
        </Motion.section>

        {/* Footer */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 py-8 border-t border-slate-700"
        >
          <p className="text-slate-400 text-sm">
            Vote responsibly! You can vote once for each category.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Results will be announced during the party. Good luck to all participants!
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default Voting;
