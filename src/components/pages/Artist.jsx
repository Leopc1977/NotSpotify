import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import formatDuration from "../../utils/formatDuration";
import Song from "../ui/Song";
import ArtistHeader from "../ui/ArtistHeader";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const TitleStyled = styled.div``;

const TracksList = styled.ul``;

function Artist() {
  const { currentPage } = useStore().app;
  const { spotifyLayer } = useStore();

  const [artistTracks, setArtistTracks] = useState([]);

  const getArtistTracks = async () => {
    const artistId = currentPage.data.id;
    const tracks = await spotifyLayer.api.artists.topTracks(artistId);

    setArtistTracks(tracks.tracks);
  };

  useEffect(() => {
    getArtistTracks();
  }, [currentPage.data.id]);

  const handleClickOnSong = (track) => {
    spotifyLayer.api.player.startResumePlayback(
      spotifyLayer.deviceId,
      undefined,
      [track.uri],
    );
  };

  return (
    <Container>
      <ArtistHeader artist={currentPage.data} />
      <TitleStyled>Top Tracks:</TitleStyled>
      <TracksList>
        {artistTracks.map((track) => {
          return (
            <Song
              key={track.id}
              onClick={() => handleClickOnSong(track)}
              track={track}
            />
          );
        })}
      </TracksList>
    </Container>
  );
}

export default observer(Artist);
