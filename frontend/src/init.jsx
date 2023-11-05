import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import App from './components/App';
import resources from './locales/index.js';
import AuthProvider from './context/AuthProvider.jsx';
import SocketProvaider from './context/SocketProvaider.jsx';
import store from './slices/index.js';

const init = async () => {
  const socket = io();
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <Provider store={store}>
      <AuthProvider>
        <SocketProvaider socket={socket}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </SocketProvaider>
      </AuthProvider>
    </Provider>
  );
};

export default init;
