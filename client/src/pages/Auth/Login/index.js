import React, { useState, useEffect } from 'react';
import {Container, Card, Form, Button, Spinner} from 'react-bootstrap';
import toast from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router';

import Status from '../../../constants/status';
import { clearStatus, loginAction } from '../../../store/slices/authSlice';


const Login = () => {

    const initialState = {
        email: '',
        password: '',
    }

    const [userDetail, setUserDetail] = useState(initialState);
    const [errors, setErrors] = useState({});

    const {status, error, isLoggedIn} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUserDetail({
            ...userDetail,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const error = {};

        if(userDetail.password === ''){
            error['password'] = 'Password donot match.'
        }

        if(userDetail.email === ''){
            error['email'] = 'Email cannot be empty.'
        }

        if(Object.keys(error).length > 0){
            setErrors(error);
        }else{
            setErrors({});
            dispatch(loginAction(userDetail))
        }

    }

    useEffect(()=>{
        if(status === Status.ERROR){
            toast.error(error || 'Something went wrong.')
        }else if(status===Status.SUCCESS){
            setUserDetail(initialState);
            toast.success('Logged in.');
            // TODO: Clear status to IDLE
            dispatch(clearStatus())
            navigate('/');
        }
    }, [status])

    useEffect(()=>{
        if(isLoggedIn){
            navigate('/')
        }
    }, [isLoggedIn])


    return (
        <Container className='mt-4 d-flex justify-content-center'>
            <Card className='p-3 w-50'>
                <h3 className='text-muted'>Login</h3>
                <hr />
                
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Your Email" value={userDetail.email} onChange={handleInputChange} />
                        {errors.email ? <Form.Text className="text-danger">
                            {errors.email}
                        </Form.Text> : <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name='password' placeholder="Password" value={userDetail.password} onChange={handleInputChange} />
                        {errors.password && <Form.Text className="text-danger">
                            {errors.password}
                        </Form.Text>}
                    </Form.Group>
                    
                    <Button type='submit' variant='primary'>
                        {status === Status.PENDING ? <Spinner size='sm' animation='border'></Spinner> : 'Login'}
                    </Button>
                </Form>

            </Card>
        </Container>
    );
}

export default Login;