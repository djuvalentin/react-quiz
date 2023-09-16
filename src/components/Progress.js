import { useApp } from "../contexts/AppContext";

function Progress() {
  const { index, numQuestions, points, answer, maxPoints } = useApp();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        Points: <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
