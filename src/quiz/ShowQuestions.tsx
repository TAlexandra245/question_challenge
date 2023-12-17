import {quizArray} from "../data/quizArray";
import {FormEvent, useState} from "react";
import QuizProps from '../data/QuizProps'

const initialShuffledQuestions = [...quizArray].sort(() => Math.random() - 0.5);
const allQuestions = initialShuffledQuestions.map(question => question.question);
const duplicateQuestions = [...new Set(allQuestions)]

export function ShowQuestions() {

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [shuffledQuestions, setShuffledQuestions] = useState<QuizProps[]>(initialShuffledQuestions);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [uniqueQuestions, setUniqueQuestions] = useState<string []>(duplicateQuestions);
    const [error, setError] = useState<string | null>(null);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const incrementIndex = () => {
        if (currentQuestionIndex < initialShuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }
    const decrementIndex = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const handleAnswerSelection = (answer: string) => {
        if(!answer) {
            setError('Please fill the question');
        }
        setSelectedAnswer(answer);

        if (answer === currentQuestion.correctAnswer) {
            setScore(prevScore => prevScore + 1)
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFormSubmitted(true);
        setShowScore(true);
    }

    return (
        <div>
            <div>
                <h2>{currentQuestion.question}</h2>
                <form onSubmit={handleSubmit}>
                    {currentQuestion.answersArray.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                            <input type="radio" id={`answer_${answerIndex}`} name="answers" value={answer}
                                   checked={selectedAnswer === answer}
                                   onChange={(e) => handleAnswerSelection(answer)}
                                   disabled={formSubmitted}
                                   required/>
                            <label htmlFor={`answer_${answerIndex}`}> {answer}</label>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                        </div>
                    ))}
                    <button type="submit" disabled={formSubmitted}>Submit your answers</button>
                </form>

                <button onClick={() => decrementIndex()} disabled={showScore}>Previous</button>
                <button onClick={() => incrementIndex()} disabled={showScore}>Next</button>
            </div>
            {showScore && (<p> Your score : {score} </p>)}
            <p> Question : question {currentQuestionIndex + 1} / question {shuffledQuestions.length}</p>
        </div>
    )
}