import React from 'react';
import { Mail, Lock, Facebook, Github, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useState } from 'react';

const LogInPage = () => {
    const {loading, logIn } = useUserStore();

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const handleSubmit =async (e)=>{
        e.preventDefault();
        await logIn(email, password)
        setEmail("")
        setPassword("")
    }
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-800 border border-zinc-700 shadow-lg rounded-xl p-6 space-y-6">
        <div className="flex flex-col items-center gap-2">
          <img src="../public/vite.svg" alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-white">Log In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full flex justify-center rounded-md bg-indigo-600 text-white py-2 hover:bg-indigo-700 transition"
          >
            {loading?
                <>
                    <Loader className='mr-2 h-5 w-5 animate-spin'/>
                    Loading...
                </>
            :
            "Log In"
            }
          </button>
        </form>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-700" />
          <span className="text-sm text-gray-400">or</span>
          <div className="h-px flex-1 bg-zinc-700" />
        </div>

        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link  to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
