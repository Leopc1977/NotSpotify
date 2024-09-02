import { makeAutoObservable } from "mobx";
import App from "./slices/app";
import Api from "./slices/api";

class Store {
  player = null;
  spotifyLayer = null;

  constructor() {
    this.app = new App(this);
    this.api = new Api(this);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSpotifyLayer(spotifyLayer) {
    this.spotifyLayer = spotifyLayer;
  }
}

export default Store;
