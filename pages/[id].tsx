import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ArrowBack from '@mui/icons-material/ArrowBack';
import instance from '@/apis';
import {User} from '../domain/user'

// API
import { fetchUserData, updateUserData } from '@/apis/userApi';

// Stores
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateDataError, updateDataStart, updateDataSuccess, updateDataReset } from '../store/actions'

// Form Handler
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {
    user: User,
    access_token: string,
}

const UpdateForm: React.FC<Props> = ({user, access_token}) => {

  const { data, loading, error } = useSelector(state => state);

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(updateDataStart())
    try {
        const response = await updateUserData(router.query.id, values);
        const {statusCode, text, message} = response;
        dispatch(updateDataSuccess(text))
    } catch(e) {
        dispatch(updateDataError(e.message))
    }
  };

  const validationSchema = Yup.object({
    avatar: Yup.string().optional(),
    name: Yup.string().min(3, 'Name must be at least 3 characters long').required('Name field is required'),
    email: Yup.string().email('Invalid email address').required('Email field is required'),
    occupation: Yup.string().min(5, 'Occupation must be at least 5 characters long').required('Occupation field is required'),
    bio: Yup.string().required('Bio field is required'),
    company: Yup.string().required('Company field is required'),
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        formik.setFieldValue('avatar', event.target?.result as string)
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  })

  useEffect(() => {
    if(access_token){
        instance.defaults.headers.common.Authorization = `Bearer ${access_token}`
    }
  }, [access_token])

  useEffect(() => {
    if(data){
        setTimeout(() => {
            router.push('/')
            dispatch(updateDataReset())
        }, 3000)
    }
  }, [data])

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <Box display={'flex'} alignItems={'center'} sx={{pb: 2}}>
            <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
                <ArrowBack />
            </IconButton>
            <Typography variant="h5" gutterBottom>
                Update Profile
            </Typography>
        </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={formik.values.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="avatar-upload"
          type="file"
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-upload">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        margin="normal"
        required
        error={formik.errors.name}
        aria-errormessage={formik.errors.name}
      />
      {formik.errors.name && <Typography variant='p' color={'red'}>{formik.errors.name}</Typography>}
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        margin="normal"
        required
        error={formik.errors.email}
        aria-errormessage={formik.errors.email}
      />
      {formik.errors.email && <Typography variant='p' color={'red'}>{formik.errors.email}</Typography>}
      <TextField
        fullWidth
        label="Occupation"
        name="occupation"
        value={formik.values.occupation}
        onChange={formik.handleChange}
        margin="normal"
        required
        error={formik.errors.occupation}
        aria-errormessage={formik.errors.occupation}
      />
      {formik.errors.occupation && <Typography variant='p' color={'red'}>{formik.errors.occupation}</Typography>}
      <TextField
        fullWidth
        label="Bio"
        name="bio"
        value={formik.values.bio}
        onChange={formik.handleChange}
        margin="normal"
        multiline
        rows={4}
        required
        error={formik.errors.bio}
        aria-errormessage={formik.errors.bio}
      />
      {formik.errors.bio && <Typography variant='p' color={'red'}>{formik.errors.bio}</Typography>}
      <TextField
        fullWidth
        label="Company"
        name="company"
        value={formik.values.company}
        onChange={formik.handleChange}
        margin="normal"
        required
        error={formik.errors.company}
        aria-errormessage={formik.errors.company}
      />
      {formik.errors.company && <Typography variant='p' color={'red'}>{formik.errors.company}</Typography>}
      <Button fullWidth disabled={loading || formik.values === user} type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 4 }}>
        {loading ? "Loading.." : "Update Profile"}
      </Button>
      <Box display="flex" justifyContent={'center'}>
        {data && <Typography variant='p' sx={{width: '100%', textAlign: 'center'}} color={'green'}>Update profile successfull</Typography>}
        {error && <Typography variant='p' sx={{width: '100%', textAlign: 'center'}} color={'red'}>{error}</Typography>}
      </Box>
    </Box>
  );
};

export default UpdateForm;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const response = await fetchUserData(id);
    return {
      props: {
        user: response.data.user,
        access_token: response.data.access_token
      },
    };
  };
