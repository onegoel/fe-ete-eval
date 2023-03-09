import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { HOME_ROUTE, LOGIN_ROUTE } from './constants/routes';
import { AuthContext } from './contexts/AuthContext';
import { HomePage, LoginPage } from './pages';

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  return (
    <div className='App'>
      <AuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
        <BrowserRouter>
          <Routes>
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
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
