import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PlayBackStyled = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  border-top: 2px solid white;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Player = styled.div``;

const Button = styled.button`
  background-color: black;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;

function PlayBack() {
  const { spotifyLayer } = useStore();
  const { state } = useStore().api;

  return (
    <PlayBackStyled>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "50%",
          }}
        >
          <p>
            {state?.track_window?.current_track?.name
              ? `${state.track_window.current_track.name} - ${state.track_window.current_track.artists[0].name}`
              : state?.item?.name
                ? `${state.item.name} - ${state.item.artists[0].name}`
                : "No track playing"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <div>
            <Button
              onClick={() => {
                spotifyLayer.player.previousTrack();
              }}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                spotifyLayer.player.togglePlay();
              }}
            >
              Play
            </Button>
            <Button
              onClick={() => {
                spotifyLayer.player.nextTrack();
              }}
            >
              Next
            </Button>
          </div>
        </div>
        <div>
          <div>
            <p></p>
          </div>
        </div>
      </div>
    </PlayBackStyled>
  );
}

export default observer(PlayBack);
