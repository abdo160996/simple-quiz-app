import Button from "react-bootstrap/Button";
import BarLoader from "react-spinners/BarLoader";
const Intro = (props) => {
  return (
    <div className="container">
      
      <div className="intro-wrapper position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
        <div className="info d-flex flex-column align-items-center">
          <h1 className="">Quizzical App</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          {props.isLoading ?
           <BarLoader color="#293264" loading={props.isLoading} size={25} aria-label="Loading Spinner" data-testid="loader" /> 
           :<Button className="rounded-pill w-50" variant="primary" onClick={props.handleClick}>
            Start Quiz
            </Button>}
          
        </div>
      </div>
    </div>
  );
};

export default Intro;
