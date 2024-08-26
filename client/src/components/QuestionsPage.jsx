//---------This is where the users attempt the practice questions ----------------//


import { Form } from 'react-bootstrap';
import MCQ from './MCQ';
import TrueFalseQuestions from './TrueFalseQuestions';
import FreeResponseQuestions from './FreeResponseQuestions';
//*-----------So as to get the data passed by the state--------*/
import { useLocation } from 'react-router-dom';
//-----For retreiving data from the database and storing data-----//
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function QuestionsPage(){
    //*-----------So as to get the data passed by the state--------*/
    const location = useLocation();
    const [questionSettings, setQuestionSettings] = useState(location.state);

    //*----For routing purposes: which is used for the back button-----//
    const navigate = useNavigate(); 

    //---Where we place the retrieved questions database-----//
    const [questionsDatabase, setQuestionDatabase] = useState([]);

    //---Where we place the retrieved answers database-----//
    const [answersDatabase, setAnswersDatabase] = useState([]);
    
    //---This is where we store the array consisting of all the questions' data ----//
    const [finalised_questions, setFinalisedQuestions]= useState([]); 

    //----Where we store the answers made by the user-----------//
    const [userAnswers, setUserAnswers] = useState({});

    //---Where we store the feedback for each question--------//
    const [feedback, setFeedback] = useState({});

    //---Here is where store the amount of points scored by the user----//
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    //---Here is where we store the state of whether the quiz has been submitted or not---//
    const [quizSubmitted, setQuizSubmitted] = useState(false);    

    //---------------//

//-----__________Functionality for the options and buttons of the question page__________------------//
    //---Functionality for updating the users's selected answers----//
    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    //---------Functionality for the back button---------//
    const handleBackClick = () => {
        navigate('/question-settings', { state: { selected_topic: questionSettings.selected_topic } });
    };

    //-----Functionality for the retry button-------//
    const handleRetryBtn =()=>{
        setQuizSubmitted(false); 
        // Resetting the userAnswers, feedback, and correctAnswersCount states
        setUserAnswers({});
        setFeedback({});
        setCorrectAnswersCount(0);
        setFinalisedQuestions([]);
        //---For re-generating the questions------//
        selectingQuestions();
    }

    //---For updating the difficulty level: Used in nextLevelBtn()------//
    const updateDifficultyLevel = () => {
        setQuestionSettings(prevSettings => {
            let newDifficulty;
            switch (prevSettings.difficulty_level) {
                case 'Easy':
                    newDifficulty = 'Normal';
                    break;
                case 'Normal':
                    newDifficulty = 'Hard';
                    break;
                case 'Hard':
                    newDifficulty = 'Hard'; // No change if already 'hard'
                    break;
                default:
                    newDifficulty = 'Normal'; // Default to 'easy' if not set
                    break;
            }
            return { ...prevSettings, difficulty_level: newDifficulty };
        });
    };

    //---Functionality for the next level btn-----//
    const handleNextLevelBtn = ()=>{
        updateDifficultyLevel();
        handleRetryBtn();
    }

    //---------Functionality for the submit button---------//
    const handleSubmit = (e)=>{
        
        e.preventDefault();
        
        //---____Replacing the submit button____----//
        if (Object.keys(userAnswers).length != 0) {
            setQuizSubmitted(true);
        }

        //----___For getting the feedback + checking if the selected answers are correct____---//
        const feedbackResults = {};
        //---Looping through the stored userAnswers object----//
        Object.keys(userAnswers).forEach((answer_id)=>{
            var user_ans = userAnswers[answer_id];
            var isTheAnsCorrect= false;
            
            //-----Searching through the answer database for the matching answer----//
            const matchingAnswerData = answersDatabase.find(answer => answer.answer_id == answer_id);
            
            //---finding the corresponding question from the question database
            const matchingQuestionData = questionsDatabase.find(question => question.answer_id == answer_id);

            //---____Checking if the user's selected answers are correct___----//
            if(matchingAnswerData){
                //---checking the question type-----//
                if(matchingQuestionData.question_type=="True/False question"){
                    
                    
                    //---comparing if the selected answer(s) are within the list of the correct answers--//
                    const correctAnswers = new Set([matchingAnswerData.correct_ans, matchingAnswerData.correct_ans_2]);
                    const userAnswersSet = new Set(user_ans);

                    console.log("Checking true and false")
                    console.log(matchingAnswerData)
                    console.log(correctAnswers)
                    console.log(userAnswersSet)

                    //---Check if the user selected all the correct answers and nothing else---//
                    isTheAnsCorrect = (
                        correctAnswers.size === userAnswersSet.size &&
                        [...correctAnswers].every(answer => userAnswersSet.has(answer))
                    );

                }
                else if(matchingQuestionData.question_type== "MCQ"){
                    isTheAnsCorrect = (matchingAnswerData.correct_ans == user_ans) 
                }
                else if(matchingQuestionData.question_type== "Free response question"){
                    isTheAnsCorrect = (matchingAnswerData.correct_ans == user_ans) 
                }
            }

            //---storing feedback based on whether the user was correct or wrong----//
            let ansExplanation = '';
            if(isTheAnsCorrect){
                ansExplanation = matchingAnswerData.correct_ans_explanation;

                feedbackResults[answer_id] = {
                    correct: isTheAnsCorrect,
                    explanation: ansExplanation
                }
            }
            else{ 
                if (matchingQuestionData.question_type === "MCQ" ) {
                    if (user_ans === matchingAnswerData.wrong_ans_1) {
                        ansExplanation = matchingAnswerData.wrong_ans_1_explanation;
                    } else if (user_ans === matchingAnswerData.wrong_ans_2) {
                        ansExplanation = matchingAnswerData.wrong_ans_2_explanation;
                    } else if (user_ans === matchingAnswerData.wrong_ans_3) {
                        ansExplanation = matchingAnswerData.wrong_ans_3_explanation;
                    }

                    feedbackResults[answer_id] = {
                        correct: isTheAnsCorrect,
                        explanation: ansExplanation
                    }

                }

                else if(matchingQuestionData.question_type === "True/False question"){
                    //----Using a Map to store the explanations and whether they are correct or wrong----//
                    var true_false_feedback = new Map();

                    //-----Finding out how the options are sorted in the question page----//
                    const matchingOptions = finalised_questions.find(question => question.answer_id == answer_id);

                    if (matchingOptions) {
                        //---Sort user_ans based on the order presented in the question page----//
                        user_ans.sort((a, b) => {
                            return matchingOptions.question_options.indexOf(a) - matchingOptions.question_options.indexOf(b);
                        });
                    }

                    // Your existing code to populate true_false_feedback
                    for (var k = 0; k < user_ans.length; k++) {
                        var true_false_option = {};
                        let answerKey = user_ans[k].toString();

                        if (user_ans[k] === matchingAnswerData.wrong_ans_1) {
                            true_false_option["is_the_ans_correct"] = false;
                            true_false_option["ans_explanation"] = matchingAnswerData.wrong_ans_1_explanation;
                            true_false_feedback.set(answerKey, true_false_option);
                        } 
                        else if (user_ans[k] === matchingAnswerData.wrong_ans_2) {
                            true_false_option["is_the_ans_correct"] = false;
                            true_false_option["ans_explanation"] = matchingAnswerData.wrong_ans_2_explanation;
                            true_false_feedback.set(answerKey, true_false_option);
                        } 
                        else if (user_ans[k] === matchingAnswerData.wrong_ans_3) {
                            true_false_option["is_the_ans_correct"] = false;
                            true_false_option["ans_explanation"] = matchingAnswerData.wrong_ans_3_explanation;
                            true_false_feedback.set(answerKey, true_false_option);
                        }
                        else if (user_ans[k] === matchingAnswerData.correct_ans) {
                            true_false_option["is_the_ans_correct"] = true;
                            true_false_option["ans_explanation"] = matchingAnswerData.correct_ans_explanation;
                            true_false_feedback.set(answerKey, true_false_option);
                        }      
                        else if (user_ans[k] === matchingAnswerData.correct_ans_2) {
                            true_false_option["is_the_ans_correct"] = true;
                            true_false_option["ans_explanation"] = matchingAnswerData.correct_ans_2_explanation;
                            true_false_feedback.set(answerKey, true_false_option);
                        }          
                    }

                    feedbackResults[answer_id] = {
                        correct: isTheAnsCorrect,
                        explanation: isTheAnsCorrect
                            ? matchingAnswerData.correct_ans_explanation
                            : true_false_feedback|| "This should not be selected"
                    };
                }

                else if (matchingQuestionData.question_type === "Free response question") {
                    ansExplanation = matchingAnswerData.general_wrong_ans_explanation;
                    feedbackResults[answer_id] = {
                        correct: isTheAnsCorrect,
                        explanation: ansExplanation
                    }
                }
            }

            //---Updating the feedback state-----------------//
            setFeedback(feedbackResults);

        });
    }

    //---Function for reshuffling an array: Used for randomizing the questions selected----//
    //-- + how the mcq options are structured---//
    const reshuffleArray = (array) =>{
        //-------Using the Fisher-Yates shuffle algorithm to randomize the array-----//
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }


    //------The function for selecting the questions that matches with the question settings---//
    //---It will also randomly choose them and placed them in the finalisedQuestions state---//
    const selectingQuestions = useCallback(() =>{
 
        if (questionsDatabase.length > 0 && answersDatabase.length > 0) {
            
            //----Getting a filtered database consisting of just questions of the selected topic,
            //-- difficulty and question type-----//
            const filtered_question_database = questionsDatabase.filter(question=>{
                const matches = (
                    question.topic === questionSettings.selected_topic &&
                    question.difficulty === questionSettings.difficulty_level &&
                    questionSettings.question_types.includes(question.question_type)
                );
                
                return matches;
            } )

        //-------Using the Fisher-Yates shuffle algorithm to randomize the array-----//
        const reshuffled_filtered_questions = reshuffleArray(filtered_question_database);

        //-------Where the finals questions to be pasted on the page are selected at----------// 
        const numberOfQuestions = questionSettings.num_of_questions;
        const selectedQuestionsArray = [];
 
        for (let i = 0; i < numberOfQuestions; i++) {
            const question = reshuffled_filtered_questions[i];
            var answers = {};
            let optionsArray = [];

            if (question.question_type == "MCQ" || question.question_type == "True/False question") {    
                //--Finding the answer that matches with the selected question----//
                answers = answersDatabase.find(answer => answer.answer_id == question.answer_id);
                if (answers) {
                    if(question.question_type == "MCQ" ){
                        optionsArray = [
                            answers.correct_ans,
                            answers.wrong_ans_1,
                            answers.wrong_ans_2,
                            answers.wrong_ans_3
                        ];
                    }
                    else if(question.question_type == "True/False question"){
                        optionsArray = [
                            answers.correct_ans,
                            answers.correct_ans_2,
                            answers.wrong_ans_1,
                            answers.wrong_ans_2
                        ];
                    }
                    //--Reshuffling the array so that the options positioning are never the same----//
                    optionsArray = reshuffleArray(optionsArray)
                }
            }
 
            const questionData = {
                question_id: question.question_id,
                question_num: i + 1, //---Incrementing question number---//
                question_content: question.question_content,
                question_hint: question.question_hint,
                question_options: optionsArray,
                question_points: question.question_points || 1, //---Default to 1 if not provided--//
                question_type: question.question_type,
                question_content_type: question.content_type,
                answer_content_type: question.answer_type,
                answer_id: question.answer_id,
                correct_ans_explanation: answers.correct_ans_explanation,
                correct_ans_2_explanation: answers.correct_ans_2_explanation,
                wrong_ans_1_explanation: answers.wrong_ans_1_explanation,
                wrong_ans_2_explanation: answers.wrong_ans_2_explanation,
                wrong_ans_3_explanation: answers.wrong_ans_3_explanation,
                general_wrong_ans_explanation: answers.general_wrong_ans_explanation
            };
            
            selectedQuestionsArray.push(questionData);
        }
 
        setFinalisedQuestions(selectedQuestionsArray);
        }
    }, [questionsDatabase, answersDatabase, questionSettings]);

//-----_______________________Here is where we call the functions________________--------//

    //----Calculate the number of correct answers---//
    useEffect(() => {
        //console.log("The final feedback", feedback);
        const correctCount = Object.values(feedback).filter(
            (item) => item.correct === true
        ).length;

        //--Storing the number of correct answers----//
        setCorrectAnswersCount(correctCount);

    }, [feedback]);

    useEffect(() => {
        //--Here is where fetch the Questions database's data----//
        fetch('http://localhost:3000/api/questions')
            .then(response => response.json())
            .then(data => setQuestionDatabase(data.data))
            .catch(error => console.error('Error fetching data:', error));
        
        //---Here is where we fetch the Answers database's data-----//
        fetch('http://localhost:3000/api/answers')
            .then(response => response.json())
            .then(data => setAnswersDatabase(data.data))
            .catch(error => console.error('Error fetching data:', error));
        
    }, []);

    //-------___________This is where gather the questions selected by the user__________------------//
    useEffect( () => {
            selectingQuestions();
    }, [questionsDatabase, answersDatabase, questionSettings, selectingQuestions]);
    
    return (
        <div className='questionsPage'>
            <Form className='questions_section' onSubmit={handleSubmit}>
                {/*----where the points are displayed at---*/}
                <Form.Label >
                    <h1> {questionSettings.selected_topic} </h1>
                    <h2 className='pointsHeader'>{correctAnswersCount} / {questionSettings.num_of_questions} Points </h2>
                </Form.Label>

                {Array.from({ length: questionSettings.num_of_questions }).map((_, index) => (
                    <Form.Group className="mb-3" controlId={`question-${index + 1}`} key={index}>
                        {finalised_questions[index] ? (
                            <>
                                {(() => {
                                    const { question_type } = finalised_questions[index];

                                    switch (question_type) {
                                        case "MCQ":
                                            return (
                                                <MCQ 
                                                    question_data={finalised_questions[index]}
                                                    onAnswerChange={(answer) => handleAnswerChange(finalised_questions[index].answer_id, answer)}
                                                    submissionStatus={quizSubmitted}  
                                                />
                                            );
                                        case "True/False question":
                                            return (
                                                <TrueFalseQuestions 
                                                    question_data={finalised_questions[index]} 
                                                    onAnswerChange={(answer) => handleAnswerChange(finalised_questions[index].answer_id, answer)}
                                                    submissionStatus={quizSubmitted} 
                                                />
                                            );
                                        case "Free response question":
                                            return (
                                                <FreeResponseQuestions 
                                                    question_data={finalised_questions[index]} 
                                                    onAnswerChange={(answer) => handleAnswerChange(finalised_questions[index].answer_id, answer)}
                                                    submissionStatus={quizSubmitted} 
                                                />
                                            );
                                        default:
                                            return <p>Unknown question type</p>;
                                    }
                                })()}

                                {/*__________Rendering feedback_________*/}
                                {feedback[finalised_questions[index].answer_id] && (
                                    //---Here the name of the class is based on whether the feedback's answer_id.correct is true or false----//
                                    <div className={`feedback ${feedback[finalised_questions[index].answer_id].correct ? 'correct' : 'incorrect'}`}>
                                        {/* Here we also checking if feedback's answer_id.correct is true or false.
                                         If true, it displays 'Correct 1/1 points' else it displays 'Wrong 0/1 points ' */}
                                       <p>{feedback[finalised_questions[index].answer_id].correct ? 'Correct 1/1 points' : 'Wrong 0/1 points'}</p>

                                        {/*-- Here we are checking if the explanation is an
                                         object(which will only be the case for true/false questions)---*/}
                                        {typeof feedback[finalised_questions[index].answer_id].explanation === 'object' ? (
                                            //----Convert the Map to an array of [key, value] pairs-----//
                                            Array.from(feedback[finalised_questions[index].answer_id].explanation.entries()).map(([key, option], idx) => (
                                                //----Render each explanation------//
                                                <p 
                                                    key={key} 
                                                    className={option.is_the_ans_correct ? 'correctOption' : 'incorrectOption' }
                                                >
                                                   Option {idx + 1} : {option.ans_explanation} 
                                                </p>
                                            ))
                                        ) : (
                                            <p>{feedback[finalised_questions[index].answer_id].explanation}</p>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <p>Loading question...</p>
                        )}
                    </Form.Group>
                ))}

                {/*----______Where the buttons are generated_____----*/}
                <button type="button" className="QuestionPageBtn mx-5" onClick={handleBackClick}>Back</button>
                {/* condition for the submit, retry and next level buttons to appear */}
                {quizSubmitted? (
                    <>
                        <button type="button" className="QuestionPageBtn mx-5"
                         onClick={handleRetryBtn}>Retry Quiz</button>
                        <button type="button" className="QuestionPageBtn mx-5"
                         onClick={handleNextLevelBtn}>Next level</button>
                    </>
                ):(
                    <button type="submit" className="QuestionPageBtn mx-5">Submit</button>
                )}
                
            </Form>
        </div>
    );
}

