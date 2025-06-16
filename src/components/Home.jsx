// src/components/Home.jsx
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to auth page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // --- استخدام نفس لوحة الألوان ---
  const PALETTE = {
    green: '#5a8a38',
    greenDark: '#4a7729',
    black: '#2d2d2d',
    lightGrey: '#f8f9fa',
    white: '#ffffff',
  };

  const styles = {
    page: {
      backgroundColor: PALETTE.lightGrey,
      minHeight: '100vh',
      fontFamily: "'Cairo', sans-serif",
      direction: 'rtl',
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center',
    },
    title: {
      color: PALETTE.black,
      fontSize: '36px',
      marginBottom: '15px',
    },
    welcomeText: {
        color: PALETTE.black,
        fontSize: '18px',
        marginBottom: '30px',
    },
    logoutButton: {
      padding: '12px 30px',
      backgroundColor: PALETTE.green,
      color: PALETTE.white,
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    }
  };

  return (
    <div style={styles.page}>
        <div style={styles.container}>
            <h1 style={styles.title}>لوحة تحكم أكاديمية رفرف</h1>
            {user && <p style={styles.welcomeText}>أهلاً بك، {user.email}</p>}
            <button 
                style={styles.logoutButton} 
                onClick={handleLogout}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = PALETTE.greenDark}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = PALETTE.green}
            >
                تسجيل الخروج
            </button>
        </div>
    </div>
  );
}

export default Home;