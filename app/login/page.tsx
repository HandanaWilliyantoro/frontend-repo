'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'app/hooks/useAuth';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.push('/'); // Redirect authenticated users to the dashboard or any other page
    }
  }, [router]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values.email, values.password);
      if(response){
        router.push('/')
      } else {
        setLoginError('Login failed. Please check your email and password and try again.');
        console.error(error);
      }
    } catch (error) {
      setLoginError('Login failed. Please check your email and password and try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" className="flex flex-col items-center justify-center h-screen">
      <Box className="bg-white p-8 rounded-lg w-full mt-auto mb-auto">
        <Typography variant="h4" className="py-6 text-center">Login</Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
          validateOnMount
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col space-y-4">
              <Field name="email">
                {({ field, meta }) => (
                  <TextField
                    type="email"
                    label="Email"
                    {...field}
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, meta }) => (
                  <TextField
                    type="password"
                    label="Password"
                    {...field}
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting || Object.values(errors)?.length > 0}
              >
                Login
              </Button>
              {loginError && (
                <Typography color="error" className="pt-4 text-center">
                    {loginError}
                </Typography>
              )}
              <Typography color={'blue'} onClick={() => router.push('/register')} variant="body2" className="text-center pt-2 cursor-pointer">
                Don't have an account?{' '}
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
