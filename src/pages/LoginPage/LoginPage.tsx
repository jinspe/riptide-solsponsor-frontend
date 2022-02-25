import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { userPublicKeyAtom } from 'services/Utils/Recoil/userInfo';

/*
Make it
*/

export default function LoginPage(): JSX.Element {
  const [searchParams] = useSearchParams({});
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('/');

  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  useEffect(() => {
    const param = searchParams.get('re');
    switch (param) {
      case null:
        setMessage('Welcome!');
        setRedirect('/');
        break;
      case 'become-creator':
        setMessage(
          'Thank you for joining us! Great to have you onboard. ' +
            'The first step is to signin.'
        );
        setRedirect(`/${param}`);
        break;
      default:
        setMessage('You need to be logged in to access this page');
        setRedirect(`/${param}`);
    }

    if (userPublicKey !== undefined) {
      navigate(redirect);
    }
  }, [searchParams]);

  useEffect(() => {
    if (userPublicKey !== undefined) {
      navigate(redirect);
    }
  }, [userPublicKey]);

  return (
    <div className="pageFrame">
      <p>Login page</p>
      <p> {message}</p>
      <button type="button" onClick={() => console.log(message, redirect)}>
        console
      </button>
    </div>
  );
}
