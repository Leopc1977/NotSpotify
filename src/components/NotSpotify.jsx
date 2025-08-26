import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import SideBar from "./SideBar";
import Core from "./Core";
import PlayBack from "./PlayBack";
import { useStore } from "mobx-utils";
import Header from "./Header";
import { getMyLikedTracks } from "spotify-layer";
import {
  PLAYBACK_HEIGHT,
  PRIMARY_BACKGROUND_COLOR,
} from "../config/config";

const ContainerStyled = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${PRIMARY_BACKGROUND_COLOR};
  overscroll-behavior: none; /* Apply both x and y */
`;

const MainScreen = styled.div`
  width: 100%;
  background-color: #0f
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayBackContainer = styled.div`
  position: fixed;
  width: 100%;
  height: ${PLAYBACK_HEIGHT}px;
  border-top: 1px solid white;
  bottom: 0;
`;

function NotSpotify() {
  const { spotifyLayer } = useStore();
  const { sideBarState, setSideBarState } = useStore().app;
  const { addLikedTracks } = useStore().api;

  useEffect(() => {
    async function fetchLikedTracks() {
      if (!spotifyLayer) return;
      const tracks = await getMyLikedTracks(spotifyLayer.api);
      addLikedTracks(tracks);
    }

    fetchLikedTracks();
  }, [spotifyLayer, addLikedTracks]);

  const handleMouseMove = (e) => {
    let newSideBarState = sideBarState === "fixed" ? "fixed" : "closed";
    if (sideBarState !== "fixed" && e.clientX < window.innerWidth * 0.05) {
      newSideBarState = "floating";
    }
    setSideBarState(newSideBarState);
  };

  return (
    <ContainerStyled onMouseMove={handleMouseMove}>
      <Header />
      <MainScreen>
        <SideBar />
        <Core />
      </MainScreen>
      <PlayBackContainer>
        <PlayBack />
      </PlayBackContainer>
    </ContainerStyled>
  );
}

export default observer(NotSpotify);
