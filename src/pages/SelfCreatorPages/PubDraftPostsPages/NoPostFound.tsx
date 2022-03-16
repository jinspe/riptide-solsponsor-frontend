import React from 'react';
import { Link } from 'react-router-dom';

type TnoPostFound = {
  state: string;
};

export default function NoPostFound({ state }: TnoPostFound): JSX.Element {
  return (
    <div className="mb-5">
      <div
        className="text-lg mt-10 font-bold text-center
        text-primary">
        You currently have no {state} posts
      </div>
      <div className="mt-3 text-center">
        <Link to="/new-post" className="text-base font-medium text-link">
          Create a new post<span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
