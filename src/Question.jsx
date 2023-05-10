import he from "he";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const Question = (props) => {
  function shuffleArray(array) {
    let stash;
    for (let i = 0; i < array.length; i++) {
      let randomIndex = Math.floor(Math.random() * array.length);
      stash = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = stash;
    }
    return array;
  }
  const shuffledAnswers = shuffleArray(props.answers);

  const answers = shuffledAnswers.map((answer, idx) => {
    let newAnswer = he.decode(answer.trim());
    return (
      <OverlayTrigger placement={"top"} overlay={<Tooltip id={`tooltip`}>{newAnswer}</Tooltip>}>
        <div>
          <input required className="opacity-0 position-absolute" type="radio" id={newAnswer} name={props.questionNum} value={newAnswer} />
          <label key={idx} className="text-truncate answer rounded-4 px-2" htmlFor={newAnswer} style={{maxWidth:'150px'}}>
            {newAnswer}
          </label>
        </div>
      </OverlayTrigger>
      
    );
  });

  return (
    <>
      <div className="question px-5 my-4 d-flex flex-column w-100">
        <p className="align-self-start fw-bold fs-5 w-100">{he.decode(props.question)}</p>
        <div className="answers d-flex gap-2 align-items-center my-2">{answers}</div>
        <div className="border border-1 border-secondary w-100 mt-2"></div>
      </div>
    </>
  );
};

export default Question;
