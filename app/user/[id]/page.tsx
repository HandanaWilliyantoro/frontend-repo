'use client'

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { GetServerSideProps } from 'next';
import ArrowBack from '@mui/icons-material/ArrowBack';
import instance from 'app/apis';
import {User} from '@/domain/user'
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/app/components';

// API
import { fetchUserData, updateUserData } from '../../apis/userApi';

// Stores
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateDataError, updateDataStart, updateDataSuccess, updateDataReset } from '../../../store/actions'

// Form Handler
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {
    user: User,
    access_token: string,
}

const UpdateForm: React.FC<Props> = () => {
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');

  const {id} = useParams<{ id: string }>() 
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(state => state);

  const handleFetchUserDetail = async (id: string) => {
    try {
      if(id){
        const response = await fetchUserData(id);
        if(response.statusCode === 200){
          setUserData({
            user: response.data.user,
            access_token: response.data.access_token
          });
        } else {
          console.log('Failed to fetch user detail: ', response.text)
        }
      }
    } catch(e) {
      console.log('Error: ', e.message)
    }
  } 

  useEffect(() => {
    if(id){
      handleFetchUserDetail(id);
    }
  }, [id]);

  const onSubmit = async (values) => {
    dispatch(updateDataStart())
    try {
        const response = await updateUserData(id, values);
        const {statusCode, text, message} = response;
        dispatch(updateDataSuccess(text))
    } catch(e) {
        dispatch(updateDataError(e.message))
    } finally {
      setTimeout(async () => {
        await dispatch(updateDataReset())
        router.push('/')
      }, 3000)
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
    initialValues: {
      avatar: userData?.user?.avatar ?? '',
      name: userData?.user?.name ?? '',
      email: userData?.user?.email ?? '',
      occupation: userData?.user?.occupation ?? '',
      bio: userData?.user?.bio ?? '',
      company: userData?.user?.company ?? '',
    },
    validationSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
  })

  return (
    <ProtectedRoute>
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
          <Avatar src={formik?.values?.avatar ?? ''} sx={{ width: 56, height: 56, mr: 2 }} />
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
          value={formik?.values?.name ?? ''}
          onChange={formik.handleChange}
          margin="normal"
          required
          error={!!formik.errors.name}
          aria-errormessage={formik.errors.name}
        />
        {formik.errors.name && <Typography variant='body2' color={'red'}>{formik.errors.name}</Typography>}
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formik?.values?.email ?? ''}
          onChange={formik.handleChange}
          margin="normal"
          required
          error={!!formik.errors.email}
          aria-errormessage={formik.errors.email}
        />
        {formik.errors.email && <Typography variant='body2' color={'red'}>{formik.errors.email}</Typography>}
        <TextField
          fullWidth
          label="Occupation"
          name="occupation"
          value={formik?.values?.occupation ?? ''}
          onChange={formik.handleChange}
          margin="normal"
          required
          error={!!formik.errors.occupation}
          aria-errormessage={formik.errors.occupation}
        />
        {formik.errors.occupation && <Typography variant='body2' color={'red'}>{formik.errors.occupation}</Typography>}
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={formik?.values?.bio ?? ''}
          onChange={formik.handleChange}
          margin="normal"
          multiline
          rows={4}
          required
          error={!!formik.errors.bio}
          aria-errormessage={formik.errors.bio}
        />
        {formik.errors.bio && <Typography variant='body2' color={'red'}>{formik.errors.bio}</Typography>}
        <TextField
          fullWidth
          label="Company"
          name="company"
          value={formik?.values?.company ?? ''}
          onChange={formik.handleChange}
          margin="normal"
          required
          error={!!formik.errors.company}
          aria-errormessage={formik.errors.company}
        />
        {formik.errors.company && <Typography variant='body2' color={'red'}>{formik.errors.company}</Typography>}
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 4 }}>
          {loading ? "Loading.." : "Update Profile"}
        </Button>
        <Box display="flex" justifyContent={'center'}>
          {data && <Typography variant='body2' sx={{width: '100%', textAlign: 'center'}} color={'green'}>Update profile successful</Typography>}
          {error && <Typography variant='body2' sx={{width: '100%', textAlign: 'center'}} color={'red'}>{error}</Typography>}
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default UpdateForm;
