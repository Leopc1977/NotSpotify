import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SECONDARY_BACKGROUND_COLOR } from "../config/config";

const PlayBackStyled = styled.div`
  color: white;
  overscroll-behavior-y: contain;
  height: 50px;
  background-color: ${SECONDARY_BACKGROUND_COLOR};
`;

const Content = styled.div`
  display: flex;
  justifycontent: space-between;
`;

const Player = styled.div`
  width: 50%;
  height: 100%;
  justifycontent: center;
`;

const PlayingTrack = styled.div`
  display: flex;
  justifycontent: center;
  alignitems: center;
  height: 100%;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid white;
`;

const Controls = styled.div`
  display: flex;
  justifycontent: space-between;
  width: 50%;
  height: 100%;
`;

function PlayBack() {
  const { spotifyLayer } = useStore();
  const { state } = useStore().api;

  const currentTrack = state?.track_window?.current_track?.name
    ? `${state.track_window.current_track.name} - ${state.track_window.current_track.artists[0].name}`
    : state?.item?.name
      ? `${state.item.name} - ${state.item.artists[0].name}`
      : "No track playing";

  const handleClickOnPrevious = () => {
    spotifyLayer.player.previousTrack();
  };

  const handleClickOnPlay = () => {
    spotifyLayer.player.togglePlay();
  };

  const handleClickOnNext = () => {
    spotifyLayer.player.nextTrack();
  };

  return (
    <PlayBackStyled>
      <Content>
        <Player>
          <PlayingTrack>{currentTrack}</PlayingTrack>
        </Player>
        <Controls>
          <Button onClick={handleClickOnPrevious}>Previous</Button>
          <Button onClick={handleClickOnPlay}>Play</Button>
          <Button onClick={handleClickOnNext}>Next</Button>
        </Controls>
      </Content>
    </PlayBackStyled>
  );
}

export default observer(PlayBack);
