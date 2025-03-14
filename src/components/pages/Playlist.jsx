import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Song from "../ui/Song";
import PlaylistHeader from "../ui/PlaylistHeader";

const Container = styled.div`
  height: calc(100% - 50px);
  width: 100%;
`;

const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongItem = styled.div``;

function Playlist() {
  const { spotifyLayer } = useStore();
  const { currentPage } = useStore().app;
  const { likedTracks } = useStore().api;

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const getPlaylistTracks = useCallback(async () => {
    try {
      const playlistId = currentPage.data.id;

      if (playlistId === "liked-tracks") {
        setPlaylistTracks(likedTracks);
      } else {
        const tracks =
          await spotifyLayer.api.playlists.getPlaylistItems(playlistId);
        setPlaylistTracks(tracks.items);
      }
    } catch (error) {
      console.error("Failed to fetch playlist tracks", error);
    }
  }, [likedTracks, spotifyLayer.api.playlists, currentPage.data.id]);

  useEffect(() => {
    if (currentPage.data.id !== "liked-tracks" || likedTracks.length === 0) {
      getPlaylistTracks();
    }
  }, [currentPage.data.id, likedTracks.length, getPlaylistTracks]);

  const handleClickOnSong = (track) => {
    spotifyLayer.api.player.startResumePlayback(
      spotifyLayer.deviceId,
      undefined,
      [track.uri],
    );
  };

  return (
    <Container>
      <PlaylistHeader playlist={currentPage.data} />
      <PlaylistList>
        {(currentPage.data.id === "liked-tracks"
          ? likedTracks
          : playlistTracks
        ).map((track) => {
          return (
            <SongItem key={track.track.id}>
              <Song
                onClick={() => handleClickOnSong(track.track)}
                track={track.track}
              />
            </SongItem>
          );
        })}
      </PlaylistList>
    </Container>
  );
}

export default observer(Playlist);
