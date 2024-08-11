import Header from "./Header";

function PlaylistHeader(props) {
  const { playlist } = props;

  return (
    <Header
      title={playlist.name}
      subTitle="Playlist"
      imageUrl={playlist.images[0]?.url}
    />
  );
}

export default PlaylistHeader;
