import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector(state => state.user)

  if (!user) {
    return <Navigate to={'/'}></Navigate>
  }

  return children
};

export default PrivateRoute;
