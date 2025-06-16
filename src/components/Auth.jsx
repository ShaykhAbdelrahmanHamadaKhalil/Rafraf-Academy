// src/components/Auth.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import logo from '../assets/logo.png';

// استيراد المكونات من MUI
import { 
    Container, Box, Paper, Avatar, Typography, TextField, Button, Link, 
    InputAdornment, Alert 
} from '@mui/material';

// استيراد الأيقونات من MUI
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const validInvitationCodes = ["QURAN111", "RAFRAF222", "ADMIN333"];

const AuthPage = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
    // ... المنطق البرمجي يبقى كما هو ...
    const clearForm = () => { setEmail(''); setPassword(''); setInvitationCode(''); setError(''); setSuccess(''); };
    const handleModeToggle = () => { setIsRegisterMode(!isRegisterMode); clearForm(); };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        if (isRegisterMode) {
            if (!validInvitationCodes.includes(invitationCode)) { setError("رمز الدعوة الذي أدخلته غير صالح."); return; }
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setSuccess('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
                setIsRegisterMode(false);
            } catch (err) {
                if (err.code === 'auth/email-already-in-use') setError("هذا البريد الإلكتروني مستخدم بالفعل.");
                else if (err.code === 'auth/weak-password') setError("كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.");
                else setError("حدث خطأ ما. يرجى المحاولة مرة أخرى.");
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/home');
            } catch (err) {
                setError('فشل تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper 
                elevation={6} 
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    borderRadius: 3,
                }}
            >
                <Avatar 
                    src={logo}
                    variant="rounded"
                    sx={{
                        m: 1,
                        width: 150, // حجم كبير للشعار
                        height: 150, // حجم كبير للشعار
                        bgcolor: 'transparent',
                    }}
                />
                <Typography component="h1" variant="h5">
                    {isRegisterMode ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="البريد الإلكتروني"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="كلمة المرور"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOpenIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {isRegisterMode && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="invitationCode"
                            label="رمز الدعوة"
                            type="text"
                            id="invitationCode"
                            value={invitationCode}
                            onChange={(e) => setInvitationCode(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isRegisterMode ? 'إنشاء الحساب' : 'دخول'}
                    </Button>
                    <Box textAlign="center">
                         <Link component="button" variant="body2" onClick={handleModeToggle} type="button">
                            {isRegisterMode
                                ? "لديك حساب بالفعل؟ سجل الدخول"
                                : "ليس لديك حساب؟ أنشئ حسابًا جديدًا"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default AuthPage;