import { React, useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Home() {
    // JS to retrieve data from database here!
    const [topicData, setTopicData] = useState([]);

    const getTopicDetails = async() => {
        await axios.get('http://localhost:8000/topics')
            .then(response => {
                setTopicData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        getTopicDetails();
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
            <h1 className='text-center'>Welcome to Math Doodle!</h1>
            <div className="space-y-4 mx-auto w-full">
                <p className="max-w-2xl mx-auto text-center w-fit">
                    MathDoodle, where learning math is transformed into an engaging and interactive experience. Our platform empowers students to master mathematical concepts at their own pace, just like Coursera and CompSciLab. Whether you're tackling algebra, calculus, or any other area of math, MathDoodle provides tailored study plans, interactive problem-solving tools, and expert resources to help you succeed. Join our community of learners today and take the next step in your educational journey. With MathDoodle, every problem has a solution waiting to be discovered.
                </p>
                <p className="max-w-2xl mx-auto text-center w-fit">
                    At MathDoodle, we believe in turning challenges into opportunities for growth. Start your learning adventure with us today, and let's unlock the power of math together!
                </p>
            </div>

            {/* <h2 class="text-2xl font-bold text-center mb-4">Topics</h2>
            <div class="flex flex-wrap place-content-center">
                <div class=" border rounded-md shadow-sm p-4 bg-orange-200 m-2 flex-1 min-w-[300px]">
                    <h4 class="text-xl font-semibold">Number Systems</h4>
                    <ol class="list-decimal list-inside">
                        <li>Bases</li>
                        <li>Conversion of Bases</li>
                        <li>Binary Operations</li>
                    </ol>
                </div>
            </div> */}

            <h2 class="text-2xl font-bold text-center mb-4 mt-4">Topics</h2>
            <Row xs={1} sm={2} md={3} className='g-4'>
                {topicData.map(topic => (
                <Col>
                    <Card key={topic.topic_id}>
                        <Card.Body>
                            <Card.Title className='text-center'>{topic.topic_name}</Card.Title>
                            <ol className='list-decimal list-inside'>
                                <li>Bases</li>
                                <li>Conversion of Bases</li>
                                <li>Binary Operations</li>
                            </ol>
                            {/* <Card.Link>Lesson 1</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
            <div className='mt-4 text-center'>
                <Button href='/topics' variant='primary'>Topics</Button>
            </div>
        </Container>

        <footer></footer>
        </>
    );
}

export default Home;