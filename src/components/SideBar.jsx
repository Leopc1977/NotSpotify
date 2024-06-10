import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getMyLibraryContent from "../utils/getMyLibraryContent";

const Container = styled.div`
    background-color: blue;
    width: 30%;
    height: 100%;
    overflow: scroll;
`;

function SideBar() {

  const { spotifyApiSdk } = useStore().api;

  const [libraryContent, setLibraryContent] = useState([]);

  useEffect(() => {
    async function fetchTopTracks() {
      getMyLibraryContent(spotifyApiSdk).then((myLibrary) => {
        setLibraryContent(myLibrary);
      });
    }

    if (spotifyApiSdk) {
      fetchTopTracks();
    }
  }, [spotifyApiSdk]);

  const contentRenderer = (content) => {
    const { type } = content;

    let name = '';
    let imageUrl = '';
    let caption = '';

    if (type === 'artist') {
      name = content.name;
      imageUrl = content.data.images[0]?.url;
      caption = 'Artist'
    } else if (type === 'album') {
      name = content.name;
      imageUrl = content.data.images[0]?.url;
      caption = 'Album'
    } else if (type === 'playlist') {
      name = content.name;
      imageUrl = content.data.images[0]?.url;
      caption = 'Playlist'
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 10,
          cursor: 'pointer',
          gap: 10,
          width: '100%'
        }}
      >
        <img src={imageUrl} alt={name} style={{
          width: 50,
          height: 50,
        }}/>
        <div>
          <div style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>{name}</div>
          <div>{caption}</div>
       </div>
      </div>
    );
  }

  return (
    <Container>
        <h1>Home</h1>
        <h1>Search</h1>
        <h1>Your Library</h1>
        <div>
          {libraryContent.map((content) => {
            return (
              <div key={content.data.id}>
                {contentRenderer(content)}
              </div>
            )
          })}
        </div>
    </Container>
  );
}

export default observer(SideBar);