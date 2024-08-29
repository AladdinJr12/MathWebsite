// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './css files/App.css'

//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Question_settings from './components/Questions-settings';
import QuestionsPage from './components/QuestionsPage';
import Profile from './components/Profile';
import Topics from './components/Topics';
import React from 'react';


function App() {
  return (
    <div>
      <Routes>
        <Route path ="/question-settings" element = {<Question_settings />} />
        <Route path ="/questions-page" element = {<QuestionsPage />} />
        <Route path ="/profile" element = {<Profile />} />
        <Route path ="/topics" element = {<Topics />} />
      </Routes>


    </div>
  );
}

export default App;
