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

const Container = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  overflow: hidden;
  overflow-y: scroll;
`;

const PageRendererStyled = styled.div`
  width: calc(100% * 0.5);
  height: 100%;
  color: white;
`;

function Core() {
  const { currentPage } = useStore().app;

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
    <Container>
      <PageRendererContainerStyled>
        <PageRendererStyled>{pageRenderer()}</PageRendererStyled>
      </PageRendererContainerStyled>
    </Container>
  );
}

export default observer(Core);
