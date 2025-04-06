"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

// Form Handling
// import {} from 'formik';
// import * as Yup from 'yup'

// Components
import {LoginForm} from '../../components/organisms'

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await signInWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit} />
  );
}
