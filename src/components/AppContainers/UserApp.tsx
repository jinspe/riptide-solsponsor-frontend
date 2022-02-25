import React from 'react';
import UserNavbar from 'components/Common/Navbar/UserNavbar';
import SinginsFunc from 'inprogress/util/SinginsFunc';

import AppRoutes from './AppRoutes';

export default function UserApp(): JSX.Element {
  return (
    <div>
      <UserNavbar />
      <SinginsFunc />
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}
