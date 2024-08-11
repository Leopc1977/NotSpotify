import { useEffect, useState } from "react";
import { useStore } from "mobx-utils";
import NotSpotify from "./components/NotSpotify";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import SpotifyLayer, { authenticateOAuth, fetchToken } from "spotify-layer";

const Container = styled.div`
  margin: 0;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  overflow: auto;
  overscroll-behavior-y: none;
`;

const NotConnectedContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
  color: white;
`;

function AppSpotify() {
  const { setSpotifyLayer } = useStore();
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
        <NotConnectedContainerStyled>
          <h1>NotSpotify</h1>
          <img src="./logImage.webp" alt="logo" />
          <button onClick={handleLogin}>Log to NotSpotify</button>
        </NotConnectedContainerStyled>
      )}
    </Container>
  );
}

export default observer(AppSpotify);
