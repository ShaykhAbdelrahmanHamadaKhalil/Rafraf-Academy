// src/components/Auth.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import logo from '../assets/logo.png';
// import birdsImage from '../assets/birds.png'; // <-- الخطوة 2: قم بإلغاء التعليق على هذا السطر بعد وضع الصورة

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
    // --- المنطق البرمجي لم يتغير ---
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
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
        // --- تعديل الخلفية الكبرى هنا ---
        <Box 
            component="main" 
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // --- التعديل الرئيسي هنا: الخلفية المتدرجة ---
                // background: `url(${birdsImage}) no-repeat bottom left, linear-gradient(to top right, #e8f5e9, #ffffff)`,
                background: `linear-gradient(to top right, #e8f5e9 30%, #ffffff 70%)`,
                backgroundSize: 'cover',
            }}
        >
            <Container maxWidth="xs">
                <Paper 
                    elevation={8} 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: { xs: 3, md: 4 }, // تعديل الحشوة لتكون متجاوبة
                        borderRadius: 4,
                        // --- التعديل الرئيسي هنا: إعادة النافذة للون الأبيض ---
                        backgroundColor: 'white',
                    }}
                >
                    <Avatar 
                        src={logo}
                        variant="rounded"
                        sx={{
                            m: 1,
                            width: 200, 
                            height: 200,
                            bgcolor: 'transparent',
                            marginBottom: 3,
                        }}
                    />
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                        {isRegisterMode ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        
                        <TextField
                            margin="normal" required fullWidth
                            label="البريد الإلكتروني" autoComplete="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"><MailOutlineIcon /></InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal" required fullWidth
                            label="كلمة المرور" type="password" autoComplete="current-password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"><LockOpenIcon /></InputAdornment>
                                ),
                            }}
                        />
                        {isRegisterMode && (
                            <TextField
                                margin="normal" required fullWidth
                                label="رمز الدعوة" type="text"
                                value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"><VpnKeyIcon /></InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        <Button
                            type="submit" fullWidth variant="contained"
                            sx={{ mt: 3, mb: 2, padding: '12px 0' }}
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
        </Box>
    );
};

export default AuthPage;