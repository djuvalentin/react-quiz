import { useApp } from "../contexts/AppContext";

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useApp();
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-next"
        onClick={() => dispatch({ type: "next" })}
      >
        Next
      </button>
    );
  else {
    return (
      <button
        className="btn btn-next"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
