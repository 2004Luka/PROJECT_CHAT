import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className='min-h-screen w-full px-4 sm:px-6 flex items-center justify-center bg-[#1E1E1E] relative overflow-hidden'>
            {/* Primary Card - High-contrast dark mode */}
            <div className='w-full max-w-md p-8 sm:p-10 bg-[#111111] border border-[#333333] flex flex-col justify-center relative z-10'>
                <div className='text-center mb-8 sm:mb-10'>
                    <h1 className='text-3xl sm:text-4xl font-bold text-[#FFFFFF] mb-2 leading-tight tracking-tight font-mono'>
                        <span className='text-[#00FF99]'>Login to</span>
                        <span className='ml-2 sm:ml-3 text-[#FFFFFF]'>
                            CS Chat
                        </span>
                    </h1>
                    <p className='text-sm sm:text-base text-[#999999] mt-3 leading-relaxed font-mono'>Welcome back! Please sign in to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        {/* Label with monospace for technical aesthetic */}
                        <label className='block text-sm font-semibold text-[#CCCCCC] mb-2 font-mono'>
                            Username
                        </label>
                        {/* Input - High-contrast design */}
                        <input 
                            type="text" 
                            placeholder='Enter your username' 
                            className='w-full h-12 px-4 text-[#FFFFFF] placeholder-[#666666] bg-[#1E1E1E] border border-[#333333] focus:outline-none focus:border-[#00FF99] transition-colors duration-200 text-base font-mono'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-[#CCCCCC] mb-2 font-mono'>
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="w-full h-12 px-4 text-[#FFFFFF] placeholder-[#666666] bg-[#1E1E1E] border border-[#333333] focus:outline-none focus:border-[#00FF99] transition-colors duration-200 text-base font-mono" 
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Divider line */}
                    <div className='border-t border-[#333333] pt-1'>
                        <Link to="/signup" className='text-sm text-[#999999] hover:text-[#00FF99] transition-colors duration-200 inline-block font-mono'>
                            {"Don't"} have an account? <span className='text-[#00FF99] font-semibold hover:text-[#00E689]'>
                              Sign up
                            </span>
                        </Link>
                    </div>

                    <div className='pt-2'>
                        {/* Button - Neon Green accent */}
                        <button 
                            className='w-full h-12 text-base font-semibold text-[#1E1E1E] bg-[#00FF99] hover:bg-[#00E689] border border-[#00FF99] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-mono'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='flex justify-center items-center'>
                                    <div className='w-5 h-5 border-2 border-[#1E1E1E]/30 border-t-[#1E1E1E] rounded-full animate-spin'></div>
                                </div>
                            ) : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
