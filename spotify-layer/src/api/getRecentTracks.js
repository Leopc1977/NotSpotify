function getRecentTracks(api, limit = 50) {
  return api.player.getRecentlyPlayedTracks(limit);
}

export default getRecentTracks;
