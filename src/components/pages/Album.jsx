import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import styled from "styled-components";
import Song from "../ui/Song";
import AlbumHeader from "../ui/AlbumHeader";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const TitleStyled = styled.div``;

const SongList = styled.ul``;

async function get_average_rgb(src) {
  /* https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript */
  return new Promise((resolve) => {
    let context = document.createElement("canvas").getContext("2d");
    context.imageSmoothingEnabled = true;

    let img = new Image();
    img.src = src;
    img.crossOrigin = "";

    img.onload = () => {
      context?.drawImage(img, 0, 0, 1, 1);
      resolve(context?.getImageData(0, 0, 1, 1).data.slice(0, 3));
    };
  });
}

function Album() {
  const { currentPage } = useStore().app;

  return (
    <Container>
      <AlbumHeader album={currentPage.data} />
      <TitleStyled>Tracks:</TitleStyled>
      <SongList>
        {currentPage.data.tracks.items.map((track) => (
          <Song key={track.id} track={track} />
        ))}
      </SongList>
    </Container>
  );
}

export default observer(Album);
