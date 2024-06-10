import { makeAutoObservable } from "mobx";

class Api {
  spotifyApiSdk = null;

  constructor(store) {
    this.store = store;
    makeAutoObservable(this, {}, { autoBind: true })
  }

  intializeApi = (spotifyApiSdk) => {
    this.spotifyApiSdk = spotifyApiSdk;
  }
}

export default Api;