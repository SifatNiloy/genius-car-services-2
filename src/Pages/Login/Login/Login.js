import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    let errorElement;
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>

    }
    if (user) {
        navigate(from, { replace: true });
    }
    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(email, password);
    }
    const navigateRegister = event => {
        navigate('/register')
    }
    const resetPassword = async () => {
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        alert('Sent email');
    }
    return (
        <div className='container w-50 mx-auto'>
            <h3 className='text-primary text-center mt-2'>please login</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="primary mx-auto d-block w-50 " type="submit ">
                    Login
                </Button>
            </Form>
            {errorElement}
            <p>new to genius car? <Link to='/register' className='text-danger pe-auto text-decoration-none' onClick={navigateRegister}>please register</Link></p>
            <SocialLogin></SocialLogin>
            <p>forgot password? <Link to='/register' className='text-danger pe-auto text-decoration-none' onClick={resetPassword}>Reset password</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;