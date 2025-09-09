import React, { useState, useEffect } from 'react';
import { votingService } from '../services/api';
import { Trophy, Medal, Crown, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const Results = () => {
  const [results, setResults] = useState({ male: [], female: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalVotes, setTotalVotes] = useState({ male: 0, female: 0 });
  const [lastUpdated, setLastUpdated] = useState(null);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchResults();
    
    const interval = setInterval(() => {
      refreshResults();
    }, 30000); // Auto refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const fetchResults = async () => {
    try {
      const data = await votingService.getResults();
      
      // Transform the results array into the expected format
      const transformedResults = {
        male: data.results.filter(candidate => candidate.category === 'Mr').sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0)),
        female: data.results.filter(candidate => candidate.category === 'Miss').sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
      };
      
      setResults(transformedResults);
      setTotalVotes(data.totalVotes);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshResults = async () => {
    setRefreshing(true);
    try {
      const data = await votingService.getResults();
      
      // Transform the results array into the expected format
      const transformedResults = {
        male: data.results.filter(candidate => candidate.category === 'Mr').sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0)),
        female: data.results.filter(candidate => candidate.category === 'Miss').sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
      };
      
      setResults(transformedResults);
      setTotalVotes(data.totalVotes);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh results:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getPositionIcon = (position) => {
    switch (position) {
      case 0:
        return <Crown className="h-8 w-8 text-yellow-500" />;
      case 1:
        return <Medal className="h-8 w-8 text-slate-400" />;
      case 2:
        return <Trophy className="h-8 w-8 text-amber-600" />;
      default:
        return <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-slate-200 font-bold text-sm">{position + 1}</div>;
    }
  };

  const getPositionColor = (position) => {
    switch (position) {
      case 0:
        return 'from-yellow-400 to-yellow-600';
      case 1:
        return 'from-gray-300 to-gray-500';
      case 2:
        return 'from-amber-400 to-amber-600';
      default:
        return 'from-gray-200 to-gray-400';
    }
  };

  const ResultCard = ({ participant, position, category }) => {
    const votePercentage = totalVotes[category] > 0 
      ? ((participant.voteCount / totalVotes[category]) * 100).toFixed(1)
      : 0;

    return (
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: position * 0.1 }}
        className={`card relative overflow-hidden ${position === 0 ? 'ring-2 ring-yellow-400 shadow-2xl' : ''}`}
      >
        {/* Position Badge */}
        <div className="absolute top-4 left-4 z-10">
          {getPositionIcon(position)}
        </div>

        {/* Winner Crown Effect */}
        {position === 0 && (
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-pulse"></div>
        )}
        
        <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-slate-700 mt-8">
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
          
          {/* Vote Count */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold text-gray-800">{participant.voteCount}</span>
              <span className="text-gray-600">votes</span>
            </div>
            
            {/* Percentage */}
            <div className="text-lg font-semibold text-green-600">
              {votePercentage}% of votes
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full bg-gradient-to-r ${getPositionColor(position)} transition-all duration-1000 ease-out`}
              style={{ width: `${votePercentage}%` }}
            />
          </div>
          
          {/* Position */}
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            position === 0 
              ? 'bg-yellow-100 text-yellow-800' 
              : position === 1 
              ? 'bg-gray-100 text-gray-800'
              : position === 2
              ? 'bg-amber-100 text-amber-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {position === 0 ? '👑 Winner' : `#${position + 1} Position`}
          </div>
        </div>
      </Motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
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
            Live Results
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Competition results updated automatically every 30 seconds. Click refresh for latest data.
          </p>
          
          {/* Refresh Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={refreshResults}
              disabled={refreshing}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                refreshing 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh Results'}</span>
            </button>
          </div>
          
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </Motion.div>

        {/* Stats Overview */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <div className="card text-center bg-gradient-to-r from-blue-50 to-blue-100">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Mr. Freshie</h3>
            <p className="text-3xl font-bold text-blue-600">{totalVotes.male}</p>
            <p className="text-blue-600">Total Votes</p>
          </div>
          
          <div className="card text-center bg-gradient-to-r from-pink-50 to-pink-100">
            <Users className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-pink-800 mb-2">Ms. Freshie</h3>
            <p className="text-3xl font-bold text-pink-600">{totalVotes.female}</p>
            <p className="text-pink-600">Total Votes</p>
          </div>
        </Motion.div>

        {/* Mr. Freshie Results */}
        <Motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Crown className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Mr. Freshie 2025 Results</h2>
          </div>
          
          {results.male.length === 0 ? (
            <div className="text-center py-12 card">
              <p className="text-gray-600">No votes yet. Be the first to vote!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.male.map((participant, index) => (
                <ResultCard
                  key={participant.id}
                  participant={participant}
                  position={index}
                  category="male"
                />
              ))}
            </div>
          )}
        </Motion.section>

        {/* Ms. Freshie Results */}
        <Motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Crown className="h-8 w-8 text-pink-500" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Ms. Freshie 2025 Results</h2>
          </div>
          
          {results.female.length === 0 ? (
            <div className="text-center py-12 card">
              <p className="text-gray-600">No votes yet. Be the first to vote!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.female.map((participant, index) => (
                <ResultCard
                  key={participant.id}
                  participant={participant}
                  position={index}
                  category="female"
                />
              ))}
            </div>
          )}
        </Motion.section>

        {/* Live Update Notice */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8 bg-white/50 backdrop-blur-sm rounded-2xl"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-gray-600 font-semibold">Live Updates</p>
          </div>
          <p className="text-gray-500 text-sm">
            Results update automatically as new votes come in. Winners will be announced during the party!
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default Results;
