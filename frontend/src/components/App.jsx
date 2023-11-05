/* eslint-disable max-len */
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SignupPage from './SingupPage';
import ChatPage from './ChatPage';
import routes from '../routes';
import { useAuth, useSocket } from '../hooks/index.js';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  return auth.user ? (
    children
  ) : (
    <Navigate to={routes.login()} state={{ from: location }} />
  );
};

const LogOut = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return auth.user ? <Button onClick={auth.logOut}>{t('logOut')}</Button> : null;
};

const App = () => {
  const socket = useSocket();
  socket.socketOn();
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" expand="lg" bg="white">
          <Container>
            <Navbar.Brand as={Link} to={routes.home()}>
              {t('mainHeader')}
            </Navbar.Brand>
            <LogOut />
          </Container>
        </Navbar>
        <Routes>
          <Route
            index
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path={routes.login()} element={<LoginPage />} />
          <Route path={routes.signup()} element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <div className="Toastify" />
    </BrowserRouter>
  );
};

export default App;
