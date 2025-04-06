import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const CustomTextField: React.FC<TextFieldProps> = (props) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            {...props}
        />
    );
};

export default CustomTextField;
