import React from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import {
  userPublicKeyAtom,
  userProfileImageAtom,
  userDisplayNameAtom,
  userIsCreatorAtom,
} from 'services/Utils/Recoil/userInfo';

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
  const [userIsCreator, setUserIsCreator] = useRecoilState(userIsCreatorAtom);

  return (
    <div className="max-w-5xl mx-auto pageFrame">
      <button
        type="button"
        className={buttonClass}
        onClick={() => {
          setUserProfileImage(
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          );
          setUserDisplayName('jin');
          setUserIsCreator(false);
          setUserPubKey('Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv');
        }}>
        Signin as user
      </button>
      <button
        type="button"
        className={buttonClass}
        onClick={() => {
          setUserProfileImage(
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          );
          setUserDisplayName('jin');
          setUserIsCreator(true);
          setUserPubKey('Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv');
        }}>
        Signin as creator
      </button>
      <button
        type="button"
        className={buttonClass}
        onClick={() => {
          setUserIsCreator(false);
          setUserPubKey(undefined);
        }}>
        Signout
      </button>
      <button type="button" className={buttonClass}>
        <Link to="/caca">go caca</Link>
      </button>
    </div>
  );
}
