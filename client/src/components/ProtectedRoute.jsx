import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({children}) => {
  const {user} = useContext(AuthContext);

  return user ? children : <Navigate to={"/login"}/>;
}

export const ProtectedAdminRoute = ({children}) => {
  const {user} = useContext(AuthContext);

  return user?.isAdmin ? children : <Navigate to={"/login"}/>;
}