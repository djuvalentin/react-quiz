import { useEffect } from "react";
import { useApp } from "../contexts/AppContext";

function Timer() {
  const { secondsRemaining, dispatch } = useApp();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return function () {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 ? "0" : ""}
      {mins}:{secs < 10 ? "0" : ""}
      {secs}{" "}
    </div>
  );
}

export default Timer;
