import { useParams } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const { errorCode } = useParams();
  return (
    <div className='errorPage'>
      <h1>{`Exited with ${errorCode}`}</h1>
      <h2>{'Oops! Something went wrong'}</h2>
    </div>
  );
};

export default ErrorPage;
