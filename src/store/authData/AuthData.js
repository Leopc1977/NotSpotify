import { makeAutoObservable } from "mobx";

class AuthData {
    access_token = '';
    refresh_token = '';
    client_id = '';
    client_secret = '';
    redirect_uri = '';
    token_type = '';
    expires_in = 0;
    expires = 0;
    scope = '';

    constructor(store) {
        this.store = store;
        makeAutoObservable(this, {}, { autoBind: true })
    }

    initializeSpotifyData(authData) {
        Object.assign(this, authData);
    }
}

export default AuthData;
