import React from 'react';

import UserNavbar from 'components/Common/Navbar/UserNavbar';
import AppRoutes from './AppRoutes';

export default function UserApp(): JSX.Element {
  return (
    <div>
      <UserNavbar />
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}
