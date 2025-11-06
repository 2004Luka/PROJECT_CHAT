import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className='min-h-screen w-full px-4 sm:px-6 flex items-center justify-center bg-[#1E1E1E] relative overflow-hidden py-8 sm:py-12'>
      {/* Primary Card - High-contrast dark mode */}
      <div className='w-full max-w-md p-8 sm:p-10 bg-[#111111] border border-[#333333] flex flex-col justify-center relative z-10'>
        <div className='text-center mb-8 sm:mb-10'>
          <h1 className='text-3xl sm:text-4xl font-bold text-[#FFFFFF] mb-2 leading-tight tracking-tight font-mono'>
            <span className='text-[#00FF99]'>Sign up for</span>
            <span className='ml-2 sm:ml-3 text-[#FFFFFF]'>CS Chat</span>
          </h1>
          <p className='text-sm sm:text-base text-[#999999] mt-3 leading-relaxed font-mono'>Create your account to start chatting</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block mb-2'>
              <span className='text-sm font-semibold text-[#CCCCCC] font-mono'>Full Name</span>
            </label>
            {/* Input - High-contrast design */}
            <input
              type="text"
              placeholder='John Smith'
              className='w-full h-12 px-4 bg-[#1E1E1E] border border-[#333333] text-[#FFFFFF] placeholder-[#666666] focus:outline-none focus:border-[#00FF99] transition-colors duration-200 text-base font-mono'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='block mb-2'>
              <span className='text-sm font-semibold text-[#CCCCCC] font-mono'>Username</span>
            </label>
            <input
              type="text"
              placeholder='Username'
              className='w-full h-12 px-4 bg-[#1E1E1E] border border-[#333333] text-[#FFFFFF] placeholder-[#666666] focus:outline-none focus:border-[#00FF99] transition-colors duration-200 text-base font-mono'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='block mb-2'>
              <span className='text-sm font-semibold text-[#CCCCCC] font-mono'>Password</span>
            </label>
            <input
              type="password"
              className="w-full h-12 px-4 bg-[#1E1E1E] border border-[#333333] text-[#FFFFFF] placeholder-[#666666] focus:outline-none focus:border-[#00FF99] transition-colors duration-200 text-base font-mono"
              placeholder='Enter Password'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='block mb-2'>
              <span className='text-sm font-semibold text-[#CCCCCC] font-mono'>Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full h-12 px-4 bg-[#1E1E1E] border border-[#333333] text-[#FFFFFF] placeholder-[#666666] focus:outline-none focus:border-[#00FF99] transition-colors duration-200 text-base font-mono"
              placeholder='Confirm Password'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          {/* Divider line */}
          <div className='border-t border-[#333333] pt-1'>
            <Link to="/login" className='text-sm text-[#999999] hover:text-[#00FF99] transition-colors duration-200 inline-block font-mono'>
              Already have an account? <span className='text-[#00FF99] font-semibold hover:text-[#00E689]'>Sign in</span>
            </Link>
          </div>

          <div className='pt-2'>
            {/* Button - Neon Green accent */}
            <button className='w-full h-12 text-base font-semibold text-[#1E1E1E] bg-[#00FF99] hover:bg-[#00E689] border border-[#00FF99] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-mono' type='submit'
            disabled={loading}
            >
                {loading ? (
                  <div className='flex justify-center items-center'>
                    <div className='w-5 h-5 border-2 border-[#1E1E1E]/30 border-t-[#1E1E1E] rounded-full animate-spin'></div>
                  </div>
                ) : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
