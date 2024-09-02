import { makeAutoObservable } from "mobx";

class App {
  currentPage = null;
  sideBarState = "closed"; // closed, floating, fixed

  constructor(store) {
    this.store = store;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentPage = (page) => {
    this.currentPage = page;
  };

  setSideBarState = (state) => {
    this.sideBarState = state;
  };
}

export default App;
