'use client';

import { jwtDecode } from 'jwt-decode';

interface MyTokenPayload {
  email: string;
}

const GetUserEmail = (): string | null => {
  if (typeof window === 'undefined') return null; 

  const token = window.localStorage.getItem('token');  

  if (token) {
    try {
      const decodedToken = jwtDecode<MyTokenPayload>(token);
      return decodedToken.email || null;
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  return null;
};

export default GetUserEmail;
