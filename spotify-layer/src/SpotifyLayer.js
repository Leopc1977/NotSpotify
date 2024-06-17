import { SpotifyApi } from "@spotify/web-api-ts-sdk";

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

        scriptTag.onload = () => this.setupPlayer(data, resolve, reject);
        scriptTag.onerror = () =>
          reject(new Error("Spotify SDK script failed to load"));
      } else {
        this.setupPlayer(data, resolve, reject);
      }
    });
  }

  setupPlayer(data, resolve, reject) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: data.playerName,
        getOAuthToken: (cb) => cb(data.accessToken),
        volume: 0.5,
      });

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
    };
  }

  async initializeApi(data) {
    return new Promise((resolve, reject) => {
      if (data.accessToken && data.clientId) {
        this.api = SpotifyApi.withAccessToken(data.clientId, {
          access_token: data.accessToken,
          token_type: data.tokenType,
          expires_in: data.expiresIn,
          refresh_token: data.refreshToken,
        });
        console.log("API initialized with access token");
        resolve();
      } else if (data.clientId && data.clientSecret) {
        this.api = SpotifyApi.withClientCredentials(
          data.clientId,
          data.clientSecret,
        );
        console.log("API initialized with client credentials");
        resolve();
      } else {
        console.error("No credentials provided to use Spotify API");
        reject(new Error("No credentials provided to use Spotify API"));
      }
    });
  }
}

export default SpotifyLayer;
