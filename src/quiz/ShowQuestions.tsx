import {quizArray} from "../data/quizArray";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import './ShowQuestions.css'
import Quiz from "../data/QuizProps";

export function ShowQuestions() {
    const [displayedQuestions, setDisplayedQuestions] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [randomQuestion, setRandomQuestion] = useState<Quiz | null>(null);
    const [currentUserAnswer, setCurrentUserAnswer] = useState<string | null>(null);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const displayQuestionsLength = displayedQuestions.length;
    const handleRandomQuestion = (): Quiz | void => {
        let randomIndex = Math.floor(Math.random() * quizArray.length);

        while (displayedQuestions.includes(randomIndex)) {

            if (displayedQuestions.length === quizArray.length) {
                setShowScore(true);
                return;
            }

            randomIndex = Math.floor(Math.random() * quizArray.length);
        }

        setDisplayedQuestions(previousValue => [...previousValue, randomIndex]);

        const selectedQuestion = quizArray[randomIndex];

        setRandomQuestion(selectedQuestion);
        setButtonDisabled(true);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!currentUserAnswer) {
            setError('Please pick a choice');
            return;
        }

        handleRandomQuestion();

        if (currentUserAnswer === randomQuestion?.correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        setError('');
        setCurrentUserAnswer(null);

        if (page < quizArray.length) {
            setPage(prevPage => prevPage + 1);
        }
    }

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => setCurrentUserAnswer(event.target.value);

    return (
        <div>
            <div className="quiz_container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>{randomQuestion?.question}</h3>

                        {randomQuestion?.answersArray.map((answer, index) => (
                            <div key={index} className="container_answer">
                                <input type="radio" id={`answer_${index}`} name="answers" value={answer}
                                       checked={currentUserAnswer === answer}
                                       onChange={handleRadioChange}/>
                                <label htmlFor={`answer_${index}`}> {answer}</label>
                            </div>
                        ))}
                    </div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {showScore && <p> Your score is : {score} </p>}
                    <button type="button" onClick={handleRandomQuestion} disabled={buttonDisabled}
                            className="start_button">Start
                        Quiz
                    </button>
                    <button type="submit" disabled={displayQuestionsLength < 1}>Submit your answers</button>
                    <button type="button" onClick={() => setShowScore(true)}> Finish Quiz</button>
                    <button type="button" onClick={() => window.location.reload()}> Reset quiz</button>
                </form>
            </div>
            <p> Question : question {page} / question {quizArray.length}</p>
        </div>
    )
}