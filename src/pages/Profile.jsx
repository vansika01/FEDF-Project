import React from 'react';
import CrewProfileCard from '../components/profile/CrewProfileCard';

const Profile = () => {
  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
      </div>
      <CrewProfileCard />
    </div>
  );
};

export default Profile;
