// src/components/Auth.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import logo from '../assets/logo.png';
import birdsImage from '../assets/birds.png'; // <-- تم إضافة مسار الصورة هنا بشكل صحيح

// استيراد المكونات والأيقونات من MUI
import {
    Container, Box, Avatar, Typography, TextField, Button, Link,
    InputAdornment, Alert
} from '@mui/material';
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

    // أنماط مخصصة للحقول لضمان التباين العالي
    const highContrastTextFieldStyles = {
        // تصميم الحقل نفسه
        '& .MuiFilledInput-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // خلفية داكنة شبه شفافة
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)', // إطار أبيض خفيف
            '&:before, &:after': { borderBottom: 'none' }, // إزالة الخط السفلي
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
        },
        // تصميم عنوان الحقل (Label)
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.9)', // لون أبيض للعنوان
            fontWeight: 'bold',
        },
        '& .MuiInputLabel-root.Mui-focused': {
             color: 'white', // لون العنوان عند التركيز
        },
        // تصميم النص المكتوب داخل الحقل
        '& .MuiFilledInput-input': {
            color: 'white',
        },
        // تصميم الأيقونات
        '& .MuiInputAdornment-root svg': {
            color: 'rgba(255, 255, 255, 0.9)',
        },
    };

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // --- الخلفية مضافة هنا بشكل نهائي ---
                backgroundImage: `url(${birdsImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
            }}
        >
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        src={logo}
                        variant="rounded"
                        sx={{
                            width: 180,
                            height: 180,
                            bgcolor: 'transparent',
                            marginBottom: 2,
                        }}
                    />
                    <Typography component="h1" variant="h5" sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 2px 5px rgba(0,0,0,0.7)', // ظل قوي للنص
                    }}>
                        {isRegisterMode ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        {success && <Alert severity="success" variant="filled" sx={{ mb: 2 }}>{success}</Alert>}
                        {error && <Alert severity="error" variant="filled" sx={{ mb: 2 }}>{error}</Alert>}

                        <TextField
                            required fullWidth
                            label="البريد الإلكتروني"
                            variant="filled"
                            sx={highContrastTextFieldStyles}
                            margin="normal"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"><MailOutlineIcon /></InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            required fullWidth
                            label="كلمة المرور" type="password"
                            variant="filled"
                            sx={highContrastTextFieldStyles}
                            margin="normal"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"><LockOpenIcon /></InputAdornment>
                                ),
                            }}
                        />
                        {isRegisterMode && (
                            <TextField
                                required fullWidth
                                label="رمز الدعوة" type="text"
                                variant="filled"
                                sx={highContrastTextFieldStyles}
                                margin="normal"
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
                            sx={{ mt: 3, mb: 2, padding: '12px 0', borderRadius: '12px', fontWeight: 'bold' }}
                        >
                            {isRegisterMode ? 'إنشاء الحساب' : 'دخول'}
                        </Button>
                        <Box textAlign="center">
                            <Link component="button" variant="body2" onClick={handleModeToggle} type="button" sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textShadow: '0px 2px 4px rgba(0,0,0,0.6)'
                            }}>
                                {isRegisterMode
                                    ? "لديك حساب بالفعل؟ سجل الدخول"
                                    : "ليس لديك حساب؟ أنشئ حسابًا جديدًا"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AuthPage;