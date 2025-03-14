import { makeAutoObservable } from "mobx";

class App {
  constructor(store) {
    this.store = store;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  currentPage = null;
  setCurrentPage = (page) => {
    this.currentPage = page;
  };

  sideBarState = "fixed"; // closed, floating, fixed
  setSideBarState = (state) => {
    this.sideBarState = state;
  };
}

export default App;
