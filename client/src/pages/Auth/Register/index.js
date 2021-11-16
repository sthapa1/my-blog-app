import React, { useEffect, useState } from 'react';
import {Container, Card, Form, Button, Spinner} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router';
import Status from '../../../constants/status';
import { clearStatus, registerAction } from '../../../store/slices/authSlice';
import { toast } from 'react-hot-toast';

const Register = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, error, isLoggedIn} = useSelector(state=>state.auth);

    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: '',
    }

    const [userDetail, setUserDetail] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setUserDetail({
            ...userDetail,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const error = {};

        if(userDetail.password !== userDetail.confirmPassword){
            error['passwordMatch'] = 'Password donot match.'
        }

        if(userDetail.email === ''){
            error['email'] = 'Email cannot be empty.'
        }

        if(Object.keys(error).length > 0){
            setErrors(error);
        }else{
            setErrors({});
            const {confirmPassword, ...payload} = userDetail;
            dispatch(registerAction(payload));
        }

    }

    useEffect(()=>{
        if(status === Status.ERROR){
            toast.error(error || 'Something went wrong.')
        }else if(status===Status.SUCCESS){
            setUserDetail(initialState);
            toast.success('User registered successfully.');
            // TODO: Clear status to IDLE
            dispatch(clearStatus())
            navigate('/login');
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
                <h3 className='text-muted'>Register</h3>
                <hr />
                
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name='firstname' placeholder="Enter your first name." value={userDetail.firstname} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name='lastname' placeholder="Enter your last name." value={userDetail.lastname} onChange={handleInputChange}  />
                    </Form.Group>
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
                        {errors.passwordMatch && <Form.Text className="text-danger">
                            {errors.passwordMatch}
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" name='confirmPassword' placeholder="Confirm Password" value={userDetail.confirmPassword} onChange={handleInputChange} />
                        {errors.passwordMatch && <Form.Text className="text-danger">
                            {errors.passwordMatch}
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Upload Profile</Form.Label>
                        <Form.Control type="file" name='profilePic' />
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        {status === Status.PENDING ? <Spinner size='sm' animation='border'></Spinner> : 'Register'}
                    </Button>
                </Form>

            </Card>
        </Container>
    );
}

export default Register;