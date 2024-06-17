function getMyLibrary(api) {
  return new Promise((resolve, reject) => {
    const myLibrary = [];

    // Récupérer les artistes suivis
    const followedArtistsPromise = api.currentUser
      .followedArtists()
      .then((followedArtistsResponse) => {
        return followedArtistsResponse.artists.items.map((artist) => ({
          type: "artist",
          name: artist.name,
          popularity: artist.popularity,
          data: artist,
        }));
      });

    // Récupérer les albums sauvegardés
    const savedAlbumsPromise = api.currentUser.albums
      .savedAlbums()
      .then((savedAlbumsResponse) => {
        return savedAlbumsResponse.items.map((item) => ({
          type: "album",
          name: item.album.name,
          popularity: item.album.popularity,
          data: item.album,
        }));
      });

    // Récupérer les playlists
    const playlistsPromise = api.currentUser.playlists
      .playlists()
      .then((playlistsResponse) => {
        return playlistsResponse.items.map((playlist) => ({
          type: "playlist",
          name: playlist.name,
          popularity: playlist.popularity,
          data: playlist,
        }));
      });

    // Attendre que toutes les promesses soient résolues
    Promise.all([followedArtistsPromise, savedAlbumsPromise, playlistsPromise])
      .then((results) => {
        // Combiner tous les résultats en une seule liste
        results.forEach((result) => {
          myLibrary.push(...result);
        });

        // Trier la liste combinée par popularité
        myLibrary.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        resolve(myLibrary);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default getMyLibrary;
