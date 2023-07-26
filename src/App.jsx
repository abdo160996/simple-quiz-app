import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Intro from "./components/Intro";
import Questions from "./components/Questions";



function App() {
  const [questionsNum, setQuestionsNum] = useState(5)
  const [startQuiz, setStartQuiz] = useState(false);
  const [category, setCategory] = useState(9);

  function handleClick() {
    setStartQuiz((pre) => !pre);
  }

  return (
    <>{startQuiz ? <Questions category={category} QuestionsNums={questionsNum} startQuiz={startQuiz} setStartQuiz={setStartQuiz} /> : <Intro handleClick={handleClick} setQuestionsNum={setQuestionsNum} category={category} setCategory={setCategory} />}</>
  );
}

export default App;
