import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SignupPage from './SingupPage';
import ChatPage from './ChatPage';
import routes from '../routes';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  return auth ? (
    children
  ) : (
    <Navigate to={routes.login()} state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" expand="lg" bg="white">
          <Container>
            <Navbar.Brand as={Link} to={routes.home()}>
              {t('mainHeader')}
            </Navbar.Brand>
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
