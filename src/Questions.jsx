import { Button } from "react-bootstrap";
import he from "he";
import Question from "./Question";
import { useState } from "react";
const Questions = (props) => {
  const [result, setResult] = useState(0);
  const [isQuizEnd, setIsQuizEnd] = useState(false);

  const QA = props.data?.results.map((qa, idx) => {
    return <Question key={idx} question={qa.question} questionNum={idx} answers={[...qa.incorrect_answers, qa.correct_answer]} />;
  });


  function handleSubmit(e) {
    if (!isQuizEnd) {
      e.preventDefault();

      //pointer-event-none 
      [...e.target.elements].forEach((input)=>{
        input.type==="radio" && input.nextElementSibling.classList.add("answered")
      })
      //check answers
      let correctAnswers = 0;
      [...e.target.elements].forEach((input) => {
        let correctAnswer = he.decode(props.data.results[+input.name].correct_answer.trim());
        if (input.checked) {
          if (correctAnswer === input.value) {
            input.nextElementSibling.classList.add("correct-answer");
            correctAnswers++;
            setResult(correctAnswers);
          } else {
            input.nextElementSibling.classList.add("not-correct-answer");
          }
        } else if (!input.checked && input.value === correctAnswer) {
          input.nextElementSibling.classList.add("correct-answer");
        }
      });
      setIsQuizEnd((pre) => !pre);
    } else {
      setIsQuizEnd((pre) => !pre);
      props.setNewQuiz((pre) => !pre);
      props.setStartQuiz((pre) => !pre);
    }
  }

  return (
    <div className="container">
      <div className="questions-wrapper rounded-1 mt-5 mx-auto d-flex flex-column align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
          {QA}
          <Button type="submit" variant="primary" className="check-answer mx-auto d-block mb-2">
            {isQuizEnd ? "Play again" : "Check Answers"}
          </Button>
        </form>
        {isQuizEnd && (
          <div className="bg-info text-light w-50 mx-auto text-center px-2 rounded-2 fs-4 fw-bold">
            You scored {result}/{props.QuestionsNums}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
