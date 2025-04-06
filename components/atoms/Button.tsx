import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const CustomButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: '8px' }}
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default CustomButton;
