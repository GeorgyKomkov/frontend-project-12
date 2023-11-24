import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import resources from './locales/index.js';
import AuthProvider from './context/AuthProvider.jsx';
import SocketProvaider from './context/SocketProvaider.jsx';
import store from './slices/index.js';
import rollbarConfig from './rollbarConfig.js';
import FilterProvider from './context/FilterProvaider.jsx';
import { addMessages } from './slices/messagesSlice';
import {
  addChannel, removeChanneFromState, renameChannelFromState,
} from './slices/channelsSlice';

const init = async () => {
  const i18n = i18next.createInstance();
  const socket = io();

  socket.on('newMessage', (payload) => store.dispatch(addMessages(payload)));
  socket.on('newChannel', (payload) => store.dispatch(addChannel(payload)));
  socket.on('removeChannel', (payload) => store.dispatch(removeChanneFromState(payload)));
  socket.on('renameChannel', (payload) => store.dispatch(renameChannelFromState(payload)));

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AuthProvider>
            <SocketProvaider socket={socket}>
              <FilterProvider>
                <I18nextProvider i18n={i18n}>
                  <App />
                </I18nextProvider>
              </FilterProvider>
            </SocketProvaider>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
