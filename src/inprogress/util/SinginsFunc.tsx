import React from 'react';
import { useRecoilState } from 'recoil';
import {
  userPublicKeyAtom,
  userProfileImageAtom,
  userDisplayNameAtom,
} from 'services/Recoil/userInfo';

const buttonClass =
  'inline-flex items-center px-2.5 py-1.5' +
  'border border-transparent text-xs font-medium rounded ' +
  'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 ' +
  'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
  'focus:ring-indigo-500';

export default function SinginsFunc(): JSX.Element {
  const [userPublicKey, setUserPubKey] = useRecoilState(userPublicKeyAtom);
  const [userProfileImage, setUserProfileImage] =
    useRecoilState(userProfileImageAtom);
  const [userDisplayName, setUserDisplayName] =
    useRecoilState(userDisplayNameAtom);

  return (
    <div className="max-w-5xl mx-auto">
      <button
        type="button"
        className={buttonClass}
        onClick={() => {
          setUserProfileImage(
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          );
          setUserPubKey('Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv');
          setUserDisplayName('jin');
        }}>
        Signin as user
      </button>
      <button
        type="button"
        className={buttonClass}
        onClick={() => setUserPubKey(undefined)}>
        Signout
      </button>
    </div>
  );
}
