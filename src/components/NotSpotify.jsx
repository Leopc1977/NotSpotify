import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import SideBar from "./SideBar";
import Core from "./Core";
import PlayBack from "./PlayBack";
import { useStore } from "mobx-utils";
import Header from "./Header";
import { getMyLikedTracks } from "spotify-layer";

const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const MainScreen = styled.div`
  width: 100%;
  display: flex;
  height: calc(100% - 50px - 50px);
`;

const PlayBackContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 50px;
`;

function NotSpotify() {
  const { spotifyLayer } = useStore();
  const { sideBarState, setSideBarState } = useStore().app;
  const { addLikedTracks } = useStore().api;
  useEffect(() => {
    function updateLikedTracks(tracks) {
      addLikedTracks(tracks);
    }
    async function fetchLikedTracks() {
      if (!spotifyLayer) return;
      getMyLikedTracks(spotifyLayer.api, updateLikedTracks);
    }

    fetchLikedTracks();
  }, []);

  const handleMouseMove = (e) => {
    let newSideBarState = sideBarState === "fixed" ? "fixed" : "closed";
    if (sideBarState !== "fixed" && e.clientX < window.innerWidth * 0.15) {
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
