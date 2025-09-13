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
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto animate-fade-in-up'>
            <div className='w-full p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-green-500/20 shadow-2xl shadow-green-500/20'>
                <h1 className='text-5xl font-bold text-center mb-8'>
                    <span className='text-white'>Login to</span>
                    <span className='ml-3 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent'>
                        CS Chat
                    </span>
                </h1>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                            Username
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter your username' 
                            className='w-full h-12 rounded-lg px-4 text-white placeholder-green-300 bg-green-500/5 backdrop-blur-sm border border-green-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="w-full h-12 rounded-lg px-4 text-white placeholder-green-300 bg-green-500/5 backdrop-blur-sm border border-green-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to="/signup" className='text-sm hover:underline hover:text-green-400 mt-2 inline-block text-gray-300 transition-colors duration-300'>
                        {"Don't"} have an account? <span className='bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent'>
                          Sign up
                        </span>
                    </Link>

                    <div>
                        <button 
                            className='w-full h-12 text-lg font-semibold text-white rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-green-500 to-teal-500 shadow-lg shadow-green-500/30'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='flex justify-center'>
                                    <div className='w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
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
