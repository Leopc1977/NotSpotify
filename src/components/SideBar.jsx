import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMyLibrary } from "spotify-layer";

import {
  HEADER_HEIGHT,
  HOVER_CONTENT_COLOR,
  PLAYBACK_HEIGHT,
  PRIMARY_TEXT_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  SELECTED_AND_HOVER_CONTENT_COLOR,
  SELECTED_CONTENT_COLOR,
} from "../config/config";
import { createPortal } from "react-dom";
import { toJS } from "mobx";

const Container = styled.div`
  position: absolute;
  left: ${(props) =>
    props.sideBarState === "floating" || props.sideBarState === "fixed"
      ? "0px"
      : "-100%"};
  transition: all 0.2s ease;
  top: ${HEADER_HEIGHT}px;
  color: ${PRIMARY_TEXT_COLOR};

  width: 24%;
  height: calc(100vh - ${HEADER_HEIGHT + PLAYBACK_HEIGHT + 2}px);
  overflow: hidden;
  overflow-y: scroll;
  overscroll-behavior-y: none;

  border-radius: ${(props) =>
    props.sideBarState === "floating" ? "10px" : "5px"};
  gap: 10px;
  background-color: ${SECONDARY_BACKGROUND_COLOR};
`;

const ContentContainer = styled.div`
  color: ${PRIMARY_TEXT_COLOR};

  display: flex;
  flex-direction: column;
  padding: 10px;

  h2 {
    cursor: pointer;
    border-bottom: 1px solid white;
  }

  h3 {
    margin: 10px 0;
  }

  div {
    cursor: pointer;
  }

  div:hover {
    border-radius: 5px;
  }
`;

const ContentRenderer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  width: 90%;
  height: 35px;
  border-radius: 5px;
  overflow: hidden;
  gap: 10px;
`;

const LineStyled = styled.div`
  cursor: pointer;

  margin: 5px;
  font-size: 20px;
`;

const LibraryTitle = styled.div`
  font-size: 20px;
  margin-left: 5px;
  cursor: default;
`;

const LibrarySong = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${(props) =>
    props.active ? SELECTED_CONTENT_COLOR : "none"};

  &:hover {
    background: ${(props) =>
      props.active ? SELECTED_AND_HOVER_CONTENT_COLOR : HOVER_CONTENT_COLOR};
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const ContentNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentName = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ContentSubTitle = styled.div`
  font-size: 15px;
`;

function SideBar() {
  const { spotifyLayer } = useStore();
  const { setCurrentPage, sideBarState, currentPage } = useStore().app;
  const [libraryContent, setLibraryContent] = useState([]);

  const likedTracksContent = {
    type: "playlist",
    name: "Liked Tracks",
    data: {
      id: "liked-tracks",
      owner: { display_name: "You" },
      description: "Liked tracks",
      images: [{ url: "" }],
      name: "Liked Tracks",
    },
  };

  useEffect(() => {
    getMyLibrary(spotifyLayer.api).then((myLibrary) => {
      setLibraryContent(myLibrary);
    });
  }, []);

  const contentRenderer = (content) => {
    const { type } = content;

    let name = null;
    let imageUrl = null;
    let caption = null;

    if (type === "artist") {
      name = content.name;
      imageUrl = content.data.images[0]?.url;
      caption = "Artist";
    } else if (type === "album") {
      name = content.name;
      imageUrl = content.data.images[0]?.url;
      caption = "Album";
    } else if (type === "playlist") {
      name = content.name;
      imageUrl = content.data.images[0]?.url;
      caption = "Playlist";
    }

    const launchContent = () => {};

    return (
      <ContentRenderer onDoubleClick={launchContent}>
        {imageUrl && <Image src={imageUrl} alt={name} />}
        <ContentNameContainer>
          <ContentName>{name}</ContentName>
          <ContentSubTitle>{caption}</ContentSubTitle>
        </ContentNameContainer>
      </ContentRenderer>
    );
  };

  const handleMouseMove = (e) => {
    e.stopPropagation();
  };

  const handlePointerDownOnSearch = () => {
    setCurrentPage({ type: "search", data: {} });
  };

  const handlePointerDownOnStats = () => {
    setCurrentPage({ type: "stats", data: {} });
  };

  const handlePointerDownOnLibraryTrack = (content) => {
    setCurrentPage(content);
  };

  return createPortal(
    <Container onMouseMove={handleMouseMove} sideBarState={sideBarState}>
      <LineStyled onPointerDown={handlePointerDownOnSearch}>
        Search 🔎
      </LineStyled>
      <LineStyled onPointerDown={handlePointerDownOnStats}>Stats 📊</LineStyled>
      <LibraryTitle>Your Library 📚 +</LibraryTitle>
      <ContentContainer>
        {[likedTracksContent, ...libraryContent].map((content) => {
          const key = `Sidebar-${content.data.id}`;
          return (
            <LibrarySong
              key={key}
              onPointerDown={() => handlePointerDownOnLibraryTrack(content)}
              active={content.data.id === currentPage?.data?.id}
            >
              {contentRenderer(content)}
            </LibrarySong>
          );
        })}
      </ContentContainer>
    </Container>,
    document.body,
  );
}

export default observer(SideBar);
