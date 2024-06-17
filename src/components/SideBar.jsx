import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMyLibrary } from "spotify-layer";
import { createPortal } from "react-dom";

const Container = styled.div`
  position: absolute;
  left: ${(props) =>
    props.sideBarState === "floating" || props.sideBarState === "fixed"
      ? "0px"
      : "-100%"};
  transition: all 0.2s ease;
  top: calc(50px + 2px);
  background-color: black;
  border-right: 2px solid white;

  width: 20%;
  height: calc(100vh - 50px - 50px);
  overflow: scroll;

  color: white;
  border-left: 2px solid white;
`;

function SideBar() {
  const { spotifyLayer } = useStore();
  const { setCurrentPage, sideBarState } = useStore().app;
  const [libraryContent, setLibraryContent] = useState([]);

  const likedTracksContent = {
    type: "playlist",
    name: "Liked Tracks",
    data: {
      id: "liked-tracks",
      owner: { display_name: "You" },
      description: "Liked tracks",
      images: [{ url: "" }],
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

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 10,
          cursor: "pointer",
          gap: 10,
          width: "100%",
          border: "1px solid white",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: 50,
              height: 50,
            }}
          />
        )}
        <div>
          <div
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </div>
          <div>{caption}</div>
        </div>
      </div>
    );
  };

  const handleMouseMove = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <Container onMouseMove={handleMouseMove} sideBarState={sideBarState}>
      <h2
        style={{
          cursor: "pointer",
          borderBottom: "1px solid white",
        }}
        onPointerDown={() => {
          setCurrentPage({ type: "search", data: {} });
        }}
      >
        Search 🔎
      </h2>
      <h2
        style={{
          cursor: "pointer",
          borderBottom: "1px solid white",
        }}
        onPointerDown={() => {
          setCurrentPage({ type: "stats", data: {} });
        }}
      >
        Stats 📊
      </h2>
      <h3>Your Library 📚</h3>
      <div>
        {[likedTracksContent, ...libraryContent].map((content) => {
          return (
            <div
              key={content.data.id}
              onPointerDown={() => {
                setCurrentPage(content);
              }}
            >
              {contentRenderer(content)}
            </div>
          );
        })}
      </div>
    </Container>,
    document.body,
  );
}

export default observer(SideBar);
