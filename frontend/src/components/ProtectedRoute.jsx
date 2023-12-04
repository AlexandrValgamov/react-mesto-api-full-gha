import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
  )
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.elementType,
  loggedIn: PropTypes.bool,
};

export default ProtectedRouteElement;
