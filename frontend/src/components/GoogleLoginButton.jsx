import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import './GoogleLoginButton.css';

const GoogleLoginButton = ({ onSuccess, onError }) => {
    const { login } = useAuth();
    const [googleError, setGoogleError] = useState(false);

    const handleSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
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
        console.warn('Google Login unavailable — origin may not be configured in Google Cloud Console.');
        setGoogleError(true);
        // Don't call onError here to avoid showing a scary error to the user
    };

    // If Google Login failed to initialize (wrong origin), hide it silently
    if (googleError) {
        return null;
    }

    return (
        <div className="google-login-container">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="filled_blue"
                size="large"
                text="continue_with"
                shape="rectangular"
                width="300"
            />
        </div>
    );
};

export default GoogleLoginButton;
