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
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-2xl bg-[var(--background)] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-[var(--text)]'>
                    Login
                    <span className='text-[var(--primary)]'> CS</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-[var(--text)]'>Username</span>
                        </label>
                        <input type="text" placeholder='Username' className='w-full input input-bordered h-10 bg-[var(--text)] text-[var(--background)]' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-[var(--text)]'>Password</span>
                        </label>
                        <input type="password" className="w-full input input-bordered h-10 bg-[var(--text)] text-[var(--background)]" placeholder='password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to="/signup" className='text-sm hover:underline hover:text-[var(--primary)] mt-2 inline-block text-[var(--text)]'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 bg-[var(--primary)] text-[var(--text)]'
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
