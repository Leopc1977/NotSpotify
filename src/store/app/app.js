import { makeAutoObservable } from "mobx";

class App {
  currentPage = null;
  isReady = false;
  // closed, floating, fixed
  sideBarState = "closed";

  constructor(store) {
    this.store = store;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentPage = (page) => {
    this.currentPage = page;
  };

  setIsReady(isReady) {
    this.isReady = isReady;
  }

  setSideBarState = (state) => {
    this.sideBarState = state;
  };
}

export default App;
