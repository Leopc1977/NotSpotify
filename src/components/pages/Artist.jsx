import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import formatDuration from "../../utils/formatDuration";
import Song from "../ui/Song";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

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

  return (
    <Container>
      <h1>Artist {currentPage.name}</h1>
      <h1>Followers: {currentPage.data.followers.total}</h1>
      <h1>Genre: {currentPage.data.genres.map((genre) => genre).join(", ")}</h1>
      <img src={currentPage.data.images[2]?.url} alt={currentPage.name} />
      <h1>Top Tracks:</h1>
      <ul>
        {artistTracks.map((track) => {
          return (
            <Song
              key={track.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                spotifyLayer.api.player.startResumePlayback(
                  spotifyLayer.deviceId,
                  undefined,
                  [track.uri],
                );
              }}
              track={track}
            />
          );
        })}
      </ul>
    </Container>
  );
}

export default observer(Artist);
