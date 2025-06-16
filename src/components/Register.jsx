// src/components/Register.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // <-- الخطوة 1: استيراد الشعار

const validInvitationCodes = ["QURAN111", "RAFRAF222", "ADMIN333"];

function Register() {
  // ... (state variables are unchanged) ...
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // ... (rest of the function is unchanged) ...
    setError(null);
    setSuccess('');
    if (!validInvitationCodes.includes(invitationCode)) {
      setError("رمز الدعوة الذي أدخلته غير صالح.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("تم إنشاء حسابك بنجاح! سيتم توجيهك لصفحة تسجيل الدخول.");
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("هذا البريد الإلكتروني مستخدم بالفعل.");
      } else if (error.code === 'auth/weak-password') {
        setError("كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.");
      } else {
        setError("حدث خطأ ما. يرجى المحاولة مرة أخرى.");
      }
      console.error("Error registering:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>

        {/* -- العناصر الجديدة -- */}
        <div style={styles.header}>
          <img src={logo} alt="شعار أكاديمية رفرف" style={styles.logo} />
          <h1 style={styles.academyName}>أكاديمية رفرف</h1>
          <p style={styles.welcomeMessage}>انضم إلينا لتبدأ رحلتك في تعلم القرآن الكريم</p>
        </div>
        {/* -- نهاية العناصر الجديدة -- */}

        <h2 style={styles.title}>إنشاء حساب جديد</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          {/* ... (form inputs are unchanged) ... */}
           <div style={styles.inputGroup}>
            <label style={styles.label}>البريد الإلكتروني</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>كلمة المرور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>رمز الدعوة</label>
            <input type="text" value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} required style={styles.input} />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <button type="submit" style={styles.button}>إنشاء حساب</button>
        </form>
        <p style={styles.footerText}>
          لديك حساب بالفعل؟{' '}
          <Link to="/" style={styles.link}>
            سجل الدخول من هنا
          </Link>
        </p>
      </div>
    </div>
  );
}

// Using the same styles object from Login component for consistency
// You can copy the 'styles' object from the Login.jsx file above
// Or define it again here. Here it is for convenience:
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Arial, sans-serif', padding: '20px 0' },
    formContainer: { padding: '40px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    header: { marginBottom: '20px' },
    logo: { width: '80px', height: '80px', marginBottom: '10px' },
    academyName: { fontSize: '28px', color: '#005b96', margin: '0 0 5px 0' },
    welcomeMessage: { fontSize: '16px', color: '#666', marginBottom: '20px' },
    title: { marginBottom: '24px', fontSize: '22px', color: '#333', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' },
    form: { display: 'flex', flexDirection: 'column', textAlign: 'right' },
    inputGroup: { marginBottom: '16px' },
    label: { display: 'block', marginBottom: '8px', color: '#555', fontSize: '14px' },
    input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box', textAlign: 'right' },
    button: { padding: '12px', backgroundColor: '#28a745', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
    error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
    success: { color: 'green', textAlign: 'center', marginBottom: '10px' },
    footerText: { marginTop: '20px', textAlign: 'center', color: '#555' },
    link: { color: '#007bff', textDecoration: 'none' }
};

export default Register;