import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import { getRecentTracks, getTopArtists } from "spotify-layer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubTitleStyled = styled.div`
  font-size: 24px;
`;

const RecentTrackContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(8, auto);
  gap: 10px; /* Espace entre les éléments de la grille */
`;

const RecentTrackStyled = styled.div`
  display: flex;
  background-color: #ffffff1a;
  border-radius: 5px;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffffff33;
  }
`;

const RecentTrackImage = styled.img`
  width: 50px;
  height: 50px;
`;

const DailyMixContainer = styled.div`
  display: flex;
  gap: 10px;

  overflow: auto;
`;

const DailyMixStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
`;

const DailyMixImage = styled.img`
  width: 100px;
  height: 100px;

  border-radius: 5px;
`;

function Home() {
  const { spotifyLayer } = useStore();

  const { setCurrentPage } = useStore().app;

  const [recentTracks, setRecentTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const LIMIT_RECENT_TRACKS = 8;
  const LIMIT_TOP_ARTIST = 10;

  useEffect(() => {
    getRecentTracks(spotifyLayer.api, LIMIT_RECENT_TRACKS).then((res) =>
      setRecentTracks(res.items),
    );

    getTopArtists(spotifyLayer.api, LIMIT_TOP_ARTIST).then((res) => {
      setTopArtists(res.items);
    });
  }, []);

  const handlePointerDownOnSong = (uri) => {
    spotifyLayer.api.player.startResumePlayback(
      spotifyLayer.deviceId,
      undefined,
      [uri],
    );
  };

  return (
    <Container>
      <RecentTrackContainer>
        {recentTracks.map((trackData, index) => {
          const track = trackData.track;
          return (
            <RecentTrackStyled
              key={track.id + index}
              onPointerDown={() => {
                handlePointerDownOnSong(track.uri);
              }}
            >
              <RecentTrackImage src={track.album.images[0].url} />
              {track.name}
            </RecentTrackStyled>
          );
        })}
      </RecentTrackContainer>
      <SubTitleStyled>Concu spécialement pour vous</SubTitleStyled>
      <DailyMixContainer>
        {topArtists.map((artist, index) => (
          <DailyMixStyled
            key={artist.id + index}
            onPointerDown={() => {
              setCurrentPage({
                ...artist,
                type: "dailyMix",
              });
            }}
          >
            <DailyMixImage src={artist.images[0].url} />
          </DailyMixStyled>
        ))}
      </DailyMixContainer>
      <SubTitleStyled>Vos mix préférés</SubTitleStyled>
    </Container>
  );
}

export default observer(Home);
