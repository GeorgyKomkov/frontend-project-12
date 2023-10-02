import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SignupPage from './SingupPage';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Navbar
        className="shadow-sm"
        expand="lg"
        bg="white"
      >
        <Container>
          <Navbar.Brand>Hexlet Chat</Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    <div className="Toastify" />
  </BrowserRouter>
);

export default App;
