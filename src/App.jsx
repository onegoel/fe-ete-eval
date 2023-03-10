import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, ERROR_ROUTE } from './constants/routes';
import { AuthContext } from './contexts/AuthContext';
import { HomePage, LoginPage, RegisterPage, ErrorPage } from './pages';

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  return (
    <div className='App'>
      <AuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
        <BrowserRouter>
          <Routes>
            <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
            <Route path={LOGIN_ROUTE} element={<LoginPage />} />
            {/* <ProtectedRoute path={HOME_ROUTE} element={<HomePage />} /> */}
            <Route
              path={HOME_ROUTE}
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path={ERROR_ROUTE(':statusCode')} element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
