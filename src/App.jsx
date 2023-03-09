import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HOME_ROUTE, LOGIN_ROUTE } from './constants/routes';
import { HomePage, LoginPage } from './pages';

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false); //eslint-disable-line
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          {isUserAuthenticated ? (
            <Route path={HOME_ROUTE} element={<HomePage />} />
          ) : (
            <Route
              path={LOGIN_ROUTE}
              element={
                <LoginPage
                  isUserAuthenticated={isUserAuthenticated}
                  setIsUserAuthenticated={setIsUserAuthenticated}
                />
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
