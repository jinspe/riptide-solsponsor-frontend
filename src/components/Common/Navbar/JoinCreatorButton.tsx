import React from 'react';

export default function JoinCreatorButton(): JSX.Element {
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
      bg-blue-600
      hover:bg-blue-500
      dark:bg-blue-300
      border
      border-blue-500
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
      text-white 
      dark:text-neutral-800 
      dark:hover:bg-blue-400">
      Create
    </button>
  );
}
