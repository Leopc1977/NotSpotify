/* SpotifyLayer */
import SpotifyLayer from "./SpotifyLayer";

/* Auth */
import authenticateOAuth from "./auth/authenticateOAuth";
import fetchToken from "./auth/fetchToken";

/* API */
import getMyLikedTracks from "./api/getMyLikedTracks";
import getMyLibrary from "./api/getMyLibrary";
import getRecentTracks from "./api/getRecentTracks";
import getTopArtists from "./api/getTopArtists";
import getDailyMix from "./api/getDailyMix";

/* Export */
export default SpotifyLayer;

export {
  // Auth
  authenticateOAuth,
  fetchToken,
  // API
  getMyLikedTracks,
  getMyLibrary,
  getRecentTracks,
  getTopArtists,
  getDailyMix,
};
