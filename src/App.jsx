// src/App.jsx

import React, { useState, useMemo, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/Auth';
import Layout from './components/Layout'; // استيراد الهيكل
import DashboardPage from './pages/DashboardPage'; // استيراد صفحة لوحة التحكم
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// استيراد أدوات الثيم من MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from './theme'; // استيراد دالة الثيم

// إنشاء Context لمشاركة دالة تغيير الوضع
export const ColorModeContext = createContext({ toggleColorMode: () => {} });


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

    if (loading) return <div style={{ fontFamily: 'Cairo', textAlign: 'center', marginTop: '50px' }}>جاري التحميل...</div>;
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

    if (loading) return <div style={{ fontFamily: 'Cairo', textAlign: 'center', marginTop: '50px' }}>جاري التحميل...</div>;
    return isAuthenticated ? <Navigate to="/home" /> : children;
};

function App() {
    const [mode, setMode] = useState('dark'); // الوضع الافتراضي داكن

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<PublicRoute><AuthPage /></PublicRoute>} />
                    
                    {/* المسارات المحمية ستعرض داخل الهيكل */}
                    <Route 
                        path="/dashboard" 
                        element={<PrivateRoute><Layout><DashboardPage /></Layout></PrivateRoute>} 
                    />
                    {/* يمكنك إضافة باقي المسارات هنا بنفس الطريقة */}
                    
                    {/* توجيه افتراضي بعد تسجيل الدخول */}
                    <Route path="/home" element={<Navigate to="/dashboard" />} />
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;