import HeaderComponent from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function LessonPage(){

    //---For transitioning to different pages/components------//
    const navigate = useNavigate();
    const handleQuizPageSubmit = () => {
       
        //----So as to navigate to the QuestionsPage route and 
        navigate('/question-settings', { state: {topicName: 'Set theory'} } );
    };

    return (
        <div>
            {/* Header */}
            <HeaderComponent/>
            <div className="main-content">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>Other Topics</h2>
                <ul>
                    <li><a href="#">Relations</a></li>
                    <li><a href="#">Combinatorics</a></li>
                    <li><a href="#">Permutations</a></li>
                    <li><a href="#">Graphs</a></li>
                    <li><a href="#">Proofs</a></li>
                </ul>
                <h2>Pratice quizzes </h2>
                <ul>
                    <li><a href="" onClick={handleQuizPageSubmit}>Set theory quizz</a></li>
                </ul>
            </aside>
        
            {/* Lessons Section */}
            <section className="lessons" id="lessons">
                <div className="lesson-header">
                    <h1>Lesson: Set Theory</h1>
                    <p>Explore the fundamentals of Set Theory, including subsets, unions, intersections, and more.</p>
                </div>
        
                {/* Video Section */}
                <div className="video-container">
                    <video controls>
                        <source src="sets.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p className="video-descrip">
                        This video will guide you through the basics of Set Theory, providing examples and explanations.
                    </p>
                </div>
        
                {/* Subtopics Section */}
                <div className="subtopics">
                    <h2>Subtopics</h2>
                    <ul>
                        <li><a href="#">Introduction to Sets</a></li>
                        <li><a href="#">Types of Sets</a></li>
                        <li><a href="#">Subsets and Power Sets</a></li>
                        <li><a href="#">Union and Intersection</a></li>
                        <li><a href="#">Venn Diagrams</a></li>
                        <li><a href="#">Cardinality and Countability</a></li>
                    </ul>
                </div>
            </section>
        
            {/* Notes Sidebar */}
            <aside className="notes-sidebar">
                <h2>Take Notes</h2>
                <textarea className='LessonPageTextArea' placeholder="Write your notes here..."></textarea>
        
                {/* Ask Questions Section */}
                <h2>Ask Questions</h2>
                <textarea className='LessonPageTextArea' placeholder="Write your questions here..."></textarea>
                <button className="submit-button">Submit</button>
            </aside>
            </div>
            {/* Footer */}
            <Footer/>
        </div>
    )

}
