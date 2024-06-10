import { makeAutoObservable } from "mobx";

class Playback {
    player = null;
    deviceId = null;
    isReady = false;

    constructor(store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true })
    }

    intializePlayback = (spotifyWebPlaybackSdk) => {
        const [player, deviceId, isReady] = spotifyWebPlaybackSdk;

        this.player = player;
        this.deviceId = deviceId;
        this.isReady = isReady;
    }
}

export default Playback;