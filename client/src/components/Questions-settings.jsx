//-------For creating the form for setting what kind of questions the user wishes to practice with--------//
import Form from 'react-bootstrap/Form';
//-------For navigating to different pages-------//
import { useNavigate, useLocation } from 'react-router-dom';
//--For the header section----------//
import HeaderComponent from './Header';
//----For storing the data of the selected question setting options---//
import { useState } from 'react';
import Footer from './Footer';

export default function Question_settings(){
    //---Retrieving the selected topic name from the state----//
    const location = useLocation();
    const { topicName = "Discrete Math" } = location.state || {}; 

    //----For storing the data of the selected question setting options---//
    const [numOfQuestions, setNumOfQuestions] = useState(1);
    const [typesOfQuestions, setQuestionTypes] = useState([]);
    const [difficultyLevel, setDifficultyLevel] = useState('');

    //-----This is for storing all of the selected question types----------//
    const handleQuestionTypeChange = (e) => {
        const value = e.target.value;
        setQuestionTypes(prev =>
            e.target.checked
                ? [...prev, value]
                : prev.filter(type => type !== value)
        );
    };

    //---For transitioning to different pages/components------//
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        
         //-----Ensuring that at least one question type was selected ------//
         if (typesOfQuestions.length === 0) {
            alert("Please select at least one question type.");
            return;
        }

        // Radio button validation
        if (difficultyLevel === '') {
            alert("Please select a difficulty level.");
            return;
        }

        //--Object for passing the question settings data into the QuestionsPage route-----//
        const questionSettings = {
            num_of_questions: numOfQuestions,
            question_types: typesOfQuestions,
            difficulty_level: difficultyLevel,
            //---Here we are setting the topic to set theory because
            //-- the prototype database only consists of questions for this topic---//
            selected_topic: "Set Theory"
        };
        //----So as to navigate to the QuestionsPage route--------//
        navigate('/questions-page', {state: questionSettings}); 
    };

    return(
        <div className='questionsSettingsDiv child'>
            {/* This is where the header section is placed at */}
            <HeaderComponent/>
            <Form className='questions_settings_form' onSubmit={handleSubmit}>
                <h1 className='pb-3 quizPageTitle'> {topicName} Practice </h1>
                {/* Section for the number of questions */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="QuestionSettings_Labels"> Number of questions </Form.Label>
                    <Form.Select aria-label="Number of questions" className="QuestionSettings_Select"
                    value={numOfQuestions} onChange={(e)=> setNumOfQuestions(e.target.value)} >
                        <option disabled>Select number of questions</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select>
                </Form.Group>

                {/* Section for question types */}                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="QuestionSettings_Labels">Question Types</Form.Label>
                    <div className="d-flex flex-column">
                        <Form.Check
                            type="checkbox"
                            label="MCQ"
                            value ="MCQ"
                            id="checkbox-mcq"
                            onChange={handleQuestionTypeChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="True/False"
                            value="True/False question"
                            id="checkbox-true-false"
                            onChange={handleQuestionTypeChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Free response"
                            value="Free response question"
                            id="checkbox-free-response"
                            onChange={handleQuestionTypeChange}
                        />
                    </div>
                </Form.Group>

                {/* Section for the difficulty level */}
                <Form.Group className="mb-3">
                    <Form.Label className="QuestionSettings_Labels">Difficulty level</Form.Label>
                    {['Easy', 'Normal', 'Hard'].map((level, index) => (
                        <Form.Check
                            
                            key={index}
                            label={level}
                            name="difficulty"
                            type="radio"
                            value={level}
                            onChange={(e) => setDifficultyLevel(e.target.value)}
                        />
                    ))}
                </Form.Group>
                
                 {/* Submit Button */}
                <Form.Group className="mb-3">
                    <button type="submit" className='QuestionPageBtn' > Submit </button>  
                </Form.Group>

            </Form>

            {/* This is where the footer section is placed at */}
            <Footer/>
        </div>
    )
}