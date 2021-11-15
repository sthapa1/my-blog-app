import React, { useState } from 'react';
import {Container, Card, Form, Button} from 'react-bootstrap';

const Login = () => {

    const initialState = {
        email: '',
        password: '',
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
            console.log(userDetail);
        }

    }

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
                    
                    <Button type='submit' variant='primary'>Login</Button>
                </Form>

            </Card>
        </Container>
    );
}

export default Login;