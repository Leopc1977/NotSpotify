import { makeAutoObservable } from "mobx";

class Api {
  state = null;
  likedTracks = [];

  constructor(store) {
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
