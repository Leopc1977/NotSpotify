import styled from "styled-components";
import { useStore } from "mobx-utils";

const ContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid white;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
`;

const TrackNameStyled = styled.div``;
const ArtistNameStyled = styled.div``;

function Song(props) {
  const { track } = props;

  const { spotifyLayer } = useStore();

  const handleClickOnSong = () => {
    spotifyLayer.api.player.startResumePlayback(
      spotifyLayer.deviceId,
      undefined,
      [track.uri],
    );
  };

  return (
    <ContainerStyled onClick={handleClickOnSong}>
      <TrackNameStyled>{track.name}</TrackNameStyled>
      <ArtistNameStyled>
        {track.artists.map((artist) => artist.name).join(", ")}
      </ArtistNameStyled>
    </ContainerStyled>
  );
}

export default Song;
