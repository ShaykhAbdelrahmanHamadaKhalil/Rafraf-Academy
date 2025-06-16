import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import logo from '../assets/logo.png'; // تأكد من وجود الشعار في هذا المسار

// قائمة رموز الدعوة المؤقتة
const validInvitationCodes = ["QURAN111", "RAFRAF222", "ADMIN333"];

const AuthPage = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setInvitationCode('');
        setError('');
        setSuccess('');
    };

    const handleModeToggle = () => {
        setIsRegisterMode(!isRegisterMode);
        clearForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isRegisterMode) {
            // --- منطق إنشاء الحساب ---
            if (!validInvitationCodes.includes(invitationCode)) {
                setError("رمز الدعوة الذي أدخلته غير صالح.");
                return;
            }
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setSuccess('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
                setIsRegisterMode(false); // العودة لواجهة تسجيل الدخول
            } catch (err) {
                if (err.code === 'auth/email-already-in-use') {
                    setError("هذا البريد الإلكتروني مستخدم بالفعل.");
                } else if (err.code === 'auth/weak-password') {
                    setError("كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.");
                } else {
                    setError("حدث خطأ ما. يرجى المحاولة مرة أخرى.");
                }
            }
        } else {
            // --- منطق تسجيل الدخول ---
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
                <div style={styles.header}>
                    <img src={logo} alt="شعار أكاديمية رفرف" style={styles.logo} />
                    <h1 style={styles.academyName}>أكاديمية رفرف</h1>
                    <p style={styles.tagline}>
                        {isRegisterMode ? 'انضم إلينا لتبدأ رحلتك في تعلم القرآن الكريم' : 'أهلاً بك مجدداً في منصة إدارة التعلم'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.title}>{isRegisterMode ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}</h2>

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
                        {isRegisterMode ? 'إنشاء الحساب' : 'دخول'}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p onClick={handleModeToggle} style={styles.toggleLink}>
                        {isRegisterMode ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'ليس لديك حساب؟ إنشاء حساب جديد'}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- STYLES OBJECT ---
const styles = {
    page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#eef1f4',
        fontFamily: "'Cairo', sans-serif",
        direction: 'rtl',
    },
    card: {
        width: '100%',
        maxWidth: '450px',
        backgroundColor: '#ffffff',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
        margin: '20px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '25px',
    },
    logo: {
        width: '100px',
        height: '100px',
        marginBottom: '15px',
    },
    academyName: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#1a2b4d',
        margin: '0',
    },
    tagline: {
        fontSize: '16px',
        color: '#6c757d',
        margin: '5px 0 0 0',
    },
    form: {
        width: '100%',
    },
    title: {
        fontSize: '22px',
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px',
    },
    inputGroup: {
        marginBottom: '18px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#343a40',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        fontSize: '16px',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.2s',
    },
    footer: {
        textAlign: 'center',
        marginTop: '25px',
    },
    toggleLink: {
        color: '#007bff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    errorMessage: {
        color: '#dc3545',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '15px',
    },
    successMessage: {
        color: '#28a745',
        textAlign: 'center',
        fontSize: '14px',
        marginBottom: '15px',
    }
};

// Add focus style for inputs dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');
    input:focus {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
    button:hover {
        background-color: #0056b3;
    }
`;
document.head.appendChild(styleSheet);


export default AuthPage;