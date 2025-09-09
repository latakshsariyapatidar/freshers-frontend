import React, { useState, useEffect } from 'react';
import { getAllCandidates, castVote } from '../services/api';
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
    
    // Socket connection disabled for now to avoid CORS issues
    // Can be re-enabled once backend CORS is properly configured
  }, []);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch all candidates using the new unified endpoint
      const result = await getAllCandidates();
      
      if (result.success) {
        // Separate candidates by category based on the API response format
        const maleCandidates = result.candidates.filter(candidate => 
          candidate.category === 'Mr_Fresher' || candidate.category === 'Mr'
        );
        const femaleCandidates = result.candidates.filter(candidate => 
          candidate.category === 'Miss_Fresher' || candidate.category === 'Miss'
        );
        
        // Transform the data to match the expected format, mapping 'vote' to 'voteCount'
        setParticipants({
          male: maleCandidates.map(candidate => ({
            ...candidate,
            voteCount: candidate.vote || candidate.voteCount || 0
          })),
          female: femaleCandidates.map(candidate => ({
            ...candidate,
            voteCount: candidate.vote || candidate.voteCount || 0
          }))
        });
      } else {
        setError(result.error || 'Failed to load candidates');
      }
    } catch (err) {
      console.error('Failed to load participants:', err);
      setError('Failed to load participants. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const checkVotingStatus = async () => {
    try {
      // Note: This endpoint might not exist on backend yet
      // For now, we'll assume user hasn't voted
      setVotedFor({ male: null, female: null });
    } catch (err) {
      console.log('Could not check voting status:', err);
      // Continue without voting status
    }
  };

  const handleVote = async (participantId, category) => {
    if (votedFor[category] || isVoting) return;

    setIsVoting(true);
    try {
      // Use the new castVote API function
      const result = await castVote(participantId);
      
      if (result.success) {
        // Map backend categories to frontend categories
        const frontendCategory = (category === 'Mr' || category === 'Mr_Fresher') ? 'male' : 'female';
        setVotedFor({ ...votedFor, [frontendCategory]: participantId });
        await fetchParticipants(); // Refresh to get updated vote counts
      } else {
        setError(result.error || 'Failed to vote. Please try again.');
      }
    } catch (err) {
      console.error('Voting failed:', err);
      setError('Failed to vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  const ParticipantCard = ({ participant, category }) => {
    // Map backend category to frontend category for UI state
    // Handle both 'Mr'/'Miss' and 'Mr_Fresher'/'Miss_Fresher' formats
    const frontendCategory = (category === 'Mr' || category === 'Mr_Fresher') ? 'male' : 'female';
    const hasVoted = votedFor[frontendCategory] === participant._id;
    const canVote = !votedFor[frontendCategory] && !isVoting;

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
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
        )}
        
        <div className="text-center p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2 sm:mb-3 line-clamp-2">{participant.name}</h3>
          <p className="text-slate-300 text-sm sm:text-base mb-1 sm:mb-2 truncate">{participant.department}</p>
          <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">Roll: {participant.rollNumber}</p>
          
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6 text-base sm:text-lg text-slate-200">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            <span className="font-bold text-xl sm:text-2xl">{participant.voteCount || 0} votes</span>
          </div>
          
          <button
            onClick={() => handleVote(participant._id, category)}
            disabled={!canVote}
            className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-full font-semibold transition-all text-sm sm:text-base ${
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
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 px-3 py-6 sm:px-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex justify-center mb-4 sm:mb-6">
            <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-500 animate-bounce" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold gradient-text mb-3 sm:mb-4 px-2">
            Vote for Freshers' 2025
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto px-4">
            Cast your vote for Mr. and Ms. Freshie! Choose wisely - you can vote once for each category.
          </p>
          
          {/* Voting Status */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4 sm:mt-6 px-4">
            <div className={`px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium ${
              votedFor.male ? 'bg-green-900/30 text-green-300' : 'bg-slate-700 text-slate-300'
            }`}>
              Mr. Fresher: {votedFor.male ? '✓ Voted' : 'Not voted yet'}
            </div>
            <div className={`px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium ${
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
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center mb-6 sm:mb-8 px-4">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mr-2 sm:mr-3 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text text-center">Mr. Fresher 2025</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {participants.male.map((participant) => (
              <ParticipantCard
                key={participant._id}
                participant={participant}
                category={participant.category}
              />
            ))}
          </div>
          
          {participants.male.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-slate-400 text-sm sm:text-base">No male participants yet.</p>
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
                key={participant._id}
                participant={participant}
                category={participant.category}
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
