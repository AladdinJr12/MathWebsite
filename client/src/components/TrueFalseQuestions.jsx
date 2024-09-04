//-------This is format for true/false type questions----//
import PropTypes from 'prop-types';
import { Form, Card } from 'react-bootstrap';
import {useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

export default function TrueFalseQuestions({question_data, onAnswerChange, submissionStatus}){
    const {question_id, question_num, question_content, question_hint, question_options, question_points, question_content_type, answer_content_type} = question_data; 

    //--for the hint button---//
    const [open, setOpen] = useState(false);

    //----For storing the selected options for the checkbox----//
    const [selectedOptions, setSelectedOptions] = useState(new Set());

    //---For creating a unique key-----//
    const generateUniqueKey = (prefix) => `${prefix}-${Date.now()}-${Math.random()}`;

    // Generating a unique identifier/key for the component instance:
    const [componentKey] = useState(generateUniqueKey());

    //---Storing and passing data of the selected options----//
    const handleOptionChange = (event) => {
        const selectedAnswer = event.target.value;
        const updatedOptions = new Set(selectedOptions);

        if (event.target.checked) {
            updatedOptions.add(selectedAnswer);
        } else {
            updatedOptions.delete(selectedAnswer);
        }

        setSelectedOptions(updatedOptions);
    };

    //---For resetting the options-----//
    useEffect(() => {
        if (!submissionStatus) {
            // Reset selected options if the quiz is submitted
            setSelectedOptions(new Set());
        }
    }, [submissionStatus]);

    //---Updates the parent component aka QuestionPage.jsx with all selected answers-----//
    //---For passing in the selected options as an array-----//
    useEffect(() => {
        // Pass the updated options to the parent component
        onAnswerChange(Array.from(selectedOptions));
    }, [selectedOptions, onAnswerChange]);

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

                    {/* Where the true/false answers are placed at */}
                    <Form.Group>
                        {question_options.map( (option, index)=>(
                            <Form.Check
                                key={`${question_id}-${componentKey}-${index}`}
                                type = "checkbox"
                                id ={`${question_id}-${componentKey}-${index}`}
                                //---Here we are checking if MCQ options consist of photos---//
                                label={
                                    answer_content_type === 'image' ? (
                                        <img
                                            src={option}
                                            alt={`Option ${index + 1}`}
                                            style={{ maxWidth: '100%' }}
                                        />
                                    ) : (
                                        option
                                    )
                                }
                                value = {option}
                                name = {question_id}
                                onChange={handleOptionChange}
                                checked={selectedOptions.has(option)}
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

TrueFalseQuestions.propTypes = {
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

