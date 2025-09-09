import React, { useState, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, User, PartyPopper, Shield, ArrowLeft } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

// OTP Verification Component - moved outside to prevent re-creation
const OtpVerification = memo(({ 
  formData, 
  otp, 
  otpLoading, 
  error, 
  handleOtpChange, 
  handleOtpKeyDown, 
  handleOtpSubmit, 
  handleBackToSignup
}) => (
  <div>
    {/* Header Section */}
    <div className="text-center mb-6 lg:mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <Shield className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
        </div>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold gradient-text mb-2">Verify Your Email</h1>
      <p className="text-slate-300 text-sm lg:text-base mb-2">
        We've sent a 6-digit verification code to
      </p>
      <p className="text-blue-400 font-semibold text-sm lg:text-base">
        {formData.email}
      </p>
    </div>

    <form onSubmit={handleOtpSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-100 px-4 py-3 rounded-lg text-sm lg:text-base">
          {error}
        </div>
      )}

      {/* OTP Input */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-4 text-center">
          Enter 6-digit verification code
        </label>
        <div className="flex justify-center space-x-2 lg:space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              name={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              className="w-12 h-10 lg:w-15 lg:h-12 text-center text-lg lg:text-xl font-bold dark-input rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          type="submit"
          disabled={otpLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-3 lg:py-4 text-sm lg:text-base font-semibold transform transition-all hover:scale-[1.02]"
        >
          {otpLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            'Verify & Create Account'
          )}
        </button>

        <button
          type="button"
          onClick={handleBackToSignup}
          className="w-full flex items-center justify-center space-x-2 text-slate-400 hover:text-slate-200 transition-colors py-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to signup form</span>
        </button>
      </div>
    </form>

  </div>
));

// Signup Form Component - moved outside to prevent re-creation
const SignupForm = memo(({ 
  formData, 
  showPassword, 
  showConfirmPassword, 
  loading, 
  error, 
  handleChange, 
  handleSubmit, 
  setShowPassword, 
  setShowConfirmPassword 
}) => (
  <div>
    {/* Header Section */}
    <div className="text-center mb-6 lg:mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
          <PartyPopper className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
        </div>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold gradient-text mb-2">Join the Party!</h1>
      <p className="text-slate-300 text-sm lg:text-base">Create your account to participate in IIT Dharwad Freshers' 2025</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-100 px-4 py-3 rounded-lg text-sm lg:text-base">
          {error}
        </div>
      )}

      {/* Two column layout for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-slate-400" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="dark-input pl-10 lg:pl-12 w-full py-2.5 lg:py-3 text-sm lg:text-base"
              placeholder="Your full name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
           Institute Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-slate-400" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="dark-input pl-10 lg:pl-12 w-full py-2.5 lg:py-3 text-sm lg:text-base"
              placeholder="your.email@iitdh.ac.in"
            />
          </div>
        </div>
      </div>

      {/* Password fields in two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="dark-input pl-10 lg:pl-12 pr-10 lg:pr-12 w-full py-2.5 lg:py-3 text-sm lg:text-base"
              placeholder="Min. 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4 lg:h-5 lg:w-5" /> : <Eye className="h-4 w-4 lg:h-5 lg:w-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-slate-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="dark-input pl-10 lg:pl-12 pr-10 lg:pr-12 w-full py-2.5 lg:py-3 text-sm lg:text-base"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4 lg:h-5 lg:w-5" /> : <Eye className="h-4 w-4 lg:h-5 lg:w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-3 lg:py-4 text-sm lg:text-base font-semibold transform transition-all hover:scale-[1.02]"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white"></div>
              <span>Sending OTP...</span>
            </div>
          ) : (
            <>
              <span className="hidden lg:inline">Send OTP & Continue</span>
              <span className="lg:hidden">Send OTP</span>
            </>
          )}
        </button>
      </div>
    </form>

    {/* Footer */}
    <div className="mt-6 lg:mt-8">
      <div className="text-center border-t border-slate-700 pt-6">
        <p className="text-slate-300 text-sm lg:text-base">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
          >
            Login here
          </Link>
        </p>
        <p className="text-slate-500 text-xs lg:text-sm mt-2">
          By signing up, you agree to join the most epic freshers party ever! 🎉
        </p>
      </div>
    </div>
  </div>
));

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('signup'); // 'signup' or 'otp'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);

  const { signup, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  }, [error]);

  const handleOtpChange = useCallback((index, value) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;
    
    setOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });
    
    if (error) setError('');
    
    // Auto-focus next input if current has a value and it's not the last input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  }, [error]);

  const handleOtpKeyDown = useCallback((index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  }, [otp]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      // Call the actual signup API to send OTP
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        // Successfully sent OTP, move to verification step
        setStep('otp');
        setError('');
      } else {
        // Handle signup error
        setError(result.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to send OTP. Please try again.');
    }
    
    setLoading(false);
  }, [formData.password, formData.confirmPassword, formData.name, formData.email, signup]);

  const handleOtpSubmit = useCallback(async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setError('');

    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      setOtpLoading(false);
      return;
    }

    try {
      // Use the new verifyOTP function from auth context
      const result = await verifyOTP({
        email: formData.email,
        otp: otpString
      });
      
      if (result.success) {
        // Account verified successfully, navigate to dashboard
        navigate('/dashboard');
      } else {
        setError(result.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Verification failed. Please try again.');
    }
    
    setOtpLoading(false);
  }, [otp, formData.email, navigate, verifyOTP]);

  const handleBackToSignup = useCallback(() => {
    setStep('signup');
    setOtp(['', '', '', '', '', '']);
    setError('');
  }, []);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 flex items-start lg:items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <Motion.div
        key={step} // This key will help prevent animation re-triggers when step changes
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm sm:max-w-lg lg:max-w-2xl"
      >
        <div className="card">
          {step === 'signup' ? (
            <SignupForm
              formData={formData}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              loading={loading}
              error={error}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setShowPassword={setShowPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />
          ) : (
            <OtpVerification
              formData={formData}
              otp={otp}
              otpLoading={otpLoading}
              error={error}
              handleOtpChange={handleOtpChange}
              handleOtpKeyDown={handleOtpKeyDown}
              handleOtpSubmit={handleOtpSubmit}
              handleBackToSignup={handleBackToSignup}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </Motion.div>
    </div>
  );
};

export default Signup;
