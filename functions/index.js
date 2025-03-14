const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Endpoint pour générer un token Firebase
exports.generateToken = functions.https.onRequest(async (req, res) => {
  const spotifyUserId = req.body.spotifyUserId;

  if (!spotifyUserId) {
    return res.status(400).send({error: "Spotify User ID manquant."});
  }

  try {
    const token = await admin.auth().createCustomToken(spotifyUserId);
    res.send({token});
  } catch (error) {
    console.error("Erreur lors de la génération du token Firebase :", error);
    res.status(500).send({error: "Erreur serveur."});
  }
});
