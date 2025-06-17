// src/App.jsx
import React, { useState, useMemo, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/Auth';
import Layout from './components/Layout';
import Home from './pages/DashboardPage.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from './theme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

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
    if (loading) return <div>جاري التحميل...</div>;
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
    if (loading) return <div>جاري التحميل...</div>;
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
                    <Route 
                        path="/home" 
                        element={<PrivateRoute><Layout><Home /></Layout></PrivateRoute>} 
                    />
                    {/* أي مسارات مستقبلية ستعرض Home حاليًا حتى نبني صفحاتها */}
                    <Route 
                        path="*" 
                        element={<PrivateRoute><Layout><Home /></Layout></PrivateRoute>} 
                    />
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
export default App;