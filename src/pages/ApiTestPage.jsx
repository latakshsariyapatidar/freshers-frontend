/**
 * API Test Component - Test All API Endpoints
 * 
 * This component provides a testing interface for all API endpoints
 * in the Fresher Party Voting System. It can be used to verify that
 * the backend integration is working correctly.
 */

import React, { useState } from 'react';
import { 
  signUp,
  verifyOTP,
  login,
  castVote,
  getCandidatesByCategory,
  submitSongSuggestions,
  getMySongSuggestions,
  sendAnonymousMessage,
  getMyMessages,
  getAllCandidates,
  createCandidate,
  getAllMessages,
  getMessagesByEmail,
  getAllSongSuggestions,
  isAuthenticated,
  getCurrentUser,
  isAdmin
} from '../services/api';
import { ArrowLeft, Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ApiTestPage = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [testData] = useState({
    signup: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    },
    otp: {
      email: 'test@example.com',
      otp: '123456'
    },
    login: {
      email: 'test@example.com',
      password: 'password123'
    },
    vote: {
      candidateID: '12345'
    },
    songSuggestions: {
      songLinks: [
        'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC',
        'https://open.spotify.com/track/6BDPw8z5x9Pr4dHwdnXuYU'
      ]
    },
    message: {
      message: 'This is a test anonymous message!'
    },
    newCandidate: {
      name: 'Test Candidate',
      category: 'Mr_Fresher'
    },
    userEmail: 'test@example.com'
  });

  /**
   * Generic test runner
   */
  const runTest = async (testName, testFunction, params = {}) => {
    setLoading(prev => ({ ...prev, [testName]: true }));
    
    try {
      const result = await testFunction(params);
      
      setResults(prev => ({
        ...prev,
        [testName]: {
          success: result.success !== false,
          data: result,
          timestamp: new Date().toISOString(),
          status: result.success !== false ? 'success' : 'error'
        }
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [testName]: {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
          status: 'error'
        }
      }));
    }
    
    setLoading(prev => ({ ...prev, [testName]: false }));
  };

  /**
   * Test Authentication Endpoints
   */
  const testAuth = {
    signup: () => runTest('signup', signUp, testData.signup),
    verifyOTP: () => runTest('verifyOTP', verifyOTP, testData.otp),
    login: () => runTest('login', login, testData.login),
    checkAuth: () => runTest('checkAuth', () => ({ 
      authenticated: isAuthenticated(),
      user: getCurrentUser(),
      isAdmin: isAdmin()
    }))
  };

  /**
   * Test Voting Endpoints
   */
  const testVoting = {
    castVote: () => runTest('castVote', castVote, testData.vote.candidateID),
    getMrFresher: () => runTest('getMrFresher', getCandidatesByCategory, 'Mr_Fresher'),
    getMissFresher: () => runTest('getMissFresher', getCandidatesByCategory, 'Miss_Fresher')
  };

  /**
   * Test Song Endpoints
   */
  const testSongs = {
    submitSongs: () => runTest('submitSongs', submitSongSuggestions, testData.songSuggestions.songLinks),
    getMySongs: () => runTest('getMySongs', getMySongSuggestions)
  };

  /**
   * Test Message Endpoints
   */
  const testMessages = {
    sendMessage: () => runTest('sendMessage', sendAnonymousMessage, testData.message.message),
    getMyMessages: () => runTest('getMyMessages', getMyMessages)
  };

  /**
   * Test Admin Endpoints
   */
  const testAdmin = {
    getAllCandidates: () => runTest('getAllCandidates', getAllCandidates),
    createCandidate: () => runTest('createCandidate', createCandidate, testData.newCandidate),
    getAllMessages: () => runTest('getAllMessages', getAllMessages),
    getMessagesByEmail: () => runTest('getMessagesByEmail', getMessagesByEmail, testData.userEmail),
    getAllSongs: () => runTest('getAllSongs', getAllSongSuggestions)
  };

  /**
   * Run all tests
   */
  const runAllTests = async () => {
    const tests = [
      ...Object.values(testAuth),
      ...Object.values(testVoting),
      ...Object.values(testSongs),
      ...Object.values(testMessages),
      ...Object.values(testAdmin)
    ];

    for (const test of tests) {
      await test();
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  /**
   * Get status icon for test result
   */
  const getStatusIcon = (result) => {
    if (!result) return <AlertCircle className="h-5 w-5 text-gray-400" />;
    if (result.success) return <CheckCircle className="h-5 w-5 text-green-400" />;
    return <XCircle className="h-5 w-5 text-red-400" />;
  };

  /**
   * Get status color for test result
   */
  const getStatusColor = (result) => {
    if (!result) return 'border-gray-600';
    if (result.success) return 'border-green-500';
    return 'border-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">API Test Suite</h1>
          <p className="text-blue-200">
            Test all API endpoints for the Fresher Party Voting System
          </p>
        </div>

        {/* Run All Tests Button */}
        <div className="mb-8">
          <button
            onClick={runAllTests}
            disabled={Object.keys(loading).some(key => loading[key])}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Play className="h-5 w-5 mr-2" />
            Run All Tests
          </button>
        </div>

        {/* Test Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authentication Tests */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">🔐 Authentication</h2>
            <div className="space-y-3">
              {Object.entries(testAuth).map(([testName, testFn]) => (
                <div key={testName} className={`border ${getStatusColor(results[testName])} rounded-lg p-4 bg-black/20`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white capitalize">{testName.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(results[testName])}
                      <button
                        onClick={testFn}
                        disabled={loading[testName]}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                      >
                        {loading[testName] ? 'Testing...' : 'Test'}
                      </button>
                    </div>
                  </div>
                  {results[testName] && (
                    <pre className="text-xs text-gray-300 bg-black/30 p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify(results[testName], null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Voting Tests */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">🗳️ Voting</h2>
            <div className="space-y-3">
              {Object.entries(testVoting).map(([testName, testFn]) => (
                <div key={testName} className={`border ${getStatusColor(results[testName])} rounded-lg p-4 bg-black/20`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white capitalize">{testName.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(results[testName])}
                      <button
                        onClick={testFn}
                        disabled={loading[testName]}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                      >
                        {loading[testName] ? 'Testing...' : 'Test'}
                      </button>
                    </div>
                  </div>
                  {results[testName] && (
                    <pre className="text-xs text-gray-300 bg-black/30 p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify(results[testName], null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Songs Tests */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">🎵 Songs</h2>
            <div className="space-y-3">
              {Object.entries(testSongs).map(([testName, testFn]) => (
                <div key={testName} className={`border ${getStatusColor(results[testName])} rounded-lg p-4 bg-black/20`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white capitalize">{testName.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(results[testName])}
                      <button
                        onClick={testFn}
                        disabled={loading[testName]}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                      >
                        {loading[testName] ? 'Testing...' : 'Test'}
                      </button>
                    </div>
                  </div>
                  {results[testName] && (
                    <pre className="text-xs text-gray-300 bg-black/30 p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify(results[testName], null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Messages Tests */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">💬 Messages</h2>
            <div className="space-y-3">
              {Object.entries(testMessages).map(([testName, testFn]) => (
                <div key={testName} className={`border ${getStatusColor(results[testName])} rounded-lg p-4 bg-black/20`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white capitalize">{testName.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(results[testName])}
                      <button
                        onClick={testFn}
                        disabled={loading[testName]}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                      >
                        {loading[testName] ? 'Testing...' : 'Test'}
                      </button>
                    </div>
                  </div>
                  {results[testName] && (
                    <pre className="text-xs text-gray-300 bg-black/30 p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify(results[testName], null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Admin Tests */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">⚙️ Admin (Requires Admin Access)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(testAdmin).map(([testName, testFn]) => (
                <div key={testName} className={`border ${getStatusColor(results[testName])} rounded-lg p-4 bg-black/20`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white text-sm capitalize">{testName.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(results[testName])}
                      <button
                        onClick={testFn}
                        disabled={loading[testName]}
                        className="px-2 py-1 bg-yellow-500 text-black rounded text-xs hover:bg-yellow-600 disabled:opacity-50"
                      >
                        {loading[testName] ? '...' : 'Test'}
                      </button>
                    </div>
                  </div>
                  {results[testName] && (
                    <pre className="text-xs text-gray-300 bg-black/30 p-2 rounded mt-2 overflow-auto max-h-32">
                      {JSON.stringify(results[testName], null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Data Configuration */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Test Data Configuration</h3>
          <pre className="text-xs text-gray-300 bg-black/30 p-4 rounded overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;
