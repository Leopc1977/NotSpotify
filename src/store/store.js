import { makeAutoObservable } from 'mobx';
import AuthData from './authData/AuthData';
import Playback from './playback/Playback';
import Api from './api/Api';
import App from './app/app';

class Store {
    
    constructor() {
        this.authData = new AuthData(this);
        this.playback = new Playback(this);
        this.api = new Api(this);
        this.app = new App(this);

        makeAutoObservable(this, {}, { autoBind: true })
    }
}

export default Store;
