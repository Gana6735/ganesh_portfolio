import { User } from '@/types/portfolio';

export const MASTER_ADMIN: User = {
  id: 'master-sys-01',
  name: 'Master Admin',
  email: 'admin@portfolio.com',
  pin: 'MASTER123!',
  role: 'master',
  status: 'approved'
};

type AuthResult = { success: boolean; message?: string; user?: User };

export const loginUser = (email: string, pin: string): AuthResult => {
  if (typeof window === 'undefined') return { success: false, message: "SSR Error" };

  // 1. Check Master Admin Credentials
  if (email === MASTER_ADMIN.email && pin === MASTER_ADMIN.pin) {
    return { success: true, user: MASTER_ADMIN };
  }

  // 2. Check Other Admins
  const users: User[] = JSON.parse(localStorage.getItem('admins') || '[]');
  const user = users.find((u) => u.email === email && u.pin === pin);

  if (!user) return { success: false, message: "Invalid Credentials" };

  if (user.status === 'pending') {
    return { success: false, message: "Your access request is awaiting approval from the Master Admin." };
  }

  return { success: true, user };
};

export const registerUser = (name: string, email: string, pin: string): AuthResult => {
  if (typeof window === 'undefined') return { success: false, message: "SSR Error" };

  if (email === MASTER_ADMIN.email) {
    return { success: false, message: "Cannot register with the master email." };
  }

  const users: User[] = JSON.parse(localStorage.getItem('admins') || '[]');
  if (users.find((u) => u.email === email)) {
    return { success: false, message: "Email already exists." };
  }

  // All new registrations are standard admins awaiting approval
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    pin,
    role: 'admin',
    status: 'pending'
  };

  users.push(newUser);
  localStorage.setItem('admins', JSON.stringify(users));

  // Return the user so callers can read res.user if needed
  return { success: true, message: "Access Request Sent. Waiting for Master Admin Approval.", user: newUser };
};

