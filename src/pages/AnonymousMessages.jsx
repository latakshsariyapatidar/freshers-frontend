import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { MessageCircle, Send, Lock, Users, Heart, Smile, Eye } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const AnonymousMessages = () => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [showUsers, setShowUsers] = useState(true);

  const { user } = useAuth();

  // Mock data for demonstration
  useEffect(() => {
    // Simulate fetching users
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Arjun Sharma', email: 'arjun@iitdh.ac.in', department: 'CSE', batch: '2024' },
        { id: 2, name: 'Priya Patel', email: 'priya@iitdh.ac.in', department: 'ECE', batch: '2024' },
        { id: 3, name: 'Rahul Kumar', email: 'rahul@iitdh.ac.in', department: 'ME', batch: '2024' },
        { id: 4, name: 'Ananya Singh', email: 'ananya@iitdh.ac.in', department: 'CE', batch: '2024' },
        { id: 5, name: 'Vikram Reddy', email: 'vikram@iitdh.ac.in', department: 'EE', batch: '2024' },
        { id: 6, name: 'Sneha Gupta', email: 'sneha@iitdh.ac.in', department: 'CSE', batch: '2024' },
      ]);
      setLoading(false);
    }, 1000);

    // Simulate message count
    setMessageCount(Math.floor(Math.random() * 500) + 100);
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccess('Message sent anonymously! 🎉');
      setMessage('');
      setSelectedUser(null);
      setSending(false);
      setMessageCount(prev => prev + 1);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    }, 1500);
  };

  const quickMessages = [
    "You're really cool! 😎",
    "Great job in the last presentation! 👏",
    "You have an amazing smile! 😊",
    "Would love to be friends! 🤝",
    "You seem really nice! 💫",
    "Hope you're having a great day! ☀️"
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <MessageCircle className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">
            Anonymous Messages
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Send anonymous messages to your fellow freshers!
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
            <Eye className="h-4 w-4" />
            <span>{messageCount} messages sent today</span>
          </div>
        </Motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Selection */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                  <Users className="h-5 w-5 text-pink-500" />
                  <span>Select Recipient</span>
                </h2>
                <button
                  onClick={() => setShowUsers(!showUsers)}
                  className="lg:hidden text-slate-400 hover:text-slate-200"
                >
                  {showUsers ? 'Hide' : 'Show'}
                </button>
              </div>

              <AnimatePresence>
                {(showUsers || window.innerWidth >= 1024) && (
                  <Motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 max-h-96 overflow-y-auto"
                  >
                    {users
                      .filter(u => u.id !== user?.id)
                      .map((userItem, index) => (
                        <Motion.button
                          key={userItem.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          onClick={() => {
                            setSelectedUser(userItem);
                            setShowUsers(false);
                          }}
                          className={`w-full p-3 rounded-lg text-left transition-all ${
                            selectedUser?.id === userItem.id
                              ? 'bg-pink-500/20 border border-pink-400'
                              : 'bg-slate-700/50 hover:bg-slate-600/50 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {userItem.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-slate-100 font-medium truncate">
                                {userItem.name}
                              </p>
                              <p className="text-slate-400 text-sm">
                                {userItem.department} • {userItem.batch}
                              </p>
                            </div>
                          </div>
                        </Motion.button>
                      ))}
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          </Motion.div>

          {/* Message Composition */}
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card">
              {selectedUser ? (
                <>
                  {/* Selected User Display */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-lg border border-pink-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedUser.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-slate-100 font-semibold">
                          Sending to: {selectedUser.name}
                        </p>
                        <p className="text-slate-400 text-sm flex items-center space-x-1">
                          <Lock className="h-3 w-3" />
                          <span>Anonymous message</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {success && (
                      <Motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-6 p-4 bg-green-900/30 border border-green-500 text-green-100 rounded-lg flex items-center space-x-2"
                      >
                        <Heart className="h-5 w-5 text-green-400" />
                        <span>{success}</span>
                      </Motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Messages */}
                  <div className="mb-6">
                    <h3 className="text-slate-200 font-medium mb-3 flex items-center space-x-2">
                      <Smile className="h-4 w-4" />
                      <span>Quick Messages</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {quickMessages.map((quickMsg, index) => (
                        <Motion.button
                          key={index}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          onClick={() => setMessage(quickMsg)}
                          className="p-2 text-sm bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-slate-100 transition-all text-left"
                        >
                          {quickMsg}
                        </Motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-4">
                    <label className="block text-slate-300 font-medium">
                      Your Anonymous Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your anonymous message here... Be kind! 😊"
                      className="dark-input resize-none"
                      rows={6}
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center text-sm text-slate-400">
                      <span>{message.length}/500 characters</span>
                      <div className="flex items-center space-x-1">
                        <Lock className="h-3 w-3" />
                        <span>100% Anonymous</span>
                      </div>
                    </div>

                    {/* Send Button */}
                    <Motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!message.trim() || sending}
                      className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-pink-500/25 flex items-center justify-center space-x-2"
                    >
                      {sending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Anonymous Message</span>
                        </>
                      )}
                    </Motion.button>
                  </div>
                </>
              ) : (
                /* No User Selected */
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-2">
                    Select a Recipient
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Choose someone from the list to send an anonymous message
                  </p>
                  <button
                    onClick={() => setShowUsers(true)}
                    className="lg:hidden btn-primary"
                  >
                    Choose Recipient
                  </button>
                </div>
              )}
            </div>
          </Motion.div>
        </div>

        {/* Info Section */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 card"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center justify-center space-x-2">
              <Lock className="h-5 w-5 text-pink-500" />
              <span>Privacy & Guidelines</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-400">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="font-medium text-slate-300 mb-2">🔒 Anonymous</h4>
                <p>Your identity is completely hidden. Recipients won't know who sent the message.</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="font-medium text-slate-300 mb-2">💝 Be Kind</h4>
                <p>Spread positivity! Use this feature to compliment, encourage, and make friends.</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="font-medium text-slate-300 mb-2">🛡️ Safe Space</h4>
                <p>Inappropriate messages are monitored. Keep it friendly and respectful.</p>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default AnonymousMessages;
