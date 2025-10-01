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
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto h-full'>
      <div className='w-full p-4 sm:p-6 rounded-none sm:rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 h-full sm:h-auto flex flex-col justify-center'>
        <h1 className='text-2xl sm:text-3xl font-semibold text-center text-white mb-4 sm:mb-6'>
          Sign up <span className='text-white/80'>CS</span>
        </h1>

        <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
          <div>
            <label className='block p-1 sm:p-2'>
              <span className='text-sm sm:text-base text-white/70'>Full Name</span>
            </label>
            <input
              type="text"
              placeholder='John Smith'
              className='w-full h-10 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-0'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='block p-1 sm:p-2'>
              <span className='text-sm sm:text-base text-white/70'>Username</span>
            </label>
            <input
              type="text"
              placeholder='Username'
              className='w-full h-10 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-0'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='block p-1 sm:p-2'>
              <span className='text-sm sm:text-base text-white/70'>Password</span>
            </label>
            <input
              type="password"
              className="w-full h-10 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-0"
              placeholder='Enter Password'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='block p-1 sm:p-2'>
              <span className='text-sm sm:text-base text-white/70'>Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full h-10 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-0"
              placeholder='Confirm Password'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to="/login" className='text-sm mt-2 inline-block text-white/70'>
            Already have an account?
          </Link>

          <div>
            <button className='w-full mt-2 bg-white/10 text-white font-bold py-2 px-4 rounded-lg border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed' type='submit'
            disabled={loading}
            >
                {loading ? <span>⏳</span>:"Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
