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
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto h-full'>
            <div className='w-full p-4 sm:p-8 rounded-none sm:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 h-full sm:h-auto flex flex-col justify-center'>
                <h1 className='text-3xl sm:text-5xl font-bold text-center mb-4 sm:mb-8'>
                    <span className='text-white'>Login to</span>
                    <span className='ml-2 sm:ml-3 text-white'>
                        CS Chat
                    </span>
                </h1>

                <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                            Username
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter your username' 
                            className='w-full h-12 rounded-lg px-4 text-white placeholder-white/50 bg-white/5 backdrop-blur-sm border border-white/10 focus:outline-none focus:ring-0'
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
                            className="w-full h-12 rounded-lg px-4 text-white placeholder-white/50 bg-white/5 backdrop-blur-sm border border-white/10 focus:outline-none focus:ring-0" 
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to="/signup" className='text-sm mt-2 inline-block text-white/70'>
                        {"Don't"} have an account? <span className='text-white'>
                          Sign up
                        </span>
                    </Link>

                    <div>
                        <button 
                            className='w-full h-12 text-lg font-semibold text-white rounded-lg bg-white/10 border border-white/10'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='flex justify-center'>
                                    <div className='w-6 h-6 border-2 border-white/30 border-t-white rounded-full'></div>
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
