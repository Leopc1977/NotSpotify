import Header from "./Header";

function AlbumHeader(props) {
  const { album } = props;

  return (
    <Header
      title={album.name}
      subTitle="Album"
      imageUrl={album.images[0]?.url}
    />
  );
}

export default AlbumHeader;
