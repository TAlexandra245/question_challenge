import {quizArray} from "../data/quizArray";
import {useState} from "react";
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
        setSelectedAnswer(answer);

        if (answer === currentQuestion.correctAnswer) {
            setScore(prevScore => prevScore + 1)
        }
    };

    return (
        <div>
            <div>
                <h2>{currentQuestion.question}</h2>
                <form>
                    {currentQuestion.answersArray.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                            <input type="radio" id={`answer_${answerIndex}`} name="answers" value={answer}
                                   checked={selectedAnswer === answer}
                                   onChange={() => handleAnswerSelection(answer)}/>
                            <label htmlFor={`answer_${answerIndex}`}> {answer}</label>
                        </div>
                    ))}
                </form>
            </div>
            <p> Score : {score} </p>
            <p> Question : question {currentQuestionIndex + 1} / question {shuffledQuestions.length}</p>
            <button onClick={() => decrementIndex()}>Previous</button>
            <button onClick={() => incrementIndex()}>Next</button>
        </div>
    )
}