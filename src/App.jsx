import { StoreProvider } from "mobx-utils";
import AppSpotify from "./AppSpotify";
import Store from "./store/store";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { createGlobalStyle } from "styled-components";

import "./App.css";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Circular';
    src: url('./fonts/Circular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  html, body {
    font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  const store = new Store();

  return (
    <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
      <GlobalStyle />
      <StoreProvider store={store}>
        <AppSpotify />
      </StoreProvider>
    </StyleSheetManager>
  );
};

export default App;
