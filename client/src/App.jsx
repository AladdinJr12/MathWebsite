
import './css files/App.css'
import { Routes, Route } from 'react-router-dom';
import Question_settings from './components/Questions-settings';
import QuestionsPage from './components/QuestionsPage';
import Profile from './components/Profile';
import Topics from './components/Topics';
import HomePage from './components/HomePage';
import LessonPage from './components/LessonPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path ="/" element = {<HomePage />} />
        <Route path ="/question-settings" element = {<Question_settings />} />
        <Route path ="/questions-page" element = {<QuestionsPage />} />
        <Route path ="/profile" element = {<Profile />} />
        <Route path ="/topics" element = {<Topics />} />
        <Route path ="/lesson-page" element = {<LessonPage />} />
      </Routes>
    </div>
  );
}
export default App;
