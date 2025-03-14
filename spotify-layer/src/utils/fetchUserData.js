async function fetchUserData(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données utilisateur Spotify");
  }

  return await response.json();
}

export default fetchUserData
