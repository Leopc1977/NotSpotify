import React, { useEffect } from 'react';
// import useSpotifyWebPlaybackSdk  from '../hooks/useSpotifyWebPlaybackSdk';
import useSpotifyWebPlaybackSdk from 'use-spotify-web-playback-sdk';

function Spotify(props) {
  const { accessToken } = props;

  const {
    player,
    deviceId,
    isReady,
  } = useSpotifyWebPlaybackSdk({
    name: "NotSpotify Player", 
    getOAuthToken: () => accessToken, 
    onPlayerStateChanged: (playerState) => {
      console.log('player state changed:', playerState);
    }
  });

  return (
    <div>
      <p>Spotify</p>
    </div>
  );
}

export default Spotify;
