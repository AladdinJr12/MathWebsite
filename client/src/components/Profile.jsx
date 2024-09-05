
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//---For transitioning to other pages----//
import { useNavigate } from 'react-router-dom';


export default function Profile() {

    const navigate = useNavigate();
    const handleBackBtnSubmit = () => {
        //----So as to navigate to the QuestionsPage route and getting the selected topic's name--------//
        navigate('/');
    };

    //--- The userId we are targetting----//
    const [userId, setUserId] = useState(1); 

    const [currentPwVisible, setCurrentPwVisible] = useState(false);
    const [newPwVisible, setNewPwVisible] = useState(false);
    const [confirmPwVisible, setConfirmPwVisible] = useState(false);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();


    //----Changing the userid to the logined user's id----//
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(parseInt(storedUserId, 10)); //--Parse it as an integer---//
        }
    }, []);

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
        
        const passwordMsg = document.getElementById('password-message');
        if (newPassword !== confirmPassword) {
            passwordMsg.classList.add('alert', 'alert-danger');
            passwordMsg.innerHTML = "Confirm Password must match New Password.";
            return;
        }

        await axios.put('http://localhost:3000/editUser/' + userId, {
            username: username,
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })
        .then(res => {
            console.log(res);
            window.location.reload();
            alert('Changes saved!');
        })
        .catch(err => {
            console.error('There was an update error!', err);
        })
    }

    const getOneUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/${userId}`);

            //----Filling up the users login username and email.
            if (response.data) {
                setUsername(response.data.user_name);
                setEmail(response.data.email);
            } else {
                console.error('No user data found');
            }
        } catch (err) {
            console.error('There was an error!', err);
        }
    };

    useEffect(() => {
        getOneUser();
    }, [userId]);

    return(
        <div className='ProfileDiv' >
        <Container fluid className='mt-5 profileSect'>
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

                        <div id='password-message'></div>

                        <Button className='profilePageBtn' type='submit'>Save Changes</Button>
                        <Button className='BackToHomeBtn' onClick={handleBackBtnSubmit}>Back to Home page</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

