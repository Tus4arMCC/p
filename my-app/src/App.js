import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation  } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Nav from './components/temperopynav.tsx';
import BranchForm from './pages/Branch/CreateBranch.tsx';
import DisplayBranch from './pages/Branch/DisplayBranch.tsx';
import CountryForm from './pages/Country/CreateCountry.tsx';
import DisplayCountry from './pages/Country/DisplayCountry.tsx';
import StateForm from './pages/State/CreateState.tsx';

import DisplayState from './pages/State/DisplayState.tsx'
import CityForm from './pages/City/CreateCity.tsx';
import Displaycity from './pages/City/DisplayCity.tsx';
import DistrictForm from './pages/District/CreateDistrict.tsx';
import DisplayDistrict from './pages/District/DisplayDistrict.tsx'
import EmployeeForm from './pages/Employee/CreateEmployee.tsx';  
import EmployeeList from './pages/Employee/DisplayEmployee.tsx'; // Assuming this is the correct path for EmployeeList
// import menuData from './utilits/menu';
// import  HeaderNav  from './components/HeaderNav';

function App() {
  const location = useLocation();

  // Show Nav bar on all pages except at "/"
  const hideNavOnPaths = ['/']; // routes where Nav should be hidden
  const showNav = !hideNavOnPaths.includes(location.pathname);

  return (
    <div className="App">
      {/* <h1 className="text-center my-4">Branch Management System</h1> */}
      {/* <HeaderNav menuItems={menuData} /> */}
      {showNav && <Nav />}
      <ToastContainer/>

      <Routes>
        <Route path="/"               element={<Login />} />
        <Route path="/home"           element={<Home />} />
        <Route path="/branch"         element={<BranchForm />} />
        <Route path="/branch-view"    element={<DisplayBranch />} />
        <Route path="/country"        element={<CountryForm />} />
        <Route path="/country-view"   element={<DisplayCountry />} />
        <Route path="/state"          element={<StateForm />} />
        <Route path="/state-view"     element={<DisplayState />} />
        <Route path="/city"           element={<CityForm />} />
        <Route path="/city-view"      element={<Displaycity />} />
        <Route path="/district"       element={<DistrictForm />} />
        <Route path="/district-view"  element={<DisplayDistrict />} />
        <Route path="/employee"       element={<EmployeeForm />} />
        <Route path="/employee-view"  element={<EmployeeList />} />
        
        {/* Add more routes as needed */}
        <Route
          path="/"
          element={<h3 className="text-center">Welcome to the Branch Management System</h3>}
        />
      </Routes>
      
    </div>
  );
}

export default App;
