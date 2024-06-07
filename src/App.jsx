import { useEffect, useState } from 'react';
import Spotify from './components/Spotify';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');

    setAccessToken(token);
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/login';
  };

  return (
      <div>
        {accessToken !== null && accessToken !== undefined ? (
          <Spotify 
            accessToken={accessToken}
          />
        ) : (
          <>
            <p>Not connected</p>
            <button 
              onClick={handleLogin}
            >
              Connect to Spotify
            </button>
          </>
        )}

      </div>
  );
};

export default App;
