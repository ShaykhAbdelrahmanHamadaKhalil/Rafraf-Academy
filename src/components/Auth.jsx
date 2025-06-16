import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import logo from '../assets/logo.png'; // <-- تم التحديث إلى .jpg

const validInvitationCodes = ["QURAN111", "RAFRAF222", "ADMIN333"];

const AuthPage = () => {
    // --- المنطق لم يتغير ---
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const clearForm = () => {
        setEmail(''); setPassword(''); setInvitationCode(''); setError(''); setSuccess('');
    };
    const handleModeToggle = () => {
        setIsRegisterMode(!isRegisterMode);
        clearForm();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        if (isRegisterMode) {
            if (!validInvitationCodes.includes(invitationCode)) {
                setError("رمز الدعوة الذي أدخلته غير صالح."); return;
            }
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
        <div style={styles.page}>
            <div style={styles.card}>
                {/* --- القسم الأيمن (قسم النموذج) --- */}
                <div style={styles.formPanel}>
                    <h1 style={styles.academyName}>أكاديمية رفرف</h1>
                    <p style={styles.tagline}>
                        {isRegisterMode ? 'انضم إلينا لتبدأ رحلتك في تعلم القرآن' : 'أهلاً بك في منصة إدارة التعلم'}
                    </p>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        {success && <p style={styles.successMessage}>{success}</p>}
                        <div style={styles.inputGroup}>
                            <label htmlFor="email" style={styles.label}>البريد الإلكتروني</label>
                            <input id="email" type="email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="password" style={styles.label}>كلمة المرور</label>
                            <input id="password" type="password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {isRegisterMode && (
                            <div style={styles.inputGroup}>
                                <label htmlFor="inviteCode" style={styles.label}>رمز الدعوة</label>
                                <input id="inviteCode" type="text" style={styles.input} value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} required />
                            </div>
                        )}
                        {error && <p style={styles.errorMessage}>{error}</p>}
                        <button type="submit" style={styles.button}>
                            {isRegisterMode ? 'إنشاء الحساب' : 'تسجيل الدخول'}
                        </button>
                    </form>
                    <div style={styles.footer}>
                        <p onClick={handleModeToggle} style={styles.toggleLink}>
                            {isRegisterMode ? 'لديك حساب بالفعل؟ سجل الدخول' : 'ليس لديك حساب؟ أنشئ حسابًا جديدًا'}
                        </p>
                    </div>
                </div>
                {/* --- القسم الأيسر (قسم الشعار) --- */}
                <div style={styles.logoPanel}>
                    <img src={logo} alt="شعار أكاديمية رفرف" style={styles.logo} />
                </div>
            </div>
        </div>
    );
};

// --- الأنماط المحدثة بألوان الشعار ---
const PALETTE = {
    green: '#5a8a38', // اللون الأخضر من الشعار
    greenDark: '#4a7729', // درجة أغمق للتأثيرات
    black: '#2d2d2d', // اللون الأسود/الداكن من الشعار
    grey: '#6c757d', // رمادي للنصوص الثانوية
    lightGrey: '#f8f9fa', // خلفية الصفحة
    white: '#ffffff',
    error: '#dc3545',
    success: '#28a745',
};

const styles = {
    page: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
        backgroundColor: PALETTE.lightGrey,
        fontFamily: "'Cairo', sans-serif",
    },
    card: {
        display: 'flex', flexDirection: 'row-reverse', width: '100%', maxWidth: '900px',
        minHeight: '600px', backgroundColor: PALETTE.white, borderRadius: '15px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)', overflow: 'hidden', margin: '20px',
    },
    formPanel: {
        flex: 1.2, padding: '40px 50px', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', direction: 'rtl',
    },
    academyName: {
        fontSize: '32px', fontWeight: '700', color: PALETTE.black,
        textAlign: 'center', marginBottom: '10px',
    },
    tagline: {
        fontSize: '16px', color: PALETTE.grey, textAlign: 'center', marginBottom: '30px',
    },
    form: { width: '100%' },
    inputGroup: { marginBottom: '20px' },
    label: {
        display: 'block', marginBottom: '8px', fontSize: '14px',
        color: PALETTE.black, fontWeight: '600',
    },
    input: {
        width: '100%', padding: '12px 15px', border: '1px solid #ced4da',
        borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box',
    },
    button: {
        width: '100%', padding: '14px', backgroundColor: PALETTE.green,
        color: PALETTE.white, border: 'none', borderRadius: '8px',
        fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px',
        transition: 'background-color 0.2s',
    },
    footer: { textAlign: 'center', marginTop: '25px' },
    toggleLink: {
        color: PALETTE.green, cursor: 'pointer', fontSize: '14px', fontWeight: '600',
    },
    errorMessage: {
        color: PALETTE.error, textAlign: 'center', fontSize: '14px', marginTop: '15px',
    },
    successMessage: {
        color: PALETTE.success, textAlign: 'center', fontSize: '14px', marginBottom: '15px',
    },
    logoPanel: {
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
        background: `linear-gradient(to bottom, ${PALETTE.green}, ${PALETTE.greenDark})`,
        padding: '40px',
    },
    logo: {
        maxWidth: '80%', maxHeight: '80%', objectFit: 'contain',
    },
};

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
    input:focus {
        outline: none;
        border-color: ${PALETTE.green};
        box-shadow: 0 0 0 3px rgba(90, 138, 56, 0.25);
    }
    button:hover {
        background-color: ${PALETTE.greenDark};
    }
`;
document.head.appendChild(styleSheet);

export default AuthPage;