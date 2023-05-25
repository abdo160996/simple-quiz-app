import { Button } from "react-bootstrap";
import BarLoader from "react-spinners/BarLoader";
import he from "he";
import Question from "./Question";
import React, { useState, useEffect } from "react";
import useFetch from "../hook/useFetch";

const Questions = (props) => {
  const [result, setResult] = useState(0);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [answersList, setAnswerList] = useState({});
  const [checkAll, setCheckAll] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);

  const { data: questions, isLoading } = useFetch(`https://opentdb.com/api.php?amount=${props.QuestionsNums}&type=multiple&category=${props.category}`);

  const QA = questions?.results.map((qa, idx) => {
    return <Question key={idx} questionData={qa} questionNum={idx} setAnswerList={setAnswerList} checkAll={checkAll} />;
  });

  useEffect(() => {
    if (Object.keys(answersList).length < props.QuestionsNums) {
      setAllAnswered(true);
    } else {
      setAllAnswered(false);
    }
  }, [answersList]);

  function handleSubmit(e) {
    let correctAnswers = 0;
    if (!isQuizEnd) {
      e.preventDefault();
      setCheckAll(true);
      for (const key in answersList) {
        let correctAnswer = he.decode(questions.results[key].correct_answer.trim());

        if (answersList[key]["answer"] === correctAnswer) {
          correctAnswers++;
          setResult(correctAnswers);
        }
      }

      setIsQuizEnd((pre) => !pre);
    } else {
      setIsQuizEnd((pre) => !pre);
      props.setStartQuiz((pre) => !pre);
    }
  }

  return (
    <div className="container">
      {isLoading ? (
        <BarLoader className="position-absolute top-50 start-50 translate-middle" color="#293264" loading={isLoading} size={25} aria-label="Loading Spinner" data-testid="loader" />
      ) : (
        <div className="questions-wrapper rounded-1 mt-5 mx-auto d-flex flex-column align-items-center justify-content-center">
          <form onSubmit={handleSubmit}>
            {QA}
            <Button type="submit" variant="primary" disabled={allAnswered} className={`check-answer mx-auto d-block mb-2`}>
              {isQuizEnd ? "Play again" : "Check Answers"}
            </Button>
          </form>
          {isQuizEnd && (
            <div className="bg-info text-light w-50 mx-auto text-center px-2 rounded-2 fs-4 fw-bold">
              You scored {result} out of {props.QuestionsNums}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
