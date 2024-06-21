"use client";

import React, {useState} from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'app/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [registerError, setRegisterError] = useState('');

  const { register } = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    bio: Yup.string().required('Bio is required'),
    role: Yup.string().required('Role is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    ,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      bio: '',
      role: '', // Default empty value for role
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { name, bio, role, email, password } = values;
      try {
        const response = await register(email, password, name, bio, role);
        if(response){
          router.push('/')
        } else {
          setRegisterError('Email already registered')
        }
      } catch (error) {
        console.error('Registration Error: ', error.message);
        // Handle error state in your UI if needed
      } finally {
        setSubmitting(false);
      }
    },
    validateOnChange: true,
    validateOnBlur: true
  });

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          type="text"
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
        <TextField
          fullWidth
          id="bio"
          name="bio"
          label="Bio"
          type="text"
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bio}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio && formik.errors.bio}
          required
        />
        <FormControl fullWidth margin="normal" error={formik.touched.role && Boolean(formik.errors.role)}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          {formik.touched.role && formik.errors.role && (
            <Typography variant="caption" color="error">
              {formik.errors.role}
            </Typography>
          )}
        </FormControl>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={formik.isSubmitting}
          sx={{ mt: 2, py: 2 }}
          disabled={Object.values(formik.errors)?.length > 0}
        >
          Register
        </Button>
        {registerError && (
          <Typography color="error" className="py-4 text-center">
              {registerError}
          </Typography>
        )}
        <Typography sx={{mt: 4}} color={'blue'} onClick={() => router.push('/login')} variant="body2" className="text-center cursor-pointer">
          Already have an account?{' '}
        </Typography>
      </form>
    </Box>
  );
};

export default Register;
