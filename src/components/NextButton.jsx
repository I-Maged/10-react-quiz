import { useQuiz } from '../contexts/useQuiz'

const NextButton = () => {
  const { answer, index, numQuestions, nextQuestion, finishQuiz } = useQuiz()
  if (answer === null) return null

  return (
    <>
      {index < numQuestions - 1 ? (
        <button className='btn btn-ui' onClick={nextQuestion}>
          Next
        </button>
      ) : (
        <button className='btn btn-ui' onClick={finishQuiz}>
          Finish
        </button>
      )}
    </>
  )
}

export default NextButton
