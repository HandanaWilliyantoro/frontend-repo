import React from 'react';
import CustomTextField from '../atoms/TextField';
import CustomButton from '../atoms/Button';

// Components
import ErrorMessage from '../atoms/ErrorMessage';

interface LoginFormGroupProps {
    email: string;
    password: string;
    error: string | null;
    loading: boolean;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginFormGroup: React.FC<LoginFormGroupProps> = ({
    email,
    password,
    error,
    loading,
    onEmailChange,
    onPasswordChange,
    onSubmit,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <CustomTextField
                label="Email"
                value={email}
                onChange={onEmailChange}
                type="email"
                required
            />
            <CustomTextField
                label="Password"
                value={password}
                onChange={onPasswordChange}
                type="password"
                required
            />
            {error && <ErrorMessage message={error} />}
            <CustomButton type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </CustomButton>
        </form>
    );
};

export default LoginFormGroup;
