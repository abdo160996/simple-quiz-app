import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Intro from "./Intro";
import Questions from "./Questions";

let QuestionsNums = 5;
function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [data, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuiz, setNewQuiz] = useState(false);

  function handleClick() {
    setStartQuiz((pre) => !pre);
  }

  useEffect(() => {
   
    const abort = new AbortController();
    const signal = abort.signal;
    fetch(`https://opentdb.com/api.php?amount=${QuestionsNums}&type=multiple`, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("error happened");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false)
        setError(null);
        setDate(data);
      })
      .catch((e) => {
        setDate(null)
      
        setError(true);
      });
      return ()=>{
        abort.abort()
      }
  }, [newQuiz]);

  return (
    <>

    {startQuiz && !error ? <Questions data={data} QuestionsNums={QuestionsNums} setStartQuiz={setStartQuiz} setNewQuiz={setNewQuiz} />
     : <Intro handleClick={handleClick} isLoading={isLoading} /> }
  </>
  )

  
}

export default App;
