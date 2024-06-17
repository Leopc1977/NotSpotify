import styled from "styled-components";
import formatDuration from "../../utils/formatDuration";
import { useStore } from "mobx-utils";

const ContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid white;
  border-radius: 5px;
  width: 100%;
`;

function Song(props) {
  const { track } = props;

  const { spotifyLayer } = useStore();

  return (
    <ContainerStyled
      style={{ cursor: "pointer" }}
      onClick={() => {
        spotifyLayer.api.player.startResumePlayback(
          spotifyLayer.deviceId,
          undefined,
          [track.uri],
        );
      }}
    >
      <div>{track.name} </div>
      <div>{track.artists.map((artist) => artist.name).join(", ")}</div>
    </ContainerStyled>
  );
}

export default Song;
