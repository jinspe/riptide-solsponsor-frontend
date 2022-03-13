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
      px-4
      button-action
      focus:outline-none 
      hover:ring-2
      hover:ring-inset
      text-white 
      ">
        Become A Creator
      </button>
    </Link>
  );
}
