import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Intro from "./Intro";
import Questions from "./Questions";

let QuestionsNums = 5;

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  const [category,setCategory] = useState(9)

  function handleClick() {
    setStartQuiz((pre) => !pre);
  }

  return (
    <>

    {startQuiz ? <Questions category={category} QuestionsNums={QuestionsNums} setStartQuiz={setStartQuiz}  />
     : <Intro handleClick={handleClick}  setCategory={setCategory} /> }
  </>
  )

  
}

export default App;
