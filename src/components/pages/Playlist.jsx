import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Song from "../ui/Song";
import PlaylistHeader from "../ui/PlaylistHeader";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const TitleStyled = styled.div``;

const PlaylistList = styled.ul``;

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
      <TitleStyled>Tracks:</TitleStyled>
      <PlaylistList>
        {(currentPage.data.id === "liked-tracks"
          ? likedTracks
          : playlistTracks
        ).map((track) => {
          return (
            <Song
              key={`${currentPage.data.id}-${track.track.id}-${track.added_at}`}
              onClick={() => handleClickOnSong(track.track)}
              track={track.track}
            />
          );
        })}
      </PlaylistList>
    </Container>
  );
}

export default observer(Playlist);
