import React from 'react';

export default function LoginButton(): JSX.Element {
  return (
    <button
      type="button"
      className="rounded-3xl 
      h-8
      text-sm
      flex 
      items-center
      font-bold
      pb-0.5
      px-4
      border
      bg-white
      hover:bg-blue-50
      dark:bg-neutral-800
      border
      border-blue-600
      dark:border-neutral-600
      focus:outline-none 
      hover:ring-2
      hover:ring-inset
      hover:ring-cyan-500
      hover:ring-opacity-30
      focus:ring-2
      focus:ring-inset  
      focus:ring-cyan-500
      focus:ring-opacity-100
      text-blue-600 
      dark:text-neutral-400 
      dark:hover:text-neutral-200">
      Log In
    </button>
  );
}
