import { Navigate, Route, RouteProps } from 'react-router-dom';
import React from 'react';

type ElementProp = {
  element: React.ReactNode;
};

type ProtectedRoutesProps = RouteProps & ElementProp;

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={ token ? element : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoutes;