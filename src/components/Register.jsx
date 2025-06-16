// src/components/Register.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

// For now, we will hardcode the valid invitation codes.
// Later, we will manage these in the Firestore database.
const validInvitationCodes = ["QURAN111", "RAFRAF222", "ADMIN333"];

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess('');

    // Step 1: Validate the invitation code
    if (!validInvitationCodes.includes(invitationCode)) {
      setError("رمز الدعوة الذي أدخلته غير صالح.");
      return;
    }

    // Step 2: Create user with email and password
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("تم إنشاء حسابك بنجاح! سيتم توجيهك لصفحة تسجيل الدخول.");
      // In a real app, you might want to "consume" the invitation code here.
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect to login after 3 seconds
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
        <h2 style={styles.title}>إنشاء حساب جديد</h2>
        <form onSubmit={handleRegister} style={styles.form}>
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
          <button type="submit" style={styles.button}>
            إنشاء حساب
          </button>
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

// Reusing styles from Login for consistency
const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
      padding: '20px 0',
    },
    formContainer: {
      padding: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'right',
    },
    title: {
      marginBottom: '24px',
      fontSize: '24px',
      color: '#333',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#555',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      boxSizing: 'border-box',
      textAlign: 'right',
    },
    button: {
      padding: '12px',
      backgroundColor: '#28a745', // Green color for register
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '10px',
    },
    success: {
        color: 'green',
        textAlign: 'center',
        marginBottom: '10px',
    },
    footerText: {
      marginTop: '20px',
      textAlign: 'center',
      color: '#555',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
  };

export default Register;