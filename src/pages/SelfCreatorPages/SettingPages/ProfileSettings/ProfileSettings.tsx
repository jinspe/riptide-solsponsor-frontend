import React from 'react';
import InfoSetting from './InfoSetting';
import UserNameSetting from './UserNameSetting';

export default function ProfileSettings(): JSX.Element {
  return (
    <div className="space-y-6 mt-5">
      <InfoSetting />
      <UserNameSetting />
    </div>
  );
}
