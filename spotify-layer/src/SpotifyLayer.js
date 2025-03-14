import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import fetchUserData from './utils/fetchUserData'
import createFirebaseUser from './utils/createFirebaseUser'

import { getAuth, signInWithCustomToken } from "firebase/auth";

class SpotifyLayer {
  sdkConfig;
  player;

  constructor(data) {
    this.initializeAll(data);
  }

  async initializeAll(data) {
    try {
      await Promise.all([
        this.initializePlayer(data),
        this.initializeApi(data),
      ]);
      console.log("Initialization complete");
      data.onReady();
    } catch (error) {
      console.error("An error occurred during initialization:", error);
    }
  }

  async initializePlayer(data) {
    return new Promise((resolve, reject) => {
      if (!window.Spotify) {
        const scriptTag = document.createElement("script");

        scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
        document.body.appendChild(scriptTag);

        window.onSpotifyWebPlaybackSDKReady = () => {
          this.player = new Spotify.Player({
            name: data.playerName,
            getOAuthToken: (cb) => cb(data.accessToken),
            volume: 0.5,
          });
          this.setupPlayer(data, resolve, reject);
        };
      } else this.setupPlayer(data, resolve, reject);
    });
  }

  setupPlayer(data, resolve, reject) {
    console.log("Setting up player");

    if (!this.player) {
      console.error("Spotify player is not initialized.");
      reject(new Error("Spotify player is not initialized."));
      return;
    }

    this.player.addListener("initialization_error", ({ message }) =>
      reject(new Error("Initialization Error: " + message)),
    );
    this.player.addListener("authentication_error", ({ message }) =>
      reject(new Error("Authentication Error: " + message)),
    );
    this.player.addListener("account_error", ({ message }) =>
      reject(new Error("Account Error: " + message)),
    );
    this.player.addListener("playback_error", ({ message }) =>
      reject(new Error("Playback Error: " + message)),
    );

    this.player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID:", device_id);
      this.deviceId = device_id;
      resolve();
    });

    this.player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline:", device_id);
    });

    this.player.addListener("player_state_changed", (state) => {
      console.log("Player state changed:", state);
      data.onPlayerStateChanged(state);
    });

    this.player.connect();
    console.log("Player initialized");
  }

async initializeApi(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.accessToken && data.clientId) {
        // Initialisation de l'API Spotify avec un access token
        this.api = SpotifyApi.withAccessToken(data.clientId, {
          access_token: data.accessToken,
          token_type: data.tokenType,
          expires_in: data.expiresIn,
          refresh_token: data.refreshToken,
        });

        // Étape 2 : Récupérer les informations utilisateur Spotify
        const user = await fetchUserData(data.accessToken);
        this.user = user; // Stockez l'utilisateur pour un usage ultérieur
        console.log("Utilisateur Spotify :", this.user);

        // Étape 3 : Obtenir un jeton Firebase personnalisé depuis le serveur
        const customTokenResponse = await createFirebaseUser(this.user);

        if (!customTokenResponse.ok) {
          throw new Error("Erreur lors de la génération du jeton Firebase");
        }

        const { customToken } = await customTokenResponse.json();

        // Étape 4 : Connecter l'utilisateur à Firebase
        const auth = getAuth(firebaseApp);
        const userCredential = await signInWithCustomToken(auth, customToken);

        console.log("Utilisateur connecté à Firebase :", userCredential.user);

        console.log("API Spotify initialisée avec access token");
        resolve();
      } else if (data.clientId && data.clientSecret) {
        // Initialisation de l'API Spotify avec client credentials
        this.api = SpotifyApi.withClientCredentials(
          data.clientId,
          data.clientSecret,
        );
        console.log("API Spotify initialisée avec client credentials");
        resolve();
      } else {
        console.error("Aucune donnée d'authentification fournie pour Spotify API");
        reject(new Error("Aucune donnée d'authentification fournie pour Spotify API"));
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation de l'API Spotify :", error);
      reject(error);
    }
  });
}

}

export default SpotifyLayer;
