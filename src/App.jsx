import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import  PrivateRoute  from './components/PrivateRoute';
import Nav from './components/Nav';   

import Home     from './pages/Home.jsx';
import Login    from './pages/Login.jsx';
import Register from './pages/Register.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Nav /> 
        <Routes>
          {/* public  */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* private */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}