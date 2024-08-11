import Header from "./Header";

function ArtistHeader(props) {
  const { artist } = props;

  return (
    <Header
      title={artist.name}
      subTitle="Artist"
      imageUrl={artist.images[0]?.url}
    />
  );
}

export default ArtistHeader;
