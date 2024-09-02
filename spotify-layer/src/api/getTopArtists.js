function getTopArtists(api, limit = 50) {
  return api.currentUser.topItems("artists", "short_term", limit);
}

export default getTopArtists;
