// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import { UserAuth } from './auth'

// const Protected = ({children}) => {
//   const {user} = UserAuth();
//   if(!user){
    
//     return <Navigate to='/' />
//   }  
//   return children
// }

// export default Protected

import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './auth';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const Protected = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    // toast.error('Please sign in to access this page.');
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
