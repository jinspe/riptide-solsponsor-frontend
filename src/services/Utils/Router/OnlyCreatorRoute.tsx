/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { useNavigate, useLocation } from 'react-router-dom';

import { userPublicKeyAtom, userIsCreatorAtom } from '../Recoil/userInfo';

type TonlyAuthRoute = {
  element: JSX.Element;
};

export default function OnlyCreatorRoute({
  element,
}: TonlyAuthRoute): JSX.Element {
  // The auth manager ensure that userPublicKeyAtom represent auth state
  const navigate = useNavigate();
  const location = useLocation();
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userIsCreator = useRecoilValue(userIsCreatorAtom);

  useEffect(() => {
    if (userPublicKey === undefined)
      navigate(`/login?re=${location.pathname.substring(1)}`);
    else if (!userIsCreator) navigate('/');
  }, [userPublicKey, userIsCreator]);

  return element;
}
