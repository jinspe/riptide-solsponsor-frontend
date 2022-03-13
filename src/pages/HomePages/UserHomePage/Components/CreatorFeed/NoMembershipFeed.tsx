import React from 'react';
import { Link } from 'react-router-dom';

export default function NoMembershipFeed(): JSX.Element {
  return (
    <div className="my-14 p-2.5">
      <div
        className="text-lg font-bold text-center
        text-primary">
        You currently sponsor no creators
      </div>

      <div className="overflow-hidden">
        <p
          className="mt-3 w-min mx-auto text-2xl font-extrabold 
          text-gradiant-accent truncate text-center">
          Explore !
        </p>
      </div>
      <div className="mx-auto mt-2 text-center">
        <Link
          to="/search?c="
          className="text-lg font-medium 
                text-link text-center mx-auto">
          Discover new creators <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
