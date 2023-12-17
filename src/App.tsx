import React from 'react';
import './App.css';
import {ShowQuestions} from "./quiz/ShowQuestions";

function App() {
    return (
        <>
            <h1> Quiz generator </h1>
            <p> Warning! Once you click 'Submit your answers', you can not go back to your quiz</p>
            <ShowQuestions></ShowQuestions>
        </>
    );
}

export default App;
