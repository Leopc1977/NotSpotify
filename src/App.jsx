import { useEffect, useState } from 'react';
import Spotify from './components/Spotify';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setToken(params.get('access_token'));
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/login';
  };

  return (
      <div>
        {token !== null && token !== undefined ? (
          <Spotify 
            token={token}
            clientId={import.meta.env.VITE_SPOTIFY_CLIENT_ID}
            clientSecret={import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}
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
