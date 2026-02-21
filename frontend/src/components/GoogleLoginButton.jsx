import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import './GoogleLoginButton.css';

const GoogleLoginButton = ({ onSuccess, onError }) => {
    const { login } = useAuth();

    const handleSuccess = async (credentialResponse) => {
        try {
            // Decode the JWT credential to get user info
            const decoded = jwtDecode(credentialResponse.credential);

            // Send to backend
            const user = await login(decoded);

            if (onSuccess) {
                onSuccess(user);
            }
        } catch (error) {
            console.error('Login failed:', error);
            if (onError) {
                onError(error);
            }
        }
    };

    const handleError = () => {
        console.error('Google Login Failed');
        if (onError) {
            onError(new Error('Google Login Failed'));
        }
    };

    return (
        <div className="google-login-container">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
                theme="filled_blue"
                size="large"
                text="continue_with"
                shape="rectangular"
            />
        </div>
    );
};

export default GoogleLoginButton;
