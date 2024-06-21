"use client"

import React from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../apis/userApi';
import { fetchDataStart, fetchDataSuccess, fetchDataError } from '../../store/actions';
import { useRouter } from 'next/navigation'

const UpdateButton: React.FC = ({id}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/user/${id}`)
    };

    return (
        <Button variant='contained' onClick={handleClick}>
            Edit
        </Button>
    );
};

export default UpdateButton;
