import { useApp } from "../contexts/AppContext";

function FinishScreen() {
  const { points, maxPoints, highscore, dispatch } = useApp();
  const scorePercentage = Math.round((points / maxPoints) * 100);

  let emoji;

  if (scorePercentage === 100) emoji = "🏅";
  if (scorePercentage >= 80 && scorePercentage < 100) emoji = "🍕";
  if (scorePercentage >= 50 && scorePercentage < 80) emoji = "🙃";
  if (scorePercentage > 0 && scorePercentage < 50) emoji = "⚠️";
  if (scorePercentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored {points} out of {maxPoints} points (
        {scorePercentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button
        className="btn btn-reset"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </>
  );
}

export default FinishScreen;
