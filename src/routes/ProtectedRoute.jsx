import React, { use } from 'react'
import { AuthContext } from '../context/AuthProvider'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';

export default function ProtectedRoute({children}) {
  const{user,loading} = use(AuthContext);
  if(loading){
    return <LoadingSpinner /> ;
  }
  return user ? children : <Navigate to="/" replace />;
}
