import React from 'react';
import { Link } from 'react-router-dom';

import landingHeader from 'style/Assets/LandingPage/landingHeader.png';

export default function HeroSection(): JSX.Element {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2 " />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src={landingHeader}
              alt="landingHeader"
            />
            <div
              className="absolute inset-0 
              bg-gradient-to-br from-cyan-400 to-indigo-800 mix-blend-multiply"
            />
          </div>
          <div
            className="relative px-4 py-16 sm:px-6 
          sm:py-24 lg:py-32 lg:px-8">
            <h1
              className="text-center text-4xl 
            font-extrabold 
            tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">A better way to monetize</span>
              <span className="block text-cyan-200">media content</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-center text-xl text-cyan-200 sm:max-w-3xl">
              Built on Solana, you can let your fans become your sponsors by
              offering them memberships. In exchange you give them access to
              exclusive content.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div
                className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid
               sm:grid-cols-2 sm:gap-5">
                <Link
                  to="/login"
                  className="flex items-center justify-center 
                  px-2 py-3 border border-transparent text-base 
                  font-medium rounded-md shadow-sm text-cyan-700 
                  bg-white hover:bg-indigo-50 sm:px-4">
                  Get Started
                </Link>
                <Link
                  to="/login?re=become-creator"
                  className="flex items-center justify-center
                   px-2 py-3 border border-transparent text-base 
                   font-medium rounded-md shadow-sm text-white 
                   bg-cyan-600 bg-opacity-60 hover:bg-opacity-70 
                   sm:px-4">
                  Become A Creator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
