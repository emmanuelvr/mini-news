import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
// native-base
import { StyleProvider } from 'native-base';
import getTheme from '../theme/components';
import commonColor from '../theme/variables/commonColor';
// root reducer
import rootReducer from './redux';
// screens
import PostsScreen from './screens/posts';
import PostDetailsScreen from './screens/post-details';

const StackNavigator = createStackNavigator(
  {
    Posts: {
      screen: PostsScreen,
    },
    Post: {
      screen: PostDetailsScreen,
    },
  },
  {
    initialRouteName: 'Posts',
  },
);

const AppContainer = createAppContainer(StackNavigator);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

function NavigatorWithState(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StyleProvider style={getTheme(commonColor)}>
          <AppContainer />
        </StyleProvider>
      </PersistGate>
    </Provider>
  );
}

export default NavigatorWithState;
