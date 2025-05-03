import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Alert, Button, Snackbar } from '@mui/material';
import { useAppSelector } from '../../../Redux Toolkit/Store';

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleCloseSnackbar = () => setSnackbarOpen(false);
    const { auth } = useAppSelector(store => store);

    useEffect(() => {
        if (auth.otpSent || auth.error) {
            setSnackbarOpen(true);
            console.log("store ", auth.error);
        }
    }, [auth.otpSent, auth.error]);

    return (
        <div className='flex justify-center items-center h-[90vh]'>
            <div className='max-w-md w-full rounded-md border shadow-lg'>
                <img
                    className='w-full rounded-t-md h-36 object-cover'
                    src="CARTIFY.png"
                    alt="Logo"
                />
                <div className='px-10 py-8'>
                    {isLoginPage ? <LoginForm /> : <SignupForm />}

                    <div className='flex items-center gap-1 justify-center mt-5'>
                        <p>{isLoginPage && "Don't"} have Account ?</p>
                        <Button
                            onClick={() => setIsLoginPage(!isLoginPage)}
                            size='small'
                        >
                            {isLoginPage ? "create account" : "login"}
                        </Button>
                    </div>
                </div>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={auth.error ? "error" : "success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {auth.error ? auth.error : "OTP sent to your email!"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Auth;
