// src/components/Home.jsx

import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

// استيراد المكونات من MUI
import { 
    AppBar, Toolbar, Typography, Button, Container, Box 
} from '@mui/material';

function Home() {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box component="img" src={logo} sx={{ height: 40, mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        أكاديمية رفرف
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>تسجيل الخروج</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    مرحباً بك في لوحة التحكم
                </Typography>
                {user && (
                    <Typography variant="body1">
                        تم تسجيل الدخول بنجاح باستخدام البريد الإلكتروني: {user.email}
                    </Typography>
                )}
            </Container>
        </Box>
    );
}

export default Home;