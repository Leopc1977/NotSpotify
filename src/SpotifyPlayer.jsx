import React, { useEffect, useRef, useState } from 'react';
import { Scopes, SpotifyApi } from '@spotify/web-api-ts-sdk';
import useSpotify from './hooks/useSpotify';

const SpotifyPlayer = () => {
  // const sdk = useSpotify(
  //   import.meta.env.VITE_SPOTIFY_CLIENT_ID, 
  //   import.meta.env.VITE_REDIRECT_TARGET, 
  //   Scopes.userDetails
  // );
  // const sdk = SpotifyApi.withUserAuthorization(import.meta.env.VITE_SPOTIFY_CLIENT_ID,  import.meta.env.VITE_REDIRECT_TARGET, Scopes.userDetails);

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');
    if (token)  setAccessToken(token);
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Test 3',
        volume: 0.5,
        getOAuthToken: cb => { cb(accessToken); }
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });

      document.getElementById('togglePlay').onclick = function() {
        player.togglePlay();
      };

      player.connect();
    };
  }, [accessToken]);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/login';
  };

  return accessToken
    ? (<div><h1>Spotify Web Playback SDK Quick Start</h1> 
      <p>Connected!</p>
      <p>Access Token: {accessToken}</p>
      <button id="togglePlay">Toggle Play</button>
    </div>)
    : (<div>
      <h1>Spotify Web Playback SDK Quick Start</h1>
      <p>Connecting...</p>
      <a href={
        `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_TARGET}&scope=user-read-playback-state%20user-modify-playback-state&response_type=token&show_dialog=true`
      }>Connect to Spotify</a>
      <button onClick={handleLogin}
      >
        Connect to Spotify2
      </button>
    </div>);

}

export default SpotifyPlayer;
