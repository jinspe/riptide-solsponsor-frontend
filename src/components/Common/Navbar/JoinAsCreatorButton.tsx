import React from 'react';
import { Link } from 'react-router-dom';

export default function JoinAsCreatorButton(): JSX.Element {
  return (
    <Link to="/login?re=become-creator">
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
      bg-blue-700
      hover:bg-blue-600
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
      ">
        Become A Creator
      </button>
    </Link>
  );
}
