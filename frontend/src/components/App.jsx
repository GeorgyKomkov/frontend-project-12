import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
