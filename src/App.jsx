// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AuthPage from './components/Auth'; // <-- استيراد المكون الجديد
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// PrivateRoute لحماية الصفحات الداخلية
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // مراقبة حالة تسجيل الدخول
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // true if user is logged in, false otherwise
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>جاري التحميل...</div>;
  }

  // إذا كان المستخدم مسجل دخوله، اعرض الصفحة المطلوبة
  // وإلا، قم بتوجيهه إلى صفحة تسجيل الدخول الرئيسية
  return isAuthenticated ? children : <Navigate to="/" />;
};

// PublicRoute لمنع المستخدم المسجل من رؤية صفحة الدخول مرة أخرى
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

    if (loading) {
        return <div style={{textAlign: 'center', marginTop: '50px'}}>جاري التحميل...</div>;
    }

    // إذا كان المستخدم مسجل دخوله، وجهه للصفحة الرئيسية
    // وإلا، اعرض صفحة تسجيل الدخول
    return isAuthenticated ? <Navigate to="/home" /> : children;
};

function App() {
  return (
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
  );
}

export default App;