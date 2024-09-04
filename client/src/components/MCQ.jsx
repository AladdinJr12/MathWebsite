//----This is where the multiple choice question format is generated at-----//
import PropTypes from 'prop-types';
import { Form, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import {useEffect, useState } from 'react';

export default function MCQ({question_data, onAnswerChange, submissionStatus }){   
    const {question_id, question_num, question_content, question_hint, question_options, question_points, question_content_type, answer_content_type} = question_data; 

    const [selectedAnswer, setSelectedAnswer] = useState('');

    //--for the hint button---//
    const [open, setOpen] = useState(false);

    //---for storing and returning the answer selected by the user-----//
    const handleOptionChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    useEffect(() => {
        onAnswerChange(selectedAnswer); 
    }, [selectedAnswer, onAnswerChange]);
    
    useEffect(() => {
        if(!submissionStatus){
            setSelectedAnswer('');   
        }
    }, [submissionStatus]);
    

    //---For creating a unique key-----//
    const generateRandomString = ()=>{
        const length = Math.floor(Math.random() * 20) + 5; // Random length between 5 and 24
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
    }

    // Generating a unique identifier/key for the component instance:
    const [componentKey] = useState(generateRandomString());
    
    return(
        <>
            <Card className="mb-4 question_card">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            {/* Where the question's content is placed at  */}
                            <Form.Label>
                                {/*----Checking if there is an image or text placed for said question---*/}
                                {question_content_type === 'image' ? (
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

                    {/* Where the MCQ answers are placed at */}
                    <Form.Group className="MCQ_radio">
                        {question_options.map( (mcq_option, index)=>(
                            <Form.Check
                                key={`${question_id}-${componentKey}-${index}`}
                                type = "radio"
                                id ={`${question_id}-${componentKey}-${index}`}
                                //---Here we are checking if MCQ options consist of photos---//
                                label={
                                    answer_content_type === 'image' ? (
                                        <img
                                            src={mcq_option}
                                            alt={`Option ${index + 1}`}
                                            style={{ maxWidth: '100%' }}
                                        />
                                    ) : (
                                        mcq_option
                                    )
                                }
                                value ={mcq_option}
                                name = {question_id}
                                onChange={handleOptionChange}
                                //---This is for the retry quiz/next level btn to work----//
                                checked= { selectedAnswer == mcq_option }
                            />
                        ))}
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
                    <Collapse in={open} >
                        <div id="example-collapse-text" className='hintSect mt-3' >
                            {question_hint}
                        </div>
                    </Collapse>   

                </Card.Body>
            </Card>
        </>
    )
}


MCQ.propTypes = {
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
        question_content_type: PropTypes.string.isRequired,
        answer_content_type: PropTypes.string.isRequired
    }).isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    submissionStatus: PropTypes.bool.isRequired
};

