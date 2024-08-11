import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import styled from "styled-components";
import {
  Album,
  Artist,
  Home,
  Playlist,
  Search,
  Settings,
  Stats,
} from "./pages";

import { HEADER_HEIGHT, PLAYBACK_HEIGHT } from "../config/config";
import { useEffect, useState } from "react";
import getAverageColor from "../utils/getAverageColor";

const Container = styled.div`
  top: ${HEADER_HEIGHT}px;
  height: calc(100vh - ${Math.abs(HEADER_HEIGHT + PLAYBACK_HEIGHT)}px);
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  background: linear-gradient(
    to bottom,
    ${(props) => props.backgroundColor} 0%,
    ${(props) => props.backgroundColor} 10%,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0) 100%
  );

  h1 {
    margin: 0px;
  }
`;

const PageRendererContainerStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  overscroll-behavior-y: contain;

  overflow-y: scroll;
`;

const PageRendererStyled = styled.div`
  width: calc(100% * 0.5);
  color: white;
`;

function Core() {
  const { currentPage } = useStore().app;

  const [backgroundColor, setBackgroundColor] = useState("black");

  const updateBackgroundColor = async () => {
    setBackgroundColor("black");
    if (!currentPage?.data?.images?.[0]?.url) return;
    const imgUrl = currentPage?.data.images?.[0]?.url;
    getAverageColor(imgUrl).then((color) => {
      setBackgroundColor(color);
    });
  };

  useEffect(() => {
    updateBackgroundColor();
  }, [currentPage]);

  const pageRenderer = () => {
    const type = currentPage?.type;

    if (type === "home") return <Home />;
    if (type === "playlist") return <Playlist />;
    if (type === "album") return <Album />;
    if (type === "artist") return <Artist />;
    if (type === "search") return <Search />;
    if (type === "settings") return <Settings />;
    if (type === "stats") return <Stats />;

    return <Home />;
  };

  return (
    <Container backgroundColor={backgroundColor}>
      <PageRendererContainerStyled>
        <PageRendererStyled>{pageRenderer()}</PageRendererStyled>
      </PageRendererContainerStyled>
    </Container>
  );
}

export default observer(Core);
