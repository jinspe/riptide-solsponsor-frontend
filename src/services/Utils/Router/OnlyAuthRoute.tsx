/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';

import { userPublicKeyAtom } from '../Recoil/userInfo';

type TonlyAuthRoute = {
  element: JSX.Element;
  route: string;
};

export default function OnlyAuthRoute({
  element,
  route,
}: TonlyAuthRoute): JSX.Element {
  // The auth manager ensure that userPublicKeyAtom represent auth state
  const navigate = useNavigate();
  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  useEffect(() => {
    if (userPublicKey === undefined) navigate(`/login?re=${route}`);
  }, [userPublicKey]);

  return element;
}
