import { useEffect, useState } from "react";
import { useStore } from "mobx-utils";
import NotSpotify from "./components/NotSpotify";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import SpotifyLayer, {
  authenticateOAuth,
  fetchToken,
  getMyLikedTracks,
} from "spotify-layer";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

function AppSpotify() {
  const { spotifyLayer, setSpotifyLayer } = useStore();
  const { setIsReady, isReady } = useStore().app;
  const { setState } = useStore().api;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    async function getData() {
      if (params.has("code")) {
        fetchToken(params.get("code"), {
          redirectUri: import.meta.env.VITE_REDIRECT_URI,
          clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
        });
      }
    }
    async function getToken() {
      if (params.has("access_token")) {
        const newSpotifyLayer = new SpotifyLayer({
          playerName: "NotSpotify Player",
          accessToken: params.get("access_token"),
          refreshToken: params.get("refresh_token"),
          tokenType: params.get("token_type"),
          expiresIn: params.get("expires_in"),
          scope: params.get("scope"),
          clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
          onReady: () => {
            setIsReady(true);
          },
          onPlayerStateChanged: (state) => {
            setState(state);
          },
        });
        setSpotifyLayer(newSpotifyLayer);
        const newState = await newSpotifyLayer.api.player.getPlaybackState();
        setState(newState);

        console.log("newState", newState);
      }
    }

    getData();
    getToken();
  }, []);

  const handleLogin = () => {
    authenticateOAuth({
      clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      redirectUri: import.meta.env.VITE_REDIRECT_URI,
    });
  };

  return (
    <Container>
      {isReady ? (
        <NotSpotify />
      ) : (
        <>
          <p>Not connected</p>
          <button onClick={handleLogin}>Connect to NotSpotify</button>
        </>
      )}
    </Container>
  );
}

export default observer(AppSpotify);
