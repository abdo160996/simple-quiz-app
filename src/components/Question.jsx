import he from "he";
import  React, { useState,useEffect} from "react";


const Question =({questionData,questionNum,setAnswerList,checkAll,}) => {

  const answers = [...questionData.incorrect_answers, questionData.correct_answer].map(ans=> he.decode(ans.trim()))
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAns, setSelectedAns] = useState("");

  const correctAnswer = he.decode(questionData.correct_answer)
 
  useEffect(() => {

    let stash;
    for (let i = 0; i < answers.length; i++) {
      let randomIndex = Math.floor(Math.random() * answers.length);
      stash = answers[i];
      answers[i] = answers[randomIndex];
      answers[randomIndex] = stash;
    }
    setShuffledAnswers(answers);
  }, [questionData])

  
  function styler(answer,ansId){
    if (checkAll)
    {    
        if(answer === correctAnswer && selectedAns === ansId )
        { 
           return({backgroundColor: "#94D7A2"})
        }
        else if( answer === correctAnswer && selectedAns !== ansId){
          return({backgroundColor: "#F8BCBC",opacity:.7})
        }
        else if( answer !== correctAnswer && selectedAns === ansId) {
          return({backgroundColor: "#94D7A2"})
        }
        else {
          return {backgroundColor:'#F6f6f6'}
        }
    }
    else{
    return (selectedAns === ansId ? {backgroundColor: "#d6dbf5"}: {backgroundColor: "#F5F7FB"}) 

    }
    
}
  function handleClick(e,ansId) {
    const newObj = {answerId:ansId,'answer':e.target.value,}
    setSelectedAns(ansId)
    setAnswerList(pre=> ({...pre,[e.target.name]:newObj}))
  }


  const answersBtns = shuffledAnswers.map((answer, idx) => {

      return (
        <div key={idx} >
          <input required disabled={checkAll} className={`opacity-0 position-absolute`} name={`${questionNum}`} type="radio" id={answer} value={answer} onChange={(e) => handleClick(e, idx)} />
          <label title={answer} style={styler(answer,idx)} className={` text-truncate answer rounded-2 px-2`} htmlFor={answer}>
            {answer}
          </label>
        </div>
       
      );
    
    
    
  });

  return (
    <>
      <div className="question px-2 my-4 d-flex flex-column w-100">
        <p className="align-self-start fw-bold fs-5 w-100">{he.decode(questionData.question)}</p>
        <div className="answers d-flex flex-column flex-md-row gap-2 align-items-center my-2">{answersBtns}</div>
        <div className="border border-1 opacity-50 border-secondary w-100 mt-2"></div>
      </div>
    </>
  );
}

export default Question;
