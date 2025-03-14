import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SECONDARY_BACKGROUND_COLOR } from "../config/config";

const PlayBackStyled = styled.div`
  color: white;
  overscroll-behavior-y: contain;
  height: 50px;
  background-color: ${SECONDARY_BACKGROUND_COLOR};
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Player = styled.div`
  width: 50%;
  height: 100%;
`;

const PlayingTrackContainer = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  align-items: center;

  margin: 5px;
  gap: 10px;
`;

const PlayingTrack = styled.div`
  width: 100%;
  height: fit-content;

  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid white;
`;

const Controls = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 3px;
`;

function PlayBack() {
  const { spotifyLayer } = useStore();
  const { state } = useStore().api;

  /*
    Premiere condition quand le lecteur est l'application
    Deuxieme condition quand le lecteur est externe (?)
  */
  const currentTrack = state?.track_window?.current_track?.name
    ? `${state.track_window.current_track.name} - ${state.track_window.current_track.artists[0].name}`
    : state?.item?.name
      ? `${state.item.name} - ${state.item.artists[0].name}`
      : "No track playing";

  const currentTrackImageUri = state?.track_window?.current_track?.name
    ? state?.track_window?.current_track?.album?.images[0].url
    : state?.item?.album?.images[0].url;

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
          <PlayingTrackContainer>
            {currentTrackImageUri && <Image src={currentTrackImageUri} />}
            <PlayingTrack>{currentTrack}</PlayingTrack>
          </PlayingTrackContainer>
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
