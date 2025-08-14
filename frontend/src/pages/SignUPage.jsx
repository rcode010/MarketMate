import React from 'react';
import { Mail, Lock, Facebook, Github, User, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from '../stores/useUserStore';

const SignUpPage = () => {
    const {loading,signUp }= useUserStore();
    const [formInfo, setFormInfo]= useState({
        name: "",
        email:"",
        password: "",
        confirmPassword: ""
    })
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await signUp(formInfo)
        setFormInfo({
            name: "",
            email:"",
            password: "",
            confirmPassword: ""
        })
        
    }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-800 border border-zinc-700 shadow-lg rounded-xl p-6 space-y-6">
        <div className="flex flex-col items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">Sign up</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Full name
            </label>
            <div className="relative mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formInfo.name}
                onChange={(e)=>{setFormInfo({...formInfo, name: e.target.value})}}
                className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            </div>
          </div>

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
                value={formInfo.email}
                onChange={(e)=>{setFormInfo({...formInfo, email: e.target.value})}}
                className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                value={formInfo.password}
                onChange={(e)=>{setFormInfo({...formInfo, password: e.target.value})}}
                required
                className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            </div>
          </div>
          <div>
            <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-200">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="ConfirmPassword"
                name="ConfirmPassword"
                type="password"
                value={formInfo.confirmPassword}
                onChange={(e)=>{setFormInfo({...formInfo, confirmPassword: e.target.value})}}
                required
                className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            </div>
          </div>

          

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center rounded-md bg-indigo-600 text-white py-2 hover:bg-indigo-700 transition">
                {loading?
                    <>
                        <Loader className='mr-2 h-5 w-5 animate-spin'/>{" "}
                        Loading...
                    
                    </>
                :   
                    "Sign up"
            }
          </button>
        </form>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-700" />
          <span className="text-sm text-gray-400">or</span>
          <div className="h-px flex-1 bg-zinc-700" />
        </div>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
