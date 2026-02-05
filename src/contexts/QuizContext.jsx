import { createContext, useEffect, useReducer } from 'react'

const QuizContext = createContext()

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  question: {},

  // "loading", "error", "ready", "active", "finished"
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  numQuestions: null,
  maxPossiblePoints: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
        numQuestions: action.payload.length,
        maxPossiblePoints: action.payload.reduce((acc, curr) => {
          return acc + curr.points
        }, 0),
      }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return {
        ...state,
        question: state.questions[state.index],
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case 'newAnswer':
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.question.correctOption
            ? state.points + state.question.points
            : state.points,
      }

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        question: state.questions[state.index + 1],
        answer: null,
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? 'finished' : state.status,
      }
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' }

    default:
      throw new Error('Unkoown Action')
  }
}

const QuizProvider = ({ children }) => {
  const [
    {
      questions,
      question,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      numQuestions,
      maxPossiblePoints,
    },
    dispatch,
  ] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:3000/questions')
        const data = await res.json()
        dispatch({ type: 'dataReceived', payload: data })
      } catch (error) {
        dispatch({ type: 'dataFailed' })
        console.log(error)
      }
    }

    fetchQuestions()
  }, [])

  function startQuiz() {
    dispatch({ type: 'start' })
  }

  function newAnswer(index) {
    dispatch({ type: 'newAnswer', payload: index })
  }
  function restartQuiz() {
    dispatch({ type: 'restart' })
  }

  function handleTimer() {
    dispatch({ type: 'tick' })
  }
  function nextQuestion() {
    dispatch({ type: 'nextQuestion' })
  }
  function finishQuiz() {
    dispatch({ type: 'finish' })
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        question,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        startQuiz,
        newAnswer,
        restartQuiz,
        handleTimer,
        nextQuestion,
        finishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export { QuizProvider, QuizContext }
