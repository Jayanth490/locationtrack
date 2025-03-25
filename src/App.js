import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/RegisterForm';
import LocationFilter from './components/LocationFilter';
import MyMap from './components/MyMap';
function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <RegisterForm />
      <LocationFilter />
      <MyMap/>
    </div>
  );
}

export default App;
