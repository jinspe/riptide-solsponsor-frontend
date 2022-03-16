import React from 'react';
import { useRecoilValue } from 'recoil';

import { userIsCreatorAtom } from 'services/Utils/Recoil/userInfo';
import { loadingAppAtom } from 'services/Utils/Recoil/appState';
import Spinner from 'components/Common/Util/Spinner';
import CreatorApp from 'components/AppContainers/CreatorApp';
import UserApp from 'components/AppContainers/UserApp';

export default function AppSwitcher(): JSX.Element {
  const userIsCreator = useRecoilValue(userIsCreatorAtom);
  const loadingApp = useRecoilValue(loadingAppAtom);
  /* eslint-disable no-nested-ternary */
  return loadingApp ? (
    <div className="w-screen h-full overflow-hidden ">
      <Spinner classExtend="h-28 w-28 mt-24 spinner-color m-auto" />
    </div>
  ) : userIsCreator ? (
    <CreatorApp />
  ) : (
    <UserApp />
  );
}
