import { makeAutoObservable } from "mobx";

class Api {
  state = null;
  likedTracks = [];

  constructor(store) {
    this.store = store;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setState(state) {
    this.state = state;
  }

  addLikedTracks(tracks) {
    this.likedTracks.push(...tracks);
  }
}

export default Api;
