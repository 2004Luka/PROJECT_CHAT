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
      <div className='w-full p-6 rounded-lg shadow-md bg-[var(--background)] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign up
          <span className='text-[var(--primary)] '> CS</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-[var(--text)]'>Full Name</span>
            </label>
            <input
              type="text"
              placeholder='John Smith'
              className='w-full input input-bordered h-10 bg-[var(--text)] text-[var(--background)]'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-[var(--text)]'>Username</span>
            </label>
            <input
              type="text"
              placeholder='Username'
              className='w-full input input-bordered h-10 bg-[var(--text)] text-[var(--background)]'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-[var(--text)]'>Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10 bg-[var(--text)] text-[var(--background)]"
              placeholder='Enter Password'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-[var(--text)]'>Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10 bg-[var(--text)] text-[var(--background)]"
              placeholder='Confirm Password'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to="/login" className='text-sm hover:underline hover:text-[var(--primary)]  mt-2 inline-block text-[var(--text)]'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 bg-[var(--primary)] text-[var(--text)]' type='submit'
            disabled={loading}
            
            >
                {loading ? <span className='loading loading-spinner'></span>:"Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
