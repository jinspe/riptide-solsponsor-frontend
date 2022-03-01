import React from 'react';
import { Link } from 'react-router-dom';

import { LogoSmall } from 'components/Common/Util/LogoText';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="min-h-full pt-16 pb-12 flex flex-col ">
      <main
        className="flex-grow flex flex-col 
      justify-center 
      max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <Link to="/" className="inline-flex">
            <div className=" transform scale-250 ">
              <LogoSmall />
            </div>
          </Link>
        </div>
        <div className="pb-16 pt-14">
          <div className="text-center">
            <p
              className="text-base font-semibold 
            text-cyan-600 uppercase tracking-wide">
              404 error
            </p>
            <h1
              className="mt-2 text-4xl font-extrabold 
              text-neutral-900 dark:text-neutral-100
            tracking-tight sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-neutral-500">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="text-base font-medium 
                text-cyan-600 hover:text-cyan-500">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
