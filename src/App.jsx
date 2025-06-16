// src/App.jsx

import React, { useState, useMemo, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/Auth';
import Layout from './components/Layout'; 
import DashboardPage from './pages/DashboardPage';
import FinancePage from './pages/FinancePage'; // <-- استيراد الملف الجديد
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from './theme';

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
    const [mode, setMode] = useState('dark');
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
                    
                    {/* المسارات المحمية */}
                    <Route 
                        path="/dashboard" 
                        element={<PrivateRoute><Layout><DashboardPage /></Layout></PrivateRoute>} 
                    />
                     <Route 
                        path="/finance" 
                        element={<PrivateRoute><Layout><FinancePage /></Layout></PrivateRoute>} 
                    />
                    {/* يمكنك إضافة باقي المسارات هنا بنفس الطريقة */}
                    
                    <Route path="/home" element={<Navigate to="/dashboard" />} />
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;