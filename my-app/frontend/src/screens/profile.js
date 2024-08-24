import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Profile() {
    const userId = 1;

    const [currentPwVisible, setCurrentPwVisible] = useState(false);
    const [newPwVisible, setNewPwVisible] = useState(false);
    const [confirmPwVisible, setConfirmPwVisible] = useState(false);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const toggleCurrentPw = () => {
        if (currentPwVisible === false) {
            setCurrentPwVisible(true);
        } else {
            setCurrentPwVisible(false);
        }
    }
    const toggleNewPw = () => {
        if (newPwVisible === false) {
            setNewPwVisible(true);
        } else {
            setNewPwVisible(false);
        }
    }
    const toggleConfirmPw = () => {
        if (confirmPwVisible === false) {
            setConfirmPwVisible(true);
        } else {
            setConfirmPwVisible(false);
        }
    }

    const handleInput = async (event) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'currentPassword':
                setCurrentPassword(value);
                break;
            case 'newPassword':
                setNewPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
        }
    }
    const editUserDetails = async (event) => {
        event.preventDefault();
        await axios.put('http://localhost:8000/editUser/' + userId, {
            username: username,
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => {
            console.error('There was an update error!', err);
        })
    }

    const getOneUser = async () => {
        await axios.get('http://localhost:8000/user/' + userId)
        .then(res => {
            setUsername(res.data[0].user_name);
            setEmail(res.data[0].email);
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }

    useEffect(() => {
        getOneUser();
    }, []);

    return(
        <>
        <Navbar variant='dark' expand="lg" className='navbar'>
            <Navbar.Toggle className='ms-auto' aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/" className='active'>Home</Nav.Link>
                    <Nav.Link href="/topics">Topics</Nav.Link>
                </Nav>
                <Form>
                    <Button href='#' variant="outline-light" className='me-2'>Login</Button>
                    <Button href='#' variant="primary" className='me-2'>Sign out</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        
        <Container fluid className='mt-5'>
            <Row className='d-flex w-100 justify-content-center'>
                <Col xs={12} sm={6} md={8}>
                    <h1>Profile</h1>
                    <Form onSubmit={editUserDetails}>
                        <Form.Group className='mb-4'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control id='username' name='username' type='text' defaultValue={username} onChange={handleInput} />
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control id='email' name='email' type='email' defaultValue={email} onChange={handleInput} />
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label>Current Password</Form.Label>
                            <InputGroup className='mb-2'>
                                <Form.Control id='currentPassword' name='currentPassword' type={(currentPwVisible) ? "text" : "password"} onChange={handleInput} />
                                <Button variant='secondary' type='button' onClick={toggleCurrentPw}>
                                    {currentPwVisible ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputGroup>

                            <Form.Label>New Password</Form.Label>
                            <InputGroup className='mb-2'>
                                <Form.Control id='newPassword' name='newPassword' type={(newPwVisible) ? "text" : "password"} onChange={handleInput} />
                                <Button variant='secondary' type='button' onClick={toggleNewPw}>
                                    {newPwVisible ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputGroup>

                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup className='mb-2'>
                                <Form.Control id='confirmPassword' name='confirmPassword' type={(confirmPwVisible) ? "text" : "password"} onChange={handleInput} />
                                <Button variant='secondary' type='button' onClick={toggleConfirmPw}>
                                    {confirmPwVisible ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Button variant='primary' type='submit'>Save Changes</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Profile;