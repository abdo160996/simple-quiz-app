import Button from "react-bootstrap/Button";
import BarLoader from "react-spinners/BarLoader";
import useFetch from "./useFetch";

const Intro = (props) => {
   const { data : categories,isLoading }= useFetch('https://opentdb.com/api_category.php')
   
  return (
    <div className="container">
      
      <div className="intro-wrapper position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
        <div className="info d-flex flex-column align-items-center">
          <h1 className="">Quizzical App</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          {props.isLoading ?
           <BarLoader color="#293264" loading={isLoading} size={25} aria-label="Loading Spinner" data-testid="loader" /> 
           :<Button className="rounded-pill w-50" variant="primary" onClick={props.handleClick}>
            Start Quiz
            </Button>}
          <select className="mt-3" onChange={(e)=>{props.setCategory(e.target.value)}}>
            {categories?.trivia_categories.map(cate=> <option value={cate.id}>{cate.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Intro;
