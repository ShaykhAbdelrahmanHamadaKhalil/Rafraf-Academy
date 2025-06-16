// src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AuthPage from './components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// استيراد أدوات الثيم من MUI
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // استيراد الثيم المخصص

// ... مكونات PrivateRoute و PublicRoute تبقى كما هي ...
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) return <div style={{fontFamily: 'Cairo', textAlign: 'center', marginTop: '50px'}}>جاري التحميل...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
};
const PublicRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    if (loading) return <div style={{fontFamily: 'Cairo', textAlign: 'center', marginTop: '50px'}}>جاري التحميل...</div>;
    return isAuthenticated ? <Navigate to="/home" /> : children;
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* لتوحيد الأنماط الأساسية في المتصفحات */}
      <div>
        <Routes>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;