import { StoreProvider } from "mobx-utils";
import AppSpotify from "./AppSpotify";
import Store from "./store/store";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

const App = () => {
  const store = new Store();

  return (
    <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
      <StoreProvider store={store}>
        <AppSpotify />
      </StoreProvider>
    </StyleSheetManager>
  );
};

export default App;
