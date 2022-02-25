import React from 'react';
import { useRecoilValue } from 'recoil';
import { userIsCreatorAtom } from 'services/Utils/Recoil/userInfo';

import CreatorApp from 'components/AppContainers/CreatorApp';
import UserApp from 'components/AppContainers/UserApp';

export default function AppSwitcher(): JSX.Element {
  const userIsCreator = useRecoilValue(userIsCreatorAtom);
  return userIsCreator ? <CreatorApp /> : <UserApp />;
}
