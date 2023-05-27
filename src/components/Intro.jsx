import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import BarLoader from "react-spinners/BarLoader";
import useFetch from "../hook/useFetch";


const Intro = (props) => {
  const { data: categories, isLoading,error } = useFetch("https://opentdb.com/api_category.php");

  return (
    <div className="container">
      <div className="intro-wrapper position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
        <div className="info d-flex flex-column align-items-center">
          <h1 className="">Quizzical App</h1>
          <p>Test your knowledge</p>

          {isLoading ? (
            <BarLoader color="#293264" loading={isLoading} size={25} aria-label="Loading Spinner" data-testid="loader" />
          ) : error ? <Alert variant={"danger"}>
          Something Went Wrong... Refresh F5
        </Alert>: (
            <>
              <Button className="rounded-pill w-50" variant="primary" onClick={props.handleClick}>
                Start Quiz
              </Button>
              <label className="mt-4 form-label" htmlFor="categories">Categories</label>
              <select
              id="categories"
              name="categories"
                className="  form-select"
                value={props.category}
                onChange={(e) => {
                  props.setCategory(e.target.value);
                }}
              >
                {categories?.trivia_categories.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
              <label className="mt-4 form-label" htmlFor="questionsNum">Number of questions</label>
              <select
              id="questionsNum"
                className="form-select"
                value={props.questionsNum}
                onChange={(e) => {
                  props.setQuestionsNum(e.target.value);
                }}
              >
                {[5,10,15,20].map((num,idx) => (
                  <option key={idx} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Intro;
