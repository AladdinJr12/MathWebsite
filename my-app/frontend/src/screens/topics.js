import { React, useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
        <h1 className='text-center mt-5'>Topics</h1>
        <Container fluid className='mt-5'>
            <Row xs={1} sm={2} md={3} className='g-4'>
                {topicData.map(topic => (
                <Col>
                    <Card key={topic.topic_id}>
                        <Card.Body>
                            <Card.Title className='text-center'>{topic.topic_name}</Card.Title>
                            <Card.Link>Lesson 1</Card.Link>
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