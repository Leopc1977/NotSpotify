import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import styled from "styled-components";
import Song from "../ui/Song";
import { useEffect, useState } from "react";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

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
      <h1>{currentPage.name}</h1>
      <h1>Release Date: {currentPage.data.release_date}</h1>
      <h1>
        Artist :{" "}
        {currentPage.data.artists.map((artist) => artist.name).join(", ")}
      </h1>
      <h1>Genre: {currentPage.data.genres.map((genre) => genre).join(", ")}</h1>
      <img src={currentPage.data.images[2]?.url} alt={currentPage.name} />
      <h1>Tracks:</h1>
      <ul>
        {currentPage.data.tracks.items.map((track) => (
          <Song key={track.id} track={track} />
        ))}
      </ul>
    </Container>
  );
}

export default observer(Album);
