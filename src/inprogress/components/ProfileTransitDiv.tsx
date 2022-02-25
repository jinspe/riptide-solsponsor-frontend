import React from 'react';

export default function ProfileTransitDiv(): JSX.Element {
  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <a href="/" className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p
              className="text-base font-medium 
            text-neutral-700 group-hover:text-neutral-900">
              Whitney Francis
            </p>
            <p
              className="text-sm font-medium text-neutral-500 
            group-hover:text-neutral-700">
              View profile
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
