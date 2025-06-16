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
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <h1>أهلاً بك في لوحة تحكم أكاديمية رفرف</h1>
      {user && <p>تم تسجيل دخولك باستخدام: {user.email}</p>}
      <button onClick={handleLogout}>تسجيل الخروج</button>
    </div>
  );
}

export default Home;