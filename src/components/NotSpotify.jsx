import React, { useEffect } from 'react';
import useSpotifyWebPlaybackSdk from 'use-spotify-web-playback-sdk';
import useSpotifyApi from 'use-spotify-api-sdk';
import { useStore } from 'mobx-utils';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import SideBar from './SideBar';
import Core from './Core';

const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

function NotSpotify() {
  const { authData } = useStore();
  const {intializeApi} = useStore().api;
  const {intializePlayback} = useStore().playback;

  // Get the Spotify API SDK and the Spotify Web Playback SDK
  const [spotifyApiSdk] = useSpotifyApi(authData);

  const [player, deviceId, isReady] = useSpotifyWebPlaybackSdk({
    playerName: "NotSpotify Player", 
    getOAuthToken: () => authData.access_token, 
  });

  useEffect(() => { 
    intializeApi(spotifyApiSdk);
    intializePlayback([player, deviceId, isReady]);
  }, [spotifyApiSdk, player, deviceId, isReady]);

  useEffect(() => {
    // Test for spotifyApiSdk
    async function fetchArtists() {
      const items = await spotifyApiSdk.search("The Beatles", ["artist"]);

      console.table(items.artists.items.map((item) => ({
          name: item.name,
          followers: item.followers.total,
          popularity: item.popularity,
      })));
    }

    async function fetchProfile() {
      const profile = await spotifyApiSdk.currentUser;
      console.log(profile);
    }

    async function fetchTopTracks() {
      const tracks = await spotifyApiSdk.currentUser.topItems("tracks");
      console.log(tracks);
    }

    if (spotifyApiSdk !== null) {
      // fetchArtists();
      // fetchProfile();
      // fetchTopTracks();
    }

  }, [spotifyApiSdk]);

  return (
    <ContainerStyled>
      <SideBar />
      <Core />
    </ContainerStyled>
  );
}

export default observer(NotSpotify);
