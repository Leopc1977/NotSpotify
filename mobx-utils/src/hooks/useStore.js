import React from 'react';
import StoreContext from '../contexts/StoreContext';

function useStore() {
    return React.useContext(StoreContext);
}

export default useStore;
