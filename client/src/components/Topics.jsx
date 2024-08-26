import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
export default function Topics() {
    const [topicData, setTopicData] = useState([]);

    const getTopicDetails = async() => {
        await axios.get('http://localhost:3000/topics')
            .then(response => {
                console.log("Checking response at line 20")
                console.log(response)
                setTopicData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    //---For transitioning to different pages/components------//
    const navigate = useNavigate();
    const handleQuizPageSubmit = (topicName) => {
        //----So as to navigate to the QuestionsPage route and getting the selected topic's name--------//
        navigate('/question-settings', { state: { topicName } });
     };
    

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

        <Container fluid className='mt-5 topicsPage'>
            <h1 className='mt-5 topicsPageTitle'>Topics</h1>
            <Row xs={1} sm={2} md={3} className='g-4 mt-3'>
                {topicData.map(topic => (
                <Col  key={topic.topic_id}>
                    <Card key={topic.topic_id} className='topicsCard'>
                        <Card.Body>
                            <Card.Title className='text-center'> <h1> {topic.topic_name}  </h1> </Card.Title>
                            <ol className='list-decimal list-inside topicsTableCard'>
                                {/* This should be where the lessons are listed (JOIN topics table with lessons table) */}
                                <button type="submit" className='topicBtn' > Lessons </button>  
                                <button type="submit"
                                className='topicBtn'
                                onClick={() => handleQuizPageSubmit(topic.topic_name)}>
                                    Quizzes 
                                </button>  
                            </ol>
                            {/* <a href='#' className='stretched-link'></a> */}
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>
        </>
    );
}
