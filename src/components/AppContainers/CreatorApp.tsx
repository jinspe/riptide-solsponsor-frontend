import React from 'react';

import DashBoard from 'components/Creators/DashBoard/DashBoard';
import AppRoutes from './AppRoutes';

export default function CreatorApp(): JSX.Element {
  return (
    <div>
      <DashBoard>
        <main>
          <AppRoutes />
        </main>
      </DashBoard>
    </div>
  );
}
