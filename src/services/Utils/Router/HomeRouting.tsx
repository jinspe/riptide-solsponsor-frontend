import React from 'react';
import { useRecoilValue } from 'recoil';

import { Navigate } from 'react-router-dom';
import { userPublicKeyAtom, userIsCreatorAtom } from '../Recoil/userInfo';

type ThomeCreatorRouting = {
  element: JSX.Element;
  userRoute: string;
};
export function HomeCreatorRouting({
  element,
  userRoute,
}: ThomeCreatorRouting): JSX.Element {
  // The auth manager ensure that userPublicKeyAtom represent auth state
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userIsCreator = useRecoilValue(userIsCreatorAtom);

  if (userPublicKey === undefined) return <Navigate to="/" />;
  if (!userIsCreator) return <Navigate to={`/${userRoute}`} />;
  return element;
}

type ThomeUserRouting = {
  element: JSX.Element;
};
export function HomeUserRouting({ element }: ThomeUserRouting): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  if (userPublicKey === undefined) {
    return <Navigate to="/" />;
  }
  return element;
}

type ThomeRootRouting = {
  element: JSX.Element;
  userRoute: string;
  creatorRoute: string;
};

export function HomeRootRouting({
  element,
  userRoute,
  creatorRoute,
}: ThomeRootRouting): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userIsCreator = useRecoilValue(userIsCreatorAtom);

  if (userPublicKey !== undefined) {
    if (userIsCreator) {
      return <Navigate to={`/${creatorRoute}`} />;
    }
    return <Navigate to={`/${userRoute}`} />;
  }
  return element;
}
