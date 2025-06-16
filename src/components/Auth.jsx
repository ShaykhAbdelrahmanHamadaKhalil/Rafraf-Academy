import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import logo from '../assets/logo.png';

// For now, we will hardcode the valid invitation codes.
const validInvitationCodes = ["QURAN111", "RAFRAF222", "ADMIN333"];

const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Clear fields and messages when switching modes
        setEmail('');
        setPassword('');
        setInvitationCode('');
        setError('');
        setSuccess('');
    }, [isSignUp]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (err) {
            setError('فشل تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.');
            console.error(err);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validInvitationCodes.includes(invitationCode)) {
            setError("رمز الدعوة الذي أدخلته غير صالح.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
            setIsSignUp(false); // Switch to login form after successful registration
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("هذا البريد الإلكتروني مستخدم بالفعل.");
            } else if (err.code === 'auth/weak-password') {
                setError("كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.");
            } else {
                setError("حدث خطأ ما. يرجى المحاولة مرة أخرى.");
            }
            console.error(err);
        }
    };
    
    const containerClass = isSignUp ? "right-panel-active" : "";

    return (
        <div style={styles.body}>
            <div style={styles.container} className={containerClass} id="container">
                {/* Sign Up Form */}
                <div style={{ ...styles.formContainer, ...styles.signUpContainer }} className="sign-up-container">
                    <form style={styles.form} onSubmit={handleSignUp}>
                        <h1 style={styles.h1}>إنشاء حساب</h1>
                        <input style={styles.input} type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input style={styles.input} type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input style={styles.input} type="text" placeholder="رمز الدعوة" value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} required />
                        {error && isSignUp && <p style={styles.errorMessage}>{error}</p>}
                        {success && !isSignUp && <p style={styles.successMessage}>{success}</p>}
                        <button style={styles.button} type="submit">إنشاء حساب</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div style={{ ...styles.formContainer, ...styles.signInContainer }} className="sign-in-container">
                    <form style={styles.form} onSubmit={handleLogin}>
                        <h1 style={styles.h1}>تسجيل الدخول</h1>
                         {success && <p style={styles.successMessage}>{success}</p>}
                        <input style={styles.input} type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input style={styles.input} type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {error && !isSignUp && <p style={styles.errorMessage}>{error}</p>}
                        <button style={styles.button} type="submit">دخول</button>
                    </form>
                </div>

                {/* Overlay Panels */}
                <div style={styles.overlayContainer} className="overlay-container">
                    <div style={styles.overlay} className="overlay">
                        <div style={{ ...styles.overlayPanel, ...styles.overlayLeft }} className="overlay-left">
                            <img src={logo} alt="شعار أكاديمية رفرف" style={styles.logo} />
                            <h1 style={styles.h1}>أهلاً بك مجدداً!</h1>
                            <p style={styles.p}>لتسجيل الدخول وإدارة حسابك، يرجى إدخال بياناتك</p>
                            <button style={{...styles.button, ...styles.ghost}} onClick={() => setIsSignUp(false)}>تسجيل الدخول</button>
                        </div>
                        <div style={{ ...styles.overlayPanel, ...styles.overlayRight }} className="overlay-right">
                            <img src={logo} alt="شعار أكاديمية رفرف" style={styles.logo} />
                            <h1 style={styles.h1}>مرحباً بك في رفرف!</h1>
                            <p style={styles.p}>انضم إلينا لتبدأ رحلتك في تعلم وإدارة حلقات القرآن الكريم</p>
                            <button style={{...styles.button, ...styles.ghost}} onClick={() => setIsSignUp(true)}>إنشاء حساب جديد</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* We need to add CSS for the animations manually */}
            <style>{`
                .container {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.6s ease-in-out;
                }
                .form-container {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    transition: all 0.6s ease-in-out;
                }
                .sign-in-container {
                    left: 0;
                    width: 50%;
                    z-index: 2;
                }
                .sign-up-container {
                    left: 0;
                    width: 50%;
                    opacity: 0;
                    z-index: 1;
                }
                .overlay-container {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 50%;
                    height: 100%;
                    overflow: hidden;
                    transition: transform 0.6s ease-in-out;
                    z-index: 100;
                }
                .overlay {
                    background: #005b96;
                    background: linear-gradient(to right, #007bff, #005b96);
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: 0 0;
                    color: #FFFFFF;
                    position: relative;
                    left: -100%;
                    height: 100%;
                    width: 200%;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                }
                .overlay-panel {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0 40px;
                    text-align: center;
                    top: 0;
                    height: 100%;
                    width: 50%;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                }
                .overlay-left {
                    transform: translateX(-20%);
                }
                .overlay-right {
                    right: 0;
                    transform: translateX(0);
                }
                /* Animations for panel sliding */
                .container.right-panel-active .sign-in-container {
                    transform: translateX(100%);
                }
                .container.right-panel-active .sign-up-container {
                    transform: translateX(100%);
                    opacity: 1;
                    z-index: 5;
                    animation: show 0.6s;
                }
                @keyframes show {
                    0%, 49.99% { opacity: 0; z-index: 1; }
                    50%, 100% { opacity: 1; z-index: 5; }
                }
                .container.right-panel-active .overlay-container {
                    transform: translateX(-100%);
                }
                .container.right-panel-active .overlay {
                    transform: translateX(50%);
                }
                .container.right-panel-active .overlay-left {
                    transform: translateX(0);
                }
                .container.right-panel-active .overlay-right {
                    transform: translateX(20%);
                }
            `}</style>
        </div>
    );
};

// --- STYLES OBJECT ---
const styles = {
    body: {
        background: '#f6f5f7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: "'Cairo', sans-serif", // Using Cairo for a better Arabic font
        height: '100vh',
        margin: '-20px 0 50px'
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        position: 'relative',
        overflow: 'hidden',
        width: '768px',
        maxWidth: '100%',
        minHeight: '520px',
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 50px',
        backgroundColor: '#ffffff'
    },
    signInContainer: {},
    signUpContainer: {},
    form: {
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 50px',
        height: '100%',
        textAlign: 'center',
        width: '100%'
    },
    h1: {
        fontWeight: 'bold',
        margin: '0',
        color: 'inherit'
    },
    p: {
        fontSize: '14px',
        fontWeight: '100',
        lineHeight: '20px',
        letterSpacing: '0.5px',
        margin: '20px 0 30px',
    },

    input: {
        backgroundColor: '#eee',
        border: 'none',
        padding: '12px 15px',
        margin: '8px 0',
        width: '100%',
        textAlign: 'right',
        borderRadius: '5px',
        direction: 'rtl',
    },
    button: {
        borderRadius: '20px',
        border: '1px solid #007bff',
        backgroundColor: '#007bff',
        color: '#FFFFFF',
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '12px 45px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        transition: 'transform 80ms ease-in',
        cursor: 'pointer',
        marginTop: '10px'
    },
    ghost: {
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF'
    },
    overlayContainer: {},
    overlay: {},
    overlayPanel: {},
    overlayLeft: {},
    overlayRight: {},
    logo: {
        width: '120px',
        height: '120px',
        marginBottom: '20px',
    },
    errorMessage: {
        color: 'red',
        fontSize: '14px',
        marginTop: '10px',
    },
    successMessage: {
        color: 'green',
        fontSize: '14px',
        marginTop: '10px',
    }
};

export default AuthPage;