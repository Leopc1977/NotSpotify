import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import { getDailyMix } from "spotify-layer";
import styled from "styled-components";
import Song from "../ui/Song";

const DailyMixContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DailyMixStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

function DailyMix(props) {
  const {} = props;
  const { spotifyLayer } = useStore();
  const { currentPage } = useStore().app;

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getDailyMix(spotifyLayer.api, currentPage.id).then((res) => {
      console.log(res);
      setTracks(res.tracks);
    });
  }, []);

  return (
    <DailyMixContainer>
      <h1>Daily Mix</h1>
      <SongsContainer>
        {tracks.map((track) => (
          <DailyMixStyled key={track.id}>
            <Song track={track} />
          </DailyMixStyled>
        ))}
      </SongsContainer>
    </DailyMixContainer>
  );
}

export default DailyMix;
