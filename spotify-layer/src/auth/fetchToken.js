//TODO: use spotify-web-api-js to fetch token

function fetchToken(code, data) {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", data.redirectUri);

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${data.clientId}:${data.clientSecret}`)}`,
    },
    body: params,
  })
    .then((response) => response.json())
    .then((json) => {
      window.location.href = `http://localhost:3000?access_token=${json.access_token}&refresh_token=${json.refresh_token}&token_type=${json.token_type}&expires_in=${json.expires_in}&scope=${json.scope}`;
    });
}

export default fetchToken;
