import {quizArray} from "../data/quizArray";
import React, {ChangeEvent, FormEvent, useState} from "react";
import './ShowQuestions.css'
import Quiz from "../data/QuizProps";



export function ShowQuestions() {
    const [displayedQuestions, setDisplayedQuestions] = useState<Quiz[]>([]);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [currentUserAnswer, setCurrentUserAnswer] = useState<string | null>(null);

    const incrementIndex = () => currentQuestionIndex < quizArray.length  ? setCurrentQuestionIndex(currentQuestionIndex + 1) : null
    const currentQuestion = quizArray[currentQuestionIndex];

    const getRandomQuestion = (): Quiz => {
        const randomIndex = Math.floor(Math.random() * quizArray.length - 1);
        const randomQuestion = quizArray[randomIndex];
        if (displayedQuestions.includes(randomQuestion)) {
            console.log("This question is repeating", randomQuestion);
        }
        setDisplayedQuestions([...displayedQuestions, randomQuestion]);
        console.log(randomQuestion);
        return randomQuestion;

    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        getRandomQuestion();

        if (!currentUserAnswer) {
            setError('Please pick a choice');
            return;
        }

        if (currentUserAnswer === currentQuestion.correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        setError('');
        setCurrentUserAnswer(null);
        incrementIndex();

    }


    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => setCurrentUserAnswer(event.target.value);


    return (
        <div>
            <div className = "quiz_container">
                <h2>{currentQuestion.question}</h2>
                <form onSubmit={handleSubmit}>
                    {currentQuestion.answersArray.map((answer, answerIndex) => (
                        <div key={answerIndex} className = "container_answer">
                            <input type="radio" id={`answer_${answerIndex}`} name="answers" value={answer}
                                   checked={currentUserAnswer === answer}
                                   onChange={handleRadioChange}
                            />
                            <label htmlFor={`answer_${answerIndex}`}> {answer}</label>
                        </div>
                    ))}
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {showScore && (<p> Your score : {score} </p>)}
                    <button type="submit">Submit your answers</button>
                    <button onClick={() => setShowScore(true)}> Finish Quiz</button>
                    <button onClick={() => window.location.reload()}> Reset quiz</button>
                </form>
            </div>
            <p> Question : question {currentQuestionIndex + 1} / question {quizArray.length}</p>
        </div>
    )

}