
import PropTypes from 'prop-types';
import { Form, Card } from 'react-bootstrap';
import {useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

export default function FreeResponseQuestions({question_data, onAnswerChange, submissionStatus}){
    const {question_id, question_num, question_content, question_hint, question_points, content_type} = question_data; 

    //--for the hint button---//
    const [open, setOpen] = useState(false);

    //-----State to store the user input----//
    const [userAnswer, setUserAnswer] = useState('');
    
    //--For storing the user's input----//
    const handleInputChange = (event) => {
        const answer = event.target.value;
        setUserAnswer(answer);
    };

    //---For passing back the user's input data----//
    useEffect(() => {
        onAnswerChange(userAnswer);
    }, [userAnswer, onAnswerChange]);

    //--For resetting the question by clearing the user's input---//
    useEffect(()=>{
        if(!submissionStatus){
            setUserAnswer('');
        }
    }, [submissionStatus]);
    
    return(
        <>
        <Card className="mb-4 question_card">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            {/* Where the question's content is placed at  */}
                            <Form.Label>
                                {/*----Checking if there is an image or text placed for said question---*/}
                                {content_type === 'image' ? (
                                    <>
                                         {/* Where the question num is placed at  */}
                                        <strong className='question_num'> {question_num}. </strong>
                                        <img src={question_content} alt={`Question ${question_num}`} style={{ maxWidth: '100%' }} />
                                    </>
                                    ) : (
                                        <span className="question_content"> 
                                            <strong className='question_num'>{question_num}. </strong>
                                        {question_content} </span>
                                )}
                            </Form.Label>
                        </div>
                    </div>
                    <div className='questionPointsLabel mt-2'>
                        <small className="text-muted "> {question_points} point</small>
                    </div>

                    {/* Where the user type in their answers */}
                    <Form.Group >
                        <Form.Label > <em> Note that you should not add extra spacing to your answer </em> </Form.Label>
                        <Form.Control as="textarea" key={`${question_id}-${question_num}-${question_content}`}  rows={3} value={userAnswer} onChange={handleInputChange}/>
                    </Form.Group>

                     {/* Where the hint button and hint is placed at */}
                     <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="{`${question_id}-${componentKey}-${index}`}"
                        aria-expanded={open}
                        className='mt-4 hintBtn'
                        variant="secondary"
                    >
                        HINT
                    </Button>
                    <Collapse in={open}>
                        <div className='mt-3 hintSect' >
                            {question_hint}
                        </div>
                    </Collapse>

                </Card.Body>
            </Card>
        </>
    )
}

FreeResponseQuestions.propTypes = {
    question_data: PropTypes.shape({
        question_id: PropTypes.number.isRequired,
        question_num: PropTypes.number.isRequired,
        question_content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]).isRequired,
        question_hint: PropTypes.string.isRequired,
        question_options: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        ).isRequired,
        question_points: PropTypes.number.isRequired,
        content_type: PropTypes.string.isRequired
    }).isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    submissionStatus: PropTypes.bool.isRequired
};
