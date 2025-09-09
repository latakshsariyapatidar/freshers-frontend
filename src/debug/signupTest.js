/**
 * Quick API test to debug signup endpoint
 */

import { signUp } from '../services/api';

// Test function you can call from browser console
window.testSignup = async () => {
  console.log('Testing signup endpoint...');
  
  try {
    const result = await signUp({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Signup result:', result);
    return result;
  } catch (error) {
    console.error('Signup error:', error);
    return error;
  }
};

console.log('Signup test function available as window.testSignup()');
