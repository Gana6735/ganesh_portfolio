"use client";

import { useState, useEffect } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { GatekeeperAuth } from '@/components/admin/GatekeeperAuth';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('logged_in_admin');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('logged_in_admin');
    setUser(null);
  };

  if (user) {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return <GatekeeperAuth onAuthSuccess={setUser} />;
}
