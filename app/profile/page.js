import React, { Suspense } from 'react';
import ProfileClient from './profileclient';

const ProfilePage = () => {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ProfileClient />
    </Suspense>
  );
};

export default ProfilePage;
