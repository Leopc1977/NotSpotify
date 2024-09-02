import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import { getDailyMix } from "spotify-layer";
import styled from "styled-components";
import Song from "../ui/Song";

const DailyMixContainer = styled.div`
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
    <div>
      <h1>Daily Mix</h1>
      <DailyMixContainer>
        {tracks.map((track) => (
          <DailyMixStyled key={track.id}>
            {/* <Image src={track.album.images[0].url} />
            <div>
              <h3>{track.name}</h3>
              <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
            </div> */}
            <Song track={track} />
          </DailyMixStyled>
        ))}
      </DailyMixContainer>
    </div>
  );
}

export default DailyMix;
