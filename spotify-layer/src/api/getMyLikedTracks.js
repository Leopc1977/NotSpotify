async function getMyLikedTracks(api, updateLikedTracks) {
  try {
    let totalData = [];
    let offset = 0;
    let data = await api.currentUser.tracks.savedTracks(50, offset);

    while (data.items.length > 0) {
      if (updateLikedTracks) updateLikedTracks(data.items);
      totalData = totalData.concat(data.items);
      offset += 50;
      data = await api.currentUser.tracks.savedTracks(50, offset);
    }

    return totalData;
  } catch (error) {
    console.error("Error retrieving saved tracks:", error);
    throw error;
  }
}

export default getMyLikedTracks;
