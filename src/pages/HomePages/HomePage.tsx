import React from 'react';
import DarkModeSwitch from 'components/Common/DarkModeSwitch';

import InProgressApp from 'inprogress/InProgressApp';

export default function HomePage(): JSX.Element {
  return (
    <div>
      <p className="text-red-500 dark:text-blue-500">Homepage</p>
      <p className="text-ltext-title dark:text-dtext-title">
        Text test for colors title
      </p>
      <p className="text-ltext-high dark:text-dtext-high">
        Text test for colors high
      </p>
      <p className="text-ltext-med dark:text-dtext-med">
        Text test for colors medium
      </p>
      <p className="text-ltext-low dark:text-dtext-low">
        Text test for colors low
      </p>
      <DarkModeSwitch />
      <InProgressApp />
    </div>
  );
}
