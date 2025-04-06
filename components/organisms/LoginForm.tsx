import React from 'react';
import LoginFormGroup from '../molecules/LoginFormGroup';

interface LoginProps {
    email: string;
    password: string;
}

type Props = {
    onSubmit: (payload: LoginProps) => void;
    email: string;
    password: string;
    error: string;
    loading: boolean;
    setEmail: (payload: string) => void;
    setPasswors: (payload: string) => void;
}

const LoginForm: React.FC<Props> = ({onSubmit, email, password, error, loading, setEmail, setPassword}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: 3,
            backgroundColor: '#fff',
            maxWidth: 400,
            margin: '0 auto'
        }}>
            <h2>Login</h2>
            <LoginFormGroup
                email={email}
                password={password}
                error={error}
                loading={loading}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default LoginForm;
