function formatDuration(duration_ms) {
  // Calculer le nombre total de secondes
  const totalSeconds = Math.floor(duration_ms / 1000);

  // Extraire les heures
  const hours = Math.floor(totalSeconds / 3600);

  // Extraire les minutes
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // Extraire les secondes
  const seconds = totalSeconds % 60;

  // Formater le résultat en HH:MM:SS
  // `padStart(2, '0')` ajoute des zéros au début si nécessaire (pour avoir toujours deux chiffres)
  let format = [];
  if (hours > 0) {
    format.push(hours);
  }
  format.push(minutes);
  format.push(seconds);
  return format.map((val) => val.toString().padStart(2, "0")).join(":");
}

export default formatDuration;
