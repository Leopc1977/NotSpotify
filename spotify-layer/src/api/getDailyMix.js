function getDailyMix(api, idSeed, limit = 50) {
  return api.recommendations.get({ seed_artists: [idSeed] });
}

export default getDailyMix;
