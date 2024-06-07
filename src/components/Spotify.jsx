import React, { useEffect } from 'react';
import useSpotifyWebPlaybackSdk from 'use-spotify-web-playback-sdk';
import useSpotifyApi from 'use-spotify-api-sdk';

function Spotify(props) {
  const { token, clientId, clientSecret } = props;

  const [spotifyApi] = useSpotifyApi(clientId, clientSecret);

  const [player, deviceId, isReady] = useSpotifyWebPlaybackSdk({
    name: "NotSpotify Player", 
    getOAuthToken: () => token, 
  });

  return (
    <div>
      <p>Spotify</p>
    </div>
  );
}

export default Spotify;
