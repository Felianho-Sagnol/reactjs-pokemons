// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import AuthentificationService from './services/authentification-service';
  
// const PrivateRoute = ({ component: Component, ...rest }: any) => (
//   <Route {...rest} render={(props:any) => {
//     const isAuthenticated = AuthentificationService.isAuthenticated;
//     if (!isAuthenticated) {    
//       return <Navigate  to={{ pathname: '/login' }} />
//     }
  
//     return <Component {...props} />
//   }} />
// );
  
// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthenticationService from './services/authentication-service';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = AuthenticationService.isAuthenticated;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;