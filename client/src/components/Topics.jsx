import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

//--For the header and footer sections----------//
import HeaderComponent from './Header';
import Footer from './Footer';

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
        <div className='topicsPageDiv'>

        {/* This is where the header section is placed at */}
        <HeaderComponent/>

        <Container fluid className='mt-5 topicsPage'>
            <h1 className='mt-1 topicsPageTitle'>Topics</h1>
            <Row xs={1} sm={2} md={3} className='g-4 mt-3'>
                {topicData.map(topic => (
                <Col  key={topic.topic_id}>
                    <Card key={topic.topic_id} className='topicsCard'>
                        <Card.Body>
                            <Card.Title className='text-center'> <h1> {topic.topic_name}  </h1> </Card.Title>
                            <ol className='list-decimal list-inside topicsTableCard'>
                                {/* next div is created to centralise the buttons */}
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <button type="submit" className='topicBtn mb-2'>Lessons</button>  
                                    <button type="submit"
                                        className='topicBtn'
                                        onClick={() => handleQuizPageSubmit(topic.topic_name)}>
                                        Quizzes 
                                    </button>
                                </div>
                            </ol>
                            {/* <a href='#' className='stretched-link'></a> */}
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>

        {/* This is where the footer section is placed at */}
        <Footer/>
        </div>
    );
}
