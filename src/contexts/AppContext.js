import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

import getQuestions from "../questions";
import { wait } from "../helpers";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "setAnswer":
      const currentQuestion = state.questions.at(state.index);
      const correctAnswer = currentQuestion.correctOption === action.payload;

      return {
        ...state,
        answer: action.payload,
        points: correctAnswer
          ? state.points + currentQuestion.points
          : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
      };
    case "reset":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining > 0 ? state.status : "finished",
      };
    }
    default:
      throw new Error("Error");
  }
}

// PRELOADED QUESTIONS

const AppContext = createContext();

function AppProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions
    .map((question) => question.points)
    .reduce((prev, cur) => prev + cur, 0);

  useEffect(() => {
    async function loadQuestions() {
      await wait(1);
      dispatch({ type: "dataReceived", payload: getQuestions() });
    }

    loadQuestions();
  }, []);

  return (
    <AppContext.Provider
      value={{
        questions,
        numQuestions,
        maxPoints,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// With JSON-SERVER /////////////////

// function AppProvider({ children }) {
//   const questionsData = getQuestions();

//   const [
//     { questions, status, index, answer, points, highscore, secondsRemaining },
//     dispatch,
//   ] = useReducer(reducer, initialState);

//   const numQuestions = questions.length;
//   const maxPoints = questions
//     .map((question) => question.points)
//     .reduce((prev, cur) => prev + cur, 0);

//   useEffect(() => {
//     fetch("http://localhost:9000/questions")
//       .then((res) => res.json())
//       .then((data) => dispatch({ type: "dataReceived", payload: data }))
//       .catch((err) => dispatch({ type: "dataFailed" }));
//   }, []);

//   return (
//     <AppContext.Provider
//       value={{
//         questions,
//         numQuestions,
//         maxPoints,
//         status,
//         index,
//         answer,
//         points,
//         highscore,
//         secondsRemaining,
//         dispatch,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

AppProvider.propTypes = {
  children: PropTypes.node,
};

function useApp() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("AppContext used outside of the AppProvider");
  return context;
}

export { useApp, AppProvider };
