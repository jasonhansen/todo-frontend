import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent() {
  const { username } = useParams();

  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    console.log('called');

    retrieveHelloWorldPathVariable('Jason', authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('cleanup'));
  }

  function successfulResponse(response) {
    console.log(response);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="Welcome">
      <h1>Welcome {username}</h1>
      <div>
        Your Todos List - <Link to="/todos">Go Here </Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi()}>
          Call Hello World{' '}
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}
