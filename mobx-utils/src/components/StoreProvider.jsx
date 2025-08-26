import React from 'react';
import StoreContext from '../contexts/StoreContext';

export const StoreProvider = ({ store, children }) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
