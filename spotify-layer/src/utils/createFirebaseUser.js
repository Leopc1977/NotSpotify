import admin from 'firebase-admin';

admin.initializeApp();

async function createFirebaseUser(spotifyUserId) {
  try {
    const response = await fetch('/api/generateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spotifyUserId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la génération du token.');
    }

    const { token } = await response.json();
    console.log('Token Firebase généré :', token);
    return token; // Retourner le token pour une utilisation ultérieure
  } catch (error) {
    console.error('Erreur :', error);
    throw error;
  }
}

export default createFirebaseUser
