import { useCallback, useState } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [answerState, setanswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setanswerState("answered");
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setanswerState("correct");
        } else {
          setanswerState("wrong");
        }

        setTimeout(() => {
          setanswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz Completed" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswerst = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswerst.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswerst.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (answerState === "wrong" || answerState === "correct") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
