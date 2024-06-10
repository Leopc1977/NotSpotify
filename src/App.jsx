import { StoreProvider } from 'mobx-utils'
import AppSpotify from './AppSpotify';
import Store from './store/store';

const App = () => {
  const store = new Store();

  return (
    <StoreProvider store={store}>
        <AppSpotify />
    </StoreProvider>
  );
};

export default App;
