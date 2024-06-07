import { useCallback, useEffect, useRef, useState } from "react";

function useSpotifyWebPlaybackSdk({
  name,
  getOAuthToken,
  accountError = () => {},
  onReady = () => {},
  onPlayerStateChanged = () => {},
}) {
  const [isReady, setIsReady] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const playerRef = useRef(null);

  useEffect(() => {
    if (!window.Spotify) {
      const scriptTag = document.createElement('script');

      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
      document.body.appendChild(scriptTag);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      playerRef.current = new Spotify.Player({
        name: name,
        getOAuthToken: cb => {cb(getOAuthToken())},
        volume: 0.5,
      });

      setIsReady(true);
    };
  }, []);

  const handleReady = useCallback(({ device_id: readyDeviceId }) => {
    console.log('Ready with Device ID', readyDeviceId);
  
    setDeviceId(readyDeviceId);

    if (onReady) onReady(deviceId);
  }, [deviceId, onReady]);

  useEffect(() => {
    if (isReady) playerRef.current.connect();
  }, [isReady]);

  useEffect(() => {
    const player = playerRef.current;

    if (isReady) {
      player.addListener('account_error', accountError);
      player.addListener('ready', handleReady);
      player.addListener('initialization_error', accountError);
      player.addListener('authentication_error', accountError);
      player.addListener('not_ready', accountError);
      player.addListener('player_state_changed', onPlayerStateChanged);

      return () => {
        player.removeListener('account_error', accountError);
        player.removeListener('ready', handleReady);
        player.removeListener('player_state_changed', onPlayerStateChanged);
      };
    }

    return;
  }, [isReady, onPlayerStateChanged, accountError, handleReady]);

  return {
    player: playerRef.current,
    deviceId,
    isReady,
  };
}

export default useSpotifyWebPlaybackSdk;
