// Fonction pour calculer la distance de Levenshtein
function levenshteinDistance(a, b) {
  const matrix = [];

  // Initialisation de la première ligne et de la première colonne de la matrice
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Remplissage de la matrice avec les distances
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substitution
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j] + 1, // Suppression
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Fonction pour trier les résultats par similarité
function sortBySimilarity(target, results) {
  return results
    .map((result) => ({
      result,
      distance: levenshteinDistance(target, result.name),
    }))
    .sort((a, b) => a.distance - b.distance)
    .map(({ result }) => result);
}

export default sortBySimilarity;
