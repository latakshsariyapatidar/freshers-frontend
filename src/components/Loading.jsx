import React from 'react';
import { PartyPopper } from 'lucide-react';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <PartyPopper className="h-12 w-12 text-primary-500 animate-bounce" />
          </div>
        </div>
        <p className="text-gray-600 text-lg font-medium">{message}</p>
        <p className="text-gray-500 text-sm mt-2">Please wait a moment...</p>
      </div>
    </div>
  );
};

export default Loading;
