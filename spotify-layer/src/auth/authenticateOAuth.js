var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//TODO: add scopes as a parameter
function authenticateOAuth(data) {
  const { clientId, redirectUri } = data;

  var scope = `
    user-read-private
    user-read-email
    user-read-playback-state
    user-modify-playback-state
    user-read-currently-playing
    streaming
    app-remote-control
    playlist-read-collaborative
    playlist-modify-public
    playlist-read-private
    playlist-modify-private
    user-library-modify
    user-library-read
    user-top-read
    user-read-recently-played
    user-follow-read
    user-follow-modify
  `
    .replace(/\s+/g, " ")
    .trim();

  var state = generateRandomString(16);

  var authQueryParameters = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  window.location.href = `https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`;
}

export default authenticateOAuth;
