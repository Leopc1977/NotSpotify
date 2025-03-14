import styled from "styled-components";
import { useStore } from "mobx-utils";
import { toJS } from "mobx";

const ContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  width: 100%;
  height: 100%;

  padding: 10px;
  box-sizing: border-box;

  cursor: pointer;
`;
const TrackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const TrackNameStyled = styled.div``;
const ArtistNameStyled = styled.div`
  color: #b3b3b3;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

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
      <TrackContainer>
        {track.album?.images[0]?.url && (
          <Image src={track.album?.images[0]?.url} />
        )}
        <TrackNameStyled>
          {track.name}{" "}
          <ArtistNameStyled>
            {" "}
            {track.artists.map((artist) => artist.name).join(", ")}{" "}
          </ArtistNameStyled>
        </TrackNameStyled>
      </TrackContainer>
    </ContainerStyled>
  );
}

export default Song;
