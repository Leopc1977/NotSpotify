import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Song from "../ui/Song";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

function Playlist() {
  const { spotifyLayer } = useStore();
  const { currentPage } = useStore().app;
  const { likedTracks } = useStore().api;

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const getPlaylistTracks = useCallback(async () => {
    //TODO put a condition to check if the playlist is liked tracks changed and refresh the liked tracks
    const playlistId = currentPage.data.id;

    if (playlistId === "liked-tracks") {
      setPlaylistTracks(likedTracks);
    } else {
      const tracks =
        await spotifyLayer.api.playlists.getPlaylistItems(playlistId);
      setPlaylistTracks(tracks.items);
    }
  }, []);

  useEffect(() => {
    getPlaylistTracks();
  }, [currentPage.data.id]);

  return (
    <Container>
      <h1>Playlist {currentPage.name}</h1>
      <h1>Owner: {currentPage.data.owner.display_name}</h1>
      <h1> Description: {currentPage.data.description}</h1>
      <img src={currentPage.data.images[0]?.url} alt={currentPage.name} />
      <h1>Tracks:</h1>
      <ul>
        {(currentPage.data.id === "liked-tracks"
          ? likedTracks
          : playlistTracks
        ).map((track) => {
          return (
            <Song
              key={`${track.track.id}-${track.added_at}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                spotifyLayer.api.player.startResumePlayback(
                  spotifyLayer.deviceId,
                  undefined,
                  [track.track.uri],
                );
              }}
              track={track.track}
            />
          );
        })}
      </ul>
    </Container>
  );
}

export default observer(Playlist);
