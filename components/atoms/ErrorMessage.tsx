import React from 'react';
import { Typography } from '@mui/material';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Typography color="error">
            {message}
        </Typography>
    );
};

export default ErrorMessage;
