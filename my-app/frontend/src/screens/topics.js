import { React, useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//profile & topics
function Topics() {
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
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/topics" className='active'>Topics</Nav.Link>
                </Nav>
                <Form>
                    <Button href='#' variant="outline-light" className='me-2'>Login</Button>
                    <Button href='#' variant="primary" className='me-2'>Sign out</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

        <Container fluid className='mt-5'>
            <h1 className='text-center mt-5'>Topics</h1>
            <Row xs={1} sm={2} md={3} className='g-4 mt-3'>
                {topicData.map(topic => (
                <Col>
                    <Card key={topic.topic_id}>
                        <Card.Body>
                            <Card.Title className='text-center'>{topic.topic_name}</Card.Title>
                            <ol className='list-decimal list-inside'>
                                {/* This should be where the lessons are listed (JOIN topics table with lessons table) */}
                                <li>Placeholder</li>
                            </ol>
                            <a href='#' className='stretched-link'></a>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>
        </>
    );
}

export default Topics;