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
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-2xl shadow-green-500/20 bg-slate-800/80 backdrop-blur-xl border border-green-500/20'>
        <h1 className='text-3xl font-semibold text-center bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent'>
          Sign up
          <span className='text-green-400'> CS</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='block p-2'>
              <span className='text-base text-green-300'>Full Name</span>
            </label>
            <input
              type="text"
              placeholder='John Smith'
              className='w-full h-10 px-3 py-2 bg-green-500/5 backdrop-blur-sm border border-green-500/20 rounded-lg text-green-100 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='block p-2'>
              <span className='text-base text-green-300'>Username</span>
            </label>
            <input
              type="text"
              placeholder='Username'
              className='w-full h-10 px-3 py-2 bg-green-500/5 backdrop-blur-sm border border-green-500/20 rounded-lg text-green-100 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='block p-2'>
              <span className='text-base text-green-300'>Password</span>
            </label>
            <input
              type="password"
              className="w-full h-10 px-3 py-2 bg-green-500/5 backdrop-blur-sm border border-green-500/20 rounded-lg text-green-100 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder='Enter Password'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='block p-2'>
              <span className='text-base text-green-300'>Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full h-10 px-3 py-2 bg-green-500/5 backdrop-blur-sm border border-green-500/20 rounded-lg text-green-100 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder='Confirm Password'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to="/login" className='text-sm hover:underline hover:text-green-400 mt-2 inline-block text-green-300'>
            Already have an account?
          </Link>

          <div>
            <button className='w-full mt-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed' type='submit'
            disabled={loading}
            >
                {loading ? <span className='animate-spin'>⏳</span>:"Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
