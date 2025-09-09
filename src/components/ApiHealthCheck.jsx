/**
 * API Health Check Component
 * 
 * Simple component to test if the API proxy is working correctly
 */

import React, { useState } from 'react';
import { apiClient } from '../services/api';

const ApiHealthCheck = () => {
  const [status, setStatus] = useState('Not tested');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus('Testing...');

    try {
      // Try to make a simple request to test the proxy
      const response = await apiClient.get('/vote/category/Mr_Fresher');
      setStatus(`✅ Success! Status: ${response.status}`);
    } catch (error) {
      if (error.status === 401) {
        setStatus('✅ Proxy working! (401 Unauthorized is expected without login)');
      } else if (error.status === 0) {
        setStatus('❌ Network error - CORS or connection issue');
      } else {
        setStatus(`⚠️ API responded with: ${error.status} - ${error.message}`);
      }
    }

    setLoading(false);
  };

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-50">
      <h3 className="font-bold mb-2">API Status</h3>
      <p className="text-sm mb-2">Status: {status}</p>
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>
    </div>
  );
};

export default ApiHealthCheck;
