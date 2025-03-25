import React from 'react';
import RegisterForm from '../components/RegisterForm';
import LocationFilter from '../components/LocationFilter';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="left-section">
        <RegisterForm />
      </div>
      <div className="right-section">
        <LocationFilter />
      </div>
    </div>
  );
};

export default HomePage;
