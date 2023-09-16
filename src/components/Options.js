import { useApp } from "../contexts/AppContext";

function Options({ question }) {
  const { answer, dispatch } = useApp();
  const isAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            isAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "setAnswer", payload: index })}
          disabled={isAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
