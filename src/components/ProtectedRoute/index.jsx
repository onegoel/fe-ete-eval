import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../constants/routes';
import propTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isUserAuthenticated, setIsUserAuthenticated } = useContext(AuthContext);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('token');
    console.log(userToken);
    if (userToken === null || userToken === undefined) {
      //   setIsLoggedIn(false);
      setIsUserAuthenticated(false);
      return navigate(LOGIN_ROUTE);
    }
    // setIsLoggedIn(true);
    setIsUserAuthenticated(true);
    navigate(HOME_ROUTE);
  };
  useEffect(() => {
    checkUserToken();
  }, [isUserAuthenticated]);
  return <React.Fragment>{isUserAuthenticated ? props.children : null}</React.Fragment>;
};

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProtectedRoute;
