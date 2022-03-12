import React from 'react';
import { Link } from 'react-router-dom';

export default function PostNotFoundPage(): JSX.Element {
  return (
    <div className="text-center pb-16 pt-14">
      <h1
        className="mt-2 text-2xl font-extrabold 
              text-neutral-900 dark:text-neutral-100
            tracking-tight sm:text-5xl">
        Post not found.
      </h1>
      <p className="mt-2 text-lg text-neutral-500">
        Sorry, this post doesn&apos;t exist or was deleted.
      </p>

      <div>
        <div className="mt-3 text-center">
          <Link
            to="/drafts"
            className="text-base font-medium 
                text-cyan-600 hover:text-cyan-500">
            Go back to your draft posts
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
