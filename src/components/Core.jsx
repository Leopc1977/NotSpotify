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

import {
  HEADER_HEIGHT,
  PLAYBACK_HEIGHT,
  SECONDARY_BACKGROUND_COLOR,
} from "../config/config";
import { useEffect, useState } from "react";
import getAverageColor from "../utils/getAverageColor";
import DailyMix from "./pages/DailyMix";

const Container = styled.div`
  top: ${HEADER_HEIGHT}px;
  height: calc(100vh - ${Math.abs(HEADER_HEIGHT + PLAYBACK_HEIGHT)}px);
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: black;

  h1 {
    margin: 0px;
  }
`;

const PageRendererContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  overscroll-behavior-y: contain;

  overflow-y: scroll;

  border-radius: 10px;
  overflow: hidden;
`;

const PageRendererStyled = styled.div`
  width: calc(100% * 0.5);
  height: 100%;
  color: white;

  background: linear-gradient(
    to bottom,
    ${(props) => props.backgroundColor} 30%,
    rgba(0, 0, 0, 0.6) 60%
  );

  border-radius: 5px;
  padding: 10px;
  padding-top: 20px;

  overflow-y: auto;
  box-sizing: border-box;
  padding-right: 15px;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function Core() {
  const { currentPage } = useStore().app;

  const [backgroundColor, setBackgroundColor] = useState("black");

  const updateBackgroundColor = async () => {
    setBackgroundColor("#FFFFFF1F");
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
    if (type === "dailyMix") return <DailyMix />;

    return <Home />;
  };

  return (
    <Container>
      <PageRendererContainerStyled>
        <PageRendererStyled backgroundColor={backgroundColor}>
          {pageRenderer()}
        </PageRendererStyled>
      </PageRendererContainerStyled>
    </Container>
  );
}

export default observer(Core);
