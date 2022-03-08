import React from 'react';

import DashBoard from 'components/Creators/DashBoard/DashBoard';
import SinginsFunc from 'inprogress/util/SinginsFunc';

import AppRoutes from './AppRoutes';

export default function CreatorApp(): JSX.Element {
  return (
    <div>
      <DashBoard>
        <main>
          {/*  <SinginsFunc /> */}
          <AppRoutes />
        </main>
      </DashBoard>
    </div>
  );
}
