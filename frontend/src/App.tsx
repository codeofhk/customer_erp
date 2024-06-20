import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/login';
import Billing from './billing/billing';
import Customer from './billing/customer_print';
import Dashboard from './dashboard/dashboard';


const App: React.FC = () => {
  
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/billing' element={<Billing />} /> 
        <Route path='/customer' element={<Customer/>}/>
        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
   </div>
  );
};

export default App;