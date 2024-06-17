import { makeAutoObservable } from "mobx";
import App from "./app/app";
import Api from "./api/api";

class Store {
  player = null;

  constructor() {
    this.app = new App(this);
    this.api = new Api(this);

    this.spotifyLayer = null;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSpotifyLayer(spotifyLayer) {
    this.spotifyLayer = spotifyLayer;
  }
}

export default Store;
