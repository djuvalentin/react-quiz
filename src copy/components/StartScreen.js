function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Wrlcome to the React Quiz</h2>
      <h3>{numQuestions} questions ipsum dolor sit amet.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
