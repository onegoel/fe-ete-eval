import '../LoginPage/LoginPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../../constants/authEndPoints';
import makeRequest from '../../utils/makeRequest';
import { LOGIN_ROUTE } from '../../constants/routes';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const [error, setError] = useState('');
  //   const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    makeRequest(REGISTER_USER(email, password))
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        navigate(LOGIN_ROUTE);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='loginPageContainer'>
      <div className='loginPageImageContainer'>
        <div className='welcomeText'>
          <h1>{"Design API's fast"},</h1>
          <h1>{'Manage content easily'}.</h1>
        </div>
        <span className='circle'></span>
        <img
          src={require('../../assets/undraw-upload-re-pasx_2023-03-09/undraw-upload-re-pasx.png')}
          alt='login'
        />
      </div>
      <div className='loginFormContainer'>
        <h1>{'Login to your CMS+ account'}</h1>
        <form className='loginForm' onSubmit={handleSubmit}>
          <div className='loginInput'>
            <label htmlFor='email'>{'Email'}</label>
            <input type='email' name='email' id='email' onChange={handleEmailChange} />
          </div>
          <div className='loginInput'>
            <label htmlFor='password'>{'Password'}</label>
            <input type='password' name='password' id='password' onChange={handlePasswordChange} />
          </div>
          <button type='submit'>{'Register'}</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
