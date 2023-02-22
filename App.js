import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './core/store';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigations from './core/routers';
// import {enableLatestRenderer} from 'react-native-maps';

const App = () => {
  // enableLatestRenderer();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
         
            <PaperProvider>
              <RootNavigations />
            </PaperProvider>

        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
